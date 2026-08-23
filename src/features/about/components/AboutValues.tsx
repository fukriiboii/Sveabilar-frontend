import {
  Handshake,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';

const values = [
  {
    title: 'Trygghet',
    text: 'Du ska alltid känna dig trygg med både arbetet och informationen du får.',
    icon: ShieldCheck,
  },
  {
    title: 'Kvalitet',
    text: 'Vi arbetar noggrant och strävar efter ett resultat som håller över tid.',
    icon: Sparkles,
  },
  {
    title: 'Erfarenhet',
    text: 'Vi använder vår kunskap för att hitta rätt lösning för din bil.',
    icon: Wrench,
  },
  {
    title: 'Personlig service',
    text: 'Vi lyssnar på dina behov och möter varje kund på ett tydligt sätt.',
    icon: Handshake,
  },
];

export default function AboutValues() {
  return (
    <section className="bg-brand-bg-primary px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Det här står vi för
          </p>

          <h2 className="mt-3 font-serif text-4xl text-brand-bg sm:text-5xl">
            Personlig service med fokus på kvalitet
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600">
            För oss handlar bilservice om mer än att bara lösa ett problem.
            Det handlar om att skapa långsiktigt förtroende och hjälpa dig att
            känna dig säker på vägen.
          </p>
        </div>

        <div className="mt-12 grid border-y border-brand-border sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className={[
                  'px-6 py-8',
                  index % 2 !== 0 ? 'border-l border-brand-border' : '',
                  index >= 2 ? 'border-t border-brand-border' : '',
                  'lg:border-t-0',
                  index > 0 ? 'lg:border-l' : '',
                ].join(' ')}
              >
                <Icon
                  size={30}
                  strokeWidth={1.8}
                  className="text-brand-blue"
                />

                <h3 className="mt-6 text-xl font-bold text-brand-bg">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {value.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}