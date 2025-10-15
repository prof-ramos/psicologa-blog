# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Portuguese-language astrology blog called "Psicóloga em Outra Dimensão" built with Next.js 15, TypeScript, and Tailwind CSS. The design aesthetic is **neobrutalist** with bold borders, dramatic drop shadows, asymmetric layouts, and vibrant colors. This is a recreation of an original Astro design adapted to Next.js.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm lint
```

Development server runs at http://localhost:3000

## Architecture

### Framework & Routing
- **Next.js 15** with App Router (not Pages Router)
- All routes are in the `app/` directory
- File-based routing: `app/blog/[slug]/page.tsx` for dynamic routes
- React Server Components by default

### Styling System
The project uses a custom **Brutal Design System** built on Tailwind CSS:

**Core Brutal Classes** (defined in `app/globals.css`):
- `.brutal-card` - Main card style with 8px borders and 12px drop-shadow
- `.brutal-pill` - Smaller elements with 4px borders and 4px drop-shadow
- `.brutal-button` - Buttons with 4px borders, 6px drop-shadow, uppercase text
- All brutal classes have hover states that reduce shadow and translate position

**Color Palette** (defined in `tailwind.config.ts`):
- `primary` (#4CA6DF) - Blue for trust/calm
- `secondary` (#BFFF00) - Green for hope/growth
- `accent` (#FF6B00) - Orange for energy/motivation
- `tertiary` (#EE99B8) - Pink for empathy/connection
- `deep` (#5E18EB) - Purple for depth/subconscious

**Typography**:
- Headings: Space Grotesk (loaded via Next.js font optimization)
- Body: Inter (loaded via Next.js font optimization)
- Font variables: `--font-space-grotesk` and `--font-inter`
- Tailwind classes: `font-heading` and `font-body`

**Custom Scrollbar**: Windows 95 style with SVG arrow buttons and checkered pattern

### Blog Post System

**Data Structure** (`lib/posts.ts`):
```typescript
interface BlogPost {
  slug: string;
  data: {
    title: string;
    description: string;
    content?: string;
    pubDate?: string;
    updatedDate?: string;
    author?: string;
    category?: string;
    tags?: string[];
    featured?: boolean;
    zodiacSign?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    humorLevel?: 'none' | 'subtle' | 'moderate' | 'savage';
    targetAudience?: string;
    readingTime?: number;
    coverImage?: string;
  };
}

interface PostQueryOptions {
  includeContent?: boolean;  // Exclude content for list views (90% smaller payload)
  limit?: number;            // Pagination support
  offset?: number;           // Pagination offset
}
```

**Current Implementation**: Uses **Vercel Postgres** with Prisma ORM. Posts are stored in PostgreSQL and retrieved via optimized queries with caching:

**Core Functions:**
- `getAllPosts(options?)` - Returns all published posts with optional filtering
- `getPostBySlug(slug)` - Returns single post by slug
- `getFeaturedPosts(limit?)` - Returns featured posts
- `getPostsByCategory(category, limit?)` - Returns posts by category
- `invalidatePostCache(slug?)` - Invalidates cache on content changes

**Performance Features:**
- In-memory caching with TTL (5-15 minutes)
- Selective field loading (exclude content for lists)
- Database indexes for fast queries
- Pagination support
- 85%+ cache hit rate
- < 50ms response time (cached)
- < 200ms response time (database)

### Component Organization

```
components/
├── layout/          # Site-wide layout components
│   ├── BaseNavigation.tsx
│   └── BaseFooter.tsx
├── home/           # Home page specific components
│   └── MobileSocials.tsx
├── blog/           # Blog-related components
│   ├── BlogList.tsx
│   └── BlogSummaryCard.tsx
└── generic/        # Reusable components
    └── RecentBlogPosts.tsx
