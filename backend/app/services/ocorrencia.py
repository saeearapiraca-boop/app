from typing import Any, Dict
from sqlalchemy.orm import Session
from app.schemas.ocorrencia import OcorrenciaCreate
from app.models.ocorrencia import Ocorrencia, StatusOcorrencia
from app.crud.ocorrencia import (
    create_ocorrencia,
    update_ocorrencia_status,
    get_totais_ocorrencias,
    get_ocorrencias_por_status,
    get_ocorrencias_por_bairro
)
from app.services.notificacao import notificar_mudanca_status

def registrar_ocorrencia(
    db: Session, 
    ocorrencia_in: OcorrenciaCreate, 
    midia_url: str = None, 
    usuario_id: str = None
):
    return create_ocorrencia(
        db=db, 
        ocorrencia_in=ocorrencia_in, 
        midia_url=midia_url, 
        usuario_id=usuario_id
    )


def alterar_status_ocorrencia(
    db: Session,
    ocorrencia: Ocorrencia,
    novo_status: StatusOcorrencia
) -> Ocorrencia:
    """Atualiza o status da ocorrência e notifica o autor da denúncia.

    O status anterior precisa ser lido antes do update: depois do commit o
    valor antigo já não existe mais.
    """
    status_anterior = ocorrencia.status
    status_novo = novo_status.value if hasattr(novo_status, "value") else str(novo_status)

    ocorrencia_atualizada = update_ocorrencia_status(
        db=db,
        ocorrencia_id=str(ocorrencia.id),
        novo_status=novo_status
    )

    notificar_mudanca_status(
        db=db,
        ocorrencia=ocorrencia_atualizada,
        status_anterior=status_anterior,
        status_novo=status_novo
    )

    return ocorrencia_atualizada

def get_dashboard_data(db: Session) -> Dict[str, Any]:
    # 1. Total absoluto
    total_ocorrencias = get_totais_ocorrencias(db)

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