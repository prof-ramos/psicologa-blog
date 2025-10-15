# 🚀 Setup do Projeto - Psicóloga em Outra Dimensão

Documentação completa para configurar e executar o blog com CMS customizado.

## ✅ Status da Implementação

### Backend & Database
- [x] Prisma ORM configurado
- [x] Schema do banco de dados criado (Post model)
- [x] Prisma Client gerado
- [x] Singleton do Prisma criado
- [x] Variáveis de ambiente configuradas (.env.local)
- [ ] **Vercel Postgres criado e conectado** ⚠️ PENDENTE
- [ ] **Migrations executadas no banco** ⚠️ PENDENTE

### Autenticação
- [x] iron-session configurado
- [x] Middleware de autenticação criado
- [x] Credenciais via .env (ADMIN_EMAIL, ADMIN_PASSWORD)
- [x] Session secret gerado
- [x] Rotas protegidas (/admin/*, /api/admin/*)

### APIs
- [x] POST /api/auth/login - Login
- [x] POST /api/auth/logout - Logout
- [x] GET /api/auth/session - Verificar sessão
- [x] GET /api/admin/posts - Listar posts
- [x] POST /api/admin/posts - Criar post
- [x] GET /api/admin/posts/[id] - Obter post
- [x] PATCH /api/admin/posts/[id] - Atualizar post
- [x] DELETE /api/admin/posts/[id] - Deletar post
- [x] POST /api/admin/upload - Upload de imagens

### Interface Admin
- [x] Página de login (/admin/login)
- [x] Layout do admin com navbar
- [x] Dashboard com lista de posts
- [x] Filtros e busca de posts
- [x] Formulário de criar post (/admin/posts/new)
- [x] Formulário de editar post (/admin/posts/[id]/edit)
- [x] Design brutal consistente

### Editor de Conteúdo
- [x] TipTap Editor integrado
- [x] Toolbar completa (formatação, listas, links, imagens)
- [x] Preview de markdown em tempo real
- [x] Split view (Editor | Preview)
- [x] Componente de upload de imagens
- [x] Validação de formulários com Zod

### Upload de Imagens
- [x] Integração com Vercel Blob
- [x] Validação de tipo e tamanho (máx 5MB)
- [x] Geração de URL automática
- [x] Copiar URL para clipboard
- [ ] **Vercel Blob criado e token configurado** ⚠️ PENDENTE

### Blog Frontend
- [x] lib/posts.ts atualizado para buscar do Postgres
- [x] Página de blog post renderiza HTML do banco
- [x] Interface pública do blog mantida

### Documentação
- [x] CMS_README.md - Guia completo do CMS
- [x] .env.example - Template de variáveis
- [x] SETUP.md - Este documento
- [x] Scripts NPM configurados

### Deploy & CI/CD
- [x] Projeto linkado com Vercel
- [x] Build script com prisma generate
- [x] Scripts de desenvolvimento configurados
- [ ] **Storages da Vercel configurados** ⚠️ PENDENTE
- [ ] **Deploy em produção** ⚠️ PENDENTE

---

## 📋 Pré-requisitos

- [x] Node.js 18+ instalado
- [x] NPM instalado
- [x] Vercel CLI instalado (`npm i -g vercel`)
- [x] Conta Vercel ativa
- [x] Git configurado

---

## 🔧 Instalação (Já Concluída)

### 1. Dependências Instaladas ✅

```bash
# Já executado:
npm install
```

**Pacotes instalados:**
- `@prisma/client` + `prisma` - ORM
- `@vercel/postgres` + `@vercel/blob` - Storages Vercel
- `@tiptap/*` - Editor rich text
- `react-markdown` - Preview
- `iron-session` - Autenticação
- `zod` - Validação

### 2. Projeto Linkado com Vercel ✅

```bash
# Já executado:
vercel link --yes
```

✅ **Status**: Linkado com `gaya-lex/psicologa-blog`

### 3. Variáveis de Ambiente Configuradas ✅

```bash
# Já executado:
vercel env pull .env.local
```

✅ **Arquivo criado**: `.env.local` com valores temporários

### 4. Prisma Client Gerado ✅

```bash
# Já executado:
npx prisma generate
```

✅ **Status**: Prisma Client gerado com sucesso

### 5. Servidor de Desenvolvimento Iniciado ✅

```bash
# Já executado:
npm run dev
```

✅ **Status**: Rodando em http://localhost:3000

---

## ⚠️ AÇÕES PENDENTES (Você precisa fazer)

### 🔴 Passo 1: Criar Vercel Postgres

**IMPORTANTE**: O CMS não funcionará sem isso!

1. Acesse: https://vercel.com/gaya-lex/psicologa-blog/stores

2. Clique em **"Create Database"** > **"Postgres"**

3. Escolha a região mais próxima

4. Aguarde a criação (1-2 minutos)

5. Depois de criado, execute:

```bash
# Baixar as novas variáveis de ambiente
vercel env pull .env.local

# Executar migrations do Prisma
npx prisma migrate dev --name init

# (Opcional) Ver dados no Prisma Studio
npx prisma studio
```

**Verificar se funcionou:**
```bash
# Teste a conexão
npx prisma db pull
```

Se não houver erros, está conectado! ✅

---

### 🔴 Passo 2: Criar Vercel Blob

**IMPORTANTE**: Upload de imagens não funcionará sem isso!

1. No mesmo painel: https://vercel.com/gaya-lex/psicologa-blog/stores

2. Clique em **"Create Store"** > **"Blob"**

3. Nomeie como `psicologa-images` (ou qualquer nome)

4. Depois de criado, execute:

```bash
# Baixar o token do Blob
vercel env pull .env.local
```

**Verificar se funcionou:**

Abra `.env.local` e procure por:
```env
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
```

Se o token começar com `vercel_blob_rw_`, está correto! ✅

---

### 🔴 Passo 3: Reiniciar Servidor

Depois de configurar os storages:

```bash
# Parar o servidor (Ctrl+C)
# Reiniciar
npm run dev
```

---

## 🎯 Acessar o CMS

### URLs

| Página | URL | Status |
|--------|-----|--------|
| **Site Público** | http://localhost:3000 | ✅ Funcionando |
| **Login Admin** | http://localhost:3000/admin/login | ✅ Funcionando |
| **Dashboard CMS** | http://localhost:3000/admin | ✅ Funcionando |
| **Criar Post** | http://localhost:3000/admin/posts/new | ⚠️ Precisa do DB |
| **Blog** | http://localhost:3000/blog | ⚠️ Precisa do DB |

### Credenciais de Login

```
Email: admin@psicologa.com
Senha: admin123
```

**Você pode alterar em `.env.local`:**
```env
ADMIN_EMAIL="seu-email@exemplo.com"
ADMIN_PASSWORD="sua-senha-segura"
```

---

## 🧪 Testar o CMS (Após Configurar Storages)

### 1. Fazer Login
1. Acesse http://localhost:3000/admin/login
2. Entre com as credenciais acima
3. Você será redirecionado para o dashboard

### 2. Criar Primeiro Post
1. No dashboard, clique em **"Novo Post"**
2. Preencha:
   - **Título**: "Meu Primeiro Post"
   - **Slug**: `meu-primeiro-post`
   - **Descrição**: "Testando o CMS"
   - **Conteúdo**: Escreva algo no editor
3. Clique em **"Publicar"**

### 3. Upload de Imagem
1. No editor, clique em **"Upload de Imagem"**
2. Selecione uma imagem (JPG, PNG, GIF, WebP - máx 5MB)
3. Copie a URL gerada
4. Cole no editor usando o botão de imagem da toolbar

### 4. Ver Post Publicado
1. No dashboard, encontre seu post
2. Clique em **"Ver"**
3. O post abrirá em uma nova aba

---

## 🗄️ Estrutura do Banco de Dados

### Tabela `Post`

```prisma
model Post {
  id             String   @id @default(cuid())
  slug           String   @unique
  title          String
  description    String
  content        String   @db.Text
  pubDate        DateTime @default(now())
  updatedDate    DateTime @updatedAt
  author         String   @default("Psicóloga em Outra Dimensão")
  category       String?
  tags           String[]
  featured       Boolean  @default(false)
  zodiacSign     String?
  difficulty     String?
  humorLevel     String?
  targetAudience String?
  readingTime    Int?
  published      Boolean  @default(false)
  coverImage     String?
}
```

---

## 📝 Scripts NPM Disponíveis

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor (Turbopack)

# Build
npm run build            # Build para produção (inclui prisma generate)

# Produção
npm start                # Iniciar servidor de produção

# Prisma
npm run prisma:generate  # Gerar Prisma Client
npm run prisma:migrate   # Executar migrations
npm run prisma:studio    # Abrir Prisma Studio

# Linting
npm run lint             # Executar ESLint
```

---

## 🚢 Deploy na Vercel (Quando estiver pronto)

### 1. Commit e Push

```bash
git add .
git commit -m "feat: Add CMS with Vercel Postgres and Blob"
git push origin main
```

### 2. Deploy Automático

O Vercel detectará o push e fará o deploy automaticamente!

### 3. Configurar Storages em Produção

1. Acesse o projeto no Vercel Dashboard
2. Vá em **Storage**
3. Conecte os mesmos storages (Postgres e Blob)
4. As variáveis serão adicionadas automaticamente

### 4. Executar Migrations em Produção

```bash
# Pull das variáveis de produção
vercel env pull .env.production --environment=production

# Deploy das migrations
npx prisma migrate deploy
```

---

## 🆘 Problemas Comuns

### ❌ Erro: "Can't reach database server"

**Causa**: Vercel Postgres não configurado ou URL inválida

**Solução**:
1. Crie o Vercel Postgres no dashboard
2. Execute `vercel env pull .env.local`
3. Reinicie o servidor

---

### ❌ Erro ao fazer upload: "Unauthorized"

**Causa**: BLOB_READ_WRITE_TOKEN inválido ou não configurado

**Solução**:
1. Crie o Vercel Blob no dashboard
2. Execute `vercel env pull .env.local`
3. Verifique se o token está em `.env.local`
4. Reinicie o servidor

---

### ❌ Erro: "Unauthorized" ao acessar /admin

**Causa**: Sessão expirada ou credenciais incorretas

**Solução**:
1. Faça login novamente em `/admin/login`
2. Verifique `ADMIN_EMAIL` e `ADMIN_PASSWORD` no `.env.local`
3. Certifique-se de que `SESSION_SECRET` está configurado

---

### ❌ Posts não aparecem no blog

**Causa**: Posts estão como draft (published: false)

**Solução**:
1. No dashboard, edite o post
2. Clique em **"Publicar"** (não "Salvar Rascunho")
3. Verifique se o badge diz "PUBLICADO"

---

## 📚 Documentação Adicional

- **CMS_README.md** - Guia completo do CMS
- **CLAUDE.md** - Documentação do projeto e arquitetura
- **.env.example** - Template de variáveis de ambiente
- **Prisma Docs**: https://pris.ly/d/prisma-schema
- **Vercel Postgres**: https://vercel.com/docs/storage/vercel-postgres
- **Vercel Blob**: https://vercel.com/docs/storage/vercel-blob

---

## 🎉 Resultado Final

Quando tudo estiver configurado, você terá:

✅ Blog público funcionando
✅ CMS admin completo
✅ CRUD de posts
✅ Editor rich text com preview
✅ Upload de imagens
✅ Sistema de drafts/publicação
✅ Autenticação segura
✅ Dashboard com filtros e busca
✅ Design neobrutralista consistente
✅ Deploy automático na Vercel

---

**Autor**: Claude Code
**Data**: 2025-10-15
**Versão**: 1.0.0
