# 🚀 Quick Start Guide

## Executar o Projeto

```bash
# Instalar dependências
npm install

# Modo de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📂 Arquivos Principais

### Páginas
- `app/page.tsx` - Homepage com hero section e temas do blog
- `app/blog/page.tsx` - Lista de todos os posts do blog
- `app/blog/[slug]/page.tsx` - Página individual de cada post

### Componentes de Layout
- `components/layout/BaseNavigation.tsx` - Header com navegação
- `components/layout/BaseFooter.tsx` - Footer com informações de contato

### Componentes de Blog
- `components/blog/BlogList.tsx` - Grid de cards de posts
- `components/blog/BlogSummaryCard.tsx` - Card individual de post
- `components/generic/RecentBlogPosts.tsx` - Seção de posts recentes

### Estilos
- `app/globals.css` - Estilos globais e classes brutais customizadas
- `tailwind.config.ts` - Configuração do Tailwind com cores customizadas

### Dados
- `lib/posts.ts` - Funções para buscar posts (atualmente com dados de exemplo)

## 🎨 Classes CSS Customizadas

### Brutal Cards
```tsx
<div className="brutal-card bg-white border-black p-8">
  Conteúdo do card
</div>
```

### Brutal Buttons
```tsx
<button className="brutal-button bg-accent text-black px-6 py-3">
  Clique Aqui
</button>
```

### Brutal Pills
```tsx
<span className="brutal-pill bg-tertiary border-2 border-black px-3 py-1">
  Tag
</span>
```

## 🌈 Cores do Tema

Use as cores do tema com classes Tailwind:

```tsx
<div className="bg-primary">Azul</div>
<div className="bg-secondary">Verde Lima</div>
<div className="bg-accent">Laranja</div>
<div className="bg-tertiary">Rosa</div>
<div className="bg-deep">Roxo</div>
```

## 📝 Adicionar Novo Post

Edite `lib/posts.ts` e adicione um novo objeto no array `samplePosts`:

```typescript
{
  slug: 'seu-post-slug',
  data: {
    title: 'Título do Post',
    description: 'Descrição breve',
    pubDate: '2024-01-15T00:00:00.000Z',
    author: 'Psicóloga em Outra Dimensão',
    category: 'horoscopes',
    tags: ['tag1', 'tag2'],
    featured: false,
    difficulty: 'beginner',
    humorLevel: 'moderate',
    readingTime: 5,
  },
}
```

## 🔧 Customizar Cores

Edite `tailwind.config.ts`:

```typescript
colors: {
  primary: '#4CA6DF',    // Sua cor primária
  secondary: '#BFFF00',  // Sua cor secundária
  // ... outras cores
}
```

## 📱 Componentes Responsivos

Todos os componentes são mobile-first:

```tsx
<div className="text-sm md:text-base lg:text-xl">
  Texto responsivo
</div>
```

## 🎯 Próximos Passos

1. Substituir posts de exemplo por conteúdo real
2. Integrar com MDX ou CMS (Sanity.io, Contentful)
3. Adicionar sistema de busca
4. Implementar filtros por categoria/tag
5. Adicionar RSS feed
6. Deploy na Vercel

## 🐛 Problemas Comuns

### Erro de build
```bash
# Limpar cache e reinstalar
rm -rf .next node_modules
npm install
npm run build
```

### Problemas com Tailwind
```bash
# Verificar se o PostCSS está configurado
cat postcss.config.mjs
```

## 📚 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
