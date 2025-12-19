import { useEffect, useMemo, useRef, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MapPin, Phone, Mail, Send, SendHorizontal } from 'lucide-react';

const MAP_LINK = 'https://yandex.uz/maps/-/CLwQ6Bod';

export function Contacts() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    direction: '',
    comment: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isMapReady, setIsMapReady] = useState(false);
  const mapWrapRef = useRef<HTMLDivElement | null>(null);

  const mapLang = language === 'en' ? 'en_US' : 'ru_RU';
  const mapIframeSrc = useMemo(
    () =>
      `https://yandex.uz/map-widget/v1/?ll=69.291361%2C41.274722&z=19&pt=69.291361,41.274722,pm2rdm&lang=${mapLang}`,
    [mapLang]
  );

  const ui = useMemo(() => {
    const pick = (ru: string, en: string, uz: string) =>
      language === 'en' ? en : language === 'uz' ? uz : ru;

    return {
      showMap: (t.contacts as any)?.showMap ?? pick('Показать карту', 'Show map', "Xaritani ko‘rsatish"),
      mapHint:
        (t.contacts as any)?.mapHint ??
        pick(
          'Карта загрузится, когда вы доскроллите до блока',
          'The map will load when you scroll to this block',
          "Xarita ushbu blokka skroll qilganda yuklanadi"
        ),
    };
  }, [t, language]);

  useEffect(() => {
    const el = mapWrapRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsMapReady(true);
          io.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);
    setIsLoading(true);
    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Request failed');

      setIsSubmitted(true);
      setFormData({ name: '', phone: '', email: '', direction: '', comment: '' });
    } catch (error) {
      alert(t.contacts.errorMessage || 'Ошибка отправки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const telegramLink = import.meta.env.VITE_TELEGRAM_LINK || 'https://t.me/logitrack';

  const contacts = useMemo(
    () => [
      { icon: MapPin, label: t.contacts.address, value: t.contacts.addressValue, href: MAP_LINK },
      { icon: Phone, label: t.contacts.phone, value: '+998 78 150 40 10', href: 'tel:+998781504010' },
      { icon: Phone, label: t.contacts.phone, value: '+998 77 420 06 42', href: 'tel:+998774200642' },
      { icon: Mail, label: t.contacts.email, value: 'info@logitrack.uz', href: 'mailto:info@logitrack.uz' },
    ],
    [t]
  );

  return (
    <section id="contacts" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.contacts.title}</h2>
          <p className="text-lg text-gray-600">{t.contacts.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-md mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contacts.formTitle}</h3>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                  <CheckCircle className="inline-block mb-2" size={48} />
                  <p className="font-medium">{t.contacts.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contacts.formName}
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contacts.formPhone}
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contacts.formEmail}
                      required
                      autoComplete="email"
                      inputMode="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                    placeholder={t.contacts.formDirection}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors"
                  />

                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    placeholder={t.contacts.formComment}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-colors resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-red-600 text-white rounded-lg shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-red-700 flex items-center justify-center gap-2 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed transition"
                  >
                    <span>{t.contacts.formSubmit}</span>
                    {!isLoading && (
                      <Send
                        size={20}
                        className="transform-gpu transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">LOGITRACK</h3>

              <div className="space-y-4">
                {contacts.map((item, index) => {
                  const Icon = item.icon;
                  const isHttp = item.href?.startsWith('http');

                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shrink-0">
                        <Icon size={20} aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm text-gray-500">{item.label}</div>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={isHttp ? '_blank' : undefined}
                            rel={isHttp ? 'noopener noreferrer' : undefined}
                            className="text-base text-gray-900 font-medium hover:text-yellow-600 transition-colors whitespace-pre-line break-words"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-base text-gray-900 font-medium whitespace-pre-line break-words">
                            {item.value}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div ref={mapWrapRef} className="bg-white p-2 rounded-xl shadow-md overflow-hidden h-64 md:h-80">
              {isMapReady ? (
                <iframe
                  title="Logitrack office map"
                  src={mapIframeSrc}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-gray-100 to-white flex flex-col items-center justify-center gap-3 text-center px-6">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center">
                    <MapPin size={22} aria-hidden="true" />
                  </div>
                  <div className="text-sm text-gray-600">{ui.mapHint}</div>
                  <button
                    type="button"
                    onClick={() => setIsMapReady(true)}
                    className="px-5 py-2.5 rounded-lg bg-yellow-400 text-gray-900 font-medium hover:bg-yellow-500 transition-colors"
                  >
                    {ui.showMap}
                  </button>
                </div>
              )}
            </div>

            <div>
              <a
                href={telegramLink}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#229ED9] text-white shadow-md hover:shadow-lg transform-gpu hover:scale-[1.04] transition will-change-transform motion-reduce:hover:scale-100"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SendHorizontal size={24} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckCircle({ className, size }: { className?: string; size: number }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
