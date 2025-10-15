import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.data.title} | Blog`,
    description: post.data.description,
    openGraph: {
      title: post.data.title,
      description: post.data.description,
      type: 'article',
      publishedTime: post.data.pubDate,
      authors: [post.data.author || 'Psicóloga em Outra Dimensão'],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (iso?: string) => {
    if (!iso) return '';
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso));
  };

  return (
    <main className="bg-primary p-6 min-h-screen">
      <article className="max-w-4xl mx-auto">
        <div className="brutal-card bg-white border-black p-8 md:p-12">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 heading-font">
              {post.data.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">{post.data.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>Por {post.data.author || 'Psicóloga em Outra Dimensão'}</span>
              <span>•</span>
              <span>{formatDate(post.data.pubDate || post.data.updatedDate)}</span>
              {post.data.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.data.readingTime} min de leitura</span>
                </>
              )}
            </div>
          </header>

          {/* Tags */}
          {post.data.tags && post.data.tags.length > 0 && (
            <div className="mb-8">
              <ul className="flex flex-wrap gap-2">
                {post.data.tags.map((tag) => (
                  <li key={tag}>
                    <span className="inline-block bg-tertiary border-2 border-black px-3 py-1 text-xs font-bold text-black brutal-pill">
                      #{tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.data.content || '' }}
          />
        </div>
      </article>
    </main>
  );
}
