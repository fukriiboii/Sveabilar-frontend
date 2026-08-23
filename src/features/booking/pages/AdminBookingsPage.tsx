import {
  CalendarDays,
  Clock3,
  Plus,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/Button';
import BookingFilters from '../components/BookingFilters';
import BookingTable from '../components/BookingTable';
import { useBookings } from '../hooks/useBookings';

export default function AdminBookingsPage() {
  const navigate = useNavigate();

  const {
    bookings,
    date,
    status,
    isLoading,
    error,
    setDate,
    setStatus,
    resetFilters,
  } = useBookings();

  function handleCreateBooking() {
    navigate('/admin/bookings/new');
  }

  function handleManageAvailability() {
    navigate('/admin/availability');
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <CalendarDays
              size={24}
              className="text-brand-gold"
            />

            <h1 className="text-2xl font-semibold text-brand-text sm:text-3xl">
              Bokningar
            </h1>
          </div>

          <p className="mt-2 text-sm text-brand-text-muted sm:text-base">
            Hantera och överblicka alla bokningar.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            label="Tillgänglighet"
            variant="secondary"
            icon={<Clock3 size={18} />}
            onClick={handleManageAvailability}
          />

          <Button
            label="Skapa bokning"
            icon={<Plus size={18} />}
            onClick={handleCreateBooking}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6">
        <BookingFilters
          date={date}
          status={status}
          onDateChange={setDate}
          onStatusChange={setStatus}
          onReset={resetFilters}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Bookings */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-brand-border bg-brand-surface">
        {/* Loading */}
        {isLoading && (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-brand-text-muted">
              Hämtar bokningar...
            </p>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !error && bookings.length === 0 && (
          <div className="px-6 py-12 text-center">
            <p className="font-medium text-brand-text">
              Inga bokningar hittades
            </p>

            <p className="mt-1 text-sm text-brand-text-muted">
              Försök ändra dina filter.
            </p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !error && bookings.length > 0 && (
          <>
            <div className="border-b border-brand-border px-6 py-4">
              <p className="text-sm text-brand-text-muted">
                {bookings.length}{' '}
                {bookings.length === 1
                  ? 'bokning'
                  : 'bokningar'}
              </p>
            </div>

            <BookingTable bookings={bookings} />
          </>
        )}
      </div>
    </div>
  );
}
