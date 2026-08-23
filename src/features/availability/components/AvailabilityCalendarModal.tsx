import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useMemo, useState } from 'react';

type AvailabilityCalendarModalProps = {
  selectedDates: string[];
  onChange: (dates: string[]) => void;
  onClose: () => void;
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

export default function AvailabilityCalendarModal({
  selectedDates,
  onChange,
  onClose,
}: AvailabilityCalendarModalProps) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    // JavaScript: söndag = 0.
    // Vi vill att måndag ska vara första dagen.
    const firstWeekday = (firstDay.getDay() + 6) % 7;

    const daysInMonth = new Date(
      year,
      month + 1,
      0,
    ).getDate();

    const previousMonthDays = firstWeekday;

    const days: Date[] = [];

    // Föregående månads dagar
    for (let i = previousMonthDays; i > 0; i--) {
      days.push(
        new Date(
          year,
          month,
          -i + 1,
        ),
      );
    }

    // Aktuell månads dagar
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    // Nästa månads dagar
    const remainingDays = 42 - days.length;

    for (let day = 1; day <= remainingDays; day++) {
      days.push(new Date(year, month + 1, day));
    }

    return days;
  }, [currentMonth]);

  function goToPreviousMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() - 1,
        1,
      ),
    );
  }

  function goToNextMonth() {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + 1,
        1,
      ),
    );
  }

  function toggleDate(date: Date) {
    const dateString = formatDate(date);

    const isSelected =
      selectedDates.includes(dateString);

    if (isSelected) {
      onChange(
        selectedDates.filter(
          (selectedDate) =>
            selectedDate !== dateString,
        ),
      );

      return;
    }

    onChange(
      [...selectedDates, dateString].sort(),
    );
  }

  function isSelected(date: Date): boolean {
    return selectedDates.includes(
      formatDate(date),
    );
  }

  function isCurrentMonth(date: Date): boolean {
    return (
      date.getMonth() === currentMonth.getMonth() &&
      date.getFullYear() === currentMonth.getFullYear()
    );
  }

  function isPastDate(date: Date): boolean {
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    return date < todayDate;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-brand-text">
              Välj datum
            </h2>

            <p className="mt-1 text-xs text-brand-text-muted">
              Välj ett eller flera datum
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-brand-text-muted transition hover:bg-white/5 hover:text-brand-text"
            aria-label="Stäng"
          >
            <X size={20} />
          </button>
        </div>

        {/* Calendar */}
        <div className="p-5">
          {/* Month navigation */}
          <div className="mb-5 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:bg-white/5 hover:text-brand-text"
              aria-label="Föregående månad"
            >
              <ChevronLeft size={18} />
            </button>

            <h3 className="text-base font-semibold text-brand-text">
              {MONTHS[currentMonth.getMonth()]}{' '}
              {currentMonth.getFullYear()}
            </h3>

            <button
              type="button"
              onClick={goToNextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:bg-white/5 hover:text-brand-text"
              aria-label="Nästa månad"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Weekdays */}
          <div className="mb-2 grid grid-cols-7">
            {WEEKDAYS.map((weekday) => (
              <div
                key={weekday}
                className="py-2 text-center text-xs font-semibold text-brand-text-muted"
              >
                {weekday}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date) => {
              const dateString = formatDate(date);
              const selected = isSelected(date);
              const currentMonthDay =
                isCurrentMonth(date);
              const past = isPastDate(date);

              return (
                <button
                  key={dateString}
                  type="button"
                  disabled={past}
                  onClick={() => toggleDate(date)}
                  className={`
                    flex h-10 items-center justify-center rounded-lg text-sm font-medium transition
                    ${
                      selected
                        ? 'bg-brand-gold text-slate-900'
                        : currentMonthDay
                          ? 'text-brand-text hover:bg-white/5'
                          : 'text-brand-text-muted/30'
                    }
                    ${
                      past
                        ? 'cursor-not-allowed opacity-30'
                        : ''
                    }
                  `}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Selected dates */}
          <div className="mt-5 rounded-xl border border-brand-border bg-brand-surface-2 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Valda datum
            </p>

            {selectedDates.length === 0 ? (
              <p className="mt-2 text-sm text-brand-text-muted">
                Inga datum valda
              </p>
            ) : (
              <p className="mt-2 text-sm font-medium text-brand-text">
                {selectedDates.length}{' '}
                {selectedDates.length === 1
                  ? 'datum'
                  : 'datum'}{' '}
                valda
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-brand-border px-5 py-4">
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-sm font-medium text-brand-text-muted transition hover:text-brand-text"
          >
            Rensa
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-brand-gold px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-brand-gold-strong"
          >
            Klar
          </button>
        </div>
      </div>
    </div>
  );
}