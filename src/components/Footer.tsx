import { useCallback, useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { SendHorizontal } from 'lucide-react';

const publicAsset = (name: string) => {
  const base = import.meta.env.BASE_URL || '/';
  return `${base}${encodeURI(name.replace(/^\/+/, ''))}`;
};

export function Footer() {
  const { t } = useLanguage();

  const logo = useMemo(() => publicAsset('logo.png'), []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  }, []);

  const quickLinks = useMemo(
    () => [
      { label: t.header.services, id: 'services' },
      { label: t.header.about, id: 'about' },
      { label: t.header.advantages, id: 'advantages' },
      { label: t.header.geography, id: 'geography' },
      { label: t.header.steps, id: 'steps' },
      { label: t.header.faq, id: 'faq' },
    ],
    [t]
  );

  const socialLinks = useMemo(
    () => [
      {
        icon: SendHorizontal,
        href: import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/logitrack',
        label: 'Telegram',
      },
    ],
    []
  );

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logo}
                alt="Logitrack"
                className="h-9 w-auto"
                loading="lazy"
                decoding="async"
              />
            </div>

            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">{t.footer.description}</p>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-yellow-400 hover:to-red-600 transform-gpu transition will-change-transform hover:scale-[1.04] motion-reduce:hover:scale-100"
                    aria-label={social.label}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">{t.contacts.title}</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="whitespace-pre-line break-words">{t.contacts.addressValue}</li>
              <li>
                <a className="hover:text-yellow-400 transition-colors" href="tel:+998781504010">
                  +998 78 150 40 10
                </a>
              </li>
              <li>
                <a className="hover:text-yellow-400 transition-colors" href="tel:+998774200642">
                  +998 77 420 06 42
                </a>
              </li>
              <li>
                <a
                  className="hover:text-yellow-400 transition-colors"
                  href="mailto:info@logitrack.uz"
                >
                  info@logitrack.uz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="text-center text-gray-400 text-sm">{t.footer.rights}</div>
        </div>
      </div>
    </footer>
  );
}
