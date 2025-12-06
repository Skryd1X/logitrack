import { useLanguage } from '../i18n/LanguageContext';
import { MapPin } from 'lucide-react';

export function Geography() {
  const { t } = useLanguage();

  const regions = [
    { name: t.geography.region1, color: 'from-blue-400 to-blue-600' },
    { name: t.geography.region2, color: 'from-red-400 to-red-600' },
    { name: t.geography.region3, color: 'from-green-400 to-green-600' },
    { name: t.geography.region4, color: 'from-purple-400 to-purple-600' },
    { name: t.geography.region5, color: 'from-orange-400 to-orange-600' },
    { name: t.geography.region6, color: 'from-teal-400 to-teal-600' },
  ];

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
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                backgroundImage: `url('https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg?auto=compress&cs=tinysrgb&w=800')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '500px',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-red-600/20" />
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
                  className="group flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-yellow-400 hover:shadow-md transition-all duration-300"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${region.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <MapPin className="text-white" size={20} />
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
