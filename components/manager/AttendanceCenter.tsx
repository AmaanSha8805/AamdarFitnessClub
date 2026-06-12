"use client";

import { useState, useTransition } from "react";
import { QrCode, UserCheck, LogIn, LogOut } from "lucide-react";

type Analytics = {
  byDay: { label: string; count: number }[];
  qrCount: number;
  manualCount: number;
  total: number;
};

type Props = {
  analytics: Analytics;
  branches: { label: string; value: string }[];
};

export function AttendanceCenter({ analytics, branches }: Props) {
  const [memberCode, setMemberCode] = useState("");
  const [branchId, setBranchId] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function checkIn(type: "MANUAL" | "QR_CODE") {
    startTransition(async () => {
      setMessage("");
      const response = await fetch("/api/manager/attendance/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberCode, type, branchId: branchId || undefined }),
      });
      const data = await response.json();
      if (!response.ok) {
        setMessage(data.error || "Check-in failed.");
        return;
      }
      setMessage(`${data.action === "checkout" ? "Checked out" : "Checked in"}: ${data.member}`);
      if (data.action === "checkout") setMemberCode("");
    });
  }

  const qrUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/manager-dashboard/attendance?scan=1`
      : "/manager-dashboard/attendance";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Attendance</h1>
        <p className="mt-2 text-sm text-text-secondary">Manual check-in, QR attendance, and monthly analytics.</p>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 lg:col-span-2">
          <h2 className="font-semibold">Quick Check-In / Check-Out</h2>
          <p className="mt-1 text-sm text-text-secondary">Enter member ID (e.g. AAM-0001). Same code checks out if already checked in today.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_180px_auto_auto]">
            <input
              value={memberCode}
              onChange={(e) => setMemberCode(e.target.value.toUpperCase())}
              placeholder="Member ID"
              className="h-11 rounded-lg border border-white/10 bg-black/60 px-3 text-sm outline-none focus:border-primary"
            />
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              className="h-11 rounded-lg border border-white/10 bg-black/60 px-3 text-sm outline-none focus:border-primary"
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch.value} value={branch.value}>
                  {branch.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={isPending || !memberCode}
              onClick={() => checkIn("MANUAL")}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" />
              Manual
            </button>
            <button
              type="button"
              disabled={isPending || !memberCode}
              onClick={() => checkIn("QR_CODE")}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold hover:bg-white/10 disabled:opacity-50"
            >
              <QrCode className="h-4 w-4" />
              QR
            </button>
          </div>
          {message && <p className="mt-3 text-sm text-green-400">{message}</p>}
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            <h2 className="font-semibold">QR Attendance</h2>
          </div>
          <p className="mt-2 text-sm text-text-secondary">Members scan or staff enters member ID at the attendance desk.</p>
          <div className="mt-4 flex h-36 items-center justify-center rounded-lg border border-dashed border-white/20 bg-black/40 text-xs text-text-secondary">
            QR: {qrUrl}
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Stat label="This Month" value={analytics.total} icon={UserCheck} />
        <Stat label="QR Check-ins" value={analytics.qrCount} icon={QrCode} />
        <Stat label="Manual Check-ins" value={analytics.manualCount} icon={LogOut} />
      </section>

      <section className="rounded-lg border border-white/10 bg-background-card p-4">
        <h2 className="mb-4 font-semibold">Monthly Attendance</h2>
        <div className="flex h-40 items-end gap-2">
          {analytics.byDay.map((day) => (
            <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t bg-primary/80"
                style={{ height: `${Math.max(8, (day.count / Math.max(...analytics.byDay.map((d) => d.count), 1)) * 120)}px` }}
              />
              <span className="text-[10px] text-text-secondary">{day.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: React.ElementType }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-text-secondary">{label}</p>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <p className="mt-3 text-2xl font-bold">{value}</p>
    </div>
  );
}
