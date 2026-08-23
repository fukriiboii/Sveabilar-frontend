import { useMemo, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
} from 'lucide-react';

import type { Availability } from '../types/availability.types';

type AvailabilityCalendarProps = {availabilities: Availability[];};

type CalendarDayCellProps = {
  date: Date;
  isPast: boolean;
  isToday: boolean;
  isSelected: boolean;
  availabilities: Availability[];
  onClick: () => void;
};

type AvailabilityHeaderProps = {
  title: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onGoToToday: () => void;
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

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getMonthName(date: Date): string {
  return new Intl.DateTimeFormat('sv-SE', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getCalendarDays(currentMonth: Date): (Date | null)[] {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstWeekday =
    (firstDay.getDay() + 6) % 7;

  const totalDays = lastDay.getDate();
  const calendarDays: (Date | null)[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    calendarDays.push(new Date(year, month, day));
  }

  return calendarDays;
}

function isToday(date: Date): boolean {
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function isPast(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
}

function AvailabilityHeader({
  title,
  onPreviousMonth,
  onNextMonth,
  onGoToToday,
}: AvailabilityHeaderProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-brand-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div>
        <h2 className="text-xl font-semibold capitalize text-brand-text sm:text-2xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-brand-text-muted">
          Översikt över bokningsbara tider
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onGoToToday}
          className="rounded-lg border border-brand-border px-3 py-2 text-sm font-medium text-brand-text transition hover:border-brand-gold hover:text-brand-gold"
        >
          Idag
        </button>

        <button
          type="button"
          onClick={onPreviousMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:border-brand-gold hover:text-brand-gold"
          aria-label="Föregående månad"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={onNextMonth}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:border-brand-gold hover:text-brand-gold"
          aria-label="Nästa månad"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function WeekdayRow() {
  return (
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
  );
}

function CalendarDayCell({
  date,
  isPast,
  isToday,
  isSelected,
  availabilities,
  onClick,
}: CalendarDayCellProps) {
  const dateString = formatDate(date);
  const availableCount = availabilities.filter(
    (item) => item.availabilityStatus === 'AVAILABLE',
  ).length;
  const bookedCount = availabilities.filter(
    (item) => item.availabilityStatus === 'BOOKED',
  ).length;

  return (
    <button
      key={dateString}
      type="button"
      onClick={onClick}
      className={`min-h-28 border-b border-r border-brand-border p-2 text-left transition sm:min-h-32 ${
        isPast
          ? 'bg-brand-surface-2/40 opacity-50'
          : 'hover:bg-white/5'
      } ${
        isSelected ? 'ring-2 ring-inset ring-brand-gold' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
            isToday
              ? 'bg-brand-gold text-slate-900'
              : isPast
                ? 'text-brand-text-muted line-through'
                : 'text-brand-text'
          }`}
        >
          {date.getDate()}
        </span>
      </div>

      {!isPast && availabilities.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {availableCount > 0 && (
            <div className="rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-300">
              {availableCount}{' '}
              {availableCount === 1 ? 'ledig' : 'lediga'}
            </div>
          )}

          {bookedCount > 0 && (
            <div className="rounded-md bg-brand-gold/10 px-2 py-1 text-xs font-medium text-brand-gold">
              {bookedCount}{' '}
              {bookedCount === 1 ? 'bokad' : 'bokade'}
            </div>
          )}
        </div>
      )}

      {!isPast && availabilities.length === 0 && (
        <p className="mt-3 text-xs text-brand-text-muted">
          Ingen tillgänglighet
        </p>
      )}
    </button>
  );
}

export default function AvailabilityCalendar({
  availabilities,
}: AvailabilityCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();

    return new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const days = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth],
  );

  const availabilityByDate = useMemo(() => {
    const map = new Map<string, Availability[]>();

    for (const availability of availabilities) {
      const existing = map.get(availability.date) ?? [];

      existing.push(availability);
      map.set(availability.date, existing);
    }

    return map;
  }, [availabilities]);

  const selectedAvailabilities =
    selectedDate
      ? availabilityByDate.get(selectedDate) ?? []
      : [];

  function goToPreviousMonth() {
    setCurrentMonth((current) =>
      new Date(
        current.getFullYear(),
        current.getMonth() - 1,
        1,
      ),
    );
    setSelectedDate(null);
  }

  function goToNextMonth() {
    setCurrentMonth((current) =>
      new Date(
        current.getFullYear(),
        current.getMonth() + 1,
        1,
      ),
    );
    setSelectedDate(null);
  }

  function goToToday() {
    const today = new Date();

    setCurrentMonth(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ),
    );
    setSelectedDate(formatDate(today));
  }

  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface">
      <AvailabilityHeader
        title={getMonthName(currentMonth)}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
        onGoToToday={goToToday}
      />

      <WeekdayRow />

      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          if (!date) {
            return (
              <div
                key={`empty-${index}`}
                className="min-h-28 border-b border-r border-brand-border bg-brand-surface-2/30 sm:min-h-32"
              />
            );
          }

          const dateString = formatDate(date);
          const dayAvailabilities =
            availabilityByDate.get(dateString) ?? [];

          return (
            <CalendarDayCell
              key={dateString}
              date={date}
              isPast={isPast(date)}
              isToday={isToday(date)}
              isSelected={selectedDate === dateString}
              availabilities={dayAvailabilities}
              onClick={() => setSelectedDate(dateString)}
            />
          );
        })}
      </div>

      {selectedDate && (
        <div className="border-t border-brand-border p-5 sm:p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-brand-text">
              Tider
            </h3>

            <p className="mt-1 text-sm text-brand-text-muted">
              {new Intl.DateTimeFormat('sv-SE', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format(
                new Date(`${selectedDate}T00:00:00`),
              )}
            </p>
          </div>

          {selectedAvailabilities.length === 0 ? (
            <p className="text-sm text-brand-text-muted">
              Inga tider finns för denna dag.
            </p>
          ) : (
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {selectedAvailabilities.map((availability) => (
                <div
                  key={availability.id}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                    availability.availabilityStatus === 'AVAILABLE'
                      ? 'border-green-400/20 bg-green-400/5'
                      : 'border-brand-gold/20 bg-brand-gold/5'
                  }`}
                >
                  <Clock3
                    size={16}
                    className={
                      availability.availabilityStatus === 'AVAILABLE'
                        ? 'text-green-300'
                        : 'text-brand-gold'
                    }
                  />

                  <div>
                    <p className="text-sm font-semibold text-brand-text">
                      {availability.startTime.slice(0, 5)} –{' '}
                      {availability.endTime.slice(0, 5)}
                    </p>

                    <p className="text-xs text-brand-text-muted">
                      {availability.availabilityStatus === 'AVAILABLE'
                        ? 'Ledig'
                        : 'Bokad'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
