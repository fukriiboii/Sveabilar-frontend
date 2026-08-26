import { Check } from 'lucide-react';

import type { ServiceType } from '../types/booking.types';
import { PriceSummaryBlock } from './PriceSummaryBlock';

type TireSizeOption = 'UP_TO_17' | '18_TO_20' | '21_TO_22';

type TireSizeOptionConfig = {
  value: TireSizeOption;
  label: string;
  extra: number;
};

type BookingServiceOption = {
  type: string;
  name: string;
  price: number;
};

type BookingServiceSectionProps = {
  serviceType: ServiceType;
  setServiceType: (value: ServiceType) => void;
  serviceOptions: BookingServiceOption[];
  tireSize: TireSizeOption;
  setTireSize: (value: TireSizeOption) => void;
  activePrice: number;
  selectedTireSize: TireSizeOptionConfig;
  estimatedTotalPrice: number;
  tireSizeOptions: readonly TireSizeOptionConfig[];
};

export function BookingServiceSection({
  serviceType,
  setServiceType,
  serviceOptions,
  tireSize,
  setTireSize,
  activePrice,
  selectedTireSize,
  estimatedTotalPrice,
  tireSizeOptions,
}: BookingServiceSectionProps) {
  const isTireChangeService = serviceType === 'TIRE_CHANGE';

  return (
    <>
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <Check size={14} />
          Välj tjänst
        </span>

        <select
          value={serviceType}
          onChange={(event) => setServiceType(event.target.value as ServiceType)}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
        >
          {serviceOptions.map((option) => (
            <option key={option.type} value={option.type}>
              {option.name}
            </option>
          ))}
        </select>
      </label>

      {isTireChangeService && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="mb-3 text-sm font-medium text-slate-700">Däckstorlek</p>

          <select
            value={tireSize}
            onChange={(event) => setTireSize(event.target.value as TireSizeOption)}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
          >
            {tireSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <PriceSummaryBlock
            basePrice={activePrice}
            extraPrice={selectedTireSize.extra}
            totalPrice={estimatedTotalPrice}
            showExtraLine={true}
          />
        </div>
      )}

      {!isTireChangeService && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <PriceSummaryBlock
            basePrice={activePrice}
            extraPrice={0}
            totalPrice={estimatedTotalPrice}
            extraLabel="Tillägg"
            showExtraLine={false}
          />
        </div>
      )}

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Distanspris (gäller alla tjänster)</p>

        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Inom 15 km ingår i priset</li>
          <li>• 15–25 km: +100 kr</li>
          <li>• 25–35 km: +150 kr</li>
        </ul>
      </div>
    </>
  );
}