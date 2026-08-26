import { useEffect, useState } from 'react';

export type ServiceOption = {
  type: string;
  name: string;
  description: string;
  price: number | null;
  durationMinutes: number;
  available: boolean;
  requiresQuote: boolean;
};

export function useServices() {
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch('/api/services');

        if (!response.ok) {
          throw new Error('Kunde inte hämta tjänster');
        }

        const data = (await response.json()) as ServiceOption[];
        setServices(data);
        setError(null);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Kunde inte hämta tjänster',
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadServices();
  }, []);

  return { services, isLoading, error };
}
