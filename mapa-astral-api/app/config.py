from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    # API
    APP_NAME: str = "API Mapa Astral"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # GeoNames
    GEONAMES_USERNAME: str = ""

    # Redis
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    REDIS_MAX_CONNECTIONS: int = 20

    # Cache TTL (segundos)
    CACHE_LOCALIDADE_TTL: int = 2592000  # 30 dias
    CACHE_MAPA_TTL: int = 604800         # 7 dias

    # CORS (para integração com Next.js)
    CORS_ORIGINS: list = ["http://localhost:3000", "http://localhost:8000"]

    # Rate Limiting
    RATE_LIMIT: str = "10/minute"

    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache()
def get_settings() -> Settings:
    return Settings()