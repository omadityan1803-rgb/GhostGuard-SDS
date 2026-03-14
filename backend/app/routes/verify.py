from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
import redis
import json
import time
import logging

from app.ml.model import get_model
from app.ml.threshold import make_decision
from app.config import settings
from app.utils.security import hash_session_id
from app.utils.logger import log_event

router = APIRouter()
logger = logging.getLogger("ghostguard.verify")

# Redis connection
try:
    r = redis.from_url(settings.REDIS_URL, decode_responses=True)
except Exception as e:
    logger.warning(f"Redis not available: {e}")
    r = None


# ─── Request / Response Models ────────────────────────────────────────────────

class MouseData(BaseModel):
    entropy: float = 0.0
    avgSpeed: float = 0.0
    directionChanges: int = 0
    straightLineRatio: float = 1.0
    pauseCount: int = 0
    totalDistance: float = 0.0

class KeyboardData(BaseModel):
    avgDwellTime: float = 0.0
    avgFlightTime: float = 0.0
    rhythmConsistency: float = 0.0
    backspaceRatio: float = 0.0
    typingSpeed: float = 0.0

class ScrollData(BaseModel):
    scrollDepth: float = 0.0
    avgScrollSpeed: float = 0.0
    scrollDirectionChanges: int = 0
    readingPatternScore: float = 0.0

class FingerprintData(BaseModel):
    canvasHash: str = ""
    webglRenderer: str = ""
    screenResolution: str = ""
    timezone: str = ""
    language: str = ""
    hardwareConcurrency: int = 0
    deviceMemory: float = 0.0
    touchPoints: int = 0
    pluginCount: int = 0
    fontCount: int = 0

class SessionData(BaseModel):
    sessionDuration: float = 0.0
    tabVisibilityChanges: int = 0
    timeOnPage: float = 0.0
    windowFocusChanges: int = 0
    requestTimingVariance: float = 0.0
    copyPasteDetected: bool = False
    formInteractionTime: float = 0.0
    idleTime: float = 0.0
    mouseEnteredPage: bool = False
    touchDevice: bool = False

class RequestMetaData(BaseModel):
    userAgent: str = ""
    timestamp: int = 0
    url: str = ""
    referrer: str = ""
    timingVariance: float = 0.0

class VerifyRequest(BaseModel):
    sessionId: str = Field(..., min_length=1, max_length=128)
    siteKey: str = Field(..., min_length=1, max_length=128)
    sessionDuration: float = 0.0
    mouse: MouseData = MouseData()
    keyboard: KeyboardData = KeyboardData()
    scroll: ScrollData = ScrollData()
    fingerprint: FingerprintData = FingerprintData()
    session: Optional[SessionData] = SessionData()
    requestMeta: RequestMetaData = RequestMetaData()

class VerifyResponse(BaseModel):
    success: bool = True
    score: int
    verdict: str
    token: Optional[str] = None
    sessionId: str
    timestamp: int
    message: str


# ─── Verify Endpoint ──────────────────────────────────────────────────────────

@router.post("/verify", response_model=VerifyResponse)
async def verify(req: VerifyRequest, request: Request):

    # 1. Rate limiting
    if r:
        rate_key = f"rate:{hash_session_id(req.sessionId)}"
        try:
            count = r.incr(rate_key)
            r.expire(rate_key, settings.RATE_LIMIT_WINDOW_SECONDS)
            if count > settings.RATE_LIMIT_PER_SESSION:
                raise HTTPException(
                    status_code=429,
                    detail="Rate limit exceeded. Too many requests for this session."
                )
        except redis.RedisError as e:
            logger.warning(f"Redis rate limit check failed: {e}")

    # 2. Check cache — same session = same score for 60 seconds
    if r:
        cache_key = f"score:{hash_session_id(req.sessionId)}"
        try:
            cached = r.get(cache_key)
            if cached:
                cached_data = json.loads(cached)
                logger.debug(f"Cache hit for session {req.sessionId[:8]}...")
                return VerifyResponse(
                    sessionId=req.sessionId,
                    timestamp=int(time.time()),
                    message="Cached result",
                    **cached_data
                )
        except redis.RedisError as e:
            logger.warning(f"Redis cache check failed: {e}")

    # 3. Run ML scoring
    try:
        model = get_model()
        score = model.score(req.dict())
    except Exception as e:
        logger.error(f"ML scoring failed: {e}", exc_info=True)
        # Fallback: score as uncertain (soft flag)
        score = 50

    # 4. Make threshold decision
    decision = make_decision(score)

    # 5. Cache result for 60 seconds
    if r:
        try:
            r.setex(
                f"score:{hash_session_id(req.sessionId)}",
                60,
                json.dumps(decision)
            )
        except redis.RedisError as e:
            logger.warning(f"Redis cache set failed: {e}")

    # 6. Log the event
    await log_event(
        session_id=req.sessionId,
        site_key=req.siteKey,
        score=score,
        verdict=decision['verdict'],
        user_agent=req.requestMeta.userAgent,
        r=r
    )

    logger.info(
        f"Verified | session={req.sessionId[:8]}... | "
        f"score={score} | verdict={decision['verdict']}"
    )

    return VerifyResponse(
        sessionId=req.sessionId,
        timestamp=int(time.time()),
        message=_verdict_message(decision['verdict']),
        **decision
    )


def _verdict_message(verdict: str) -> str:
    messages = {
        'PASS':       'Human verified. Access granted.',
        'SOFT_FLAG':  'Low confidence. Flagged for review.',
        'CHALLENGE':  'Bot suspected. Challenge required.'
    }
    return messages.get(verdict, 'Unknown verdict.')
