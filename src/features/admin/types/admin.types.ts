
import type { Booking } from '../../booking/types/booking.types';

export type AdminBooking = Booking;

export type DashboardStats = {
  totalBookings: number;
  todayBookings: number;
  upcomingBookings: number;
  availableTimes: number;
};