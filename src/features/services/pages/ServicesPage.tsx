import ServicesHero from '../components/ServicesHero';
import ServiceDetailSection from '../components/ServiceDetailSection';

import tireChangeImage from '../../../assets/tire-change.jpg';
import headlightRepairImage from '../../../assets/headlight-repair.jpg';
import carServiceImage from '../../../assets/car-service.jpg';

const services = [
  {
    number: '01',
    eyebrow: 'Däckservice',
    title: 'Däckbyte direkt hos dig',
    description:
      'Vi kommer till dig och utför däckbytet på plats. Smidigt, tryggt och tidsbesparande – utan att du behöver lämna hemmet eller arbetsplatsen.',
    image: tireChangeImage,
    imageAlt: 'Däckbyte på bil hos Sveabilar',
    features: [
      'Däckbyte inför säsong',
      'Kontroll av däck och mönsterdjup',
      'Professionellt utfört',
      'Vi kommer till dig',
    ],
    isAvailable: true,
    bookingHref: '/booking?service=TIRE_CHANGE',
    startingPrice: 499,
    reversed: false,
  },

  {
    number: '02',
    eyebrow: 'Strålkastarservice',
    title: 'Ge dina strålkastare nytt liv',
    description:
      'Matta och slitna strålkastare påverkar både bilens utseende och sikten på vägen. Vi hjälper dig att återställa strålkastarnas funktion och utseende.',
    image: headlightRepairImage,
    imageAlt: 'Strålkastarservice på bil hos Sveabilar',
    features: [
      'Kontroll av strålkastare',
      'Felsökning av belysning',
      'Förbättrad ljusbild',
      'Förbättrat utseende',
    ],
    isAvailable: false,
    reversed: true,
  },

  {
    number: '03',
    eyebrow: 'Bilservice',
    title: 'Service och reparation för din bil',
    description:
      'Vi hjälper dig med bilens löpande underhåll och enklare reparationer för att bilen ska fungera pålitligt och säkert i vardagen.',
    image: carServiceImage,
    imageAlt: 'Bilservice och reparation hos Sveabilar',
    features: [
      'Service och underhåll',
      'Felsökning',
      'Enklare reparationer',
      'Professionell hjälp',
    ],
    isAvailable: false,
    reversed: false,
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-brand-bg-primary text-brand-bg">
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
            Vi erbjuder smidiga biltjänster med fokus på kvalitet,
            trygghet och enkelhet.
          </p>
        </div>
      </section>

      <section className="px-4 pb-8 sm:px-6">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Prisguide
          </p>
          <h3 className="mt-3 font-serif text-3xl text-brand-bg">Vår distans- och däckprislista</h3>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                Distans
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Inom 10 km ingår i priset</li>
                <li>• 10–20 km: +100 kr</li>
                <li>• 20–30 km: +200 kr</li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                Däckstorlek
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Upp till 17 tum: standardpris</li>
                <li>• 17–20 tum: +100 kr</li>
                <li>• 20–22 tum: +200 kr</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <strong>Observera:</strong> Vid utebliven bokningstid debiteras 100 kr.
          </div>
        </div>
      </section>

      {services.map((service) => (
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
          reversed={service.reversed}
        />
      ))}
    </main>
  );
}