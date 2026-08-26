import { apiClient } from '../../../shared/api/apiClient';
import type {
  Booking,
  BookingPage,
  BookingStatus,
  CreateBookingRequest,
} from '../types/booking.types';

type GetBookingsParams = {
  date?: string;
  status?: BookingStatus;
  page?: number;
  size?: number;
};

export async function getBookings(
  params?: GetBookingsParams,
): Promise<BookingPage> {
  const searchParams = new URLSearchParams();

  if (params?.date) {
    searchParams.set('date', params.date);
  }

  if (params?.status) {
    searchParams.set('status', params.status);
  }

  if (params?.page !== undefined) {
    searchParams.set('page', String(params.page));
  }

  if (params?.size !== undefined) {
    searchParams.set('size', String(params.size));
  }

  const query = searchParams.toString();

  return apiClient<BookingPage>(
    `/api/admin/bookings${query ? `?${query}` : ''}`,
  );
}

export async function getTodayBookings(): Promise<Booking[]> {
  const today = new Date().toISOString().split('T')[0];

  const page = await getBookings({
    date: today,
    status: 'CONFIRMED',
    page: 0,
    size: 100,
  });

  return page.content;
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