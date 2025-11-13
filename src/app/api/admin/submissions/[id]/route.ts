import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/adminApp';

// Tipagem para os parâmetros da rota dinâmica
interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    // TODO: Adicionar verificação de token de autenticação.

    const submissionDoc = await adminDb.collection('submissions').doc(id).get();

    if (!submissionDoc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }

    const submissionData = submissionDoc.data();
    
    // Formata os dados para o cliente, incluindo a conversão do timestamp
    const responseData = {
      id: submissionDoc.id,
      ...submissionData,
      submissionDate: submissionData?.submissionDate.toDate().toISOString(),
    };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error(`Erro ao buscar submissão ${params.id}:`, error);
    return NextResponse.json({ error: 'Falha ao buscar dados da submissão.' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    // Valida o status recebido
    const allowedStatus = ['pending', 'review', 'approved', 'rejected'];
    if (!status || !allowedStatus.includes(status)) {
      return NextResponse.json({ error: 'Status inválido.' }, { status: 400 });
    }

    // TODO: Adicionar verificação de token de autenticação.

    const submissionRef = adminDb.collection('submissions').doc(id);
    const doc = await submissionRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }

    // Atualiza o campo 'status' no documento
    await submissionRef.update({ status: status });

    return NextResponse.json({ message: 'Status atualizado com sucesso.', id, status }, { status: 200 });

  } catch (error) {
    console.error(`Erro ao atualizar status da submissão ${params.id}:`, error);
    return NextResponse.json({ error: 'Falha ao atualizar status.' }, { status: 500 });
  }
}
