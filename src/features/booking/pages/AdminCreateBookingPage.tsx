import { ArrowLeft, CalendarPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/Button';
import CreateBookingForm from '../components/CreateBookingForm';

export default function AdminCreateBookingPage() {
  const navigate = useNavigate();

  function handleBack() {
    navigate('/admin/bookings');
  }

  function handleSuccess() {
    navigate('/admin/bookings');
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Back */}
        <div className="mb-6">
          <Button
            label="Tillbaka till bokningar"
            variant="ghost"
            icon={<ArrowLeft size={16} />}
            onClick={handleBack}
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
              <CalendarPlus size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-gold">
                Admin
              </p>

              <h1 className="text-2xl font-semibold text-brand-text sm:text-3xl">
                Skapa bokning
              </h1>
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-brand-text-muted sm:text-base">
            Skapa en bokning åt en kund genom att ange kundens
            uppgifter och välja en ledig tid.
          </p>
        </div>

        {/* Form */}
        <CreateBookingForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
}