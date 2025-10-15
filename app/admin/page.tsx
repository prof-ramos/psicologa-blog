'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Edit, Trash2, Eye, Star, FileText } from 'lucide-react';

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  published: boolean;
  featured: boolean;
  category?: string;
  tags: string[];
  pubDate: string;
  updatedDate: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let url = '/api/admin/posts';

      if (filter === 'published') url += '?published=true';
      if (filter === 'draft') url += '?published=false';

      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Tem certeza que deseja deletar "${title}"?`)) return;

    try {
      const response = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert('Erro ao deletar post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Erro ao deletar post');
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-4xl font-black heading-font">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="brutal-button bg-secondary text-black px-6 py-3 flex items-center gap-2 w-fit"
        >
          <Plus className="w-5 h-5" />
          Novo Post
        </Link>
      </div>

      {/* Filters */}
      <div className="brutal-card bg-white p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border-4 border-black p-3 pl-12 focus:outline-none focus:ring-4 focus:ring-accent"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="border-4 border-black p-3 font-bold focus:outline-none focus:ring-4 focus:ring-accent"
            >
              <option value="all">Todos</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Posts List */}
      {loading ? (
        <div className="brutal-card bg-white p-12 text-center">
          <p className="text-xl font-bold">Carregando posts...</p>
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="brutal-card bg-white p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl font-bold text-gray-600">
            {search ? 'Nenhum post encontrado' : 'Nenhum post criado ainda'}
          </p>
          {!search && (
            <Link
              href="/admin/posts/new"
              className="brutal-button bg-secondary text-black px-6 py-3 mt-6 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Criar Primeiro Post
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="brutal-card bg-white p-6 hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.featured && (
                      <span className="bg-secondary border-2 border-black px-3 py-1 text-xs font-bold flex items-center gap-1">
                        <Star className="w-3 h-3" /> DESTAQUE
                      </span>
                    )}
                    <span
                      className={`border-2 border-black px-3 py-1 text-xs font-bold ${
                        post.published
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {post.published ? 'PUBLICADO' : 'RASCUNHO'}
                    </span>
                    {post.category && (
                      <span className="bg-tertiary border-2 border-black px-3 py-1 text-xs font-bold uppercase">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-2xl font-bold mb-2 heading-font">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-3 line-clamp-2">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                    <span>
                      Criado: {new Date(post.pubDate).toLocaleDateString('pt-BR')}
                    </span>
                    <span>
                      Atualizado: {new Date(post.updatedDate).toLocaleDateString('pt-BR')}
                    </span>
                    <span>Slug: /{post.slug}</span>
                  </div>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 border border-gray-300 px-2 py-1 text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex md:flex-col gap-2">
                  {post.published && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="brutal-button bg-primary text-white px-4 py-2 text-sm flex items-center gap-2 justify-center"
                    >
                      <Eye className="w-4 h-4" />
                      Ver
                    </a>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="brutal-button bg-accent text-black px-4 py-2 text-sm flex items-center gap-2 justify-center"
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="brutal-button bg-red-500 text-white px-4 py-2 text-sm flex items-center gap-2 justify-center hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="brutal-card bg-white p-6 text-center">
          <p className="text-4xl font-black heading-font">{posts.length}</p>
          <p className="text-sm font-bold text-gray-600 mt-2">Total de Posts</p>
        </div>
        <div className="brutal-card bg-secondary p-6 text-center">
          <p className="text-4xl font-black heading-font">
            {posts.filter((p) => p.published).length}
          </p>
          <p className="text-sm font-bold text-gray-900 mt-2">Publicados</p>
        </div>
        <div className="brutal-card bg-accent p-6 text-center">
          <p className="text-4xl font-black heading-font">
            {posts.filter((p) => !p.published).length}
          </p>
          <p className="text-sm font-bold text-white mt-2">Rascunhos</p>
        </div>
      </div>
    </div>
  );
}
