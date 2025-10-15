'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Send, Eye, X, ImageIcon } from 'lucide-react';
import { RichTextEditor } from './RichTextEditor';
import { MarkdownPreview } from './MarkdownPreview';
import { ImageUpload } from './ImageUpload';

interface PostData {
  id?: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  author?: string;
  category?: string;
  tags: string[];
  featured: boolean;
  zodiacSign?: string;
  difficulty?: string;
  humorLevel?: string;
  targetAudience?: string;
  readingTime?: number;
  published: boolean;
  coverImage?: string;
}

interface PostEditorFormProps {
  initialData?: PostData;
  mode: 'create' | 'edit';
}

export function PostEditorForm({ initialData, mode }: PostEditorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  const [formData, setFormData] = useState<PostData>(
    initialData || {
      slug: '',
      title: '',
      description: '',
      content: '',
      author: 'Psicóloga em Outra Dimensão',
      category: '',
      tags: [],
      featured: false,
      published: false,
    }
  );

  useEffect(() => {
    if (initialData) {
      setTagsInput(initialData.tags.join(', '));
    }
  }, [initialData]);

  const handleSubmit = async (e: FormEvent, publish: boolean) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Parse tags
      const tags = tagsInput
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const dataToSend = {
        ...formData,
        tags,
        published: publish,
        readingTime: formData.readingTime ? Number(formData.readingTime) : undefined,
      };

      const url =
        mode === 'create'
          ? '/api/admin/posts'
          : `/api/admin/posts/${formData.id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar post');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6">
      {error && (
        <div className="bg-red-100 border-4 border-red-500 p-4 flex items-start gap-3">
          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 font-bold flex-1">{error}</p>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="brutal-button bg-primary text-white px-6 py-3 flex items-center gap-2"
        >
          <Eye className="w-5 h-5" />
          {showPreview ? 'Esconder Preview' : 'Mostrar Preview'}
        </button>

        <button
          type="button"
          onClick={() => setShowImageUpload(!showImageUpload)}
          className="brutal-button bg-tertiary text-black px-6 py-3 flex items-center gap-2"
        >
          <ImageIcon className="w-5 h-5" />
          Upload de Imagem
        </button>

        <div className="ml-auto flex gap-4">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            disabled={loading}
            className="brutal-button bg-gray-300 text-black px-6 py-3 flex items-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            Salvar Rascunho
          </button>

          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            disabled={loading}
            className="brutal-button bg-secondary text-black px-6 py-3 flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            {loading ? 'Salvando...' : 'Publicar'}
          </button>
        </div>
      </div>

      {/* Image Upload */}
      {showImageUpload && (
        <div className="brutal-card bg-white p-6">
          <h3 className="text-xl font-bold mb-4 heading-font">Upload de Imagem</h3>
          <ImageUpload
            onUpload={(url) => {
              // You can insert the URL into the editor or use it as cover image
              if (confirm('Usar como imagem de capa?')) {
                setFormData({ ...formData, coverImage: url });
              }
            }}
          />
        </div>
      )}

      {/* Basic Info */}
      <div className="brutal-card bg-white p-6 space-y-4">
        <h2 className="text-2xl font-black heading-font">Informações Básicas</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-2">
              Título <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">
              Slug <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })
              }
              required
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-2">
            Descrição <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
            rows={3}
            className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block font-bold mb-2">Imagem de Capa (URL)</label>
          <input
            type="url"
            value={formData.coverImage || ''}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Content Editor */}
      <div className="brutal-card bg-white p-6 space-y-4">
        <h2 className="text-2xl font-black heading-font">Conteúdo</h2>

        {showPreview ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold mb-2">Editor</h3>
              <RichTextEditor
                content={formData.content}
                onChange={(html) => setFormData({ ...formData, content: html })}
              />
            </div>
            <div>
              <h3 className="font-bold mb-2">Preview</h3>
              <MarkdownPreview content={formData.content} />
            </div>
          </div>
        ) : (
          <RichTextEditor
            content={formData.content}
            onChange={(html) => setFormData({ ...formData, content: html })}
          />
        )}
      </div>

      {/* Metadata */}
      <div className="brutal-card bg-white p-6 space-y-4">
        <h2 className="text-2xl font-black heading-font">Metadados</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold mb-2">Autor</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Categoria</label>
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent font-bold"
            >
              <option value="">Selecione...</option>
              <option value="sign-roasting">Roast de Signos</option>
              <option value="compatibility">Compatibilidade</option>
              <option value="horoscopes">Horóscopos</option>
              <option value="zodiac-signs">Signos do Zodíaco</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Signo do Zodíaco</label>
            <select
              value={formData.zodiacSign || ''}
              onChange={(e) => setFormData({ ...formData, zodiacSign: e.target.value })}
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent font-bold"
            >
              <option value="">Nenhum</option>
              <option value="aries">Áries</option>
              <option value="taurus">Touro</option>
              <option value="gemini">Gêmeos</option>
              <option value="cancer">Câncer</option>
              <option value="leo">Leão</option>
              <option value="virgo">Virgem</option>
              <option value="libra">Libra</option>
              <option value="scorpio">Escorpião</option>
              <option value="sagittarius">Sagitário</option>
              <option value="capricorn">Capricórnio</option>
              <option value="aquarius">Aquário</option>
              <option value="pisces">Peixes</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Dificuldade</label>
            <select
              value={formData.difficulty || ''}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent font-bold"
            >
              <option value="">Nenhuma</option>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="advanced">Avançado</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Nível de Humor</label>
            <select
              value={formData.humorLevel || ''}
              onChange={(e) => setFormData({ ...formData, humorLevel: e.target.value })}
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent font-bold"
            >
              <option value="none">Nenhum</option>
              <option value="subtle">Sutil</option>
              <option value="moderate">Moderado</option>
              <option value="savage">Savage</option>
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2">Tempo de Leitura (min)</label>
            <input
              type="number"
              value={formData.readingTime || ''}
              onChange={(e) =>
                setFormData({ ...formData, readingTime: e.target.value ? parseInt(e.target.value) : undefined })
              }
              min="1"
              className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-2">Tags (separadas por vírgula)</label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="humor, signos, roast, zodíaco"
            className="w-full border-4 border-black p-3 focus:outline-none focus:ring-4 focus:ring-accent"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-6 h-6 border-4 border-black"
            />
            <span className="font-bold">Post em Destaque</span>
          </label>
        </div>
      </div>
    </form>
  );
}
