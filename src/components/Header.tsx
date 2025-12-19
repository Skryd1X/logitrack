import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/translations';

const publicAsset = (name: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${encodeURI(name.replace(/^\/+/, ''))}`;
};

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const logo = publicAsset('logo.png');
  const dhlLogo = publicAsset('dhl-logo.png');

  const partnerLabel =
    language === 'ru'
      ? 'Эксклюзивный партнер'
      : language === 'en'
        ? 'Exclusive partner'
        : 'Eksklyuziv hamkor';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280) setIsMenuOpen(false);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { label: t.header.services, id: 'services' },
    { label: t.header.about, id: 'about' },
    { label: t.header.advantages, id: 'advantages' },
    { label: t.header.geography, id: 'geography' },
    { label: t.header.steps, id: 'steps' },
    { label: t.header.contacts, id: 'contacts' },
    { label: t.header.faq, id: 'faq' },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
    { code: 'uz', label: 'UZ' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 gap-3">
          <div
            className="flex items-center gap-3 cursor-pointer min-w-0"
            onClick={() => {
              setIsMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <img src={logo} alt="Logitrack" className="h-9 w-auto shrink-0" />

            <div className="hidden md:flex min-w-0 flex-col leading-none justify-center translate-y-[1px]">
              <span className="text-black text-[11px] font-normal whitespace-nowrap truncate">
                {partnerLabel}
              </span>

              <img
                src={dhlLogo}
                alt="DHL Global Forwarding"
                className="mt-[4px] h-[20px] w-auto object-contain max-w-[230px] translate-x-[1px]"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-6 min-w-0">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-red-600 transition-colors font-medium whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-1 border border-gray-300 rounded-lg p-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`px-3 py-1 rounded transition-colors ${
                    language === lang.code
                      ? 'bg-yellow-400 text-gray-900 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('contacts')}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium whitespace-nowrap"
            >
              {t.header.requestBtn}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="xl:hidden p-2 text-gray-700 shrink-0"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setIsMenuOpen(false)}
          />
          <div
            id="mobile-menu"
            className="absolute top-20 left-0 right-0 bg-white border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-700 hover:text-red-600 transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}

              <div className="flex items-center gap-2 pt-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded transition-colors ${
                      language === lang.code
                        ? 'bg-yellow-400 text-gray-900 font-medium'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => scrollToSection('contacts')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {t.header.requestBtn}
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
