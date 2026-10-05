"""
FastAPI Main Application Entrypoint
===================================
AI-Based Tree Survival Prediction and Plantation Decision Support System
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from .config import settings
from .database import db_manager
from .services.ml_service import ml_service
from .routes import health, predict, recommend, history

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: connect DB and load ML model
    print(f"Starting {settings.PROJECT_NAME} v{settings.VERSION}...")
    await db_manager.connect()
    ml_service.load_model()
    yield
    # Shutdown
    await db_manager.close()
    print("Application shutdown complete.")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="REST API for predicting tree survival probability, recommending optimal tree species, and managing plantation history.",
    lifespan=lifespan
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global Exception Handlers
@app.exception_handler(ValueError)
async def value_error_handler(request: Request, exc: ValueError):
    return JSONResponse(
        status_code=400,
        content={"detail": str(exc), "error_type": "ValidationError"}
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    # Log internal error without exposing sensitive system traces
    print(f"[Internal Error] {request.method} {request.url.path} -> {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred while processing the plantation request.", "error_type": "InternalServerError"}
    )

# Include Routers (both with and without /api prefix for maximum compatibility)
app.include_router(health.router)
app.include_router(health.router, prefix=settings.API_PREFIX)

app.include_router(predict.router)
app.include_router(predict.router, prefix=settings.API_PREFIX)

app.include_router(recommend.router)
app.include_router(recommend.router, prefix=settings.API_PREFIX)

app.include_router(history.router)
app.include_router(history.router, prefix=settings.API_PREFIX)

@app.get("/")
async def root():
    return {
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "online",
        "docs_url": "/docs",
        "health_check": "/health",
        "endpoints": {
            "predict": "POST /predict",
            "recommend": "POST /recommend",
            "save_prediction": "POST /predictions",
            "history": "GET /predictions",
            "metrics": "GET /metrics"
        }
    }
