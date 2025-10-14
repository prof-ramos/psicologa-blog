import React from 'react';
import Link from 'next/link';
import {
  Star, Heart, Moon, BookOpen, Flame, Smile,
  Flower, Scale, Bug, Mountain, Droplet, Fish,
  TrendingUp, Users, Search, HelpCircle
} from 'lucide-react';
import type { BlogPost } from '@/lib/posts';

interface BlogSummaryCardProps {
  post: BlogPost;
}

const categoryData: Record<string, { label: string; icon: typeof Star }> = {
  'zodiac-signs': { label: 'Signos do Zodíaco', icon: Star },
  'horoscopes': { label: 'Horóscopos', icon: Moon },
  'compatibility': { label: 'Compatibilidade', icon: Heart },
  'birth-charts': { label: 'Mapa Astral', icon: TrendingUp },
  'moon-phases': { label: 'Fases da Lua', icon: Moon },
  'planetary-transits': { label: 'Trânsitos', icon: TrendingUp },
  'tarot-readings': { label: 'Tarô', icon: Star },
  'crystal-healing': { label: 'Cristais', icon: Star },
  'spiritual-guidance': { label: 'Orientação Espiritual', icon: Star },
  'cosmic-humor': { label: 'Humor Cósmico', icon: Smile },
  'astro-memes': { label: 'Memes Astrais', icon: Smile },
  'sign-roasting': { label: 'Roast de Signos', icon: Flame },
};

const difficultyLabels: Record<string, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Avançado',
};

const targetAudienceData: Record<string, { label: string; icon: typeof Star }> = {
  'astrology-beginners': { label: 'Iniciantes na Astrologia', icon: Star },
  'zodiac-enthusiasts': { label: 'Entusiastas do Zodíaco', icon: Star },
  'spiritual-seekers': { label: 'Buscadores Espirituais', icon: Search },
  'cosmic-skeptics': { label: 'Céticos Cósmicos', icon: HelpCircle },
  'meme-lovers': { label: 'Amantes de Memes', icon: Smile },
};

const zodiacIcons: Record<string, typeof Star> = {
  aries: Flame,
  taurus: Mountain,
  gemini: Users,
  cancer: Moon,
  leo: Star,
  virgo: Flower,
  libra: Scale,
  scorpio: Bug,
  sagittarius: TrendingUp,
  capricorn: Mountain,
  aquarius: Droplet,
  pisces: Fish,
};

const formatReadingTime = (minutes?: number) => {
  if (!minutes) return '';
  return `${minutes} min de leitura`;
};

const formatDate = (iso?: string) => {
  if (!iso) return '';
  return new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(iso));
};

