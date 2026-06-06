"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileDown, Loader2, Sparkles } from "lucide-react";
import { Input, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

interface WorkoutPlan {
  summary: string;
  weeklySplit: { day: string; focus: string; exercises: string[] }[];
  tips: string[];
}

export function WorkoutGeneratorClient() {
  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "muscle_gain",
    experience: "beginner",
  });
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);

    try {
      const res = await fetch("/api/workout-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate plan");
      setPlan(data.plan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    if (!plan) return;
    const content = [
      "AAMDAR FITNESS CLUB — PERSONALIZED WORKOUT PLAN",
      "",
      plan.summary,
      "",
      ...plan.weeklySplit.flatMap((d) => [
        `${d.day}: ${d.focus}`,
        ...d.exercises.map((ex) => `  • ${ex}`),
        "",
      ]),
      "TIPS:",
      ...plan.tips.map((t) => `• ${t}`),
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aamdar-workout-plan.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="glass-card space-y-5 p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="Age"
            type="number"
            required
            min={14}
            max={80}
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            placeholder="25"
          />
          <Input
            label="Weight (kg)"
            type="number"
            required
            min={30}
            max={200}
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            placeholder="70"
          />
          <Input
            label="Height (cm)"
            type="number"
            required
            min={120}
            max={220}
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
            placeholder="175"
          />
          <Select
            label="Goal"
            required
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            options={[
              { value: "weight_loss", label: "Weight Loss" },
              { value: "muscle_gain", label: "Muscle Gain" },
              { value: "strength", label: "Strength" },
              { value: "toning", label: "Toning" },
              { value: "endurance", label: "Endurance" },
            ]}
          />
          <Select
            label="Experience Level"
            required
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            options={[
              { value: "beginner", label: "Beginner" },
              { value: "intermediate", label: "Intermediate" },
              { value: "advanced", label: "Advanced" },
            ]}
          />
        </div>

        <Button type="submit" fullWidth isLoading={loading} size="lg">
          <Sparkles className="h-4 w-4" />
          Generate My Plan
        </Button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>

      <AnimatePresence>
        {plan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass-card p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black uppercase text-white">
                  Your Plan
                </h2>
                <p className="mt-2 text-sm text-text-secondary">{plan.summary}</p>
              </div>
              <button
                onClick={exportPDF}
                className="flex shrink-0 items-center gap-2 rounded-full border border-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-white"
              >
                <FileDown className="h-4 w-4" />
                Export
              </button>
            </div>

            <div className="space-y-4">
              {plan.weeklySplit.map((day) => (
                <div
                  key={day.day}
                  className="rounded-xl border border-white/5 bg-black/50 p-5"
                >
                  <h3 className="font-bold uppercase tracking-wide text-primary">
                    {day.day} — {day.focus}
                  </h3>
                  <ul className="mt-3 space-y-1.5">
                    {day.exercises.map((ex) => (
                      <li key={ex} className="text-sm text-text-secondary">
                        • {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {plan.tips.length > 0 && (
              <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-5">
                <h4 className="text-sm font-bold uppercase text-primary">Pro Tips</h4>
                <ul className="mt-2 space-y-1">
                  {plan.tips.map((tip) => (
                    <li key={tip} className="text-sm text-text-secondary">
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-8 text-text-secondary">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Generating your personalized plan...
        </div>
      )}
    </div>
  );
}
