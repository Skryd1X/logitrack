import { useLanguage } from '../i18n/LanguageContext';
import { ChevronRight } from 'lucide-react';

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const stats = [
    { value: '50+', label: t.hero.stat1 },
    { value: '15,000+', label: t.hero.stat2 },
    { value: '10+', label: t.hero.stat3 },
    { value: '500+', label: t.hero.stat4 },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(0,0,0,0.85), rgba(0,0,0,0.65)), url('https://images.pexels.com/photos/4481327/pexels-photo-4481327.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(252,211,77,0.18),transparent_55%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <p className="mb-4 text-xs md:text-sm tracking-[0.35em] uppercase text-gray-200/90">
            LOGITRACK • GLOBAL LOGISTICS
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            <span
              className="block text-white drop-shadow-[0_0_26px_rgba(0,0,0,0.95)]"
              style={{ WebkitTextStroke: '1px rgba(0,0,0,0.55)' }}
            >
              {t.hero.title}
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 text-gray-100 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => scrollToSection('contacts')}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white rounded-xl font-semibold text-lg shadow-xl shadow-black/40 hover:from-amber-500 hover:to-red-600 transition-all flex items-center gap-2 group"
            >
              {t.hero.requestBtn}
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className="px-8 py-4 rounded-xl border border-white/40 text-white font-medium text-lg bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all"
            >
              {t.hero.contactBtn}
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-4 md:mt-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/8 backdrop-blur-md rounded-xl p-6 border border-white/15 hover:border-white/50 transition-colors"
              >
                <div className="h-0.5 w-8 bg-gradient-to-r from-amber-300 to-orange-500 mb-3" />
                <div className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-100/90">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
