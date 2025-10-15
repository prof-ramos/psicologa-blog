import { NextRequest } from 'next/server';
import { getPostBySlug } from '@/lib/posts';
import { cachedApiResponse, apiError, withTiming } from '@/lib/api-helpers';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

/**
 * GET /api/posts/[slug] - Get a single post by slug
 * Public API with aggressive caching (15 minutes)
 */
async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    if (!slug) {
      return apiError('Slug is required', 400);
    }

    const post = await getPostBySlug(slug);

    if (!post) {
      return apiError('Post not found', 404);
    }

    // Cache for 15 minutes (900 seconds)
    // Individual posts change even less frequently
    return cachedApiResponse(post, 900);
  } catch (error) {
    console.error('Error fetching post:', error);
    return apiError('Failed to fetch post', 500);
  }
}

// Wrap handler with timing decorator
export { withTiming(GET) as GET };
