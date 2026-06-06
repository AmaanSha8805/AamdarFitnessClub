import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  suffix?: string;
  className?: string;
}

export function StatCard({
  value,
  label,
  icon: Icon,
  suffix,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-border bg-background-card p-6 text-center",
        className
      )}
    >
      {Icon && (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      )}
      <div className="text-3xl font-bold text-text-primary sm:text-4xl">
        {value}
        {suffix && (
          <span className="text-primary text-2xl sm:text-3xl">{suffix}</span>
        )}
      </div>
      <p className="mt-1 text-sm text-text-secondary">{label}</p>
    </div>
  );
}
