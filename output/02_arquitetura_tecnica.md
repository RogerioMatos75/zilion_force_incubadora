## Arquitetura
A arquitetura proposta é um modelo **Híbrido de Frontend Orientado a Serviços (FOS)**, combinando a performance do Jamstack para o conteúdo estático e público, com um Backend robusto e desacoplado para o tratamento de dados sensíveis e transacionais (como a submissão de projetos e gerenciamento de Propriedade Intelectual - PI).

**Componentes Principais:**

1.  **Frontend (Marketing e Vitrine):** Implementado como Static Site Generation (SSG) ou Incremental Static Regeneration (ISR) para alta performance, SEO e segurança contra ataques comuns. Responsável por exibir o Universo Zilion Force, Programas de Incubação, Notícias e o Portfólio de Incubados.
2.  **API Gateway/Backend (Core Service):** Uma API robusta e stateless, responsável primariamente pela validação, persistência e gerenciamento da Submissão de Projetos ("Porta para o Criador"). Esta API lida com a lógica de negócios rigorosa do "Crivo do Atlas" (validação de requisitos de PI).
3.  **Storage Service (PI Data):** Armazenamento seguro e escalável, dedicado a receber os artefatos pesados da submissão (PDFs, portfólios, comprovações de registro de direitos autorais).
4.  **Headless CMS:** Gerenciamento separado do conteúdo público dinâmico (notícias, detalhes de programas, equipe, parceiros).

Essa separação garante que a alta demanda por conteúdo público não afete a estabilidade da submissão crítica de dados e que a segurança em torno do PI seja centralizada na camada de API e Storage.

## Tecnologias

| Camada | Tecnologia Principal | Justificativa |
| :--- | :--- | :--- |
| **Frontend** | Next.js (React) | Excelente para SSG/ISR, garantindo performance e SEO, crucial para um site de vitrine e marketing. |
| **Backend Core (API)** | FastAPI (Python) | Alto desempenho, excelente para validação de dados robusta (Pydantic), ideal para o formulário de submissão e processamento inicial de PI. |
| **Database (Transactional)** | PostgreSQL | Robustez, integridade transacional e suporte a dados estruturados complexos (relações entre projetos, criadores, status de PI e fases da incubação). |
| **Database (CMS/Content)** | PostgreSQL ou MongoDB | Depende da escolha do Headless CMS. Se usar Strapi, PostgreSQL é o padrão. |
| **Headless CMS** | Strapi | Facilidade de uso para a equipe não técnica gerenciar notícias, eventos, portfólio de incubados e páginas de programas. |
| **File Storage** | AWS S3 (ou equivalente) | Armazenamento de objetos seguro e escalável para lidar com grandes volumes de PDFs e amostras de arte (dados sensíveis de PI). |
| **Infraestrutura / Deployment** | AWS ECS (Fargate) / Serverless (Lambda) | Contêineres gerenciados para o Backend, garantindo escalabilidade e isolamento. Serverless para funções de processamento assíncrono (ex: processamento de arquivos). |
| **Containerização** | Docker | Padronização do ambiente de desenvolvimento e produção. |

## Integrações

| Serviço de Terceiros | Propósito | Detalhes Técnicos |
| :--- | :--- | :--- |
| **Serviço de E-mail Transacional** | Confirmações de submissão, notificações de status, alertas internos para a equipe do "Códice do Atlas". | SendGrid ou AWS SES. Utilizado para garantir alta entregabilidade das comunicações. |
| **Serviços de Cloud Storage** | Hospedagem dos arquivos de PI (PDFs, imagens) submetidos pelos criadores. | AWS S3. A API gera URLs temporárias (pre-signed URLs) para uploads diretos do cliente, minimizando a carga no servidor da API. |
| **Sistemas de Análise Web** | Monitoramento de tráfego, rastreamento de funil de conversão (taxa de abandono do formulário). | Google Analytics 4 (GA4) ou Mixpanel. |
| **Sistema de Autenticação (Opcional)** | Gerenciamento de login e permissões para o portal interno de avaliação da incubadora (para mentores e equipe). | Auth0 ou AWS Cognito. Usado para proteger o acesso às submissões e ao Códice Metodológico. |
| **Payment Gateway (Futuro)** | Possível integração para taxas de inscrição em workshops ou eventos específicos. | Stripe ou PagSeguro/Mercado Pago (se focado no mercado BR). |

## Fluxos Principais

### 1. Fluxo de Submissão de Projeto (O "Porta para o Criador")

Este é o fluxo mais crítico, exigindo máxima segurança e validação de dados de PI.

1.  **Início da Submissão:** O criador acessa a página "Submeta seu Projeto" (Frontend Next.js).
2.  **Requisição de Upload:** O criador preenche os metadados (título, sinopse, dados de PI) e indica os arquivos a serem enviados (Amostras da HQ, Comprovante de Registro).
3.  **API Validação Inicial:** O Frontend envia os metadados para a API (FastAPI). A API realiza a validação primária de formato e requisitos mínimos do "Crivo do Atlas".
4.  **Geração de URL Assinada:** Se a validação for aprovada, a API gera uma **URL pré-assinada (pre-signed URL) de upload** do S3, específica e temporária para cada arquivo, associada ao ID da submissão.
5.  **Upload Direto:** O Frontend realiza o upload dos arquivos binários (PDFs/Imagens) diretamente para o S3, utilizando a URL assinada, sem passar pelo servidor da API.
6.  **Confirmação e Persistência:** Após o sucesso do upload no S3, o Frontend envia uma requisição final à API confirmando o processo. A API persiste os metadados no PostgreSQL (incluindo a referência segura (URI) do S3 para cada arquivo) e marca o status como "Pendente de Análise (Crivo do Atlas - PI)".
7.  **Notificação:** O serviço de e-mail envia uma confirmação de recebimento ao criador e um alerta à equipe interna de avaliação.

### 2. Fluxo de Publicação de Conteúdo (Vitrine e Notícias)

1.  **Edição de Conteúdo:** Membro da equipe da Zilion Force edita ou cria um novo item (ex: Notícia, Novo Projeto Incubado) no Headless CMS (Strapi).
2.  **Persistência:** O CMS armazena os dados no banco de dados (PostgreSQL).
3.  **Webhook Trigger:** O CMS dispara um webhook para a plataforma de hospedagem do Frontend (ex: Vercel/Netlify).
4.  **Reconstrução (Build):** A plataforma de hospedagem aciona um novo build do Next.js. O Next.js solicita os novos dados do CMS via API para reconstruir as páginas afetadas (ISR).
5.  **Deployment:** A nova versão estática do site é distribuída via CDN.
6.  **Visualização:** O público visualiza o conteúdo atualizado instantaneamente, com alta velocidade.