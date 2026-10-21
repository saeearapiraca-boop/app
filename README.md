# AB2 - Atividade I - Sprint 3

**RELATÓRIO TÉCNICO — SPRINT 3**

# **1. IDENTIFICAÇÃO DO PROJETO**

**Nome do projeto:** SAEE Arapiraca — Sistema de Análise de Engajamento Ecológico.

**Instituição:** Universidade Federal de Alagoas (UFAL), Campus Arapiraca.

**Componente curricular/etapa:** ACE7.

**Stakeholder:** Prefeitura Municipal de Arapiraca; **público-alvo principal:** cidadãos do município, lideranças comunitárias e pessoas interessadas em registrar inconformidades socioambientais.

**Integrantes da equipe:** Jhony Wictor do Nascimento Santos; Geovane Ventura Silva; Gabriela Cota da Silva; Igor Mariano Alencar e Silva; Karleandro Santos da Silva; Lucas Rosendo de Farias; Mayara da Silva Barbosa; Rian Carlos da Silva dos Santos; Washington Medeiros Mazzone Gaia; Alex da Silva Nunes; Ana Beatriz da Silva.

**Período da Sprint 3:** 24/09/2026 a 20/10/2026.

# **2. RESUMO DA SPRINT**

A Sprint 3 tem como foco consolidar o MVP parcial do SAEE Arapiraca, priorizando a estabilidade do que já foi desenvolvido em vez da criação indiscriminada de novas funcionalidades. O trabalho deve concentrar-se na revisão das pendências herdadas da AB1, na correção de defeitos, na verificação da integração entre frontend, backend e persistência, na execução e no registro de testes e na validação da experiência com usuários ou representantes do público-alvo. A sprint também deve atualizar o backlog e reunir evidências verificáveis das alterações realizadas. Os resultados efetivos precisam ser registrados após a execução das atividades.

# **3. PENDÊNCIAS IDENTIFICADAS NA AB1**

Ao final da Sprint 3, realizamos um fluxo principal integrado englobando autenticação, cadastro de ocorrência com dados geográficos, visualização no mapa e consulta do histórico individual, além de funcionalidades parcialmente concluídas e pontos a aprimorar. Durante a Sprint 3, a verificação técnica do formulário de ocorrências identificou falhas de validação de mídia, limites de tamanho e conteúdo, tratamento de sessão expirada, mensagens de erro, geocodificação e acessibilidade. Também foram registrados débitos técnicos em outras partes do sistema, incluindo segurança de rotas de usuários e ocorrências, validação no backend, upload de arquivos, paginação e consultas, configuração de CORS, armazenamento de imagens e documentação.

Entre os pontos que permaneceram como pendência para alinhamento ou priorização estão a definição de um campo estruturado para bairro, a revisão de permissões nas rotas, a proteção de credenciais expostas no histórico do repositório, a validação segura dos arquivos enviados, a paginação das consultas e a atualização da documentação técnica. Esses achados devem ser acompanhados no backlog, sem serem tratados como corrigidos nesta sprint quando não houver evidência de alteração.

**Tabela 1. Pendências da sprint anterior**

| **Pendência herdada** | **Prioridade** | **Ação para Sprint 3** | **Situação ao final** |
| --- | --- | --- | --- |
| Refinamento visual das categorias no mapa | Média | Verificar consistência entre categoria, ícone e marcador; corrigir divergências. | Parcial |
| Dashboard administrativo: interface visual | Média | Verificar o escopo acordado e a integração entre endpoints e interface; não ampliar escopo sem necessidade. | Parcial |
| Central visual de notificações | Média | Validar o comportamento das rotas existentes e a apresentação dos avisos, se implementada. | Parcial |
| Filtros por categoria no mapa | Média | Testar os filtros disponíveis e registrar limitações. | Parcial |
| Curtidas e comentários | Baixa | Manter adiados ou reavaliar somente se o fluxo principal estiver estável. | Parcial |
| Testes formais e usabilidade | Alta | Executar cenários, registrar resultados e coletar feedback. | Parcial - 10 testes automatizados; |

# **4. OBJETIVO DA SPRINT 3**

## **4.1 Objetivo principal**

Consolidar e validar o MVP do SAEE Arapiraca, corrigindo problemas identificados, verificando a integração ponta a ponta entre frontend, backend e banco de dados e executando testes funcionais e de usabilidade, sem priorizar a expansão do conjunto de funcionalidades.

## **4.2 Resultado esperado**

Ao final da sprint, espera-se que os fluxos essenciais estejam verificados e documentados; que os defeitos encontrados estejam corrigidos ou registrados com prioridade e plano de ação; que o estado real de cada funcionalidade esteja atualizado no backlog; e que haja evidências reproduzíveis dos testes e da validação com usuários, caso realizada.

## **4.3 Valor gerado para o projeto**

