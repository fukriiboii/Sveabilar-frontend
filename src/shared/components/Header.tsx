import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Button from './Button';
import logo from '../../assets/logo.png';
import LoginModal from '../../features/auth/components/LoginModal';

const phoneNumber = '070-123 45 67';
const phoneLink = 'tel:+46701234567';

const navItems = [
  { label: 'HEM', href: '/' },
  { label: 'BILAR', href: '/cars' },
  { label: 'TJÄNSTER', href: '/services' },
  { label: 'OM OSS', href: '/about' },
];

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" onClick={closeMenu} aria-label="Sveabilar startsida">
            <img
              src={logo}
              alt="Sveabilar och Däck AB"
              className="h-12 w-auto object-contain sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-brand-text-muted md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="transition-colors hover:text-brand-gold"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={phoneLink}
              className="hidden items-center gap-2 text-sm font-semibold text-brand-text transition-colors hover:text-brand-gold lg:flex"
            >
              <Phone size={18} strokeWidth={2} />
              <span>{phoneNumber}</span>
            </a>

            <Button
              label="Logga in"
              onClick={() => setIsLoginOpen(true)}
              className="hidden md:block"
            />

            <button
              type="button"
              aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-brand-border text-brand-text md:hidden"
            >
              <span
                className={`h-0.5 w-5 bg-current transition ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-current transition ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-current transition ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="border-t border-brand-border bg-brand-surface px-4 py-4 md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              <a
                href={phoneLink}
                onClick={closeMenu}
                className="flex items-center gap-3 rounded-lg px-4 py-3 font-semibold text-brand-gold hover:bg-brand-surface-2"
              >
                <Phone size={19} />
                <span>{phoneNumber}</span>
              </a>

              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={closeMenu}
                  className="rounded-lg px-4 py-3 text-brand-text-muted hover:bg-brand-surface-2 hover:text-brand-gold"
                >
                  {item.label}
                </Link>
              ))}

              <Button
                label='Logga in'
                onClick={() => {setIsLoginOpen(true);
                  closeMenu();
                }}
                className="mt-3 w-full border-t border-brand-border pt-4"
              />
            </div>
          </nav>
        )}
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}