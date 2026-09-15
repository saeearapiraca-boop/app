from typing import Any, Dict, List, Optional

from sqlalchemy.orm import Session

from app.models.notificacao import Notificacao, TipoNotificacao


def create_notificacao(
    db: Session,
    usuario_id: str,
    ocorrencia_id: str,
    mensagem: str,
    tipo: str = TipoNotificacao.status_alterado.value,
    dados: Optional[Dict[str, Any]] = None,
) -> Notificacao:
    notificacao = Notificacao(
        usuario_id=usuario_id,
        ocorrencia_id=ocorrencia_id,
        tipo=tipo,
        dados=dados or {},
        mensagem=mensagem,
    )
    db.add(notificacao)
    db.commit()
    db.refresh(notificacao)
    return notificacao


def get_notificacoes_by_usuario(
    db: Session,
    usuario_id: str,
    apenas_nao_lidas: bool = False,
) -> List[Notificacao]:
    query = db.query(Notificacao).filter(Notificacao.usuario_id == usuario_id)

    if apenas_nao_lidas:
        query = query.filter(Notificacao.lida.is_(False))

    return query.order_by(Notificacao.created_at.desc()).all()


def marcar_como_lida(
    db: Session,
    notificacao_id: str,
    usuario_id: str,
) -> Optional[Notificacao]:
    # O usuario_id entra no filtro da consulta, e não numa verificação posterior:
    # é o que impede um usuário de marcar a notificação de outro.
    notificacao = (
        db.query(Notificacao)
        .filter(
            Notificacao.id == notificacao_id,
            Notificacao.usuario_id == usuario_id,
        )
        .first()
    )

    if not notificacao:
        return None

    if not notificacao.lida:
        notificacao.lida = True
        db.commit()
        db.refresh(notificacao)

    return notificacao


def contar_nao_lidas(db: Session, usuario_id: str) -> int:
    return (
        db.query(Notificacao)
        .filter(
            Notificacao.usuario_id == usuario_id,
            Notificacao.lida.is_(False),
        )
        .count()
    )
