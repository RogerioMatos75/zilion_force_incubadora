import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

// As chaves do Admin SDK são lidas das variáveis de ambiente do servidor.
// Elas NUNCA devem ser expostas no lado do cliente.
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // A chave privada pode ter problemas com quebras de linha no .env.
  // Substituímos '\n' por '\n' para garantir que seja lida corretamente.
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Inicializa o Firebase Admin SDK, mas apenas se ainda não foi inicializado.
if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET 
  });
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();
const adminStorage = admin.storage();

export { adminDb, adminAuth, adminStorage };
