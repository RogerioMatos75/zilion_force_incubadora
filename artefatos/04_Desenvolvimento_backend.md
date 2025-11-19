## Fluxos de Usuário
Descreva a jornada do usuário em processos chave.

### Fluxo 1: Submissão de Projeto (Criador/Associado)

| Etapa | Ação do Usuário (UI) | Objetivo do Usuário | Sistema/Resposta |
| :--- | :--- | :--- | :--- |
| **1. Conscientização** | Acessa a `HOME` e visualiza o banner/CTA principal. | Entender a missão da Incubadora e o valor de ser incubado. | Apresentação clara da expertise em PI de HQs para Audiovisual. |
| **2. Pesquisa de Programa** | Navega para `INCUBADORA DE HQS` -> `Como Funciona a Incubadora`. | Compreender os programas (Pré, Incubação, Pós) e a metodologia (Códice). | Detalhamento dos programas e benefícios (assessoria jurídica de PI, mentoria). |
| **3. Verificação de Elegibilidade** | Navega para `INCUBADORA DE HQS` -> `Critérios de Seleção`. | Confirmar se o projeto e a equipe cumprem os requisitos rígidos de PI. | Exibição de checklist de requisitos (Registro de PI na BN obrigatório). |
| **4. Preparação** | Clica no CTA "Submeta seu Projeto" na página de Critérios. | Acessar o formulário robusto ("Porta para o Criador"). | Exibe Termos de Envio e Declaração de Originalidade, exigindo aceite para prosseguir. |
| **5. Submissão (Formulário)** | Preenche dados, anexa *Comprovante de Registro de Direitos Autorais*, portfólio e amostras da HQ (PDFs). | Enviar todas as informações cruciais para o "Crivo do Atlas". | Validação em tempo real dos campos de PI e formatos de arquivo. |
| **6. Confirmação** | Clica em "Finalizar e Enviar Projeto". | Receber prova do envio e protocolo para acompanhamento. | Exibe tela de Sucesso com um **Protocolo Atlas** único e envia e-mail de confirmação. |

### Fluxo 2: Pesquisa de Credibilidade e Parcerias (Investidor/Parceiro Institucional)

| Etapa | Ação do Usuário (UI) | Objetivo do Usuário | Sistema/Resposta |
| :--- | :--- | :--- | :--- |
| **1. Acesso à Estrutura** | Acessa `SOBRE NÓS` e `INCUBADORA DE HQS` -> `Nossos Valores / Metodologia`. | Avaliar a maturidade e o compromisso da gestão da incubadora. | Apresentação da equipe, visão e menção à busca pela acreditação CERNE. |
| **2. Validação do Portfólio** | Navega para `INCUBADORA DE HQS` -> `Projetos Incubados`. | Analisar a qualidade e o estágio de desenvolvimento dos projetos curados. | Vitrine dos projetos, com filtros de estágio (Pré-incubação, Incubação) e links para criadores. |
| **3. Fomento e Networking** | Navega para `CONTATO / PARCERIAS`. | Identificar parceiros estratégicos e acesso a linhas de fomento. | Listagem clara de Parceiros (ANPROTEC, SEBRAE, ANCINE) e informações sobre FSA. |
| **4. Contato Direto** | Preenche o formulário de Parcerias ou utiliza os canais de contato. | Iniciar negociação ou solicitação de informações específicas. | Envio da mensagem para o canal específico de Parcerias. |

---

## Navegação
Detalhe a sequência de telas e interações.

A navegação primária é dividida entre o Universo Zilion Force (conteúdo legado) e o Hub da Incubadora (nova funcionalidade central).

### Estrutura de Navegação (Menu Principal)

1.  **HOME**
2.  **O UNIVERSO ZILION FORCE** (HQs Publicadas, Personagens, Mídia)
3.  **INCUBADORA DE HQS** (Seção Principal)
4.  **SOBRE NÓS** (Equipe, Missão, Visão, Acreditação CERNE)
5.  **CONTATO / PARCERIAS**

### Sequência Detalhada para o Módulo "INCUBADORA DE HQS"

| Ordem | Título da Página | Conteúdo Principal | Navegação Secundária/Submenu |
| :--- | :--- | :--- | :--- |
| **1** | **Incubadora de HQs (Landing)** | Apresentação geral da Incubadora como hub de convergência PI/Audiovisual. CTA forte para Submissão. | Como Funciona, Critérios, Submeta seu Projeto, Projetos Incubados. |
| **2** | **Como Funciona a Incubadora** | Visão, Missão, Programas (Pré, Incubação, Pós), Benefícios para Incubados. | Seções de âncora para Metodologia e PI. |
| **3** | **Critérios de Seleção** | Requisitos de Elegibilidade (Maturação de Projeto, Dedicação, etc.). Ênfase nos requisitos jurídicos de PI. | Links para o formulário de submissão. |
| **4** | **Submeta seu Projeto** | O "Porta para o Criador": Formulário online robusto. | Termos de Envio e FAQ sobre a Avaliação. |
| **5** | **Projetos Incubados** | Vitrine de validação (HQs e Projetos AV). | Filtros de status (Em desenvolvimento, Graduado) e links externos para criadores. |
| **6** | **Nossos Valores / Metodologia** | Detalhes sobre o "Códice Metodológico" e o "Crivo do Atlas". | Referência à consultoria jurídica e mentores. |

