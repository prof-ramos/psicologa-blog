from kerykeion import AstroData
from datetime import datetime
from typing import Dict
import asyncio
from concurrent.futures import ThreadPoolExecutor

# Executor para operações síncronas do Kerykeion
executor = ThreadPoolExecutor(max_workers=4)

class MapaAstralService:
    def __init__(self):
        self.traducoes_signos = {
            "Aries": "Áries",
            "Taurus": "Touro",
            "Gemini": "Gêmeos",
            "Cancer": "Câncer",
            "Leo": "Leão",
            "Virgo": "Virgem",
            "Libra": "Libra",
            "Scorpio": "Escorpião",
            "Sagittarius": "Sagitário",
            "Capricorn": "Capricórnio",
            "Aquarius": "Aquário",
            "Pisces": "Peixes"
        }

        self.traducoes_planetas = {
            "mercury": "mercurio",
            "venus": "venus",
            "mars": "marte",
            "jupiter": "jupiter",
            "saturn": "saturno"
        }

    def traduzir_signo(self, signo_ingles: str) -> str:
        """Traduz nome do signo de inglês para português"""
        return self.traducoes_signos.get(signo_ingles, signo_ingles)

    def parse_data_brasileira(self, data_str: str, hora_str: str) -> datetime:
        """
        Converte strings de data e hora brasileiras para objeto datetime.

        Args:
            data_str: Data no formato "DD/MM/AAAA"
            hora_str: Hora no formato "HH:MM"

        Returns:
            Objeto datetime
        """
        dia, mes, ano = map(int, data_str.split('/'))
        hora, minuto = map(int, hora_str.split(':'))
        return datetime(ano, mes, dia, hora, minuto)

    def _gerar_mapa_sync(self, nome: str, data_hora: datetime,
                         lat: float, lng: float, tz: str) -> Dict:
        """Operação síncrona de geração do mapa (para ThreadPoolExecutor)"""
        subject = AstroData(
            name=nome,
            year=data_hora.year,
            month=data_hora.month,
            day=data_hora.day,
            hour=data_hora.hour,
            minute=data_hora.minute,
            lat=lat,
            lng=lng,
            tz_str=tz
        )

        mapa = {
            "sol": {
                "signo": self.traduzir_signo(subject.sun.sign),
                "casa": subject.sun.house,
                "grau": round(subject.sun.position, 2)
            },
            "lua": {
                "signo": self.traduzir_signo(subject.moon.sign),
                "casa": subject.moon.house,
                "grau": round(subject.moon.position, 2)
            },
            "ascendente": {
                "signo": self.traduzir_signo(subject.first_house.sign),
                "grau": round(subject.first_house.position, 2)
            },
            "planetas": {}
        }

        # Adiciona planetas
        for planeta_en, planeta_pt in self.traducoes_planetas.items():
            obj_planeta = getattr(subject, planeta_en)
            mapa["planetas"][planeta_pt] = {
                "signo": self.traduzir_signo(obj_planeta.sign),
                "casa": obj_planeta.house,
                "grau": round(obj_planeta.position, 2)
            }

        return mapa

    async def gerar_mapa_astral(self, nome: str, data_hora: datetime,
                                lat: float, lng: float, tz: str) -> Dict:
        """
        Gera mapa astral de forma assíncrona usando ThreadPoolExecutor.

        Args:
            nome: Nome da pessoa
            data_hora: Objeto datetime com data e hora de nascimento
            lat: Latitude do local de nascimento
            lng: Longitude do local de nascimento
            tz: Timezone IANA (ex: "America/Sao_Paulo")

        Returns:
            Dict com dados do mapa astral em português
        """
        loop = asyncio.get_event_loop()
        mapa = await loop.run_in_executor(
            executor,
            self._gerar_mapa_sync,
            nome, data_hora, lat, lng, tz
        )
        return mapa