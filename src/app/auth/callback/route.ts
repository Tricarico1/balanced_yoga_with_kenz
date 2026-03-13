import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl
  const code = searchParams.get('code')
  const next = searchParams.get('next') || '/classes'

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { data } = await supabase.auth.exchangeCodeForSession(code)

    // Sync new user to Brevo
    if (data.user) {
      const name = data.user.user_metadata?.full_name || data.user.user_metadata?.name || ''
      const email = data.user.email || ''
      fetch(`${origin}/api/brevo-sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      }).catch(() => {})
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