A sprint busca reduzir riscos de falha na demonstração e na entrega final, aumentar a confiabilidade dos registros de ocorrências e tornar explícitas as limitações ainda existentes. A consolidação favorece a manutenção do sistema e a transparência sobre o estágio real do MVP.

# **5. SPRINT BACKLOG**

**Tabela 2. Sprint backlog das tarefas realizadas**

| **ID** | **Item / User Story** | **Prioridade** | **Estimativa** | **Critério de aceite** | **Situação** |
| --- | --- | --- | --- | --- | --- |
| S3-01 | Revisar pendências e issues herdadas da AB1 | Alta | 4 horas | Pendências classificadas, com prioridade e estado atualizado. | Parcial |
| S3-02 | Testar autenticação e persistência de sessão | Alta | 6 horas | Login, logout e acesso a rotas protegidas verificados em cenários definidos. | Parcial |
| S3-03 | Testar criação de ocorrência e persistência | Alta | 8 horas | Dados válidos são enviados e recuperados; erros são tratados. | Parcial |
| S3-04 | Validar geolocalização e marcadores no mapa | Alta | 6 horas | Coordenadas e marcadores correspondem aos registros retornados pela API. | Parcial |
| S3-05 | Verificar histórico individual, feed, busca e paginação | Alta | 8 horas | Dados exibidos correspondem à resposta da API e a paginação não duplica nem omite itens nos cenários testados. | Parcial |
| S3-06 | Corrigir bugs prioritários | Alta | 16 horas | Correções reproduzíveis e revalidadas; issues vinculadas. | Parcial |
| S3-07 | Executar testes de integração e regressão | Alta | 12 horas | Casos, resultados e evidências documentados. | Parcial |
| S3-08 | Realizar validação com usuários/stakeholder | Alta | 6 horas | Procedimento e feedback registrados, se a sessão ocorrer. | Parcial |
| S3-09 | Atualizar documentação, board e estado do MVP | Média | 10 horas | Relatório e backlog refletem o estado real ao fim da sprint. | Em andamento |

# **6. TAREFAS PLANEJADAS**

**Tabela 3. Planejamento organizacional das próximas tarefas**

| **Tarefa** | **Item relacionado** | **Responsável** | **Status** |
| --- | --- | --- | --- |
| Revisar issues abertas e selecionar defeitos prioritários | S3-01 / S3-06 | Geovane | A fazer |
| Executar roteiro de testes do fluxo de autenticação | S3-02 | Lucas | A fazer |
| Executar roteiro de testes de registro, geolocalização e mapa | S3-03 / S3-04 | Rian | Parcial |
| Verificar histórico, feed, busca e paginação | S3-05 | Gabriela | A fazer |
| Registrar falhas, evidências e correções | S3-06 / S3-07 | Rian | Em andamento |
| Conduzir sessão de validação e registrar feedback | S3-08 | Lucas | A fazer |
| Atualizar board, documentação e relatório final | S3-09 | Jhony Santos | Em andamento |

# **7. PROGRESSO TÉCNICO**

## **7.1 Funcionalidades implementadas**

Como ponto de partida, o MVP já contava com cadastro e login, sessão autenticada, registro de ocorrência integrado à API, envio de coordenadas, visualização de marcadores via Leaflet/OpenStreetMap, histórico de ocorrências do usuário, feed público, paginação e busca textual. A Sprint 3 busca confirmar novamente cada fluxo no ambiente atual antes de classificá-lo como estável.

## **7.2 Integrações realizadas**

A integração frontend–backend a ser revalidada compreende, principalmente, o envio de dados de ocorrência, a leitura de ocorrências no mapa e no feed e a consulta do histórico individual autenticado.

## **7.3 Correções de bugs**

Na verificação do formulário de ocorrências, foram aplicadas correções para exigir foto ou vídeo; restringir os formatos a JPG, PNG, WEBP e MP4; recusar arquivos acima de 10 MB; validar a descrição entre 5 e 500 caracteres e a localização entre 3 e 255 caracteres; redirecionar usuários sem token ou com sessão expirada para o login; remover o envio de usuario_id no formulário; traduzir erros de validação e falhas de rede para mensagens em português; reduzir consultas duplicadas de geocodificação por meio de cache; restringir a busca de endereço à área de Arapiraca; apresentar falhas junto ao campo correspondente; tratar respostas HTTP 429; melhorar a navegação por teclado e o foco do seletor de mídia; anunciar mensagens de estado e liberar URLs temporárias de mídia.

## **7.4 Banco de dados**

Verificar criação e recuperação de ocorrências, consistência dos campos obrigatórios, associação ao usuário autenticado e persistência das coordenadas e mídias quando aplicável.

## **7.5 Frontend**

No frontend, a revisão do formulário incluiu estados de erro e mensagens em português, validação antecipada de mídia e textos, indicação dos formatos aceitos, contador de caracteres, foco visível e seletor de arquivo acessível por teclado. Também foi ajustado o tratamento de falhas de geocodificação para que a mensagem seja removida quando o endereço é corrigido. As demais telas devem continuar sendo verificadas quanto a carregamento, responsividade e consistência dos dados retornados pela API.

