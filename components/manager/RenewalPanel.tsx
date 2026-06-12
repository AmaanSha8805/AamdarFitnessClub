"use client";

import { useState, useTransition } from "react";

type Option = { label: string; value: string; price?: number };

export function RenewalPanel({ members, plans }: { members: Option[]; plans: Option[] }) {
  const [isPending, startTransition] = useTransition();
  const [memberId, setMemberId] = useState(members[0]?.value || "");
  const [planId, setPlanId] = useState(plans[0]?.value || "");
  const selectedPlan = plans.find((plan) => plan.value === planId);
  const [amount, setAmount] = useState(selectedPlan?.price || 0);

  function renew() {
    startTransition(async () => {
      const response = await fetch("/api/manager/members/renew", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId,
          planId,
          amount,
          method: "UPI",
          date: new Date().toISOString().slice(0, 10),
        }),
      });

      if (!response.ok) {
        const payload = await response.json();
        alert(payload.error || "Unable to renew membership.");
        return;
      }

      alert("Membership renewed and payment recorded.");
      window.location.reload();
    });
  }

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
      <h2 className="font-semibold">Membership Renewal</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_160px_140px]">
        <select value={memberId} onChange={(event) => setMemberId(event.target.value)} className="h-11 rounded-lg border border-white/10 bg-black/60 px-3 text-sm">
          {members.map((member) => (
            <option key={member.value} value={member.value}>{member.label}</option>
          ))}
        </select>
        <select
          value={planId}
          onChange={(event) => {
            setPlanId(event.target.value);
            setAmount(plans.find((plan) => plan.value === event.target.value)?.price || 0);
          }}
          className="h-11 rounded-lg border border-white/10 bg-black/60 px-3 text-sm"
        >
          {plans.map((plan) => (
            <option key={plan.value} value={plan.value}>{plan.label}</option>
          ))}
        </select>
        <input value={amount} onChange={(event) => setAmount(Number(event.target.value))} type="number" className="h-11 rounded-lg border border-white/10 bg-black/60 px-3 text-sm" />
        <button disabled={isPending || !memberId || !planId} onClick={renew} className="h-11 rounded-lg bg-primary px-4 text-sm font-semibold disabled:opacity-50">
          {isPending ? "Renewing..." : "Renew"}
        </button>
      </div>
    </div>
  );
}
