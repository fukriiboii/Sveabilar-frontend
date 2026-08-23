import { CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';

import BookingRow from './BookingRow';
import { getTodayBookings } from '../../booking/api/bookingApi';
import type { Booking } from '../../booking/types/booking.types';

export default function TodaySchedule() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodayBookings() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getTodayBookings();

        const sortedBookings = [...data].sort((a, b) =>
          a.startTime.localeCompare(b.startTime),
        );

        setBookings(sortedBookings);
      } catch (error) {
        console.error(error);
        setError('Kunde inte hämta dagens bokningar.');
      } finally {
        setIsLoading(false);
      }
    }

    loadTodayBookings();
  }, []);

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-brand-border bg-brand-surface lg:mt-8">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-brand-border px-4 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays
                size={20}
                className="shrink-0 text-brand-gold"
              />

              <h2 className="text-lg font-semibold text-brand-text">
                Dagens schema
              </h2>
            </div>

            <p className="mt-1 text-sm text-brand-text-muted">
              Dagens bekräftade bokningar
            </p>
          </div>

          <p className="shrink-0 text-right text-sm font-medium capitalize text-brand-text-muted">
            {formatToday()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6">
        {isLoading && (
          <div className="py-10 text-center">
            <p className="text-sm text-brand-text-muted">
              Hämtar dagens schema...
            </p>
          </div>
        )}

        {!isLoading && error && (
          <div className="py-10 text-center">
            <p className="text-sm text-red-600">
              {error}
            </p>
          </div>
        )}

        {!isLoading && !error && bookings.length === 0 && (
          <div className="py-10 text-center">
            <p className="font-medium text-brand-text">
              Inga bokningar idag
            </p>

            <p className="mt-1 text-sm text-brand-text-muted">
              Det finns inga bekräftade bokningar i dagens schema.
            </p>
          </div>
        )}

        {!isLoading && !error && bookings.length > 0 && (
          <div>
            {bookings.map((booking) => (
              <BookingRow
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function formatToday(): string {
  return new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());
}