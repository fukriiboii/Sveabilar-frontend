import { useState, type FormEvent } from 'react';
import {
  CalendarDays,
  Clock3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import Button from '../../../shared/components/Button';
import { useCreateAvailabilitySchedule } from '../hooks/useCreateAvailabilitySchedule';

import type {
  CreateAvailabilityScheduleRequest,
  DayOfWeek,
} from '../types/availability.types';

const DAYS: {
  value: DayOfWeek;
  label: string;
}[] = [
  { value: 'MONDAY', label: 'Mån' },
  { value: 'TUESDAY', label: 'Tis' },
  { value: 'WEDNESDAY', label: 'Ons' },
  { value: 'THURSDAY', label: 'Tor' },
  { value: 'FRIDAY', label: 'Fre' },
  { value: 'SATURDAY', label: 'Lör' },
  { value: 'SUNDAY', label: 'Sön' },
];

const SLOT_DURATIONS = [
  { value: 15, label: '15 minuter' },
  { value: 30, label: '30 minuter' },
  { value: 45, label: '45 minuter' },
  { value: 60, label: '60 minuter' },
];

const TIME_OPTIONS = Array.from({ length: 96 }, (_, index) => {
  const hours = String(Math.floor(index / 4)).padStart(2, '0');
  const minutes = String((index % 4) * 15).padStart(2, '0');

  return `${hours}:${minutes}`;
});

type DatePickerTarget = 'start' | 'end' | null;

function formatDate(date: string): string {
  if (!date) {
    return '';
  }

  const [year, month, day] = date.split('-');

  return `${day}/${month}/${year}`;
}

function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function parseDate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day);
}

