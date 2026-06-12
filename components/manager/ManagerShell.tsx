"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Activity,
  Apple,
  BarChart3,
  CreditCard,
  Dumbbell,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Shield,
  UserRoundCog,
  Users,
  WalletCards,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeProvider, useManagerTheme } from "@/components/manager/ThemeProvider";

const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/manager-dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
    ],
  },
  {
    label: "Members",
    items: [
      { href: "/manager-dashboard/members", label: "Total Members", icon: Users },
      { href: "/manager-dashboard/attendance", label: "Attendance Management", icon: Activity },
      { href: "/manager-dashboard/plans", label: "Membership Plans", icon: WalletCards },
    ],
  },
  {
    label: "Training & Wellness",
    items: [
      { href: "/manager-dashboard/workouts", label: "Personal Training", icon: Dumbbell },
      { href: "/manager-dashboard/diet", label: "Diet Plan Management", icon: Apple },
      { href: "/manager-dashboard/trainers", label: "Trainer Management", icon: UserRoundCog },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/manager-dashboard/payments", label: "Revenue & Payments", icon: CreditCard },
      { href: "/manager-dashboard/equipment", label: "Equipment Management", icon: Wrench },
      { href: "/manager-dashboard/leads", label: "Contact Messages", icon: Mail },
      { href: "/manager-dashboard/reports", label: "Reports & Analytics", icon: BarChart3 },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/manager-dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
];

const flatNav = navGroups.flatMap((group) => group.items);

export function ManagerShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ManagerShellInner>{children}</ManagerShellInner>
    </ThemeProvider>
  );
}

function ManagerShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme } = useManagerTheme();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/manager-login");
    router.refresh();
  }

  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "manager-portal min-h-screen",
        isDark ? "bg-[#050505] text-white" : "bg-[#f4f4f5] text-[#111]"
      )}
    >
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden w-72 overflow-y-auto border-r lg:block",
          isDark
            ? "border-gold/10 bg-[#0a0a0a]/95 backdrop-blur-xl"
            : "border-black/10 bg-white"
        )}
      >
        <div
          className={cn(
            "flex h-20 items-center gap-3 border-b px-6",
            isDark ? "border-gold/10" : "border-black/10"
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 shadow-gold-glow-sm">
            <Shield className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className={cn("text-xs font-semibold uppercase tracking-wider", isDark ? "text-gold/70" : "text-gold-dark")}>
              AAMDAR Fitness Club
            </p>
            <h1 className="font-bold">Gym Management</h1>
          </div>
        </div>

        <nav className="space-y-4 p-4">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p
                className={cn(
                  "mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider",
                  isDark ? "text-gold/50" : "text-gray-400"
                )}
              >
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active =
                    pathname === item.href ||
                    (item.href !== "/manager-dashboard" && pathname.startsWith(`${item.href}/`));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                        isDark
                          ? "text-text-secondary hover:bg-gold/5 hover:text-gold-light"
                          : "text-gray-600 hover:bg-gold/5 hover:text-gold-dark",
                        active &&
                          "border border-gold/20 bg-gold/10 font-medium text-gold-light shadow-gold-glow-sm"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", active && "text-gold")} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header
          className={cn(
            "sticky top-0 z-20 border-b backdrop-blur-xl",
            isDark ? "border-gold/10 bg-[#050505]/90" : "border-black/10 bg-white/90"
          )}
        >
          <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            <div className="lg:hidden">
              <p className="text-sm font-semibold">AAMDAR Gym Management</p>
              <p className={cn("text-xs", isDark ? "text-gold/60" : "text-gray-500")}>
                Manager Dashboard
              </p>
            </div>
            <div
              className={cn(
                "hidden items-center gap-2 text-sm lg:flex",
                isDark ? "text-text-secondary" : "text-gray-500"
              )}
            >
              <Home className="h-4 w-4 text-gold" />
              Enterprise Gym Management System
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={logout}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-xl border px-4 text-sm transition-all duration-200",
                  isDark
                    ? "border-gold/20 text-text-secondary hover:border-gold/40 hover:bg-gold/5 hover:text-gold-light"
                    : "border-black/10 text-gray-600 hover:bg-gold/5 hover:text-gold-dark"
                )}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          <nav
            className={cn(
              "flex gap-2 overflow-x-auto border-t px-4 py-2 lg:hidden",
              isDark ? "border-gold/10" : "border-black/10"
            )}
          >
            {flatNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-xs transition-colors",
                    active
                      ? "bg-gold/15 text-gold-light"
                      : isDark
                        ? "text-text-secondary"
                        : "text-gray-600"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
