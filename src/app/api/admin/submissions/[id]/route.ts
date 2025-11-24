import { NextResponse, NextRequest } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/adminApp';
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
    const body = await request.json();
    const { etapaPipeline, feedbackAnalise, pontuacao } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    // Valida a etapa do pipeline se ela for fornecida
    if (etapaPipeline) {
      const validStages = [
        'recebido', 'analise_preliminar', 'mentoria_inicial', 'workshop_fundamentos', 
        'validacao_mercado', 'incubacao_plena', 'pos_incubacao', 'rejeitado', 'graduado'
      ];
      if (!validStages.includes(etapaPipeline)) {
        return NextResponse.json({ error: 'Etapa do pipeline inválida.' }, { status: 400 });
      }
    }

    const submissionRef = adminDb.collection('submissions').doc(id);
    const doc = await submissionRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }

    // --- LÓGICA DE ATRIBUIÇÃO DE ROLE v2.0 ---
    const submissionData = doc.data();
    // Se a submissão tem um criador associado, verifique e promova-o se necessário.
    if (submissionData?.creatorUid) {
      const user = await adminAuth.getUser(submissionData.creatorUid);
      // Apenas atribui a role se o usuário ainda não for um 'criador'.
      if (user.customClaims?.role !== 'criador') {
        await adminAuth.setCustomUserClaims(submissionData.creatorUid, { role: 'criador' });
        // TODO: (Tarefa Futura) Disparar e-mail de boas-vindas aqui.
      }
    }
    // --- FIM DA LÓGICA ---

    // Cria o objeto de atualização apenas com os campos que foram realmente fornecidos no corpo da requisição
    const updateData: { [key: string]: any } = {};

    if (etapaPipeline) {
      updateData.etapaPipeline = etapaPipeline;
      updateData.status = etapaPipeline; // Mantém o campo 'status' legado sincronizado por enquanto
    }
    if (feedbackAnalise !== undefined) {
      updateData.feedbackAnalise = feedbackAnalise;
    }
    if (pontuacao !== undefined && !isNaN(Number(pontuacao))) {
      updateData.pontuacao = Number(pontuacao);
    }
    
    // Apenas executa a escrita no banco se houver algo para atualizar
    if (Object.keys(updateData).length > 0) {
      await submissionRef.update(updateData);
    }
    
    const updatedDoc = await submissionRef.get();
    const updatedData = updatedDoc.data();
    
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
    console.error(`Erro ao atualizar submissão ${context.params.id}:`, error);
    return NextResponse.json({ error: 'Falha ao atualizar a submissão.' }, { status: 500 });
  }
}

