import { useCallback, useEffect, useState } from 'react';

import {
  deleteAvailability,
  getAllAvailabilities,
} from '../api/adminAvailabilityApi';

import type { Availability } from '../types/availability.types';

type UseAvailabilitiesResult = {
  availabilities: Availability[];
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  remove: (id: number) => Promise<boolean>;
};

export function useAvailabilities(): UseAvailabilitiesResult {
  const [availabilities, setAvailabilities] = useState<
    Availability[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const loadAvailabilities = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getAllAvailabilities();

      const sorted = [...data].sort((a, b) => {
        const dateTimeA = `${a.date}T${a.startTime}`;
        const dateTimeB = `${b.date}T${b.startTime}`;

        return dateTimeA.localeCompare(dateTimeB);
      });

      setAvailabilities(sorted);
    } catch {
      setError('Kunde inte hämta tillgängligheten.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAvailabilities();
  }, [loadAvailabilities]);

  async function remove(id: number): Promise<boolean> {
    try {
      setError(null);

      await deleteAvailability(id);

      setAvailabilities((current) =>
        current.filter(
          (availability) => availability.id !== id,
        ),
      );

      return true;
    } catch {
      setError('Kunde inte ta bort tiden.');
      return false;
    }
  }

  return {
    availabilities,
    isLoading,
    error,
    reload: loadAvailabilities,
    remove,
  };
}