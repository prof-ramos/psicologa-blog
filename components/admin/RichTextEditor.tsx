'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading1,
  Heading2,
  Heading3,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline hover:text-deep',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto border-4 border-black',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6 border-4 border-black bg-white',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = prompt('URL do link:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = prompt('URL da imagem:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="bg-black border-4 border-black p-3 flex flex-wrap gap-2">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 ${
            editor.isActive('bold')
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Negrito"
        >
          <Bold className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 ${
            editor.isActive('italic')
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Itálico"
        >
          <Italic className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`p-2 ${
            editor.isActive('code')
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Código"
        >
          <Code className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-400"></div>

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 ${
            editor.isActive('heading', { level: 1 })
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Título 1"
        >
          <Heading1 className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 ${
            editor.isActive('heading', { level: 2 })
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Título 2"
        >
          <Heading2 className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Título 3"
        >
          <Heading3 className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-400"></div>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 ${
            editor.isActive('bulletList')
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Lista"
        >
          <List className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 ${
            editor.isActive('orderedList')
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Lista Ordenada"
        >
          <ListOrdered className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 ${
            editor.isActive('blockquote')
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Citação"
        >
          <Quote className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-400"></div>

        {/* Link & Image */}
        <button
          type="button"
          onClick={addLink}
          className={`p-2 ${
            editor.isActive('link')
              ? 'bg-secondary text-black'
              : 'bg-white text-black hover:bg-gray-200'
          }`}
          title="Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={addImage}
          className="p-2 bg-white text-black hover:bg-gray-200"
          title="Imagem"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <div className="w-px bg-gray-400"></div>

        {/* Undo/Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className="p-2 bg-white text-black hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Desfazer"
        >
          <Undo className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className="p-2 bg-white text-black hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed"
          title="Refazer"
        >
          <Redo className="w-5 h-5" />
        </button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
