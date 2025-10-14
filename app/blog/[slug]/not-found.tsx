import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-primary p-6 min-h-screen flex items-center justify-center">
      <div className="brutal-card bg-white border-black p-8 md:p-12 max-w-2xl text-center">
        <h1 className="text-6xl md:text-8xl font-black mb-6 heading-font">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold mb-4 heading-font">
          Post Não Encontrado
        </h2>
        <p className="text-lg mb-8 text-gray-700">
          Parece que este post se perdeu na 5ª dimensão. Talvez Mercúrio retrógrado tenha algo a
          ver com isso...
        </p>
        <Link
          href="/blog"
          className="brutal-button bg-accent text-black px-8 py-4 hover:bg-secondary transition-colors inline-block"
        >
          Voltar ao Blog
        </Link>
      </div>
    </main>
  );
}
