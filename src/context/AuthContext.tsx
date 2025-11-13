'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientApp';

// Define o tipo para o valor do contexto
type AuthContextType = {
  user: User | null;
  loading: boolean;
};

// Cria o contexto com um valor padrão
const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

// Cria o provedor do contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // O onAuthStateChanged retorna uma função de 'unsubscribe'
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
