from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


def create_user(db: Session, user_in: UserCreate, hashed_password: str) -> User:
    user = User(
        nome_completo=user_in.nome_completo,
        email=user_in.email,
        hashed_password=hashed_password,
        data_nascimento=user_in.data_nascimento,
        sexo=user_in.sexo,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(db: Session, user: User, user_in: UserUpdate, hashed_password: str | None = None) -> User:
    update_data = user_in.model_dump(exclude_unset=True)
    if hashed_password:
        update_data["hashed_password"] = hashed_password
    for field, value in update_data.items():
        setattr(user, field, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user: User) -> None:
    db.delete(user)
    db.commit()
