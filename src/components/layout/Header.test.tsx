
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { AuthContext, AuthContextType } from '@/context/AuthContext'; // Precisamos importar o tipo também

// Mock do Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Uma função auxiliar para renderizar o Header com um contexto de autenticação customizado
const renderHeader = (authContextValue: Partial<AuthContextType>) => {
  const fullContextValue: AuthContextType = {
    user: null,
    loading: false,
    signIn: async () => {},
    signOut: async () => {},
    ...authContextValue,
  };

  return render(
    <AuthContext.Provider value={fullContextValue}>
      <Header />
    </AuthContext.Provider>
  );
};

describe('Header Component', () => {
  // Teste 1: Cenário quando o usuário está deslogado
  test('deve renderizar o link de Login quando o usuário está deslogado', () => {
    renderHeader({ user: null });

    // Verifica se o link "Login" está no documento
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toBeInTheDocument();

    // Verifica se o botão "Sair" NÃO está no documento
    const logoutButton = screen.queryByRole('button', { name: /sair/i });
    expect(logoutButton).not.toBeInTheDocument();
  });

  // Teste 2: Cenário quando o usuário está logado
  test('deve renderizar o email do usuário e o botão Sair quando logado', () => {
    const mockUser = { uid: '123', email: 'criador@teste.com' };
    const signOutMock = jest.fn(); // Mock da função signOut

    renderHeader({ user: mockUser, signOut: signOutMock });

    // Verifica se o email do usuário é exibido
    const userEmail = screen.getByText(mockUser.email);
    expect(userEmail).toBeInTheDocument();
    
    // Verifica se o botão "Sair" está presente
    const logoutButton = screen.getByRole('button', { name: /sair/i });
    expect(logoutButton).toBeInTheDocument();
    
    // Verifica se o link "Login" NÃO está no documento
    const loginLink = screen.queryByRole('link', { name: /login/i });
    expect(loginLink).not.toBeInTheDocument();

    // Simula um clique no botão de sair e verifica se a função foi chamada
    fireEvent.click(logoutButton);
    expect(signOutMock).toHaveBeenCalledTimes(1);
  });

  // Teste 3: Verifica a presença de links de navegação principais
  test('deve renderizar os links de navegação principais', () => {
    renderHeader({ user: null });

    expect(screen.getByRole('link', { name: /zilion force/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /incubadora/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /quem somos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contato/i })).toBeInTheDocument();
  });
});