function getMonthName(date: Date): string {
  return new Intl.DateTimeFormat('sv-SE', {
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function getCalendarDays(currentMonth: Date): Date[] {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);

  // JavaScript:
  // Sunday = 0
  // Monday = 1
  //
  // Vi vill ha måndag som första dag.
  const firstDayOfWeek =
    firstDay.getDay() === 0
      ? 6
      : firstDay.getDay() - 1;

  const daysInMonth = new Date(
    year,
    month + 1,
    0,
  ).getDate();

  const previousMonthDays = Array.from(
    { length: firstDayOfWeek },
    (_, index) =>
      new Date(
        year,
        month,
        -firstDayOfWeek + index + 1,
      ),
  );

  const currentMonthDays = Array.from(
    { length: daysInMonth },
    (_, index) =>
      new Date(year, month, index + 1),
  );

  const totalDays = [
    ...previousMonthDays,
    ...currentMonthDays,
  ];

  const remainingDays =
    totalDays.length % 7 === 0
      ? 0
      : 7 - (totalDays.length % 7);

  const nextMonthDays = Array.from(
    { length: remainingDays },
    (_, index) =>
      new Date(
        year,
        month + 1,
        index + 1,
      ),
  );

  return [
    ...totalDays,
    ...nextMonthDays,
  ];
}

function isPastDate(date: Date): boolean {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const comparisonDate = new Date(date);
  comparisonDate.setHours(0, 0, 0, 0);

  return comparisonDate < today;
}

export default function CreateAvailabilityScheduleForm() {
  const {
    createSchedule,
    isCreating,
    error,
  } = useCreateAvailabilitySchedule();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');

  const [slotDurationMinutes, setSlotDurationMinutes] =
    useState(30);

  const [daysOfWeek, setDaysOfWeek] = useState<DayOfWeek[]>([
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
  ]);

  const [successMessage, setSuccessMessage] = useState<
    string | null
  >(null);

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(),
  );

  const [datePickerTarget, setDatePickerTarget] =
    useState<DatePickerTarget>(null);

  function toggleDay(day: DayOfWeek) {
    setDaysOfWeek((currentDays) => {
      if (currentDays.includes(day)) {
        return currentDays.filter(
          (currentDay) => currentDay !== day,
        );
      }

      return [...currentDays, day];
    });
  }

  function selectWeekdays() {
    setDaysOfWeek([
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
    ]);
  }

  function selectAllDays() {
    setDaysOfWeek(
      DAYS.map((day) => day.value),
    );
  }

  function clearDays() {
    setDaysOfWeek([]);
  }

  function openCalendar(target: 'start' | 'end') {
    const selectedDate =
      target === 'start'
        ? startDate
        : endDate;

    if (selectedDate) {
      setCalendarMonth(parseDate(selectedDate));
    } else if (startDate) {
      setCalendarMonth(parseDate(startDate));
    } else {
      setCalendarMonth(new Date());
    }

    setDatePickerTarget(target);
  }

  function closeCalendar() {
    setDatePickerTarget(null);
  }

  function goToPreviousMonth() {
    setCalendarMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() - 1,
          1,
        ),
    );
  }

  function goToNextMonth() {
    setCalendarMonth(
      (currentMonth) =>
        new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth() + 1,
          1,
        ),
    );
  }

  function handleDateSelect(date: Date) {
    const selectedDate = toDateString(date);

    // Passerade datum ska aldrig kunna väljas.
    if (isPastDate(date)) {
      return;
    }

    if (datePickerTarget === 'start') {
      setStartDate(selectedDate);

      // Om slutdatum saknas eller ligger före
      // det nya startdatumet flyttar vi slutdatumet.
      if (!endDate || selectedDate > endDate) {
        setEndDate(selectedDate);
      }
    }

    if (datePickerTarget === 'end') {
      // Slutdatum får inte vara före startdatum.
      if (startDate && selectedDate < startDate) {
        return;
      }

      setEndDate(selectedDate);
    }

    closeCalendar();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSuccessMessage(null);

    if (
      !startDate ||
      !endDate ||
      startDate > endDate ||
      startTime >= endTime ||
      daysOfWeek.length === 0
    ) {
      return;
    }

    const request: CreateAvailabilityScheduleRequest = {
      startDate,
      endDate,
      startTime,
      endTime,
      slotDurationMinutes,
      daysOfWeek,
    };

    const result = await createSchedule(request);

    if (result) {
      setSuccessMessage(
        `${result.length} tider skapades.`,
      );
    }
  }

  const invalidDateRange =
    Boolean(startDate) &&
    Boolean(endDate) &&
    startDate > endDate;

  const invalidTimeRange =
    Boolean(startTime) &&
    Boolean(endTime) &&
    startTime >= endTime;

  const invalidDays =
    daysOfWeek.length === 0;

  const isDisabled =
    isCreating ||
    !startDate ||
    !endDate ||
    invalidDateRange ||
    invalidTimeRange ||
    invalidDays;

  const calendarDays =
    getCalendarDays(calendarMonth);

  const selectedDate =
    datePickerTarget === 'start'
      ? startDate
      : endDate;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 text-brand-gold">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-brand-text">
              Skapa tillgänglighet
            </h2>

            <p className="mt-1 text-sm text-brand-text-muted">
              Välj datum, arbetstid och vilka dagar som ska
              vara bokningsbara.
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="mt-6">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-brand-text">
              Datum
            </h3>

            <p className="mt-1 text-xs text-brand-text-muted">
              Välj en dag eller ett datumintervall.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Start date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-text">
                Från
              </label>

              <button
                type="button"
                onClick={() => openCalendar('start')}
                className="flex w-full items-center gap-3 rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-left text-sm text-brand-text outline-none transition hover:border-brand-gold focus:border-brand-gold"
              >
                <CalendarDays
                  size={17}
                  className="text-brand-gold"
                />

                <span
                  className={
                    startDate
                      ? 'text-brand-text'
                      : 'text-brand-text-muted'
                  }
                >
                  {startDate
                    ? formatDate(startDate)
                    : 'Välj startdatum'}
                </span>
              </button>
            </div>

            {/* End date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-brand-text">
                Till
              </label>

              <button
                type="button"
                onClick={() => openCalendar('end')}
                className="flex w-full items-center gap-3 rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-left text-sm text-brand-text outline-none transition hover:border-brand-gold focus:border-brand-gold"
              >
                <CalendarDays
                  size={17}
                  className="text-brand-gold"
                />

                <span
                  className={
                    endDate
                      ? 'text-brand-text'
                      : 'text-brand-text-muted'
                  }
                >
                  {endDate
                    ? formatDate(endDate)
                    : 'Välj slutdatum'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="mt-7">
          <div className="mb-3 flex items-center gap-2">
            <Clock3
              size={17}
              className="text-brand-gold"
            />

            <h3 className="text-sm font-semibold text-brand-text">
              Arbetstid
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Start */}
            <div>
              <label
                htmlFor="availability-start-time"
                className="mb-2 block text-sm font-medium text-brand-text"
              >
                Från
              </label>

              <select
                id="availability-start-time"
                value={startTime}
                onChange={(event) =>
                  setStartTime(event.target.value)
                }
                className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-gold"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* End */}
            <div>
              <label
                htmlFor="availability-end-time"
                className="mb-2 block text-sm font-medium text-brand-text"
              >
                Till
              </label>

              <select
                id="availability-end-time"
                value={endTime}
                onChange={(event) =>
                  setEndTime(event.target.value)
                }
                className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-gold"
              >
                {TIME_OPTIONS.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label
                htmlFor="availability-slot-duration"
                className="mb-2 block text-sm font-medium text-brand-text"
              >
                Tidsintervall
              </label>

              <select
                id="availability-slot-duration"
                value={slotDurationMinutes}
                onChange={(event) =>
                  setSlotDurationMinutes(
                    Number(event.target.value),
                  )
                }
                className="w-full rounded-lg border border-brand-border bg-brand-surface-2 px-3 py-2.5 text-sm text-brand-text outline-none transition focus:border-brand-gold"
              >
                {SLOT_DURATIONS.map((duration) => (
                  <option
                    key={duration.value}
                    value={duration.value}
                  >
                    {duration.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Days */}
        <div className="mt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-brand-text">
                Veckodagar
              </h3>

              <p className="mt-1 text-xs text-brand-text-muted">
                Välj vilka veckodagar som ska få tider.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={selectWeekdays}
                className="text-xs font-semibold text-brand-gold transition hover:text-brand-gold-strong"
              >
                Vardagar
              </button>

              <button
                type="button"
                onClick={selectAllDays}
                className="text-xs font-semibold text-brand-gold transition hover:text-brand-gold-strong"
              >
                Alla
              </button>

              <button
                type="button"
                onClick={clearDays}
                className="text-xs font-semibold text-brand-text-muted transition hover:text-brand-text"
              >
                Rensa
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
            {DAYS.map((day) => {
              const selected =
                daysOfWeek.includes(day.value);

              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() =>
                    toggleDay(day.value)
                  }
                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    selected
                      ? 'border-brand-gold bg-brand-gold text-slate-900'
                      : 'border-brand-border bg-brand-surface-2 text-brand-text-muted hover:border-brand-gold/50 hover:text-brand-text'
                  }`}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Validation */}
        {invalidDateRange && (
          <p className="mt-4 text-sm text-red-400">
            Slutdatum måste vara samma som eller efter
            startdatum.
          </p>
        )}

        {invalidTimeRange && (
          <p className="mt-2 text-sm text-red-400">
            Sluttiden måste vara efter starttiden.
          </p>
        )}

        {invalidDays && (
          <p className="mt-2 text-sm text-red-400">
            Välj minst en veckodag.
          </p>
        )}

        {/* API error */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* Success */}
        {successMessage && (
          <div className="mt-5 rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm text-green-300">
            {successMessage}
          </div>
        )}

        {/* Submit */}
        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            label={
              isCreating
                ? 'Skapar tider...'
                : 'Skapa tillgänglighet'
            }
            disabled={isDisabled}
          />
        </div>
      </form>

      {/* Calendar modal */}
      {datePickerTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onMouseDown={closeCalendar}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-brand-border bg-brand-surface p-5 shadow-2xl"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-gold">
                  {datePickerTarget === 'start'
                    ? 'Startdatum'
                    : 'Slutdatum'}
                </p>

                <h2 className="mt-1 text-lg font-semibold capitalize text-brand-text">
                  {getMonthName(calendarMonth)}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeCalendar}
                className="rounded-lg px-3 py-2 text-sm text-brand-text-muted transition hover:bg-white/5 hover:text-brand-text"
              >
                Stäng
              </button>
            </div>

            {/* Month navigation */}
            <div className="mt-5 flex items-center justify-between">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:border-brand-gold hover:text-brand-text"
                aria-label="Föregående månad"
              >
                <ChevronLeft size={18} />
              </button>

              <p className="text-sm font-semibold capitalize text-brand-text">
                {getMonthName(calendarMonth)}
              </p>

              <button
                type="button"
                onClick={goToNextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-text-muted transition hover:border-brand-gold hover:text-brand-text"
                aria-label="Nästa månad"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Weekdays */}
            <div className="mt-5 grid grid-cols-7 gap-1">
              {DAYS.map((day) => (
                <div
                  key={day.value}
                  className="py-2 text-center text-xs font-semibold text-brand-text-muted"
                >
                  {day.label}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((date) => {
                const dateString =
                  toDateString(date);

                const isCurrentMonth =
                  date.getMonth() ===
                  calendarMonth.getMonth();

                const isSelected =
                  dateString === selectedDate;

                const isPast =
                  isPastDate(date);

                const isBeforeStart =
                  datePickerTarget === 'end' &&
                  Boolean(startDate) &&
                  dateString < startDate;

                const isDisabledDate =
                  !isCurrentMonth ||
                  isPast ||
                  isBeforeStart;

                return (
                  <button
                    key={dateString}
                    type="button"
                    disabled={isDisabledDate}
                    onClick={() =>
                      handleDateSelect(date)
                    }
                    className={`
                      flex h-10 items-center justify-center
                      rounded-lg text-sm transition
                      ${
                        isSelected
                          ? 'bg-brand-gold font-semibold text-slate-900'
                          : isPast &&
                              isCurrentMonth
                            ? 'cursor-not-allowed text-brand-text-muted/30 line-through'
                            : isCurrentMonth &&
                                !isBeforeStart
                              ? 'text-brand-text hover:bg-white/5'
                              : 'cursor-default text-brand-text-muted/30'
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-5 border-t border-brand-border pt-4">
              <p className="text-xs text-brand-text-muted">
                {datePickerTarget === 'start'
                  ? 'Välj datum då tillgängligheten ska börja.'
                  : 'Välj datum då tillgängligheten ska sluta.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}