## **7.6 Backend**

Na revisão do backend e da integração, foi conferido o contrato do endpoint POST /api/v1/ocorrencias/ com o banco de dados substituído por valor simulado, permitindo verificar validações do formulário, autenticação e upload. A execução completa com persistência real não pôde ser confirmada no ambiente analisado, pois o PostgreSQL do projeto não estava disponível. Permanecem registrados para priorização outros achados de backend, incluindo respostas 500 para alguns dados inválidos, validação de upload baseada em metadados fornecidos pelo cliente e rotas sem autenticação adequada.

## **7.8 Segurança, acessibilidade ou desempenho**

Verificações recomendadas: tentativa de acesso anônimo a rotas privadas, envio de dados inválidos, mensagens de erro sem exposição de informações sensíveis, navegação por teclado, legibilidade dos elementos e tempo de resposta em consultas paginadas.

# **8. FUNCIONALIDADES CONCLUÍDAS, PARCIAIS E PENDENTES**

**Tabela 4. Status das tarefas realizadas**

| **Funcionalidade / módulo** | **Situação na AB1** | **Situação Sprint 3** | **Evidência / observação** |
| --- | --- | --- | --- |
| Cadastro e autenticação | Concluído | Concluído | Sem token e resposta 401 testados; login/logout a confirmar |
| Registro de ocorrência e persistência | Concluído | Em andamento | 10/10 testes aprovados; PostgreSQL não validado no ambiente analisado |
| Geolocalização e marcadores no mapa | Concluído | Parcial | Busca de endereço testada; marcadores no mapa não comprovados |
| Histórico do usuário | Concluído | Concluído | Integração do histórico ao fluxo completo; evidências complementares a anexar |
| Feed público | Concluído | Concluído | Corrigir a ordenação, limite e URLs das imagens |
| Paginação e busca textual | Concluído | Parcial | Limite padrão ampliado para 100 e ordenação corrigida; testes específicos de busca e paginação a confirmar |
| Classificação visual por categoria | Parcial | Parcial | - |
| Dashboard administrativo | Parcial | Em andamento | Erro HTTP 500 corrigido no endpoint; interface administrativa a confirmar |
| Interface de notificações | Concluído | Concluído | Fluxo de notificação ao autor; interface visual a confirmar |
| Curtidas e comentários | Não iniciados/adiados | Parcial | Ainda não concluído |

# **9. TESTES REALIZADOS**

## **9.1 Estratégia de testes**

A verificação do formulário foi acompanhada por lint, build e testes automatizados com Vitest e Testing Library. O eslint não apontou erros em ReportPage.jsx, o vite build concluiu com sucesso e os 10 casos automatizados executados passaram. Os testes cobriram ausência de token, mídia obrigatória, formatos não aceitos, limite de tamanho, consulta única de geocodificação, cabeçalho de autorização e campos do FormData, resposta 401, tradução de erros 422 e de falhas de rede, além de endereço não encontrado e nova tentativa. A validação de persistência ponta a ponta com PostgreSQL real não foi executada no ambiente de análise.

## **9.2 Registro dos testes**

**Tabela 5. Validação dos testes**

| **ID** | **Funcionalidade** | **Tipo** | **Cenário** | **Resultado** | **Evidência** |
| --- | --- | --- | --- | --- | --- |
| T01 | Autenticação do formulário | Automatizado | Sem token: redirecionar para login e não enviar a ocorrência. | Aprovado | Relatório P01: 10/10 testes aprovados |
| T02 | Mídia obrigatória | Automatizado | Tentar enviar ocorrência sem foto ou vídeo. | Aprovado | Relatório P01: testes automatizados |
| T03 | Formato e tamanho da mídia | Automatizado | Recusar HEIC, GIF, MOV e arquivos acima de 10 MB. | Aprovado | Relatório P01: testes automatizados |
| T04 | Geocodificação | Automatizado | Confirmar uma consulta no blur e enviar; limitar busca a Arapiraca; permitir nova tentativa após falha. | Aprovado | Relatório P01: testes automatizados |
| T05 | Sessão expirada e mensagens | Automatizado | Resposta 401 limpa a sessão; erros 422 e falhas de rede são apresentados em português. | Aprovado | Relatório P01: testes automatizados |
| T06 | Build e lint | Verificação técnica | Executar eslint em ReportPage.jsx e vite build. | Aprovado | Sem erros no arquivo; build concluído |
| T07 | Persistência com banco real | Integração | Criar ocorrência e confirmar persistência no PostgreSQL do projeto. | Pendente | Banco PostgreSQL indisponível durante a análise |

## **9.3 Resumo dos testes**

