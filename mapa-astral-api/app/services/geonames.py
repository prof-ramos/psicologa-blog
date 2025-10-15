import httpx
from typing import Dict, Optional
from app.config import get_settings

settings = get_settings()

class GeoNamesService:
    def __init__(self):
        self.base_url = "http://api.geonames.org"
        self.username = settings.GEONAMES_USERNAME
        self.client = httpx.AsyncClient(timeout=10.0)

    async def buscar_coordenadas_brasil(self, localidade: str) -> Optional[Dict]:
        """
        Converte localidade brasileira em coordenadas geográficas.

        Args:
            localidade: String no formato "Cidade/UF" (ex: "São Paulo/SP")

        Returns:
            Dict com cidade, estado, país, latitude e longitude
        """
        url = f"{self.base_url}/searchJSON"
        params = {
            "q": localidade.upper(),
            "country": "BR",
            "featureClass": "P",  # Lugares populados
            "maxRows": 1,
            "username": self.username,
            "lang": "pt"
        }

        try:
            response = await self.client.get(url, params=params)
            response.raise_for_status()
            data = response.json()

            if data.get("geonames") and len(data["geonames"]) > 0:
                local = data["geonames"][0]
                return {
                    "cidade": local["name"],
                    "estado": local.get("adminCode1", ""),
                    "pais": "Brasil",
                    "latitude": float(local["lat"]),
                    "longitude": float(local["lng"])
                }
        except httpx.HTTPError as e:
            print(f"Erro ao buscar coordenadas no GeoNames: {e}")

        return None

    async def close(self):
        """Fecha conexão HTTP"""
        await self.client.aclose()