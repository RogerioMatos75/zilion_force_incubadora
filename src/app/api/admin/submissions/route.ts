import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/adminApp';

export async function GET(request: Request) {
  try {
    // TODO: Adicionar verificação de token de autenticação para garantir que apenas admins possam acessar.
    // Por enquanto, a rota está aberta para facilitar o desenvolvimento do frontend.

    const submissionsRef = adminDb.collection('submissions');
    const snapshot = await submissionsRef.orderBy('submissionDate', 'desc').get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const submissions = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Converte o timestamp do Firestore para um formato de data ISO string
        submissionDate: data.submissionDate.toDate().toISOString(),
      };
    });

    return NextResponse.json(submissions, { status: 200 });

  } catch (error) {
    console.error('Erro ao buscar submissões:', error);
    return NextResponse.json({ error: 'Falha ao buscar dados.' }, { status: 500 });
  }
}
