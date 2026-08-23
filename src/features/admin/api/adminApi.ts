import { apiClient } from '../../../shared/api/apiClient';
import type { DashboardStats } from '../types/admin.types';

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiClient<DashboardStats>(
    '/api/admin/dashboard',
  );
}