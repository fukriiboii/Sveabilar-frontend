import {
  Mail,
  MapPin,
  Phone,
  User,
} from 'lucide-react';

import type { Booking } from '../types/booking.types';

type BookingCustomerCardProps = {
  booking: Booking;
};

export default function BookingCustomerCard({
  booking,
}: BookingCustomerCardProps) {
  return (
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
            Kontaktuppgifter
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <CustomerInfo
          icon={<User size={17} />}
          label="Namn"
          value={booking.customerName}
        />

        <CustomerInfo
          icon={<Mail size={17} />}
          label="E-post"
          value={booking.customerEmail}
        />

        <CustomerInfo
          icon={<Phone size={17} />}
          label="Telefon"
          value={booking.customerPhone}
        />

        <CustomerInfo
          icon={<MapPin size={17} />}
          label="Adress"
          value={booking.address}
        />
      </div>
    </section>
  );
}

type CustomerInfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function CustomerInfo({
  icon,
  label,
  value,
}: CustomerInfoProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 text-brand-gold">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-brand-text">
          {value}
        </p>
      </div>
    </div>
  );
}