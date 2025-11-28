import { NextResponse, NextRequest } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/adminApp';

// Diretiva para o Next.js tratar esta rota como 100% dinâmica, evitando problemas de build.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest, context: { params: any }) {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    // Importação dinâmica da biblioteca de PDF e do nosso novo helper
    const { generateSubmissionPdf } = await import('@/lib/pdf/generateSubmissionPdf');

    const { id: submissionId } = context.params;
    if (!submissionId) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    // 1. Autenticação e Autorização (lógica mantida)
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { uid, role } = decodedToken;

    const docRef = adminDb.collection('submissions').doc(submissionId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }
    const submissionData = doc.data();

    const isOwner = submissionData?.creatorUid === uid;
    const isAdminOrCurator = role === 'admin' || role === 'curador';

    if (!isOwner && !isAdminOrCurator) {
      return NextResponse.json({ error: 'Acesso negado.' }, { status: 403 });
    }

    // 2. Geração do PDF usando o helper
    const pdfBytes = await generateSubmissionPdf(submissionData);
    
    // 3. Serializar o PDF e preparar a resposta
    const headers = new Headers();
    headers.append('Content-Type', 'application/pdf');
    headers.append('Content-Disposition', `attachment; filename="relatorio_${submissionId}.pdf"`);

    const pdfBuffer = Buffer.from(pdfBytes);
    const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

    return new Response(pdfBlob, { status: 200, headers });

  } catch (error: any) {
    if (error.code?.startsWith('auth/')) {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json({ error: 'Erro interno do servidor ao gerar PDF.' }, { status: 500 });
  }
}
