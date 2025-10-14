import Link from 'next/link';
import { BlogList } from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/posts';

interface RecentBlogPostsProps {
  count?: number;
}

export async function RecentBlogPosts({ count = 3 }: RecentBlogPostsProps) {
  const posts = (await getAllPosts()).slice(0, count);

  return (
    <section className="mt-8">
      <div className="brutal-card bg-white border-black p-8">
        <div className="flex justify-between items-start mb-8">
          <h2 className="text-2xl md:text-4xl lg:text-6xl heading-font font-black">
            Posts Recentes
          </h2>
          <div className="hidden md:block">
            <Link
              href="/blog"
              className="brutal-button bg-accent text-black px-6 py-3 hover:bg-secondary transition-colors inline-block"
            >
              Ver blog &rarr;
            </Link>
          </div>
          <div className="block md:hidden">
            <Link
              href="/blog"
              className="brutal-button bg-accent text-black px-4 py-2 hover:bg-secondary transition-colors inline-block"
            >
              blog
            </Link>
          </div>
        </div>
        <BlogList posts={posts} />
      </div>
    </section>
  );
}
