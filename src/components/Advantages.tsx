import { useLanguage } from '../i18n/LanguageContext';
import { Star, FileText, Layers, DollarSign, Clock, MapPin } from 'lucide-react';

export function Advantages() {
  const { t } = useLanguage();

  const advantages = [
    {
      icon: Star,
      title: t.advantages.adv1Title,
      description: t.advantages.adv1Desc,
    },
    {
      icon: FileText,
      title: t.advantages.adv2Title,
      description: t.advantages.adv2Desc,
    },
    {
      icon: Layers,
      title: t.advantages.adv3Title,
      description: t.advantages.adv3Desc,
    },
    {
      icon: DollarSign,
      title: t.advantages.adv4Title,
      description: t.advantages.adv4Desc,
    },
    {
      icon: Clock,
      title: t.advantages.adv5Title,
      description: t.advantages.adv5Desc,
    },
    {
      icon: MapPin,
      title: t.advantages.adv6Title,
      description: t.advantages.adv6Desc,
    },
  ];

  return (
    <section id="advantages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 mb-3">
            {t.advantages.pretitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {t.advantages.title}
          </h2>
          <p className="text-lg text-gray-600">{t.advantages.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow-2xl hover:border-amber-300 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                    <Icon size={24} />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-300/80 to-transparent" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