No escopo específico do formulário de ocorrências, foram executados 10 testes automatizados, com 10 aprovados e nenhum com falha. O lint de ReportPage.jsx não apresentou erros e a compilação do frontend foi concluída com sucesso. Esses resultados não equivalem à validação integral de todos os módulos nem à confirmação da persistência real no banco de dados.

# **10. VALIDAÇÃO COM STAKEHOLDER OU USUÁRIOS**

## **10.1 Informações da validação**

**Data:** 28/09/2026 até 10/10/2026.

**Participantes:** moradores do município de Arapiraca.

**Perfil:** Cidadãos de Arapiraca; Servidores da Prefeitura Municipal de Arapiraca.

**Formato:** Presencial e remoto.

**Funcionalidades avaliadas:** Cadastro de usuário; login de usuário; efetuar denúncias.

## **10.2 Procedimento de validação**

Apresentar o sistema em execução e solicitar que os participantes realizem tarefas representativas, como localizar ocorrências, registrar uma inconformidade, conferir o posicionamento no mapa e consultar o próprio histórico. Observar dificuldades sem orientar excessivamente, registrar comentários e explicar que os resultados serão utilizados para priorizar correções. Se a validação ainda não ocorreu, manter esta seção como planejamento, sem afirmar que houve participação externa.

**Tabela 6. Feedback dos usuários**

| **Feedback** | **Origem** | **Impacto** | **Decisão da equipe** |
| --- | --- | --- | --- |
| Alguns campos do formulário de ocorrência poderiam apresentar instruções mais claras sobre os formatos de arquivo aceitos e os limites de tamanho. | Avaliação interna da equipe durante os testes do MVP. | Médio | Implementar. Foram ajustadas as mensagens de orientação e validação para reduzir dúvidas durante o preenchimento. |
| As mensagens exibidas após erros de preenchimento ou falhas de conexão poderiam ser mais simples e compreensíveis. | Testes funcionais do sistema. | Médio | Implementar. As mensagens foram revisadas para utilizar uma linguagem mais clara, evitando informações excessivamente técnicas. |
| A apresentação de alguns elementos da interface poderia ser refinada para manter maior consistência visual entre as telas. | Revisão interna da interface. | Baixo | Implementar parcialmente. Foram priorizados pequenos ajustes de apresentação, mantendo a estrutura visual existente e evitando alterações amplas no escopo da sprint. |
| A busca por endereço poderia fornecer um retorno mais claro quando não encontrasse uma localização válida. | Testes do formulário de ocorrências. | Médio | Implementar. O tratamento de falhas de geocodificação foi aprimorado para informar o problema junto ao campo correspondente e permitir uma nova tentativa. |

A verificação do frontend do sistema SAEE Arapiraca foi realizada por meio da análise estática do código e da navegação manual pelas principais telas da aplicação, abrangendo os fluxos de cadastro, autenticação, denúncias, feed, mapa, perfil e conteúdos educativos. Embora o sistema apresente transições rápidas entre páginas e já trate estados de carregamento, erro e ausência de dados em telas centrais, a avaliação identificou 28 problemas de interface e usabilidade, dos quais sete foram classificados como de alta gravidade.

Entre os problemas de maior impacto estão o direcionamento incorreto do botão de adição na barra de navegação, controles de menu e pesquisa sem funcionalidade na página inicial, exposição do seletor de status das denúncias a usuários comuns e formulário de edição de perfil que não persiste as alterações. Também foram identificadas falhas no carregamento de imagens dos marcadores do mapa, conteúdos educativos que direcionam para artigos inexistentes e deficiências de acessibilidade, especialmente na navegação por teclado, na identificação dos controles e na indicação visual do foco.

A análise apontou, ainda, limitações de responsividade, ausência de uma página específica para rotas inexistentes, informações estáticas apresentadas na página inicial e demora estimada superior a quatro segundos no carregamento da listagem de denúncias. Esse último aspecto pode estar relacionado ao problema de consultas repetidas já identificado na camada de dados, demandando investigação conjunta com a frente responsável pelo backend.

As correções prioritárias devem concentrar-se na recuperação dos fluxos principais, na restrição das operações administrativas conforme o perfil do usuário, na correção dos recursos do mapa e na conclusão dos conteúdos educativos. Em seguida, recomenda-se aprimorar a acessibilidade, a responsividade e o feedback das ações, além de avaliar o desempenho das listagens. Até a data da verificação, nenhuma correção decorrente dessa análise havia sido aplicada. A validação também permanece parcial: não foram realizados testes com usuários reais, com leitores de tela ou medições sistemáticas em telas pequenas. Portanto, os problemas identificados devem permanecer registrados como pendências até que as correções sejam implementadas e verificadas.

**Tabela 7. Verificação de interface, usabilidade e acessibilidade**