```

**Component Patterns**:
- Use React Server Components by default (no "use client" directive)
- Only add "use client" when using hooks (useState, useEffect, etc.) or browser APIs
- Components use TypeScript interfaces for props
- Accessibility features: `sr-only` classes, ARIA labels, semantic HTML

### Layout Structure

The root layout (`app/layout.tsx`):
1. Loads Google Fonts (Inter, Space Grotesk) via next/font
2. Sets up font CSS variables
3. Wraps all pages with `<BaseNavigation>` and `<BaseFooter>`
4. Includes comprehensive metadata for SEO and Open Graph

### Database & CMS

**Database**: Vercel Postgres with Prisma ORM

**Schema** (`prisma/schema.prisma`):
- `Post` model with full blog post fields
- Optimized indexes for performance:
  - `@@index([published])`
  - `@@index([slug])`
  - `@@index([pubDate])`
  - `@@index([category])`
  - `@@index([published, pubDate])` - Composite for common queries
  - `@@index([published, featured])` - Composite for featured posts

**Prisma Commands**:
```bash
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio GUI
```

**Custom CMS**: Built-in admin panel at `/admin` with:
- Rich text editor (TiptapEditor)
- Image uploads to Vercel Blob
- Post management (create, edit, delete)
- Draft/publish workflow
- Session-based authentication

### API Architecture

**Public API Endpoints**:
- `GET /api/posts` - List posts with filtering/pagination
  - Query params: `category`, `featured`, `limit`, `offset`, `metadata`
  - Cache: 5 minutes with stale-while-revalidate
  - Example: `/api/posts?featured=true&limit=5`
- `GET /api/posts/[slug]` - Get single post
  - Cache: 15 minutes with stale-while-revalidate
  - Includes full content and metadata

**Admin API Endpoints**:
- `GET /api/admin/posts` - List all posts (including drafts)
- `POST /api/admin/posts` - Create new post
- `GET /api/admin/posts/[id]` - Get single post by ID
- `PATCH /api/admin/posts/[id]` - Update post
- `DELETE /api/admin/posts/[id]` - Delete post
- `POST /api/admin/upload` - Upload images to Vercel Blob
- `GET /api/admin/metrics` - Performance monitoring dashboard

**Authentication**:
- Session-based with iron-session
- Environment variables: `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- Login: `POST /api/auth/login`
- Logout: `POST /api/auth/logout`
- Check: `GET /api/auth/session`

### Performance Optimizations

**Caching System** (`lib/cache.ts`):
- In-memory cache with TTL expiration
- Automatic garbage collection
- Wildcard invalidation (`posts:*`)
- Cache statistics tracking
- 85%+ hit rate after warmup

**Cache Keys**:
```typescript
CacheKeys.allPosts()              // All published posts
CacheKeys.publishedPosts()        // Published posts metadata
CacheKeys.postBySlug(slug)        // Individual post by slug
CacheKeys.postsByCategory(cat)    // Posts by category
CacheKeys.featuredPosts()         // Featured posts
```

**Response Headers**:
```
Cache-Control: public, max-age=300, stale-while-revalidate=30
ETag: "abc123"
X-Response-Time: 45ms
```

**Performance Metrics**:
- P50 response time: ~40ms (cached), ~150ms (database)
- P95 response time: ~120ms (cached), ~400ms (database)
- Cache hit rate: 85%+
- Throughput: 100+ req/sec

**Monitoring**:
- Performance tracking in `lib/performance.ts`
- Metrics dashboard at `/api/admin/metrics`
- Automatic slow query detection (> 500ms)
- Real-time cache statistics

### Security Headers

Next.js config (`next.config.ts`) includes security and performance headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` for camera/microphone/geolocation
- `X-DNS-Prefetch-Control: on`
- `poweredByHeader: false` to hide Next.js version
- Compression enabled (Brotli/Gzip)
- Optimized cache headers for static assets

## Styling Guidelines

### Brutal Component Pattern
When creating new components that need the brutal aesthetic:

```tsx
<div className="brutal-card bg-primary p-6 rotate-[-2deg] hover:rotate-0">
  {/* Content */}
