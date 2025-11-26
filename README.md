# Zilion Force Incubadora - Plano de Desenvolvimento do MVP

Este documento é o plano de ação consolidado para o MVP, baseado nos artefatos de requisitos e prototipação, utilizando a stack Next.js e Firebase.

---

## Estrutura de Rotas da Aplicação (Gerado pelo Build)

A tabela abaixo representa todas as páginas e rotas de API do projeto, mostrando como cada uma é renderizada pelo Next.js.

```bash
 Route (app) 
┌ ○ / 
├ ○ /_not-found 
├ ○ /admin 
├ ƒ /admin/submission/[id] 
├ ƒ /api/admin/submissions 
├ ƒ /api/admin/submissions/[id] 
├ ƒ /api/auth/login 
├ ƒ /api/creator/submissions 
├ ƒ /api/submissions 
├ ○ /contato 
├ ○ /criterios 
├ ○ /dashboard 
├ ○ /incubadora 
├ ○ /login 
├ ○ /projetos 
├ ○ /sobre-nos 
├ ○ /submeter 
├ ○ /termos 
└ ○ /test-security 

ƒ Proxy (Middleware) 

○  (Static)   prerendered as static content 
ƒ  (Dynamic)  server-rendered on demand 

---

## Rodando o Projeto Localmente

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Configure as Variáveis de Ambiente:**
    - Copie o arquivo `.env.example` para um novo arquivo chamado `.env.local`.
    - Preencha as variáveis em `.env.local` com as credenciais do seu projeto Firebase.

3.  **Rode o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    npm run build
    ```

