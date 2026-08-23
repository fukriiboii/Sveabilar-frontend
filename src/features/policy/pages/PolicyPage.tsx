export default function PolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-brand-border bg-brand-surface p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Policy
        </p>
        <h1 className="mt-3 text-3xl font-bold text-brand-text sm:text-4xl">
          Integritet & cookies
        </h1>

        <div className="mt-8 space-y-8 text-sm leading-7 text-brand-text-muted">
          <section>
            <h2 className="text-lg font-semibold text-brand-text">1. Information vi samlar in</h2>
            <p className="mt-3">
              För att kunna hantera bokningar och ge kundservice samlar vi in information som namn,
              telefonnummer, e-postadress och adress när du gör en bokning. Vi samlar också in data
              om vald tjänst, bokningsdatum, tid och bokningens status.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">2. Hur vi använder informationen</h2>
            <p className="mt-3">
              Informationen används för att administrera bokningar, bekräfta tider, kommunicera med
              kunden och säkerställa att tjänsten kan utföras korrekt. Vi använder inte prisinformation
              i databasen i detta läge och lagrar endast den information som behövs för bokningsflödet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">3. Cookies</h2>
            <p className="mt-3">
              Vår webbplats använder cookies för att säkerställa att grundfunktionalitet fungerar,
              exempelvis sessioner och autentisering. Valfria cookies kan användas för statistik och
              förbättrad användarupplevelse om du godkänner det.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">4. Lagring och säkerhet</h2>
            <p className="mt-3">
              Vi sparar kund- och bokningsinformation så länge det behövs för att fullgöra tjänsten,
              följa lagkrav och administrera bokningar. Vi vidtar rimliga tekniska och organisatoriska
              åtgärder för att skydda informationen.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">5. Dina rättigheter</h2>
            <p className="mt-3">
              Du har rätt att begära information om vilka personuppgifter vi behandlar, begära rättelse,
              begränsning av behandling eller radering, om detta är tillämpligt. Kontakta oss om du vill
              ha mer information eller om du vill begära ändring av dina uppgifter.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-brand-text">6. Kontakt</h2>
            <p className="mt-3">
              Om du har frågor om vår integritetspolicy eller cookies kan du kontakta oss på
              info@sveabilar.se eller telefon 070-123 45 67.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
