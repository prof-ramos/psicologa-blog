# 📝 CMS "Psicóloga em Outra Dimensão"

CMS customizado construído para gerenciar o blog de astrologia com design neobrutralista.

## 🎯 Funcionalidades

- ✅ **CRUD Completo de Posts** - Criar, editar, deletar publicações
- ✅ **Editor Rich Text** - TipTap editor com toolbar completa
- ✅ **Preview em Tempo Real** - Visualização lado-a-lado do conteúdo
- ✅ **Upload de Imagens** - Vercel Blob Storage integrado
- ✅ **Sistema de Drafts** - Salvar rascunhos antes de publicar
- ✅ **Metadados Completos** - Tags, categorias, signo, nível de humor, etc.
- ✅ **Autenticação Simples** - Login via .env (sem banco de usuários)
- ✅ **Filtros e Busca** - Encontre posts rapidamente
- ✅ **Design Brutal** - Interface consistente com o design do site

## 🚀 Configuração do CMS

### 1. Configurar Variáveis de Ambiente

Copie o `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Configure as seguintes variáveis:

#### **Vercel Postgres** (Obrigatório)

1. Acesse o [Vercel Dashboard](https://vercel.com/dashboard)
2. Vá em **Storage** > **Create Database** > **Postgres**
3. Copie as variáveis do tab **.env.local** e cole no seu `.env.local`

```env
POSTGRES_URL="..."
POSTGRES_PRISMA_URL="..."
POSTGRES_URL_NON_POOLING="..."
POSTGRES_USER="..."
POSTGRES_HOST="..."
POSTGRES_PASSWORD="..."
POSTGRES_DATABASE="..."
```

#### **Vercel Blob Storage** (Obrigatório)

1. No Vercel Dashboard, vá em **Storage** > **Create Store** > **Blob**
2. Copie o token e adicione ao `.env.local`:

```env
BLOB_READ_WRITE_TOKEN="vercel_blob_..."
```

#### **Credenciais de Admin** (Obrigatório)

Configure email e senha do administrador:

```env
ADMIN_EMAIL="seu-email@example.com"
ADMIN_PASSWORD="sua-senha-segura"
```

#### **Session Secret** (Obrigatório)

Gere um secret aleatório:

```bash
openssl rand -base64 32
```

Adicione ao `.env.local`:

```env
SESSION_SECRET="seu-secret-aqui"
```

### 2. Configurar Banco de Dados

Execute as migrations do Prisma:

```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrations
npx prisma migrate dev --name init

# (Opcional) Abrir Prisma Studio para visualizar dados
npx prisma studio
```

### 3. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

O site estará disponível em: http://localhost:3000
O CMS estará disponível em: http://localhost:3000/admin/login

## 🔐 Acessar o CMS

1. Acesse `/admin/login`
2. Entre com as credenciais configuradas no `.env.local`:
   - Email: valor de `ADMIN_EMAIL`
   - Senha: valor de `ADMIN_PASSWORD`

## 📚 Usando o CMS

### Criar um Novo Post

1. Faça login no CMS (`/admin/login`)
2. Clique em **"Novo Post"**
3. Preencha as informações básicas:
   - **Título** - Nome do post
   - **Slug** - URL amigável (ex: `roast-cosmico-signos`)
   - **Descrição** - Resumo do post
   - **Imagem de Capa** (opcional) - URL da imagem

4. Escreva o conteúdo usando o **Rich Text Editor**:
   - Use a toolbar para formatar texto
   - Adicione imagens, links, listas, citações, etc.
   - Clique em **"Mostrar Preview"** para ver como ficará

5. Preencha os metadados:
   - Categoria
   - Tags
   - Signo do zodíaco
   - Dificuldade
   - Nível de humor
   - Tempo de leitura

6. Escolha uma ação:
   - **Salvar Rascunho** - Salva sem publicar
   - **Publicar** - Publica imediatamente no blog

### Editar um Post

1. No dashboard, encontre o post
2. Clique em **"Editar"**
3. Faça as alterações necessárias
4. Clique em **"Salvar Rascunho"** ou **"Publicar"**

### Deletar um Post

1. No dashboard, encontre o post
2. Clique em **"Deletar"**
3. Confirme a exclusão

### Fazer Upload de Imagem

**Método 1: Via Botão de Upload**

1. No editor de posts, clique em **"Upload de Imagem"**
2. Selecione uma imagem (JPG, PNG, GIF, WebP - máx 5MB)
3. A URL será gerada automaticamente
4. Copie a URL e use no editor ou como imagem de capa

**Método 2: Via Toolbar do Editor**

1. Clique no ícone de imagem na toolbar
2. Cole a URL da imagem
3. A imagem será inserida no conteúdo

### Filtrar e Buscar Posts

- Use a **barra de busca** para encontrar por título/descrição
- Use o **filtro** para ver:
  - **Todos** os posts
  - Apenas **Publicados**
  - Apenas **Rascunhos**

## 🏗️ Estrutura do Banco de Dados

### Tabela `Post`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | String (CUID) | ID único do post |
| `slug` | String (único) | URL amigável |
| `title` | String | Título do post |
| `description` | String | Descrição/resumo |
| `content` | Text | Conteúdo HTML do post |
| `pubDate` | DateTime | Data de publicação |
| `updatedDate` | DateTime | Última atualização |
| `author` | String | Nome do autor |
| `category` | String? | Categoria do post |
| `tags` | String[] | Array de tags |
| `featured` | Boolean | Post em destaque? |
| `zodiacSign` | String? | Signo relacionado |
| `difficulty` | String? | beginner/intermediate/advanced |
| `humorLevel` | String? | none/subtle/moderate/savage |
| `targetAudience` | String? | Público-alvo |
| `readingTime` | Int? | Tempo de leitura em minutos |
| `published` | Boolean | Publicado ou rascunho |
| `coverImage` | String? | URL da imagem de capa |

## 📡 API Endpoints

### Autenticação

- `POST /api/auth/login` - Fazer login
- `POST /api/auth/logout` - Fazer logout
- `GET /api/auth/session` - Verificar sessão

### Posts (Requer Autenticação)

- `GET /api/admin/posts` - Listar todos os posts
- `POST /api/admin/posts` - Criar novo post
- `GET /api/admin/posts/[id]` - Obter post específico
- `PATCH /api/admin/posts/[id]` - Atualizar post
- `DELETE /api/admin/posts/[id]` - Deletar post

### Upload (Requer Autenticação)

- `POST /api/admin/upload` - Upload de imagem para Vercel Blob

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar produção
npm start

# Prisma Studio (visualizar dados)
npx prisma studio

# Resetar banco de dados
npx prisma migrate reset

# Criar nova migration
npx prisma migrate dev --name nome-da-migration
```

