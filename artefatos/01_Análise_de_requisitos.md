## Regras de Negócio

1.  **Crivo de Propriedade Intelectual (PI):** Todo projeto submetido deve, obrigatoriamente, fornecer comprovante de registro de direitos autorais da HQ original (ex: registro na Biblioteca Nacional) como pré-requisito para avaliação. Submissões sem esta prova serão sumariamente rejeitadas pelo sistema (O "Crivo do Atlas" inicial).
2.  **Foco em Convergência:** O propósito primário da incubadora é fomentar a transição de PI de HQs para o formato Audiovisual (AV). Todos os conteúdos e critérios de avaliação devem refletir essa missão.
3.  **Ciclo de Incubação Estruturado:** O processo deve ser dividido e apresentado em três fases claras (Pré-incubação, Incubação e Pós-incubação), com critérios de entrada e saída definidos para cada estágio.
4.  **Gestão de Chamadas:** O formulário de submissão (Porta para o Criador) deve ter a capacidade de ser ativado/desativado de acordo com as chamadas públicas para projetos, ou gerenciar projetos em fila de espera para o próximo ciclo de avaliação.
5.  **Compromisso com Metodologia:** O site deve referenciar a busca pela acreditação CERNE (Centro de Referência para Apoio a Novos Empreendimentos) e detalhar a metodologia interna ("Códice Metodológico") para validar a seriedade do processo.

## Requisitos Funcionais

1.  **Formulário de Submissão Robusto (Porta para o Criador):** Implementação de um formulário de múltiplos campos que permita a coleta de dados detalhados (sinopse, gênero, público-alvo, portfólio do criador) e seja capaz de processar uploads seguros de documentos de PI e amostras da HQ (PDF/Imagens).
2.  **Sistema de Gestão de Conteúdo (CMS):** Capacidade de a equipe interna gerenciar e atualizar de forma autônoma:
    *   Detalhes dos Programas de Incubação.
    *   Notícias e Eventos (Lançamento de Chamadas).
    *   Páginas estáticas (Metodologia, Quem Somos).
    *   Dados do Portfólio de Incubados.
3.  **Portfólio de Projetos Incubados:** Criação de uma vitrine digital navegável que exiba os projetos atuais e graduados, incluindo sinopse, status de maturação e links para os criadores ou projetos AV resultantes.
4.  **Painel de Administração (Backend do Crivo):** Interface interna para a equipe de avaliação que permita:
    *   Visualizar e filtrar submissões.
    *   Aplicar o checklist de PI (verificação de documentos).
    *   Atribuir notas e mudar o status dos projetos (Ex: Rejeitado, Em Análise, Incubado).
5.  **Integração de Mídia:** Funcionalidade para incorporação fácil de vídeos (trailers de AV, pitches), galerias de concept art e links externos de fomento (ANCINE, ANPROTEC).

## Requisitos Não Funcionais

1.  **Segurança (Security):**
    *   Uso obrigatório de HTTPS/SSL.
    *   Armazenamento seguro e criptografado dos documentos de Propriedade Intelectual submetidos (dados sensíveis).
    *   Autenticação de dois fatores (2FA) para acesso ao Painel Administrativo.
2.  **Performance (Performance):**
    *   Otimização de imagens e scripts para garantir carregamento de páginas essenciais (Home, Programas) em menos de 3 segundos (FCP).
    *   O sistema de upload deve suportar picos de tráfego e grandes volumes de arquivos durante o período de chamadas abertas.
3.  **Usabilidade e Design (Usability & Design):**
    *   O design deve ser *mobile-first* (totalmente responsivo), dado que criadores podem acessar o site e submeter materiais via dispositivos móveis.
    *   A identidade visual deve ser profissional, reforçando a credibilidade da Zilion Force como hub de PI e o foco no mercado audiovisual.
