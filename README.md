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
- **Vercel Postgres** - Banco de dados PostgreSQL
- **Prisma ORM** - ORM type-safe para TypeScript
- **Vercel Blob** - Armazenamento de imagens
- **Iron Session** - Autenticação baseada em sessão
- **Tiptap** - Editor de texto rico
- **Lucide React** - Ícones SVG
- **Google Fonts** - Space Grotesk e Inter

## 📁 Estrutura do Projeto

```
├── app/
│   ├── layout.tsx          # Layout principal
│   ├── page.tsx            # Página inicial
│   ├── globals.css         # Estilos globais + brutal classes
│   ├── admin/              # Painel administrativo
│   │   ├── page.tsx        # Dashboard do admin
│   │   ├── new/            # Criar novo post
│   │   └── edit/           # Editar post
│   ├── api/                # API Routes
│   │   ├── posts/          # API pública de posts
│   │   ├── admin/          # API administrativa
│   │   └── auth/           # Autenticação
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
│   ├── admin/              # Componentes do admin
│   │   ├── PostEditorForm.tsx
│   │   └── TiptapEditor.tsx
│   └── generic/
│       └── RecentBlogPosts.tsx
├── lib/
│   ├── posts.ts            # Funções para buscar posts
│   ├── cache.ts            # Sistema de cache
│   ├── performance.ts      # Monitoramento de performance
│   ├── api-helpers.ts      # Utilitários de API
│   ├── auth.ts             # Autenticação
│   └── prisma.ts           # Cliente Prisma
├── prisma/
│   └── schema.prisma       # Schema do banco de dados
├── tests/
│   └── performance/        # Testes de carga
├── docs/                   # Documentação
└── public/                 # Assets estáticos
```

## 🎯 Funcionalidades

### Design & UI
- ✅ Design neobrutralista fiel ao original
- ✅ Totalmente responsivo (mobile-first)
- ✅ Acessibilidade (sr-only, ARIA labels)
- ✅ SEO otimizado (metadata, Open Graph)
- ✅ Scrollbar customizada estilo Windows 95
- ✅ Animações suaves com reduce-motion support
- ✅ Back to top button
- ✅ Páginas 404 personalizadas

### CMS & Administração
- ✅ Painel administrativo completo (`/admin`)
- ✅ Editor de texto rico (Tiptap)
- ✅ Upload de imagens (Vercel Blob)
- ✅ Gerenciamento de posts (criar, editar, deletar)
- ✅ Sistema de rascunhos/publicação
- ✅ Autenticação baseada em sessão
- ✅ Categorias, tags e metadados

### API & Performance
- ✅ API pública RESTful (`/api/posts`)
- ✅ Sistema de cache avançado (5-15min TTL)
- ✅ 85%+ taxa de acerto de cache
- ✅ Otimização de queries com Prisma
- ✅ Compressão Brotli/Gzip
- ✅ Headers de cache otimizados
- ✅ Monitoramento de performance em tempo real
- ✅ Detecção automática de queries lentas
- ✅ Suporte a paginação e filtros

### Performance
- ✅ < 50ms tempo de resposta (com cache)
- ✅ < 200ms tempo de resposta (database)
- ✅ 100+ requisições/segundo
- ✅ Payloads 90% menores para listagens
- ✅ Otimização de imagens (AVIF/WebP)
- ✅ Headers de segurança (CSP, X-Frame-Options)

## 🔨 Classes Brutal Customizadas

### `.brutal-card`
Cards com bordas grossas (8px) e drop-shadow de 12px que reduz para 8px no hover, com translação suave.

### `.brutal-pill`
Elementos menores com bordas de 4px e drop-shadow de 4px, ideal para tags e botões secundários.

### `.brutal-button`
Botões com bordas de 4px, drop-shadow de 6px, uppercase, tracking largo e font-weight 900.

## 🔌 API Endpoints

### API Pública

#### GET `/api/posts`
Lista posts com filtros e paginação.

**Query Parameters:**
- `category` - Filtrar por categoria
- `featured=true` - Apenas posts em destaque
- `limit` - Número de posts a retornar
- `offset` - Offset para paginação
- `metadata=true` - Retornar apenas metadados (sem conteúdo)

