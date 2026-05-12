Entre na pasta:
    cd app/backend

Crie o ambiente virtual: 
    python -m venv venv

Ative o ambiente: 
    venv\Scripts\activate

Instale as dependências: 
    pip install -r requirements.txt

Rode o servidor: 
    uvicorn app.main:app --reload