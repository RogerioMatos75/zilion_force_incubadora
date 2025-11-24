'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientApp';

// 1. Adicionar a função signOut ao tipo do contexto
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>; 
};

export const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  signOut: async () => {}, // Adiciona uma função padrão
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Adiciona o objeto auth à janela para fins de depuração em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      (window as any).auth = auth;
    }

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  // 2. Criar a função de signOut que chama o Firebase
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      // O listener onAuthStateChanged cuidará de atualizar o estado do usuário para null
    } catch (error) {
      // console.error("Erro ao fazer logout:", error);
    }
  };

  // 3. Fornecer a função signOut no valor do contexto
  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
