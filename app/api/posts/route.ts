import { NextRequest } from 'next/server';
import { getAllPosts, getPostsByCategory, getFeaturedPosts } from '@/lib/posts';
import { cachedApiResponse, apiError, withTiming } from '@/lib/api-helpers';

/**
 * GET /api/posts - Public API for fetching published posts
 * Query parameters:
 * - category: Filter by category
 * - featured: Get only featured posts
 * - limit: Number of posts to return
 * - offset: Pagination offset
 * - metadata: Only return metadata (excludes content)
 */
async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');
    const metadataOnly = searchParams.get('metadata') === 'true';

    let posts;

    // Route to appropriate query based on params
    if (featured) {
      const featuredLimit = limit ? parseInt(limit) : 5;
      posts = await getFeaturedPosts(featuredLimit);
    } else if (category) {
      const categoryLimit = limit ? parseInt(limit) : undefined;
      posts = await getPostsByCategory(category, categoryLimit);
    } else {
      const queryLimit = limit ? parseInt(limit) : undefined;
      const queryOffset = offset ? parseInt(offset) : undefined;

      posts = await getAllPosts({
        includeContent: !metadataOnly,
        limit: queryLimit,
        offset: queryOffset,
      });
    }

    // Return cached response with 5 minute cache
    // Public posts don't change frequently
    return cachedApiResponse(posts, 300);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return apiError('Failed to fetch posts', 500);
  }
}

// Wrap handler with timing decorator
export { withTiming(GET) as GET };
