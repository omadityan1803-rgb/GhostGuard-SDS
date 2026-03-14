from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@db:5432/ghostguard"

    # Redis
    REDIS_URL: str = "redis://redis:6379"

    # Security
    SECRET_KEY: str = "ghostguard-secret-changeme-in-production"
    API_KEY_HEADER: str = "X-GhostGuard-Key"

    # ML Model paths
    MODEL_PATH: str = "app/ml/model.pkl"
    SCALER_PATH: str = "app/ml/scaler.pkl"
    FEATURES_PATH: str = "app/ml/features.json"
    ONNX_MODEL_PATH: str = "app/ml/model.onnx"

    # Thresholds
    PASS_THRESHOLD: int = 75
    SOFT_THRESHOLD: int = 40

    # Rate limiting
    RATE_LIMIT_PER_SESSION: int = 10
    RATE_LIMIT_WINDOW_SECONDS: int = 3600

    # Logging
    LOG_LEVEL: str = "INFO"
    LOG_FILE: str = "logs/ghostguard.log"

    # Environment
    ENV: str = "development"
    DEBUG: bool = True

    # CORS
    ALLOWED_ORIGINS: str = "*"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
