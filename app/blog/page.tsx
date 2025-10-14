import { BlogList } from '@/components/blog/BlogList';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Blog | Psicóloga em Outra Dimensão',
  description: 'Artigos sobre astrologia com humor e muito sarcasmo cósmico.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="bg-primary p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 heading-font">
          Blog
        </h1>
        <BlogList posts={posts} />
      </div>
    </main>
  );
}
