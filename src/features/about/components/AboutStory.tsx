export default function AboutStory() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.05fr_1.35fr] md:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Vår historia
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-bg sm:text-5xl">
            Vi bygger förtroende genom kvalitet och omtanke
          </h2>
        </div>

        <div className="relative">
          <div className="absolute -left-4 top-8 h-24 w-24 border-l-4 border-b-4 border-brand-gold" />

          <div className="relative space-y-6 rounded-3xl border border-brand-border bg-brand-bg-primary p-8 shadow-sm">
            <p className="text-base leading-8 text-slate-600">
              Sveabilar och Däck AB startade med en enkel idé: att ge bilägare
              en trygg, tydlig och professionell upplevelse när de behöver hjälp
              med sin bil.
            </p>

            <p className="text-base leading-8 text-slate-600">
              Vi vill göra det enkelt att få rätt service, rätt råd och rätt
              lösning — utan stress, krånglighet eller osäkerhet. Därför har vi
              byggt vår verksamhet kring kvalitet, personlig service och ett
              långsiktigt förtroende.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}