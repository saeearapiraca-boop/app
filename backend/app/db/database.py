from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# O 'engine' é o que realmente comunica com o banco
engine = create_engine(settings.DATABASE_URL)

# Criamos uma fábrica de sessões
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Classe base para os nossos modelos (tabelas)
Base = declarative_base()