4.  **Acesse a Aplicação:**
  Abra seu navegador e acesse 
    - [http://localhost:3000/dashboard](http://localhost:3000/dashboard).
    - [http://localhost:3000/submeter](http://localhost:3000/submeter).
    - [http://localhost:3000/admin](http://localhost:3000/admin).
  
  para testes de segurança.
    - [http://localhost:3000/test-security](http://localhost:3000/test-security) 
    - 

### Rodando os Testes

O projeto utiliza Jest e React Testing Library para testes de funcionalidade.

- Para rodar os testes em **modo de observação** (executa novamente ao salvar uma alteração):
  ```bash
  npm run test
  ```

- Para rodar **todos os testes uma única vez** (ideal para integração contínua):
  ```bash
  npm test -- --ci
  ```

---

## Plano de Desenvolvimento - MVP v2.0

Esta seção detalha as próximas etapas para a evolução da plataforma, com foco no Dashboard do Criador e na automação do fluxo de curadoria.

### **Fase 1: Evolução do Backend e Modelo de Dados**
- [x] **1.1:** Atualizar o schema da coleção `submissions` no Firestore para incluir os novos campos necessários.
- [x] **1.2:** Criar um script de "seed" (`/scripts/seed.js`) para popular o Firestore com dados de exemplo (1 usuário com role "criador" e 1 projeto em "Pré-Incubação").
- [x] **1.3:** Refatorar as Regras de Segurança do Firestore (`firestore.rules`) para implementar a lógica de acesso.

### **Fase 2: Lógica de Negócio e APIs**
- [x] **2.1:** Modificar a API de aprovação (`PUT /api/admin/submissions/[id]`) para que o `admin` possa atribuir a `role` "criador" a um usuário via Custom Claims.
- [x] **2.2:** Criar novo endpoint `POST /api/creator/solicitar-reuniao` que cria um registro no Firestore.
- [x] **2.3:** Criar novo endpoint `POST /api/creator/upload-atualizacao` para lidar com o upload de novas versões de documentos no Storage.
- [x] **2.4:** Criar novo endpoint `GET /api/export-pdf/[submissionId]` para gerar o relatório do projeto.

### **Fase 3: O Novo Dashboard do Criador (`/dashboard`)**
- [x] **3.1:** Aplicar o estilo "Dark mode neon Zilion Force" como base para o layout do dashboard.
- [x] **3.2:** Implementar o listener em tempo real (`onSnapshot`) na página do dashboard para receber atualizações de `feedbacks` e `status`.
- [x] **3.3:** Desenvolver o componente **"Meu Projeto"** com a timeline visual do pipeline CERNE.
- [x] **3.4:** Desenvolver o componente **"Minhas Submissões"** para listar o histórico de arquivos.
- [x] **3.5:** Desenvolver o componente **"Progresso no Crivo do Atlas"** (checklist read-only).
- [x] **3.6:** Desenvolver o componente **"Mentorias & Workshops"** com a agenda e o botão "Confirmar Presença".
- [x] **3.7:** Desenvolver o componente **"Documentos Assinados"** para visualização dos links.
- [x] **3.8:** Desenvolver o componente **"Feedback da Curadoria"** em formato de timeline.
- [x] **3.9:** Desenvolver o componente **"Upload de Atualizações"** com o formulário de upload.
- [x] **3.10:** Desenvolver o componente **"Métricas Pessoais"** para exibir deadlines.
- [x] **3.11:** Implementar a lógica do botão **"Solicitar Reunião"**.

### **Fase 4: Finalização e Documentação**
- [x] **4.1:** Implementar o "Tour Guiado" no primeiro login do criador (pode ser um modal simples com as instruções).
- [x] **4.2:** Atualizar o `README.md` com uma nova seção explicando como um `admin` pode definir Custom Claims para os usuários via script.
- [x] **4.3:** Realizar um teste de ponta-a-ponta do novo fluxo: submissão -> aprovação -> login do criador -> visualização do dashboard.

## Fase 5: Evolução do Painel do Administrador (Frontend)

- [ ] **5.1:** Melhorias na Página de Detalhes da Submissão (`/admin/submission/[id]`):
- [ ] **5.1.1:** Componente "Enviar Feedback": Criar um formulário (com campo de texto e tipo de feedback) para que o admin possa enviar novos feedbacks para o criador. Isso irá popular a timeline de "Feedback da Curadoria".
- [ ] **5.1.2:** Componente "Gerenciar Métricas": Adicionar campos para o admin definir ou atualizar o "Próximo Deadline" (proximoDeadline) e a "Versão Atual" (versaoAtual) do projeto.
- [ ] **5.1.3:** Componente "Adicionar Documentos": Criar uma interface para o admin adicionar links de documentos assinados (contratos,NDAs) que aparecerão para o criador.
- [ ] **5.2:** Gestão de Eventos (Mentorias & Workshops):
- [ ] **5.2.1:** Página de Gestão de Eventos: Criar uma nova página (ex: /admin/eventos) onde administradores possam criar e visualizar os eventos disponíveis (mentorias, workshops).
- [ ] **5.2.2:** Convidar para Evento: Na página de detalhes da submissão, adicionar uma função para que o admin possa "inscrever" o criador em um evento, o que faria ele aparecer na agenda do criador.
- [ ] **5.3:** Visão Geral e Analytics (Dashboard `/admin`):
- [ ] **5.3.1:** Estatísticas Rápidas: Adicionar cards que mostrem números importantes (Total de Submissões, Projetos em Análise, etc.).
- [ ] **5.3.2:** (Opcional): Adicionar um gráfico simples com o volume de submissões por período.

---

## 🔐 Administração e Segurança

### Definindo Papéis de Usuário (Custom Claims)

Para que um usuário tenha acesso ao Dashboard de Criador, ele precisa ter a claim `role: 'criador'`. Atualmente, isso deve ser feito via script administrativo ou console do Firebase.

**Exemplo de Script (Node.js):**

```javascript
const admin = require('firebase-admin');
// ... inicialização do admin ...

async function setCreatorRole(uid) {
  await admin.auth().setCustomUserClaims(uid, { role: 'criador' });
  console.log(`Role 'criador' atribuída ao usuário ${uid}`);
}
```

> **Nota:** O endpoint `/api/admin/submissions/[id]` já implementa essa lógica automaticamente ao aprovar uma submissão.

---

### Fase 0: Alinhamento Arquitetural (Baseado no Artefato 03)

- [x] **0.1:** Refatorar Schema do Firestore para Suporte ao Ciclo de Vida CERNE.
    - [x] **0.1.1:** Redefinir a coleção `submissions` para incluir um campo de `etapaCerne` (ex: 'pré-incubação', 'incubação', 'pós-incubação') e metadados associados, substituindo o campo `status` simplificado.
    - [x] **0.1.2:** Garantir que a estrutura de dados suporte o armazenamento de todos os documentos necessários (HQ, Portfólio, Comprovante de PI) de forma clara e vinculada à submissão.

- [x] **0.2:** Implementar a Lógica de Negócio do "Crivo do Atlas 1" no Backend.
    - [x] **0.2.1:** Na API Route de submissão, implementar a validação obrigatória do comprovante de registro de PI como a primeira etapa do processamento.
    - [x] **0.2.2:** Implementar a regra de exceção: se o comprovante for ausente ou inválido, a submissão deve ser salva com um status específico (ex: `naoElegivel_piPendente`) e não deve prosseguir no fluxo de avaliação.
    - [x] **0.2.3:** Conectar esta validação ao serviço de e-mail para notificar o criador sobre a pendência, conforme a "Exceção 1".

- [x] **0.3:** Garantir Rastreabilidade Legal dos Termos de Envio.
    - [x] **0.3.1:** Adicionar campos na coleção `submissions` para registrar a aceitação dos Termos de Envio (ex: `termosAceitos: boolean`, `dataAceiteTermos: timestamp`, `versaoTermos: string`).
    - [x] **0.3.2:** Tornar a validação desse aceite obrigatória na API Route de submissão.

- [x] **0.4:** Fortalecer a Validação de Dados Dupla (Client/Server).
    - [x] **0.4.1:** Revisar o formulário de submissão no frontend para garantir que todos os campos críticos definidos na "Regra 4" sejam mandatórios.
    *   [x] **0.4.2:** Garantir que a mesma validação de campos críticos seja replicada no backend para integridade dos dados.

---

### Fase 1: Configuração e Estrutura do Projeto

- [x] **1.1:** Inicializar projeto Next.js para o frontend e backend (API Routes).
- [x] **1.2:** Configurar ESLint e Prettier para garantir a qualidade do código.
- [x] **1.3:** Definir a estrutura de pastas do projeto (`/src`, `/components`, `/lib/firebase`, etc.).
- [x] **1.4:** Configurar variáveis de ambiente (`.env.local`) para as credenciais do projeto Firebase.
- [x] **1.5:** Instalar e configurar o SDK do Firebase (`firebase`) para o cliente.

### Fase 2: Backend - Lógica com Firebase

- [x] **2.1:** Definir a estrutura de coleções no **Firestore**: `users` (para os Archons/Admins) e `submissions`.
- [x] **2.2:** Configurar o **Firebase Storage** e suas regras de segurança para permitir uploads de arquivos por usuários autenticados.
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

- [x] **3.1:** Criar as páginas estáticas principais (design responsivo *mobile-first*):
    - [x] **3.1.1:** Homepage (`/`) com a proposta de valor da incubadora.
    - [x] **3.1.2:** Página de Critérios de Seleção (`/criterios`).
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

- [x] **4.1:** Configurar o projeto para deploy na Vercel.
- [ ] **4.2:** Realizar o deploy inicial e configurar as variáveis de ambiente do **Firebase** na Vercel.
- [ ] **4.3:** Executar um teste de ponta-a-ponta (E2E):
    - [ ] **4.3.1:** Submeter um novo projeto como "Criador".
    - [x] **4.3.2:** Fazer login como "Administrador" usando o Firebase Auth.
    - [ ] **4.3.3:** Verificar a submissão no painel, acessar o arquivo e alterar seu status.
- [ ] **4.4:** Revisar a conformidade com a LGPD (textos de consentimento no formulário).

---

### Fase 5: Fortalecimento e Integrações (Novas Tarefas)

- [x] **5.1:** Implementar e aplicar as **Regras de Segurança no Firestore** para garantir que apenas administradores autenticados possam acessar e modificar os dados das submissões.
- [x] **5.2:** Adicionar **verificação de token de autenticação** nas API Routes do admin para reforçar a segurança.
- [x] **5.3:** Integrar um serviço de **e-mail transacional** (ex: SendGrid) para enviar uma confirmação automática ao criador após a submissão do projeto.
- [ ] **5.4:** (Opcional) Adicionar um sistema de **análise web** (ex: Google Analytics 4) para monitorar o tráfego.

---

### Fase 6: Portal do Criador (Evolução do MVP)

- [x] **6.1:** Implementar sistema de **Registro e Login para Criadores** (e-mail/senha e/ou provedores sociais).
- [x] **6.2:** Desenvolver o **Dashboard do Criador**, uma área logada onde o usuário pode ver seus projetos submetidos e o status de cada um.
- [x] **6.3:** Refatorar as **Regras de Segurança** do Firestore e Storage para permitir que um criador acesse apenas seus próprios dados.

---

### Anexo A: Estrutura do Banco de Dados (Firestore)

Esta seção detalha a estrutura de dados para as coleções no Firestore, conforme a tarefa **2.1**.

#### Coleção: `users`
*   **Descrição:** Armazena os dados dos usuários administradores (Diretoria) que podem acessar o painel.
*   **Campos:**
    *   `uid` (string): O ID do usuário do Firebase Authentication.
    *   `email` (string): O email de login do usuário.
    *   `displayName` (string): Nome de exibição do usuário.
    *   `role` (string): Papel do usuário (ex: `"Diretoria"`, `"creator"`).

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
   

Onde encontrar suas credenciais:
   * Vá para o console do Firebase (https://console.firebase.google.com/).
   * Abra seu projeto.
   * Clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto" e selecione Configurações do projeto.
   * Na aba "Geral", role para baixo até "Seus apps".
   * Selecione seu aplicativo da web.
   * Você verá a seção "Snippet do SDK do Firebase". Escolha a opção Config. As chaves estarão lá.

---

### Fase 7: Backend de Submissão (Artefato 04)

- [x] **7.1:** Implementar Endpoint de Submissão (`POST /api/submissions`).
    - [x] **7.1.1:** Adicionar validação no backend para campos críticos e aceite obrigatório dos Termos de Envio.
    - [x] **7.1.2:** Garantir que a submissão falhe se os termos não forem aceitos, retornando erro apropriado.
- [x] **7.2:** Implementar Geração do "Protocolo Atlas".
    - [x] **7.2.1:** Criar uma função para gerar um ID de protocolo único (ex: `ZF-INC-2025-10-XYZ`).
    - [x] **7.2.2:** Salvar o protocolo junto com os dados da submissão no Firestore, com status inicial `recebido`.
- [x] **7.3:** Orquestrar Resposta da API.
    - [x] **7.3.1:** Em caso de sucesso, retornar o `Protocolo Atlas` gerado para o frontend.
    - [x] **7.3.2:** Em caso de falha, retornar uma mensagem de erro clara.
- [x] **7.4:** Implementar Notificação de Confirmação.
    - [x] **7.4.1:** Disparar e-mail de confirmação para o criador, contendo o `Protocolo Atlas`.
    - [x] **7.4.2:** Disparar e-mail de notificação para o administrador da incubadora.

---

### Fase 8: Frontend do MVP (Artefato 05)

- [x] **8.1: Estrutura Base e Identidade (Must-Have)**
    - [x] **8.1.1:** Desenvolver a Home Page (`/`) com a proposta de valor da incubadora.
    - [x] **8.1.2:** Implementar a navegação principal com links funcionais (Home, Incubadora, Contato, etc.).
    - [x] **8.1.3:** Criar a página de Contato (`/contato`) com formulário e e-mail.

- [x] **8.2: Finalização do Portal de Submissão (Must-Have)**
    - [x] **8.2.1:** Criar a página de Critérios de Seleção (`/criterios`) detalhando a exigência do registro de PI.
    - [x] **8.2.2:** Revisar o formulário em `/submeter` para garantir que todos os campos e uploads do artefato estão presentes e funcionais.
    - [x] **8.2.3:** Implementar a tela de sucesso pós-submissão para exibir o **Protocolo Atlas** retornado pela API.

- [x] **8.3: Páginas de Credibilidade e Vitrine (Should-Have)**
    - [x] **8.3.1:** Criar a página "Como Funciona a Incubadora" com a estrutura para os programas.
    - [x] **8.3.2:** Criar a página "Quem Somos" (`/sobre-nos`) com a estrutura para a equipe e mentores.
    - [x] **8.3.3:** Criar a página "Projetos Incubados" (`/projetos`) com uma estrutura de vitrine.

- [x] **8.4: Reavaliação de Escopo (Pós-MVP)**
    - [x] **8.4.1:** Analisar e planejar a implementação do Portal do Criador (Login e Dashboard), conforme solicitado no artefato.

---

### Fase 9: Testes e Validação de Segurança (Firebase)

- [ ] **9.1: Implementar Multi-Factor Authentication (MFA) para Administradores**
    - [ ] **9.1.1:** Pesquisar e definir a estratégia para habilitar MFA (provavelmente via SMS ou TOTP com Cloud Functions) para os usuários do painel de administração no Firebase.
    - [ ] **9.1.2:** Modificar o fluxo de login do painel de admin (`/admin/login`) para exigir a verificação do segundo fator após a senha ser validada.
    - [ ] **9.1.3:** Realizar um teste de ponta-a-ponta: criar um usuário admin, habilitar o MFA e garantir que o login só é bem-sucedido após a verificação do segundo fator.

- [x] **9.2: Fortalecer Controle de Acesso (RBAC) com Custom Claims**
    - [x] **9.2.1:** Criar um script ou Cloud Function para atribuir "claims" (papéis como `admin` ou `avaliador`) a usuários específicos do Firebase.
    - [x] **9.2.2:** Atualizar as API Routes do admin para verificar esses "claims" no token do usuário, bloqueando o acesso se o papel não for o correto. *(Nota: A verificação foi centralizada no middleware, tornando-a desnecessária nas rotas individuais).*
    - [x] **9.2.3:** Realizar um teste de segurança: tentar acessar uma API de admin com um token de usuário comum (criador) e confirmar que o acesso é negado (erro 403 Forbidden).

- [ ] **9.3: Validação de Mitigações de Risco**
    - [ ] **9.3.1:** Confirmar nas configurações do Firebase que a proteção contra enumeração de e-mail e "rate limiting" para login estão ativas (padrão do Identity Platform).
    - [ ] **9.3.2:** Revisar o código que interage com o Firestore para garantir o uso de queries parametrizadas, prevenindo qualquer risco de injeção.

- [ ] **9.4: Sincronização do README.md**
    - [ ] **9.4.1:** Após a conclusão dos testes, marcar as tarefas pendentes da "Fase 4: Deploy e Validação" como concluídas, pois esta fase cobre os pontos de teste E2E.

---

### Fase 10: Depuração Urgente do Middleware (Amanhã)

- [x] **10.1:** Reativar o `console.error` no arquivo `src/middleware.ts` para capturar o log de erro do servidor.
- [x] **10.2:** Executar o teste de segurança novamente com o usuário `criador@teste.com`.
- [x] **10.3:** Analisar o log de erro que aparecerá no **terminal** do `npm run dev` para diagnosticar a causa raiz do erro 500.
- [x] **10.4:** Aplicar a correção com base no diagnóstico.

---

### Fase 11: Implementação do Portal do Criador e Pipeline

- [x] **11.1: Evolução do Modelo de Dados (Backend)**
    - [x] **11.1.1:** Adicionar novos campos à coleção `submissions` no Firestore para suportar o pipeline (ex: `etapaPipeline`, `feedbackAnalise`, `pontuacao`).
- [x] **11.2: Evolução do Painel de Administração (Admin)**
    - [x] **11.2.1:** Analisar a página de detalhes da submissão (`/admin/submission/[id]`).
    - [x] **11.2.2:** Implementar um componente na página de detalhes para visualizar e atualizar a `etapaPipeline` de um projeto.
    - [x] **11.2.3:** Implementar campos na mesma página para que o administrador possa inserir `feedbackAnalise` e `pontuacao`.
    - [x] **11.2.4:** Atualizar a API (`PUT /api/admin/submissions/[id]`) para salvar esses novos dados no Firestore.
- [x] **11.3: Evolução do Dashboard do Criador (Frontend)**
    - [x] **11.3.1:** Refatorar a página `/dashboard` para exibir a `etapaPipeline` atual de cada projeto em uma linha do tempo ou status detalhado.
    - [x] **11.3.2:** Criar uma área no dashboard para o criador visualizar o `feedbackAnalise` e a `pontuacao` deixados pelo administrador.
- [ ] **11.4: Ferramentas de Comunicação (Pós-MVP)**
    - [ ] **11.4.1:** Planejar a "Área de Reunião".
    - [ ] **11.4.2:** Planejar o "Formulário de Dúvidas" (sistema de tickets/suporte).

---

### Fase 12: Login Unificado

- [x] **12.1:** Criar a nova página de login unificada em `src/app/login/page.tsx`.
- [x] **12.2:** Desenvolver o formulário de login (email/senha) nesta nova página.
- [x] **12.3:** Criar um novo endpoint de API (ex: `/api/auth/login`) para lidar com o processo de login.
    - [x] **12.3.1:** O endpoint usará o Firebase Auth para autenticar o usuário.
    - [x] **12.3.2:** No backend, verificará o "papel" (custom claim) do usuário autenticado.
    - [x] **12.3.3:** A API retornará para qual dashboard o usuário deve ser redirecionado (ex: `/admin` ou `/dashboard`).
- [x] **12.4:** Implementar a lógica no frontend (`/login/page.tsx`) para chamar a nova API e fazer o redirecionamento.
- [x] **12.5:** Atualizar o `Header.tsx` para que o botão "Login / Cadastro" aponte para a nova página `/login`.
- [x] **12.6:** Remover ou redirecionar a página antiga de login do admin (`/admin/login`).
---

### Fase 0: Alinhamento Arquitetural (Baseado no Artefato 03)

- [x] **0.1:** Refatorar Schema do Firestore para Suporte ao Ciclo de Vida CERNE.
    - [x] **0.1.1:** Redefinir a coleção `submissions` para incluir um campo de `etapaCerne` (ex: 'pré-incubação', 'incubação', 'pós-incubação') e metadados associados, substituindo o campo `status` simplificado.
    - [x] **0.1.2:** Garantir que a estrutura de dados suporte o armazenamento de todos os documentos necessários (HQ, Portfólio, Comprovante de PI) de forma clara e vinculada à submissão.

- [x] **0.2:** Implementar a Lógica de Negócio do "Crivo do Atlas 1" no Backend.
    - [x] **0.2.1:** Na API Route de submissão, implementar a validação obrigatória do comprovante de registro de PI como a primeira etapa do processamento.
    - [x] **0.2.2:** Implementar a regra de exceção: se o comprovante for ausente ou inválido, a submissão deve ser salva com um status específico (ex: `naoElegivel_piPendente`) e não deve prosseguir no fluxo de avaliação.
    - [x] **0.2.3:** Conectar esta validação ao serviço de e-mail para notificar o criador sobre a pendência, conforme a "Exceção 1".

- [x] **0.3:** Garantir Rastreabilidade Legal dos Termos de Envio.
    - [x] **0.3.1:** Adicionar campos na coleção `submissions` para registrar a aceitação dos Termos de Envio (ex: `termosAceitos: boolean`, `dataAceiteTermos: timestamp`, `versaoTermos: string`).
    - [x] **0.3.2:** Tornar a validação desse aceite obrigatória na API Route de submissão.

- [x] **0.4:** Fortalecer a Validação de Dados Dupla (Client/Server).
    - [x] **0.4.1:** Revisar o formulário de submissão no frontend para garantir que todos os campos críticos definidos na "Regra 4" sejam mandatórios.
    *   [x] **0.4.2:** Garantir que a mesma validação de campos críticos seja replicada no backend para integridade dos dados.

---

### Fase 1: Configuração e Estrutura do Projeto

- [x] **1.1:** Inicializar projeto Next.js para o frontend e backend (API Routes).
- [x] **1.2:** Configurar ESLint e Prettier para garantir a qualidade do código.
- [x] **1.3:** Definir a estrutura de pastas do projeto (`/src`, `/components`, `/lib/firebase`, etc.).
- [x] **1.4:** Configurar variáveis de ambiente (`.env.local`) para as credenciais do projeto Firebase.
- [x] **1.5:** Instalar e configurar o SDK do Firebase (`firebase`) para o cliente.

### Fase 2: Backend - Lógica com Firebase

- [x] **2.1:** Definir a estrutura de coleções no **Firestore**: `users` (para os Archons/Admins) e `submissions`.
- [x] **2.2:** Configurar o **Firebase Storage** e suas regras de segurança para permitir uploads de arquivos por usuários autenticados.
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

- [x] **3.1:** Criar as páginas estáticas principais (design responsivo *mobile-first*):
    - [x] **3.1.1:** Homepage (`/`) com a proposta de valor da incubadora.
    - [x] **3.1.2:** Página de Critérios de Seleção (`/criterios`).
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

### Fase 5: Fortalecimento e Integrações (Novas Tarefas)

- [x] **5.1:** Implementar e aplicar as **Regras de Segurança no Firestore** para garantir que apenas administradores autenticados possam acessar e modificar os dados das submissões.
- [x] **5.2:** Adicionar **verificação de token de autenticação** nas API Routes do admin para reforçar a segurança.
- [x] **5.3:** Integrar um serviço de **e-mail transacional** (ex: SendGrid) para enviar uma confirmação automática ao criador após a submissão do projeto.
- [ ] **5.4:** (Opcional) Adicionar um sistema de **análise web** (ex: Google Analytics 4) para monitorar o tráfego.

---

### Fase 6: Portal do Criador (Evolução do MVP)

- [x] **6.1:** Implementar sistema de **Registro e Login para Criadores** (e-mail/senha e/ou provedores sociais).
- [x] **6.2:** Desenvolver o **Dashboard do Criador**, uma área logada onde o usuário pode ver seus projetos submetidos e o status de cada um.
- [x] **6.3:** Refatorar as **Regras de Segurança** do Firestore e Storage para permitir que um criador acesse apenas seus próprios dados.

---

### Anexo A: Estrutura do Banco de Dados (Firestore)

Esta seção detalha a estrutura de dados para as coleções no Firestore, conforme a tarefa **2.1**.

#### Coleção: `users`
*   **Descrição:** Armazena os dados dos usuários administradores (Diretoria) que podem acessar o painel.
*   **Campos:**
    *   `uid` (string): O ID do usuário do Firebase Authentication.
    *   `email` (string): O email de login do usuário.
    *   `displayName` (string): Nome de exibição do usuário.
    *   `role` (string): Papel do usuário (ex: `"Diretoria"`, `"creator"`).

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
   

Onde encontrar suas credenciais:
   * Vá para o console do Firebase (https://console.firebase.google.com/).
   * Abra seu projeto.
   * Clique no ícone de engrenagem ⚙️ ao lado de "Visão geral do projeto" e selecione Configurações do projeto.
   * Na aba "Geral", role para baixo até "Seus apps".
   * Selecione seu aplicativo da web.
   * Você verá a seção "Snippet do SDK do Firebase". Escolha a opção Config. As chaves estarão lá.

---

### Fase 7: Backend de Submissão (Artefato 04)

- [x] **7.1:** Implementar Endpoint de Submissão (`POST /api/submissions`).
    - [x] **7.1.1:** Adicionar validação no backend para campos críticos e aceite obrigatório dos Termos de Envio.
    - [x] **7.1.2:** Garantir que a submissão falhe se os termos não forem aceitos, retornando erro apropriado.
- [x] **7.2:** Implementar Geração do "Protocolo Atlas".
    - [x] **7.2.1:** Criar uma função para gerar um ID de protocolo único (ex: `ZF-INC-2025-10-XYZ`).
    - [x] **7.2.2:** Salvar o protocolo junto com os dados da submissão no Firestore, com status inicial `recebido`.
- [x] **7.3:** Orquestrar Resposta da API.
    - [x] **7.3.1:** Em caso de sucesso, retornar o `Protocolo Atlas` gerado para o frontend.
    - [x] **7.3.2:** Em caso de falha, retornar uma mensagem de erro clara.
- [x] **7.4:** Implementar Notificação de Confirmação.
    - [x] **7.4.1:** Disparar e-mail de confirmação para o criador, contendo o `Protocolo Atlas`.
    - [x] **7.4.2:** Disparar e-mail de notificação para o administrador da incubadora.

---

### Fase 8: Frontend do MVP (Artefato 05)

- [x] **8.1: Estrutura Base e Identidade (Must-Have)**
    - [x] **8.1.1:** Desenvolver a Home Page (`/`) com a proposta de valor da incubadora.
    - [x] **8.1.2:** Implementar a navegação principal com links funcionais (Home, Incubadora, Contato, etc.).
    - [x] **8.1.3:** Criar a página de Contato (`/contato`) com formulário e e-mail.

- [x] **8.2: Finalização do Portal de Submissão (Must-Have)**
    - [x] **8.2.1:** Criar a página de Critérios de Seleção (`/criterios`) detalhando a exigência do registro de PI.
    - [x] **8.2.2:** Revisar o formulário em `/submeter` para garantir que todos os campos e uploads do artefato estão presentes e funcionais.
    - [x] **8.2.3:** Implementar a tela de sucesso pós-submissão para exibir o **Protocolo Atlas** retornado pela API.

- [x] **8.3: Páginas de Credibilidade e Vitrine (Should-Have)**
    - [x] **8.3.1:** Criar a página "Como Funciona a Incubadora" com a estrutura para os programas.
    - [x] **8.3.2:** Criar a página "Quem Somos" (`/sobre-nos`) com a estrutura para a equipe e mentores.
    - [x] **8.3.3:** Criar a página "Projetos Incubados" (`/projetos`) com uma estrutura de vitrine.

- [x] **8.4: Reavaliação de Escopo (Pós-MVP)**
    - [x] **8.4.1:** Analisar e planejar a implementação do Portal do Criador (Login e Dashboard), conforme solicitado no artefato.

---

### Fase 9: Testes e Validação de Segurança (Firebase)

- [ ] **9.1: Implementar Multi-Factor Authentication (MFA) para Administradores**
    - [ ] **9.1.1:** Pesquisar e definir a estratégia para habilitar MFA (provavelmente via SMS ou TOTP com Cloud Functions) para os usuários do painel de administração no Firebase.
    - [ ] **9.1.2:** Modificar o fluxo de login do painel de admin (`/admin/login`) para exigir a verificação do segundo fator após a senha ser validada.
    - [ ] **9.1.3:** Realizar um teste de ponta-a-ponta: criar um usuário admin, habilitar o MFA e garantir que o login só é bem-sucedido após a verificação do segundo fator.

- [x] **9.2: Fortalecer Controle de Acesso (RBAC) com Custom Claims**
    - [x] **9.2.1:** Criar um script ou Cloud Function para atribuir "claims" (papéis como `admin` ou `avaliador`) a usuários específicos do Firebase.
    - [x] **9.2.2:** Atualizar as API Routes do admin para verificar esses "claims" no token do usuário, bloqueando o acesso se o papel não for o correto. *(Nota: A verificação foi centralizada no middleware, tornando-a desnecessária nas rotas individuais).*
    - [x] **9.2.3:** Realizar um teste de segurança: tentar acessar uma API de admin com um token de usuário comum (criador) e confirmar que o acesso é negado (erro 403 Forbidden).

- [ ] **9.3: Validação de Mitigações de Risco**
    - [ ] **9.3.1:** Confirmar nas configurações do Firebase que a proteção contra enumeração de e-mail e "rate limiting" para login estão ativas (padrão do Identity Platform).
    - [ ] **9.3.2:** Revisar o código que interage com o Firestore para garantir o uso de queries parametrizadas, prevenindo qualquer risco de injeção.

- [ ] **9.4: Sincronização do README.md**
    - [ ] **9.4.1:** Após a conclusão dos testes, marcar as tarefas pendentes da "Fase 4: Deploy e Validação" como concluídas, pois esta fase cobre os pontos de teste E2E.

---

### Fase 10: Depuração Urgente do Middleware (Amanhã)

- [x] **10.1:** Reativar o `console.error` no arquivo `src/middleware.ts` para capturar o log de erro do servidor.
- [x] **10.2:** Executar o teste de segurança novamente com o usuário `criador@teste.com`.
- [x] **10.3:** Analisar o log de erro que aparecerá no **terminal** do `npm run dev` para diagnosticar a causa raiz do erro 500.
- [x] **10.4:** Aplicar a correção com base no diagnóstico.

---

### Fase 11: Implementação do Portal do Criador e Pipeline

- [x] **11.1: Evolução do Modelo de Dados (Backend)**
    - [x] **11.1.1:** Adicionar novos campos à coleção `submissions` no Firestore para suportar o pipeline (ex: `etapaPipeline`, `feedbackAnalise`, `pontuacao`).
- [x] **11.2: Evolução do Painel de Administração (Admin)**
    - [x] **11.2.1:** Analisar a página de detalhes da submissão (`/admin/submission/[id]`).
    - [x] **11.2.2:** Implementar um componente na página de detalhes para visualizar e atualizar a `etapaPipeline` de um projeto.
    - [x] **11.2.3:** Implementar campos na mesma página para que o administrador possa inserir `feedbackAnalise` e `pontuacao`.
    - [x] **11.2.4:** Atualizar a API (`PUT /api/admin/submissions/[id]`) para salvar esses novos dados no Firestore.
- [x] **11.3: Evolução do Dashboard do Criador (Frontend)**
    - [x] **11.3.1:** Refatorar a página `/dashboard` para exibir a `etapaPipeline` atual de cada projeto em uma linha do tempo ou status detalhado.
    - [x] **11.3.2:** Criar uma área no dashboard para o criador visualizar o `feedbackAnalise` e a `pontuacao` deixados pelo administrador.
- [ ] **11.4: Ferramentas de Comunicação (Pós-MVP)**
    - [ ] **11.4.1:** Planejar a "Área de Reunião".
    - [ ] **11.4.2:** Planejar o "Formulário de Dúvidas" (sistema de tickets/suporte).

---

### Fase 12: Login Unificado

- [x] **12.1:** Criar a nova página de login unificada em `src/app/login/page.tsx`.
- [x] **12.2:** Desenvolver o formulário de login (email/senha) nesta nova página.
- [x] **12.3:** Criar um novo endpoint de API (ex: `/api/auth/login`) para lidar com o processo de login.
    - [x] **12.3.1:** O endpoint usará o Firebase Auth para autenticar o usuário.
    - [x] **12.3.2:** No backend, verificará o "papel" (custom claim) do usuário autenticado.
    - [x] **12.3.3:** A API retornará para qual dashboard o usuário deve ser redirecionado (ex: `/admin` ou `/dashboard`).
- [x] **12.4:** Implementar a lógica no frontend (`/login/page.tsx`) para chamar a nova API e fazer o redirecionamento.
- [x] **12.5:** Atualizar o `Header.tsx` para que o botão "Login / Cadastro" aponte para a nova página `/login`.
- [x] **12.6:** Remover ou redirecionar a página antiga de login do admin (`/admin/login`).
