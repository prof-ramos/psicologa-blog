import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PostEditorForm } from '@/components/admin/PostEditorForm';

export default function NewPostPage() {
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
        <h1 className="text-4xl font-black heading-font">Novo Post</h1>
      </div>

      <PostEditorForm mode="create" />
    </div>
  );
}
