'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseBrowserClient } from '@/lib/supabase-browser'
import Navbar from '@/components/Navbar'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/classes'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createSupabaseBrowserClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  const inputClass = 'w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-300 transition-shadow'
  const inputStyle = { borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2E8DE' }}>
      <Navbar forceScrolled />
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#92A07F' }}>Members Area</p>
          <h1 className="text-2xl font-medium" style={{ color: '#153F55' }}>Welcome Back</h1>
          <p className="text-sm mt-2" style={{ color: '#486668' }}>Sign in to access your yoga classes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              autoComplete="current-password"
              className={inputClass}
              style={inputStyle}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
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
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: '#486668' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium hover:opacity-70 transition-opacity" style={{ color: '#B97230' }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
