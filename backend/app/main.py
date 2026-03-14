from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time
import logging

from app.config import settings
from app.routes.verify import router as verify_router
from app.routes.admin import router as admin_router
from app.db.database import init_db

# Setup logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s"
)
logger = logging.getLogger("ghostguard")

# Create FastAPI app
app = FastAPI(
    title="GhostGuard API",
    description="ML-Based Passive Human Verification System",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request timing middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    response.headers["X-Process-Time-Ms"] = str(round(process_time, 2))
    return response

# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"success": False, "error": "Internal server error"}
    )

# Routers
app.include_router(verify_router, prefix="/api/v1", tags=["Verification"])
app.include_router(admin_router,  prefix="/api/v1/admin", tags=["Admin"])

# Startup event
@app.on_event("startup")
async def startup_event():
    logger.info("GhostGuard API starting up...")
    await init_db()
    logger.info("Database initialized.")
    logger.info("GhostGuard API ready.")

# Health check
@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "ok",
        "service": "ghostguard",
        "version": "1.0.0",
        "environment": settings.ENV
    }

# Root
@app.get("/", tags=["Root"])
def root():
    return {
        "message": "GhostGuard API",
        "docs": "/docs",
        "health": "/health"
    }
