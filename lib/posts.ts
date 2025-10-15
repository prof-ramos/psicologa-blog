import prisma from './prisma';
import { Post } from '@prisma/client';
import { cache, CacheKeys, CacheTTL } from './cache';

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

export interface PostQueryOptions {
  includeContent?: boolean;
  limit?: number;
  offset?: number;
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

/**
 * Get all published posts with caching and pagination support
 * @param options - Query options for content inclusion and pagination
 * @returns Array of blog posts
 */
export async function getAllPosts(options: PostQueryOptions = {}): Promise<BlogPost[]> {
  const { includeContent = true, limit, offset } = options;

  // Generate cache key based on options
  const cacheKey = includeContent
    ? CacheKeys.publishedPosts()
    : `${CacheKeys.publishedPosts()}:metadata`;

  // Check cache first
  const cached = cache.get<BlogPost[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    // Build select object to optimize query
    const select: any = {
      id: true,
      slug: true,
      title: true,
      description: true,
      pubDate: true,
      updatedDate: true,
      author: true,
      category: true,
      tags: true,
      featured: true,
      zodiacSign: true,
      difficulty: true,
      humorLevel: true,
      targetAudience: true,
      readingTime: true,
      coverImage: true,
      published: true,
    };

    // Only include content if requested
    if (includeContent) {
      select.content = true;
    }

    const posts = await prisma.post.findMany({
      where: { published: true },
      select,
      orderBy: { pubDate: 'desc' },
      ...(limit && { take: limit }),
      ...(offset && { skip: offset }),
    });

    const blogPosts = posts.map(postToBlogPost);

    // Cache results for 5 minutes (published posts don't change often)
    cache.set(cacheKey, blogPosts, CacheTTL.MEDIUM);

    return blogPosts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Get a single post by slug with caching
 * @param slug - Post slug
 * @returns Blog post or undefined if not found
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const cacheKey = CacheKeys.postBySlug(slug);

  // Check cache first
  const cached = cache.get<BlogPost>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const post = await prisma.post.findUnique({
      where: { slug, published: true },
    });

    if (!post) return undefined;

    const blogPost = postToBlogPost(post);

    // Cache individual posts for longer (15 minutes)
    cache.set(cacheKey, blogPost, CacheTTL.LONG);

    return blogPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return undefined;
  }
}

/**
 * Get featured posts with caching
 * @param limit - Number of posts to return
 * @returns Array of featured blog posts
 */
export async function getFeaturedPosts(limit: number = 5): Promise<BlogPost[]> {
  const cacheKey = `${CacheKeys.featuredPosts()}:${limit}`;

  // Check cache first
  const cached = cache.get<BlogPost[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const posts = await prisma.post.findMany({
      where: { published: true, featured: true },
      orderBy: { pubDate: 'desc' },
      take: limit,
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        pubDate: true,
        updatedDate: true,
        author: true,
        category: true,
        tags: true,
        featured: true,
        zodiacSign: true,
        difficulty: true,
        humorLevel: true,
        targetAudience: true,
        readingTime: true,
        coverImage: true,
        published: true,
        content: false, // Exclude content for list views
      },
    });

    const blogPosts = posts.map(postToBlogPost);

    // Cache featured posts for 10 minutes
    cache.set(cacheKey, blogPosts, 10 * 60 * 1000);

    return blogPosts;
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
}

/**
 * Get posts by category with caching
 * @param category - Category name
 * @param limit - Number of posts to return
 * @returns Array of blog posts in category
 */
export async function getPostsByCategory(category: string, limit?: number): Promise<BlogPost[]> {
  const cacheKey = limit
    ? `${CacheKeys.postsByCategory(category)}:${limit}`
    : CacheKeys.postsByCategory(category);

  // Check cache first
  const cached = cache.get<BlogPost[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const posts = await prisma.post.findMany({
      where: { published: true, category },
      orderBy: { pubDate: 'desc' },
      ...(limit && { take: limit }),
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        pubDate: true,
        updatedDate: true,
        author: true,
        category: true,
        tags: true,
        featured: true,
        zodiacSign: true,
        difficulty: true,
        humorLevel: true,
        targetAudience: true,
        readingTime: true,
        coverImage: true,
        published: true,
        content: false, // Exclude content for list views
      },
    });

    const blogPosts = posts.map(postToBlogPost);

    // Cache category posts for 5 minutes
    cache.set(cacheKey, blogPosts, CacheTTL.MEDIUM);

    return blogPosts;
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

/**
 * Invalidate cache when posts are created, updated, or deleted
 */
export function invalidatePostCache(slug?: string): void {
  if (slug) {
    // Invalidate specific post
    cache.invalidate(CacheKeys.postBySlug(slug));
  }

  // Invalidate all list caches
  cache.invalidate('posts:*');
}
