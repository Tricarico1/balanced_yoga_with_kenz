'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

const CATEGORIES = ['Inspiration', 'Practice', 'Wellness', 'General']

export default function NewBlogPostPage() {
  const router = useRouter()
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const [form, setForm] = useState({
    title: '',
    slug: '',
    category: 'General',
    excerpt: '',
    date: today,
    image_url: '',
    canva_site_url: '',
    secret: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [error, setError] = useState('')
  const [thumbStatus, setThumbStatus] = useState<'idle' | 'detecting' | 'found' | 'none'>('idle')
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Pre-fill password if coming from manage page
  useEffect(() => {
    const saved = sessionStorage.getItem('byk_admin_secret')
    if (saved) setForm(f => ({ ...f, secret: saved }))
  }, [])

  async function detectThumbnail() {
    if (!form.canva_site_url) return
    setThumbStatus('detecting')
    try {
      const res = await fetch(`/api/admin/blog-thumbnail?url=${encodeURIComponent(form.canva_site_url)}`)
      const data = await res.json()
      if (data.found && data.imageUrl) {
        setForm(f => ({ ...f, image_url: data.imageUrl }))
        setThumbStatus('found')
      } else {
        setThumbStatus('none')
      }
    } catch {
      setThumbStatus('none')
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (!form.secret) {
      alert('Enter your admin password first')
      return
    }
    setUploadStatus('uploading')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('secret', form.secret)
    try {
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        setForm(f => ({ ...f, image_url: data.url }))
        setUploadStatus('done')
      } else {
        setUploadStatus('error')
      }
    } catch {
      setUploadStatus('error')
    }
  }

  function handleTitleChange(title: string) {
    setForm(f => ({ ...f, title, slug: toSlug(title) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setError('')

    const res = await fetch('/api/admin/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        slug: form.slug,
        category: form.category,
        excerpt: form.excerpt,
        date: form.date,
        image_url: form.image_url || null,
        canva_site_url: form.canva_site_url || null,
        secret: form.secret,
      }),
    })

    const data = await res.json()
    if (res.ok) {
      sessionStorage.setItem('byk_admin_secret', form.secret)
      router.push('/admin/blog')
    } else {
      setStatus('error')
      setError(data.error || 'Something went wrong')
    }
  }

  const inputStyle = { borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }
  const inputClass = 'w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-300 transition-shadow'
  const labelClass = 'block text-xs uppercase tracking-wider font-medium mb-1.5'

  return (
    <div className="min-h-screen pt-12 pb-16 px-4" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#92A07F' }}>Blog Admin</p>
            <h1 className="text-2xl font-medium" style={{ color: '#153F55' }}>New Post</h1>
          </div>
          <Link
            href="/admin/blog"
            className="text-sm hover:opacity-70 transition-opacity"
            style={{ color: '#486668' }}
          >
            ← All Posts
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title + Slug */}
          <div className="space-y-4 p-5 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#B97230' }}>Basics</p>
            <div>
              <label className={labelClass} style={{ color: '#486668' }}>Title</label>
              <input
                required
                className={inputClass}
                style={inputStyle}
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass} style={{ color: '#486668' }}>Slug</label>
              <input
                required
                className={inputClass}
                style={inputStyle}
                value={form.slug}
                onChange={e => setForm(f => ({ ...f, slug: e.target.value }))}
              />
              <p className="text-xs mt-1.5" style={{ color: '#92A07F' }}>
                /blog/<span style={{ color: '#B97230' }}>{form.slug || 'your-post-title'}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass} style={{ color: '#486668' }}>Category</label>
                <select
                  className={inputClass}
                  style={inputStyle}
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass} style={{ color: '#486668' }}>Date</label>
                <input
                  required
                  className={inputClass}
                  style={inputStyle}
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-3 p-5 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#B97230' }}>Card Preview</p>
            <div>
              <label className={labelClass} style={{ color: '#486668' }}>
                Excerpt <span className="normal-case text-xs font-normal" style={{ color: '#92A07F' }}>— shown on the blog grid card</span>
              </label>
              <textarea
                required
                rows={3}
                className={inputClass}
                style={inputStyle}
                value={form.excerpt}
                onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
              />
            </div>
            <div>
              <label className={labelClass} style={{ color: '#486668' }}>
                Cover Image <span className="normal-case text-xs font-normal" style={{ color: '#92A07F' }}>— optional thumbnail</span>
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                placeholder="https://... (paste a URL)"
                value={form.image_url}
                onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
              />
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadStatus === 'uploading'}
                  className="text-xs px-3 py-1.5 rounded-lg border hover:opacity-70 transition-opacity disabled:opacity-40"
                  style={{ borderColor: '#C4B5A8', color: '#486668' }}
                >
                  {uploadStatus === 'uploading' ? 'Uploading…' : 'Upload from desktop'}
                </button>
                {uploadStatus === 'done' && (
                  <span className="text-xs" style={{ color: '#92A07F' }}>Uploaded ✓</span>
                )}
                {uploadStatus === 'error' && (
                  <span className="text-xs" style={{ color: '#B97230' }}>Upload failed</span>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              {form.image_url && (
                <img
                  src={form.image_url}
                  alt="preview"
                  className="mt-2 w-24 h-24 object-cover rounded-lg"
                  style={{ border: '1px solid #E8DDD5' }}
                />
              )}
            </div>
          </div>

          {/* Canva */}
          <div className="space-y-4 p-5 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
            <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#B97230' }}>Content</p>
            <div>
              <label className={labelClass} style={{ color: '#486668' }}>
                Canva Site URL <span className="normal-case text-xs font-normal" style={{ color: '#92A07F' }}>— https://you.my.canva.site/…</span>
              </label>
              <input
                className={inputClass}
                style={inputStyle}
                placeholder="https://yourname.my.canva.site/..."
                value={form.canva_site_url}
                onChange={e => {
                  setForm(f => ({ ...f, canva_site_url: e.target.value }))
                  setThumbStatus('idle')
                }}
              />
              {form.canva_site_url && (thumbStatus === 'idle' || thumbStatus === 'none') && (
                <button
                  type="button"
                  onClick={detectThumbnail}
                  className="mt-2 text-xs px-3 py-1.5 rounded-lg border hover:opacity-70 transition-opacity"
                  style={{ borderColor: '#C4B5A8', color: '#486668' }}
                >
                  {thumbStatus === 'none' ? 'Retry auto-detect' : 'Auto-detect thumbnail'}
                </button>
              )}
              {thumbStatus === 'detecting' && (
                <p className="text-xs mt-2" style={{ color: '#92A07F' }}>Detecting thumbnail…</p>
              )}
              {thumbStatus === 'found' && (
                <p className="text-xs mt-2" style={{ color: '#92A07F' }}>Thumbnail auto-detected ✓</p>
              )}
              {thumbStatus === 'none' && (
                <p className="text-xs mt-2" style={{ color: '#B97230' }}>No image found — upload one or paste a URL in Cover Image above</p>
              )}
            </div>
          </div>

          {/* Password */}
          <div>
            <label className={labelClass} style={{ color: '#486668' }}>Admin Password</label>
            <input
              required
              type="password"
              className={inputClass}
              style={inputStyle}
              value={form.secret}
              onChange={e => setForm(f => ({ ...f, secret: e.target.value }))}
            />
          </div>

          {error && (
            <p className="text-sm px-4 py-3 rounded-lg" style={{ backgroundColor: '#FDF0E0', color: '#B97230', border: '1px solid #E8C99A' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 rounded-lg text-sm font-medium uppercase tracking-wider transition-opacity hover:opacity-85 disabled:opacity-50"
            style={{ backgroundColor: '#153F55', color: 'white' }}
          >
            {status === 'loading' ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </div>
  )
}
