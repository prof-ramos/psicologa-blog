# 🔌 Documentação da API

Documentação completa da API REST do blog.

## 📚 Documentos Disponíveis

### [API_OPTIMIZATION_SUMMARY.md](API_OPTIMIZATION_SUMMARY.md) - Resumo das Otimizações
**Conteúdo:**
- Endpoints implementados
- Otimizações de performance
- Exemplos de uso
- Resultados e benchmarks
- Guia de deployment

**Ideal para:** Desenvolvedores que querem entender a API e suas otimizações

---

## 🌐 API Pública

### Endpoints Disponíveis

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

# Paginação
curl https://seu-dominio.com/api/posts?limit=10&offset=20
```

**Response:**
```json
[
  {
    "slug": "aries-2024",
    "data": {
      "title": "Áries em 2024",
      "description": "Previsões para Áries...",
      "pubDate": "2024-01-01T00:00:00.000Z",
      "category": "horoscope",
      "tags": ["aries", "2024"],
      "featured": true,
      "readingTime": 5,
      "coverImage": "https://..."
    }
  }
]
```

**Cache:** 5 minutos com stale-while-revalidate de 30 segundos

---

#### GET `/api/posts/[slug]`
Retorna um único post pelo slug.

**Exemplo:**
```bash
curl https://seu-dominio.com/api/posts/aries-2024
```

**Response:**
```json
{
  "slug": "aries-2024",
  "data": {
    "title": "Áries em 2024",
    "description": "Previsões completas...",
    "content": "## Conteúdo completo do post...",
    "pubDate": "2024-01-01T00:00:00.000Z",
    "category": "horoscope",
    "tags": ["aries", "2024"],
    "featured": true,
    "zodiacSign": "Áries",
    "difficulty": "beginner",
    "humorLevel": "moderate",
    "readingTime": 5,
    "coverImage": "https://..."
  }
}
```

**Cache:** 15 minutos com stale-while-revalidate de 30 segundos

---

## 🔐 API Administrativa

**Requer autenticação via sessão.**

### Autenticação

#### POST `/api/auth/login`
Fazer login no sistema.

**Body:**
```json
{
  "email": "admin@example.com",
  "password": "sua-senha"
}
```

**Response:**
```json
{
  "success": true,
  "email": "admin@example.com"
}
```

#### POST `/api/auth/logout`
Fazer logout.

#### GET `/api/auth/session`
Verificar sessão ativa.

---

### Gerenciamento de Posts

#### GET `/api/admin/posts`
Listar todos os posts (incluindo rascunhos).

**Query Parameters:**
- `published=true|false` - Filtrar por status
- `category` - Filtrar por categoria
- `search` - Buscar em título/descrição

#### POST `/api/admin/posts`
Criar novo post.

**Body:**
```json
{
  "slug": "novo-post",
  "title": "Novo Post",
  "description": "Descrição",
  "content": "Conteúdo completo",
  "category": "horoscope",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "published": false
}
```

#### GET `/api/admin/posts/[id]`
Obter post específico por ID.

#### PATCH `/api/admin/posts/[id]`
Atualizar post existente.

**Body:** Mesma estrutura do POST (campos opcionais)

#### DELETE `/api/admin/posts/[id]`
Deletar post.

---

### Upload de Imagens

#### POST `/api/admin/upload`
Fazer upload de imagem para Vercel Blob.

**Content-Type:** `multipart/form-data`

**Body:**
- `file` - Arquivo de imagem (JPG, PNG, GIF, WebP)

**Response:**
```json
{
  "url": "https://blob.vercel-storage.com/...",
  "filename": "1234567890-abc123.jpg",
  "size": 123456,
  "type": "image/jpeg"
}
```

**Limites:**
- Tamanho máximo: 5MB
- Formatos aceitos: JPG, PNG, GIF, WebP

---

### Monitoramento

#### GET `/api/admin/metrics`
Dashboard de métricas de performance.

**Response:**
```json
{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "performance": {
    "summary": {
      "totalRequests": 1000,
      "avgResponseTime": "45.23ms",
      "p50ResponseTime": "38.12ms",
      "p95ResponseTime": "120.45ms",
      "p99ResponseTime": "250.67ms",
      "errorRate": "0.50%"
    },
    "recentRequests": [...]
  },
  "cache": {
    "stats": {
      "hits": 850,
      "misses": 150,
      "hitRate": "85.00%"
    }
  },
  "system": {
    "memory": {
      "used": "125.45 MB",
      "total": "256.00 MB"
    }
  }
}
```

#### POST `/api/admin/metrics?action=reset`
Resetar métricas de performance.

#### POST `/api/admin/metrics?action=clear-cache`
Limpar cache do sistema.

---

## 📊 Performance

### Response Headers

Todas as respostas da API incluem:

```
Cache-Control: public, max-age=300, stale-while-revalidate=30
ETag: "abc123"
X-Response-Time: 45ms
Content-Type: application/json
```

### Cache Strategy

- **API Pública:** Cache agressivo (5-15 minutos)
- **API Admin:** Sem cache (sempre atualizado)
- **Invalidação:** Automática em create/update/delete

### Performance Metrics

| Endpoint | P50 | P95 | P99 | Cache Hit Rate |
|----------|-----|-----|-----|----------------|
| GET /api/posts | 40ms | 120ms | 250ms | 85%+ |
| GET /api/posts/[slug] | 30ms | 100ms | 200ms | 90%+ |
| POST /api/admin/posts | 200ms | 400ms | 600ms | N/A |

---

## 🔒 Segurança

### Autenticação
- Session-based com Iron Session
- HTTPS obrigatório em produção
- Cookie seguro (httpOnly, secure, sameSite)

### Rate Limiting
- 100 requisições por minuto (padrão)
- Headers de rate limit incluídos
- Bloqueio temporário após exceder limite

### CORS
- Habilitado para API pública
- Configurado em `vercel.json`

### Headers de Segurança
```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 💡 Exemplos de Uso

