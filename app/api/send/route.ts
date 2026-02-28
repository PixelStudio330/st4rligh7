import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>', // Resend gives you this for testing
      to: ['epicmoth14@gmail.com'], // PUT YOUR EMAIL HERE
      subject: `✨ New Artsy Message from ${name}`,
      text: `From: ${email}\n\nMessage: ${message}`,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}