from fastapi import APIRouter, HTTPException, Header
from typing import Optional, List
import redis
import json
import time
import logging

from app.config import settings
from app.utils.security import verify_admin_key

router = APIRouter()
logger = logging.getLogger("ghostguard.admin")

try:
    r = redis.from_url(settings.REDIS_URL, decode_responses=True)
except Exception:
    r = None


# ─── Stats Endpoint ───────────────────────────────────────────────────────────

@router.get("/stats")
def get_stats(x_admin_key: Optional[str] = Header(None)):
    verify_admin_key(x_admin_key)

    if not r:
        raise HTTPException(status_code=503, detail="Redis not available")

    try:
        logs = r.lrange("event_log", 0, 999)
    except redis.RedisError as e:
        raise HTTPException(status_code=503, detail=f"Redis error: {e}")

    if not logs:
        return {
            "total": 0,
            "pass": 0,
            "soft_flag": 0,
            "challenge": 0,
            "avg_score": 0,
            "pass_rate": 0,
            "bot_rate": 0,
            "recent": []
        }

    events = [json.loads(l) for l in logs]
    verdicts = [e.get("verdict", "") for e in events]
    scores   = [e.get("score", 0)   for e in events]

    total     = len(events)
    pass_c    = verdicts.count("PASS")
    soft_c    = verdicts.count("SOFT_FLAG")
    challenge = verdicts.count("CHALLENGE")
    avg_score = round(sum(scores) / total, 1) if total else 0

    return {
        "total":      total,
        "pass":       pass_c,
        "soft_flag":  soft_c,
        "challenge":  challenge,
        "avg_score":  avg_score,
        "pass_rate":  round(pass_c / total * 100, 1) if total else 0,
        "bot_rate":   round(challenge / total * 100, 1) if total else 0,
        "recent":     events[:20]
    }


# ─── Score Distribution ───────────────────────────────────────────────────────

@router.get("/score-distribution")
def get_score_distribution(x_admin_key: Optional[str] = Header(None)):
    verify_admin_key(x_admin_key)

    if not r:
        raise HTTPException(status_code=503, detail="Redis not available")

    try:
        logs = r.lrange("event_log", 0, 4999)
    except redis.RedisError as e:
        raise HTTPException(status_code=503, detail=f"Redis error: {e}")

    events = [json.loads(l) for l in logs]
    scores = [e.get("score", 0) for e in events]

    # Build histogram buckets: 0-9, 10-19, ... 90-99, 100
    buckets = {f"{i*10}-{i*10+9}": 0 for i in range(10)}
    buckets["100"] = 0

    for score in scores:
        if score == 100:
            buckets["100"] += 1
        else:
            bucket = f"{(score // 10) * 10}-{(score // 10) * 10 + 9}"
            if bucket in buckets:
                buckets[bucket] += 1

    return {"distribution": buckets, "total": len(scores)}


# ─── Threshold Config ─────────────────────────────────────────────────────────

@router.get("/config")
def get_config(x_admin_key: Optional[str] = Header(None)):
    verify_admin_key(x_admin_key)
    return {
        "pass_threshold":  settings.PASS_THRESHOLD,
        "soft_threshold":  settings.SOFT_THRESHOLD,
        "rate_limit":      settings.RATE_LIMIT_PER_SESSION,
        "cache_ttl_sec":   60,
        "env":             settings.ENV
    }


@router.post("/config/thresholds")
def update_thresholds(
    pass_threshold: int,
    soft_threshold: int,
    x_admin_key: Optional[str] = Header(None)
):
    verify_admin_key(x_admin_key)

    if not (0 <= soft_threshold < pass_threshold <= 100):
        raise HTTPException(
            status_code=400,
            detail="Invalid thresholds. Must be: 0 <= soft < pass <= 100"
        )

    # In production, persist to DB. For now update in memory.
    settings.PASS_THRESHOLD = pass_threshold
    settings.SOFT_THRESHOLD = soft_threshold

    logger.info(f"Thresholds updated: pass={pass_threshold}, soft={soft_threshold}")
    return {
        "success": True,
        "pass_threshold": pass_threshold,
        "soft_threshold": soft_threshold
    }


# ─── Clear Logs (dev only) ────────────────────────────────────────────────────

@router.delete("/logs")
def clear_logs(x_admin_key: Optional[str] = Header(None)):
    verify_admin_key(x_admin_key)

    if settings.ENV == "production":
        raise HTTPException(
            status_code=403,
            detail="Cannot clear logs in production."
        )

    if r:
        r.delete("event_log")

    return {"success": True, "message": "Logs cleared."}
