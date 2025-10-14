import Link from 'next/link';
import { Star, Heart, Flame, Moon, Smile } from 'lucide-react';
import { RecentBlogPosts } from '@/components/generic/RecentBlogPosts';
import { MobileSocials } from '@/components/home/MobileSocials';

const blogTopics = [
  { name: 'Zodíaco', description: 'Signos e personalidades', icon: Star },
  { name: 'Compatibilidade', description: 'Amor cósmico', icon: Heart },
  { name: 'Roasts Astrais', description: 'Humor zodiacal', icon: Flame },
  { name: 'Horóscopos', description: 'Previsões galácticas', icon: Moon },
  { name: 'Lua & Planetas', description: 'Energias celestiais', icon: Moon },
  { name: 'Memes Cósmicos', description: 'Risadas estelares', icon: Smile },
];

export default function HomePage() {
  return (
    <main className="bg-primary p-6 min-h-screen">
      <MobileSocials />

      {/* Hero Section */}
      <section className="hero-section mb-16">
        <div className="brutal-card bg-black border-secondary p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
          <h1 className="heading-font text-3xl md:text-6xl lg:text-8xl font-black text-white mb-6 leading-none">
            PSICÓLOGA EM
            <span className="block text-secondary text-bold">OUTRA DIMENSÃO</span>
          </h1>
          <p className="heading-font text-lg md:text-2xl lg:text-4xl text-white font-bold mb-8 max-w-4xl flex items-center gap-4">
            ASTROLOGIA COM HUMOR E MUITO SARCASMO CÓSMICO
            <Star className="text-secondary w-8 h-8 md:w-12 md:h-12" />
          </p>
          <Link
            href="/blog"
            className="brutal-button bg-accent text-black text-xl hover:bg-secondary transition-colors inline-block px-8 py-4"
          >
            DESCUBRA OS SEGREDOS DO ZODÍACO →
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="grid md:grid-cols-12 gap-8 mb-16">
        <h2 className="sr-only">Sobre a Psicóloga</h2>

        {/* Blog Topics */}
        <div className="col-span-12 md:col-span-8">
          <div className="brutal-card bg-deep border-tertiary p-8 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <h2 className="text-2xl md:text-4xl lg:text-6xl mb-6 heading-font text-white font-black">
              TEMAS DO BLOG
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {blogTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={topic.name}
                    className="brutal-pill bg-tertiary p-4 hover:bg-accent transition-colors cursor-pointer group"
                  >
                    <Icon className="text-2xl mb-2 group-hover:scale-110 transition-transform text-black w-8 h-8" />
                    <h3 className="heading-font font-black text-black text-sm md:text-base mb-2">
                      {topic.name}
                    </h3>
                    <p className="body-font text-black text-xs opacity-80">{topic.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* About Blog */}
        <div className="col-span-12 md:col-span-4">
          <div className="brutal-card bg-accent border-deep p-8 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <h2 className="text-xl md:text-3xl lg:text-5xl mb-6 heading-font text-black font-black leading-tight">
              SOBRE O BLOG
            </h2>
            <p className="body-font text-black font-semibold text-sm md:text-base leading-relaxed flex flex-col gap-2">
              <span>
                Bem-vindos ao meu universo astrológico! Aqui você encontra roasts cósmicos,
                análises de signos com humor ácido e a verdade nua e crua sobre compatibilidade
                zodiacal.
              </span>
              <span className="flex items-center gap-2">
                Prepare-se para rir (e se ofender um pouquinho).
                <Smile className="text-deep w-6 h-6" />
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <RecentBlogPosts />
    </main>
  );
}
