# Zilion Force Incubadora - Checklist de Desenvolvimento do MVP (Stack Firebase)

Este documento detalha as tarefas para a construção do Mínimo Produto Viável (MVP), focado em validar o fluxo de submissão e avaliação de Propriedade Intelectual (PI), utilizando o ecossistema Firebase.

---

### Fase 1: Configuração e Estrutura do Projeto

- [x] **1.1:** Inicializar projeto Next.js para o frontend e backend (API Routes).
- [x] **1.2:** Configurar ESLint e Prettier para garantir a qualidade do código.
- [x] **1.3:** Definir a estrutura de pastas do projeto (`/src`, `/components`, `/lib/firebase`, etc.).
- [x] **1.4:** Configurar variáveis de ambiente (`.env.local`) para as credenciais do projeto Firebase.
- [x] **1.5:** Instalar e configurar o SDK do Firebase (`firebase`) para o cliente.

### Fase 2: Backend - Lógica com Firebase

- [x] **2.1:** Definir a estrutura de coleções no **Firestore**: `users` (para os Archons/Admins) e `submissions`.
- [ ] **2.2:** Configurar o **Firebase Storage** e suas regras de segurança para permitir uploads de arquivos por usuários autenticados.
- [x] **2.3:** Implementar a lógica de submissão no Frontend:
    - [x] **2.3.1:** Validar os dados do formulário (sinopse, gênero, etc.).
    - [x] **2.3.2:** Fazer o upload do arquivo de PI diretamente para o **Firebase Storage**.
    - [x] **2.3.3:** Após o upload, salvar os metadados da submissão (incluindo a URL do arquivo no Storage) em um novo documento na coleção `submissions` do **Firestore**.
- [x] **2.4:** Implementar autenticação para o painel administrativo com **Firebase Authentication** (provedor de E-mail/Senha).
- [x] **2.5:** Criar as API Routes (`/pages/api/admin`) para o Painel Administrativo, usando o **Firebase Admin SDK**:
    - [x] **2.5.1:** `GET /api/admin/submissions`: Listar todos os projetos da coleção `submissions`. (Protegida para admins).
    - [x] **2.5.2:** `GET /api/admin/submissions/[id]`: Obter detalhes de uma submissão específica. (Protegida para admins).
    - [x] **2.5.3:** `PUT /api/admin/submissions/[id]`: Atualizar o status de uma submissão no Firestore. (Protegida para admins).

### Fase 3: Frontend - A Porta para o Criador

- [ ] **3.1:** Criar as páginas estáticas principais (design responsivo *mobile-first*):
    - [ ] **3.1.1:** Homepage (`/`) com a proposta de valor da incubadora.
    - [ ] **3.1.2:** Página de Critérios de Seleção (`/criterios`).
- [x] **3.2:** Desenvolver o "Formulário de Submissão Robusto" (`/submeter`):
    - [x] **3.2.1:** Criar os campos do formulário com validação no lado do cliente.
    - [x] **3.2.2:** Implementar o componente de upload de arquivo que utiliza o SDK do Firebase para o upload seguro.
    - [x] **3.2.3:** Exibir feedback de sucesso ou erro para o usuário após a submissão.
- [x] **3.3:** Desenvolver o Painel Administrativo (`/admin`):
    - [x] **3.3.1:** Criar a tela de login que utiliza o **Firebase Authentication**.
    - [x] **3.3.2:** Desenvolver a tabela/lista de submissões, consumindo a API Route `GET /api/admin/submissions`.
    - [x] **3.3.3:** Criar a página de detalhes da submissão, que exibe os dados do Firestore e um link para o arquivo no Firebase Storage.
    - [x] **3.3.4:** Implementar os botões para aprovar/rejeitar um projeto, consumindo a API Route `PUT /api/admin/submissions/[id]`.

### Fase 4: Deploy e Validação

- [ ] **4.1:** Configurar o projeto para deploy na Vercel.
- [ ] **4.2:** Realizar o deploy inicial e configurar as variáveis de ambiente do **Firebase** na Vercel.
- [ ] **4.3:** Executar um teste de ponta-a-ponta (E2E):
    - [ ] **4.3.1:** Submeter um novo projeto como "Criador".
    - [ ] **4.3.2:** Fazer login como "Archon" usando o Firebase Auth.
    - [ ] **4.3.3:** Verificar a submissão no painel, acessar o arquivo e alterar seu status.
- [ ] **4.4:** Revisar a conformidade com a LGPD (textos de consentimento no formulário).

---

### Anexo A: Estrutura do Banco de Dados (Firestore)

Esta seção detalha a estrutura de dados para as coleções no Firestore, conforme a tarefa **2.1**.

#### Coleção: `users`
*   **Descrição:** Armazena os dados dos usuários administradores (Archons) que podem acessar o painel.
*   **Campos:**
    *   `uid` (string): O ID do usuário do Firebase Authentication.
    *   `email` (string): O email de login do usuário.
    *   `displayName` (string): Nome de exibição do usuário.
    *   `role` (string): Papel do usuário, fixo como `"archon"`.

#### Coleção: `submissions`
*   **Descrição:** Armazena os dados de cada projeto de HQ submetido na plataforma.
*   **Campos:**
    *   `creatorName` (string): Nome do criador responsável.
    *   `creatorEmail` (string): Email de contato do criador.
    *   `hqTitle` (string): Título da obra (HQ).
    *   `synopsis` (string): Sinopse do projeto.
    *   `genre` (string): Gênero principal da obra.
    *   `targetAudience` (string): Público-alvo estimado.
    *   `ipDocumentUrl` (string): URL para o arquivo de comprovação de PI no Firebase Storage.
    *   `submissionDate` (timestamp): Data e hora da submissão.
    *   `status` (string): Status atual do projeto (ex: `"pending"`, `"review"`, `"approved"`, `"rejected"`).