4.  **Escalabilidade (Scalability):**
    *   A arquitetura deve ser capaz de absorver o crescimento do Portfólio de Incubados sem degradação do desempenho, utilizando armazenamento em nuvem (cloud storage) para os ativos de mídia.
5.  **Conformidade (Compliance):**
    *   Estar em conformidade com a Lei Geral de Proteção de Dados (LGPD) no Brasil, com termos de uso e política de privacidade claros, especialmente no que tange aos dados e PI dos submetidos.

## Personas de Usuário

| Persona | Descrição | Motivações Primárias | Principais Interações |
| :--- | :--- | :--- | :--- |
| **P1: O Criador de PI (Elias, 28)** | Roteirista e artista de HQ com uma obra registrada e interesse em adaptá-la para série ou filme. Precisa de apoio jurídico e conexão com o mercado. | Validação da PI, acesso a mentoria especializada e ingresso no mercado audiovisual. | Leitura dos Programas e Critérios; Preenchimento do Formulário de Submissão. |
| **P2: O Archon (Valéria, 45)** | Administradora e gerente da Incubadora, responsável por aplicar o Códice Metodológico e gerenciar os projetos. | Eficiência na triagem de projetos, gestão clara do pipeline e manutenção da reputação institucional. | Uso do Painel Administrativo, Moderação de Submissões, Atualização de Status. |
| **P3: O Investidor/Parceiro de Conteúdo (Marco, 50)** | Executivo de produtoras ou fundos de investimento, buscando IPs maduras, validadas e com risco de PI mitigado para aquisição ou coprodução. | Encontrar projetos de alto potencial de mercado, conhecer a metodologia de triagem e verificar o Portfólio Incubado. | Navegação no Portfólio, Consulta de Parcerias e Fomento, Contato via formulário específico. |
| **P4: O Fiscal Institucional (Ana, 38)** | Representante de órgãos de fomento (ex: ANPROTEC, SEBRAE) ou reguladores (ex: ANCINE). | Verificar a transparência da metodologia, a aplicação correta dos recursos e a conformidade legal da incubadora. | Leitura das páginas de Metodologia, Valores e Parcerias. |

## Fluxos de Usuário

### Fluxo 1: Submissão de Novo Projeto (Criador)

1.  **Ponto de Partida:** Usuário (P1) acessa a seção "INCUBADORA DE HQS".
2.  **Verificação de Critérios:** Usuário consulta a página "Critérios de Seleção" para garantir que possui o comprovante de PI registrado.
3.  **Início da Submissão:** Usuário clica em "Submeta seu Projeto" (Porta para o Criador).
4.  **Preenchimento:** Usuário preenche o formulário robusto, detalhando a HQ, o plano de adaptação AV e a equipe.
5.  **Upload de PI:** Usuário anexa o documento de registro de direitos autorais e amostras da HQ.
6.  **Confirmação:** Usuário aceita os Termos de Avaliação e Envia o Formulário.
7.  **Sistema:** O sistema armazena os dados em um ambiente seguro e envia um e-mail de confirmação ao criador.

### Fluxo 2: Avaliação e Triagem (Archon)

1.  **Login:** Archon (P2) faz login seguro no Painel Administrativo.
2.  **Visualização:** Archon acessa a lista de "Novas Submissões".
3.  **Crivo do Atlas (Fase 1 - PI):** Archon verifica se o comprovante de PI foi carregado corretamente e é válido. Se negativo, o projeto é movido para o status "Rejeitado - Falha PI".
4.  **Análise de Conteúdo:** Se a PI for aprovada, Archon avalia a sinopse e o potencial de AV.
5.  **Atribuição e Score:** Archon atribui um score inicial e move o projeto para o status "Em Avaliação/Mentoria".

### Fluxo 3: Prospecção de PI (Investidor)

