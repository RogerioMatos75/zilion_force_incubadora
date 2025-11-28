// src/app/api/admin/generate-signed-url/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { adminStorage } from '@/lib/firebase/adminApp';
import { verifyAdmin, AuthError } from '@/lib/auth/admin';

export async function POST(request: NextRequest) {
  try {
    await verifyAdmin(request); // Protege a rota

    const { fileName, fileType, submissionId } = await request.json();

    if (!fileName || !fileType || !submissionId) {
      return NextResponse.json({ error: 'Informações do arquivo e ID da submissão são obrigatórios.' }, { status: 400 });
    }

    const bucket = adminStorage.bucket();
    // Define um caminho organizado para os documentos assinados
    const filePath = `submissions/${submissionId}/signed_documents/${Date.now()}-${fileName}`;
    const file = bucket.file(filePath);

    // Configurações para a URL assinada
    const options = {
      version: 'v4' as const,
      action: 'write' as const,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutos de validade
      contentType: fileType,
    };

    // Gera a URL assinada
    const [signedUrl] = await file.getSignedUrl(options);

    // Retorna a URL e o caminho do arquivo para o frontend
    return NextResponse.json({ signedUrl, filePath }, { status: 200 });

  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error('Erro ao gerar URL assinada:', error);
    return NextResponse.json({ error: 'Falha ao gerar URL de upload.' }, { status: 500 });
  }
}
