'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Loader } from 'lucide-react';
import { PostEditorForm } from '@/components/admin/PostEditorForm';

interface Post {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  published: boolean;
  featured: boolean;
  category?: string;
  tags: string[];
  zodiacSign?: string;
  difficulty?: string;
  humorLevel?: string;
  targetAudience?: string;
  readingTime?: number;
  coverImage?: string;
}

export default function EditPostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar post');
      }

      setPost(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4" />
          <p className="text-xl font-bold">Carregando post...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="brutal-button bg-white text-black px-4 py-2 flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
        </div>

        <div className="brutal-card bg-red-100 border-red-500 p-12 text-center">
          <p className="text-xl font-bold text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin"
          className="brutal-button bg-white text-black px-4 py-2 flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
        <h1 className="text-4xl font-black heading-font">Editar Post</h1>
      </div>

      <PostEditorForm mode="edit" initialData={post} />
    </div>
  );
}