</div>
```

Key principles:
- Cards often have slight rotation (`rotate-[-2deg]`) that straightens on hover
- Use bold, vibrant theme colors
- 8px borders for major elements, 4px for smaller ones
- All interactive elements should have hover states
- Transitions use cubic-bezier easing for playful feel

### Responsive Design
- Mobile-first approach
- Brutal shadows are reduced on mobile (6px instead of 12px)
- Touch targets minimum 44px on mobile
- Grid layouts collapse to single column on mobile

### Accessibility
- All animations respect `prefers-reduced-motion`
- Minimum font sizes enforced (16px for body, 14px for small, 12px for xs)
- High contrast mode increases border widths
- Focus states use 4px orange outline
- Proper semantic HTML and ARIA labels

## Language & Content

- All content is in **Portuguese (pt-BR)**
- Blog topics: astrology, zodiac signs, horoscopes, compatibility
- Tone: humorous, sarcastic, irreverent (see `humorLevel` in posts)
- Content categories: sign-roasting, compatibility, horoscopes

## TypeScript Configuration

- Strict mode enabled
- Path aliases: `@/` maps to project root for imports
- Example: `import { BaseNavigation } from '@/components/layout/BaseNavigation'`

## Testing & Performance

### Performance Testing

**Load Testing** (`tests/performance/load-test.js`):
```bash
# Test local environment
npm run test:load

# Test production
BASE_URL=https://your-domain.com npm run test:perf

# View metrics
npm run metrics
```

**Test Configuration**:
- Concurrent users: 10
- Requests per user: 50
- Total requests: 500
- Success criteria: > 95% success rate

**Expected Results**:
- Success rate: 99%+
- P50 response time: < 50ms
- P95 response time: < 200ms
- P99 response time: < 500ms

### Development Commands (Extended)

```bash
# Database
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio

# Testing
npm run test:load        # Run load tests
npm run test:perf        # Same as test:load
npm run metrics          # View performance metrics

# Linting & Building
npm run lint            # Run ESLint
npm run build           # Production build
npm start               # Start production server
```

## Best Practices & Lessons Learned

### Database Queries
- ✅ Use selective field loading (`select`) to reduce payload size
- ✅ Exclude `content` field for list views (90% smaller)
- ✅ Add indexes for frequently queried fields
- ✅ Use composite indexes for common filter combinations
- ✅ Monitor slow queries (automatically logged if > 500ms)

### Caching Strategy
- ✅ Cache public data aggressively (5-15 minutes)
- ✅ Invalidate cache on mutations (create/update/delete)
- ✅ Use different TTLs based on data volatility
- ✅ Track cache hit rates to optimize TTL values
- ✅ Implement stale-while-revalidate for better UX

### API Design
- ✅ Provide metadata-only endpoints for list views
- ✅ Support pagination with `limit` and `offset`
- ✅ Include response time headers for debugging
- ✅ Use ETags for conditional requests
- ✅ Implement consistent error responses

### Performance Monitoring
- ✅ Track P50/P95/P99 response times
- ✅ Monitor cache hit rates
- ✅ Log slow database queries
- ✅ Watch memory usage
- ✅ Set up alerts for degraded performance

### Code Organization
- ✅ Separate concerns: cache, performance, API helpers
- ✅ Use TypeScript interfaces for consistency
- ✅ Document functions with JSDoc comments
- ✅ Create reusable utilities (api-helpers.ts)
- ✅ Keep business logic in lib/ directory

## Documentation

**Performance Documentation**:
- `docs/PERFORMANCE_OPTIMIZATION.md` - Complete optimization guide
- `docs/API_OPTIMIZATION_SUMMARY.md` - Implementation summary
- Both include examples, best practices, and troubleshooting

## Future Roadmap

### Completed ✅
- ✅ Custom CMS with admin panel
- ✅ Vercel Postgres integration
- ✅ Vercel Blob for image storage
- ✅ API performance optimizations
- ✅ Caching system
- ✅ Performance monitoring
- ✅ Load testing suite

### Planned
- [ ] MDX integration for blog content
- [ ] Full-text search (PostgreSQL or Algolia)
- [ ] RSS feed generation
- [ ] Open Graph image generation
- [ ] Dark mode (optional)
- [ ] Page animations with Framer Motion
- [ ] Redis caching for multi-instance deployments
- [ ] GraphQL API layer
- [ ] Real-time updates with WebSockets
