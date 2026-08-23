export type BookingStatus =
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export type ServiceType =
  | 'TIRE_CHANGE';

export type Booking = {
  id: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  serviceType: ServiceType;
  status: BookingStatus;
  createdAt: string;
};

export type CreateBookingRequest = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  availabilityId: number;
  serviceType: ServiceType;
};