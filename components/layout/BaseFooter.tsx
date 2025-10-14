'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface BaseFooterProps {
  backToTop?: boolean;
}

export function BaseFooter({ backToTop = false }: BaseFooterProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    if (!backToTop) return;

    const toggleBackToTopButton = () => {
      if (window.scrollY > 250) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', toggleBackToTopButton);
    return () => window.removeEventListener('scroll', toggleBackToTopButton);
  }, [backToTop]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {backToTop && (
        <button
          onClick={scrollToTop}
          className={`${
            showBackToTop ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300 z-50 fixed flex bottom-[10px] right-[30px] w-10 h-10 bg-white border border-black card-shadow items-center justify-center`}
          type="button"
          aria-label="Voltar ao topo da página"
        >
          <ArrowUp className="w-6 h-6" aria-hidden="true" />
        </button>
      )}

      <footer className="bg-deep text-white p-8 border-t-8 border-secondary brutal-card">
        <h2 className="sr-only">Footer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="brutal-pill bg-tertiary p-6">
            <h3 className="font-black text-black text-xl mb-3 uppercase">CONTATO</h3>
            <p className="text-black font-semibold">contato@cosmicadimensao.com</p>
            <p className="text-black font-semibold">+55 11 LEÃO-LINDO (53-65-4636)</p>
            <p className="text-black text-sm">*Não atendo virginianos às terças</p>
          </div>

          <div className="brutal-pill bg-accent p-6">
            <h3 className="font-black text-black text-xl mb-3 uppercase">LOCALIZAÇÃO</h3>
            <p className="text-black font-semibold">5ª Dimensão - Via Láctea</p>
            <p className="text-black font-semibold">Consultório Flutuante de Mercúrio</p>
            <p className="text-black text-sm">*Retrógrado disponível sob consulta</p>
          </div>

          <div className="brutal-pill bg-white p-6">
            <h3 className="font-black text-black text-xl mb-3 uppercase">HORÁRIOS CÓSMICOS</h3>
            <p className="text-black font-semibold">Luna Nova: 24h disponível</p>
            <p className="text-black font-semibold">Luna Cheia: Só emergências</p>
            <p className="text-black text-sm">*Não funciono em Mercúrio retrógrado</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="outfit text-white font-bold">
            © 2024 Psicóloga em Outra Dimensão - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </>
  );
}
