import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { PrismicPerformanceMonitor } from "@/lib/prismic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.type !== "api-update") {
      return NextResponse.json({ message: "Ignored" }, { status: 200 });
    }

    const secret = process.env.PRISMIC_WEBHOOK_SECRET;
    if (secret && body.secret !== secret) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    PrismicPerformanceMonitor.clearCache();

    revalidateTag("prismic");

    return NextResponse.json({
      revalidated: true,
      documents: body.documents?.length ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Prismic webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}
