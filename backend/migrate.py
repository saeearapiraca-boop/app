from sqlalchemy import text
from app.db.database import engine

def migrate():
    with engine.connect() as connection:
        connection.execute(text("""
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS data_nascimento DATE,
            ADD COLUMN IF NOT EXISTS sexo VARCHAR(20);
        """))
        connection.execute(text("""
            ALTER TABLE ocorrencias
            ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
            ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;
        """))
        connection.execute(text("""
            ALTER TABLE comentarios
            ADD COLUMN IF NOT EXISTS usuario_id UUID REFERENCES users(id);
        """))
        connection.commit()
        print("✅ Tabela atualizada com sucesso")

if __name__ == "__main__":
    migrate()