### JavaScript/Fetch

```javascript
// Buscar posts
const response = await fetch('/api/posts?featured=true');
const posts = await response.json();

// Buscar post específico
const post = await fetch('/api/posts/aries-2024');
const data = await post.json();

// Login
const login = await fetch('/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@example.com',
    password: 'senha'
  })
});
```

### cURL

```bash
# Listar posts
curl https://seu-dominio.com/api/posts

# Post específico
curl https://seu-dominio.com/api/posts/aries-2024

# Login
curl -X POST https://seu-dominio.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"senha"}'

# Upload de imagem (requer sessão)
curl -X POST https://seu-dominio.com/api/admin/upload \
  -F "file=@imagem.jpg" \
  -b "cookies.txt"
```

### TypeScript

```typescript
interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    content?: string;
    pubDate?: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
  };
}

async function fetchPosts(): Promise<BlogPost[]> {
  const response = await fetch('/api/posts?metadata=true');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

async function fetchPost(slug: string): Promise<BlogPost> {
  const response = await fetch(`/api/posts/${slug}`);
  if (!response.ok) throw new Error('Post not found');
  return response.json();
}
```

---

## 🧪 Testes

### Testar Localmente

```bash
# Iniciar servidor
npm run dev

# Testar endpoint
curl http://localhost:3000/api/posts

# Ver métricas
curl http://localhost:3000/api/admin/metrics | json_pp
```

### Load Testing

```bash
# Teste de carga local
npm run test:load

# Teste em produção
BASE_URL=https://seu-dominio.com npm run test:perf
```

---

## 📚 Documentação Relacionada

- **[Otimizações de Performance](../performance/PERFORMANCE_OPTIMIZATION.md)** - Detalhes técnicos
- **[API_OPTIMIZATION_SUMMARY.md](API_OPTIMIZATION_SUMMARY.md)** - Resumo completo
- **[CLAUDE.md](../../CLAUDE.md)** - Arquitetura da API

---

## 🆘 Troubleshooting

### API retorna 401 Unauthorized
- Verifique se está autenticado (`/api/auth/login`)
- Cookies podem ter expirado
- Headers de sessão não estão sendo enviados

### Response muito lenta
- Verifique métricas em `/api/admin/metrics`
- Cache pode estar frio (primeira requisição)
- Banco de dados pode estar lento

### Erro 429 (Too Many Requests)
- Rate limit excedido
- Aguarde 1 minuto
- Verifique header `Retry-After`

---

[← Voltar para Documentação](../README.md)
