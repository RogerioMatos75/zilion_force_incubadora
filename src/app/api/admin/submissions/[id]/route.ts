import { NextResponse, NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase/adminApp';
import { verifyAdmin, AuthError } from '@/lib/auth/admin';

export async function GET(request: NextRequest, context: { params: any }) {
  try {
    await verifyAdmin(request); // Protege a rota

    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    const submissionDoc = await adminDb.collection('submissions').doc(id).get();

    if (!submissionDoc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }

    const submissionData = submissionDoc.data();
    
    const responseData = {
      id: submissionDoc.id,
      ...submissionData,
      submissionDate: submissionData?.submissionDate.toDate().toISOString(),
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
    await verifyAdmin(request); // Protege a rota

    const { id } = context.params;
    // Extrai os novos campos do pipeline do corpo da requisição
    const { etapaPipeline, feedbackAnalise, pontuacao } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    // Valida a etapa do pipeline
    const validStages = [
      'recebido', 'analise_preliminar', 'mentoria_inicial', 'workshop_fundamentos', 
      'validacao_mercado', 'incubacao_plena', 'pos_incubacao', 'rejeitado', 'graduado'
    ];
    if (!etapaPipeline || !validStages.includes(etapaPipeline)) {
      return NextResponse.json({ error: 'Etapa do pipeline inválida.' }, { status: 400 });
    }

    const submissionRef = adminDb.collection('submissions').doc(id);
    const doc = await submissionRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }

    // Cria o objeto de atualização apenas com os campos definidos
    const updateData: { [key: string]: any } = {
      etapaPipeline,
      status: etapaPipeline, // Mantém o campo 'status' legado sincronizado
    };

    if (feedbackAnalise !== undefined) {
      updateData.feedbackAnalise = feedbackAnalise;
    }
    if (pontuacao !== undefined && pontuacao !== '' && !isNaN(Number(pontuacao))) {
      updateData.pontuacao = Number(pontuacao);
    }

    await submissionRef.update(updateData);
    
    // Após a atualização, busca o documento atualizado para retornar ao frontend
    const updatedDoc = await submissionRef.get();
    const updatedData = updatedDoc.data();
    
    // Garante a serialização correta de datas
    const responseData = {
      id: updatedDoc.id,
      ...updatedData,
      submissionDate: updatedData?.submissionDate.toDate().toISOString(),
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error(`Erro ao atualizar pipeline da submissão ${context.params.id}:`, error);
    return NextResponse.json({ error: 'Falha ao atualizar o pipeline.' }, { status: 500 });
  }
}

