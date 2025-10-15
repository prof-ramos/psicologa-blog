from fastapi import APIRouter, HTTPException, Depends, Request
from datetime import datetime
from typing import Dict

from app.models.schemas import MapaAstralRequest
from app.services.geonames import GeoNamesService
from app.services.mapa_astral import MapaAstralService
from app.services.cache import CacheManager
from app.config import get_settings

settings = get_settings()
router = APIRouter()

# Dependências
async def get_geonames_service():
    service = GeoNamesService()
    try:
        yield service
    finally:
        await service.close()

def get_mapa_service():
    return MapaAstralService()

def get_cache_manager():
    return CacheManager()

@router.post("/mapa-astral", response_model=Dict, tags=["Mapa Astral"])
async def gerar_mapa_astral(
    request: MapaAstralRequest,
    geonames: GeoNamesService = Depends(get_geonames_service),
    mapa_service: MapaAstralService = Depends(get_mapa_service),
    cache: CacheManager = Depends(get_cache_manager)
):
    """
    Gera mapa astral completo a partir de dados de nascimento.

    - **nome**: Nome completo da pessoa
    - **data_nascimento**: Data no formato DD/MM/AAAA
    - **hora_nascimento**: Hora no formato HH:MM
    - **local_nascimento**: Cidade/UF (ex: São Paulo/SP)
    - **timezone**: Timezone IANA (padrão: America/Sao_Paulo)
    """

    # Verifica cache primeiro
    cached_result = await cache.get_mapa(request.dict())
    if cached_result:
        cached_result["metadata"]["cache_hit"] = True
        return cached_result

    # Busca coordenadas (com cache de localidade)
    cached_coords = await cache.get_localidade(request.local_nascimento)

    if cached_coords:
        coordenadas = cached_coords
    else:
        coordenadas = await geonames.buscar_coordenadas_brasil(request.local_nascimento)
        if not coordenadas:
            raise HTTPException(
                status_code=404,
                detail=f"Localidade '{request.local_nascimento}' não encontrada. Verifique o formato: Cidade/UF"
            )
        await cache.set_localidade(request.local_nascimento, coordenadas)

    # Converte data/hora
    try:
        data_hora = mapa_service.parse_data_brasileira(
            request.data_nascimento,
            request.hora_nascimento
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Erro ao processar data/hora: {str(e)}")

    # Gera mapa astral
    try:
        mapa = await mapa_service.gerar_mapa_astral(
            nome=request.nome,
            data_hora=data_hora,
            lat=coordenadas["latitude"],
            lng=coordenadas["longitude"],
            tz=request.timezone
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao calcular mapa astral: {str(e)}")

    # Monta resposta
    resposta = {
        "dados_pessoais": {
            "nome": request.nome,
            "data_nascimento": data_hora.isoformat(),
            "local_nascimento": f"{coordenadas['cidade']}, {coordenadas['estado']}, {coordenadas['pais']}",
            "coordenadas": {
                "latitude": coordenadas["latitude"],
                "longitude": coordenadas["longitude"]
            }
        },
        "mapa_astral": mapa,
        "metadata": {
            "calculado_em": datetime.utcnow().isoformat() + "Z",
            "versao_api": settings.APP_VERSION,
            "cache_hit": False
        }
    }

    # Armazena em cache
    await cache.set_mapa(request.dict(), resposta)

    return resposta

@router.get("/localidades/{cidade}", tags=["Localidades"])
async def buscar_localidade(
    cidade: str,
    geonames: GeoNamesService = Depends(get_geonames_service),
    cache: CacheManager = Depends(get_cache_manager)
):
    """
    Busca coordenadas de uma localidade brasileira.

    - **cidade**: Nome da cidade/UF (ex: Curitiba/PR)
    """

    # Verifica cache
    cached = await cache.get_localidade(cidade)
    if cached:
        return {"dados": cached, "cache_hit": True}

    # Busca no GeoNames
    coordenadas = await geonames.buscar_coordenadas_brasil(cidade)
    if not coordenadas:
        raise HTTPException(
            status_code=404,
            detail=f"Localidade '{cidade}' não encontrada"
        )

    # Armazena em cache
    await cache.set_localidade(cidade, coordenadas)

    return {"dados": coordenadas, "cache_hit": False}