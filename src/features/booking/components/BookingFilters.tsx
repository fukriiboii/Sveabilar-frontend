import { RotateCcw } from 'lucide-react';

import type { BookingStatus } from '../types/booking.types';

type BookingFiltersProps = {
    date: string;
    status: BookingStatus | '';
    onDateChange: (date: string) => void;
    onStatusChange: (status: BookingStatus | '') => void;
    onReset: () => void;
};

export default function BookingFilters({
    date,
    status,
    onDateChange,
    onStatusChange,
    onReset,
}: BookingFiltersProps) {
    return (
        <div className="rounded-2xl border border-brand-border bg-brand-surface p-4 sm:p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
                {/* Date */}
                <div>
                    <label
                        htmlFor="booking-date"
                        className="mb-2 block text-sm font-medium text-brand-text"
                    >
                        Datum
                    </label>

                    <input
                        id="booking-date"
                        type="date"
                        value={date}
                        onChange={(event) => onDateChange(event.target.value)}
                        className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-gold"
                    />
                </div>

                {/* Status */}
                <div>
                    <label
                        htmlFor="booking-status"
                        className="mb-2 block text-sm font-medium text-brand-text"
                    >
                        Status
                    </label>

                    <select
                        id="booking-status"
                        value={status}
                        onChange={(event) =>
                            onStatusChange(
                                event.target.value as BookingStatus | '',
                            )
                        }
                        className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-gold"
                    >
                        <option value="">Alla statusar</option>
                        <option value="CONFIRMED">Bekräftade</option>
                        <option value="CANCELLED">Avbokade</option>
                        <option value="COMPLETED">Slutförda</option>
                    </select>
                </div>

                {/* Reset */}
                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex items-center justify-center gap-2 border border-brand-border bg-transparent px-5 py-3 text-sm font-semibold text-brand-text transition hover:bg-white/5"
                >
                    <RotateCcw size={16} />
                    Återställ
                </button>
            </div>
        </div>
    );
}