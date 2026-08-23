type PriceSummaryBlockProps = {
  basePrice: number;
  extraPrice: number;
  totalPrice: number;
};

export function PriceSummaryBlock({
  basePrice,
  extraPrice,
  totalPrice,
}: PriceSummaryBlockProps) {
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white px-3 py-3">
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Grundpris</span>
        <span>{basePrice} kr</span>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
        <span>Extra för däckstorlek</span>
        <span>+ {extraPrice} kr</span>
      </div>

      <div className="mt-3 border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
        <div className="flex items-center justify-between">
          <span>Beräknat pris</span>
          <span>{totalPrice} kr</span>
        </div>
      </div>
    </div>
  );
}