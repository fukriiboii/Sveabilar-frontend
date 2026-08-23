import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react';

import logo from '../../assets/logo.png';
import { href } from 'react-router-dom';

const quickLinks = [
  { label: 'Hem', href: '/' },
  { label: 'Bilar', href: '/cars' },
  { label: 'Tjänster', href: '/services' },
  { label: 'Om oss', href: '/about' },
  { label: 'Integritet & cookies', href: '/policy'}
];

export default function Footer() {
  return (
    <footer className="bg-brand-bg text-brand-text">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 md:py-20">
        <div>
          <a href="/" aria-label="Sveabilar startsida">
            <img
              src={logo}
              alt="Sveabilar och Däck AB"
              className="h-14 w-auto object-contain"
            />
          </a>

          <p className="mt-5 max-w-sm text-sm leading-6 text-brand-text-muted">
            Professionell bilservice, däckservice och reparation med fokus på
            kvalitet och trygghet.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-gold">
            Snabblänkar
          </h2>

          <nav className="mt-5 flex flex-col gap-3">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="w-fit text-sm text-brand-text-muted transition-colors hover:text-brand-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-lg font-bold text-brand-gold">
            Kontakta oss
          </h2>

          <div className="mt-5 flex flex-col gap-4 text-sm text-brand-text-muted">
            <a
              href="tel:+46701234567"
              className="flex items-center gap-3 transition-colors hover:text-brand-gold"
            >
              <Phone size={18} />
              <span>070-123 45 67</span>
            </a>

            <a
              href="mailto:info@sveabilar.se"
              className="flex items-center gap-3 transition-colors hover:text-brand-gold"
            >
              <Mail size={18} />
              <span>info@sveabilar.se</span>
            </a>

            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <span>Er adress här</span>
            </div>

            <div className="flex items-center gap-3">
              <Clock3 size={18} />
              <span>Mån–Fre: 08:00–17:00</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-brand-text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Sveabilar och Däck AB</p>
          <p>Alla rättigheter förbehållna</p>
        </div>
      </div>
    </footer>
  );
}