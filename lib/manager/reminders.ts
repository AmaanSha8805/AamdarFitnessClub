import { Member, Payment } from "@prisma/client";

type ReminderMember = Pick<Member, "fullName" | "mobileNumber" | "expiryDate"> & {
  payments?: Pick<Payment, "status">[];
};

export function getDaysUntilExpiry(expiryDate: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  return Math.round((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getReminderType(member: ReminderMember) {
  const days = getDaysUntilExpiry(member.expiryDate);
  const hasPendingPayment = member.payments?.some((payment) => payment.status === "PENDING");
  if (hasPendingPayment) return "PENDING_PAYMENT";
  if (days === 7) return "SEVEN_DAYS";
  if (days === 3) return "THREE_DAYS";
  if (days === 0) return "EXPIRY_DAY";
  return null;
}

export function reminderMessage(member: ReminderMember) {
  const type = getReminderType(member);
  const expiry = member.expiryDate.toLocaleDateString("en-IN");

  if (type === "PENDING_PAYMENT") {
    return `Hi ${member.fullName}, this is a payment reminder from Aamdar Fitness Club. Please clear your pending membership payment to keep your access active.`;
  }

  if (type === "EXPIRY_DAY") {
    return `Hi ${member.fullName}, your Aamdar Fitness Club membership expires today (${expiry}). Please renew today to continue without interruption.`;
  }

  return `Hi ${member.fullName}, your Aamdar Fitness Club membership expires on ${expiry}. Please renew soon to continue your fitness routine.`;
}

export function whatsappReminderLink(member: ReminderMember) {
  const digits = member.mobileNumber.replace(/\D/g, "");
  const phone = digits.length === 10 ? `91${digits}` : digits;
  return `https://wa.me/${phone}?text=${encodeURIComponent(reminderMessage(member))}`;
}
