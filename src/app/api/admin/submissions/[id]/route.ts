import { NextResponse, NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase/adminApp';
import { verifyAdmin, AuthError } from '@/lib/auth/admin';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
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

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    await verifyAdmin(request); // Protege a rota

    const { id } = context.params;
    const { status } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID da submissão é obrigatório.' }, { status: 400 });
    }

    const allowedStatus = ['pending', 'review', 'approved', 'rejected'];
    if (!status || !allowedStatus.includes(status)) {
      return NextResponse.json({ error: 'Status inválido.' }, { status: 400 });
    }

    const submissionRef = adminDb.collection('submissions').doc(id);
    const doc = await submissionRef.get();

    if (!doc.exists) {
      return NextResponse.json({ error: 'Submissão não encontrada.' }, { status: 404 });
    }

    await submissionRef.update({ status: status });

    return NextResponse.json({ message: 'Status atualizado com sucesso.', id, status }, { status: 200 });

  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    console.error(`Erro ao atualizar status da submissão ${context.params.id}:`, error);
    return NextResponse.json({ error: 'Falha ao atualizar status.' }, { status: 500 });
  }
}
