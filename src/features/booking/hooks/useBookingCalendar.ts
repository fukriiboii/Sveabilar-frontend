import { useMemo } from 'react';

type AvailabilityItem = {
  date: string;
  availabilityStatus: string;
};

type UseBookingCalendarArgs = {
  currentMonth: Date;
  selectedDate: string;
  futureMonthAvailabilities: AvailabilityItem[];
  setSelectedDate: (date: string) => void;
  isMonthBeforeToday: (date: Date) => boolean;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

export function useBookingCalendar({
  currentMonth,
  selectedDate,
  futureMonthAvailabilities,
  setSelectedDate,
  isMonthBeforeToday,
  onPreviousMonth,
  onNextMonth,
}: UseBookingCalendarArgs) {
  const calendarDays = useMemo(
    () => getCalendarDays(currentMonth),
    [currentMonth],
  );

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('sv-SE', {
        month: 'long',
        year: 'numeric',
      }).format(currentMonth),
    [currentMonth],
  );

  function getDayState(date: Date) {
    const dateString = formatDate(date);
    const dayAvailabilitiesForDate = futureMonthAvailabilities.filter(
      (item) => item.date === dateString,
    );
    const availableCount = dayAvailabilitiesForDate.filter(
      (item) => item.availabilityStatus === 'AVAILABLE',
    ).length;

    const isPast = isPastDate(date);
    const isSelected = selectedDate === dateString;
    const hasAvailability = availableCount > 0;

    return {
      dateString,
      availableCount,
      isPast,
      isSelected,
      hasAvailability,
    };
  }

  function handleDayClick(date: Date) {
    const { isPast, hasAvailability, dateString } = getDayState(date);

    if (isPast || !hasAvailability) {
      return;
    }

    setSelectedDate(dateString);
  }

  return {
    calendarDays,
    monthLabel,
    getDayState,
    handleDayClick,
    isPreviousMonthDisabled: isMonthBeforeToday(currentMonth),
    onPreviousMonth,
    onNextMonth,
  };
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getCalendarDays(currentMonth: Date): Array<Date | null> {
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = (firstDay.getDay() + 6) % 7;

  const days: Array<Date | null> = [];

  for (let index = 0; index < firstWeekday; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return date < today;
}
