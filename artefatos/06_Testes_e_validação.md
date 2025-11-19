### Fluxo de Autenticação

O modelo de autenticação é projetado principalmente para proteger o acesso ao "Códice do Atlas Interno" (painel de administração/gestão da incubadora), onde a equipe interna (avaliadores, gestores, jurídicos) acessará informações confidenciais de Propriedade Intelectual (PI) dos projetos submetidos.

**1. Registro (Onboarding de Usuários Internos)**

*   **Política:** O registro de novos usuários internos (equipe, mentores, avaliadores) será estritamente controlado via convite ou criação manual por um Super Administrador. Não haverá registro público para acesso ao backend de gestão.
*   **Procedimento:** O Super Admin cria a conta, atribui a função (RBAC), e o sistema envia um link único de ativação temporário para o e-mail do usuário. O usuário define sua senha inicial e é obrigado a configurar o Multi-Fator de Autenticação (MFA).

**2. Login (Acesso ao Painel Interno)**

1.  **Credenciais:** O usuário envia e-mail/username e senha para o endpoint de autenticação (via HTTPS).
2.  **Verificação:** O backend verifica as credenciais (comparando o hash da senha armazenada).
3.  **MFA:** Após a verificação bem-sucedida da senha, o usuário é solicitado a fornecer o código gerado pelo seu aplicativo autenticador (TOTP).
4.  **Tokenização:** Em caso de sucesso na autenticação, o servidor gera um **Access Token** (JWT) de curta duração e, opcionalmente, um **Refresh Token** de longa duração.
5.  **Resposta:** O servidor envia o Access Token de volta ao cliente (guardado preferencialmente em `HttpOnly Cookies` ou `localStorage` seguro, dependendo da arquitetura SP-A/SSR).
6.  **Acesso:** O cliente inclui o Access Token nos cabeçalhos (`Authorization: Bearer <token>`) de todas as requisições subsequentes para acessar recursos protegidos.

**3. Gerenciamento de Sessão (Tokens)**

*   O **Access Token** é usado para verificar a identidade e permissões (RBAC) em cada requisição.
*   Quando o Access Token expira, o cliente utiliza o **Refresh Token** (enviado a um endpoint `/refresh`) para obter um novo Access Token sem exigir que o usuário faça login novamente.

**4. Recuperação de Senha**

1.  O usuário solicita a recuperação no endpoint `/forgot-password`.
2.  O sistema envia um link único e temporário (contendo um token de redefinição) para o e-mail cadastrado.
3.  O usuário acessa o link, que valida o token no backend.
4.  O usuário define uma nova senha forte, que é imediatamente hasheada e armazenada.

### Tecnologias/Bibliotecas

A escolha das tecnologias visa garantir um sistema de autenticação robusto, escalável e stateless, adequado para uma aplicação moderna de gestão de dados sensíveis (PI).

| Categoria | Tecnologia Sugerida | Propósito |
| :--- | :--- | :--- |
| **Protocolo de Autenticação** | **JSON Web Tokens (JWT)** | Usado para criar tokens de acesso stateless. Essencial para autenticação baseada em API, permitindo que o servidor verifique a identidade do usuário sem consultar o banco de dados em cada requisição. |
| **Hashing de Senhas** | **Bcrypt** | Padrão da indústria para hashing de senhas. Garante que as senhas nunca sejam armazenadas em texto simples, usando um algoritmo lento e adaptável aprimorado com um *salt*. |
| **Implementação de MFA** | **TOTP (Time-based One-Time Password)** | Implementação de códigos de 6 dígitos baseados em tempo, compatível com Google Authenticator, Authy, etc. Bibliotecas como `speakeasy` (Node.js) ou similares podem ser utilizadas. |
| **Framework/Biblioteca (Node.js)** | **Passport.js ou Módulos de Auth do Framework (ex: NestJS)** | Passport.js é altamente flexível para implementar estratégias de autenticação local (username/password) e gerenciar sessões e cookies. Se for usado um framework como NestJS ou Django, seus módulos de autenticação nativos podem ser preferíveis. |
| **Autorização** | **Role-Based Access Control (RBAC)** | Implementar roles (Super Admin, Avaliador, Jurídico) diretamente no payload do JWT e validar no backend antes de permitir o acesso a endpoints críticos (ex: `/api/projetos/revisao`). |
| **Segurança de Tokens** | **JSON Web Key Set (JWKS)** | Se for necessário um serviço de identidade centralizado no futuro ou integração com terceiros (IdP), usar JWKS para gerenciar as chaves públicas para verificação de JWTs. |

### Considerações de Segurança

Dado o foco da Zilion Force Incubadora em Propriedade Intelectual (PI), a segurança deve ser de alto nível para proteger dados confidenciais dos criadores.

**1. Proteção de Credenciais**

*   **Hashing Robusto:** Uso obrigatório de **Bcrypt** (ou Argon2) para hash e salting de todas as senhas. Nunca armazene senhas em texto simples ou use algoritmos fracos como SHA-1 ou MD5.
*   **Transmissão Segura:** Uso obrigatório de **HTTPS/TLS** em toda a comunicação entre o cliente e o backend para evitar interceptação de credenciais e tokens.

**2. Gerenciamento de Sessão e Tokens**

