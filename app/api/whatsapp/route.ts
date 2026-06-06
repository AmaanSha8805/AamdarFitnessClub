import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import {
  triggerN8NWebhook,
  sendWhatsAppMessage,
  WHATSAPP_TEMPLATES,
} from "@/lib/whatsapp";
import { formatDate } from "@/lib/utils";

function verifyWebhookSecret(request: NextRequest): boolean {
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (!secret) return true;
  return request.headers.get("X-Webhook-Secret") === secret;
}

export async function POST(request: NextRequest) {
  if (!verifyWebhookSecret(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    const supabase = createServiceClient();

    switch (action) {
      case "new-member": {
        const { memberId, name, phone } = await request.json();
        await sendWhatsAppMessage({
          phone,
          message: WHATSAPP_TEMPLATES.welcome(name),
        });
        await triggerN8NWebhook(process.env.N8N_WEBHOOK_NEW_MEMBER, {
          memberId,
          name,
          phone,
        });
        return NextResponse.json({ success: true });
      }

      case "renewal-reminder": {
        const today = new Date();
        const reminderDays = [5, 3, 1];
        let sentCount = 0;

        for (const days of reminderDays) {
          const targetDate = new Date(today);
          targetDate.setDate(targetDate.getDate() + days);
          const dateStr = targetDate.toISOString().split("T")[0];

          const { data: members } = await supabase
            .from("members")
            .select("name, phone, expiry_date")
            .eq("status", "active")
            .eq("expiry_date", dateStr);

          for (const member of members || []) {
            await sendWhatsAppMessage({
              phone: member.phone,
              message: WHATSAPP_TEMPLATES.renewalReminder(
                member.name,
                days,
                formatDate(member.expiry_date)
              ),
            });
            sentCount++;
          }
        }

        return NextResponse.json({ success: true, sentCount });
      }

      case "owner-report": {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);

        const { count: totalMembers } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true });

        const { count: activeMembers } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true })
          .eq("status", "active");

        const today = new Date().toISOString().split("T")[0];
        const { count: renewalsDue } = await supabase
          .from("members")
          .select("*", { count: "exact", head: true })
          .eq("expiry_date", today)
          .eq("status", "active");

        const ownerPhone = process.env.NEXT_PUBLIC_GYM_WHATSAPP || "";
        await sendWhatsAppMessage({
          phone: ownerPhone,
          message: WHATSAPP_TEMPLATES.ownerReport({
            totalMembers: totalMembers || 0,
            activeMembers: activeMembers || 0,
            renewalsDue: renewalsDue || 0,
            revenue: 0,
          }),
        });

        await triggerN8NWebhook(process.env.N8N_WEBHOOK_OWNER_REPORT, {
          totalMembers,
          activeMembers,
          renewalsDue,
        });

        return NextResponse.json({ success: true });
      }

      case "broadcast": {
        const { message } = await request.json();
        if (!message) {
          return NextResponse.json({ error: "Message required" }, { status: 400 });
        }

        const { data: members } = await supabase
          .from("members")
          .select("phone")
          .eq("status", "active");

        let sentCount = 0;
        for (const member of members || []) {
          const sent = await sendWhatsAppMessage({ phone: member.phone, message });
          if (sent) sentCount++;
        }

        await supabase.from("broadcasts").insert({
          message,
          recipient_count: sentCount,
        });

        await triggerN8NWebhook(process.env.N8N_WEBHOOK_BROADCAST, {
          message,
          sentCount,
        });

        return NextResponse.json({ success: true, sentCount });
      }

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("WhatsApp API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
