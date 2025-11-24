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
    // 1. Autenticar e autorizar o criador
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    if (decodedToken.role !== 'criador') {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
    }
    const uid = decodedToken.uid;

    // 2. Extrair dados do corpo da requisição
    const { submissionId, fileName, filePath, fileType, fileSize } = await request.json();
    if (!submissionId || !fileName || !filePath || !fileType || !fileSize) {
      return NextResponse.json({ error: 'Dados do arquivo incompletos.' }, { status: 400 });
    }

    // 3. Verificar posse da submissão
    const submissionRef = adminDb.collection('submissions').doc(submissionId);
    const doc = await submissionRef.get();

    if (!doc.exists || doc.data()?.creatorUid !== uid) {
      return NextResponse.json({ error: 'Submissão não encontrada ou acesso negado.' }, { status: 403 });
    }

    // 4. Criar o objeto de registro do arquivo
    const fileRecord = {
      uploadedAt: Timestamp.now(),
      fileName,
      filePath, // O caminho completo no Storage
      fileType,
      fileSize,
    };
    
    // 5. Adicionar o registro ao histórico de arquivos do documento
    await submissionRef.update({
      fileHistory: FieldValue.arrayUnion(fileRecord)
    });

    return NextResponse.json({ message: 'Upload confirmado e registrado com sucesso!' }, { status: 200 });

  } catch (error: any) {
    if (error.code?.startsWith('auth/')) {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    console.error('Erro ao confirmar upload:', error);
    return NextResponse.json({ error: 'Erro interno do servidor.' }, { status: 500 });
  }
}
