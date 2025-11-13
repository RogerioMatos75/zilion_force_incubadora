## Funcionalidades (Épicos e User Stories)

| ID | Épico | User Story |
| :--- | :--- | :--- |
| **E01** | **Estrutura Base e Identidade** | |
| 1.1 | E01 | Como usuário, quero uma **Home Page** que apresente a missão da incubadora (HQ para AV, foco em PI) para entender o valor da Zilion Force imediatamente. |
| 1.2 | E01 | Como sistema, preciso de uma **Arquitetura de Navegação** básica e funcional para acessar as páginas principais (Home, Incubadora, Contato). |
| 1.3 | E01 | Como usuário, quero uma página de Contato com canais específicos da Incubadora para estabelecer comunicação. |
| **E02** | **Portal de Submissão de Projetos (Core Business)** | |
| 2.1 | E02 | Como criador, quero uma página "Submeta Seu Projeto" que liste os **Critérios de Seleção e Requisitos de PI** para preparar meu material adequadamente. |
| 2.2 | E02 | Como criador, quero um **Formulário de Submissão Online Robusto** que colete dados do projeto, portfólio e, obrigatoriamente, informações de Propriedade Intelectual. |
| 2.3 | E02 | Como criador, preciso **Aceitar Termos de Envio** (sobre confidencialidade e PI) antes da submissão para garantir segurança jurídica no processo. |
| 2.4 | E02 | Como equipe de avaliação, preciso que os dados e anexos do formulário sejam **coletados e armazenados** de forma segura (e-mail ou base de dados interna) para iniciar a análise. |
| **E03** | **Apresentação da Metodologia e Credibilidade** | |
| 3.1 | E03 | Como criador interessado, quero uma página detalhada sobre os **Programas de Incubação** (Pré, Incubação, Pós) para entender o ciclo de vida do projeto. |
| 3.2 | E03 | Como criador, quero ver a página **"Quem Somos" (Equipe)** com mentores e especialistas (jurídicos, audiovisual) para validar a credibilidade da assessoria. |
| 3.3 | E03 | Como criador, quero ver os **Benefícios para Incubados** para entender o que ganharei ao participar do programa. |
| **E04** | **Vitrine e Validação** | |
| 4.1 | E04 | Como potencial parceiro/cliente, quero uma página **"Projetos Incubados" (Vitrine)** para ver os projetos de HQ e AV que estão sendo desenvolvidos sob a curadoria da Zilion Force. |
| 4.2 | E04 | Como parceiro, quero ver a página de **Parceiros e Fomento** listando instituições (ANPROTEC, SEBRAE) e conexões com o mercado audiovisual (ex: ANCINE). |

## Critérios de Aceitação

| ID | User Story | Critérios de Aceitação (AC) |
| :--- | :--- | :--- |
| **1.1** | Home Page da Incubadora | O título da página deve posicionar a Zilion Force como "Primeira Incubadora de PI de HQs no país". A seção principal deve destacar a expertise em PI para Audiovisual. |
| **1.2** | Arquitetura de Navegação | O menu principal deve incluir as seções: HOME, INCUBADORA DE HQS (novo), O UNIVERSO ZILION FORCE e CONTATO. Todos os links principais devem estar funcionais. |
| **1.3** | Página de Contato | Deve haver um formulário de contato simplificado e um e-mail institucional específico para a Incubadora. |
| **2.1** | Critérios de Seleção | A página deve detalhar o **pré-requisito de comprovação de registro de direitos autorais** (ex: Biblioteca Nacional) para submissão. |
| **2.2** | Formulário de Submissão | O formulário deve ser capaz de coletar (Mínimo): Título do Projeto, Sinopse, Gênero, Dados do Criador, Portfólio Link, Campo de Upload de Amostra da HQ (PDF), Campo de Upload do Comprovante de Registro de Direitos Autorais (obrigatório), e Declaração de Originalidade. |
| **2.3** | Aceite de Termos | Deve haver um checkbox obrigatório de aceitação dos Termos de Confidencialidade e PI para liberar o botão de envio do formulário. |
| **2.4** | Coleta e Armazenamento | Após o envio, o criador deve receber uma mensagem de confirmação, e a equipe de avaliação deve receber um e-mail com todos os dados preenchidos e anexos ou ter acesso à submissão em um local seguro. |
| **3.1** | Programas de Incubação | A página deve definir claramente os focos e durações das fases de Pré-incubação, Incubação e Pós-incubação. |
| **3.2** | Quem Somos (Equipe) | A página deve exibir fotos e currículos resumidos dos principais líderes e mentores da Incubadora para fortalecer a credibilidade. |
| **3.3** | Benefícios para Incubados | A seção deve listar a assessoria jurídica de PI e o acesso ao mercado audiovisual como benefícios chave. |
| **4.1** | Projetos Incubados (Vitrine) | Deve haver pelo menos 3 cards de projetos, com Título, Sinopse e status (Em Incubação/Graduado), validando a atuação da incubadora. |
| **4.2** | Parceiros e Fomento | A página deve exibir os logotipos da ANPROTEC e SEBRAE, além de mencionar a conexão com o fomento audiovisual (FSA/ANCINE). |

