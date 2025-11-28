import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

/**
 * Gera um PDF de relatório para uma submissão.
 * @param submissionData Os dados da submissão vindos do Firestore.
 * @returns Um Uint8Array contendo os bytes do PDF gerado.
 */
export async function generateSubmissionPdf(submissionData: any): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    let y = page.getSize().height - 50;
    const x_label = 50;
    const x_value = 200;
    const line_height = 20;
    const section_spacing = 30;

    const checkPageBreak = () => {
        if (y < 50) {
            page = pdfDoc.addPage();
            y = page.getSize().height - 50;
        }
    };

    // Título
    page.drawText('Relatório de Submissão - Zilion Force Incubadora', { x: x_label, y, font: boldFont, size: 18, color: rgb(0, 0, 0) });
    y -= section_spacing + 10;

    // --- Dados Principais ---
    checkPageBreak();
    page.drawText('Protocolo Atlas:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.protocoloAtlas || 'N/A', { x: x_value, y, font, size: 12 });
    y -= line_height;

    checkPageBreak();
    page.drawText('Título da Obra:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.hqTitle || 'N/A', { x: x_value, y, font, size: 12 });
    y -= line_height;
    
    checkPageBreak();
    page.drawText('Criador:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.creatorName || 'N/A', { x: x_value, y, font, size: 12 });
    y -= line_height;
    
    checkPageBreak();
    page.drawText('Data de Submissão:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.submissionDate?.toDate().toLocaleDateString('pt-BR', { timeZone: 'UTC' }) || 'N/A', { x: x_value, y, font, size: 12 });
    y -= section_spacing;

    // --- Termos e Declarações ---
    checkPageBreak();
    page.drawText('Termos e Declarações (Registro de Aceite)', { x: x_label, y, font: boldFont, size: 14 });
    y -= line_height + 5;

    checkPageBreak();
    page.drawText('Termos de Serviço Aceitos:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(`${submissionData?.termos?.aceitos ? 'Sim' : 'Não'}`, { x: x_value, y, font, size: 12 });
    y -= line_height;

    checkPageBreak();
    page.drawText('Versão dos Termos:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.termos?.versao || 'N/A', { x: x_value, y, font, size: 12 });
    y -= line_height;

    checkPageBreak();
    page.drawText('Data do Aceite:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(submissionData?.termos?.data?.toDate().toLocaleString('pt-BR', { timeZone: 'UTC' }) || 'N/A', { x: x_value, y, font, size: 12 });
    y -= line_height;

    checkPageBreak();
    page.drawText('Declaração de Originalidade:', { x: x_label, y, font: boldFont, size: 12 });
    page.drawText(`${submissionData?.declaracaoOriginalidade?.aceita ? 'Sim' : 'Não'}`, { x: x_value, y, font, size: 12 });
    y -= section_spacing;


    // --- Status do Crivo do Atlas ---
    checkPageBreak();
    page.drawText('Pipeline de Incubação (Crivo do Atlas)', { x: x_label, y, font: boldFont, size: 14 });
    y -= line_height + 5;

    submissionData?.crivoDoAtlas?.forEach((etapa: any) => {
        checkPageBreak();
        page.drawText(`- ${etapa.nome}:`, { x: x_label, y, font: boldFont, size: 10 });
        page.drawText(`${etapa.status.toUpperCase()}`, { x: x_value + 150, y, font, size: 10 });
        y -= line_height;
    });
    
    // --- Finaliza o PDF ---
    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}
