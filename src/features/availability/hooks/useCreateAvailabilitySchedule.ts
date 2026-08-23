import { useState } from 'react';

import { createAvailabilitySchedule } from '../api/adminAvailabilityApi';
import type {
  Availability,
  CreateAvailabilityScheduleRequest,
} from '../types/availability.types';

type UseCreateAvailabilityScheduleResult = {
  createSchedule: (
    request: CreateAvailabilityScheduleRequest,
  ) => Promise<Availability[] | null>;
  isCreating: boolean;
  error: string | null;
};

export function useCreateAvailabilitySchedule(): UseCreateAvailabilityScheduleResult {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createSchedule(
    request: CreateAvailabilityScheduleRequest,
  ): Promise<Availability[] | null> {
    try {
      setIsCreating(true);
      setError(null);

      const availabilities =
        await createAvailabilitySchedule(request);

      return availabilities;
    } catch {
      setError('Kunde inte skapa tillgängligheten.');
      return null;
    } finally {
      setIsCreating(false);
    }
  }

  return {
    createSchedule,
    isCreating,
    error,
  };
}