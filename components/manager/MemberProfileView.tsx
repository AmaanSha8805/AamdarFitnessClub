"use client";

import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { formatInr } from "@/lib/manager/format";

type Profile = Record<string, any>;

export function MemberProfileView({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/manager-dashboard/members" className="mb-2 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to Members
          </Link>
          <h1 className="text-2xl font-bold sm:text-3xl">{profile.fullName}</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {profile.memberCode} · {profile.mobileNumber} · {profile.status}
          </p>
        </div>
        {profile.photoUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={profile.photoUrl} alt={profile.fullName} className="h-24 w-24 rounded-lg object-cover" />
        )}
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <InfoCard label="Plan" value={profile.planName || "No plan"} />
        <InfoCard label="Trainer" value={profile.trainerName || "-"} />
        <InfoCard label="Branch" value={profile.branchName || "-"} />
        <InfoCard label="Expiry" value={profile.expiryDate} />
        <InfoCard label="Fitness Goal" value={profile.fitnessGoal || "-"} />
        <InfoCard label="Height / Weight" value={`${profile.height || "-"} cm / ${profile.weight || "-"} kg`} />
        <InfoCard label="Emergency Contact" value={profile.emergencyContactName ? `${profile.emergencyContactName} (${profile.emergencyContactPhone})` : "-"} />
        <InfoCard label="Medical Notes" value={profile.medicalNotes || "-"} />
      </section>

      <GridSection title="Payment History">
        {profile.payments?.map((payment: any) => (
          <div key={payment.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
            <span>{payment.date} · {formatInr(Number(payment.amount))} · {payment.method}</span>
            <a
              href={`/api/manager/receipts/${payment.id}`}
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              <Download className="h-4 w-4" />
              Receipt
            </a>
          </div>
        ))}
        {!profile.payments?.length && <Empty />}
      </GridSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <GridSection title="Membership History">
          {profile.membershipHistory?.map((row: any) => (
            <div key={row.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
              {row.action} · {row.planName || "No plan"} · {row.startDate} to {row.endDate}
            </div>
          ))}
          {!profile.membershipHistory?.length && <Empty />}
        </GridSection>

        <GridSection title="Recent Attendance">
          {profile.attendances?.map((row: any) => (
            <div key={row.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
              {row.checkIn} {row.checkOut ? `→ ${row.checkOut}` : "(in gym)"} · {row.type}
            </div>
          ))}
          {!profile.attendances?.length && <Empty />}
        </GridSection>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <GridSection title="Progress Tracking">
          {profile.progressEntries?.map((row: any) => (
            <div key={row.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
              {row.date} · {row.weight || "-"} kg · BMI {row.bmi || "-"} · Goal {row.goalProgress || 0}%
            </div>
          ))}
          {!profile.progressEntries?.length && <Empty />}
        </GridSection>

        <GridSection title="Assigned Plans">
          {profile.workouts?.map((row: any) => (
            <div key={row.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
              Workout: {row.planName}
            </div>
          ))}
          {profile.diets?.map((row: any) => (
            <div key={row.id} className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
              Diet: {row.planName}
            </div>
          ))}
          {profile.locker && (
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm">
              Locker #{profile.locker.number}
            </div>
          )}
          {!profile.workouts?.length && !profile.diets?.length && !profile.locker && <Empty />}
        </GridSection>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs uppercase text-text-muted">{label}</p>
      <p className="mt-2 text-sm font-medium">{value}</p>
    </div>
  );
}

function GridSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-white/10 bg-background-card p-4">
      <h2 className="mb-3 font-semibold">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="text-sm text-text-secondary">No records yet.</p>;
}
