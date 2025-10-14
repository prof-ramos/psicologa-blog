export interface BlogPost {
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

// Sample blog posts data
const samplePosts: BlogPost[] = [
  {
    slug: 'roast-cosmico-signos',
    data: {
      title: 'Roast Cósmico: A Verdade Sobre Cada Signo',
      description: 'Prepare-se para descobrir o que o zodíaco realmente pensa de você. Sem filtros, sem mimimi.',
      pubDate: '2024-01-15T00:00:00.000Z',
      author: 'Psicóloga em Outra Dimensão',
      category: 'sign-roasting',
      tags: ['humor', 'signos', 'roast', 'zodíaco'],
      featured: true,
      difficulty: 'beginner',
      humorLevel: 'savage',
      targetAudience: 'meme-lovers',
      readingTime: 8,
    },
  },
  {
    slug: 'compatibilidade-leao-escorpiao',
    data: {
      title: 'Leão e Escorpião: Um Drama Cósmico em 3 Atos',
      description: 'Quando o ego encontra a intensidade. Spoiler: vai ter chamas (literais e metafóricas).',
      pubDate: '2024-01-12T00:00:00.000Z',
      author: 'Psicóloga em Outra Dimensão',
      category: 'compatibility',
      tags: ['compatibilidade', 'leão', 'escorpião', 'relacionamentos'],
      featured: false,
      zodiacSign: 'leo',
      difficulty: 'intermediate',
      humorLevel: 'moderate',
      targetAudience: 'zodiac-enthusiasts',
      readingTime: 6,
    },
  },
  {
    slug: 'horoscopo-semanal-caos',
    data: {
      title: 'Horóscopo Semanal: Mercúrio Retrógrado Ataca Novamente',
      description: 'Sua previsão semanal com 100% mais sarcasmo e 0% de falsas esperanças.',
      pubDate: '2024-01-10T00:00:00.000Z',
      author: 'Psicóloga em Outra Dimensão',
      category: 'horoscopes',
      tags: ['horóscopo', 'previsões', 'mercúrio retrógrado'],
      featured: false,
      difficulty: 'beginner',
      humorLevel: 'moderate',
      targetAudience: 'astrology-beginners',
      readingTime: 5,
    },
  },
];

export async function getAllPosts(): Promise<BlogPost[]> {
  // In a real app, this would fetch from a CMS or MDX files
  // For now, return sample data
  return samplePosts.sort((a, b) => {
    const dateA = new Date(a.data.pubDate || '').getTime();
    const dateB = new Date(b.data.pubDate || '').getTime();
    return dateB - dateA;
  });
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
