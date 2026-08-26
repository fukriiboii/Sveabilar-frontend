import { useEffect, useState } from 'react';
import { CalendarDays, Clock, User } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import Button from '../../../shared/components/Button';
import { useAvailableTimes } from '../../availability/hooks/useAvailableTimes';
import { useCreateBooking } from '../hooks/useCreateBooking';
import type {
  CreateBookingRequest,
  ServiceType,
} from '../types/booking.types';

type CreateBookingFormProps = {
  onSuccess?: () => void;
  initialServiceType?: ServiceType;
  heading?: string;
  subheading?: string;
};

export default function CreateBookingForm({
  onSuccess,
  initialServiceType,
  heading = 'Bokningsinformation',
  subheading = 'Välj tjänst, datum och ledig tid',
}: CreateBookingFormProps) {
  const [searchParams] = useSearchParams();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');

  const [date, setDate] = useState('');
  const [availabilityId, setAvailabilityId] = useState<number | null>(
    null,
  );

  const [serviceType, setServiceType] = useState<ServiceType>(
    initialServiceType ??
      ((searchParams.get('service') as ServiceType | null) ?? 'TIRE_CHANGE'),
  );

  const serviceOptions = [
    { type: 'TIRE_CHANGE', name: 'Däckbyte', price: 1290 },
  ];

  const {
    availabilities,
    isLoading: isLoadingTimes,
    error: availabilityError,
  } = useAvailableTimes(date);

  const {
    createBooking,
    isCreating,
    error: createError,
  } = useCreateBooking();

  /*
   * När datum ändras måste den tidigare valda tiden
   * nollställas eftersom den tillhör det gamla datumet.
   */
  useEffect(() => {
    setAvailabilityId(null);
  }, [date]);

  useEffect(() => {
    const paramService = searchParams.get('service') as ServiceType | null;

    if (paramService && paramService !== serviceType) {
      setServiceType(paramService);
    }
  }, [searchParams, serviceType]);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!availabilityId) {
      return;
    }

    const request: CreateBookingRequest = {
      customerName,
      customerEmail,
      customerPhone,
      address,
      availabilityId,
      serviceType,
    };

    const booking = await createBooking(request);

    if (!booking) {
      return;
    }

    onSuccess?.();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Customer information */}
      <section className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue">
            <User size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-brand-text">
              Kundinformation
            </h2>

            <p className="text-sm text-brand-text-muted">
              Ange kundens kontaktuppgifter
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormField
            id="customer-name"
            label="Namn"
            value={customerName}
            onChange={setCustomerName}
            placeholder="Kundens namn"
            required
          />

          <FormField
            id="customer-phone"
            label="Telefon"
            type="tel"
            value={customerPhone}
            onChange={setCustomerPhone}
            placeholder="070-123 45 67"
            required
          />

          <FormField
            id="customer-email"
            label="E-post"
            type="email"
            value={customerEmail}
            onChange={setCustomerEmail}
            placeholder="kund@example.se"
            required
          />

          <div className="sm:col-span-2">
            <FormField
              id="customer-address"
              label="Adress"
              value={address}
              onChange={setAddress}
              placeholder="Gatuadress, postnummer och ort"
              required
            />
          </div>
        </div>
      </section>

      {/* Booking */}
      <section className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-brand-text">
              {heading}
            </h2>

            <p className="text-sm text-brand-text-muted">
              {subheading}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          {/* Service */}
          <div>
            <label
              htmlFor="service-type"
              className="mb-2 block text-sm font-medium text-brand-text"
            >
              Tjänst
            </label>

            <select
              id="service-type"
              value={serviceType}
              onChange={(event) =>
                setServiceType(
                  event.target.value as ServiceType,
                )
              }
              className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-gold"
            >
              {serviceOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="booking-date"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-brand-text"
            >
              <CalendarDays size={16} />
              Datum
            </label>

            <input
              id="booking-date"
              type="date"
              value={date}
              min={getToday()}
              onChange={(event) =>
                setDate(event.target.value)
              }
              required
              className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-gold"
            />
          </div>

          {/* Available times */}
          {date && (
            <div>
              <label className="mb-3 flex items-center gap-2 text-sm font-medium text-brand-text">
                <Clock size={16} />
                Ledig tid
              </label>

              {isLoadingTimes && (
                <p className="text-sm text-brand-text-muted">
                  Hämtar lediga tider...
                </p>
              )}

              {!isLoadingTimes && availabilityError && (
                <p className="text-sm text-red-400">
                  {availabilityError}
                </p>
              )}

              {!isLoadingTimes &&
                !availabilityError &&
                availabilities.length === 0 && (
                  <p className="rounded-lg border border-brand-border bg-brand-surface-2 px-4 py-3 text-sm text-brand-text-muted">
                    Inga lediga tider för valt datum.
                  </p>
                )}

              {!isLoadingTimes &&
                !availabilityError &&
                availabilities.length > 0 && (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {availabilities.map((availability) => {
                      const isSelected =
                        availabilityId === availability.id;

                      return (
                        <button
                          key={availability.id}
                          type="button"
                          onClick={() =>
                            setAvailabilityId(
                              availability.id,
                            )
                          }
                          className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                            isSelected
                              ? 'border-brand-gold bg-brand-gold text-brand-bg'
                              : 'border-brand-border bg-brand-surface-2 text-brand-text hover:border-brand-gold'
                          }`}
                        >
                          <Clock size={16} />

                          {formatTime(
                            availability.startTime,
                          )}
                          {' – '}
                          {formatTime(
                            availability.endTime,
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
            </div>
          )}
        </div>
      </section>

      {/* Error */}
      {createError && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          {createError}
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          label={
            isCreating
              ? 'Skapar bokning...'
              : 'Skapa bokning'
          }
          type="submit"
          disabled={
            isCreating ||
            !availabilityId
          }
        />
      </div>
    </form>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
};

function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-brand-text"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition placeholder:text-brand-text-muted focus:border-brand-gold"
      />
    </div>
  );
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}