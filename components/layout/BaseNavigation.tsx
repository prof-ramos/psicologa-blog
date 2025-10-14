'use client';

import Link from 'next/link';
import { Twitter, BookOpen, Settings } from 'lucide-react';

const navigationItems = [
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
];

const socialIcons = [
  {
    name: 'Twitter',
    url: 'https://x.com/Gayaliz_',
    icon: Twitter,
  },
];

interface BaseNavigationProps {
  pageTitle?: string;
}

export function BaseNavigation({ pageTitle }: BaseNavigationProps) {
  return (
    <header className="bg-black border-b-8 border-black flex justify-between p-6 items-center brutal-card">
      {pageTitle && <h1 className="sr-only">{pageTitle}</h1>}

      <Link
        href="/"
        title="Voltar ao Início"
        className="brutal-button bg-deep text-white px-4 py-2"
      >
        <p className="righteous text-lg md:text-3xl font-black">PSICÓLOGA</p>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:inline-block">
        <h2 className="sr-only">Navigation</h2>
        <ul className="flex gap-6 poppins">
          {navigationItems.map((item) => (
            <li key={item.url}>
              <Link
                className="brutal-pill bg-accent text-black font-black text-sm px-4 py-2 hover:bg-tertiary transition-colors uppercase tracking-wider inline-block"
                href={item.url}
                title={`Ir para ${item.name}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
          {socialIcons.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                className="brutal-pill bg-white p-3 hover:bg-tertiary transition-colors inline-flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
                title={`Visite nosso ${item.name}`}
              >
                <item.icon className="w-5 h-5 text-black" aria-hidden="true" />
                <span className="sr-only">Visite nosso {item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden flex gap-2">
        <h2 className="sr-only">Mobile Navigation</h2>
        <ul className="flex gap-2">
          <li>
            <Link
              href="/blog"
              className="brutal-pill bg-accent border-2 text-black font-black px-3 py-1 text-sm flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              BLOG
            </Link>
          </li>
          <li>
            <Link
              href="/admin"
              className="brutal-pill bg-tertiary border-2 text-black font-black px-3 py-1 text-sm flex items-center justify-center"
            >
              <Settings className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">Painel administrativo</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
