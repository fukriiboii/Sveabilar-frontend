import { useCookieConsent } from '../hooks/useCookieConsent';

export function CookieBanner() {
  const { isReady, acceptNecessaryOnly, acceptAll } = useCookieConsent();

  if (!isReady) {
    return null;
  }

  const storedConsent = localStorage.getItem('sveabilar-cookie-consent');

  if (storedConsent) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-border bg-brand-bg p-4 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] sm:p-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-base font-semibold text-brand-text">Vi använder cookies</p>
          <p className="mt-1 text-sm leading-6 text-brand-text-muted">
            Vi använder nödvändiga cookies för att webbplatsen ska fungera. Du kan också välja att
            godkänna valfria cookies för förbättrad användarupplevelse och statistik.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={acceptNecessaryOnly}
            className="rounded-lg border border-brand-border bg-brand-surface-2 px-4 py-2.5 text-sm font-medium text-brand-text transition hover:border-brand-gold"
          >
            Bara nödvändiga
          </button>

          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg bg-brand-gold px-4 py-2.5 text-sm font-semibold text-brand-bg transition hover:opacity-90"
          >
            Godkänn alla
          </button>
        </div>
      </div>
    </div>
  );
}
