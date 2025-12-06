import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MapPin, Phone, Mail, Send, MessageCircle } from 'lucide-react';

export function Contacts() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    direction: '',
    comment: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      if (!response.ok) {
        throw new Error('Request failed');
      }
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        direction: '',
        comment: '',
      });
    } catch (error) {
      alert(t.contacts.errorMessage || 'Ошибка отправки. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const contacts = [
    {
      icon: MapPin,
      label: t.contacts.address,
      value: t.contacts.addressValue,
    },
    {
      icon: Phone,
      label: t.contacts.phone,
      value: '+998 78 150 40 10',
      href: 'tel:+998781504010',
    },
    {
      icon: Mail,
      label: t.contacts.email,
      value: 'info@logitrack.uz',
      href: 'mailto:info@logitrack.uz',
    },
  ];

  return (
    <section id="contacts" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.contacts.title}
          </h2>
          <p className="text-lg text-gray-600">
            {t.contacts.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t.contacts.formTitle}
              </h3>
              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                  <CheckCircle className="inline-block mb-2" size={48} />
                  <p className="font-medium">{t.contacts.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.contacts.formName}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t.contacts.formPhone}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.contacts.formEmail}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="direction"
                      value={formData.direction}
                      onChange={handleChange}
                      placeholder={t.contacts.formDirection}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder={t.contacts.formComment}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-red-600 text-white rounded-lg shadow-lg hover:from-yellow-500 hover:to-red-700 flex items-center justify-center gap-2 font-medium text-lg disabled:opacity-70 disabled:cursor-not-allowed transition"
                  >
                    <span>{t.contacts.formSubmit}</span>
                    {!isLoading && (
                      <Send
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                LOGITRACK
              </h3>
              <div className="space-y-4">
                {contacts.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-base text-gray-900 font-medium hover:text-yellow-500 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <div className="text-base text-gray-900 font-medium">
                          {item.value}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-2 rounded-xl shadow-lg overflow-hidden h-64 md:h-80">
              <iframe
                title="Logitrack office map"
                src="https://yandex.uz/map-widget/v1/?ll=69.311249%2C41.288118&z=17&pt=69.311249,41.288118,pm2rdm&lang=ru_RU"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>

            <div>
              <a
                href="https://t.me/logitrack"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#229ED9] text-white shadow-lg hover:shadow-xl hover:scale-105 transition"
                aria-label="Telegram"
              >
                <MessageCircle size={24} />
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
