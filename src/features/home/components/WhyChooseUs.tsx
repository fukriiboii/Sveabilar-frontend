import {
  BadgeCheck,
  Clock3,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

const benefits = [
  {
    title: 'Kvalitet',
    description: 'Vi utför varje arbete noggrant och professionellt.',
    icon: BadgeCheck,
  },
  {
    title: 'Trygghet',
    description: 'Du får tydlig information genom hela processen.',
    icon: ShieldCheck,
  },
  {
    title: 'Snabb service',
    description: 'Vi hjälper dig snabbt tillbaka på vägen.',
    icon: Clock3,
  },
  {
    title: 'Kundfokus',
    description: 'Vi anpassar våra lösningar efter dina behov.',
    icon: UsersRound,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-brand-bg-primary px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Därför väljer kunder oss
          </p>

          <h2 className="mt-3 font-serif text-3xl text-brand-bg sm:text-4xl md:text-5xl">
            Varför välja Sveabilar?
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Vi kombinerar erfarenhet, kvalitet och personlig service för att
            göra ditt besök så enkelt och tryggt som möjligt.
          </p>
        </div>

        <div className="mt-12 grid border-y border-brand-border sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className={[
                  'px-6 py-8 text-center',
                  index % 2 !== 0 ? 'border-l border-brand-border' : '',
                  index >= 2 ? 'border-t border-brand-border' : '',
                  'lg:border-t-0',
                  index > 0 ? 'lg:border-l' : '',
                ].join(' ')}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white">
                  <Icon size={26} strokeWidth={2} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-brand-bg">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {benefit.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}