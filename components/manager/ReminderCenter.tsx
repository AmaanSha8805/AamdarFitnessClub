"use client";

import { Mail, MessageCircle } from "lucide-react";

type Reminder = {
  id: string;
  fullName: string;
  mobileNumber: string;
  email?: string | null;
  planName: string;
  expiryDate: string;
  type: string | null;
  whatsappUrl: string;
};

export function ReminderCenter({ rows }: { rows: Reminder[] }) {
  async function logReminder(memberIds: string[], channel: "WHATSAPP" | "EMAIL") {
    await fetch("/api/manager/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ memberIds, channel }),
    });
  }

  async function sendEmail(row: Reminder) {
    if (!row.email) {
      alert("This member does not have an email address.");
      return;
    }
    const response = await fetch("/api/manager/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: row.email,
        template: row.type === "EXPIRY_DAY" ? "expiry" : "renewal",
        name: row.fullName,
        detail: `Plan: ${row.planName}. Expiry: ${row.expiryDate}.`,
      }),
    });
    if (!response.ok) {
      const payload = await response.json();
      alert(payload.error || "Email could not be sent.");
      return;
    }
    await logReminder([row.id], "EMAIL");
    alert("Email reminder sent.");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Renewal Reminders</h1>
          <p className="mt-2 text-sm text-text-secondary">Automatic logic covers 7 days, 3 days, expiry day, and pending payments.</p>
        </div>
        <button
          onClick={() => {
            logReminder(rows.map((row) => row.id), "WHATSAPP");
            window.open(rows.map((row) => row.whatsappUrl).join("\n"), "_blank");
          }}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" />
          Bulk WhatsApp
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-background-card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-sm">
            <thead className="bg-white/[0.03] text-left text-xs uppercase text-text-secondary">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Plan</th>
                <th className="px-4 py-3">Expiry</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="px-4 py-3">{row.fullName}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.planName}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.expiryDate}</td>
                  <td className="px-4 py-3 text-text-secondary">{row.type.replaceAll("_", " ")}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <a
                        href={row.whatsappUrl}
                        target="_blank"
                        onClick={() => logReminder([row.id], "WHATSAPP")}
                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-[#25D366] px-3 text-xs font-semibold text-white"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                      <button onClick={() => sendEmail(row)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 px-3 text-xs text-text-secondary hover:bg-white/10">
                        <Mail className="h-4 w-4" />
                        Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-text-secondary">No reminders due right now.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
