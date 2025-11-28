import { NextResponse, NextRequest } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/adminApp';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { verifyAdmin, AuthError } from '@/lib/auth/admin';

export async function GET(request: NextRequest, context: { params: any }) {
  try {
    const { id } = await context.params; // Acessa os parâmetros da rota com await
    await verifyAdmin(request); // Protege a rota

    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    const submissionDoc = await adminDb.collection('submissions').doc(id).get();

    if (!submissionDoc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }

    const submissionData = submissionDoc.data();
    
    // Converte Timestamps para strings ISO para serialização
    const safeData = JSON.parse(JSON.stringify(submissionData, (key, value) => {
      if (value && value.toDate) { // Checa se é um Timestamp
        return value.toDate().toISOString();
      }
      return value;
    }));

    const responseData = {
      id: submissionDoc.id,
      ...safeData,
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error(`Erro ao buscar submissão ${context.params.id}:`, error);
    return NextResponse.json({ error: 'Falha ao buscar dados da submissão.' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, context: { params: any }) {
  try {
    const adminUser = await verifyAdmin(request); // Protege a rota e retorna os dados do admin

    const { id } = await context.params; // Acessa os parâmetros da rota com await
    const body = await request.json();
    const { 
      etapaPipeline, feedbackAnalise, pontuacao, newFeedback, 
      proximoDeadline, versaoAtual, newSignedDocument 
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    const submissionRef = adminDb.collection('submissions').doc(id);
    const doc = await submissionRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }
    
    const updateData: { [key: string]: any } = {};

    // --- LÓGICA PARA CAMPOS DE TEXTO/NÚMERO SIMPLES ---
    if (etapaPipeline) updateData.etapaPipeline = etapaPipeline;
    if (feedbackAnalise !== undefined) updateData.feedbackAnalise = feedbackAnalise;
    if (pontuacao !== undefined) updateData.pontuacao = Number(pontuacao);
    if (versaoAtual !== undefined) updateData.versaoAtual = versaoAtual;
    
    // --- LÓGICA PARA DATAS ---
    if (proximoDeadline) updateData.proximoDeadline = Timestamp.fromDate(new Date(proximoDeadline));
    
    // --- LÓGICA PARA ADICIONAR A ARRAYS (ARRAY UNION) ---
    // Adiciona um novo feedback
    if (newFeedback && newFeedback.mensagem && newFeedback.tipo) {
      const feedbackObject = {
        ...newFeedback,
        data: FieldValue.serverTimestamp(),
        autor: adminUser.name || adminUser.email || 'Curadoria Zilion Force',
      };
      updateData.feedbacks = FieldValue.arrayUnion(feedbackObject);
    }
    
    // Adiciona um novo documento assinado
    if (newSignedDocument && newSignedDocument.nome && newSignedDocument.url) {
      const documentObject = {
        ...newSignedDocument,
        dataAssinatura: Timestamp.fromDate(new Date(newSignedDocument.dataAssinatura)),
      };
      updateData.documentosAssinados = FieldValue.arrayUnion(documentObject);
    }
    
    if (Object.keys(updateData).length > 0) {
      await submissionRef.update(updateData);
    }
    
    const updatedDoc = await submissionRef.get();
    const updatedData = updatedDoc.data();

    // Converte Timestamps para strings ISO para serialização na resposta
    const safeData = JSON.parse(JSON.stringify(updatedData, (key, value) => {
      if (value && value.toDate) { 
        return value.toDate().toISOString();
      }
      return value;
    }));
    
    const responseData = {
      id: updatedDoc.id,
      ...safeData,
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error(`Erro ao atualizar submissão ${context.params.id}:`, error);
    return NextResponse.json({ error: 'Falha ao atualizar a submissão.' }, { status: 500 });
  }
}
