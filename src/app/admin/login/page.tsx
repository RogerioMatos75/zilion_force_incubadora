'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, getMultiFactorResolver, TotpMultiFactorGenerator } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientApp';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Estados para o fluxo de MFA
  const [showMfaInput, setShowMfaInput] = useState(false);
  const [mfaResolver, setMfaResolver] = useState<any>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: any) {
      if (err.code === 'auth/multi-factor-required') {
        const resolver = getMultiFactorResolver(auth, err);
        setMfaResolver(resolver);
        setShowMfaInput(true);
      } else {
        // Mapeia outros erros
        switch (err.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            setError('E-mail ou senha inválidos.');
            break;
          default:
            setError('Ocorreu um erro ao fazer login. Tente novamente.');
            break;
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleMfaSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!mfaResolver) {
      setError("Sessão de autenticação inválida. Tente novamente.");
      setLoading(false);
      return;
    }

    try {
      const multiFactorAssertion = TotpMultiFactorGenerator.assertionForSignIn(
        mfaResolver.hints[0].uid,
        otp
      );
      await mfaResolver.resolveSignIn(multiFactorAssertion);
      router.push('/admin');
    } catch (err: any) {
      console.error(err);
      setError('Código de verificação inválido. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {showMfaInput ? 'Verificação de Dois Fatores' : 'Acesso ao Painel Archon'}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!showMfaInput ? (
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Formulário de E-mail/Senha */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Endereço de E-mail</label>
                <input id="email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-700">Senha</label>
                <input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                {loading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleMfaSignIn} className="space-y-6">
              {/* Formulário de Código MFA */}
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Código do seu app autenticador</label>
                <input id="otp" name="otp" type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                {loading ? 'Verificando...' : 'Verificar Código'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
