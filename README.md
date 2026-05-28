# Identificação de Inconformidades no Saneamento Básico

## Sobre o Projeto

O projeto **Identificação de Inconformidades no Saneamento Básico** está sendo desenvolvido pelos discentes do curso de Ciência da Computação da [Universidade Federal de Alagoas - Campus Arapiraca](https://ufal.br/), com o objetivo de construir uma plataforma web colaborativa voltada ao registro, monitoramento e visualização de problemas relacionados ao saneamento básico no município de Arapiraca – AL.

A aplicação busca aproximar a população dos órgãos responsáveis, permitindo que cidadãos realizem denúncias por meio de imagens, localização geográfica e categorização das ocorrências. A plataforma também fornece mecanismos de acompanhamento das denúncias e visualização georreferenciada das informações registradas.

O sistema está sendo desenvolvido utilizando metodologias ágeis, com organização das tarefas através do Scrum Board do projeto e versionamento contínuo no GitHub.

---

# Objetivos do Projeto

## Objetivo Geral

Desenvolver uma plataforma web colaborativa para identificação e monitoramento de inconformidades relacionadas ao saneamento básico.

## Objetivos Específicos

* Permitir o cadastro e autenticação de usuários;
* Possibilitar o registro de denúncias contendo imagens e localização;
* Exibir as ocorrências em um mapa interativo;
* Organizar denúncias por categorias;
* Facilitar o acompanhamento do status das ocorrências;
* Incentivar a participação popular na fiscalização urbana;
* Fornecer uma base organizada de dados para apoio à gestão pública.

---

# Funcionalidades Implementadas

## Sistema de Autenticação

* Cadastro de usuários;
* Login e validação de acesso;
* Controle básico de autenticação.

## Registro de Ocorrências

* Criação de denúncias;
* Envio de imagens relacionadas à ocorrência;
* Associação automática da localização geográfica;
* Classificação por categoria.

## Visualização Geográfica

* Exibição das ocorrências em mapa interativo;
* Organização espacial das denúncias;
* Identificação visual das inconformidades registradas.

## Gerenciamento de Informações

* Listagem de ocorrências cadastradas;
* Visualização detalhada das denúncias;
* Atualização de status;
* Estrutura inicial para interação entre usuários.

---

# Tecnologias Utilizadas

## Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)

## Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)

## Banco de Dados

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)

## Ferramentas e Organização

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge\&logo=figma\&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge\&logo=notion\&logoColor=white)

---

# Organização do Projeto

## Repositórios