---

## Interações
Especifique as ações do usuário e as respostas do sistema.

### 1. Interação Crítica: Processo de Pré-Validação de PI

| Ação do Usuário | Resposta do Sistema | Detalhes UX/UI |
| :--- | :--- | :--- |
| Clicar em "Acessar Formulário de Submissão". | Exibição de um *Modal de Conformidade de PI*. | O modal lista os pré-requisitos não negociáveis (Registro de Direitos Autorais na BN). O usuário deve confirmar "Declaro possuir os registros de PI exigidos" e "Aceito os Termos de Avaliação". |
| Confirmação da Declaração e Aceite dos Termos. | Carregamento da primeira etapa do Formulário de Submissão. | O sistema garante que apenas usuários cientes e conformes com os termos de PI prossigam, mitigando riscos jurídicos iniciais. |

### 2. Interação no Formulário de Submissão

| Ação do Usuário | Resposta do Sistema | Detalhes UX/UI |
| :--- | :--- | :--- |
| Preenchimento de campos (Sinopse, Gênero). | Contagem regressiva de caracteres em tempo real. | Ajuda o criador a manter a concisão, parte do "Crivo do Atlas". |
| Upload dos Anexos (Comprovante PI, Amostras da HQ). | Indicador visual de progresso de upload e validação de formato (ex: Apenas PDF para HQ, Max 10MB). | Mensagens de erro claras se o formato for inválido. Requisito estrito do Comprovante PI. |
| Cliques em "Próximo Passo" (em formulário multi-etapas). | Atualização da barra de progresso no topo da tela. | Melhora a usabilidade em formulários robustos, mantendo o usuário orientado. |
| Clique em "Finalizar e Enviar Projeto". | Tela de Confirmação com o *Protocolo Atlas*. | O sistema armazena a submissão no backend (Códice Interno) e dispara o e-mail de confirmação imediata. |

### 3. Interação na Vitrine de Projetos Incubados

| Ação do Usuário | Resposta do Sistema | Detalhes UX/UI |
| :--- | :--- | :--- |
| Selecionar Filtros (Ex: "Incubação" e "Gênero Fantasia"). | Atualização dinâmica da lista de cartões de projetos. | Implementação de filtros intuitivos (facetados), sem necessidade de recarregar a página. |
| Clicar em um Projeto na Vitrine. | Exibição da Página Detalhe do Projeto Incubado. | Página dedicada com sinopse estendida, informações sobre o criador, estágio de desenvolvimento (Pré, Incubação, Pós) e mentores envolvidos. |
<br>
<hr>
<br>

### 🧠 Instruções para o Agente de Desenvolvimento

**📝 Prompt Complementar:**
Este artefato define a espinha dorsal de valor do MVP: o processo de Submissão de Projetos (Fluxo 1) e a validação de credibilidade para Parceiros/Investidores através da Vitrine (Fluxo 2). A próxima etapa de desenvolvimento backend deve priorizar a implementação robusta do endpoint `/submissao`, focando na segurança jurídica do processo (Pré-Validação de PI), no armazenamento eficiente dos anexos críticos e na geração imediata do `Protocolo Atlas` para fechar o ciclo de serviço ao usuário Criador.

**👍 Instruções Positivas:**

1.  **Prioridade 1: Backend de Submissão (Criador/Associado).** Implementar o endpoint `/submissao` com validação estrita dos campos obrigatórios, especialmente aqueles relacionados à Propriedade Intelectual (PI).
2.  **Segurança e Compliance de PI.** O backend deve garantir que a submissão só seja aceita se a flag de aceite da `Declaração de Originalidade e Termos de Envio` for recebida, mitigando o risco jurídico inicial conforme detalhado na Interação Crítica 1.
3.  **Armazenamento de Anexos.** Utilizar um serviço de armazenamento de objetos (ex: S3, Azure Blob Storage) para os anexos, garantindo a imutabilidade do *Comprovante de Registro de Direitos Autorais* e aplicando a validação de formato/tamanho (PDF, Max 10MB) no servidor.
4.  **Feedback Imediato.** Garantir que a geração do `Protocolo Atlas` seja síncrona com a conclusão da submissão, permitindo que a tela de Sucesso exiba o código imediatamente, conforme o Fluxo 1.

**👎 Instruções Negativas:**

1.  **Evitar Overengineering em Processamento.** Não construir o "Crivo do Atlas" como um motor de inteligência artificial ou sistema de pontuação complexo nesta fase. O campo de status da submissão deve ser inicialmente simples (ex: `Recebido`, `Em Avaliação`).
2.  **Não Desenvolver Área Logada para Criadores.** Evitar a criação de um módulo complexo de autenticação e um painel de acompanhamento de projetos (Painel do Criador). O acompanhamento no MVP é delegado ao Protocolo e à comunicação por e-mail/humana.
3.  **Não Integrar com Sistemas Externos.** O Fluxo 2 (Fomento e Networking) deve apenas listar parceiros e linhas de fomento. Não há necessidade de construir APIs ou integrações com ANPROTEC ou FSA.
4.  **Abstenção de Lógica de Workflow Complexa.** Não construir workflows de notificação interna (ex: notificar 5 avaliadores sequencialmente). O backend deve apenas registrar a submissão e enviar uma notificação simples ao administrador da Incubadora.