import prisma from './prisma';
import { Post } from '@prisma/client';

export interface BlogPost {
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

function postToBlogPost(post: Post): BlogPost {
  return {
    slug: post.slug,
    data: {
      title: post.title,
      description: post.description,
      content: post.content,
      pubDate: post.pubDate.toISOString(),
      updatedDate: post.updatedDate.toISOString(),
      author: post.author,
      category: post.category || undefined,
      tags: post.tags,
      featured: post.featured,
      zodiacSign: post.zodiacSign || undefined,
      difficulty: post.difficulty as 'beginner' | 'intermediate' | 'advanced' | undefined,
      humorLevel: post.humorLevel as 'none' | 'subtle' | 'moderate' | 'savage' | undefined,
      targetAudience: post.targetAudience || undefined,
      readingTime: post.readingTime || undefined,
      coverImage: post.coverImage || undefined,
    },
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      orderBy: { pubDate: 'desc' },
    });

    return posts.map(postToBlogPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug, published: true },
    });

    if (!post) return undefined;

    return postToBlogPost(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return undefined;
  }
}
