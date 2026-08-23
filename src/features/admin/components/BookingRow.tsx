import { MapPin } from 'lucide-react';

import type { AdminBooking } from '../types/admin.types';

type BookingRowProps = {
  booking: AdminBooking;
};

export default function BookingRow({ booking }: BookingRowProps) {
  return (
    <div className="border-b border-brand-border py-5 last:border-b-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* Time */}
        <div className="shrink-0 sm:w-24">
          <p className="text-lg font-semibold text-brand-text">
            {formatTime(booking.startTime)}
          </p>

          <p className="text-sm text-brand-text-muted">
            till {formatTime(booking.endTime)}
          </p>
        </div>

        {/* Booking information */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-brand-text">
            {booking.customerName}
          </p>

          <p className="mt-1 text-sm font-medium text-brand-gold">
            {formatServiceType(booking.serviceType)}
          </p>

          <div className="mt-2 flex items-start gap-2 text-sm text-brand-text-muted">
            <MapPin
              size={16}
              className="mt-0.5 shrink-0"
            />

            <span className="break-words">
              {booking.address}
            </span>
          </div>
        </div>

        {/* Status */}
        <BookingStatus status={booking.status} />
      </div>
    </div>
  );
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

function formatServiceType(
  serviceType: AdminBooking['serviceType'],
): string {
  const serviceLabels: Record<
    AdminBooking['serviceType'],
    string
  > = {
    TIRE_CHANGE: 'Däckbyte',
  };

  return serviceLabels[serviceType] ?? serviceType;
}

function BookingStatus({
  status,
}: {
  status: AdminBooking['status'];
}) {
  const statusConfig: Record<
    AdminBooking['status'],
    {
      label: string;
      className: string;
    }
  > = {
    CONFIRMED: {
      label: 'Bekräftad',
      className: 'bg-green-100 text-green-700',
    },

    CANCELLED: {
      label: 'Avbokad',
      className: 'bg-red-100 text-red-700',
    },

    COMPLETED: {
      label: 'Slutförd',
      className: 'bg-blue-100 text-blue-700',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}