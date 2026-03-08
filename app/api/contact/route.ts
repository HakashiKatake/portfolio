import { NextResponse } from "next/server";
import { createContactMessage, validateContactMessage } from "@/lib/contact-messages";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: string; email?: string; message?: string };

    const payload = {
      name: body.name ?? "",
      email: body.email ?? "",
      message: body.message ?? "",
    };

    const validation = validateContactMessage(payload);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") ?? undefined;
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0]?.trim() : undefined;

    await createContactMessage(payload, {
      source: "simple/contact",
      userAgent,
      ip,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const isConfigError = message.includes("MONGODB_URI");
    return NextResponse.json(
      { error: isConfigError ? "Contact service is not configured yet." : "Could not save your message. Please try again." },
      { status: isConfigError ? 503 : 500 },
    );
  }
}
