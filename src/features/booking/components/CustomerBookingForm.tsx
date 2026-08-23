import { Check } from 'lucide-react';

import Button from '../../../shared/components/Button';
import { BookingCalendar } from './BookingCalendar';
import { BookingServiceSection } from './BookingServiceSection';
import { ContactDetailsSection } from './ContactDetailsSection';
import { useCustomerBookingForm } from '../hooks/useCustomerBookingForm';

export default function CustomerBookingForm() {
  const {
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    customerPhone,
    setCustomerPhone,
    address,
    setAddress,
    selectedDate,
    setSelectedDate,
    availabilityId,
    setAvailabilityId,
    tireSize,
    setTireSize,
    serviceType,
    setServiceType,
    bookingConfirmed,
    currentMonth,
    isLoadingMonth,
    monthError,
    futureMonthAvailabilities,
    dayAvailabilities,
    isLoadingTimes,
    availabilityError,
    createError,
    isCreating,
    activePrice,
    selectedTireSize,
    estimatedTotalPrice,
    serviceLabels,
    tireSizeOptions,
    handleSubmit,
    goToPreviousMonth,
    goToNextMonth,
    isMonthBeforeToday,
  } = useCustomerBookingForm();

  if (bookingConfirmed) {
    return (
      <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check size={28} />
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Bokning mottagen
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Tack för din bokning</h2>
        <p className="mt-3 text-sm text-slate-600">
          Vi har tagit emot din bokningsförfrågan och kontaktar dig så snart vi bekräftat tiden.
        </p>

        <div className="mt-6">
          <Button
            label="Tillbaka till tjänster"
            type="button"
            onClick={() => window.location.assign('/services')}
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isLoadingMonth && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
          Hämtar tillgängliga datum...
        </div>
      )}

      {!isLoadingMonth && monthError && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {monthError}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Tjänst
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                {serviceLabels[serviceType]}
              </h2>
            </div>

            <div className="rounded-2xl bg-slate-100 px-3 py-2 text-right">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Från
              </p>
              <p className="text-xl font-bold text-slate-900">{activePrice} kr</p>
            </div>
          </div>

          <div className="space-y-5">
            <BookingServiceSection
              serviceType={serviceType}
              setServiceType={setServiceType}
              tireSize={tireSize}
              setTireSize={setTireSize}
              activePrice={activePrice}
              selectedTireSize={selectedTireSize}
              estimatedTotalPrice={estimatedTotalPrice}
              tireSizeOptions={tireSizeOptions}
            />

            <BookingCalendar
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              futureMonthAvailabilities={futureMonthAvailabilities}
              dayAvailabilities={dayAvailabilities}
              isLoadingTimes={isLoadingTimes}
              availabilityError={availabilityError}
              availabilityId={availabilityId}
              setAvailabilityId={setAvailabilityId}
              onPreviousMonth={goToPreviousMonth}
              onNextMonth={goToNextMonth}
              isMonthBeforeToday={isMonthBeforeToday}
            />
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <ContactDetailsSection
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            address={address}
            setAddress={setAddress}
            createError={createError}
          />

          <div className="mt-6">
            <Button
              label={isCreating ? 'Skapar bokning...' : 'Skicka bokningsförfrågan'}
              type="submit"
              disabled={isCreating || !availabilityId}
            />
          </div>
        </section>
      </div>
    </form>
  );
}

