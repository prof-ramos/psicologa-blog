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
  };
}
```

**Current Implementation**: Sample data is hardcoded in `lib/posts.ts`. Posts are retrieved via:
- `getAllPosts()` - Returns all posts sorted by date
- `getPostBySlug(slug)` - Returns single post

**Future Integration**: The system is designed to be replaced with:
- MDX files with frontmatter
- CMS integration (e.g., Sanity.io)
- The interface structure should remain the same

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

### Security Headers

Next.js config (`next.config.ts`) includes security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` for camera/microphone/geolocation
- `poweredByHeader: false` to hide Next.js version

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

## Future Roadmap

Items documented in README.md for future implementation:
- MDX integration for blog content
- CMS integration (Sanity.io)
- Search and filter system
- RSS feed
- Open Graph image generation
- Dark mode (optional)
- Page animations with Framer Motion
