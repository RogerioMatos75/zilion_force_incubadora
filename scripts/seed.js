// scripts/seed.js
const admin = require('firebase-admin');
const { randomUUID } = require('crypto'); // Adicionado para gerar IDs únicos
require('dotenv').config({ path: '.env.local' });

// --- CONFIGURAÇÃO ---
// O script espera que as variáveis FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL e
// FIREBASE_PRIVATE_KEY estejam definidas no seu arquivo .env.local

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error('As variáveis de ambiente FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, e FIREBASE_PRIVATE_KEY precisam estar definidas no seu .env.local.');
}

try {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // A chave privada precisa de um tratamento para reintroduzir as quebras de linha
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} catch (error) {
  console.error('Erro ao inicializar o Firebase Admin. Verifique as variáveis de ambiente do Firebase no seu .env.local.', error);
  process.exit(1);
}


const auth = admin.auth();
const db = admin.firestore();

// --- DADOS DE EXEMPLO ---
const DUMMY_USER = {
  email: `criador.exemplo@${Date.now()}.com`, // Email único para evitar conflitos
  password: 'password123',
  displayName: 'Criador de Exemplo',
};

const DUMMY_SUBMISSION = {
  hqTitle: 'A Saga do Herói de Exemplo',
  synopsis: 'Uma jornada épica de um herói que descobre seus poderes em um mundo de fantasia e tecnologia.',
  genre: 'Aventura / Ficção Científica',
  portfolioUrl: 'https://example.com/portfolio',
  hqSampleUrl: 'https://example.com/sample.pdf',
  ipDocumentUrl: 'https://example.com/ip_document.pdf', // Simula que o doc de PI foi enviado
};


/**
 * Cria um usuário de teste no Firebase Authentication e atribui a ele a role 'criador'.
 */
async function createTestCreator() {
  console.log(`1. Criando usuário de teste com email: ${DUMMY_USER.email}...`);
  try {
    const userRecord = await auth.createUser({
      email: DUMMY_USER.email,
      password: DUMMY_USER.password,
      displayName: DUMMY_USER.displayName,
    });
    
    await auth.setCustomUserClaims(userRecord.uid, { role: 'criador' });

    console.log(`   ✅ Usuário criado com sucesso! UID: ${userRecord.uid}`);
    console.log(`      Email: ${DUMMY_USER.email}`);
    console.log(`      Senha: ${DUMMY_USER.password}`);
    console.log(`      Role: 'criador' atribuída.`);
    
    return userRecord.uid;
  } catch (error) {
    console.error('   ❌ Erro ao criar usuário:', error.message);
    throw error;
  }
}

/**
 * Cria um documento de submissão de exemplo no Firestore.
 */
async function createTestSubmission(creatorUid) {
  if (!creatorUid) {
    console.error('   ❌ UID do criador não fornecido. Abortando criação da submissão.');
    return;
  }

  console.log(`\n2. Criando submissão de teste para o UID: ${creatorUid}...`);

  const now = admin.firestore.Timestamp.now();
  const oneWeekFromNow = new admin.firestore.Timestamp(now.seconds + 7 * 24 * 60 * 60, now.nanoseconds);

  const submissionData = {
    creatorName: DUMMY_USER.displayName,
    creatorEmail: DUMMY_USER.email,
    creatorUid: creatorUid,
    ...DUMMY_SUBMISSION,
    
    etapaCerne: 'pré-incubação',
    statusDetalhado: 'recebido',
    etapaPipeline: [{ etapa: 'pré-incubação', data: now }],
    crivoDoAtlas: [
      { id: 'etapa_pi', nome: '1. Análise Jurídica e de Propriedade Intelectual', status: 'aprovado', pontuacao: 0, feedback: 'Documento de PI inicial recebido.' },
      { id: 'etapa_mercado', nome: '2. Análise de Mercado e Potencial Comercial', status: 'pendente', pontuacao: 0, feedback: '' },
      { id: 'etapa_roteiro', nome: '3. Avaliação de Roteiro e Narrativa', status: 'pendente', pontuacao: 0, feedback: '' },
      { id: 'etapa_arte', nome: '4. Avaliação Artística e de Design', status: 'pendente', pontuacao: 0, feedback: '' },
      { id: 'etapa_universo', nome: '5. Alinhamento com o Universo Zilion Force', status: 'pendente', pontuacao: 0, feedback: '' }
    ],
    visivelInvestidor: false,
    documentosAssinados: [],
    feedbacks: [],
    reunioes: [
      {
        reuniaoId: randomUUID(),
        tipo: 'workshop_fundamentos',
        data: oneWeekFromNow,
        confirmado: false,
        motivo: 'Workshop sobre Fundamentos de Roteiro para HQs.'
      }
    ],
    termos: { aceitos: true, data: now, versao: '1.0.0' },
    declaracaoOriginalidade: { aceita: true, data: now },
    submissionDate: now,
  };

  try {
    const docRef = await db.collection('submissions').add(submissionData);
    const protocoloAtlas = `ZF-INC-SEED-${docRef.id.substring(0, 6)}`;
    await docRef.update({ protocoloAtlas });

    console.log(`   ✅ Submissão criada com sucesso! ID do Documento: ${docRef.id}`);
    console.log(`      Protocolo Atlas: ${protocoloAtlas}`);
  } catch (error) {
    console.error('   ❌ Erro ao criar submissão:', error.message);
    throw error;
  }
}

/**
 * Função principal que orquestra a criação dos dados.
 */
async function main() {
  console.log('--- Iniciando script de seed para Zilion Force Incubadora ---');
  try {
    const creatorUid = await createTestCreator();
    await createTestSubmission(creatorUid);
    console.log('\n--- ✅ Script de seed concluído com sucesso! ---');
    process.exit(0);
  } catch (error) {
    console.error('\n--- ❌ Ocorreu um erro fatal durante a execução do script de seed ---');
    process.exit(1);
  }
}

main();
