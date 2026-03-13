import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { name, email } = await req.json()
  if (!email) return NextResponse.json({ ok: false })

  if (!process.env.BREVO_API_KEY || !process.env.BREVO_LIST_ID) {
    return NextResponse.json({ ok: false, reason: 'Brevo not configured' })
  }

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes: { FIRSTNAME: name?.trim() || email.split('@')[0] },
        listIds: [parseInt(process.env.BREVO_LIST_ID)],
        updateEnabled: true,
      }),
    })
    return NextResponse.json({ ok: res.ok })
  } catch {
    return NextResponse.json({ ok: false })
  }
}