## 🚢 Deploy na Vercel

### 1. Push para GitHub

```bash
git add .
git commit -m "Add CMS"
git push
```

### 2. Importar no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Import Project"**
3. Selecione seu repositório
4. Configure as **Environment Variables** (copie do `.env.local`)
5. Deploy!

### 3. Configurar Storages no Vercel

1. No dashboard do projeto, vá em **Storage**
2. Conecte o **Vercel Postgres** já criado
3. Conecte o **Vercel Blob** já criado
4. As variáveis serão adicionadas automaticamente

### 4. Executar Migrations na Produção

```bash
# Via Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
```

## 🛡️ Segurança

- ✅ Autenticação protege rotas `/admin/*` e `/api/admin/*`
- ✅ Middleware valida sessão em todas as requisições protegidas
- ✅ Credenciais armazenadas em variáveis de ambiente
- ✅ Session cookies com `httpOnly`, `secure`, `sameSite`
- ✅ Upload de imagens validado (tipo e tamanho)
- ✅ SQL injection prevenido (Prisma ORM)

## 📝 Notas

- O CMS usa **iron-session** para gerenciar sessões
- Imagens são armazenadas no **Vercel Blob** (não no repositório)
- Posts são salvos como **HTML** no banco de dados
- O preview renderiza o HTML em tempo real
- Blog público mostra apenas posts com `published: true`

## 🆘 Troubleshooting

### Erro: "Can't reach database server"

- Verifique se as variáveis `POSTGRES_*` estão corretas no `.env.local`
- Teste a conexão: `npx prisma db pull`

### Erro: "Unauthorized" ao acessar admin

- Verifique se você fez login em `/admin/login`
- Verifique se `ADMIN_EMAIL` e `ADMIN_PASSWORD` estão corretos

### Erro ao fazer upload de imagem

- Verifique se `BLOB_READ_WRITE_TOKEN` está configurado
- Verifique o tamanho da imagem (máx 5MB)
- Verifique o tipo (JPG, PNG, GIF, WebP)

### Posts não aparecem no blog

- Verifique se o post está com `published: true`
- Verifique se o slug está correto
- Limpe o cache do Next.js: `rm -rf .next`

## 🎨 Personalização

### Adicionar Nova Categoria

Edite `components/admin/PostEditorForm.tsx` linha ~285:

```tsx
<option value="nova-categoria">Nova Categoria</option>
```

### Adicionar Novo Campo

1. Atualize `prisma/schema.prisma`
2. Execute `npx prisma migrate dev --name add-campo`
3. Atualize o formulário em `PostEditorForm.tsx`
4. Atualize a API em `app/api/admin/posts/route.ts`

### Customizar Editor

Edite `components/admin/RichTextEditor.tsx` para adicionar/remover botões da toolbar.

## 📄 Licença

Este projeto é parte do blog "Psicóloga em Outra Dimensão".
