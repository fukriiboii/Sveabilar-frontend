import { Clock3, MapPinned } from 'lucide-react';
import Button from '../../../shared/components/Button';

const hours = [
  { day: 'Måndag - Söndag', time: '08:00 - 20:00' }
];

export function BusinessHours() {
  return (
    <section className="px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3 text-brand-gold">
            <Clock3 size={20} />
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Öppettider</p>
          </div>

          <h2 className="mt-5 font-serif text-3xl leading-tight text-brand-bg sm:text-4xl">
            Här finns vi när du behöver hjälp.
          </h2>

          <div className="mt-7 space-y-4">
            {hours.map((entry) => (
              <div
                key={entry.day}
                className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-b-0"
              >
                <span className="text-base text-brand-bg">{entry.day}</span>
                <span className="text-base font-medium text-slate-600">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-brand-border bg-brand-bg p-8 shadow-[0_18px_50px_rgba(15,23,42,0.12)]">
          <div className="flex items-center gap-3 text-brand-gold">
            <MapPinned size={20} />
            <p className="text-sm font-bold uppercase tracking-[0.18em]">Serviceområde</p>
          </div>

          <h3 className="mt-5 font-serif text-3xl leading-tight text-white">Vi hjälper kunder i hela regionen.</h3>

          <p className="mt-4 text-base leading-7 text-slate-300">
            Vi erbjuder service, däckbyte och rådgivning för privatpersoner och företag som vill ha en pålitlig partner för sin bilvård.
          </p>

          <div className="mt-8 space-y-3 text-slate-100">
            <p>• Däckbyte och hjulservice</p>
            <p>• Bilservice och kontroll</p>
            <p>• Rådgivning för rätt däckval</p>
          </div>

          <div className="mt-8">
            <a href="tel:+46733976426">
              <Button label="Ring för bokning" className="w-full rounded-xl" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}