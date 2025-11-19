import { NextResponse, NextRequest } from 'next/server';
import { adminDb } from '@/lib/firebase/adminApp';
import { verifyAdmin, AuthError } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  try {
    // A verificação de admin já foi feita pelo middleware.
    // A rota agora só precisa executar sua lógica de negócio.

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
    // Removemos o `if (error instanceof AuthError)` pois o middleware já cuida disso.
    console.error('Erro ao buscar submissões:', error);
    return NextResponse.json({ error: 'Falha ao buscar dados.' }, { status: 500 });
  }
}
