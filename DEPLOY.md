# Guia de Deploy na Vercel

Este documento descreve os passos para fazer o deploy da aplicação Zilion Force Incubadora na Vercel.

## Pré-requisitos

1.  **Conta na Vercel:** Você precisa ter uma conta na Vercel, que pode ser criada gratuitamente com seu GitHub, GitLab, ou Bitbucket.
2.  **Repositório no Git:** O código do projeto deve estar em um repositório Git (ex: GitHub).

## Passo a Passo do Deploy

1.  **Novo Projeto:** No seu dashboard da Vercel, clique em **"Add New..."** e selecione **"Project"**.

2.  **Importar Repositório:** A Vercel irá mostrar seus repositórios Git. Encontre o repositório da `zilion-force-incubadora` e clique em **"Import"**.

3.  **Configuração do Projeto:**
    -   **Framework Preset:** A Vercel deve detectar automaticamente que é um projeto **Next.js**. Nenhuma alteração é necessária aqui.
    -   **Build and Output Settings:** Você pode deixar as configurações padrão.
    -   **Environment Variables (Passo Crítico):** Este é o passo mais importante. Você precisa adicionar as chaves do seu projeto Firebase.

## Configurando as Variáveis de Ambiente

No painel do seu projeto na Vercel, vá para **Settings > Environment Variables**. Adicione cada uma das variáveis abaixo.

**Importante:** As variáveis do Firebase Admin SDK (`FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`) são secretas e devem ser usadas apenas no servidor. **NUNCA** as exponha no lado do cliente. As variáveis com o prefixo `NEXT_PUBLIC_` são seguras para exposição no navegador.

### Variáveis Públicas (Client-Side)
Copie os valores do seu arquivo `.env.local`:

-   `NEXT_PUBLIC_FIREBASE_API_KEY`
-   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
-   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
-   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
-   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
-   `NEXT_PUBLIC_FIREBASE_APP_ID`

### Variáveis Secretas (Server-Side - Admin SDK)
Estas são as credenciais da sua **Conta de Serviço** (Service Account) no Firebase. Você pode encontrá-las no seu console do Firebase em **Project Settings > Service accounts > Generate new private key**.

-   `FIREBASE_PROJECT_ID`: O ID do seu projeto.
-   `FIREBASE_CLIENT_EMAIL`: O e-mail da conta de serviço (ex: `firebase-adminsdk-...@your-project-id.iam.gserviceaccount.com`).
-   `FIREBASE_PRIVATE_KEY`: **Atenção aqui!** A chave privada no arquivo JSON que o Firebase fornece tem quebras de linha (`\n`). Ao colar na Vercel, você deve substituir cada quebra de linha por um espaço ou colar o valor entre aspas para garantir que ele seja lido como uma única string. A Vercel geralmente lida bem com a colagem direta do valor.

4.  **Deploy:** Após adicionar todas as variáveis de ambiente, clique em **"Deploy"**.

A Vercel irá construir e implantar seu projeto. Ao final, você receberá a URL da aplicação em produção.
