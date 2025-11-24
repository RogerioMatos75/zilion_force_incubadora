import { NextResponse, NextRequest } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/adminApp';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET(request: NextRequest, context: { params: any }) {
  const authorization = request.headers.get('Authorization');
  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }
  const idToken = authorization.split('Bearer ')[1];

  try {
    const { id: submissionId } = context.params;
    if (!submissionId) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    // 1. Autenticação e Autorização
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

    // 2. Criação do Documento PDF (Lógica Refatorada)
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let y = page.getSize().height - 50;

    // Função auxiliar simples para verificar a necessidade de nova página
    const checkPageBreak = () => {
        if (y < 50) {
            page = pdfDoc.addPage();
            y = page.getSize().height - 50;
        }
    };

    // Título
    page.drawText('Relatório de Projeto - Zilion Force Incubadora', { x: 50, y, font: boldFont, size: 18, color: rgb(0, 0, 0) });
    y -= 40;

    // --- Dados Principais ---
    checkPageBreak();
    page.drawText('Protocolo Atlas:', { x: 50, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.protocoloAtlas || 'N/A', { x: 180, y, font, size: 12 });
    y -= 20;

    checkPageBreak();
    page.drawText('Título da Obra:', { x: 50, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.hqTitle || 'N/A', { x: 180, y, font, size: 12 });
    y -= 20;
    
    checkPageBreak();
    page.drawText('Criador:', { x: 50, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.creatorName || 'N/A', { x: 180, y, font, size: 12 });
    y -= 20;
    
    checkPageBreak();
    page.drawText('Data de Submissão:', { x: 50, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.submissionDate.toDate().toLocaleDateString('pt-BR') || 'N/A', { x: 180, y, font, size: 12 });
    y -= 30;

    // --- Status do Crivo do Atlas ---
    checkPageBreak();
    page.drawText('Pipeline de Incubação (Crivo do Atlas)', { x: 50, y, font: boldFont, size: 14 });
    y -= 25;

    submissionData?.crivoDoAtlas.forEach((etapa: any) => {
        checkPageBreak();
        const statusText = `[${etapa.status.toUpperCase()}] - Pontuação: ${etapa.pontuacao}`;
        page.drawText(`- ${etapa.nome}`, { x: 50, y, font, size: 12 });
        y -= 20;
    });
    
    y -= 10;

    // 3. Serializar o PDF e preparar a resposta
    const pdfBytes = await pdfDoc.save();
    
    const headers = new Headers();
    headers.append('Content-Type', 'application/pdf');
    headers.append('Content-Disposition', `attachment; filename="relatorio_${submissionId}.pdf"`);

    return new NextResponse(pdfBytes, { status: 200, headers });

  } catch (error: any) {
    if (error.code?.startsWith('auth/')) {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    console.error('Erro ao gerar PDF:', error);
    return NextResponse.json({ error: 'Erro interno do servidor ao gerar PDF.' }, { status: 500 });
  }
}
