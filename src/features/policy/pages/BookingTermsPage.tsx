export default function BookingTermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-brand-border bg-brand-surface p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Bokningsvillkor
        </p>
        <h1 className="mt-3 text-3xl font-bold text-brand-text sm:text-4xl">
          Villkor för bokning
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-7 text-brand-text-muted">
          <section>
            <h2 className="text-lg font-semibold text-brand-text">1. Bokningsbekräftelse</h2>
            <p className="mt-3">
              En bokning är bekräftad först när du har fått en bekräftelse från oss via e-post.
              Kontrollera att dina kontaktuppgifter är korrekta när du skickar in bokningen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">2. Tider och tillgänglighet</h2>
            <p className="mt-3">
              Alla tider är preliminära fram till bekräftelse. Om en tid inte längre är tillgänglig
              kontaktar vi dig för att erbjuda en ny tid så snart som möjligt.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">3. Pris och tillägg</h2>
            <p className="mt-3">
              Grundpris framgår vid bokning. Eventuella tillägg, till exempel distanstillägg eller
              tjänstespecifika kostnader, kommuniceras tydligt innan arbetet utförs.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">4. Avbokning</h2>
            <p className="mt-3">
              Vid avbokning senare än 24 timmar före bokad tid kan en avgift tillkomma enligt
              informationen på tjänstesidan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">5. Kundens ansvar</h2>
            <p className="mt-3">
              Kunden ansvarar för att bilen är tillgänglig på angiven adress och att rätt information
              har lämnats i bokningen. Eventuella avvikelser kan påverka genomförandet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">6. Personuppgifter</h2>
            <p className="mt-3">
              Vi behandlar personuppgifter för att hantera bokningar och kundservice. Läs mer i vår
              integritetspolicy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">7. Kontakt</h2>
            <p className="mt-3">
              Har du frågor om villkoren är du välkommen att kontakta oss via
              info@sveabilarochdäck.se.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
