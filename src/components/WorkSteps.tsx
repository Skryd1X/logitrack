import { useMemo } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { FileText, Calculator, Settings, Eye, CheckCircle } from 'lucide-react';

export function WorkSteps() {
  const { t } = useLanguage();

  const steps = useMemo(
    () => [
      { icon: FileText, title: t.steps.step1Title, description: t.steps.step1Desc },
      { icon: Calculator, title: t.steps.step2Title, description: t.steps.step2Desc },
      { icon: Settings, title: t.steps.step3Title, description: t.steps.step3Desc },
      { icon: Eye, title: t.steps.step4Title, description: t.steps.step4Desc },
      { icon: CheckCircle, title: t.steps.step5Title, description: t.steps.step5Desc },
    ],
    [t]
  );

  return (
    <section id="steps" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.steps.title}</h2>
          <p className="text-lg text-gray-600">{t.steps.subtitle}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="hidden lg:block absolute inset-y-4 left-1/2 w-px bg-gradient-to-b from-yellow-400 via-red-500 to-yellow-400 -translate-x-1/2" />

          <div className="space-y-10 lg:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              const num = index + 1;
              const numLabel = num < 10 ? `0${num}` : `${num}`;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-white px-6 py-5 md:px-8 md:py-6 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 hover:border-yellow-400 inline-block max-w-xl transform-gpu transition-all duration-300 will-change-transform motion-reduce:transition-none">
                      <div
                        className={`flex items-center gap-4 ${isEven ? 'flex-row lg:flex-row-reverse' : 'flex-row'}`}
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 transform-gpu">
                          <Icon className="text-white" size={28} aria-hidden="true" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="mb-1 text-xs uppercase tracking-[0.25em] text-yellow-600">
                            {numLabel}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 bg-gradient-to-br from-yellow-400 to-red-600 rounded-full items-center justify-center text-white font-semibold text-sm shadow-md z-10">
                    {num}
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
