from typing import Any, Dict
from sqlalchemy.orm import Session
from app.schemas.ocorrencia import OcorrenciaCreate
from app.models.ocorrencia import Ocorrencia
from app.crud.ocorrencia import (
    create_ocorrencia,
    get_total_ocorrencias,
    get_ocorrencias_por_status,
    get_ocorrencias_por_bairro
)

def registrar_ocorrencia(db: Session, ocorrencia_in: OcorrenciaCreate, midia_url: str = None) -> Ocorrencia:
    return create_ocorrencia(db=db, ocorrencia_in=ocorrencia_in, midia_url=midia_url)

def get_dashboard_data(db: Session) -> Dict[str, Any]:
    # 1. Total absoluto
    total_ocorrencias = get_total_ocorrencias(db)

    # 2. Status
    status_data = get_ocorrencias_por_status(db)
    distribuicao_status = []
    em_aberto = 0
    resolvidas = 0

    for status_item, count in status_data:
        status_str = status_item.value if hasattr(status_item, "value") else str(status_item)
        distribuicao_status.append({"status": status_str, "quantidade": count})

        status_lower = status_str.lower()
        if "abert" in status_lower:
            em_aberto += count
        elif "resolv" in status_lower:
            resolvidas += count

    # 3. Bairros
    bairros_data = get_ocorrencias_por_bairro(db)
    distribuicao_bairros = []
    bairro_mais_afetado = None
    maior_qtd = -1

    bairros_ordenados = sorted(bairros_data, key=lambda item: item[1], reverse=True)

    for localizacao, count in bairros_ordenados:
        nome_bairro = localizacao if localizacao else "Não informado"
        distribuicao_bairros.append({"bairro": nome_bairro, "quantidade": count})

        if count > maior_qtd:
            maior_qtd = count
            bairro_mais_afetado = {"nome": nome_bairro, "quantidade": count}

    return {
        "resumo": {
            "totalOcorrencias": total_ocorrencias,
            "emAberto": em_aberto,
            "resolvidas": resolvidas,
        },
        "distribuicaoPorStatus": distribuicao_status,
        "bairros": {
            "bairroMaisAfetado": bairro_mais_afetado,
            "distribuicao": distribuicao_bairros,
        }
    }