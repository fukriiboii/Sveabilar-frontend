import { useEffect, useState } from 'react';

import { getBookings } from '../api/bookingApi';
import type {
  Booking,
  BookingStatus,
} from '../types/booking.types';

type UseBookingsResult = {
  bookings: Booking[];
  date: string;
  status: BookingStatus | '';
  isLoading: boolean;
  error: string | null;
  setDate: (date: string) => void;
  setStatus: (status: BookingStatus | '') => void;
  resetFilters: () => void;
};

export function useBookings(): UseBookingsResult {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<BookingStatus | ''>('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getBookings({
          date: date || undefined,
          status: status || undefined,
        });

        setBookings(data);
      } catch {
        setError('Kunde inte hämta bokningarna.');
      } finally {
        setIsLoading(false);
      }
    }

    loadBookings();
  }, [date, status]);

  function resetFilters() {
    setDate('');
    setStatus('');
  }

  return {
    bookings,
    date,
    status,
    isLoading,
    error,
    setDate,
    setStatus,
    resetFilters,
  };
}