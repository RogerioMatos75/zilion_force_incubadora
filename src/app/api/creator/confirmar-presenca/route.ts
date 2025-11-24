import { NextResponse, NextRequest } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/adminApp';

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    // 1. Autenticar e autorizar o criador
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (decodedToken.role !== 'criador') {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
    }
    const uid = decodedToken.uid;

    // 2. Extrair dados do corpo da requisição
    const { submissionId, reuniaoId } = await request.json();
    if (!submissionId || !reuniaoId) {
      return NextResponse.json({ error: 'ID da submissão e da reunião são obrigatórios.' }, { status: 400 });
    }

    // 3. Obter o documento e verificar posse
    const submissionRef = adminDb.collection('submissions').doc(submissionId);
    const doc = await submissionRef.get();

    if (!doc.exists || doc.data()?.creatorUid !== uid) {
      return NextResponse.json({ error: 'Submissão não encontrada ou acesso negado.' }, { status: 403 });
    }

    // 4. Lógica de atualização do array
    const submissionData = doc.data();
    const reunioes = submissionData?.reunioes || [];

    let reuniaoEncontrada = false;
    const novasReunioes = reunioes.map((reuniao: any) => {
      if (reuniao.reuniaoId === reuniaoId) {
        reuniaoEncontrada = true;
        return { ...reuniao, confirmado: true }; // Atualiza o status
      }
      return reuniao;
    });

    if (!reuniaoEncontrada) {
      return NextResponse.json({ error: 'Reunião não encontrada nesta submissão.' }, { status: 404 });
    }

    // 5. Salvar o array modificado de volta no Firestore
    await submissionRef.update({
      reunioes: novasReunioes
    });

    return NextResponse.json({ message: 'Presença confirmada com sucesso!' }, { status: 200 });

  } catch (error: any) {
    if (error.code?.startsWith('auth/')) {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    console.error('Erro ao confirmar presença:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
