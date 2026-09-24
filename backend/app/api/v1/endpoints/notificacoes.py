from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps import get_db, get_current_user
from app.crud.notificacao import (
    contar_nao_lidas,
    get_notificacoes_by_usuario,
    marcar_como_lida,
)
from app.schemas.notificacao import ContagemNaoLidas, NotificacaoRead

router = APIRouter(prefix="/notificacoes", tags=["Notificações"])


@router.get(
    "/",
    response_model=List[NotificacaoRead],
    status_code=status.HTTP_200_OK,
    summary="Listar minhas notificações",
    description=(
        "Retorna as notificações do usuário autenticado, das mais recentes "
        "para as mais antigas. Use apenas_nao_lidas=true para filtrar só as "
        "que ainda não foram visualizadas."
    ),
)
def listar_notificacoes(
    apenas_nao_lidas: bool = False,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
) -> List[NotificacaoRead]:
    return get_notificacoes_by_usuario(
        db=db,
        usuario_id=str(current_user.id),
        apenas_nao_lidas=apenas_nao_lidas,
    )


@router.get(
    "/nao-lidas",
    response_model=ContagemNaoLidas,
    status_code=status.HTTP_200_OK,
    summary="Contar notificações não lidas",
    description=(
        "Retorna quantas notificações do usuário autenticado ainda não foram "
        "visualizadas. Serve para o contador exibido no aplicativo."
    ),
)
def contar_notificacoes_nao_lidas(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
) -> ContagemNaoLidas:
    return ContagemNaoLidas(nao_lidas=contar_nao_lidas(db=db, usuario_id=str(current_user.id)))


@router.patch(
    "/{notificacao_id}/lida",
    response_model=NotificacaoRead,
    status_code=status.HTTP_200_OK,
    summary="Marcar notificação como lida",
    description=(
        "Marca como visualizada uma notificação do próprio usuário. "
        "Notificações de outros usuários respondem 404."
    ),
)
def marcar_notificacao_como_lida(
    notificacao_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
) -> NotificacaoRead:
    notificacao = marcar_como_lida(
        db=db,
        notificacao_id=str(notificacao_id),
        usuario_id=str(current_user.id),
    )

    # 404 e não 403: uma notificação de outro usuário não deve ter sua
    # existência revelada.
    if not notificacao:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notificação não encontrada.",
        )

    return notificacao
