import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Plane, Truck, Train, Ship, Package } from 'lucide-react';

export function Services() {
  const { t } = useLanguage();

  const services = useMemo(
    () => [
      {
        icon: Plane,
        title: t.services.air,
        description: t.services.airDesc,
        image:
          'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
      {
        icon: Truck,
        title: t.services.road,
        description: t.services.roadDesc,
        image:
          'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
      {
        icon: Train,
        title: t.services.rail,
        description: t.services.railDesc,
        image:
          'https://images.pexels.com/photos/3935702/pexels-photo-3935702.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
      {
        icon: Ship,
        title: t.services.sea,
        description: t.services.seaDesc,
        image:
          'https://images.pexels.com/photos/2144905/pexels-photo-2144905.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
      {
        icon: Package,
        title: t.services.logistics,
        description: t.services.logisticsDesc,
        image:
          'https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=1200',
      },
    ],
    [t]
  );

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 mb-3">
            {t.services.pretitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg text-gray-600">{t.services.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transform-gpu transition-all duration-300 will-change-transform motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform-gpu will-change-transform group-hover:scale-[1.04] transition-transform duration-700 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-amber-400 text-gray-900 flex items-center justify-center shadow-md">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
