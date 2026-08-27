import heroImage from '../../../assets/heroImage.webp';

export default function CarsHero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-brand-bg bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 -z-10 bg-brand-bg/80" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-center px-4 py-20 sm:px-6 md:min-h-[80vh]">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-4">
            <span className="h-1 w-14 bg-brand-gold" />

            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
              Våra bilar
            </p>
          </div>

          {/* Title */}
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-brand-text sm:text-6xl md:text-7xl">
            Våra bilar kommer snart
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-8 text-brand-text-muted sm:text-lg">
            Vi arbetar just nu med att bygga upp vårt bilutbud. Snart hittar
            du noggrant utvalda bilar hos Sveabilar.
          </p>

          {/* Status */}
          <div className="mt-8 inline-flex items-center gap-3 border border-brand-border bg-brand-surface/70 px-4 py-3 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-brand-gold" />

            <span className="text-sm font-semibold text-brand-text">
              Bilutbud lanseras snart
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}