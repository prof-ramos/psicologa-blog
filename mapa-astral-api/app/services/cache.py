import redis
from redis.connection import ConnectionPool
import json
from typing import Dict, Optional
from app.config import get_settings

settings = get_settings()

class CacheManager:
    _pool: Optional[ConnectionPool] = None

    def __init__(self):
        if not CacheManager._pool:
            CacheManager._pool = ConnectionPool(
                host=settings.REDIS_HOST,
                port=settings.REDIS_PORT,
                db=settings.REDIS_DB,
                max_connections=settings.REDIS_MAX_CONNECTIONS,
                decode_responses=True
            )
        self.redis_client = redis.Redis(connection_pool=CacheManager._pool)
        self.localidade_ttl = settings.CACHE_LOCALIDADE_TTL
        self.mapa_ttl = settings.CACHE_MAPA_TTL

    def _chave_localidade(self, localidade: str) -> str:
        """Gera chave para cache de localidade"""
        return f"localidade:{localidade.upper()}"

    def _chave_mapa(self, dados: Dict) -> str:
        """Gera chave para cache de mapa astral"""
        # Remove campos variáveis antes do hash
        dados_hash = {
            "data_nascimento": dados.get("data_nascimento"),
            "hora_nascimento": dados.get("hora_nascimento"),
            "local_nascimento": dados.get("local_nascimento")
        }
        return f"mapa:{hash(frozenset(dados_hash.items()))}"

    async def get_localidade(self, localidade: str) -> Optional[Dict]:
        """Recupera coordenadas do cache"""
        try:
            key = self._chave_localidade(localidade)
            cached = self.redis_client.get(key)
            return json.loads(cached) if cached else None
        except Exception as e:
            print(f"Erro ao recuperar localidade do cache: {e}")
            return None

    async def set_localidade(self, localidade: str, dados: Dict):
        """Armazena coordenadas no cache"""
        try:
            key = self._chave_localidade(localidade)
            self.redis_client.setex(
                key,
                self.localidade_ttl,
                json.dumps(dados, ensure_ascii=False)
            )
        except Exception as e:
            print(f"Erro ao armazenar localidade no cache: {e}")

    async def get_mapa(self, dados: Dict) -> Optional[Dict]:
        """Recupera mapa astral do cache"""
        try:
            key = self._chave_mapa(dados)
            cached = self.redis_client.get(key)
            return json.loads(cached) if cached else None
        except Exception as e:
            print(f"Erro ao recuperar mapa do cache: {e}")
            return None

    async def set_mapa(self, dados: Dict, resultado: Dict):
        """Armazena mapa astral no cache"""
        try:
            key = self._chave_mapa(dados)
            self.redis_client.setex(
                key,
                self.mapa_ttl,
                json.dumps(resultado, ensure_ascii=False)
            )
        except Exception as e:
            print(f"Erro ao armazenar mapa no cache: {e}")