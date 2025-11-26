// Importa as bibliotecas necessárias
const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente do arquivo .env.local
dotenv.config({ path: './.env.local' });

// Monta o objeto de credenciais da conta de serviço a partir das variáveis de ambiente
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Garante que a chave privada seja formatada corretamente
  privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
};

// Inicializa o app do Firebase Admin, se ainda não foi inicializado
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Pega o e-mail do primeiro argumento da linha de comando
const email = process.argv[2];

// Verifica se o e-mail foi fornecido
if (!email) {
  console.error('ERRO: Forneça um endereço de e-mail como argumento.');
  console.log('Uso: node scripts/setAdmin.js seu-email@exemplo.com');
  process.exit(1);
}

/**
 * Atribui o papel de admin a um usuário pelo e-mail.
 * @param {string} email O e-mail do usuário a ser promovido.
 */
async function setAdminRole(email) {
  try {
    // Busca o usuário pelo e-mail
    const user = await admin.auth().getUserByEmail(email);
    
    // Pega as permissões (claims) existentes para não sobrescrevê-las
    const existingClaims = user.customClaims || {};

    // Mescla as permissões existentes com a nova permissão de admin
    const newClaims = { ...existingClaims, role: 'admin' };

    // Define o custom claim 'role' como 'admin' de forma segura
    await admin.auth().setCustomUserClaims(user.uid, newClaims);
    
    console.log(`SUCESSO: O usuário ${email} (UID: ${user.uid}) agora tem a permissão de administrador.`);
    console.log('Permissões atuais:', newClaims);
    console.log('Lembre-se: O usuário precisa fazer logout e login novamente para que a mudança tenha efeito.');

  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      console.error(`ERRO: Nenhum usuário encontrado com o e-mail: ${email}`);
    } else {
      console.error('Ocorreu um erro inesperado:', error);
    }
    process.exit(1);
  }
}

// Executa a função
setAdminRole(email);