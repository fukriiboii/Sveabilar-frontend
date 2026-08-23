import { useEffect, useState } from 'react';

import { getDashboardStats } from '../api/adminApi';
import type { DashboardStats } from '../types/admin.types';

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await getDashboardStats();

        setStats(data);
      } catch (error) {
        console.error(error);
        setError('Kunde inte hämta dashboard-statistik.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
  };
}