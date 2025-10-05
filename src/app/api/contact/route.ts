import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: invalid email format');
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Save to Supabase database
    console.log('Saving to Supabase...');
    const { data: signupData, error: supabaseError } = await supabaseAdmin
      .from('membership_signups')
      .insert([
        {
          name: name.trim(),
          email: email.toLowerCase().trim(),
        }
      ])
      .select();

    if (supabaseError) {
      console.error('Supabase error:', supabaseError);
      
      // Check if it's a duplicate email error
      if (supabaseError.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already registered for membership updates' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to save signup data' },
        { status: 500 }
      );
    }

    console.log('Successfully saved to Supabase:', signupData);

    // Optionally send email notification (if Resend is configured)
    if (resend) {
      console.log('Sending email notification...');
      
      try {
        const { data: emailData, error: emailError } = await resend.emails.send({
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

        if (emailError) {
          console.error('Email notification failed:', emailError);
          // Don't fail the request if email fails, just log it
        } else {
          console.log('Email notification sent successfully');
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('Resend not configured - skipping email notification');
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully registered for membership updates',
      data: signupData 
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
} 