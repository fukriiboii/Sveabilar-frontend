const team = [
  {
    name: 'Fiko',
    role: 'VD',
    description: 'Ansvarar för företagets utveckling, strategi och övergripande verksamhet.',
    initials: 'FK',
  },
  {
    name: 'Filip',
    role: 'Servicetekniker',
    description: 'Utför service, bilvård, reparationer och underhåll med fokus på kvalitet och säkerhet.',
    initials: 'FK',
  },
  {
    name: 'Fredrik',
    role: 'Kund & Marknadsansvarig',
    description: 'Ansvarar för kundkontakt, bokningar och företagets kommunikation och synlighet.',
    initials: 'FK',
  },
  {
    name: 'Albin',
    role: 'Verkstadschef',
    description: 'Ansvarar för den dagliga driften och ser till att arbetet utförs effektivt och professionellt.',
    initials: 'AK',
  },
];

export default function TeamSection() {
  return (
    <section className="bg-brand-bg-primary px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Möt vårt team
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-bg sm:text-5xl">
            Professionella som brinner för bilen
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Vi är ett litet team med högt fokus på kvalitet, trygghet och personlig
            service. Varje kund får hjälp av någon som verkligen bryr sig om
            resultatet.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="bg-brand-bg-primary px-6 pb-0 pt-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gold text-xl font-bold text-brand-bg">
                  {member.initials}
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-blue">
                  {member.role}
                </p>

                <h3 className="mt-3 text-2xl font-bold text-brand-bg">
                  {member.name}
                </h3>

                <p className="mt-4 text-base leading-7 text-slate-600">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}