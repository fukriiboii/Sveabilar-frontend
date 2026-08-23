import { useState } from 'react';

import { createBooking } from '../api/bookingApi';
import type {
  Booking,
  CreateBookingRequest,
} from '../types/booking.types';

type UseCreateBookingResult = {
  createBooking: (
    request: CreateBookingRequest,
  ) => Promise<Booking | null>;
  isCreating: boolean;
  error: string | null;
};

export function useCreateBooking(): UseCreateBookingResult {
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreateBooking(
    request: CreateBookingRequest,
  ): Promise<Booking | null> {
    try {
      setIsCreating(true);
      setError(null);

      const booking = await createBooking(request);

      return booking;
    } catch {
      setError('Kunde inte skapa bokningen.');
      return null;
    } finally {
      setIsCreating(false);
    }
  }

  return {
    createBooking: handleCreateBooking,
    isCreating,
    error,
  };
}