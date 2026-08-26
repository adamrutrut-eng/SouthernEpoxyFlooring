import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import business from '@/content/business.json';

// Best-effort per-instance rate limit: this endpoint sends real email, so
// blunt abuse (loops, scripts) gets cut off even without shared storage.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { error: 'Quote form is not configured' },
      { status: 503 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot field — bots fill it, humans never see it.
  if (typeof body.company === 'string' && body.company !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? '').slice(0, 200).trim();
  const phone = String(body.phone ?? '').slice(0, 50).trim();
  const email = String(body.email ?? '').slice(0, 200).trim();
  const city = String(body.city ?? '').slice(0, 100).trim();
  const message = String(body.message ?? '').slice(0, 5000).trim();

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"${business.name} Website" <${SMTP_USER}>`,
      to: business.email,
      replyTo: validEmail ? email : undefined,
      subject: `New quote request — ${name}${city ? ` (${city})` : ''}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || '—'}`,
        `City: ${city || '—'}`,
        '',
        message,
      ].join('\n'),
    });
  } catch (err) {
    console.error(
      'quote form sendMail failed:',
      err instanceof Error ? err.message : err
    );
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
