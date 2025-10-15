from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional

class MapaAstralRequest(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100, description="Nome completo")
    data_nascimento: str = Field(..., pattern=r'^\d{2}/\d{2}/\d{4}$', description="Data no formato DD/MM/AAAA")
    hora_nascimento: str = Field(..., pattern=r'^\d{2}:\d{2}$', description="Hora no formato HH:MM")
    local_nascimento: str = Field(..., min_length=3, description="Cidade/UF (ex: São Paulo/SP)")
    timezone: str = Field(default="America/Sao_Paulo", description="Timezone IANA")

    @field_validator('data_nascimento')
    @classmethod
    def validar_data(cls, v):
        try:
            dia, mes, ano = map(int, v.split('/'))
            if not (1900 <= ano <= datetime.now().year):
                raise ValueError("Ano deve estar entre 1900 e o ano atual")
            datetime(ano, mes, dia)
            return v
        except ValueError:
            raise ValueError('Data inválida. Use formato DD/MM/AAAA')

    @field_validator('hora_nascimento')
    @classmethod
    def validar_hora(cls, v):
        try:
            hora, minuto = map(int, v.split(':'))
            if not (0 <= hora < 24 and 0 <= minuto < 60):
                raise ValueError("Hora ou minuto inválidos")
            return v
        except ValueError:
            raise ValueError('Hora inválida. Use formato HH:MM')

    class Config:
        schema_extra = {
            "example": {
                "nome": "Maria Silva",
                "data_nascimento": "25/03/1990",
                "hora_nascimento": "08:30",
                "local_nascimento": "Rio de Janeiro/RJ",
                "timezone": "America/Sao_Paulo"
            }
        }