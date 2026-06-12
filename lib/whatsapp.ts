const N8N_SECRET = process.env.N8N_WEBHOOK_SECRET;

interface WhatsAppPayload {
  phone: string;
  message: string;
  type?: "text" | "template";
}

export async function sendWhatsAppMessage(payload: WhatsAppPayload): Promise<boolean> {
  const token = process.env.WHATSAPP_API_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.warn("WhatsApp API credentials not configured");
    return false;
  }
try {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: payload.phone.replace(/\D/g, ""),
        type: "text",
        text: {
          body: payload.message,
        },
      }),
    }
  );

  const data = await response.json();

  console.log("=================================");
  console.log("WhatsApp Status:", response.status);
  console.log("WhatsApp Response:", data);
  console.log("=================================");

  return response.ok;
} catch (error) {
  console.error("WhatsApp send error:", error);
  return false;
}
}

export async function triggerN8NWebhook(
  webhookUrl: string | undefined,
  payload: Record<string, unknown>
): Promise<boolean> {
  if (!webhookUrl) {
    console.warn("N8N webhook URL not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(N8N_SECRET ? { "X-Webhook-Secret": N8N_SECRET } : {}),
      },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch (error) {
    console.error("N8N webhook error:", error);
    return false;
  }
}

export const WHATSAPP_TEMPLATES = {
  welcome: (name: string) =>
    `🏋️ Welcome to AAMDAR Fitness Club, ${name}!\n\nWe're thrilled to have you join our fitness family at Ganpati Chowk, Parbhani.\n\nYour membership is now active. Visit us during:\n🌅 Morning: 5:30 AM – 10:00 AM\n🌆 Evening: 4:00 PM – 9:00 PM\n\nNeed help? Reply to this message anytime!`,

  renewalReminder: (name: string, daysLeft: number, expiryDate: string) =>
    `Hi ${name}! 👋\n\nYour AAMDAR Fitness Club membership expires in ${daysLeft} day${daysLeft > 1 ? "s" : ""} (${expiryDate}).\n\nRenew now to keep your fitness journey going! Visit our website or reply here to renew.\n\n💪 Don't break the streak!`,

  ownerReport: (stats: { totalMembers: number; activeMembers: number; renewalsDue: number; revenue: number }) =>
    `📊 AAMDAR Fitness Club — Daily Report\n\n👥 Total Members: ${stats.totalMembers}\n✅ Active: ${stats.activeMembers}\n⏰ Renewals Due Today: ${stats.renewalsDue}\n💰 Revenue This Month: ₹${stats.revenue.toLocaleString("en-IN")}\n\nHave a great day! 💪`,

  admissionConfirmation: (name: string) =>
    `Hi ${name}! ✅\n\nYour admission form for AAMDAR Fitness Club has been received.\n\nOur team will contact you shortly on WhatsApp to complete your registration.\n\n📍 Ganpati Chowk, Aamdar Complex, Parbhani`,

  contactEnquiry: (name: string, phone: string, message: string) =>
    `📩 New Enquiry — AAMDAR Fitness Club\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`,
};
