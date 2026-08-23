import heroImage from '../../../assets/heroImage.png';

export default function ServicesHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 -z-10 bg-brand-bg/80" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 py-20 sm:px-6 md:min-h-screen">
        <div className="max-w-3xl">
          <div className="mb-6 flex items-center gap-4">
            <span className="h-1 w-14 bg-brand-gold" />

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
              Våra tjänster
            </p>
          </div>

          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-brand-text sm:text-6xl md:text-7xl">
            Service som håller dig på vägen
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-brand-text-muted sm:text-lg">
            Vi erbjuder professionell hjälp för däck, belysning, service och
            reparationer. Allt med fokus på säkerhet, kvalitet och ett tryggt
            resultat.
          </p>
        </div>
      </div>
    </section>
  );
}