import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { MapPin } from 'lucide-react';

const HERO_BG =
  "url('https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=800')";

export function Geography() {
  const { t } = useLanguage();

  const regions = useMemo(
    () => [
      { name: t.geography.region1, color: 'from-blue-400 to-blue-600' },
      { name: t.geography.region2, color: 'from-red-400 to-red-600' },
      { name: t.geography.region3, color: 'from-green-400 to-green-600' },
      { name: t.geography.region4, color: 'from-purple-400 to-purple-600' },
      { name: t.geography.region5, color: 'from-orange-400 to-orange-600' },
      { name: t.geography.region6, color: 'from-teal-400 to-teal-600' },
    ],
    [t]
  );

  return (
    <section id="geography" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.geography.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.geography.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div
              className="relative h-[360px] md:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden shadow-xl bg-cover bg-center transform-gpu"
              style={{ backgroundImage: HERO_BG }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-black/15 to-transparent" />
              <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-white/90 text-xs font-semibold tracking-wide text-gray-800 uppercase">
                {t.geography.badge}
              </div>
            </div>
          </div>

          <div>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {t.geography.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {regions.map((region, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-sm transform-gpu transition-all duration-300 will-change-transform motion-reduce:transition-none"
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${region.color} rounded-lg flex items-center justify-center transform-gpu transition-transform duration-300 will-change-transform group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100`}
                  >
                    <MapPin className="text-white" size={20} aria-hidden="true" />
                  </div>

                  <span className="text-gray-900 font-medium">{region.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
