import { NextResponse, NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase/adminApp';
import { FieldValue } from 'firebase-admin/firestore';

// --- Função Auxiliar para Geração do Protocolo Atlas ---
/**
 * Gera um ID de protocolo único e legível para a submissão.
 * Ex: ZF-INC-2025-11-A4B8
 * @param docId O ID do documento do Firestore.
 * @returns O Protocolo Atlas gerado.
 */
function generateProtocoloAtlas(docId: string): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const shortId = docId.substring(0, 4).toUpperCase();
  return `ZF-INC-${year}-${month}-${shortId}`;
}

/**
 * API endpoint para lidar com novas submissões de projetos.
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      creatorName,
      creatorEmail,
      creatorUid,
      hqTitle,
      synopsis,
      genre,
      portfolioUrl,
      hqSampleUrl,
      ipDocumentUrl, // Pode estar ausente
      termsAccepted,
      originalityDeclared
    } = data;

    // Validação dos campos essenciais
    if (!creatorUid || !hqTitle || !genre || !hqSampleUrl || termsAccepted !== true || originalityDeclared !== true) {
      return NextResponse.json({ error: 'Dados essenciais inválidos ou termos não aceitos.' }, { status: 400 });
    }

    let submissionStatus: 'recebido' | 'pi_pendente';
    let submissionCerne: 'pré-incubação' | 'naoElegivel';

    if (ipDocumentUrl) {
      submissionStatus = 'recebido';
      submissionCerne = 'pré-incubação';
    } else {
      submissionStatus = 'pi_pendente';
      submissionCerne = 'naoElegivel';
    }

    const finalSubmission = {
      // Dados do criador e da obra
      creatorName, creatorEmail, creatorUid, hqTitle, synopsis, genre,
      portfolioUrl: portfolioUrl || null,
      
      // URLs dos documentos
      hqSampleUrl,
      ipDocumentUrl: ipDocumentUrl || null,
      
      // Status e Metadados v2.0
      etapaCerne: submissionCerne, // 'pré-incubação' | 'naoElegivel'
      statusDetalhado: submissionStatus, // 'recebido' | 'pi_pendente'
      etapaPipeline: [{ etapa: submissionCerne, data: FieldValue.serverTimestamp() }],
      crivoDoAtlas: [
        { id: 'etapa_pi', nome: '1. Análise Jurídica e de Propriedade Intelectual', status: ipDocumentUrl ? 'aprovado' : 'pendente', pontuacao: 0, feedback: ipDocumentUrl ? 'Documento de PI inicial recebido.' : '' },
        { id: 'etapa_mercado', nome: '2. Análise de Mercado e Potencial Comercial', status: 'pendente', pontuacao: 0, feedback: '' },
        { id: 'etapa_roteiro', nome: '3. Avaliação de Roteiro e Narrativa', status: 'pendente', pontuacao: 0, feedback: '' },
        { id: 'etapa_arte', nome: '4. Avaliação Artística e de Design', status: 'pendente', pontuacao: 0, feedback: '' },
        { id: 'etapa_universo', nome: '5. Alinhamento com o Universo Zilion Force', status: 'pendente', pontuacao: 0, feedback: '' }
      ],
      visivelInvestidor: false,

      // Arrays para o dashboard do criador
      documentosAssinados: [],
      feedbacks: [],
      reunioes: [],

      // Termos e Declarações
      termos: {
        aceitos: termsAccepted,
        data: FieldValue.serverTimestamp(),
        versao: '1.0.0'
      },
      declaracaoOriginalidade: {
        aceita: originalityDeclared,
        data: FieldValue.serverTimestamp(),
      },

      submissionDate: FieldValue.serverTimestamp(),
      // protocoloAtlas será adicionado após a criação do doc
    };

    // 1. Criar o documento para obter o ID
    const docRef = await adminDb.collection('submissions').add(finalSubmission);

    // 2. Gerar o Protocolo Atlas usando o ID do documento
    const protocoloAtlas = generateProtocoloAtlas(docRef.id);

    // 3. Atualizar o documento com o Protocolo Atlas
    await docRef.update({ protocoloAtlas });

    // 4. Envio de e-mail "fire-and-forget"
    // await sendTransactionalEmail(submissionStatus, creatorEmail, creatorName, hqTitle, protocoloAtlas);

    // 5. Retornar o Protocolo Atlas para o frontend
    return NextResponse.json(
      { 
        message: 'Submissão processada com sucesso!', 
        protocoloAtlas: protocoloAtlas,
        status: submissionStatus 
      },
      { status: 201 }
    );

  } catch (error: any) {
    // console.error('Erro ao salvar submissão:', error);
    return NextResponse.json({ error: 'Erro interno do servidor ao processar a submissão.' }, { status: 500 });
  }
}