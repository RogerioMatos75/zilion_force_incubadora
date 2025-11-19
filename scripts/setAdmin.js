const admin = require('firebase-admin');

// --- INSTRUÇÕES DE USO ---
// 1. Baixe o arquivo de credenciais da sua conta de serviço no Console do Firebase.
//    (Configurações do Projeto > Contas de Serviço > Gerar nova chave privada)
// 2. Salve o conteúdo do JSON na variável FIREBASE_SERVICE_ACCOUNT_KEY no seu arquivo .env.local.
//    O conteúdo deve ser uma string única (ex: FIREBASE_SERVICE_ACCOUNT_KEY='{"type": "service_account", ...}').
// 3. Rode o script no terminal, passando o e-mail do usuário como argumento:
//    node -r dotenv/config ./scripts/setAdmin.js seu-email@exemplo.com dotenv_config_path=./.env.local
// -------------------------

// Inicializa o app admin do Firebase
try {
  // Carrega as variáveis de ambiente do .env.local
  require('dotenv').config({ path: './.env.local' });

  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    throw new Error('A variável de ambiente FIREBASE_SERVICE_ACCOUNT_KEY não está definida.');
  }

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY))
  });
  console.log("Firebase Admin SDK inicializado.");
} catch (error) {
  console.error("Erro ao inicializar Firebase Admin SDK:", error.message);
  process.exit(1);
}

const email = process.argv[2];

if (!email) {
  console.error('ERRO: Forneça um e-mail como argumento.');
  console.log('Uso: node -r dotenv/config ./scripts/setAdmin.js <email_do_usuario> dotenv_config_path=./.env.local');
  process.exit(1);
}

async function setAdminRole(email) {
  try {
    console.log(`Procurando usuário: ${email}`);
    const user = await admin.auth().getUserByEmail(email);
    
    if (user.customClaims && user.customClaims.role === 'admin') {
      console.log(`O usuário ${email} já é um admin.`);
      return;
    }

    console.log(`Atribuindo a função 'admin' para ${user.uid}...`);
    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
    
    console.log(`Sucesso! O usuário ${email} agora é um administrador.`);
    console.log("Observação: O usuário precisa fazer login novamente para que a alteração tenha efeito.");

  } catch (error) {
    console.error('Ocorreu um erro:', error.message);
  }
}

setAdminRole(email).then(() => process.exit(0));
