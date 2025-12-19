import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe, Shield, Award, Users } from 'lucide-react';

export function About() {
  const { t } = useLanguage();

  const features = useMemo(
    () => [
      { icon: Globe, title: t.about.feature1Title, description: t.about.feature1Desc },
      { icon: Shield, title: t.about.feature2Title, description: t.about.feature2Desc },
      { icon: Award, title: t.about.feature3Title, description: t.about.feature3Desc },
      { icon: Users, title: t.about.feature4Title, description: t.about.feature4Desc },
    ],
    [t]
  );

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-gray-400 mb-3">
            {t.about.pretitle}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5">
            {t.about.title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t.about.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-300 hover:-translate-y-1 transform-gpu transition-all duration-300 will-change-transform motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white transform-gpu transition-transform duration-300 will-change-transform group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-amber-300/70 to-transparent" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
