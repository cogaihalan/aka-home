import { NextRequest, NextResponse } from "next/server";
import { emailService } from "@/lib/email/service";
import type { Order } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { order, customerName, customerEmail } = body;

    if (!order || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: order, customerName, customerEmail" },
        { status: 400 }
      );
    }

    const [customerResult, adminResult] = await Promise.all([
      emailService.sendOrderConfirmation({
        order: order as Order,
        customerName,
        customerEmail,
      }),
      emailService.sendAdminOrderNotification({
        order: order as Order,
        customerName,
        customerEmail,
      }),
    ]);

    if (!customerResult.success) {
      return NextResponse.json(
        { error: customerResult.error || "Failed to send order confirmation email" },
        { status: 500 }
      );
    }

    if (!adminResult.success) {
      console.error("Failed to send admin notification email:", adminResult.error);
      // Don't fail the request - admin notification is secondary
    }

    return NextResponse.json({ 
      success: true, 
      messageId: customerResult.messageId 
    });
  } catch (error) {
    console.error("Error in order confirmation email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

