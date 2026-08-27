import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import type { Booking } from '../types/booking.types';

type BookingTableProps = {
  bookings: Booking[];
};

export default function BookingTable({
  bookings,
}: BookingTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px]">
        <thead>
          <tr className="border-b border-brand-border text-left">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Kund
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Tjänst
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Datum
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Tid
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Adress
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <BookingTableRow
              key={booking.id}
              booking={booking}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BookingTableRow({
  booking,
}: {
  booking: Booking;
}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/admin/bookings/${booking.id}`);
  }

  return (
    <tr
      onClick={handleClick}
      className="cursor-pointer border-b border-brand-border transition-colors hover:bg-white/[0.03] last:border-b-0"
    >
      {/* Customer */}
      <td className="px-6 py-5">
        <div>
          <p className="font-semibold text-brand-text">
            {booking.customerName}
          </p>

          <p className="mt-1 text-sm text-brand-text-muted">
            {booking.customerPhone}
          </p>
        </div>
      </td>

      {/* Service */}
      <td className="px-6 py-5">
        <span className="text-sm font-medium text-brand-gold">
          {formatServiceType(booking.serviceType)}
        </span>
      </td>

      {/* Date */}
      <td className="px-6 py-5">
        <span className="text-sm text-brand-text">
          {formatDate(booking.bookingDate)}
        </span>
      </td>

      {/* Time */}
      <td className="px-6 py-5">
        <div className="text-sm text-brand-text">
          {formatTime(booking.startTime)}
          {' – '}
          {formatTime(booking.endTime)}
        </div>
      </td>

      {/* Address */}
      <td className="max-w-[220px] px-6 py-5">
        <div className="flex items-start gap-2">
          <MapPin
            size={16}
            className="mt-0.5 shrink-0 text-brand-text-muted"
          />

          <span className="truncate text-sm text-brand-text-muted">
            {booking.address}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <BookingStatus status={booking.status} />
      </td>
    </tr>
  );
}

function formatServiceType(
  serviceType: Booking['serviceType'],
): string {
  const serviceLabels: Record<
    Booking['serviceType'],
    string
  > = {
    TIRE_CHANGE: 'Däckskifte',
    HEADLIGHT_REPAIR: 'Strålkastare',
    CAR_SERVICE: 'Bilservice',
    CAR_TRANSPORT: 'Biltransport',
    MINOR_REPAIRS: 'Mindre reparationer',
  };

  return serviceLabels[serviceType] ?? serviceType;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

function BookingStatus({
  status,
}: {
  status: Booking['status'];
}) {
  const statusConfig: Record<
    Booking['status'],
    {
      label: string;
      className: string;
    }
  > = {
    CONFIRMED: {
      label: 'Bekräftad',
      className: 'bg-green-400/10 text-green-400',
    },

    CANCELLED: {
      label: 'Avbokad',
      className: 'bg-red-400/10 text-red-400',
    },

    COMPLETED: {
      label: 'Slutförd',
      className: 'bg-brand-blue/10 text-brand-blue-strong',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}