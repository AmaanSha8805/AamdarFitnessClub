import { NextRequest, NextResponse } from "next/server";
import { getRazorpayInstance, verifyRazorpaySignature } from "@/lib/razorpay";
import { createServiceClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "create-order") {
      const { amount, memberId, planId } = body;

      if (!amount || !memberId) {
        return NextResponse.json({ error: "Amount and memberId required" }, { status: 400 });
      }

      const razorpay = getRazorpayInstance();
      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `renewal_${memberId}_${Date.now()}`,
        notes: { memberId, planId },
      });

      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      });
    }

    if (action === "verify-payment") {
      const { orderId, paymentId, signature, memberId, planId } = body;

      const isValid = verifyRazorpaySignature(orderId, paymentId, signature);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
      }

      const supabase = createServiceClient();
      const { data: plan } = await supabase
        .from("plans")
        .select("duration_months")
        .eq("id", planId)
        .single();

      const durationMonths = plan?.duration_months || 1;
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + durationMonths);

      await supabase
        .from("members")
        .update({
          status: "active",
          plan_id: planId,
          expiry_date: expiryDate.toISOString().split("T")[0],
          join_date: new Date().toISOString().split("T")[0],
        })
        .eq("id", memberId);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Payment API error:", error);
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 });
  }
}
