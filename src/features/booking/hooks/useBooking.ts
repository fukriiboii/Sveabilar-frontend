import { useEffect, useState } from "react";
import { getBookingById } from "../api/bookingApi";
import type { Booking } from "../types/booking.types";
import { useParams } from "react-router-dom";

type UseBookingResult = {
  booking: Booking | null;
  isLoading: boolean;
  error: string | null;
  reload: () => Promise<void>;
};

export function useBooking(): UseBookingResult {
  const { id } = useParams<{ id: string }>();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadBooking() {
    if (!id) {
      setError('Ogiltigt boknings-ID.');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const bookingId = Number(id);

      if (Number.isNaN(bookingId)) {
        setError('Ogiltigt boknings-ID.');
        return;
      }

      const data = await getBookingById(bookingId);
      setBooking(data);
    } catch {
      setError('Kunde inte hämta bokningen.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadBooking();
  }, [id]);

  return {
    booking,
    isLoading,
    error,
    reload: loadBooking,
  };
}