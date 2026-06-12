"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Dumbbell, Eye, EyeOff, Lock, ShieldCheck, UserRound } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const managerLoginSchema = z.object({
  managerId: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});

type ManagerLoginInput = z.infer<typeof managerLoginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMessage, setForgotMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ManagerLoginInput>({
    resolver: zodResolver(managerLoginSchema),
    defaultValues: { managerId: "", password: "" },
  });

  function requestPasswordReset() {
    const parsed = forgotPasswordSchema.safeParse({ email: forgotEmail.trim().toLowerCase() });
    if (!parsed.success) {
      setForgotMessage(parsed.error.issues[0]?.message || "Enter a valid email address.");
      return;
    }

    setForgotMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: parsed.data.email }),
      });
      const data = await response.json();
      if (!response.ok) {
        setForgotMessage(data.error || "Unable to send reset link.");
        return;
      }
      setForgotMessage(
        data.resetUrl
          ? `${data.message} ${data.resetUrl}`
          : data.message || "If that email is registered, reset instructions have been sent."
      );
    });
  }

  function submit(data: ManagerLoginInput) {
    setAuthError(null);
    startTransition(async () => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.managerId.trim().toLowerCase(),
          password: data.password,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message =
          result.error ||
          "Invalid credentials. Access is restricted to authorized gym managers only.";
        setAuthError(message);
        if (response.status === 401) {
          form.setError("password", { message: "Invalid email or password." });
        }
        return;
      }

      router.replace(searchParams.get("next") || "/manager-dashboard");
      router.refresh();
    });
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-4 py-12">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.12),transparent)]" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "overflow-hidden rounded-3xl border border-white/10",
            "bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          )}
        >
          <div className="border-b border-white/10 bg-gradient-to-r from-gold/10 via-transparent to-primary/5 px-8 py-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-gold/10 shadow-gold-glow-sm">
              <Dumbbell className="h-8 w-8 text-gold" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/80">
              AAMDAR Fitness Club
            </p>
            <h1 className="mt-2 text-2xl font-black text-white">Manager Portal</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Secure access for gym managers &amp; administrators
            </p>
          </div>

          <form onSubmit={form.handleSubmit(submit)} className="space-y-5 p-8">
            {authError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary-light"
                role="alert"
              >
                {authError}
              </motion.div>
            )}

            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                <UserRound className="h-4 w-4 text-gold/70" />
                Email
              </span>
              <input
                type="email"
                autoComplete="username"
                placeholder="manager@aamdarfitness.com"
                {...form.register("managerId")}
                className={cn(
                  "h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none",
                  "placeholder:text-text-muted transition-all duration-200",
                  "focus:border-gold/50 focus:bg-black/60 focus:shadow-gold-glow-sm"
                )}
              />
              {form.formState.errors.managerId && (
                <p className="text-xs text-primary">{form.formState.errors.managerId.message}</p>
              )}
            </label>

            <label className="block space-y-2">
              <span className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                <Lock className="h-4 w-4 text-gold/70" />
                Password
              </span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...form.register("password")}
                  className={cn(
                    "h-12 w-full rounded-xl border border-white/10 bg-black/40 px-4 pr-12 text-sm text-white outline-none",
                    "placeholder:text-text-muted transition-all duration-200",
                    "focus:border-gold/50 focus:bg-black/60 focus:shadow-gold-glow-sm"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-text-muted transition-colors hover:text-gold"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-primary">{form.formState.errors.password.message}</p>
              )}
            </label>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowForgot((value) => !value);
                  setForgotEmail(form.getValues("managerId"));
                  setForgotMessage(null);
                }}
                className="text-xs font-medium text-gold/80 transition-colors hover:text-gold"
              >
                Forgot password?
              </button>
            </div>

            {showForgot && (
              <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
                <p className="text-xs text-text-secondary">
                  Enter your manager email to receive a password reset link.
                </p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="manager@aamdarfitness.com"
                  className="h-11 w-full rounded-xl border border-white/10 bg-black/40 px-4 text-sm text-white outline-none focus:border-gold/50"
                />
                <button
                  type="button"
                  disabled={isPending}
                  onClick={requestPasswordReset}
                  className="h-10 w-full rounded-xl border border-gold/30 text-sm font-semibold text-gold hover:bg-gold/10 disabled:opacity-60"
                >
                  Send Reset Link
                </button>
                {forgotMessage && (
                  <p className="text-xs leading-relaxed text-text-secondary">{forgotMessage}</p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "group relative mt-2 flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl",
                "bg-gradient-to-r from-gold-dark via-gold to-gold-light font-bold text-black",
                "shadow-gold-glow-sm transition-all duration-300",
                "hover:shadow-gold-glow hover:scale-[1.01] active:scale-[0.99]",
                "disabled:cursor-not-allowed disabled:opacity-60"
              )}
            >
              <ShieldCheck className="h-4 w-4 transition-transform group-hover:scale-110" />
              {isPending ? "Authenticating..." : "Secure Login"}
            </button>

            <p className="pt-2 text-center text-xs text-text-muted">
              This portal is exclusively for authorized gym staff. Members do not have access.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