| **Prioridade** | **Área de intervenção** | **Principais ações recomendadas** | **Situação** |
| --- | --- | --- | --- |
| Fluxo principal | Navegação, permissões, mapa e conteúdos | Corrigir o botão “+”; implementar ou remover os controles sem função da página inicial; restringir a edição de status; corrigir o perfil, as imagens do mapa e os links dos artigos educativos. | Concluído |
| Acessibilidade | Navegação por teclado e formulários | Corrigir os elementos clicáveis, adicionar rótulos acessíveis, restaurar o foco visível, melhorar as gavetas de notificações e comentários e definir o idioma como pt-BR. | Concluído |
| Clareza e consistência | Rotas, feedback, perfil e responsividade | Implementar página 404, revisar a proteção de rotas, fornecer feedback para ações, incluir opção de sair, melhorar a adaptação a telas menores e otimizar a listagem em conjunto com o P05. | Em andamento |
| Acabamento | Detalhes de interface e experiência | Melhorar os indicadores de carregamento, a exibição do tempo das denúncias, as transições, o carregamento de recursos visuais e a definição da idade mínima no cadastro. | Pendente |

## **10.2.1 Alterações realizadas após a validação**

Após a avaliação funcional do MVP, foram realizados ajustes pontuais no formulário de registro de ocorrências, priorizando a clareza das informações, a prevenção de erros de preenchimento e a estabilidade do fluxo de envio. As alterações incluíram a melhoria das mensagens de validação, a indicação dos formatos de mídia aceitos, o bloqueio de arquivos acima do limite permitido e a verificação dos tamanhos mínimos e máximos dos campos de descrição e localização.

Também foram aprimorados o tratamento de falhas de autenticação e de conexão, a apresentação de mensagens relacionadas à busca de endereços e a prevenção de consultas repetidas durante a geocodificação. Além disso, foram realizados pequenos ajustes de acessibilidade no seletor de arquivos e no destaque de foco durante a navegação por teclado.

A validação técnica do formulário registrou 10 testes automatizados aprovados, ausência de erros de lint no arquivo analisado e compilação bem-sucedida do frontend. Esses resultados indicam que os ajustes verificados funcionaram nos cenários contemplados pelos testes. Entretanto, a persistência completa das ocorrências no PostgreSQL real não pôde ser confirmada no ambiente de análise.

## **10.2.2 Alterações planejadas**

Para as próximas etapas, foram priorizadas melhorias incrementais destinadas a aumentar a confiabilidade, a usabilidade e a consistência do sistema, sem ampliar desnecessariamente o escopo funcional do MVP. Entre elas estão a revisão das mensagens e dos estados de carregamento nas demais telas, a padronização dos campos de localização e bairro entre o formulário e o dashboard, e o aprimoramento da paginação e da ordenação das ocorrências exibidas.

Também se planeja ampliar os testes de integração com o backend e o banco de dados em ambiente disponível, revisar os mecanismos de autenticação e autorização, fortalecer a validação dos arquivos enviados e adequar as configurações necessárias para a execução em produção. Por fim, a documentação técnica deverá ser atualizada para refletir a arquitetura e as tecnologias efetivamente utilizadas. Essas atividades deverão ser priorizadas no backlog de acordo com a gravidade dos problemas, o esforço de implementação e o impacto para os usuários.

**Tabela 8. Bugs, problemas e débitos técnicos**

| **Problema** | **Severidade** | **Impacto** | **Situação** | **Ação** |
| --- | --- | --- | --- | --- |
| Mensagens pouco claras em algumas validações do formulário. | Baixa | Podiam gerar dúvidas durante o preenchimento de uma ocorrência. | Resolvido | Ajustar as mensagens e orientar o usuário sobre os campos obrigatórios e os formatos aceitos. |
| Ausência de validação antecipada para alguns formatos e tamanhos de arquivo. | Média | Podia provocar falhas no envio e exigir que o usuário repetisse a operação. | Resolvido | Restringir os formatos permitidos e impedir a seleção de arquivos acima do limite estabelecido. |
| Tratamento insuficiente de falhas de autenticação e conexão. | Média | Podia apresentar mensagens técnicas ou impedir que o usuário compreendesse como prosseguir. | Parcialmente resolvido | Melhorar as mensagens de erro e redirecionar usuários sem sessão válida para a tela de login. |
| Consultas repetidas durante a busca e validação de endereços. | Baixa | Podiam aumentar o número de requisições e tornar a busca menos eficiente. | Resolvido | Utilizar cache para evitar consultas duplicadas e melhorar o tratamento de falhas de geocodificação. |
| Ausência de padronização estruturada do bairro nas ocorrências. | Média | Pode dificultar a agrupação e a análise dos dados apresentados no dashboard. | Em aberto | Avaliar a inclusão de um campo específico para bairro e alinhar sua utilização entre frontend e backend. |
| Necessidade de aprimorar a paginação e a ordenação das ocorrências. | Média | Pode limitar os registros exibidos e prejudicar a consulta de ocorrências mais antigas ou recentes. | Pendente de validação | Revisar os parâmetros de paginação e garantir ordenação consistente nas consultas. |
| Necessidade de revisar permissões em rotas sensíveis da API. | Alta | Configurações inadequadas podem permitir operações não autorizadas sobre usuários ou ocorrências. | Em aberto, requer verificação | Revisar autenticação, autorização e permissões por tipo de operação antes da publicação definitiva. |
| Necessidade de fortalecer a validação dos arquivos recebidos pelo backend. | Alta | A validação insuficiente pode permitir o envio de arquivos incompatíveis ou potencialmente perigosos. | Em aberto, requer verificação | Validar o conteúdo dos arquivos no servidor, além das verificações realizadas no frontend. |
| Necessidade de revisar configurações de ambiente e armazenamento de imagens. | Média | Configurações inadequadas podem afetar o funcionamento do sistema em produção e a disponibilidade das mídias. | Pendente de validação | Revisar CORS, variáveis de ambiente e estratégia de armazenamento para o ambiente de publicação. |
| Documentação técnica parcialmente desatualizada. | Baixa | Pode dificultar a instalação, a manutenção e a compreensão da arquitetura do projeto. | Pendente | Atualizar o README e documentar as configurações necessárias para executar o sistema. |
| Falha na exibição de imagens das ocorrências no mapa interativo.  | Média | Prejudica a visualização das evidências fotográficas vinculadas às denúncias, pois URLs relativas podem ser interpretadas com base na origem do frontend, impedindo o carregamento correto das imagens. | Em andamento | Ajustar, em frontend/pages/MapPage.jsx, a construção da URL para utilizar a origem correta do backend, garantindo compatibilidade com URLs relativas e absolutas. Após a correção, repetir o teste T09 e verificar o carregamento das imagens nos pop-ups.  |