## Priorização (MoSCoW)

| ID | User Story | MoSCoW | Justificativa |
| :--- | :--- | :--- | :--- |
| **1.1** | Home Page da Incubadora | Must-Have | Essencial para comunicar a proposta de valor do MVP e sua especialização em PI. |
| **1.2** | Arquitetura de Navegação | Must-Have | A navegação básica é fundamental para a usabilidade e acesso às funcionalidades chave. |
| **1.3** | Página de Contato | Must-Have | Mínimo para comunicação e suporte. |
| **2.1** | Critérios de Seleção e PI | Must-Have | Define a porta de entrada e a principal barreira de qualidade (PI) do programa. |
| **2.2** | Formulário de Submissão Online Robusto | Must-Have | O core operacional do MVP: receber projetos. Sem isso, a incubadora digital não funciona. |
| **2.3** | Aceite de Termos | Must-Have | Requisito legal crítico (Propriedade Intelectual e Confidencialidade) para proteger a Zilion Force e o criador. |
| **2.4** | Coleta e Armazenamento dos Dados | Must-Have | Requisito de sistema. O formulário deve ter um destino funcional para os dados. |
| **3.1** | Programas de Incubação Detalhados | Should-Have | Adiciona clareza ao processo, melhorando a conversão de criadores, mas não impede a submissão inicial. |
| **3.2** | Quem Somos (Equipe) | Should-Have | Fundamental para construir credibilidade e confiança, fator de decisão para o criador. |
| **3.3** | Benefícios para Incubados | Should-Have | Esclarece o ROI (Retorno sobre o Investimento) do tempo do criador no programa. |
| **4.1** | Projetos Incubados (Vitrine Básica) | Should-Have | Prova social inicial; valida que a incubadora está ativa, atraindo mais projetos. |
| **4.2** | Parceiros e Fomento | Should-Have | Fortalece o posicionamento institucional e atrai parceiros, mas pode ser simplificada para o MVP. |
| **C.1** | Notícias / Eventos (Blog Simples) | Could-Have | Útil para engajamento, mas não essencial para a funcionalidade de incubação do MVP. |
| **C.2** | Sub-navegação rica do "Universo Zilion Force" | Could-Have | Importante para o universo maior da Zilion Force Comics, mas secundário à função de Incubadora. |
| **W.1** | Implementação de Login/Área do Criador | Won't-Have | Gestão de usuário é um recurso complexo, fora do escopo do MVP inicial de submissão. |
| **W.2** | Dashboard Interno de Avaliação (Códice do Atlas) | Won't-Have | O MVP usará e-mail/base de dados simples; um sistema de gestão interno (CRM/Workflow) é para a Fase 2. |
| **W.3** | Integração em tempo real com FSA/ANCINE | Won't-Have | Apenas a listagem e menção de fomento são necessárias no MVP (4.2); integração é complexa. |