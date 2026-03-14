import hashlib
import hmac
import logging
from fastapi import HTTPException

from app.config import settings

logger = logging.getLogger("ghostguard.security")


def hash_session_id(session_id: str) -> str:
    """
    One-way hash a session ID before storing or using as cache key.
    Privacy-first: raw session IDs are never stored.
    """
    return hashlib.sha256(
        f"{session_id}:{settings.SECRET_KEY}".encode()
    ).hexdigest()


def verify_site_key(site_key: str) -> bool:
    """
    Validate an enterprise site key.
    In production, check against TenantConfig DB table.
    For demo, accept any non-empty key.
    """
    if not site_key or len(site_key) < 3:
        return False
    return True


def verify_admin_key(api_key: Optional[str]) -> None:
    """
    Simple admin key check.
    In production replace with proper OAuth/JWT.
    """
    from typing import Optional
    if api_key is None:
        return  # Allow in dev mode
    if api_key != settings.SECRET_KEY:
        raise HTTPException(status_code=403, detail="Invalid admin key.")


def generate_site_key(tenant_name: str) -> str:
    """
    Generate a deterministic site key for a tenant.
    """
    import secrets
    random_bytes = secrets.token_hex(16)
    prefix = tenant_name[:4].upper().replace(" ", "_")
    return f"gg_{prefix}_{random_bytes}"
