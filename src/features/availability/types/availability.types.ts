export type AvailabilityStatus =
  | 'AVAILABLE'
  | 'BOOKED';

export type Availability = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  availabilityStatus: AvailabilityStatus;
};

export type AvailabilityTimeRequest = {
  startTime: string;
  endTime: string;
};

export type CreateAvailabilityRequest = {
  date: string;
  times: AvailabilityTimeRequest[];
};

export type DayOfWeek =
  | 'MONDAY'
  | 'TUESDAY'
  | 'WEDNESDAY'
  | 'THURSDAY'
  | 'FRIDAY'
  | 'SATURDAY'
  | 'SUNDAY';

export type CreateAvailabilityScheduleRequest = {
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  daysOfWeek: DayOfWeek[];
};