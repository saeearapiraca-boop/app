from typing import Optional

from sqlalchemy.orm import Session

from app.crud.notificacao import create_notificacao
from app.models.notificacao import Notificacao, TipoNotificacao
from app.models.ocorrencia import Ocorrencia


def _montar_mensagem(status_anterior: Optional[str], status_novo: str) -> str:
    if status_anterior:
        return f'Sua denúncia mudou de "{status_anterior}" para "{status_novo}".'
    return f'Sua denúncia agora está como "{status_novo}".'


def notificar_mudanca_status(
    db: Session,
    ocorrencia: Ocorrencia,
    status_anterior: Optional[str],
    status_novo: str,
) -> Optional[Notificacao]:
    """Cria a notificação da mudança de status, quando ela faz sentido.

    Retorna None em dois casos esperados, que não são erro:
    - a ocorrência não tem dono (denúncias antigas têm usuario_id nulo);
    - o status enviado é igual ao que já estava gravado.
    """
    if not ocorrencia.usuario_id:
        return None

    if status_anterior == status_novo:
        return None

    return create_notificacao(
        db=db,
        usuario_id=str(ocorrencia.usuario_id),
        ocorrencia_id=str(ocorrencia.id),
        tipo=TipoNotificacao.status_alterado.value,
        dados={"de": status_anterior, "para": status_novo},
        mensagem=_montar_mensagem(status_anterior, status_novo),
    )