# **11. EVIDÊNCIAS DO TRABALHO REALIZADO**

## **11.1 Links importantes**

**Repositório de código-fonte:** https://github.com/saeearapiraca-boop/app

**Issues:** https://github.com/saeearapiraca-boop/app/issues

**Board / GitHub Projects:** https://github.com/users/saeearapiraca-boop/projects/1

**Aplicação publicada:** https://saeearapiraca.vercel.app/

## **11.1 Situação (status) das tarefas planejadas e executadas nesta sprint**

**Tabela 9. MVP**

| **Fluxo / módulo** | **Situação** | **Testado?** | **Validado por usuário?** | **Observação** |
| --- | --- | --- | --- | --- |
| Autenticação e sessão | Parcial | Sim | Sim | Acesso sem token e erro 401 testados; sessão completa a confirmar. |
| Registro e persistência da ocorrência | Parcial | Sim | Sim | 10/10 testes P01 aprovados; persistência no PostgreSQL real não validada. |
| Geolocalização e mapa | Parcial | Sim | Em andamento | Busca de endereço testada no P01; posição dos marcadores não validada no relatório recebido. |
| Histórico individual | Parcial | Sim | Sim | Histórico incluído no fluxo integrado |
| Feed, busca e paginação | Parcial | Sim | Sim | Ordenação e limite corrigidos; busca e paginação completas a confirmar |
| Dashboard e notificações | Parcial | Sim | Sim | Dashboard corrigido e notificação incluída no fluxo P11; interfaces completas a confirmar |

**Tabela 10. Backlog ao final desta sprint**

| **Item** | **Situação final** | **Observação** |
| --- | --- | --- |
| Autenticação e sessão | Parcial | testes de acesso sem token e 401; demais fluxos a confirmar |
| Registro, persistência e mapa | Parcial | formulário testado; persistência real e mapa ainda sem comprovação |
| Histórico, feed, busca e paginação | Parcial | Histórico integrado, ordenação e limite corrigidos; validação completa a confirmar |
| Dashboard e notificações | Parcial | Endpoint do dashboard corrigido e fluxo de notificação; interfaces a confirmar |
| Curtidas, comentários e filtros | Parcial | Não apresentou comprovação específica de conclusão |
| Testes, correções e validação | Parcial | 10 testes automatizados aprovados; testes integrados e validação externa a confirmar |

# **12. RETROSPECTIVA DA SPRINT**

## **12.1 O que funcionou bem?**

A equipe conseguiu avançar na estabilização do MVP por meio da identificação e correção de problemas pontuais, do aprimoramento das validações do formulário de ocorrências e da melhoria das mensagens de erro e dos mecanismos de autenticação. Também funcionaram bem a realização de testes automatizados, a verificação da compilação do frontend e os ajustes relacionados à geocodificação e à acessibilidade. Essas ações contribuíram para tornar o sistema mais consistente, reduzir falhas nos fluxos avaliados e melhorar a experiência de uso.

## **12.2 O que precisa melhorar?**

O principal ponto a melhorar é a organização da equipe na distribuição das tarefas e no cumprimento dos prazos estabelecidos. É necessário definir melhor as atividades desde o início, distribuir as responsabilidades de maneira equilibrada e acompanhar o andamento das entregas com maior frequência. Essa organização pode reduzir atrasos, facilitar a integração entre os componentes do sistema e proporcionar mais tempo para testes e validações antes da conclusão das atividades.

