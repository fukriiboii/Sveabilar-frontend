import { useCallback, useEffect, useState } from 'react';

import { getAvailabilitiesBetween } from '../api/availabilityApi';
import type { Availability } from '../types/availability.types';

type UseAvailabilityMonthResult = {
  availabilities: Availability[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

function formatDate(date: Date): string {
  const year = date.getFullYear();

  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0');

  const day = String(
    date.getDate(),
  ).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function useAvailabilityMonth(
  year: number,
  month: number,
): UseAvailabilityMonthResult {
  const [availabilities, setAvailabilities] =
    useState<Availability[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const loadAvailabilities = useCallback(
    async () => {
      try {
        setIsLoading(true);
        setError(null);

        const startDate = new Date(
          year,
          month,
          1,
        );

        const endDate = new Date(
          year,
          month + 1,
          0,
        );

        const result =
          await getAvailabilitiesBetween(
            formatDate(startDate),
            formatDate(endDate),
          );

        setAvailabilities(result);
      } catch {
        setError(
          'Kunde inte hämta tillgängligheten.',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [year, month],
  );

  useEffect(() => {
    loadAvailabilities();
  }, [loadAvailabilities]);

  return {
    availabilities,
    isLoading,
    error,
    reload: loadAvailabilities,
  };
}