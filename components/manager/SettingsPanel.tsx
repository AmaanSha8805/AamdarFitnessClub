"use client";

import { useState, useTransition } from "react";
import { Building2, KeyRound, Shield } from "lucide-react";

type GymSettings = {
  gymName: string;
  logoUrl?: string | null;
  address?: string | null;
  contactNumber?: string | null;
  email?: string | null;
  openingTime?: string | null;
  closingTime?: string | null;
  facebookUrl?: string | null;
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
  twitterUrl?: string | null;
  whatsappNumber?: string | null;
};

export function SettingsPanel({ settings }: { settings: GymSettings }) {
  const [gym, setGym] = useState(settings);
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [emailChange, setEmailChange] = useState({ currentPassword: "", newEmail: "" });
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function saveGym() {
    startTransition(async () => {
      const response = await fetch("/api/manager/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: gym }),
      });
      const data = await response.json();
      setMessage(response.ok ? "Gym settings saved." : data.error || "Save failed.");
    });
  }

  function changePassword() {
    startTransition(async () => {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });
      const data = await response.json();
      if (response.ok) {
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setMessage("Password updated successfully.");
      } else {
        setMessage(data.error || "Password update failed.");
      }
    });
  }

  function changeEmail() {
    startTransition(async () => {
      const response = await fetch("/api/auth/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailChange),
      });
      const data = await response.json();
      if (response.ok) {
        setEmailChange({ currentPassword: "", newEmail: "" });
        setMessage(`Login email updated to ${data.email}.`);
      } else {
        setMessage(data.error || "Email update failed.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Settings</h1>
        <p className="mt-2 text-sm text-text-secondary">Gym information, security, and system configuration.</p>
      </div>

      {message && <p className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-3 text-sm">{message}</p>}

      <section className="rounded-lg border border-white/10 bg-background-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Gym Information</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Gym Name" value={gym.gymName} onChange={(v) => setGym({ ...gym, gymName: v })} />
          <Field label="Logo URL" value={gym.logoUrl || ""} onChange={(v) => setGym({ ...gym, logoUrl: v })} />
          <Field label="Contact Number" value={gym.contactNumber || ""} onChange={(v) => setGym({ ...gym, contactNumber: v })} />
          <Field label="Email" value={gym.email || ""} onChange={(v) => setGym({ ...gym, email: v })} />
          <Field label="Opening Time" value={gym.openingTime || ""} onChange={(v) => setGym({ ...gym, openingTime: v })} />
          <Field label="Closing Time" value={gym.closingTime || ""} onChange={(v) => setGym({ ...gym, closingTime: v })} />
          <Field label="WhatsApp Number" value={gym.whatsappNumber || ""} onChange={(v) => setGym({ ...gym, whatsappNumber: v })} />
          <Field label="Facebook URL" value={gym.facebookUrl || ""} onChange={(v) => setGym({ ...gym, facebookUrl: v })} />
          <Field label="Instagram URL" value={gym.instagramUrl || ""} onChange={(v) => setGym({ ...gym, instagramUrl: v })} />
          <Field label="YouTube URL" value={gym.youtubeUrl || ""} onChange={(v) => setGym({ ...gym, youtubeUrl: v })} />
          <div className="sm:col-span-2">
            <label className="space-y-2">
              <span className="text-sm text-text-secondary">Address</span>
              <textarea
                value={gym.address || ""}
                onChange={(e) => setGym({ ...gym, address: e.target.value })}
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </label>
          </div>
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={saveGym}
          className="mt-4 inline-flex h-11 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-white disabled:opacity-50"
        >
          Save Gym Settings
        </button>
      </section>

      <section className="rounded-lg border border-white/10 bg-background-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Change Login Email</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Current Password" type="password" value={emailChange.currentPassword} onChange={(v) => setEmailChange({ ...emailChange, currentPassword: v })} />
          <Field label="New Email" type="email" value={emailChange.newEmail} onChange={(v) => setEmailChange({ ...emailChange, newEmail: v })} />
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={changeEmail}
          className="mt-4 inline-flex h-11 items-center rounded-lg border border-white/10 px-4 text-sm font-semibold hover:bg-white/10 disabled:opacity-50"
        >
          Update Login Email
        </button>
      </section>

      <section className="rounded-lg border border-white/10 bg-background-card p-5">
        <div className="mb-4 flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Change Password</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Current Password" type="password" value={passwords.currentPassword} onChange={(v) => setPasswords({ ...passwords, currentPassword: v })} />
          <Field label="New Password" type="password" value={passwords.newPassword} onChange={(v) => setPasswords({ ...passwords, newPassword: v })} />
          <Field label="Confirm Password" type="password" value={passwords.confirmPassword} onChange={(v) => setPasswords({ ...passwords, confirmPassword: v })} />
        </div>
        <button
          type="button"
          disabled={isPending}
          onClick={changePassword}
          className="mt-4 inline-flex h-11 items-center rounded-lg border border-white/10 px-4 text-sm font-semibold hover:bg-white/10 disabled:opacity-50"
        >
          Update Password
        </button>
      </section>

      <section className="rounded-lg border border-white/10 bg-background-card p-5">
        <div className="mb-2 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Roles & Security</h2>
        </div>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li>ADMIN — Full system access</li>
          <li>MANAGER — Gym operations and reports</li>
          <li>STAFF — Limited operational access</li>
          <li>All dashboard routes are protected by secure session cookies and middleware.</li>
        </ul>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="space-y-2">
      <span className="text-sm text-text-secondary">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-lg border border-white/10 bg-black/60 px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
