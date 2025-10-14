import { BlogSummaryCard } from './BlogSummaryCard';
import type { BlogPost } from '@/lib/posts';

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return <p className="text-center text-gray-600">Nenhum post publicado ainda.</p>;
  }

  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <BlogSummaryCard post={post} />
        </li>
      ))}
    </ul>
  );
}
