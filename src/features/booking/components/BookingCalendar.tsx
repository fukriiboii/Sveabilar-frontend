import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
} from 'lucide-react';

import { useBookingCalendar } from '../hooks/useBookingCalendar';
import { WeekdayRow } from './WeekdayRow';

type BookingCalendarProps = {
  currentMonth: Date;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  futureMonthAvailabilities: Array<{
    date: string;
    availabilityStatus: string;
  }>;
  dayAvailabilities: Array<{
    id: number;
    availabilityStatus: string;
    startTime: string;
    endTime: string;
  }>;
  isLoadingTimes: boolean;
  availabilityError: string | null;
  availabilityId: number | null;
  setAvailabilityId: (id: number | null) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  isMonthBeforeToday: (date: Date) => boolean;
};

export function BookingCalendar({
  currentMonth,
  selectedDate,
  setSelectedDate,
  futureMonthAvailabilities,
  dayAvailabilities,
  isLoadingTimes,
  availabilityError,
  availabilityId,
  setAvailabilityId,
  onPreviousMonth,
  onNextMonth,
  isMonthBeforeToday,
}: BookingCalendarProps) {
  const { calendarDays, monthLabel, getDayState, isPreviousMonthDisabled } =
    useBookingCalendar({
      currentMonth,
      selectedDate,
      futureMonthAvailabilities,
      setSelectedDate,
      isMonthBeforeToday,
      onPreviousMonth,
      onNextMonth,
    });

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-medium text-brand-text">
          <CalendarDays size={14} />
          Välj datum
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreviousMonth}
            disabled={isPreviousMonthDisabled}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
              isPreviousMonthDisabled
                ? 'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
            }`}
            aria-label="Föregående månad"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={onNextMonth}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
            aria-label="Nästa månad"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center text-sm font-medium text-slate-700">
        {monthLabel}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-2">
        <WeekdayRow />

        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((date, index) => {
            if (!date) {
              return (
                <div
                  key={`empty-${index}`}
                  className="h-20 rounded-lg bg-slate-50"
                />
              );
            }

            const { dateString, availableCount, isPast, isSelected, hasAvailability } =
              getDayState(date);

            return (
              <button
                key={dateString}
                type="button"
                disabled={isPast || !hasAvailability}
                onClick={() => setSelectedDate(dateString)}
                className={`flex h-20 flex-col items-center justify-between rounded-lg border p-1 text-center transition ${
                  isSelected
                    ? 'border-slate-900 bg-slate-900 text-white'
                    : isPast
                      ? 'border-slate-100 bg-slate-50 text-slate-300'
                      : hasAvailability
                        ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                        : 'border-slate-100 bg-slate-50 text-slate-300'
                }`}
              >
                <span className="mt-1 text-xs font-semibold">{date.getDate()}</span>

                {hasAvailability && !isPast && (
                  <span className="mb-1 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    {availableCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-5">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium text-brand-text">
            <Clock size={14} />
            Ledig tid för {formatDisplayDate(selectedDate)}
          </p>

          {isLoadingTimes && (
            <p className="text-sm text-slate-500">Hämtar lediga tider...</p>
          )}

          {!isLoadingTimes && availabilityError && (
            <p className="text-sm text-red-500">{availabilityError}</p>
          )}

          {!isLoadingTimes && !availabilityError && dayAvailabilities.length === 0 && (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              Inga lediga tider för valt datum.
            </p>
          )}

          {!isLoadingTimes && !availabilityError && dayAvailabilities.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {dayAvailabilities
                .filter((availability) => availability.availabilityStatus === 'AVAILABLE')
                .map((availability) => {
                  const selected = availabilityId === availability.id;

                  return (
                    <button
                      key={availability.id}
                      type="button"
                      onClick={() => setAvailabilityId(availability.id)}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-medium transition ${
                        selected
                          ? 'border-slate-900 bg-slate-900 text-white'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <Clock size={14} />
                      {formatTime(availability.startTime)} – {formatTime(availability.endTime)}
                    </button>
                  );
                })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function formatTime(time: string): string {
  return time.slice(0, 5);
}

function formatDisplayDate(date: string): string {
  const [year, month, day] = date.split('-').map(Number);

  return new Intl.DateTimeFormat('sv-SE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, day));
}