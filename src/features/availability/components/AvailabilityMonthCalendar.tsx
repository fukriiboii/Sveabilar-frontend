import { ChevronLeft, ChevronRight } from 'lucide-react';

import type { Availability } from '../types/availability.types';

type AvailabilityMonthCalendarProps = {
  year: number;
  month: number;
  availabilities: Availability[];
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDate?: (date: string) => void;
};

const WEEKDAYS = [
  'Mån',
  'Tis',
  'Ons',
  'Tor',
  'Fre',
  'Lör',
  'Sön',
];

const MONTHS = [
  'Januari',
  'Februari',
  'Mars',
  'April',
  'Maj',
  'Juni',
  'Juli',
  'Augusti',
  'September',
  'Oktober',
  'November',
  'December',
];

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getCalendarDays(
  year: number,
  month: number,
): Date[] {
  const firstDay = new Date(year, month, 1);

  const lastDay = new Date(year, month + 1, 0);

  // JavaScript:
  // Sunday = 0
  // Monday = 1
  //
  // Vi vill att måndag ska vara första dagen.
  const firstWeekday =
    (firstDay.getDay() + 6) % 7;

  const daysInMonth = lastDay.getDate();

  const days: Date[] = [];

  // Föregående månads dagar
  for (let i = firstWeekday - 1; i >= 0; i--) {
    days.push(
      new Date(
        year,
        month,
        -i,
      ),
    );
  }

  // Aktuell månads dagar
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      new Date(
        year,
        month,
        day,
      ),
    );
  }

  // Fyll sista veckan
  const remainingDays =
    (7 - (days.length % 7)) % 7;

  for (let i = 1; i <= remainingDays; i++) {
    days.push(
      new Date(
        year,
        month + 1,
        i,
      ),
    );
  }

  return days;
}

export default function AvailabilityMonthCalendar({
  year,
  month,
  availabilities,
  onPreviousMonth,
  onNextMonth,
  onSelectDate,
}: AvailabilityMonthCalendarProps) {
  const calendarDays = getCalendarDays(
    year,
    month,
  );

  const today = formatDate(new Date());

  function getAvailabilitiesForDate(
    date: string,
  ) {
    return availabilities.filter(
      (availability) =>
        availability.date === date,
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-surface">
      {/* Calendar header */}
      <div className="flex items-center justify-between border-b border-brand-border px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={onPreviousMonth}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:border-brand-gold hover:text-brand-gold"
          aria-label="Föregående månad"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="text-center">
          <h2 className="text-lg font-semibold text-brand-text sm:text-xl">
            {MONTHS[month]} {year}
          </h2>

          <p className="mt-0.5 text-xs text-brand-text-muted">
            Tillgänglighet
          </p>
        </div>

        <button
          type="button"
          onClick={onNextMonth}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:border-brand-gold hover:text-brand-gold"
          aria-label="Nästa månad"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 border-b border-brand-border">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide text-brand-text-muted"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date) => {
          const dateString = formatDate(date);

          const isCurrentMonth =
            date.getMonth() === month;

          const isToday =
            dateString === today;

          const isPast =
            dateString < today;

          const dayAvailabilities =
            getAvailabilitiesForDate(
              dateString,
            );

          const availableCount =
            dayAvailabilities.filter(
              (availability) =>
                availability.availabilityStatus ===
                'AVAILABLE',
            ).length;

          const bookedCount =
            dayAvailabilities.filter(
              (availability) =>
                availability.availabilityStatus ===
                'BOOKED',
            ).length;

          return (
            <button
              key={dateString}
              type="button"
              disabled={
                !isCurrentMonth ||
                dayAvailabilities.length === 0
              }
              onClick={() =>
                onSelectDate?.(dateString)
              }
              className={`relative min-h-24 border-b border-r border-brand-border p-2 text-left transition sm:min-h-28 ${
                !isCurrentMonth
                  ? 'cursor-default bg-brand-surface-2/40 opacity-30'
                  : isPast
                    ? 'bg-brand-surface-2/30 opacity-50'
                    : 'hover:bg-brand-surface-2'
              } ${
                dayAvailabilities.length > 0 &&
                isCurrentMonth &&
                !isPast
                  ? 'cursor-pointer'
                  : ''
              }`}
            >
              {/* Date */}
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    isToday
                      ? 'bg-brand-gold text-slate-900'
                      : 'text-brand-text'
                  }`}
                >
                  {date.getDate()}
                </span>
              </div>

              {/* Availability */}
              {isCurrentMonth &&
                dayAvailabilities.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <div className="text-xs font-semibold text-brand-text">
                      {dayAvailabilities.length}{' '}
                      {dayAvailabilities.length === 1
                        ? 'tid'
                        : 'tider'}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {availableCount > 0 && (
                        <span className="rounded-md bg-green-400/10 px-1.5 py-0.5 text-[10px] font-medium text-green-400">
                          {availableCount} lediga
                        </span>
                      )}

                      {bookedCount > 0 && (
                        <span className="rounded-md bg-brand-gold/10 px-1.5 py-0.5 text-[10px] font-medium text-brand-gold">
                          {bookedCount} bokade
                        </span>
                      )}
                    </div>
                  </div>
                )}

              {isCurrentMonth &&
                dayAvailabilities.length === 0 &&
                !isPast && (
                  <div className="mt-3 text-[10px] text-brand-text-muted">
                    Ingen tillgänglighet
                  </div>
                )}
            </button>
          );
        })}
      </div>
    </div>
  );
}