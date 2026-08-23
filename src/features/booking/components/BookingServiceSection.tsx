import { Check } from 'lucide-react';

import { PriceSummaryBlock } from './PriceSummaryBlock';

type TireSizeOption = 'UP_TO_17' | '18_TO_20' | '21_TO_22';

type TireSizeOptionConfig = {
  value: TireSizeOption;
  label: string;
  extra: number;
};

type BookingServiceSectionProps = {
  serviceType: 'TIRE_CHANGE';
  setServiceType: (value: 'TIRE_CHANGE') => void;
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
  tireSize,
  setTireSize,
  activePrice,
  selectedTireSize,
  estimatedTotalPrice,
  tireSizeOptions,
}: BookingServiceSectionProps) {
  return (
    <>
      <label className="block">
        <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
          <Check size={14} />
          Välj tjänst
        </span>

        <select
          value={serviceType}
          onChange={(event) => setServiceType(event.target.value as 'TIRE_CHANGE')}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-800 outline-none transition focus:border-slate-400"
        >
          <option value="TIRE_CHANGE">Däckbyte</option>
        </select>
      </label>

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
        />
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Distanspris</p>

        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>• Inom 10 km ingår i priset</li>
          <li>• 10–20 km: +100 kr</li>
          <li>• 20–30 km: +200 kr</li>
        </ul>
      </div>
    </>
  );
}