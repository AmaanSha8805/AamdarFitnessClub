"use client";

import { Suspense, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setMessage("");

    startTransition(async () => {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, ...passwords }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Unable to reset password.");
        return;
      }

      setMessage(data.message || "Password updated successfully.");
      setTimeout(() => router.replace("/manager-login"), 1500);
    });
  }

  if (!token) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary-light">
        Invalid or missing reset token.{" "}
        <Link href="/manager-login" className="font-semibold text-gold underline">
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5 p-8">
      {error && (
        <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary-light" role="alert">
          {error}
        </div>
      )}
      {message && (
        <div className="rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-gold">
          {message}
        </div>
      )}

      <label className="block space-y-2">
        <span className="text-sm font-medium text-text-secondary">New Password</span>
        <input
          type="password"
          autoComplete="new-password"
          value={passwords.newPassword}
          onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-gold/50"
          required
          minLength={8}
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-text-secondary">Confirm Password</span>
        <input
          type="password"
          autoComplete="new-password"
          value={passwords.confirmPassword}
          onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
          className="h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-gold/50"
          required
          minLength={8}
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className={cn(
          "flex h-12 w-full items-center justify-center gap-2 rounded-xl",
          "bg-gradient-to-r from-gold-dark via-gold to-gold-light font-bold text-black",
          "disabled:cursor-not-allowed disabled:opacity-60"
        )}
      >
        <ShieldCheck className="h-4 w-4" />
        {isPending ? "Updating..." : "Reset Password"}
      </button>
    </form>
  );
}

export default function ManagerResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 py-12">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <div className="border-b border-white/10 px-8 py-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10">
            <KeyRound className="h-8 w-8 text-gold" />
          </div>
          <h1 className="text-2xl font-black text-white">Reset Password</h1>
          <p className="mt-2 text-sm text-text-secondary">Choose a new manager portal password</p>
        </div>
        <Suspense fallback={<div className="p-8 text-sm text-text-secondary">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}
