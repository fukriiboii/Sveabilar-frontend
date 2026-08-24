import { ArrowRight, CheckCircle2, Clock3, Mail, PhoneCall } from 'lucide-react';
import Button from '../../../shared/components/Button';

export function ContactHero() {
  const benefits = [
    'Snabb hjälp med däck och service',
    'Tydlig information om öppettider',
    'Lätt att ringa eller skicka e-post',
  ];

  return (
    <section className="relative overflow-hidden bg-brand-bg px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,196,0,0.15),_transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
          <span className="inline-block h-px w-10 bg-brand-gold" />
          Kontakta oss
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="max-w-xl font-serif text-4xl leading-[0.96] tracking-[-0.04em] text-white drop-shadow-[0_5px_25px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-7xl">
              Har du frågor om din bil?
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Vi hjälper dig med däck, service, rådgivning och bokning på ett enkelt och professionellt sätt.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="tel:+46701234567">
                <Button
                  label="Ring oss"
                  icon={<PhoneCall size={18} />}
                  className="rounded-xl"
                />
              </a>

              <a href="mailto:info@sveabilar.se">
                <Button
                  label="Skicka e-post"
                  variant="ghost"
                  icon={<Mail size={18} />}
                  className="rounded-xl"
                />
              </a>
            </div>

            <ul className="mt-8 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-slate-200">
                  <CheckCircle2 size={18} className="text-brand-gold" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-brand-gold">
                <Clock3 size={18} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">Snabb kontakt</span>
              </div>
              <span className="inline-flex items-center rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
                Går snabbt
              </span>
            </div>

            <div className="mt-7 space-y-5">
              <div className="rounded-2xl border border-white/10 bg-brand-surface/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Telefon</p>
                <a href="tel:+46701234567" className="mt-2 block text-2xl font-semibold text-white">
                  070-123 45 67
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-brand-surface/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">E-post</p>
                <a href="mailto:info@sveabilar.se" className="mt-2 block text-lg font-semibold text-white">
                  info@sveabilar.se
                </a>
              </div>

              <div className="rounded-2xl border border-white/10 bg-brand-surface/70 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Öppettider</p>
                <p className="mt-2 text-base font-medium text-white">Mån–Fre 08:00–18:00</p>
                <p className="text-base font-medium text-white">Lör 09:00–14:00</p>
              </div>
            </div>

            <a href="mailto:info@sveabilar.se" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-gold">
              Skicka ett meddelande <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}