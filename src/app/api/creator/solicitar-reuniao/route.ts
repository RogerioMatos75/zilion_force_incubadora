import { NextResponse, NextRequest } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/adminApp';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    // 1. Verificar o token e a role do usuário
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (decodedToken.role !== 'criador') {
      return NextResponse.json({ error: 'Acesso negado. Apenas criadores podem solicitar reuniões.' }, { status: 403 });
    }
    const uid = decodedToken.uid;

    // 2. Extrair dados do corpo da requisição
    const { submissionId, motivo } = await request.json();
    if (!submissionId || !motivo) {
      return NextResponse.json({ error: 'ID da submissão e motivo são obrigatórios.' }, { status: 400 });
    }

    // 3. Encontrar o documento da submissão e verificar se pertence ao usuário
    const submissionRef = adminDb.collection('submissions').doc(submissionId);
    const doc = await submissionRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }
    if (doc.data()?.creatorUid !== uid) {
      return NextResponse.json({ error: 'Você não tem permissão para modificar esta submissão.' }, { status: 403 });
    }

    // 4. Criar o objeto da nova reunião
    const novaReuniao = {
      tipo: 'solicitada_pelo_criador',
      data: Timestamp.now(), // Gera o timestamp no servidor para evitar a limitação do 'serverTimestamp' em arrays
      confirmado: false,
      motivo: motivo,
      solicitante: {
        uid: uid,
        email: decodedToken.email
      }
    };
    
    // 5. Adicionar a nova reunião ao array 'reunioes' no documento
    await submissionRef.update({
      reunioes: FieldValue.arrayUnion(novaReuniao)
    });

    return NextResponse.json({ message: 'Solicitação de reunião enviada com sucesso!' }, { status: 200 });

  } catch (error: any) {
    if (error.code?.startsWith('auth/')) {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    console.error('Erro ao solicitar reunião:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
