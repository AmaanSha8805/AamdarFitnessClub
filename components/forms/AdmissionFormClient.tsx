"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, UserPlus } from "lucide-react";
import { Input, Select, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useGender } from "@/contexts/GenderContext";
import Link from "next/link";

interface FormErrors {
  [key: string]: string;
}

const PLANS = [
  { value: "", label: "Select a plan" },
  { value: "monthly", label: "Monthly — ₹1,500" },
  { value: "quarterly", label: "Quarterly — ₹4,000" },
  { value: "half-yearly", label: "Half-Yearly — ₹7,500" },
  { value: "annual", label: "Annual — ₹12,000" },
  { value: "personal-training", label: "Personal Training Add-on" },
  { value: "couple", label: "Couple Plan — ₹7,000" },
];

export function AdmissionFormClient() {
  const { gender } = useGender();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: (gender || "male") as string,
    address: "",
    goal: "fitness",
    batch: "morning",
    planId: "",
    emergencyContact: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10)
      e.phone = "Valid 10-digit phone required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.age || parseInt(form.age) < 14 || parseInt(form.age) > 80)
      e.age = "Age must be 14–80";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.emergencyContact.trim()) e.emergencyContact = "Emergency contact required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setSuccess(true);
    } catch (err) {
      setErrors({
        submit: err instanceof Error ? err.message : "Failed to submit. Try WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        className="glass-card mx-auto max-w-lg p-10 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success/20">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-2xl font-black uppercase text-white">Application Received!</h2>
        <p className="mt-4 text-text-secondary">
          Thank you, {form.name}! Our team will contact you on WhatsApp shortly to complete your registration.
        </p>
        <Link href="/" className="premium-btn mt-8 inline-flex">
          Back to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card mx-auto max-w-2xl space-y-5 p-6 sm:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
          <UserPlus className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-bold text-white">Membership Application</h2>
          <p className="text-xs text-text-muted">All fields required</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name}
          placeholder="Rahul Sharma"
        />
        <Input
          label="Phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone}
          placeholder="+91 98765 43210"
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
          placeholder="you@email.com"
        />
        <Input
          label="Age"
          type="number"
          required
          min={14}
          max={80}
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          error={errors.age}
        />
        <Select
          label="Gender"
          required
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "other", label: "Other" },
          ]}
        />
        <Select
          label="Goal"
          required
          value={form.goal}
          onChange={(e) => setForm({ ...form, goal: e.target.value })}
          options={[
            { value: "weight_loss", label: "Weight Loss" },
            { value: "muscle_gain", label: "Muscle Gain" },
            { value: "fitness", label: "General Fitness" },
            { value: "strength", label: "Strength Training" },
            { value: "toning", label: "Toning" },
          ]}
        />
        <Select
          label="Preferred Batch"
          required
          value={form.batch}
          onChange={(e) => setForm({ ...form, batch: e.target.value })}
          options={[
            { value: "morning", label: "Morning (5:30 AM – 10:00 AM)" },
            { value: "evening", label: "Evening (4:00 PM – 9:00 PM)" },
          ]}
        />
        <Select
          label="Selected Plan"
          value={form.planId}
          onChange={(e) => setForm({ ...form, planId: e.target.value })}
          options={PLANS}
        />
      </div>

      <Textarea
        label="Address"
        required
        rows={2}
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
        error={errors.address}
        placeholder="Full address in Parbhani"
      />
      <Input
        label="Emergency Contact"
        type="tel"
        required
        value={form.emergencyContact}
        onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
        error={errors.emergencyContact}
        placeholder="Family member phone number"
      />

      <AnimatePresence>
        {errors.submit && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-400"
          >
            {errors.submit}
          </motion.p>
        )}
      </AnimatePresence>

      <Button type="submit" fullWidth size="lg" isLoading={loading}>
        Submit Application
      </Button>
    </motion.form>
  );
}