1.  **Busca:** Investidor (P3) acessa a seção "Projetos Incubados" (Vitrine).
2.  **Filtro:** Investidor filtra os projetos por Gênero (Ex: Ficção Científica) e Status (Ex: Pós-incubação ou Em busca de co-produtor).
3.  **Detalhe do Projeto:** Investidor clica no projeto de interesse para visualizar a sinopse completa e o estágio de desenvolvimento.
4.  **Contato:** Investidor utiliza o formulário específico de "Parcerias de Conteúdo" e referencia o projeto para iniciar contato com a Zilion Force.
<br>
<hr>
<br>

### 🧠 Instruções para o Agente de Desenvolvimento

**📝 Prompt Complementar:**
Este artefato estabelece a fundação, as regras de negócio e os principais fluxos de usuário para a Zilion Force. Para a construção do Mínimo Produto Viável (MVP), o foco deve ser a validação da hipótese primária: A capacidade de coletar e triar a Propriedade Intelectual (PI) de HQs de forma segura e eficiente (O Crivo do Atlas). O objetivo da próxima fase de desenvolvimento é construir a arquitetura mínima necessária (Backend e Frontend) para suportar os processos de submissão (Fluxo 1) e avaliação primária (Fluxo 2), garantindo a integridade e segurança dos dados sensíveis.

**👍 Instruções Positivas:**

1.  **Priorize a Trilha Crítica:** O MVP deve ser focado na entrega completa e funcional do "Formulário de Submissão Robusto" (RF 1) e do "Painel de Administração Básico" (RF 4), permitindo que o P1 submeta e o P2 (Archon) realize o "Crivo de Propriedade Intelectual" (RN 1).
2.  **Segurança Mínima Não Negociável:** A segurança (RFN 1) e o armazenamento criptografado dos documentos de PI devem ser prioridade absoluta na arquitetura de dados e upload. Isso é crucial para mitigar o risco legal (RFN 5 - LGPD) e garantir a aceitação pelo P1.
3.  **Simplificação do CMS (RF 2):** Implemente apenas a funcionalidade de "Gestão de Chamadas" (RN 4) e a edição de poucas páginas estáticas essenciais (Home, Critérios). O restante do CMS (Notícias detalhadas, Páginas complexas) deve ser descartado ou substituído por gerenciamento manual via código estático para esta fase.
4.  **Arquitetura *Cloud-Native* Simples:** Garanta que a arquitetura use armazenamento em nuvem (S3 ou equivalente) para os uploads de documentos (RFN 4), desacoplando o armazenamento de arquivos da aplicação principal, em preparação para picos de performance durante as chamadas abertas.
5.  **Design *Mobile-First* Obrigatório:** O formulário de submissão (RF 1) e as páginas de informação devem ser totalmente responsivos (RFN 3), pois a aceitação inicial será determinada pela facilidade de acesso do Criador (P1).

**👎 Instruções Negativas:**

1.  **Evite a Vitrine Complexa:** Não gaste tempo implementando o "Portfólio de Projetos Incubados" (RF 3) navegável e com filtros (Fluxo 3) no MVP. Para o primeiro ciclo, utilize um *mockup* ou uma lista estática de projetos futuros. O P3 (Investidor) não é o usuário primário da fase de validação.
2.  **Não Over-engenheirar o Painel:** Não implemente funcionalidades complexas de Scorecard ou dashboards gráficos no Painel Administrativo (RF 4). O MVP deve permitir apenas a visualização, filtragem básica e a alteração de status (Ex: Em Análise, Rejeitado, Aprovado).
3.  **Atraso na Integração de Mídia:** Não invista em funcionalidades avançadas de "Integração de Mídia" (RF 5) ou gerenciamento robusto de galerias de concept art. O upload do Criador (P1) deve se restringir aos documentos de PI e amostras de HQ exigidas pelo Formulário.
4.  **Não Automatizar Fluxos Secundários:** O gerenciamento do "Ciclo de Incubação Estruturado" (RN 3) não precisa ser automatizado no MVP. O Archon (P2) pode gerenciar as fases manualmente via alteração de status no painel, postergando a lógica de transição automática.