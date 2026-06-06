import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import {
  triggerN8NWebhook,
  WHATSAPP_TEMPLATES,
  sendWhatsAppMessage,
} from "@/lib/whatsapp";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      phone,
      email,
      age,
      gender,
      address,
      goal,
      batch,
      planId,
      emergencyContact,
    } = body;

    if (!name || !phone || !email || !age || !gender || !address || !goal || !batch || !emergencyContact) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const memberData = {
      name,
      phone,
      email,
      age: parseInt(age),
      gender,
      address,
      goal,
      batch,
      plan_id: planId || null,
      status: "pending" as const,
      emergency_contact: emergencyContact,
    };

    let memberId = `local-${Date.now()}`;

    try {
      const supabase = createServiceClient();
      const { data: member, error } = await supabase
        .from("members")
        .insert(memberData)
        .select()
        .single();

      if (!error && member) {
        memberId = member.id;
      }
    } catch (dbError) {
      console.warn("Supabase unavailable, continuing with local submission:", dbError);
    }

    await sendWhatsAppMessage({
      phone,
      message: WHATSAPP_TEMPLATES.admissionConfirmation(name),
    }).catch(() => {});

    await triggerN8NWebhook(process.env.N8N_WEBHOOK_NEW_MEMBER, {
      memberId,
      name,
      phone,
      email,
      planId,
    }).catch(() => {});

    return NextResponse.json({ success: true, memberId });
  } catch (error) {
    console.error("Admission API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
