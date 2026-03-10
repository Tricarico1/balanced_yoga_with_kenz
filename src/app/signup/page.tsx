'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import Navbar from '@/components/Navbar'

export default function SignupPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const supabase = createSupabaseBrowserClient()

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/classes` },
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // If Supabase returns a session immediately, email confirmation is off — go straight to classes
    if (data.session) {
      router.push('/classes')
      return
    }

    // Otherwise, email confirmation is required
    setSent(true)
  }

  const inputClass = 'w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-300 transition-shadow'
  const inputStyle = { borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2E8DE' }}>
        <div className="w-full max-w-sm text-center">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#92A07F' }}>Almost there</p>
          <h1 className="text-2xl font-medium mb-4" style={{ color: '#153F55' }}>Check your inbox</h1>
          <p className="text-sm leading-relaxed" style={{ color: '#486668' }}>
            We sent a confirmation email to <strong>{email}</strong>.<br />
            Click the link to activate your account, then come back to sign in.
          </p>
          <Link
            href="/login"
            className="inline-block mt-6 text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: '#B97230' }}
          >
            Go to Sign In →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2E8DE' }}>
      <Navbar forceScrolled />
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#92A07F' }}>Members Area</p>
          <h1 className="text-2xl font-medium" style={{ color: '#153F55' }}>Create Account</h1>
          <p className="text-sm mt-2" style={{ color: '#486668' }}>Get access to all yoga classes</p>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 py-2.5 rounded-lg border text-sm font-medium hover:opacity-80 transition-opacity mb-4"
          style={{ borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px" style={{ backgroundColor: '#E8DDD5' }} />
          <span className="text-xs" style={{ color: '#C4B5A8' }}>or</span>
          <div className="flex-1 h-px" style={{ backgroundColor: '#E8DDD5' }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium mb-1.5" style={{ color: '#486668' }}>Name</label>
            <input
              type="text"
              required
              autoComplete="name"
              className={inputClass}
              style={inputStyle}
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium mb-1.5" style={{ color: '#486668' }}>Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              style={inputStyle}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider font-medium mb-1.5" style={{ color: '#486668' }}>Password</label>
            <input
              type="password"
              required
              minLength={6}
              autoComplete="new-password"
              className={inputClass}
              style={inputStyle}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
            />
          </div>

          {error && (
            <p className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: '#FDF0E0', color: '#B97230', border: '1px solid #E8C99A' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-opacity hover:opacity-85 disabled:opacity-50"
            style={{ backgroundColor: '#153F55', color: 'white' }}
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: '#486668' }}>
          Already have an account?{' '}
          <Link href="/login" className="font-medium hover:opacity-70 transition-opacity" style={{ color: '#B97230' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
