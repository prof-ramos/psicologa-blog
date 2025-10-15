'use client';

import { useState } from 'react';
import { Upload, X, Check, Loader } from 'lucide-react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    setUploadedUrl('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer upload');
      }

      setUploadedUrl(data.url);
      onUpload(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uploadedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className={`brutal-button bg-primary text-white px-6 py-3 cursor-pointer inline-flex items-center gap-2 ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Fazendo upload...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload de Imagem
            </>
          )}
        </label>
      </div>

      {error && (
        <div className="bg-red-100 border-4 border-red-500 p-4 flex items-start gap-3">
          <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-red-800 font-bold flex-1">{error}</p>
        </div>
      )}

      {uploadedUrl && (
        <div className="bg-green-100 border-4 border-green-500 p-4">
          <div className="flex items-start gap-3 mb-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 font-bold flex-1">
              Upload realizado com sucesso!
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={uploadedUrl}
              readOnly
              className="flex-1 border-2 border-green-600 p-2 text-sm bg-white"
            />
            <button
              onClick={copyToClipboard}
              className="brutal-button bg-secondary text-black px-4 py-2 text-sm"
            >
              {copied ? 'Copiado!' : 'Copiar URL'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
