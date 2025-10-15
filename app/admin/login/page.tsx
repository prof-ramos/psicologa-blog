'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Erro ao fazer login');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Erro ao conectar com o servidor');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="brutal-card bg-white p-8 rotate-[-2deg] hover:rotate-0 transition-transform">
          <h1 className="text-4xl font-black mb-2 heading-font text-center">
            CMS Admin
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Psicóloga em Outra Dimensão
          </p>

          {error && (
            <div className="bg-red-100 border-4 border-red-500 p-4 mb-6 text-red-800 font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border-4 border-black p-3 pl-12 text-lg focus:outline-none focus:ring-4 focus:ring-accent"
                  placeholder="admin@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-bold mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border-4 border-black p-3 pl-12 text-lg focus:outline-none focus:ring-4 focus:ring-accent"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="brutal-button bg-accent text-black w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-white font-bold hover:text-secondary transition-colors underline"
          >
            ← Voltar para o site
          </Link>
        </div>
      </div>
    </main>
  );
}
