from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.crud import user as crud_user
from app.models.user import User
from app.schemas.user import UserCreate


def register_user(db: Session, user_in: UserCreate) -> User:
    existing = crud_user.get_user_by_email(db, email=user_in.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="E-mail já cadastrado.",
        )

    hashed_password = get_password_hash(user_in.senha)
    return crud_user.create_user(db, user_in=user_in, hashed_password=hashed_password)