* Repositório principal: [https://github.com/saeearapiraca-boop](https://github.com/saeearapiraca-boop)
* Aplicação: [https://github.com/saeearapiraca-boop/app](https://github.com/saeearapiraca-boop/app)

## Gerenciamento Ágil

* Scrum Board / Project: [https://github.com/users/saeearapiraca-boop/projects/1/views/1](https://github.com/users/saeearapiraca-boop/projects/1/views/1)

## Prototipação

* Figma: [https://www.figma.com/design/DMTaAyC02g7qIc969hosFx/Sem-t%C3%ADtulo?node-id=0-1&t=gpqhnejV8z5WfFmj-1](https://www.figma.com/design/DMTaAyC02g7qIc969hosFx/Sem-t%C3%ADtulo?node-id=0-1&t=gpqhnejV8z5WfFmj-1)

---

# Arquitetura do Sistema

O sistema foi estruturado em três camadas principais:

## 1. Camada de Apresentação (Frontend)

Responsável pela interface visual da aplicação, interação com os usuários e consumo das APIs.

### Responsabilidades

* Exibição das informações;
* Formulários de cadastro e denúncias;
* Navegação entre páginas;
* Integração com mapas e localização.

---

## 2. Camada de Aplicação (Backend)

Responsável pelo processamento das regras de negócio e comunicação entre frontend e banco de dados.

### Responsabilidades

* Gerenciamento de autenticação;
* Processamento das denúncias;
* Validação de dados;
* Integração com serviços de localização;
* Gerenciamento das APIs.

---

## 3. Camada de Persistência (Banco de Dados)

Responsável pelo armazenamento das informações da aplicação.

### Estruturas armazenadas

* Usuários;
* Ocorrências;
* Categorias;
* Coordenadas geográficas;
* Informações complementares.

---

# Fluxo Básico da Aplicação

1. O usuário realiza login na plataforma;
2. Uma ocorrência é cadastrada com imagens e localização;
3. O backend processa e valida as informações;
4. Os dados são armazenados no banco de dados;
5. A ocorrência é exibida no mapa interativo;
6. Outros usuários podem visualizar e acompanhar a denúncia.

---

# Metodologia de Desenvolvimento

O projeto utiliza a metodologia ágil **Scrum**, permitindo organização incremental das funcionalidades e acompanhamento contínuo da evolução do sistema.

## Estrutura Utilizada

* Organização por sprints;
* Divisão de tarefas no GitHub Projects;
* Controle de versões com Git e GitHub;
* Desenvolvimento colaborativo;
* Reuniões periódicas de alinhamento.

---

# Estrutura do Projeto

```bash
app/
 ├── backend/
 ├── frontend/
 ├── database/
 ├── assets/
 ├── docs/
 └── README.md
```

---

# Como Executar o Projeto

## Pré-requisitos

* Node.js
* Git
* MongoDB
* Python

## Clonando o Repositório

```bash
git clone https://github.com/saeearapiraca-boop/app.git
```

## Acessando o Projeto

```bash
cd app
```

## Instalando Dependências

```bash
npm install
```

## Executando o Projeto

```bash
npm run dev
```

---

# Protótipo

Figura 1.

<img width="835" height="533" alt="image" src="https://github.com/user-attachments/assets/2c641450-c1a6-42aa-b01b-0d1b2a048efc" />

Figura 2.

<img width="861" height="568" alt="image" src="https://github.com/user-attachments/assets/c22d99b2-ef5b-4da9-b7b3-b410ddbaed9b" />

Figura 3.

<img width="650" height="569" alt="image" src="https://github.com/user-attachments/assets/57188dc4-34ed-41fa-8081-102b636e3c64" />

---

# Visualização das Telas

Figura 4.
<img width="1069" height="633" alt="image" src="https://github.com/user-attachments/assets/9387ed86-ff4d-439f-97e8-83707a82792a" />

Figura 5.
<img width="1360" height="637" alt="image" src="https://github.com/user-attachments/assets/af466438-7cad-4205-b32c-d2ab60b751ab" />

Figura 6.
<img width="1121" height="595" alt="image" src="https://github.com/user-attachments/assets/57f6e9df-ee13-49d4-9e81-27ce40213da0" />

Figura 7.
<img width="1600" height="900" alt="image" src="https://github.com/user-attachments/assets/9b06347f-d91d-4903-85bf-f389cd9841a3" />

---
# Equipe do Projeto

* [Jhony Wictor do Nascimento Santos](https://github.com/jhonywsantos)
* [Geovane Ventura Silva](https://github.com/GeovaneVentura)
* [Gabriela Cota da Silva](https://github.com/Gabrielacota)
* [Igor Mariano Alencar e Silva](https://github.com/Southcruz)
* [Karleandro Santos da Silva](https://github.com/Karleandrosilva)
* [Lucas Rosendo de Farias](https://github.com/LucaRosendo)
* [Luis Gustavo Correia de Oliveira](https://github.com/LuisGustavoCo)
* [Liedson da Silva Santos](https://github.com/Liedson1)
* [Mayara da Silva Barbosa](https://github.com/MayaraBarbosa12)
* [Rian Carlos da Silva dos Santos](https://github.com/rian1632)
* [Washington Medeiros Mazzone Gaia](https://github.com/washingmg)

---

# Considerações Finais

O projeto busca contribuir para o fortalecimento da participação social na fiscalização de problemas urbanos relacionados ao saneamento básico, promovendo maior visibilidade às inconformidades registradas e fornecendo suporte tecnológico para futuras ações de monitoramento e gestão pública.

