# Identificação de Inconformidades no Saneamento Básico

## Sobre o Projeto
O presente projeto tem como finalidade o desenvolvimento de uma plataforma web colaborativa voltada à identificação, registro e monitoramento de inconformidades relacionadas ao saneamento básico no município de Arapiraca – AL.

A proposta surge diante da carência de mecanismos eficientes de fiscalização e comunicação entre a população e o poder público. Nesse contexto, a solução permite que cidadãos registrem ocorrências por meio de evidências visuais associadas à geolocalização, contribuindo para o aumento da transparência, do engajamento social e do suporte à tomada de decisão por parte da gestão pública.

---

## Objetivo
Desenvolver um **Produto Mínimo Viável (MVP)** que possibilite:

- Registro de inconformidades com evidências fotográficas;
- Captura automática de coordenadas geográficas;
- Visualização das ocorrências em mapa interativo;
- Participação da comunidade na validação das denúncias.

---

## Funcionalidades

### Mapeamento Georreferenciado
- Visualização das ocorrências em tempo real;
- Agrupamento de registros por região (clusterização);
- Classificação por categorias (esgoto, água, resíduos, entre outros).

### Registro de Ocorrências
- Upload de até três imagens por ocorrência;
- Captura automática da localização via GPS;
- Classificação temática da inconformidade.

### Gestão e Transparência
- Acompanhamento do status das denúncias;
- Consulta ao histórico de registros por usuário;
- Interação social por meio de curtidas e comentários.

---

## Tecnologias Utilizadas

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

### Backend
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)

### Banco de Dados
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

### Ferramentas
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

---

## Arquitetura do Sistema

O sistema adota uma arquitetura em três camadas:

**1. Camada de Apresentação (Frontend)**  
Responsável pela interface com o usuário, bem como pela captura e envio dos dados.

**2. Camada de Aplicação (Backend)**  
- TypeScript: responsável pela lógica de negócio e gerenciamento das APIs;  
- Python: responsável pelo processamento de dados e análises.

**3. Camada de Persistência (Banco de Dados)**  
- MongoDB, com suporte a dados geoespaciais.

**Fluxo de operação:** o usuário registra a ocorrência → o backend realiza a validação → os dados são persistidos → o mapa é atualizado em tempo real.

---

## Metodologia

O desenvolvimento do projeto é conduzido com base na metodologia ágil **Scrum**, contemplando:

- Sprints com duração de duas semanas;
- Entregas incrementais;
- Reuniões periódicas de acompanhamento e alinhamento.

---

## Equipe do Projeto

- [Jhony Wictor do Nascimento Santos](https://github.com/jhonywsantos)  
- [Geovane Ventura Silva](https://github.com/GeovaneVentura)  
- [Gabriela Cota da Silva](https://github.com/Gabrielacota)  
- [Igor Mariano Alencar e Silva](https://github.com/Southcruz)  
- [Karleandro Santos da Silva](https://github.com/Karleandrosilva)  
- [Lucas Rosendo de Farias](https://github.com/LucaRosendo)  
- [Luis Gustavo Correia de Oliveira](https://github.com/LuisGustavoCo)  
- [Liedson da Silva Santos](https://github.com/Liedson1)
- [Mayara da Silva Barbosa](https://github.com/)
- [Rian Carlos da Silva dos Santos](https://github.com/rian1632)
- [Washington Medeiros Mazzone Gaia](https://github.com/washingmg)  
