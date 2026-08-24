import {
  BadgeCheck,
  Clock3,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';

const benefits = [
  {
    title: 'Kvalitet',
    description: 'Vi utför varje jobb noggrant, professionellt och med fokus på långsiktig hållbarhet',
    icon: BadgeCheck,
  },
  {
    title: 'Trygghet',
    description: 'Du får tydlig information genom hela processen.',
    icon: ShieldCheck,
  },
  {
    title: 'Snabb service',
    description: 'Vi kommer till dig när du behöver oss och jobbar effektivt så att du snabbt kan återgå till ditt dagliga liv.',
    icon: Clock3,
  },
  {
    title: 'Kundfokus',
    description: 'Vi anpassar lösningen efter dina behov, din tid och din bils situation.',
    icon: UsersRound,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Därför väljer kunder oss
          </p>

          <h2 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Vi gör bilen enkel att ta hand om, även när den behöver hjälp på plats.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
            När du behöver hjälp med bilen vill du känna dig trygg och få lösningen direkt.
            Därför kommer vi till dig, löser problemet på plats och håller dig uppdaterad
            hela vägen genom processen.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <article
                key={benefit.title}
                className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-250 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gold/15 text-brand-blue ring-8 ring-brand-gold/10">
                  <Icon size={26} strokeWidth={2} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
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