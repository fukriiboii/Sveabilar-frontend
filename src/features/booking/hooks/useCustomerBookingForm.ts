import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAvailabilityMonth } from '../../availability/hooks/useAvailabilityMonth';
import { useAvailableTimes } from '../../availability/hooks/useAvailableTimes';
import { useCreateBooking } from './useCreateBooking';
import type {
  CreateBookingRequest,
  ServiceType,
} from '../types/booking.types';

const SERVICE_LABELS: Record<ServiceType, string> = {
  TIRE_CHANGE: 'Däckbyte',
};

const SERVICE_PRICES: Record<ServiceType, number> = {
  TIRE_CHANGE: 499,
};

export const TIRE_SIZE_OPTIONS = [
  { value: 'UP_TO_17', label: 'Upp till 17 tum', extra: 0 },
  { value: '18_TO_20', label: '18 – 20 tum', extra: 100 },
  { value: '21_TO_22', label: '21 – 22 tum', extra: 200 },
] as const;

export type TireSizeOption = (typeof TIRE_SIZE_OPTIONS)[number]['value'];

export function useCustomerBookingForm() {
  const [searchParams] = useSearchParams();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [availabilityId, setAvailabilityId] = useState<number | null>(null);
  const [tireSize, setTireSize] = useState<TireSizeOption>('UP_TO_17');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const initialService =
    (searchParams.get('service') as ServiceType | null) ?? 'TIRE_CHANGE';

  const [serviceType, setServiceType] = useState<ServiceType>(initialService);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const {
    availabilities: monthAvailabilities,
    isLoading: isLoadingMonth,
    error: monthError,
  } = useAvailabilityMonth(year, month);

  const futureMonthAvailabilities = useMemo(
    () =>
      monthAvailabilities.filter(
        (availability) => !isDateBeforeToday(availability.date),
      ),
    [monthAvailabilities],
  );

  const {
    availabilities: dayAvailabilities,
    isLoading: isLoadingTimes,
    error: availabilityError,
  } = useAvailableTimes(selectedDate);

  const { createBooking, isCreating, error: createError } = useCreateBooking();

  const activePrice = useMemo(
    () => SERVICE_PRICES[serviceType] ?? 0,
    [serviceType],
  );

  const selectedTireSize = useMemo(
    () =>
      TIRE_SIZE_OPTIONS.find((option) => option.value === tireSize) ??
      TIRE_SIZE_OPTIONS[0],
    [tireSize],
  );

  const estimatedTotalPrice = activePrice + selectedTireSize.extra;

  useEffect(() => {
    setAvailabilityId(null);
  }, [selectedDate]);

  useEffect(() => {
    const paramService = searchParams.get('service') as ServiceType | null;

    if (paramService && paramService !== serviceType) {
      setServiceType(paramService);
    }
  }, [searchParams, serviceType]);

  useEffect(() => {
    if (selectedDate && isDateBeforeToday(selectedDate)) {
      setSelectedDate('');
      setAvailabilityId(null);
      return;
    }

    if (!selectedDate && futureMonthAvailabilities.length > 0) {
      const firstAvailableDate = futureMonthAvailabilities
        .map((availability) => availability.date)
        .sort()[0];

      if (firstAvailableDate) {
        setSelectedDate(firstAvailableDate);
      }
    }
  }, [futureMonthAvailabilities, selectedDate]);

  function goToPreviousMonth() {
    const todayMonth = new Date();
    todayMonth.setDate(1);
    todayMonth.setHours(0, 0, 0, 0);

    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() - 1,
      1,
    );

    if (nextMonth < todayMonth) {
      return;
    }

    setCurrentMonth(nextMonth);
    setSelectedDate('');
    setAvailabilityId(null);
  }

  function goToNextMonth() {
    setCurrentMonth((current) =>
      new Date(current.getFullYear(), current.getMonth() + 1, 1),
    );
    setSelectedDate('');
    setAvailabilityId(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!availabilityId) {
      return;
    }

    const request: CreateBookingRequest = {
      customerName,
      customerEmail,
      customerPhone,
      address,
      availabilityId,
      serviceType,
    };

    const booking = await createBooking(request);

    if (!booking) {
      return;
    }

    setBookingConfirmed(true);
  }

  return {
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    customerPhone,
    setCustomerPhone,
    address,
    setAddress,
    selectedDate,
    setSelectedDate,
    availabilityId,
    setAvailabilityId,
    tireSize,
    setTireSize,
    serviceType,
    setServiceType,
    bookingConfirmed,
    setBookingConfirmed,
    currentMonth,
    setCurrentMonth,
    isLoadingMonth,
    monthError,
    futureMonthAvailabilities,
    dayAvailabilities,
    isLoadingTimes,
    availabilityError,
    createError,
    isCreating,
    activePrice,
    selectedTireSize,
    estimatedTotalPrice,
    serviceLabels: SERVICE_LABELS,
    tireSizeOptions: TIRE_SIZE_OPTIONS,
    handleSubmit,
    goToPreviousMonth,
    goToNextMonth,
    isMonthBeforeToday,
  };
}

function isDateBeforeToday(dateString: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(`${dateString}T00:00:00`);

  return date < today;
}

function isMonthBeforeToday(date: Date): boolean {
  const today = new Date();
  const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const candidateMonthStart = new Date(date.getFullYear(), date.getMonth(), 1);

  return candidateMonthStart < currentMonthStart;
}