export function BlogSummaryCard({ post }: BlogSummaryCardProps) {
  const categorySlug = post.data.category ?? '';
  const categoryInfo = categorySlug ? categoryData[categorySlug] : undefined;
  const categoryLabel = categoryInfo?.label ?? (categorySlug ? categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1) : '');
  const CategoryIcon = categoryInfo?.icon ?? Star;
  const postUrl = `/blog/${post.slug}`;
  const authorName = post.data.author ?? 'Psicóloga em Outra Dimensão';
  const publishedAt = formatDate(post.data.pubDate ?? post.data.updatedDate);
  const zodiacSlug = post.data.zodiacSign;
  const ZodiacIcon = zodiacSlug ? zodiacIcons[zodiacSlug] ?? Star : null;

  return (
    <article className="bg-white border-4 border-black card-shadow p-6 h-full flex flex-col">
      {post.data.featured && (
        <div className="mb-4">
          <span className="bg-secondary border-4 border-black px-4 py-2 text-sm font-black uppercase tracking-wider brutal-pill animate-pulse flex items-center gap-2 w-fit">
            <Star className="w-4 h-4" /> EM DESTAQUE <Star className="w-4 h-4" />
          </span>
        </div>
      )}

      {categoryLabel && (
        <div className="mb-3">
          {categorySlug ? (
            <Link
              href={`/blog/category/${categorySlug}`}
              className="inline-flex items-center gap-2 bg-black text-white px-3 py-2 text-sm font-bold uppercase tracking-wider hover:bg-deep transition-colors brutal-pill"
            >
              <CategoryIcon className="w-4 h-4" />
              {categoryLabel}
            </Link>
          ) : (
            <span className="inline-flex items-center gap-2 bg-black text-white px-3 py-2 text-sm font-bold uppercase tracking-wider brutal-pill">
              <CategoryIcon className="w-4 h-4" />
              {categoryLabel}
            </span>
          )}
        </div>
      )}

      <h2 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 heading-font flex items-start gap-2">
        {ZodiacIcon && <ZodiacIcon className="w-6 h-6 flex-shrink-0 text-deep" />}
        <Link href={postUrl} className="text-black hover:text-deep transition-colors">
          {post.data.title}
        </Link>
      </h2>

      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <div className="flex items-center justify-between">
          <span>Por {authorName}</span>
          <span>{publishedAt}</span>
        </div>

        <div className="flex items-center justify-between text-xs">
          {post.data.readingTime && (
            <span className="bg-gray-100 px-2 py-1 border border-gray-300 flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> {formatReadingTime(post.data.readingTime)}
            </span>
          )}

          <div className="flex gap-2">
            {post.data.difficulty && (
              <span
                className={`px-2 py-1 border border-black text-xs font-bold ${
                  post.data.difficulty === 'beginner'
                    ? 'bg-green-100 text-green-800'
                    : post.data.difficulty === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {difficultyLabels[post.data.difficulty]}
              </span>
            )}
            {post.data.humorLevel && post.data.humorLevel !== 'none' && (
              <span
                className={`px-2 py-1 border border-black text-xs font-bold flex items-center gap-1 ${
                  post.data.humorLevel === 'subtle'
                    ? 'bg-blue-100 text-blue-800'
                    : post.data.humorLevel === 'moderate'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {post.data.humorLevel === 'subtle' ? (
                  <Smile className="w-3 h-3" />
                ) : post.data.humorLevel === 'moderate' ? (
                  <Smile className="w-3 h-3" />
                ) : (
                  <Flame className="w-3 h-3" />
                )}
                {post.data.humorLevel === 'subtle'
                  ? 'Sutil'
                  : post.data.humorLevel === 'moderate'
                  ? 'Moderado'
                  : 'Savage'}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4 flex-grow line-clamp-3">{post.data.description}</p>

      <div className="mb-4">
        <ul className="flex flex-wrap gap-2">
          {post.data.tags?.slice(0, 4).map((tag) => (
            <li key={tag}>
              <Link
                href={`/blog/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                className="inline-block bg-tertiary hover:bg-accent border-2 border-black px-3 py-1 text-xs font-bold text-black transition-colors brutal-pill"
              >
                #{tag}
              </Link>
            </li>
          ))}
          {post.data.tags && post.data.tags.length > 4 && (
            <li className="text-xs font-bold text-deep px-2 py-1 flex items-center gap-1">
              +{post.data.tags.length - 4} mais <Star className="w-3 h-3" />
            </li>
          )}
        </ul>
      </div>

      {post.data.targetAudience && targetAudienceData[post.data.targetAudience] && (
        <div className="mb-4 text-sm flex items-center gap-2">
          <span className="text-gray-600">Público-alvo:</span>
          <span className="font-semibold flex items-center gap-1">
            {React.createElement(targetAudienceData[post.data.targetAudience].icon, {
              className: 'w-3 h-3',
            })}
            {targetAudienceData[post.data.targetAudience].label}
          </span>
        </div>
      )}

      <div className="mt-auto">
        <Link
          href={postUrl}
          className="brutal-button bg-accent text-black px-6 py-3 hover:bg-secondary transition-colors w-full block text-center"
        >
          Ler artigo completo &rarr;
        </Link>
      </div>
    </article>
  );
}
