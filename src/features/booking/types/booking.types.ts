export type BookingStatus =
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export type ServiceType =
  | 'TIRE_CHANGE'
  | 'HEADLIGHT_REPAIR'
  | 'CAR_SERVICE'
  | 'CAR_TRANSPORT'
  | 'MINOR_REPAIRS';

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

export type BookingPage = {
  content: Booking[];
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

export type CreateBookingRequest = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  availabilityId: number;
  serviceType: ServiceType;
  termsAccepted?: boolean;
};