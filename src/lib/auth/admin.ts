import { NextRequest } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/adminApp';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Verifica se a requisição contém um token de autenticação válido de um usuário da Diretoria.
 * @param request A requisição Next.js
 * @returns O token decodificado e o documento do usuário.
 * @throws {AuthError} Se a autenticação falhar por qualquer motivo.
 */
export const verifyAdmin = async (request: NextRequest) => {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    throw new AuthError('Cabeçalho de autorização ausente ou inválido.');
  }

  const idToken = authorization.split('Bearer ')[1];
  if (!idToken) {
    throw new AuthError('Token de autenticação ausente.');
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDoc = await adminDb.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      throw new AuthError('Usuário não encontrado no banco de dados.');
    }

    const userData = userDoc.data();
    if (userData?.role !== 'Diretoria') {
      throw new AuthError('O usuário não possui privilégios de Diretoria.');
    }

    return { decodedToken, userDoc };
  } catch (error: any) {
    console.error('Erro ao verificar o token de administrador:', error);
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError('Token inválido ou expirado.');
  }
};
