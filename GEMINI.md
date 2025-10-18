# Visão Geral do Projeto: Psicóloga em Outra Dimensão

Este é um projeto de blog de astrologia com um design **neobrutalista**, construído com Next.js 15, TypeScript e Tailwind CSS. O projeto também inclui uma API Python separada para cálculos de mapa astral.

## Frontend (Next.js)

O frontend é um blog Next.js com um painel de administração para gerenciamento de conteúdo.

### Tecnologias Principais

- **Next.js 15**: Framework React com App Router.
- **TypeScript**: Tipagem estática para o código.
- **Tailwind CSS**: Framework de CSS utility-first.
- **Vercel Postgres**: Banco de dados PostgreSQL.
- **Prisma ORM**: ORM type-safe para interagir com o banco de dados.
- **Iron Session**: Para autenticação baseada em sessão no painel de administração.
- **Tiptap**: Editor de texto rico para a criação de posts.
- **Vercel Blob**: Para armazenamento de imagens.

### Estrutura de Diretórios

- `app/`: Contém os layouts, páginas e rotas da API do Next.js.
  - `app/admin/`: Painel de administração para criar, editar e deletar posts.
  - `app/api/`: Rotas da API para o blog e o painel de administração.
  - `app/blog/`: Páginas públicas do blog.
- `components/`: Componentes React reutilizáveis.
- `lib/`: Funções de utilidade para o backend, como helpers de API, autenticação e acesso ao banco de dados.
- `prisma/`: Contém o schema do banco de dados (`schema.prisma`).
- `tests/`: Testes de carga para a aplicação.

### Comandos

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter de código.
- `npm run prisma:generate`: Gera o cliente Prisma.
- `npm run prisma:migrate`: Executa as migrações do banco de dados.
- `npm run prisma:studio`: Abre a GUI do Prisma para visualizar e editar os dados.
- `npm run test:load`: Executa testes de carga no ambiente local.

## Backend (API de Mapa Astral - Python)

O backend é uma API Python construída com FastAPI que fornece cálculos de mapa astral.

### Tecnologias Principais

- **FastAPI**: Framework web Python para a construção de APIs.
- **GZipMiddleware**: Para compressão de respostas.
- **CORSMiddleware**: Para habilitar Cross-Origin Resource Sharing.
- **SlowAPI**: Para limitação de taxa de requisições.
- **Prometheus FastAPI Instrumentator**: Para expor métricas do Prometheus.

### Estrutura de Diretórios

- `mapa-astral-api/`: Contém o código da API Python.
  - `app/`: Contém o código da aplicação FastAPI.
    - `api/`: Contém as rotas da API.
    - `services/`: Contém a lógica de negócio para os cálculos de mapa astral.
  - `tests/`: Testes para a API.

### Endpoints da API

- `GET /health`: Verifica o status da API.
- `POST /api/v1/mapa-astral`: Calcula o mapa astral.

### Convenções de Desenvolvimento

- O frontend segue as convenções de um projeto Next.js com TypeScript.
- O backend segue as convenções de uma aplicação FastAPI.
- O projeto utiliza `eslint` para linting de código no frontend.
- As migrações do banco de dados são gerenciadas pelo Prisma.
