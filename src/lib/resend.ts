import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder');

export async function sendWelcomeEmail(email: string, name: string) {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: 'AI Resume Builder <noreply@yourapp.com>',
    to: email,
    subject: 'Welcome to AI Resume Builder!',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366f1;">Welcome, ${name}! 🎉</h1>
        <p>Thanks for signing up for AI Resume Builder. You're one step closer to landing your dream job.</p>
        <p>Here's what you can do:</p>
        <ul>
          <li>Create professional resumes in minutes</li>
          <li>Use AI to generate compelling content</li>
          <li>Choose from beautiful templates</li>
          <li>Export to PDF instantly</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" 
           style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 16px;">
          Get Started
        </a>
      </div>
    `,
  });
}

export async function sendVerificationEmail(email: string, verifyUrl: string) {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: 'AI Resume Builder <noreply@yourapp.com>',
    to: email,
    subject: 'Verify your email',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #6366f1;">Verify your email</h1>
        <p>Click the button below to verify your email address.</p>
        <a href="${verifyUrl}"
           style="background: #6366f1; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 16px;">
          Verify Email
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 24px;">If you didn't create an account, you can safely ignore this email.</p>
      </div>
    `,
  });
}
