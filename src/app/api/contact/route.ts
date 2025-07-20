import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Debug: Check if API key is available (don't log the full key)
console.log('Resend API key available:', !!process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API called');
    
    const { name, email } = await request.json();
    console.log('Received data:', { name, email });

    // Validate input
    if (!name || !email) {
      console.log('Validation failed: missing name or email');
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Send email using Resend
    if (!resend) {
      console.log('Resend not configured - missing API key');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    console.log('Attempting to send email...');

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['nathanieltricarico@gmail.com'],
      subject: 'New Membership Interest',
      html: `
        <h2>New Membership Interest</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>This person is interested in being notified when the membership platform is available.</p>
        <hr>
        <p><small>Sent from Balanced Yoga website</small></p>
      `,
    });

    console.log('Resend response:', { data, error });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
} 