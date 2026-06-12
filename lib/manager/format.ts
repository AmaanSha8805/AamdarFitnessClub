export function toDateInput(value: Date | string) {
  return new Date(value).toISOString().slice(0, 10);
}

export function toMoney(value: unknown) {
  if (typeof value === "number") return value;
  if (value && typeof value === "object" && "toNumber" in value) {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value || 0);
}

export function serializeRecord<T extends Record<string, unknown>>(record: T) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => {
      if (value instanceof Date) return [key, toDateInput(value)];
      if (value && typeof value === "object" && "toNumber" in value) {
        return [key, toMoney(value)];
      }
      return [key, value];
    })
  );
}

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
