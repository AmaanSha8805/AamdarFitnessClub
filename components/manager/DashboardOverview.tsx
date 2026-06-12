"use client";

import {
  Activity,
  CircleDollarSign,
  ClipboardList,
  Dumbbell,
  TrendingUp,
  UserCheck,
  UserPlus,
  UserX,
  Users,
  Wrench,
} from "lucide-react";
import { motion } from "framer-motion";
import { formatInr } from "@/lib/manager/format";
import { cn } from "@/lib/utils";

type DashboardData = {
  stats: Record<string, number>;
  revenueGrowth: { label: string; revenue: number }[];
  memberGrowth: { label: string; members: number }[];
  attendanceGrowth: { label: string; attendance: number }[];
  recentActivity: { type: string; title: string; detail: string; date: string }[];
};

const primaryStats: [string, string, React.ElementType][] = [
  ["Total Members", "totalMembers", Users],
  ["Active Members", "activeMembers", UserCheck],
  ["Expired Memberships", "expiredMembers", UserX],
  ["New Registrations", "newRegistrations", UserPlus],
];

const secondaryStats: [string, string, React.ElementType][] = [
  ["Today's Attendance", "todayAttendance", Activity],
  ["Monthly Revenue", "monthlyRevenue", TrendingUp],
  ["Pending Payments", "pendingPayments", ClipboardList],
  ["Trainer Count", "trainerCount", Dumbbell],
  ["Equipment Issues", "equipmentMaintenance", Wrench],
  ["Monthly Profit", "profit", CircleDollarSign],
];

export function DashboardOverview({ data }: { data: DashboardData }) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold/70">
          Management Console
        </p>
        <h1 className="mt-2 text-2xl font-black sm:text-3xl">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Complete operational overview for AAMDAR Fitness Club.
        </p>
      </motion.div>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold/60">
          Member Metrics
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {primaryStats.map(([label, key, Icon], index) => (
            <StatCard
              key={key}
              label={label}
              value={data.stats[key] || 0}
              icon={Icon}
              featured
              delay={index * 0.05}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold/60">
          Operations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
          {secondaryStats.map(([label, key, Icon], index) => {
            const value = data.stats[key] || 0;
            const isMoney = ["monthlyRevenue", "profit"].includes(key);
            return (
              <StatCard
                key={key}
                label={label}
                value={isMoney ? formatInr(value) : value.toLocaleString("en-IN")}
                icon={Icon}
                delay={0.2 + index * 0.05}
              />
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <ChartCard title="Revenue Growth" delay={0.3}>
          <MiniAreaChart
            data={data.revenueGrowth.map((item) => ({ label: item.label, value: item.revenue }))}
            color="#D4AF37"
          />
        </ChartCard>
        <ChartCard title="Member Growth" delay={0.35}>
          <MiniAreaChart
            data={data.memberGrowth.map((item) => ({ label: item.label, value: item.members }))}
            color="#00FF88"
          />
        </ChartCard>
        <ChartCard title="Attendance Analytics" delay={0.4}>
          <MiniAreaChart
            data={data.attendanceGrowth.map((item) => ({
              label: item.label,
              value: item.attendance,
            }))}
            color="#F0D78C"
          />
        </ChartCard>
      </section>

      <motion.section
        className="overflow-hidden rounded-2xl border border-gold/10 bg-white/[0.02]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.45 }}
      >
        <div className="border-b border-gold/10 px-5 py-4">
          <h2 className="font-semibold text-gold-light">Recent Activity</h2>
        </div>
        <div className="divide-y divide-white/5">
          {data.recentActivity.map((item, index) => (
            <div
              key={`${item.type}-${item.title}-${index}`}
              className="grid gap-2 px-5 py-4 transition-colors hover:bg-gold/[0.03] sm:grid-cols-[160px_1fr_120px]"
            >
              <span className="text-sm font-medium text-gold">{item.type}</span>
              <span className="text-sm text-white">
                {item.title} · {item.detail}
              </span>
              <span className="text-sm text-text-secondary sm:text-right">{item.date}</span>
            </div>
          ))}
          {data.recentActivity.length === 0 && (
            <p className="px-5 py-8 text-sm text-text-secondary">No recent activity yet.</p>
          )}
        </div>
      </motion.section>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  featured = false,
  delay = 0,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  featured?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={cn(
        "group rounded-2xl border p-5 transition-all duration-300",
        featured
          ? "border-gold/20 bg-gradient-to-br from-gold/10 via-white/[0.02] to-transparent hover:border-gold/35 hover:shadow-gold-glow-sm"
          : "border-white/10 bg-white/[0.02] hover:border-gold/20 hover:bg-gold/[0.03]"
      )}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-text-secondary">{label}</p>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl transition-colors",
            featured
              ? "border border-gold/25 bg-gold/10 text-gold group-hover:shadow-gold-glow-sm"
              : "bg-white/5 text-gold/80 group-hover:bg-gold/10 group-hover:text-gold"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );
}

function ChartCard({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-gold/10 bg-white/[0.02] p-5 transition-all duration-300 hover:border-gold/20"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <h2 className="mb-4 font-semibold text-gold-light">{title}</h2>
      {children}
    </motion.div>
  );
}

function MiniAreaChart({
  data,
  color,
}: {
  data: { label: string; value: number }[];
  color: string;
}) {
  const width = 400;
  const height = 200;
  const max = Math.max(...data.map((item) => item.value), 1);
  const points = data
    .map((item, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * width;
      const y = height - (item.value / max) * (height - 20);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-48 w-full">
        <polyline fill="none" stroke={color} strokeWidth="3" points={points} />
        {data.map((item, index) => {
          const x = (index / Math.max(data.length - 1, 1)) * width;
          const y = height - (item.value / max) * (height - 20);
          return <circle key={item.label} cx={x} cy={y} r="4" fill={color} />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-xs text-text-secondary">
        {data.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}
