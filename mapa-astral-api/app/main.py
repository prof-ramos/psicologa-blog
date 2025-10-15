from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from prometheus_fastapi_instrumentator import Instrumentator
from datetime import datetime

from app.config import get_settings
from app.api.routes import router

settings = get_settings()

# Inicializa rate limiter
limiter = Limiter(key_func=get_remote_address)

# Cria aplicação FastAPI
app = FastAPI(
    title=settings.APP_NAME,
    description="API para cálculo de mapa astral personalizado para usuários brasileiros",
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc"
)

# Middlewares
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(GZipMiddleware, minimum_size=1000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Métricas Prometheus
Instrumentator().instrument(app).expose(app)

# Rotas
app.include_router(router, prefix="/api/v1", tags=["API v1"])

@app.get("/health", tags=["Health"])
async def health_check():
    """Verifica status da API"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "version": settings.APP_VERSION
    }

@app.get("/", tags=["Root"])
async def root():
    """Endpoint raiz"""
    return {
        "message": "API Mapa Astral",
        "version": settings.APP_VERSION,
        "docs": "/docs"
    }

# Rate limiting no endpoint principal
@app.post("/api/v1/mapa-astral")
@limiter.limit(settings.RATE_LIMIT)
async def mapa_astral_limited(request: Request):
    pass  # Implementação está em routes.py