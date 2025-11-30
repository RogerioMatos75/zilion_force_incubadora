'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/clientApp';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha na verificação do servidor.');
      }

      if (result.redirectTo) {
        router.push(result.redirectTo);
      } else {
        router.push('/dashboard');
      }

    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('E-mail ou senha inválidos.');
      } else {
        setError(err.message || 'Ocorreu um erro ao tentar fazer login.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-80 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-black/50 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl max-w-md w-full"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            <span className="text-white">Zilion</span>
            <span className="text-zilion-gold-500">Force</span>
          </h1>
          <p className="text-gray-400 text-sm uppercase tracking-widest">Acesso do Criador</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-zilion-gold-500 uppercase tracking-wider mb-2">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all duration-300"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-zilion-gold-500 uppercase tracking-wider mb-2">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none focus:border-zilion-gold-500 focus:ring-1 focus:ring-zilion-gold-500 transition-all duration-300"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-sm text-red-400 text-center bg-red-900/20 p-3 rounded border border-red-900/50"
            >
              {error}
            </motion.div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-4 bg-zilion-gold-500 text-black font-bold text-sm uppercase tracking-widest rounded hover:bg-zilion-gold-400 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? 'Autenticando...' : 'Entrar na Plataforma'}
            </button>
          </div>
        </form>
        
        <div className="text-center mt-8 pt-6 border-t border-white/10">
          <p className="text-sm text-gray-400">
            Ainda não faz parte?{' '}
            <Link href="/submeter" className="font-bold text-white hover:text-zilion-gold-500 transition-colors">
              Submeta seu projeto
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default LoginPage;