*   **Refresh Tokens Seguros:** Armazene Refresh Tokens no banco de dados, associados a um usuário específico. Quando usados, devem ser validados e revogados para evitar reuso.
*   **Tempo de Vida Curto para JWTs:** Mantenha os Access Tokens com tempo de vida muito curto (ex: 15 a 30 minutos) para mitigar o risco de tokens comprometidos.
*   **Token Storage:** Evitar armazenar JWTs no `localStorage`. Prefira `HttpOnly Secure Cookies` para mitigar ataques XSS (Cross-Site Scripting), especialmente para aplicações web tradicionais, ou use arquiteturas de segurança mais complexas se for um SPA puro.

**3. Controles de Acesso e Auditoria**

*   **Multi-Fator de Autenticação (MFA):** Tornar o MFA obrigatório para todos os usuários internos (Administradores, Avaliadores) devido à alta sensibilidade dos dados de PI.
*   **Registro de Auditoria:** Implementar logs detalhados de todas as ações sensíveis (login bem-sucedido/falhado, criação/exclusão de usuários, acesso a documentos de PI).
*   **RBAC (Role-Based Access Control):** Aplicar autorização granular baseada em funções (ex: apenas o time Jurídico pode acessar os termos de PI detalhados; Avaliadores só podem ler e comentar submissões).

**4. Mitigação de Ataques Comuns**

*   **Rate Limiting:** Aplicar limite de requisições nos endpoints de login, registro e recuperação de senha para prevenir ataques de força bruta e DoS.
*   **Proteção contra Injeção de SQL e XSS:** Usar ORMs (Object-Relational Mappers) e validação rigorosa de entrada em todos os dados de formulário, especialmente nos campos de login/registro.
*   **Proteção contra CSRF (Cross-Site Request Forgery):** Implementar mecanismos anti-CSRF (como tokens CSRF) se a aplicação utilizar cookies para gerenciamento de sessão, garantindo que apenas requisições originadas do domínio da incubadora sejam aceitas.
*   **Validação de E-mail:** Garantir que apenas e-mails corporativos válidos ou de domínios confiáveis sejam usados para contas de administrador.
<br>
<hr>
<br>

### 🧠 Instruções para o Agente de Desenvolvimento

**📝 Prompt Complementar:**
Este artefato define o esqueleto de segurança necessário para proteger os dados de Propriedade Intelectual (PI), com foco em Multi-Fator de Autenticação (MFA) obrigatório e Role-Based Access Control (RBAC) estrito para a equipe interna. A próxima fase de desenvolvimento deve se concentrar na implementação ágil e rigorosa desses mecanismos de segurança (Bcrypt, JWTs de curta duração, Cookies HttpOnly). Como um MVP, a prioridade máxima é a estabilidade e a usabilidade (UX) do fluxo de login e registro manual, garantindo que o Super Admin possa integrar a equipe interna de forma rápida e, acima de tudo, segura.

**👍 Instruções Positivas:**

1.  **Testes Manuais de Segurança Focados:** Teste o fluxo de Login com MFA e o fluxo de Refresh Token exaustivamente com os primeiros 5 usuários reais (Super Admin, Avaliadores-chave). Colete dados qualitativos sobre a dificuldade de configurar o MFA (TOTP) e a percepção de segurança e estabilidade da sessão.
2.  **Validação de RBAC Crítico:** Antes do lançamento interno, realize testes de penetração manual (simulados) em pontos críticos para garantir que usuários com funções de baixo privilégio (ex: Avaliador) sejam estritamente bloqueados do acesso a dados confidenciais (ex: documentos jurídicos de PI ou exclusão de projetos).
3.  **Implementação de Mitigações de Risco:** Garanta que as mitigações essenciais de ataques (Rate Limiting nos endpoints de login e validação robusta de entrada contra injeção/XSS) estejam implementadas e operacionais desde o primeiro *commit* de código de produção.
4.  **Prioridade a HttpOnly Cookies:** Implemente o armazenamento do Access Token e Refresh Token utilizando `HttpOnly Secure Cookies` como a primeira escolha para o gerenciamento de sessões, mitigando o risco de XSS, conforme especificado no documento.

**👎 Instruções Negativas:**

1.  **Escopo Estrito de Autenticação:** Não implemente, neste MVP, integrações complexas de Single Sign-On (SSO) ou suporte para login social (Google, GitHub, etc.). Mantenha o escopo estritamente focado na autenticação local via credenciais de e-mail/senha + TOTP.
2.  **Cobertura de Teste de Periferia:** Não priorize o alcance de 100% de cobertura de testes unitários para módulos de lógica de negócios periféricos (ex: formatação de e-mail, relatórios simples). Concentre o tempo limitado de teste automatizado na garantia da lógica de autenticação (JWT signing/verification) e nas regras de RBAC.
3.  **Abstrações Desnecessárias:** Evite a criação de um serviço de identidade separado (Identity Provider) ou a complicação imediata com o uso completo de JWKS (JSON Web Key Set), a menos que seja estritamente necessário para o framework escolhido. Mantenha a emissão e validação de JWTs autocontida no backend do ‘Códice do Atlas Interno’ por agora.
4.  **Log Detalhado vs. UI Rica:** Não gaste tempo desenvolvendo interfaces de usuário complexas para o sistema de auditoria e logs. Um mecanismo de registro (logging) simples e funcional no backend, acessível pelos Super Admins, é suficiente para o MVP.