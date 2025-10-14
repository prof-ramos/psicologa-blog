'use client';

import { Twitter } from 'lucide-react';

const socialLinks = [
  {
    name: 'Twitter',
    url: 'https://x.com/Gayaliz_',
    icon: Twitter,
  },
];

export function MobileSocials() {
  return (
    <div className="md:hidden mb-4 flex justify-center gap-4">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-pill bg-white border-2 border-black p-3 hover:bg-tertiary transition-colors"
            title={`Visite nosso ${social.name}`}
          >
            <Icon className="w-5 h-5 text-black" aria-hidden="true" />
            <span className="sr-only">Visite nosso {social.name}</span>
          </a>
        );
      })}
    </div>
  );
}
