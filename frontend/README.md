# React + JavaScript + Vite

Este projeto contém o frontend da plataforma **SAEEARAPIRACA**, desenvolvido com **React** e estruturado para manter a separação clara entre a interface e o futuro servidor de dados. O ambiente foi configurado para ser leve e extremamente rápido durante o desenvolvimento através do **Vite**.

## Como Iniciar

Como este projeto utiliza o Vite como ferramenta de build e ambiente de desenvolvimento, siga os passos abaixo para rodar a aplicação localmente:

1. **Acesse a pasta do frontend:**

        cd frontend

2. **Instale as dependências:**
 
        npm install


3. **Inicie o servidor de desenvolvimento:** 

        npm run dev


## Estrutura do Projeto

A organização segue um padrão de **Arquitetura Desacoplada**, garantindo que o frontend e o backend operem de forma independente dentro da pasta principal:

* **`app/frontend/`**: Contém todo o código React, componentes e configurações do Vite.
* **`app/backend/`**: Pasta destinada à implementação futura da lógica do servidor e integração de APIs.

## Tecnologias e Funcionalidades

* **Fast Refresh (HMR)**: O ambiente está configurado para atualizar a interface instantaneamente ao salvar arquivos.
* **Vite Config**: O arquivo `vite.config.js` gerencia o ambiente de desenvolvimento, facilitando futuras configurações de comunicação com o backend.
