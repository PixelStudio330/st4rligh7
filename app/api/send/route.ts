import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, attachment } = await req.json();

    // Prepare the email configuration
    const emailOptions: any = {
      from: 'Portfolio <onboarding@resend.dev>',
      to: ['epicmoth14@gmail.com'],
      subject: `✨ New Artsy Message from ${name}`,
      text: `From: ${email}\n\nMessage: ${message}`,
      // We can also add an HTML version to make it look cleaner in your inbox
      html: `
        <div style="font-family: sans-serif; border: 2px solid #8b5a2b; padding: 20px; border-radius: 15px;">
          <h2 style="color: #c45a5a;">New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <div style="background: #fdfcf0; padding: 15px; border-radius: 10px; border: 1px solid #8b5a2b;">
            ${message}
          </div>
          ${attachment ? `<p style="margin-top: 10px; color: #90be6d;"><b>📎 An image was attached to this message.</b></p>` : ''}
        </div>
      `,
    };

    // If a picture was uploaded, add it to the attachments array
    if (attachment) {
      // The frontend sends "data:image/png;base64,xxxx..." 
      // Resend needs the raw base64 and a filename
      const base64Content = attachment.split(',')[1]; 
      
      emailOptions.attachments = [
        {
          filename: 'reference-image.png',
          content: base64Content,
        },
      ];
    }

    const data = await resend.emails.send(emailOptions);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}