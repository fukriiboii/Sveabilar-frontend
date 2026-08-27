import { Mail, MapPin, Phone } from 'lucide-react';

type ContactItem = {
  label: string;
  value: string;
  href?: string;
  description: string;
  icon: typeof Phone;
  accent?: 'gold' | 'dark';
};

const contactItems: ContactItem[] = [
  {
    label: 'Telefon',
    value: '073-397 64 26',
    href: 'tel:+46733976426',
    description: 'Ring oss direkt för snabb hjälp, bokning eller rådgivning.',
    icon: Phone,
    accent: 'gold',
  },
  {
    label: 'E-post',
    value: 'info@sveabilarochdäck.se',
    href: 'mailto:info@sveabilarochdäck.se',
    description: 'Skicka ett meddelande så återkommer vi så snabbt vi kan.',
    icon: Mail,
    accent: 'dark',
  },
  {
    label: 'Besök oss',
    value: 'Ej tillgängligt',
    description: 'Inom kort är du välkommen till vår lokal',
    icon: MapPin,
    accent: 'gold',
  },
];

export function ContactInfoSection() {
  return (
    <section className="bg-[#f5f2eb] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-gold">
              Kontaktinformation
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-brand-bg sm:text-4xl">
              Här finns vi när du behöver hjälp.
            </h2>
          </div>

          <div className="max-w-lg rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm text-slate-600 backdrop-blur-sm">
            Rätt hjälp, rätt tid, rätt lösning.
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {contactItems.map((item) => (
            <ContactCard key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type ContactCardProps = {
  item: ContactItem;
};

function ContactCard({ item }: ContactCardProps) {
  const Icon = item.icon;
  const isDark = item.accent === 'dark';

  const content = (
    <div
      className={[
        'h-full rounded-[30px] border p-6 shadow-[0_18px_40px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_26px_60px_rgba(15,23,42,0.09)]',
        isDark ? 'border-brand-bg bg-brand-bg text-white' : 'border-slate-200 bg-white text-brand-bg',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-12 w-12 items-center justify-center rounded-2xl',
          isDark ? 'bg-[#f6d87a] text-brand-bg' : 'bg-[#fff6d9] text-brand-bg',
        ].join(' ')}
      >
        <Icon size={20} />
      </div>

      <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-brand-gold">
        {item.label}
      </p>

      <p className={['mt-4 text-xl font-semibold', isDark ? 'text-white' : 'text-brand-bg'].join(' ')}>
        {item.value}
      </p>

      <p className={['mt-3 text-sm leading-6', isDark ? 'text-slate-300' : 'text-slate-600'].join(' ')}>
        {item.description}
      </p>
    </div>
  );

  if (!item.href) return content;

  return (
    <a
      href={item.href}
      className="block h-full focus:outline-none focus:ring-2 focus:ring-brand-gold/70 focus:ring-offset-2"
    >
      {content}
    </a>
  );
}