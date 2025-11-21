import { NextResponse, NextRequest } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase/adminApp';
import { Timestamp } from 'firebase-admin/firestore';

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('Authorization');

  if (!authorization?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const idToken = authorization.split('Bearer ')[1];
  if (!idToken) {
    return NextResponse.json({ error: 'Token malformado.' }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const submissionsRef = adminDb.collection('submissions');
    const snapshot = await submissionsRef.where('creatorUid', '==', uid).orderBy('submissionDate', 'desc').get();

    if (snapshot.empty) {
      return NextResponse.json([], { status: 200 });
    }

    const userSubmissions = snapshot.docs.map(doc => {
      const data = doc.data();
      // Função auxiliar para converter Timestamps do Firestore para strings ISO 8601 de forma segura
      const safeToISO = (timestamp: any) => {
        if (timestamp instanceof Timestamp) {
          return timestamp.toDate().toISOString();
        }
        return timestamp; // Retorna o valor original se não for um Timestamp
      };

      // Recria o objeto de dados convertendo todos os timestamps aninhados
      return {
        id: doc.id,
        ...data,
        submissionDate: safeToISO(data.submissionDate),
        termos: data.termos ? { ...data.termos, data: safeToISO(data.termos.data) } : undefined,
        declaracaoOriginalidade: data.declaracaoOriginalidade ? { ...data.declaracaoOriginalidade, data: safeToISO(data.declaracaoOriginalidade.data) } : undefined,
      };
    });

    return NextResponse.json(userSubmissions, { status: 200 });

  } catch (error: any) {
    console.error("Erro ao buscar submissões do criador:", error);
    if (error.code === 'auth/id-token-expired' || error.code === 'auth/argument-error' || error.code === 'auth/id-token-revoked') {
        return NextResponse.json({ error: 'Token inválido ou expirado.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Falha interna ao buscar dados.' }, { status: 500 });
  }
}
