import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import ServicesHero from '../components/ServicesHero';
import ServiceDetailSection from '../components/ServiceDetailSection';
import { getServiceFeatures } from '../data/serviceFeatures';
import { useServices } from '../hooks/useServices';
import SEO from '../../../shared/components/SEO';

import tireChangeImage from '../../../assets/tire-change.webp';
import headlightRepairImage from '../../../assets/headlight-repair.webp';
import carServiceImage from '../../../assets/car-service.webp';
import transportImage from '../../../assets/transport.webp';
import repairImage from '../../../assets/repair.webp';

const imageByType: Record<string, string> = {
  TIRE_CHANGE: tireChangeImage,
  HEADLIGHT_REPAIR: headlightRepairImage,
  CAR_SERVICE: carServiceImage,
  CAR_TRANSPORT: transportImage,
  MINOR_REPAIRS: repairImage,
};

export default function ServicesPage() {
  const { services, isLoading, error } = useServices();

  const mappedServices = useMemo(
    () =>
      services.map((service, index) => ({
        number: String(index + 1).padStart(2, '0'),
        eyebrow: service.available ? (service.requiresQuote ? 'Pris på offert' : 'Tjänst') : 'Kommer snart',
        title: service.name,
        description: service.description,
        image: imageByType[service.type] ?? carServiceImage,
        imageAlt: service.name,
        features: getServiceFeatures(service.type),
        isAvailable: service.available,
        bookingHref: service.available
          ? service.requiresQuote
            ? `/contact?service=${service.type}`
            : `/booking?service=${service.type}`
          : undefined,
        startingPrice: service.available ? service.price ?? undefined : undefined,
        buttonLabel: service.requiresQuote ? 'Begär offert' : 'Boka tjänst',
        reversed: index % 2 === 1,
      })),
    [services],
  );

  return (
    <main className="bg-brand-bg-primary text-brand-bg">
      <SEO
        title="Våra tjänster"
        description="Se våra tjänster inom däckskifte, strålkastarrenovering, bilservice, biltransport och mindre reparationer."
        path="/services"
      />

      <ServicesHero />

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">
            Våra tjänster
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl">
            Service för hela bilen
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600">
            Vi erbjuder smidiga biltjänster hos kunden med fokus på kvalitet,
            trygghet och enkelhet. 
          </p>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Prisguide
          </p>
          <h3 className="mt-3 font-serif text-3xl text-brand-bg text-center">Vår distans och däckprislista</h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                Distans - Utgår från Bålsta
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Inom 15 km ingår i priset</li>
                <li>• 15 – 25 km: +100 kr</li>
                <li>• 25 – 35 km: +150 kr</li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                Däckstorlek
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Upp till 17 tum: standardpris</li>
                <li>• 18 – 20 tum: +100 kr</li>
                <li>• 21 – 22 tum: +150 kr</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Observera:</strong> Vid avbokning mindre än 24 timmar före bokad tid tillkommer en avgift på 100 kr.
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="px-4 pb-16 text-center text-sm text-slate-600 sm:px-6">
          Hämtar tjänster...
        </div>
      )}

      {!isLoading && error && (
        <div className="px-4 pb-16 text-center text-sm text-red-600 sm:px-6">
          {error}
        </div>
      )}

      {!isLoading && !error && mappedServices.map((service) => (
        <ServiceDetailSection
          key={service.number}
          number={service.number}
          eyebrow={service.eyebrow}
          title={service.title}
          description={service.description}
          image={service.image}
          imageAlt={service.imageAlt}
          features={service.features}
          isAvailable={service.isAvailable}
          bookingHref={service.bookingHref}
          startingPrice={service.startingPrice}
          buttonLabel={service.buttonLabel}
          reversed={service.reversed}
        />
      ))}

      <section className="border-t border-slate-200 bg-white px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Har du frågor?
          </p>

          <h2 className="mt-3 font-serif text-3xl text-brand-bg sm:text-4xl">
            Vi hjälper dig att hitta rätt tjänst
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Vid frågor om en tjänst är du välkommen att kontakta oss eller läsa
            mer bland våra vanliga frågor.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-brand-bg px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-bg/90"
            >
              Kontakta oss
            </Link>

            <Link
              to="/faq"
              className="inline-flex items-center justify-center border border-brand-bg px-6 py-3 text-sm font-semibold text-brand-bg transition hover:bg-brand-bg hover:text-white"
            >
              Läs vanliga frågor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}