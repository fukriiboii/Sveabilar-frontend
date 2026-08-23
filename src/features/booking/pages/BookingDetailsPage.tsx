import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/Button';
import { cancelBooking } from '../api/bookingApi';
import BookingCustomerCard from '../components/BookingCustomerCard';
import BookingDetailsCard from '../components/BookingDetailsCard';
import { useBooking } from '../hooks/useBooking';

export default function BookingDetailsPage() {
  const navigate = useNavigate();

  const {
    booking,
    isLoading,
    error,
    reload,
  } = useBooking();

  const [isCancelling, setIsCancelling] =
    useState(false);
  const [cancelError, setCancelError] =
    useState<string | null>(null);

  function handleBack() {
    navigate('/admin/bookings');
  }

  async function handleCancelBooking() {
    if (!booking) {
      return;
    }

    try {
      setIsCancelling(true);
      setCancelError(null);

      await cancelBooking(booking.id);
      await reload();
    } catch {
      setCancelError(
        'Kunde inte avbryta bokningen. Försök igen.',
      );
    } finally {
      setIsCancelling(false);
    }
  }

  if (isLoading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-brand-border bg-brand-surface p-8 text-center">
            <p className="text-sm text-brand-text-muted">
              Hämtar bokning...
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !booking) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={handleBack}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted transition-colors hover:text-brand-text"
          >
            <ArrowLeft size={16} />
            Tillbaka till bokningar
          </button>

          <div className="rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center">
            <p className="font-semibold text-brand-text">
              Kunde inte hämta bokningen
            </p>

            <p className="mt-2 text-sm text-brand-text-muted">
              {error ?? 'Bokningen kunde inte hittas.'}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={handleBack}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted transition-colors hover:text-brand-text"
        >
          <ArrowLeft size={16} />
          Tillbaka till bokningar
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
            Bokning #{booking.id}
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-brand-text sm:text-3xl">
            {booking.customerName}
          </h1>

          <p className="mt-2 text-sm text-brand-text-muted">
            Detaljer för bokningen
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <BookingDetailsCard booking={booking} />

          <BookingCustomerCard booking={booking} />
        </div>

        {booking.status === 'CONFIRMED' && (
          <div className="mt-6 flex justify-start">
            <Button
              label={
                isCancelling
                  ? 'Avbryter...'
                  : 'Avbryt bokning'
              }
              variant="ghost"
              onClick={handleCancelBooking}
              disabled={isCancelling}
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            />
          </div>
        )}

        {cancelError && (
          <p className="mt-4 text-sm text-red-400">
            {cancelError}
          </p>
        )}
      </div>
    </main>
  );
}