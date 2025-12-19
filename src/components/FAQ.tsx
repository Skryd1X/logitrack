import { useMemo, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { ChevronDown } from 'lucide-react';

export function FAQ() {
  const { t } = useLanguage();
  const [openIds, setOpenIds] = useState<Set<number>>(() => new Set([0]));

  const faqs = useMemo(
    () => [
      { question: t.faq.q1, answer: t.faq.a1 },
      { question: t.faq.q2, answer: t.faq.a2 },
      { question: t.faq.q3, answer: t.faq.a3 },
      { question: t.faq.q4, answer: t.faq.a4 },
      { question: t.faq.q5, answer: t.faq.a5 },
      { question: t.faq.q6, answer: t.faq.a6 },
    ],
    [t]
  );

  const toggleFAQ = (index: number) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const expandAll = () => setOpenIds(new Set(faqs.map((_, i) => i)));
  const collapseAll = () => setOpenIds(new Set());

  const isAllOpen = openIds.size === faqs.length;
  const isAnyOpen = openIds.size > 0;

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t.faq.title}
          </h2>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={expandAll}
              disabled={isAllOpen}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                isAllOpen
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-yellow-300 hover:text-gray-900'
              }`}
            >
              {t.faq.expandAll ?? 'Развернуть всё'}
            </button>

            <button
              type="button"
              onClick={collapseAll}
              disabled={!isAnyOpen}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                !isAnyOpen
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                  : 'border-gray-300 text-gray-700 hover:border-yellow-300 hover:text-gray-900'
              }`}
            >
              {t.faq.collapseAll ?? 'Свернуть всё'}
            </button>
          </div>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIds.has(index);

            return (
              <div
                key={index}
                className={`group bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-yellow-400 shadow-md'
                    : 'border-gray-200 hover:border-yellow-300 hover:shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4 group-hover:text-red-600">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={24}
                    className={`text-red-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[420px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
