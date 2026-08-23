import { ArrowLeft, CalendarCheck2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../shared/components/Button';
import CustomerBookingForm from '../components/CustomerBookingForm';

export default function CustomerBookingPage() {
  const navigate = useNavigate();

  function handleBack() {
    navigate('/services');
  }

  return (
    <main className="bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Button
            label="Tillbaka till tjänster"
            variant="primary"
            icon={<ArrowLeft size={16} />}
            onClick={handleBack}
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <CalendarCheck2 size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                Boka tjänst
              </p>

              <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">
                Boka din tjänst
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Välj tjänst, datum och tid. Vi kontaktar dig sedan för att bekräfta bokningen.
          </p>
        </div>

        <CustomerBookingForm />
      </div>
    </main>
  );
}
