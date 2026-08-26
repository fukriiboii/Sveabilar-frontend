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
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isLoading: boolean;
  error: string | null;
  setDate: (date: string) => void;
  setStatus: (status: BookingStatus | '') => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
  resetFilters: () => void;
};

const PAGE_SIZE = 10;

export function useBookings(): UseBookingsResult {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<BookingStatus | ''>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

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
          page: currentPage,
          size: PAGE_SIZE,
        });

        setBookings(data.content);
        setTotalPages(data.totalPages);
        setTotalElements(data.totalElements);
      } catch {
        setError('Kunde inte hämta bokningarna.');
      } finally {
        setIsLoading(false);
      }
    }

    loadBookings();
  }, [date, status, currentPage]);

  function handleDateChange(nextDate: string) {
    setDate(nextDate);
    setCurrentPage(0);
  }

  function handleStatusChange(nextStatus: BookingStatus | '') {
    setStatus(nextStatus);
    setCurrentPage(0);
  }

  function goToPreviousPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }

  function goToNextPage() {
    setCurrentPage((prev) => {
      if (totalPages === 0) {
        return prev;
      }

      return Math.min(prev + 1, totalPages - 1);
    });
  }

  function resetFilters() {
    setDate('');
    setStatus('');
    setCurrentPage(0);
  }

  return {
    bookings,
    date,
    status,
    currentPage,
    totalPages,
    totalElements,
    pageSize: PAGE_SIZE,
    isLoading,
    error,
    setDate: handleDateChange,
    setStatus: handleStatusChange,
    goToPreviousPage,
    goToNextPage,
    resetFilters,
  };
}