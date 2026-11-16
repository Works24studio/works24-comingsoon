import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { earlyAccessSchema } from "@/lib/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiter per IP
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = earlyAccessSchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message || "Invalid form submission.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { fullName, email, countryCode, phone, website } = parsed.data;

    // Silently drop bot submissions that filled the hidden honeypot field
    if (website && website.length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const formattedPhone = `${countryCode} ${phone}`;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Works24 <onboarding@resend.dev>";
    const adminEmail = process.env.ADMIN_NOTIFY_EMAIL;

    if (!process.env.RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY in environment variables.");
      return NextResponse.json(
        { error: "Email service is not configured yet." },
        { status: 500 }
      );
    }

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(formattedPhone);

    const emailTasks: Promise<unknown>[] = [
      // 1. User Confirmation Email
      resend.emails.send({
        from: fromEmail,
        to: email,
        subject: "You're on the Works24 Early Access List",
        html: `
          <div style="background-color:#041126;padding:40px 20px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#F8FAFC;">
            <div style="max-width:520px;margin:0 auto;background-color:#061B3A;border:1px solid rgba(197,155,67,0.35);border-radius:16px;padding:36px 28px;">
              <div style="text-align:center;margin-bottom:24px;">
                <span style="display:inline-block;padding:6px 14px;border-radius:999px;background:rgba(197,155,67,0.14);border:1px solid rgba(197,155,67,0.4);color:#DFBD69;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">
                  WORKS24 • EARLY ACCESS
                </span>
              </div>
              <h1 style="margin:0 0 12px;font-size:24px;line-height:1.3;color:#FFFFFF;text-align:center;">
                A New Experience Awaits, ${safeName}.
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#CBD5E1;text-align:center;">
                We are building something better. Thank you for joining the <strong style="color:#DFBD69;">Works24</strong> early access list—we'll notify you as soon as our doors open.
              </p>
              <div style="background:#041126;border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px 20px;margin-bottom:24px;">
                <p style="margin:0 0 6px;font-size:12px;color:#94A3B8;text-transform:uppercase;letter-spacing:0.8px;">Registered Details</p>
                <p style="margin:4px 0;font-size:14px;color:#F8FAFC;"><strong>Name:</strong> ${safeName}</p>
                <p style="margin:4px 0;font-size:14px;color:#F8FAFC;"><strong>Email:</strong> ${safeEmail}</p>
                <p style="margin:4px 0;font-size:14px;color:#F8FAFC;"><strong>Phone:</strong> ${safePhone}</p>
              </div>
              <p style="margin:0;font-size:12px;color:#64748B;text-align:center;">
                © ${new Date().getFullYear()} Works24. All rights reserved.
              </p>
            </div>
          </div>
        `,
      }),
    ];

    // 2. Admin Notification Email (if configured)
    if (adminEmail) {
      emailTasks.push(
        resend.emails.send({
          from: fromEmail,
          to: adminEmail,
          replyTo: email,
          subject: `New Works24 Early Access Lead: ${fullName}`,
          html: `
            <div style="font-family:sans-serif;padding:24px;background:#F8FAFC;color:#061B3A;">
              <h2 style="margin:0 0 16px;color:#061B3A;">New Early Access Registration</h2>
              <table style="border-collapse:collapse;width:100%;max-width:480px;background:#FFFFFF;border:1px solid #E2E8F0;">
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;font-weight:600;">Full Name</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;font-weight:600;">Email</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;">${safeEmail}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;font-weight:600;">Phone</td>
                  <td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;">${safePhone}</td>
                </tr>
                <tr>
                  <td style="padding:10px 14px;font-weight:600;">Timestamp (IST)</td>
                  <td style="padding:10px 14px;">${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</td>
                </tr>
              </table>
            </div>
          `,
        })
      );
    }

    const results = await Promise.allSettled(emailTasks);
    const allFailed = results.every((r) => r.status === "rejected");

    if (allFailed) {
      console.error("Resend delivery failed:", results);
      return NextResponse.json(
        { error: "Unable to complete registration right now. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "You're on the Works24 Early Access list!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Early access API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}