import {
  CalendarDays,
  Clock,
  ListChecks,
  Timer,
} from 'lucide-react';

import DashboardCard from '../components/DashboardCard';
import { useDashboardStats } from '../hooks/useDashboardStats';
import TodaySchedule from '../components/TodaySchedule';

export default function AdminDashboard() {
  const { stats, isLoading, error } = useDashboardStats();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand-text sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-brand-text-muted sm:text-base">
          Översikt över verksamheten
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:mt-8 xl:grid-cols-4">
        <DashboardCard
          title="Totala bokningar"
          value={isLoading ? '—' : stats?.totalBookings ?? 0}
          description="Alla bokningar"
          icon={ListChecks}
        />

        <DashboardCard
          title="Idag"
          value={isLoading ? '—' : stats?.todayBookings ?? 0}
          description="Bokningar idag"
          icon={CalendarDays}
        />

        <DashboardCard
          title="Kommande"
          value={isLoading ? '—' : stats?.upcomingBookings ?? 0}
          description="Bekräftade bokningar"
          icon={Clock}
        />

        <DashboardCard
          title="Lediga tider"
          value={isLoading ? '—' : stats?.availableTimes ?? 0}
          description="Tillgängliga tider idag"
          icon={Timer}
        />
      </div>

      <TodaySchedule />
    </div>
  );
}