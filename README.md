# Psicóloga em Outra Dimensão - Next.js Version

Este é um blog de astrologia com design **neobrutralista** construído com Next.js 15, TypeScript e Tailwind CSS. É uma recriação fiel do design original feito em Astro.

## 🎨 Características do Design

- **Tipografia Impactante**: Fontes Space Grotesk e Inter via Google Fonts
- **Bordas Grossas**: Bordas de 8px em cores contrastantes
- **Sombras Dramáticas**: Efeitos de `drop-shadow` interativos
- **Layouts Assimétricos**: Cards rotacionados que se alinham no hover
- **Cores Vibrantes**: Paleta de cores temática personalizada
- **Scrollbar Windows 95**: Estilo nostálgico com botões SVG customizados

### Paleta de Cores

- **Primary**: `#4CA6DF` (Azul confiável/calmante)
- **Secondary**: `#BFFF00` (Verde esperança/crescimento)
- **Accent**: `#FF6B00` (Laranja energia/motivação)
- **Tertiary**: `#EE99B8` (Rosa empatia/conexão)
- **Deep**: `#5E18EB` (Roxo profundidade/inconsciente)

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Instalar dependências
npm install

# Modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🛠️ Stack Tecnológica

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS 3.4** - Utility-first CSS
- **Lucide React** - Ícones SVG
- **Google Fonts** - Space Grotesk e Inter

## 📁 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   ├── globals.css         # Estilos globais + brutal classes
│   ├── blog/
│   │   ├── page.tsx        # Lista de posts
│   │   └── [slug]/
│   │       └── page.tsx    # Post individual
│   └── not-found.tsx       # Página 404
├── components/
│   ├── layout/
│   │   ├── BaseNavigation.tsx
│   │   └── BaseFooter.tsx
│   ├── home/
│   │   └── MobileSocials.tsx
│   ├── blog/
│   │   ├── BlogList.tsx
│   │   └── BlogSummaryCard.tsx
│   └── generic/
│       └── RecentBlogPosts.tsx
├── lib/
│   └── posts.ts            # Funções para buscar posts
└── public/                 # Assets estáticos
```

## 🎯 Funcionalidades

- ✅ Design neobrutralista fiel ao original
- ✅ Totalmente responsivo (mobile-first)
- ✅ Acessibilidade (sr-only, ARIA labels)
- ✅ SEO otimizado (metadata, Open Graph)
- ✅ Headers de segurança (CSP, X-Frame-Options)
- ✅ Scrollbar customizada estilo Windows 95
- ✅ Animações suaves com reduce-motion support
- ✅ Sistema de blog com categorias e tags
- ✅ Posts com níveis de dificuldade e humor
- ✅ Back to top button
- ✅ Páginas 404 personalizadas

## 🔨 Classes Brutal Customizadas

### `.brutal-card`
Cards com bordas grossas (8px) e drop-shadow de 12px que reduz para 8px no hover, com translação suave.

### `.brutal-pill`
Elementos menores com bordas de 4px e drop-shadow de 4px, ideal para tags e botões secundários.

### `.brutal-button`
Botões com bordas de 4px, drop-shadow de 6px, uppercase, tracking largo e font-weight 900.

## 📝 Próximos Passos

- [ ] Integração com MDX para conteúdo de blog
- [ ] Integração com Sanity.io ou outro CMS
- [ ] Sistema de busca e filtros
- [ ] RSS Feed
- [ ] Open Graph image generation
- [ ] Modo escuro (opcional)
- [ ] Animações de página com Framer Motion

## 📄 Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).

## 🌟 Créditos

Design original baseado no tema Brutal para Astro, adaptado para Next.js com Tailwind CSS.
