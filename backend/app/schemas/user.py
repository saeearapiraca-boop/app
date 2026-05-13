import re
from datetime import datetime, date
from uuid import UUID
from typing import Optional
from pydantic import BaseModel, EmailStr, Field, field_validator


_PASSWORD_REGEX = re.compile(
    r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+\-_])[A-Za-z\d@$!%*?&#+\-_]{8,}$"
)

_DATE_REGEX = re.compile(r"^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/([12]\d{3})$")


class UserCreate(BaseModel):
    nome_completo: str = Field(min_length=3, max_length=150)
    email: EmailStr
    senha: str = Field(min_length=8)
    birth_date: Optional[str] = Field(
        default=None,
        examples=["09/06/2005"],
        description="Data de nascimento no formato DD/MM/YYYY"
    )

    @field_validator("nome_completo", mode="before")
    @classmethod
    def strip_name(cls, v: str) -> str:
        return v.strip()

    @field_validator("birth_date", mode="before")
    @classmethod
    def validate_birth_date(cls, v: Optional[str]) -> Optional[date]:
        if v is None:
            return None
        if not isinstance(v, str):
            raise ValueError("Data deve ser uma string no formato DD/MM/YYYY")
        if not _DATE_REGEX.match(v):
            raise ValueError("Data deve estar no formato DD/MM/YYYY (ex: 09/06/2005)")
        try:
            day, month, year = v.split("/")
            return date(int(year), int(month), int(day))
        except ValueError as e:
            raise ValueError(f"Data inválida: {str(e)}")

    @field_validator("senha")
    @classmethod
    def validate_password_strength(cls, v: str) -> str:
        if not _PASSWORD_REGEX.match(v):
            raise ValueError(
                "Senha deve conter pelo menos 8 caracteres, "
                "uma letra maiúscula, uma minúscula, "
                "um número e um caractere especial (@$!%*?&#+_-)"
            )
        return v


class UserUpdate(BaseModel):
    nome_completo: str | None = Field(default=None, min_length=3, max_length=150)
    email: EmailStr | None = None
    senha: str | None = Field(default=None, min_length=8)
    birth_date: str | None = Field(
        default=None,
        examples=["09/06/2005"],
        description="Data de nascimento no formato DD/MM/YYYY"
    )

    @field_validator("nome_completo", mode="before")
    @classmethod
    def strip_name(cls, v: str | None) -> str | None:
        return v.strip() if v else v

    @field_validator("birth_date", mode="before")
    @classmethod
    def validate_birth_date(cls, v: str | None) -> Optional[date]:
        if v is None:
            return None
        if not isinstance(v, str):
            raise ValueError("Data deve ser uma string no formato DD/MM/YYYY")
        if not _DATE_REGEX.match(v):
            raise ValueError("Data deve estar no formato DD/MM/YYYY (ex: 09/06/2005)")
        try:
            day, month, year = v.split("/")
            return date(int(year), int(month), int(day))
        except ValueError as e:
            raise ValueError(f"Data inválida: {str(e)}")

    @field_validator("senha")
    @classmethod
    def validate_password_strength(cls, v: str | None) -> str | None:
        if v is not None and not _PASSWORD_REGEX.match(v):
            raise ValueError(
                "Senha deve conter pelo menos 8 caracteres, "
                "uma letra maiúscula, uma minúscula, "
                "um número e um caractere especial (@$!%*?&#+_-)"
            )
        
        return v


# Schema para DEVOLVER os dados de criação 
class UserCreateResponse(BaseModel):
    id: UUID
    nome_completo: str
    email: str
    birth_date: Optional[date] = None
    created_at: datetime

    class Config:
        from_attributes = True


# Schema para DEVOLVER os dados de atualização
class UserUpdateResponse(BaseModel):
    id: UUID
    nome_completo: str
    email: str
    birth_date: Optional[date] = None
    is_active: bool
    updated_at: datetime

    class Config:
        from_attributes = True


    class Config:
        from_attributes = True