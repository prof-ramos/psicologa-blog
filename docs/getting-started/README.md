# 🚀 Começando

Guias para configurar e começar a usar o projeto rapidamente.

## 📚 Documentos Disponíveis

### [SETUP.md](SETUP.md) - Setup Completo
**Tempo estimado:** 15-20 minutos

Configuração completa do ambiente de desenvolvimento incluindo:
- Pré-requisitos e instalação do Node.js
- Configuração do banco de dados (Vercel Postgres)
- Configuração do Vercel Blob para imagens
- Variáveis de ambiente
- Migrations do Prisma
- Verificação da instalação

**Ideal para:** Primeira instalação do projeto

---

### [QUICK_START.md](QUICK_START.md) - Início Rápido
**Tempo estimado:** 5 minutos

Guia rápido para desenvolvedores experientes:
- Clone e instalação rápida
- Comandos essenciais
- Acesso aos principais recursos
- Troubleshooting comum

**Ideal para:** Desenvolvedores experientes que querem começar rapidamente

---

## 🎯 Escolha o Guia Certo

### Primeira vez no projeto?
→ Comece com **[SETUP.md](SETUP.md)**

### Já conhece Next.js e quer começar rápido?
→ Use **[QUICK_START.md](QUICK_START.md)**

### Já configurou e quer usar o CMS?
→ Vá para **[../guides/CMS_README.md](../guides/CMS_README.md)**

---

## 🔧 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js 18+** instalado
- **npm, yarn, pnpm ou bun** como gerenciador de pacotes
- Conta na **Vercel** (para Postgres e Blob)
- **Git** instalado

---

## ⚡ Comandos Rápidos

```bash
# Clone o repositório
git clone https://github.com/prof-ramos/psicologa-blog.git

# Instale as dependências
npm install

# Configure o ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais

# Execute as migrations
npm run prisma:migrate

# Inicie o servidor
npm run dev
```

Acesse: http://localhost:3000

---

## 📖 Próximos Passos

Depois de configurar o projeto:

1. **[Guia do CMS](../guides/CMS_README.md)** - Aprenda a criar posts
2. **[Documentação da API](../api/)** - Integre com a API
3. **[CLAUDE.md](../../CLAUDE.md)** - Entenda a arquitetura

---

## 🆘 Precisa de Ajuda?

- **Setup não funcionou?** Veja a seção de Troubleshooting em [SETUP.md](SETUP.md)
- **Erros comuns?** Veja [QUICK_START.md](QUICK_START.md#troubleshooting)
- **Dúvidas sobre a arquitetura?** Consulte [CLAUDE.md](../../CLAUDE.md)

---

[← Voltar para Documentação](../README.md)
