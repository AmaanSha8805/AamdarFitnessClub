import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase";
import { sendWhatsAppMessage, WHATSAPP_TEMPLATES } from "@/lib/whatsapp";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, message } = await request.json();

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    try {
      const supabase = createServiceClient();
      await supabase.from("enquiries").insert({
        name,
        phone,
        message,
        source: "contact_form",
      });
    } catch (dbError) {
      console.warn("Supabase unavailable for enquiry:", dbError);
    }

    const ownerPhone = process.env.NEXT_PUBLIC_GYM_WHATSAPP || "";
    if (ownerPhone) {
      await sendWhatsAppMessage({
        phone: ownerPhone,
        message: WHATSAPP_TEMPLATES.contactEnquiry(name, phone, message),
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Failed to submit enquiry" }, { status: 500 });
  }
}