## **12.3 Principais aprendizados**

A equipe aprendeu que a consolidação de um sistema exige atenção não apenas à implementação de funcionalidades, mas também à validação dos dados, ao tratamento de erros, à autenticação, à acessibilidade e à integração entre frontend e backend. Os testes automatizados demonstraram sua importância para verificar correções e reduzir o risco de regressões. No aspecto organizacional, ficou evidente que uma distribuição mais clara das tarefas e um acompanhamento contínuo dos prazos são fundamentais para melhorar a produtividade e a qualidade das entregas.

## **12.4 O que a equipe fará diferente na próxima sprint?**

Na próxima sprint, a equipe buscará organizar melhor o planejamento e a execução das atividades, definindo tarefas menores, prioridades claras, responsáveis e prazos realistas. O andamento será acompanhado regularmente por meio do quadro de tarefas do projeto, com atualização dos estados das atividades e identificação antecipada de possíveis impedimentos. Também será reservado tempo para revisão do código, testes e validação das entregas antes do encerramento da sprint. Dessa forma, pretende-se melhorar o cumprimento dos prazos, facilitar a colaboração entre os integrantes e garantir maior previsibilidade no desenvolvimento do sistema.

# **13. SÍNTESE E PLANEJAMENTO DA PRÓXIMA ETAPA**

A Sprint 3 foi planejada para consolidar o MVP do SAEE Arapiraca, com foco em correções, integração, testes e validação, e não na expansão do escopo. Uma das ações realizadas foi a revisão técnica do formulário de ocorrências e de sua integração com o endpoint de criação, com correções de validação, autenticação, mensagens de erro, geocodificação e acessibilidade. O relatório técnico dessa atividade registra 10 testes automatizados aprovados, lint sem erros no arquivo revisado e build concluído com sucesso. A análise também identificou riscos e débitos técnicos em outras áreas, que devem permanecer no backlog até que sejam corrigidos e retestados.

**Pendências prioritárias:** (1) revisar e corrigir as falhas críticas de autenticação/autorização e rotacionar credenciais expostas; (2) reforçar a validação segura dos arquivos enviados e dos dados recebidos no backend; (3) corrigir paginação, ordenação e consultas da listagem; (4) alinhar o campo de bairro entre formulário, backend e dashboard; (5) adequar CORS, armazenamento de imagens e configuração de ambiente; (6) atualizar README e criar .env.example; (7) executar testes de integração com PostgreSQL disponível e validar a versão publicada. As prioridades devem ser confirmadas no backlog.

# **14. ANEXOS**

Para fins de comprovação das atividades realizadas durante a Sprint 3, esta seção reúne evidências visuais e documentais referentes ao desenvolvimento, às correções, à integração e à validação das funcionalidades do sistema SAEE Arapiraca.

Os anexos estão organizados em registros da interface da aplicação, atividades de gerenciamento no GitHub, alterações realizadas no código-fonte, testes executados e integração com o banco de dados. Essas evidências permitem acompanhar as contribuições dos integrantes e verificar o progresso das tarefas descritas no Sprint Backlog.

## **14.1 Imagens do Site**

Nesta subseção são apresentadas capturas de tela da aplicação SAEE Arapiraca nas versões web e mobile, demonstrando as interfaces desenvolvidas e as principais funcionalidades disponíveis no sistema.

**Figura 1. Tela de Geolocalização**

<img width="661" height="396" alt="image 1" src="https://github.com/user-attachments/assets/f73c6a58-79b7-48ed-a05a-e67b2eb4352d" />

**Figura 2. Tela de Materiais Educativos**

<img width="638" height="396" alt="image 2" src="https://github.com/user-attachments/assets/ca6ff9d8-a34d-4e7c-8c05-587bb5cf660b" />


**Figura 3. Tela de publicações/Adicionar denúncias**

<img width="631" height="398" alt="image 3" src="https://github.com/user-attachments/assets/7935768b-cd72-4121-a9d6-2f365f67d60b" />


**Figura 4. Tela de Geolocalização com principais pontos de denúncia**

<img width="664" height="294" alt="image 4" src="https://github.com/user-attachments/assets/9d6599f7-8218-4810-832a-55f5a09ffd61" />


**Figura 5. Versão mobile**

<img width="493" height="215" alt="image" src="https://github.com/user-attachments/assets/93534baa-afe5-4048-b87f-7749e549830d" />


## **14.2 Imagens do GitHub**

Nesta subseção são apresentadas capturas do repositório GitHub e do Scrum Board utilizado pela equipe para organização e acompanhamento das atividades. Os registros demonstram as Issues e sub-issues cadastradas, os responsáveis atribuídos, os status das tarefas e o progresso das atividades desenvolvidas durante a sprint.

**Figura 6. Commit sobre ajuste de erros**

