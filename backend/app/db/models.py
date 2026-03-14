from sqlalchemy import Column, String, Integer, Float, Boolean, BigInteger, Index
from sqlalchemy.sql import func
from app.db.database import Base


class VerificationEvent(Base):
    """
    Every verification attempt is logged here.
    No PII — session IDs are hashed before storage.
    """
    __tablename__ = "verification_events"

    id           = Column(Integer, primary_key=True, autoincrement=True)
    session_hash = Column(String(64), nullable=False, index=True)
    site_key     = Column(String(128), nullable=False, index=True)
    score        = Column(Integer, nullable=False)
    verdict      = Column(String(20), nullable=False)
    user_agent   = Column(String(512), nullable=True)
    timestamp    = Column(BigInteger, nullable=False, index=True)

    __table_args__ = (
        Index("ix_site_key_timestamp", "site_key", "timestamp"),
        Index("ix_verdict_timestamp",  "verdict",  "timestamp"),
    )

    def __repr__(self):
        return (
            f"<VerificationEvent "
            f"session={self.session_hash[:8]}... "
            f"score={self.score} "
            f"verdict={self.verdict}>"
        )


class TenantConfig(Base):
    """
    Per-enterprise tenant configuration.
    Each enterprise client gets their own site_key and thresholds.
    """
    __tablename__ = "tenant_configs"

    id              = Column(Integer, primary_key=True, autoincrement=True)
    site_key        = Column(String(128), unique=True, nullable=False)
    tenant_name     = Column(String(256), nullable=False)
    pass_threshold  = Column(Integer, default=75)
    soft_threshold  = Column(Integer, default=40)
    webhook_url     = Column(String(512), nullable=True)
    is_active       = Column(Boolean, default=True)
    created_at      = Column(BigInteger, nullable=False)

    def __repr__(self):
        return f"<TenantConfig {self.tenant_name} key={self.site_key[:8]}...>"
