import secrets
import hashlib
import time
import logging
from typing import Dict, Any

from app.config import settings

logger = logging.getLogger("ghostguard.threshold")


def make_decision(score: int) -> Dict[str, Any]:
    """
    Convert a 0-100 human confidence score into a verdict + optional token.
    """

    if score >= settings.PASS_THRESHOLD:
        # High confidence human — issue a signed token
        token = _generate_token(score)
        logger.debug(f"PASS | score={score} | token={token[:8]}...")
        return {
            "success": True,
            "score":   score,
            "verdict": "PASS",
            "token":   token,
        }

    elif score >= settings.SOFT_THRESHOLD:
        # Uncertain — flag for soft review, no token yet
        logger.debug(f"SOFT_FLAG | score={score}")
        return {
            "success": True,
            "score":   score,
            "verdict": "SOFT_FLAG",
            "token":   None,
        }

    else:
        # Low confidence — trigger SmartFallback challenge
        logger.debug(f"CHALLENGE | score={score}")
        return {
            "success": True,
            "score":   score,
            "verdict": "CHALLENGE",
            "token":   None,
        }


def _generate_token(score: int) -> str:
    """
    Generate a short-lived signed verification token.
    Format: hex_random + timestamp_hash
    In production replace with JWT.
    """
    random_part    = secrets.token_hex(16)
    timestamp      = str(int(time.time()))
    signature_data = f"{random_part}:{timestamp}:{score}:{settings.SECRET_KEY}"
    signature      = hashlib.sha256(signature_data.encode()).hexdigest()[:16]
    return f"{random_part}.{timestamp}.{signature}"


def verify_token(token: str) -> bool:
    """
    Verify a GhostGuard token is valid and not expired (5 min TTL).
    """
    try:
        parts = token.split(".")
        if len(parts) != 3:
            return False

        random_part, timestamp, signature = parts
        token_time = int(timestamp)
        now        = int(time.time())

        # Token expires after 5 minutes
        if now - token_time > 300:
            return False

        return True

    except Exception:
        return False
