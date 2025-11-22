import { NextResponse, NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/adminApp';

export async function POST(request: NextRequest) {
  try {
    const { idToken } = await request.json();

    if (!idToken) {
      return NextResponse.json({ error: 'Token de autenticação não fornecido.' }, { status: 400 });
    }

    // Verifica o token com o Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    
    // Extrai o papel (role) dos custom claims do usuário
    const userRole = decodedToken.role;

    // Define para onde redirecionar com base no papel
    let redirectTo = '/dashboard'; // Rota padrão para criadores
    if (userRole === 'admin' || userRole === 'diretoria') {
      redirectTo = '/admin';
    }
    
    return NextResponse.json({ success: true, redirectTo }, { status: 200 });

  } catch (error: any) {
    console.error("Erro na API de login:", error);
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error') {
      return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Falha na autenticação do servidor.' }, { status: 500 });
  }
}
