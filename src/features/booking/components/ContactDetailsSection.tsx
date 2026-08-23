import { MapPin, UserRound } from 'lucide-react';

import { InputField } from './InputField';

type ContactDetailsSectionProps = {
  customerName: string;
  setCustomerName: (value: string) => void;
  customerPhone: string;
  setCustomerPhone: (value: string) => void;
  customerEmail: string;
  setCustomerEmail: (value: string) => void;
  address: string;
  setAddress: (value: string) => void;
  createError: string | null;
};

export function ContactDetailsSection({
  customerName,
  setCustomerName,
  customerPhone,
  setCustomerPhone,
  customerEmail,
  setCustomerEmail,
  address,
  setAddress,
  createError,
}: ContactDetailsSectionProps) {
  return (
    <>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Kontaktuppgifter
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Dina uppgifter</h3>
      </div>

      <div className="space-y-4">
        <InputField
          label="Namn"
          value={customerName}
          onChange={setCustomerName}
          placeholder="Ditt namn"
          icon={<UserRound size={15} />}
          required
        />

        <InputField
          label="Telefon"
          value={customerPhone}
          onChange={setCustomerPhone}
          placeholder="070-123 45 67"
          type="tel"
          icon={<PhoneIcon />}
          required
        />

        <InputField
          label="E-post"
          value={customerEmail}
          onChange={setCustomerEmail}
          placeholder="namn@example.se"
          type="email"
          icon={<MailIcon />}
          required
        />

        <InputField
          label="Adress"
          value={address}
          onChange={setAddress}
          placeholder="Gatuadress, postnummer och ort"
          icon={<MapPin size={15} />}
          required
        />
      </div>

      {createError && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {createError}
        </div>
      )}
    </>
  );
}

function PhoneIcon() {
  return <span className="inline-flex h-4 w-4 items-center justify-center text-[10px] font-bold">☎</span>;
}

function MailIcon() {
  return <span className="inline-flex h-4 w-4 items-center justify-center text-[10px] font-bold">@</span>;
}
