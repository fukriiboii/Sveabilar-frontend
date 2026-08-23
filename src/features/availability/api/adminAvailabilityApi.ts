import { apiClient } from '../../../shared/api/apiClient';

import type {
  Availability,
  CreateAvailabilityRequest,
  CreateAvailabilityScheduleRequest,
} from '../types/availability.types';

export async function getAllAvailabilities(): Promise<Availability[]> {
  return apiClient<Availability[]>(
    '/api/admin/availabilities',
  );
}

export async function createAvailability(
  request: CreateAvailabilityRequest,
): Promise<Availability[]> {
  return apiClient<Availability[]>(
    '/api/admin/availabilities',
    {
      method: 'POST',
      body: JSON.stringify(request),
    },
  );
}

export async function createAvailabilitySchedule(
  request: CreateAvailabilityScheduleRequest,
): Promise<Availability[]> {
  return apiClient<Availability[]>(
    '/api/admin/availabilities/schedule',
    {
      method: 'POST',
      body: JSON.stringify(request),
    },
  );
}

export async function deleteAvailability(
  id: number,
): Promise<void> {
  await apiClient<void>(
    `/api/admin/availabilities/${id}`,
    {
      method: 'DELETE',
    },
  );
}

export async function getAvailabilitiesBetween(
  startDate: string,
  endDate: string,
): Promise<Availability[]> {
  return apiClient<Availability[]>(
    `/api/admin/availabilities/range?startDate=${startDate}&endDate=${endDate}`,
  );
}