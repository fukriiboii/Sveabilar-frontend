import { apiClient } from '../../../shared/api/apiClient';
import type {
  Booking,
  BookingStatus,
  CreateBookingRequest,
} from '../types/booking.types';

type GetBookingsParams = {
  date?: string;
  status?: BookingStatus;
};

export async function getBookings(
  params?: GetBookingsParams,
): Promise<Booking[]> {
  const searchParams = new URLSearchParams();

  if (params?.date) {
    searchParams.set('date', params.date);
  }

  if (params?.status) {
    searchParams.set('status', params.status);
  }

  const query = searchParams.toString();

  return apiClient<Booking[]>(
    `/api/admin/bookings${query ? `?${query}` : ''}`,
  );
}

export async function getTodayBookings(): Promise<Booking[]> {
  const today = new Date().toISOString().split('T')[0];

  return getBookings({
    date: today,
    status: 'CONFIRMED',
  });
}

export async function getBookingById(
  id: number,
): Promise<Booking> {
  return apiClient<Booking>(
    `/api/admin/bookings/${id}`,
  );
}

export async function createBooking(
  request: CreateBookingRequest,
): Promise<Booking> {
  return apiClient<Booking>(
    '/api/bookings',
    {
      method: 'POST',
      body: JSON.stringify(request),
    },
  );
}

export async function cancelBooking(id: number,): Promise<void> {
  await apiClient<void> (`/api/admin/bookings/${id}/cancel`, { method: 'PATCH'},); 
}