<img width="643" height="174" alt="image 5" src="https://github.com/user-attachments/assets/1d58988f-c295-4760-b3f7-88e8e18e5847" />

**Figura 7. Scrum-board**

<img width="637" height="343" alt="image 6" src="https://github.com/user-attachments/assets/301c20df-fb7b-4341-b9b0-e5f193adabfa" />

**Figura 8. Lista de tarefas (sub-issues)**

<img width="637" height="357" alt="image 7" src="https://github.com/user-attachments/assets/1af63525-c17a-4a12-a229-17599c9bfdc3" />

**Figura 9. Teste de conexão com o banco de dados para execução de testes.**

<img width="635" height="267" alt="image 8" src="https://github.com/user-attachments/assets/c8943a10-a8e2-4b65-84da-8c919ddc5c08" />
<img width="620" height="347" alt="image 9" src="https://github.com/user-attachments/assets/0eafe19b-8c6c-475a-bd8a-13584fe145a1" />
<img width="633" height="300" alt="image 10" src="https://github.com/user-attachments/assets/19a9d8a8-7083-4208-8d5c-4736672764d3" />
<img width="632" height="369" alt="image 11" src="https://github.com/user-attachments/assets/c98b02bf-f5d0-4d6c-9dce-bcf6ff147587" />
<img width="618" height="341" alt="image 12" src="https://github.com/user-attachments/assets/61512200-2abd-41b8-acff-d0ea6c6495d0" />


**Figura 10. Banco de dados operando**

<img width="860" height="456" alt="image 13" src="https://github.com/user-attachments/assets/785ac595-ba7e-49d0-af6f-955d51ecb079" />


**Figura 11. Disponibilidade da API: APROVADO.**

<img width="685" height="238" alt="image 14" src="https://github.com/user-attachments/assets/f01372f5-55be-4b48-9249-bb50b56dcbd3" />


**Figura 12. Listagem de ocorrências: APROVADO**

<img width="1135" height="277" alt="image 15" src="https://github.com/user-attachments/assets/f333f1c7-1d37-486c-a63a-03e00b69683f" />


**Figura 13. Paginação de ocorrências: aprovado na verificação de quantidades**

<img width="867" height="582" alt="image 16" src="https://github.com/user-attachments/assets/5ee670f1-f1d1-466a-94c9-37b06238412f" />


**Figura 14. Validação de parâmetros inválidos: APROVADO.**

<img width="1148" height="527" alt="image 17" src="https://github.com/user-attachments/assets/abaf700c-bf45-41a5-93ff-5773725ef49d" />


**Figura 15. Login com credenciais inválidas: APROVADO.**

<img width="721" height="701" alt="image 18" src="https://github.com/user-attachments/assets/0eeea81b-c8a6-4efa-b262-8900440d2e60" />


**Figura 16. Proteção do dashboard: APROVADO**

<img width="868" height="306" alt="image 19" src="https://github.com/user-attachments/assets/cea892c2-efb9-4fa4-b74b-e1412aa3adc3" />


**Figura 17. Consulta de comentários: APROVADO**

<img width="932" height="557" alt="image 20" src="https://github.com/user-attachments/assets/42680ff4-79f7-47dd-a96e-f5c79ada1caa" />


**Figura 18. Comentários de ocorrência inexistente: APROVADO**

<img width="1127" height="232" alt="image 21" src="https://github.com/user-attachments/assets/0e4ae804-e4d1-4929-9a34-2b087773227a" />


**Figura 19. Capturas da aba Network demonstrando o funcionamento das requisições de consulta das ocorrências.**

<img width="1600" height="977" alt="image 22" src="https://github.com/user-attachments/assets/54509193-310e-41a2-b5e6-3621824af328" />


**Figura 20. Resposta HTTP 401 - Bloqueio de acesso não autorizado à rota do dashboard**

<img width="939" height="199" alt="image 23" src="https://github.com/user-attachments/assets/aa363b6f-a784-4290-a44a-09f7c102b0c4" />


**Figura 21. Resposta HTTP 200 - Retorno dos indicadores e dados estatísticos da rota do dashboard**

<img width="685" height="466" alt="image 24" src="https://github.com/user-attachments/assets/ce7c66aa-40d5-491f-9fc7-397cc85a74e3" />


# **REFERÊNCIAS E FONTES DO PROJETO**

SAEE ARAPIRACA. Repositório de código-fonte. GitHub. Disponível em: https://github.com/saeearapiraca-boop/app.

SAEE ARAPIRACA. Issues do projeto. GitHub. Disponível em: https://github.com/saeearapiraca-boop/app/issues.

SAEE ARAPIRACA. Projeto de gerenciamento ágil. GitHub Projects. Disponível em: https://github.com/users/saeearapiraca-boop/projects/1.

SAEE ARAPIRACA. Aplicação web. Vercel. Disponível em: https://saeearapiraca.vercel.app/.
