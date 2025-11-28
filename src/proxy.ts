import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/adminApp';

export async function proxy(request: NextRequest) {
  const authorization = request.headers.get('Authorization');
  
  if (!authorization?.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: 'Não autorizado.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  const idToken = authorization.split('Bearer ')[1];
  if (!idToken) {
    return new NextResponse(JSON.stringify({ error: 'Token malformado.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken.role !== 'admin') {
      return new NextResponse(JSON.stringify({ error: 'Acesso negado: Privilégios insuficientes.' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Erro na verificação do token no middleware:', error);
    return new NextResponse(JSON.stringify({ error: 'Não autorizado: Token inválido ou expirado.' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
}

// Aplica o middleware apenas às rotas da API do admin
export const config = {
  matcher: '/api/admin/:path*',
};
