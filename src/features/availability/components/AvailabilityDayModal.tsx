import {
  X,
  Clock3,
  LockKeyhole,
  Trash2,
} from 'lucide-react';

import type { Availability } from '../types/availability.types';

type AvailabilityDayModalProps = {
  date: string;
  availabilities: Availability[];
  onClose: () => void;
  onDelete: (id: number) => Promise<void>;
  deletingId?: number | null;
  deleteError?: string | null;
};

function formatDate(date: string): string {
  const [year, month, day] = date
    .split('-')
    .map(Number);

  return new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(
    new Date(year, month - 1, day),
  );
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

export default function AvailabilityDayModal({
  date,
  availabilities,
  onClose,
  onDelete,
  deletingId = null,
  deleteError = null,
}: AvailabilityDayModalProps) {
  const sortedAvailabilities = [
    ...availabilities,
  ].sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );

  const isDeleting = deletingId !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-brand-border bg-brand-surface shadow-2xl"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-brand-border px-5 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
              Tillgänglighet
            </p>

            <h2 className="mt-1 text-lg font-semibold capitalize text-brand-text">
              {formatDate(date)}
            </h2>

            <p className="mt-1 text-sm text-brand-text-muted">
              {sortedAvailabilities.length}{' '}
              {sortedAvailabilities.length === 1
                ? 'tid'
                : 'tider'}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-text-muted transition hover:bg-white/5 hover:text-brand-text disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Stäng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Delete error */}
        {deleteError && (
          <div className="mx-5 mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {deleteError}
          </div>
        )}

        {/* Times */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {sortedAvailabilities.length === 0 ? (
            <div className="rounded-xl border border-brand-border bg-brand-surface-2 px-4 py-8 text-center">
              <p className="text-sm text-brand-text-muted">
                Det finns inga tider för detta datum.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {sortedAvailabilities.map(
                (availability) => {
                  const isAvailable =
                    availability.availabilityStatus ===
                    'AVAILABLE';

                  const isCurrentDeleting =
                    deletingId === availability.id;

                  return (
                    <div
                      key={availability.id}
                      className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 ${
                        isAvailable
                          ? 'border-green-400/20 bg-green-400/5'
                          : 'border-brand-gold/20 bg-brand-gold/5'
                      }`}
                    >
                      {/* Time */}
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                            isAvailable
                              ? 'bg-green-400/10 text-green-400'
                              : 'bg-brand-gold/10 text-brand-gold'
                          }`}
                        >
                          <Clock3 size={17} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-brand-text">
                            {formatTime(
                              availability.startTime,
                            )}{' '}
                            –{' '}
                            {formatTime(
                              availability.endTime,
                            )}
                          </p>

                          <p className="text-xs text-brand-text-muted">
                            {isAvailable
                              ? 'Bokningsbar'
                              : 'Tiden är bokad'}
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <div className="shrink-0">
                        {isAvailable ? (
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() =>
                              onDelete(
                                availability.id,
                              )
                            }
                            className="flex items-center gap-1.5 rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-xs font-semibold text-red-400 transition hover:border-red-400/40 hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={14} />

                            {isCurrentDeleting
                              ? 'Tar bort...'
                              : 'Ta bort'}
                          </button>
                        ) : (
                          <span className="flex items-center gap-1.5 rounded-lg bg-brand-gold/10 px-2.5 py-1.5 text-xs font-semibold text-brand-gold">
                            <LockKeyhole size={14} />

                            Bokad
                          </span>
                        )}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-brand-border px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="w-full rounded-xl border border-brand-border px-4 py-2.5 text-sm font-medium text-brand-text-muted transition hover:border-brand-gold hover:text-brand-text disabled:cursor-not-allowed disabled:opacity-50"
          >
            Stäng
          </button>
        </div>
      </div>
    </div>
  );
}