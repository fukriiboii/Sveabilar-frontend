import { useEffect, useState } from 'react';

import { getAvailableTimes } from '../api/availabilityApi';
import type { Availability } from '../types/availability.types';

type UseAvailableTimesResult = {
  availabilities: Availability[];
  isLoading: boolean;
  error: string | null;
};

export function useAvailableTimes(
  date: string,
): UseAvailableTimesResult {
  const [availabilities, setAvailabilities] = useState<
    Availability[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAvailableTimes() {
      if (!date) {
        setAvailabilities([]);
        setError(null);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const data = await getAvailableTimes(date);

        setAvailabilities(data);
      } catch {
        setAvailabilities([]);
        setError('Kunde inte hämta lediga tider.');
      } finally {
        setIsLoading(false);
      }
    }

    loadAvailableTimes();
  }, [date]);

  return {
    availabilities,
    isLoading,
    error,
  };
}