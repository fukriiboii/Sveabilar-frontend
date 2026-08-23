import { useEffect, useState } from 'react';

export type CookieConsentPreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
};

const STORAGE_KEY = 'sveabilar-cookie-consent';

const defaultPreferences: CookieConsentPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
};

export function useCookieConsent() {
  const [preferences, setPreferences] = useState<CookieConsentPreferences>(defaultPreferences);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setPreferences(defaultPreferences);
      setIsReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<CookieConsentPreferences>;
      setPreferences({
        necessary: true,
        functional: Boolean(parsed.functional),
        analytics: Boolean(parsed.analytics),
      });
    } catch {
      setPreferences(defaultPreferences);
    } finally {
      setIsReady(true);
    }
  }, []);

  function savePreferences(nextPreferences: CookieConsentPreferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
  }

  function acceptNecessaryOnly() {
    const nextPreferences: CookieConsentPreferences = {
      necessary: true,
      functional: false,
      analytics: false,
    };

    savePreferences(nextPreferences);
  }

  function acceptAll() {
    const nextPreferences: CookieConsentPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
    };

    savePreferences(nextPreferences);
  }

  const hasUserConsent = Boolean(preferences.functional || preferences.analytics);

  return {
    preferences,
    isReady,
    hasUserConsent,
    acceptNecessaryOnly,
    acceptAll,
  };
}
