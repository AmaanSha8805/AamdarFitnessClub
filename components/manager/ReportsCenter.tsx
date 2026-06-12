"use client";

import { FileSpreadsheet, FileText } from "lucide-react";
import { useState } from "react";

export function ReportsCenter() {
  const [period, setPeriod] = useState("monthly");

  function href(format: "excel" | "pdf") {
    return `/api/manager/reports?period=${period}&format=${format}`;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">Reports</h1>
        <p className="mt-2 text-sm text-text-secondary">Export daily, monthly, and yearly revenue, expenses, profit, payments, members, and leads.</p>
      </div>
      <div className="rounded-lg border border-white/10 bg-background-card p-5">
        <div className="grid gap-4 sm:grid-cols-[240px_1fr]">
          <select value={period} onChange={(event) => setPeriod(event.target.value)} className="h-11 rounded-lg border border-white/10 bg-black/60 px-3 text-sm">
            <option value="daily">Daily Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          <div className="flex flex-wrap gap-3">
            <a href={href("excel")} className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-white">
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </a>
            <a href={href("pdf")} className="inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 px-4 text-sm font-semibold text-white hover:bg-white/10">
              <FileText className="h-4 w-4" />
              Export PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
