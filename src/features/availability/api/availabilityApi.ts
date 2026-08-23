import { apiClient } from "../../../shared/api/apiClient";
import type { Availability } from "../types/availability.types";

export async function getAvailableTimes(date: string): Promise<Availability[]> {
    return apiClient<Availability[]>(`/api/availability?date=${date}`);
}

export async function getAvailabilitiesBetween(
    startDate: string,
    endDate: string,
): Promise<Availability[]> {
    return apiClient<Availability[]>(
        `/api/availability/range?startDate=${startDate}&endDate=${endDate}`,
    );
}