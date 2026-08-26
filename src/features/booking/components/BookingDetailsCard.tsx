import {
  CalendarDays,
  Clock,
  Wrench,
} from 'lucide-react';

import type { Booking } from '../types/booking.types';

type BookingDetailsCardProps = {
  booking: Booking;
};

export default function BookingDetailsCard({
  booking,
}: BookingDetailsCardProps) {
  return (
    <section className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
          <Wrench size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-brand-text">
            Bokningsinformation
          </h2>

          <p className="text-sm text-brand-text-muted">
            Information om tjänsten
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <BookingInfo
          icon={<Wrench size={17} />}
          label="Tjänst"
          value={formatServiceType(booking.serviceType)}
        />

        <BookingInfo
          icon={<CalendarDays size={17} />}
          label="Datum"
          value={formatDate(booking.bookingDate)}
        />

        <BookingInfo
          icon={<Clock size={17} />}
          label="Tid"
          value={`${formatTime(booking.startTime)} – ${formatTime(
            booking.endTime,
          )}`}
        />

        <BookingInfo
          label="Status"
          value={formatBookingStatus(booking.status)}
          valueClassName={getStatusClassName(booking.status)}
        />
      </div>
    </section>
  );
}

type BookingInfoProps = {
  icon?: React.ReactNode;
  label: string;
  value: string;
  valueClassName?: string;
};

function BookingInfo({
  icon,
  label,
  value,
  valueClassName = 'text-brand-text',
}: BookingInfoProps) {
  return (
    <div className="flex items-start gap-3">
      {icon && (
        <div className="mt-0.5 shrink-0 text-brand-gold">
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
          {label}
        </p>

        <p
          className={`mt-1 text-sm font-semibold ${valueClassName}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function formatServiceType(
  serviceType: Booking['serviceType'],
): string {
  const serviceLabels: Record<
    Booking['serviceType'],
    string
  > = {
    TIRE_CHANGE: 'Däckbyte',
    HEADLIGHT_REPAIR: 'Strålkastare',
    CAR_SERVICE: 'Bilservice',
  };

  return serviceLabels[serviceType] ?? serviceType;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

function formatBookingStatus(
  status: Booking['status'],
): string {
  const statusLabels: Record<
    Booking['status'],
    string
  > = {
    CONFIRMED: 'Bekräftad',
    CANCELLED: 'Avbokad',
    COMPLETED: 'Slutförd',
  };

  return statusLabels[status] ?? status;
}

function getStatusClassName(
  status: Booking['status'],
): string {
  const statusClasses: Record<
    Booking['status'],
    string
  > = {
    CONFIRMED: 'text-green-400',
    CANCELLED: 'text-red-400',
    COMPLETED: 'text-brand-blue-strong',
  };

  return statusClasses[status] ?? 'text-brand-text';
}