'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

type TestResult = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export default function SecurityTestPage() {
  const { user, loading } = useAuth();
  const [testResult, setTestResult] = useState<TestResult>({ status: 'idle', message: '' });
  const [isTesting, setIsTesting] = useState(false);

  const runTest = async () => {
    if (!user) {
      setTestResult({ status: 'error', message: 'Erro: Nenhum usuário está logado para realizar o teste.' });
      return;
    }

    setIsTesting(true);
    setTestResult({ status: 'idle', message: '' });

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/admin/submissions', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const responseData = await response.json().catch(() => ({})); // Pega o JSON ou um objeto vazio se não houver corpo

      if (response.ok) {
        setTestResult({ 
          status: 'success', 
          message: `Status ${response.status} (OK): Acesso Permitido! O middleware validou o token e o papel de admin.` 
        });
      } else {
        setTestResult({ 
          status: 'error', 
          message: `Status ${response.status} (${response.statusText}): Acesso Negado! O middleware bloqueou o acesso como esperado. Mensagem: "${responseData.error || 'Nenhuma'}"` 
        });
      }
    } catch (err: any) {
      setTestResult({ status: 'error', message: `Ocorreu um erro na chamada da API: ${err.message}` });
    } finally {
      setIsTesting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Carregando autenticação...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <main className="w-full max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Página de Teste de Segurança</h1>
        
        {!user ? (
          <p className="text-red-600 bg-red-50 p-4 rounded-md">Por favor, use o menu no topo para fazer login e poder iniciar o teste.</p>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">Logado como: <strong className="font-mono bg-gray-100 p-1 rounded">{user.email}</strong></p>
            <button
              onClick={runTest}
              disabled={isTesting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {isTesting ? 'Testando...' : 'Iniciar Teste de Acesso à API de Admin'}
            </button>
          </div>
        )}

        {testResult.message && (
          <div className={`mt-6 p-4 rounded-md text-sm ${
            testResult.status === 'success' ? 'bg-green-100 border border-green-200 text-green-800' : ''
          } ${
            testResult.status === 'error' ? 'bg-red-100 border border-red-200 text-red-800' : ''
          }`}>
            <h2 className="font-bold text-lg mb-2">Resultado do Teste:</h2>
            <p className="font-mono">{testResult.message}</p>
          </div>
        )}
      </main>
    </div>
  );
}