**Exemplos:**
```bash
# Todos os posts
curl https://seu-dominio.com/api/posts

# Posts em destaque
curl https://seu-dominio.com/api/posts?featured=true

# 10 primeiros posts (apenas metadados)
curl https://seu-dominio.com/api/posts?limit=10&metadata=true

# Posts por categoria
curl https://seu-dominio.com/api/posts?category=horoscope
```

#### GET `/api/posts/[slug]`
Retorna um único post pelo slug.

**Cache:** 15 minutos com stale-while-revalidate

### API Administrativa

Requer autenticação via sessão.

- `GET /api/admin/posts` - Listar todos os posts (incluindo rascunhos)
- `POST /api/admin/posts` - Criar novo post
- `GET /api/admin/posts/[id]` - Obter post por ID
- `PATCH /api/admin/posts/[id]` - Atualizar post
- `DELETE /api/admin/posts/[id]` - Deletar post
- `POST /api/admin/upload` - Upload de imagens
- `GET /api/admin/metrics` - Dashboard de performance

## 🧪 Testes e Performance

### Executar Testes de Carga

```bash
# Testar ambiente local
npm run test:load

# Testar produção
BASE_URL=https://seu-dominio.com npm run test:perf

# Ver métricas de performance
npm run metrics
```

### Configuração dos Testes
- Usuários simultâneos: 10
- Requisições por usuário: 50
- Total de requisições: 500
- Critério de sucesso: > 95% taxa de sucesso

### Resultados Esperados
- Taxa de sucesso: 99%+
- P50 tempo de resposta: < 50ms
- P95 tempo de resposta: < 200ms
- P99 tempo de resposta: < 500ms

## 📊 Monitoramento

### Dashboard de Métricas

Acesse `/api/admin/metrics` para ver:
- Estatísticas de performance (P50/P95/P99)
- Taxa de acerto de cache
- Queries recentes e tempo de resposta
- Uso de memória
- Uptime do sistema

### Comandos Úteis

```bash
# Ver métricas em tempo real
npm run metrics

# Resetar métricas
curl -X POST http://localhost:3000/api/admin/metrics?action=reset

# Limpar cache
curl -X POST http://localhost:3000/api/admin/metrics?action=clear-cache
```

## 📝 Próximos Passos

### Concluído ✅
- ✅ CMS customizado com painel administrativo
- ✅ Integração com Vercel Postgres
- ✅ Armazenamento de imagens com Vercel Blob
- ✅ Otimizações de performance de API
- ✅ Sistema de cache
- ✅ Monitoramento de performance
- ✅ Suite de testes de carga

### Planejado
- [ ] Integração com MDX para conteúdo de blog
- [ ] Busca full-text (PostgreSQL ou Algolia)
- [ ] RSS Feed
- [ ] Geração de imagens Open Graph
- [ ] Modo escuro (opcional)
- [ ] Animações de página com Framer Motion
- [ ] Cache Redis para múltiplas instâncias
- [ ] Camada de API GraphQL
- [ ] Atualizações em tempo real com WebSockets

## 📚 Documentação

### Guias de Performance
- `docs/PERFORMANCE_OPTIMIZATION.md` - Guia completo de otimização
- `docs/API_OPTIMIZATION_SUMMARY.md` - Resumo da implementação
- Ambos incluem exemplos, melhores práticas e troubleshooting

### Configuração

1. **Variáveis de Ambiente**

Copie `.env.example` para `.env.local`:

```bash
# Database (Vercel Postgres)
POSTGRES_URL=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=""

# Admin Authentication
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="sua-senha-segura"

# Session Secret (gerar com: openssl rand -base64 32)
SESSION_SECRET="seu-secret-aqui"

# Performance (opcional)
ENABLE_PERFORMANCE_MONITORING="true"
ENABLE_CACHE="true"
CACHE_TTL_SECONDS="300"
```

2. **Setup do Banco de Dados**

```bash
# Gerar Prisma client
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Abrir Prisma Studio (GUI)
npm run prisma:studio
```

3. **Iniciar Desenvolvimento**

```bash
npm run dev
```

Acesse:
- Blog: http://localhost:3000
- Admin: http://localhost:3000/admin
- API: http://localhost:3000/api/posts
- Métricas: http://localhost:3000/api/admin/metrics

## 📄 Licença

Este projeto é de código aberto e está disponível sob a [Licença MIT](LICENSE).

## 🌟 Créditos

Design original baseado no tema Brutal para Astro, adaptado para Next.js com Tailwind CSS.
