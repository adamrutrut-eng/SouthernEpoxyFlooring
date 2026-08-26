import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import business from '@/content/business.json';

export async function POST(request: Request) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return NextResponse.json(
      { error: 'Quote form is not configured' },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const name = String(body.name ?? '').slice(0, 200).trim();
  const phone = String(body.phone ?? '').slice(0, 50).trim();
  const email = String(body.email ?? '').slice(0, 200).trim();
  const city = String(body.city ?? '').slice(0, 100).trim();
  const message = String(body.message ?? '').slice(0, 5000).trim();

  if (!name || !phone || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

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
      replyTo: email || undefined,
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
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
