from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError
from app.db.database import engine
from app.core.logger import logger


def verify_database_connection() -> bool:
    try:
        with engine.connect() as connection:
            result = connection.execute(text("SELECT 1"))
            result.close()
        return True
    except SQLAlchemyError as e:
        logger.error(f"Erro ao conectar no banco de dados: {str(e)}")
        return False


def get_database_info() -> dict:
    try:
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT version(), current_database(), current_user")
            )
            version, database, user = result.fetchone()
            return {
                "database": database,
                "user": user,
                "version": version.split(",")[0] if version else "PostgreSQL"
            }
    except Exception:
        return {}
