import { useMemo, useState } from 'react';
import { faqCategories } from '../data/faqData';
import SEO from '../../../shared/components/SEO';

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<'services' | 'business'>('services');

  const currentCategory = useMemo(
    () => faqCategories.find((category) => category.key === activeCategory) ?? faqCategories[0],
    [activeCategory],
  );

  return (
    <main className="bg-brand-bg-primary px-4 py-16 text-brand-bg sm:px-6 md:py-24">
      <SEO
        title="Vanliga frågor"
        description="Hitta svar på vanliga frågor om Sveabilar och Däcks tjänster, bokningar och verksamhet."
        path="/faq"
      />

      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Vanliga frågor
          </p>
          <h1 className="mt-4 font-serif text-4xl sm:text-5xl">Här hittar du svar</h1>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {faqCategories.map((category) => (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveCategory(category.key)}
              className={[
                'rounded-full border px-5 py-3 text-sm font-semibold transition',
                category.key === activeCategory
                  ? 'border-brand-blue bg-brand-blue text-white'
                  : 'border-slate-200 bg-white text-slate-700',
              ].join(' ')}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-serif text-3xl text-brand-bg">{currentCategory.description}</h2>

          <div className="mt-8 space-y-4">
            {currentCategory.items.map((item) => (
              <FaqAccordion
                key={item.question}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

type FaqAccordionProps = {
  question: string;
  answer: string;
};

function FaqAccordion({ question, answer }: FaqAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-semibold text-brand-bg">{question}</span>
        <span className="text-xl text-brand-blue">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="border-t border-slate-200 px-5 py-4">
          <p className="text-sm leading-7 text-slate-600">{answer}</p>
        </div>
      )}
    </div>
  );
}