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

    // Run Brevo + Resend in parallel — don't block the response on either
    const tasks: Promise<void>[] = []

    if (process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID) {
      tasks.push(
        fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
          },
          body: JSON.stringify({
            email: email.toLowerCase().trim(),
            attributes: { FIRSTNAME: name.trim() },
            listIds: [parseInt(process.env.BREVO_LIST_ID)],
            updateEnabled: true,
          }),
        })
          .then(r => { console.log(r.ok ? `Contact added to Brevo list ${process.env.BREVO_LIST_ID}` : 'Brevo error') })
          .catch(e => { console.error('Brevo call failed:', e) })
      )
    }

    if (resend) {
      tasks.push(
        resend.emails.send({
          from: 'onboarding@resend.dev',
          to: ['nathanieltricarico@gmail.com'],
          subject: 'New Membership Interest',
          html: `<h2>New Membership Interest</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
        })
          .then(({ error }) => { console.log(error ? `Resend error: ${error}` : 'Email notification sent') })
          .catch(e => { console.error('Resend failed:', e) })
      )
    }

    await Promise.allSettled(tasks)

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