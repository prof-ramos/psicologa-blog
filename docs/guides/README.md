# 📖 Guias de Uso

Guias práticos para usar as funcionalidades do projeto.

## 📚 Guias Disponíveis

### [CMS_README.md](CMS_README.md) - Guia do CMS Administrativo
**Tempo estimado:** 10-15 minutos

Aprenda a usar o painel administrativo para gerenciar seu blog:

#### Conteúdo do Guia
- 🔐 Login e autenticação
- ✍️ Criar novos posts
- ✏️ Editar posts existentes
- 🗑️ Deletar posts
- 🖼️ Upload de imagens
- 📝 Usar o editor de texto rico (Tiptap)
- 📊 Gerenciar categorias e tags
- 👁️ Sistema de rascunhos e publicação

**Ideal para:** Criadores de conteúdo e administradores do blog

---

## 🎯 Por Onde Começar?

### Sou administrador do blog
1. **[CMS_README.md](CMS_README.md)** - Guia completo do painel admin
2. Acesse `/admin` no seu navegador
3. Faça login com suas credenciais
4. Comece a criar posts!

### Sou desenvolvedor
1. Veja **[CLAUDE.md](../../CLAUDE.md)** para entender a arquitetura
2. Consulte **[../api/](../api/)** para documentação da API
3. Veja **[../development/](../development/)** para detalhes técnicos

---

## 📋 Recursos do CMS

### Editor de Texto Rico
O CMS usa **Tiptap**, um editor moderno e extensível que suporta:

- ✅ Formatação rica (negrito, itálico, links)
- ✅ Listas (ordenadas e não ordenadas)
- ✅ Blocos de código
- ✅ Imagens inline
- ✅ Markdown shortcuts

### Gerenciamento de Imagens
- Upload direto para **Vercel Blob**
- Suporte para JPG, PNG, GIF, WebP
- Limite de 5MB por imagem
- URLs permanentes e CDN integrado

### Sistema de Posts
- Rascunhos e posts publicados
- Categorias customizadas
- Tags ilimitadas
- Metadados (dificuldade, nível de humor, etc.)
- Slugs personalizáveis
- Datas de publicação

---

## 🔑 Acesso ao Admin

### URLs
- **Desenvolvimento:** http://localhost:3000/admin
- **Produção:** https://seu-dominio.com/admin

### Credenciais
Definidas nas variáveis de ambiente:
```bash
ADMIN_EMAIL="seu-email@exemplo.com"
ADMIN_PASSWORD="sua-senha-segura"
```

⚠️ **Importante:** Altere as credenciais padrão antes do deploy!

---

## 📱 Interface do Admin

### Dashboard (`/admin`)
- Lista de todos os posts (incluindo rascunhos)
- Filtros por status (publicado/rascunho)
- Busca por título
- Ações rápidas (editar, deletar)
- Botão para criar novo post

### Editor de Posts (`/admin/new` ou `/admin/edit/[id]`)
- Formulário completo de metadados
- Editor de texto rico
- Preview de imagens
- Upload de capa
- Gerenciamento de tags
- Botões salvar rascunho/publicar

---

## 🎨 Campos do Post

### Obrigatórios
- **Título** - Título do post
- **Slug** - URL amigável (gerado automaticamente)
- **Descrição** - Resumo curto (meta description)
- **Conteúdo** - Corpo do post (Markdown/HTML)

### Opcionais
- **Categoria** - ex: horoscope, compatibility
- **Tags** - Lista de palavras-chave
- **Autor** - Nome do autor
- **Signo Zodiacal** - Para posts relacionados
- **Dificuldade** - beginner, intermediate, advanced
- **Nível de Humor** - none, subtle, moderate, savage
- **Público-alvo** - Descrição do público
- **Tempo de leitura** - Minutos (calculado automaticamente)
- **Imagem de capa** - URL da imagem

---

## 💡 Dicas de Uso

### Otimização de Conteúdo
- Use títulos descritivos e SEO-friendly
- Escreva descrições entre 120-160 caracteres
- Adicione sempre uma imagem de capa
- Use tags relevantes (máximo 5-7)
- Mantenha o conteúdo bem formatado

### Workflow Recomendado
1. Crie como rascunho primeiro
2. Adicione conteúdo e imagens
3. Revise metadados e SEO
4. Publique quando pronto
5. Monitore performance nas métricas

### Imagens
- Otimize imagens antes do upload (< 500KB ideal)
- Use nomes descritivos para os arquivos
- Mantenha proporções 16:9 para capas
- Adicione alt text descritivo

---

## 🔒 Segurança

### Autenticação
- Login baseado em sessão (Iron Session)
- Sessões expiram após inatividade
- HTTPS obrigatório em produção
- Headers de segurança configurados

### Permissões
- Acesso admin é único (sem níveis múltiplos)
- API admin protegida por autenticação
- Uploads validados por tipo e tamanho

---

## 🆘 Problemas Comuns

### Não consigo fazer login
1. Verifique variáveis de ambiente (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)
2. Limpe cookies do navegador
3. Verifique se `SESSION_SECRET` está configurado

### Upload de imagem falha
1. Verifique se `BLOB_READ_WRITE_TOKEN` está configurado
2. Confirme que o arquivo é < 5MB
3. Use formatos suportados (JPG, PNG, GIF, WebP)

### Editor não carrega
1. Limpe cache do navegador
2. Verifique console do navegador por erros
3. Tente em modo anônimo

---

## 📚 Recursos Adicionais

### Documentação Relacionada
- **[Documentação da API](../api/)** - Endpoints do admin
- **[CLAUDE.md](../../CLAUDE.md)** - Arquitetura do CMS
- **[Status da Implementação](../development/IMPLEMENTATION_STATUS.md)** - Features do CMS

### Tutoriais Externos
- [Tiptap Editor](https://tiptap.dev/docs) - Documentação do editor
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) - Upload de arquivos
- [Prisma](https://www.prisma.io/docs) - Database ORM

---

## 🤝 Contribuindo

Quer melhorar o CMS?

1. Veja [issues abertas](https://github.com/prof-ramos/psicologa-blog/issues)
2. Leia [CLAUDE.md](../../CLAUDE.md) para padrões de código
3. Faça um fork e envie um PR

---

[← Voltar para Documentação](../README.md)
