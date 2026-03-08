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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

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
