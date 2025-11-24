import { NextResponse, NextRequest } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/adminApp';
import { getStorage } from 'firebase-admin/storage';

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
      return NextResponse.json({ error: 'Acesso negado. Apenas criadores podem fazer uploads.' }, { status: 403 });
    }
    const uid = decodedToken.uid;

    // 2. Extrair dados do corpo da requisição
    const { submissionId, fileName, fileType } = await request.json();
    if (!submissionId || !fileName || !fileType) {
      return NextResponse.json({ error: 'ID da submissão, nome e tipo do arquivo são obrigatórios.' }, { status: 400 });
    }

    // 3. Encontrar o documento da submissão e verificar se pertence ao usuário
    const submissionRef = adminDb.collection('submissions').doc(submissionId);
    const doc = await submissionRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }
    if (doc.data()?.creatorUid !== uid) {
      return NextResponse.json({ error: 'Você não tem permissão para esta submissão.' }, { status: 403 });
    }

    // 4. Preparar o caminho no Firebase Storage e gerar a URL assinada
    const bucket = getStorage().bucket();
    const filePath = `submissions/${submissionId}/updates/${Date.now()}-${fileName}`;
    const file = bucket.file(filePath);

    const options = {
      version: 'v4' as const,
      action: 'write' as const,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutos de validade
      contentType: fileType,
    };

    const [signedUrl] = await file.getSignedUrl(options);

    // 5. Retornar a URL para o cliente
    return NextResponse.json({ signedUrl, filePath }, { status: 200 });

  } catch (error: any) {
    if (error.code?.startsWith('auth/')) {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    console.error('Erro ao gerar URL de upload:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
