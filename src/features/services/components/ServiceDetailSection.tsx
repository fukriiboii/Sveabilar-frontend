import { Link } from 'react-router-dom';

import Button from '../../../shared/components/Button';

type ServiceDetailSectionProps = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  features: string[];
  isAvailable: boolean;
  bookingHref?: string;
  startingPrice?: number;
  reversed?: boolean;
};

export default function ServiceDetailSection({
  number,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  features,
  isAvailable,
  bookingHref,
  startingPrice,
  reversed = false,
}: ServiceDetailSectionProps) {

  return (
    <section className="overflow-hidden border-t border-slate-200 bg-brand-bg-primary px-4 py-20 sm:px-6 md:py-28">

      <div className={`mx-auto flex max-w-7xl flex-col gap-12 md:items-center md:gap-20 ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      >
        {/* Image */}
        <div className="relative md:w-1/2">

          <div
            className={`absolute -bottom-5 h-28 w-28 border-b-4 border-brand-gold ${
              reversed
                ? '-right-5 border-r-4'
                : '-left-5 border-l-4'
            }`}
          />

          <div className="relative overflow-hidden">
            <img
              src={image}
              alt={imageAlt}
              className="relative z-10 h-[320px] w-full object-cover sm:h-[420px] md:h-[500px]"
            />
          </div>

          {/* Number */}
          <div className="absolute -bottom-2 right-6 z-20 flex h-16 w-16 items-center justify-center bg-brand-gold">
            <span className="font-serif text-xl font-bold text-brand-bg">
              {number}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2">
          {/* Eyebrow */}
          <div className="mb-6 flex items-center gap-4">
            <span className="h-px w-10 bg-brand-blue" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-blue">
              {eyebrow}
            </span>
          </div>

          {/* Title */}
          <h2 className="max-w-xl font-serif text-4xl leading-[1.1] text-brand-bg sm:text-5xl lg:text-6xl">
            {title}
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            {description}
          </p>

          {/* Features */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <ul className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm font-semibold text-brand-bg"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-brand-gold text-xs font-bold text-brand-bg">
                    ✓
                  </span>

                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* STARTINGPRICE */}
          <div className='mt-8 flex items-end justify-between gap-4'>

            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Från
              </p>

              <p className='mt-2 text-3xl font-bold text-brand-bg'>
                {startingPrice ? `${startingPrice} kr` : 'Pris ej satt'}
              </p>
            </div>

          </div>

          {title === 'Däckbyte direkt hos dig' && (
            <div className="mt-6 rounded-2xl border border-brand-gold/40 bg-brand-gold/10 p-4">
              <p className="text-sm font-semibold text-brand-bg">Prisinfo för däckbyte</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li>• Inom 10 km ingår i priset</li>
                <li>• 17–20 tum: +100 kr</li>
                <li>• 20–22 tum: +200 kr</li>
              </ul>
            </div>
          )}

          {/* Action */}
          <div className="mt-8">
            {isAvailable && bookingHref ? (
              <Link to={bookingHref}>
                <Button
                  label="Boka däckbyte"
                  variant="primary"
                />
              </Link>
            ) : (
              <span className="inline-flex items-center border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-500">
                Kommer snart
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}