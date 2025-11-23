import { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/adminApp';
import { DecodedIdToken } from 'firebase-admin/auth';

// Custom Error para facilitar a captura de erros de autenticação
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

/**
 * Verifica o token de autenticação de uma requisição e checa se o usuário é admin.
 * @param {NextRequest} request - O objeto da requisição Next.
 * @returns {Promise<DecodedIdToken>} O token decodificado do usuário se for admin.
 * @throws {AuthError} Se a autenticação falhar ou o usuário não for admin.
 */
export async function verifyAdmin(request: NextRequest): Promise<DecodedIdToken> {
  const authHeader = request.headers.get('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('Cabeçalho de autorização ausente ou mal formatado.');
  }

  const idToken = authHeader.split('Bearer ')[1];
  if (!idToken) {
    throw new AuthError('Token de autenticação não encontrado.');
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    // Verificamos a custom claim que definimos com o script setAdmin.js
    if (decodedToken.role !== 'admin') {
      throw new AuthError('Acesso negado. O usuário não tem permissão de administrador.');
    }

    return decodedToken;
  } catch (error: any) {
    if (error.code?.startsWith('auth/')) {
      // Erros específicos do Firebase Auth (token expirado, inválido, etc.)
      throw new AuthError(`Falha na verificação do token: ${error.message}`);
    }
    // Lança outros erros (incluindo nossa AuthError customizada)
    throw error;
  }
}
