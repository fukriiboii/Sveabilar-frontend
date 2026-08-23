import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
};

export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-brand-border bg-brand-surface p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-brand-text-muted">
            {title}
          </p>

          <p className="mt-3 text-3xl font-semibold text-brand-text">
            {value}
          </p>

          {description && (
            <p className="mt-2 text-sm text-brand-text-muted">
              {description}
            </p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gold-soft">
          <Icon
            size={21}
            className="text-brand-bg"
          />
        </div>
      </div>
    </div>
  );
}