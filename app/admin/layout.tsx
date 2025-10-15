'use client';

import { usePathname, useRouter } from 'next/navigation';
import { LogOut, FileText, Home } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoginPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <header className="bg-black border-b-8 border-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-black text-white heading-font">
              CMS Admin
            </h1>

            <nav className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-button bg-secondary text-black px-4 py-2 text-sm flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                Ver Site
              </a>

              <a
                href="/admin"
                className="brutal-button bg-white text-black px-4 py-2 text-sm flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Posts
              </a>

              <button
                onClick={handleLogout}
                className="brutal-button bg-accent text-black px-4 py-2 text-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
