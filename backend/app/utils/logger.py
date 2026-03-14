import json
import time
import logging
from typing import Optional

logger = logging.getLogger("ghostguard.events")


async def log_event(
    session_id: str,
    site_key: str,
    score: int,
    verdict: str,
    user_agent: str = "",
    r=None
):
    """
    Log a verification event to Redis list.
    Redis acts as a fast event buffer.
    In production, drain this into PostgreSQL via a background worker.
    """
    event = {
        "session_id": session_id[:8] + "...",  # Never log full session ID
        "site_key":   site_key,
        "score":      score,
        "verdict":    verdict,
        "user_agent": user_agent[:100] if user_agent else "",
        "timestamp":  int(time.time())
    }

    if r:
        try:
            r.lpush("event_log", json.dumps(event))
            r.ltrim("event_log", 0, 9999)  # Keep last 10,000 events
        except Exception as e:
            logger.warning(f"Failed to log event to Redis: {e}")

    logger.info(
        f"EVENT | verdict={verdict} | score={score} | "
        f"site={site_key[:12]} | session={event['session_id']}"
    )
