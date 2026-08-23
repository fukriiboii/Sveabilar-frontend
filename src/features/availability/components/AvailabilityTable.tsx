import { Trash2 } from 'lucide-react';

import type { Availability } from '../types/availability.types';

type AvailabilityTableProps = {
  availabilities: Availability[];
  onDelete: (id: number) => void;
};

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('sv-SE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${date}T00:00:00`));
}

function getWeekday(date: string): string {
  return new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long',
  }).format(new Date(`${date}T00:00:00`));
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

export default function AvailabilityTable({
  availabilities,
  onDelete,
}: AvailabilityTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[700px] text-left">
        <thead>
          <tr className="border-b border-brand-border">
            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Datum
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Dag
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Tid
            </th>

            <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Status
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Åtgärd
            </th>
          </tr>
        </thead>

        <tbody>
          {availabilities.map((availability) => {
            const isBooked =
              availability.availabilityStatus === 'BOOKED';

            return (
              <tr
                key={availability.id}
                className="border-b border-brand-border last:border-b-0"
              >
                <td className="px-6 py-4">
                  <span className="text-sm font-medium capitalize text-brand-text">
                    {formatDate(availability.date)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm capitalize text-brand-text-muted">
                    {getWeekday(availability.date)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-brand-text">
                    {formatTime(availability.startTime)}
                    {' – '}
                    {formatTime(availability.endTime)}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      isBooked
                        ? 'bg-red-400/10 text-red-300'
                        : 'bg-green-400/10 text-green-300'
                    }`}
                  >
                    {isBooked ? 'Bokad' : 'Ledig'}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  {!isBooked && (
                    <button
                      type="button"
                      onClick={() => onDelete(availability.id)}
                      className="inline-flex items-center gap-2 rounded-lg border border-brand-border px-3 py-2 text-xs font-semibold text-brand-text-muted transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
                    >
                      <Trash2 size={15} />
                      Ta bort
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}