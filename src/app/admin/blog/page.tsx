'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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

type Post = {
  id: string
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  image_url: string | null
  canva_site_url: string | null
  published: boolean
}

type EditForm = {
  title: string
  slug: string
  category: string
  excerpt: string
  date: string
  image_url: string
  canva_site_url: string
}

export default function AdminManagePage() {
  const [secret, setSecret] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [posts, setPosts] = useState<Post[]>([])
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<EditForm | null>(null)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [deleting, setDeleting] = useState<string | null>(null)
  const [thumbStatus, setThumbStatus] = useState<'idle' | 'detecting' | 'found' | 'none'>('idle')
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadPosts = useCallback(async (s: string) => {
    setLoading(true)
    setLoadError('')
    const res = await fetch(`/api/admin/blog?secret=${encodeURIComponent(s)}`)
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      setLoadError(data.error || 'Incorrect password')
      return false
    }
    setPosts(data.posts)
    setUnlocked(true)
    return true
  }, [])

  // Auto-unlock if secret is saved in session
  useEffect(() => {
    const saved = sessionStorage.getItem('byk_admin_secret')
    if (saved) {
      setSecret(saved)
      loadPosts(saved)
    }
  }, [loadPosts])

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    const ok = await loadPosts(secret)
    if (ok) sessionStorage.setItem('byk_admin_secret', secret)
  }

  function lock() {
    sessionStorage.removeItem('byk_admin_secret')
    setUnlocked(false)
    setPosts([])
    setSecret('')
    setEditingId(null)
    setEditForm(null)
  }

  function startEdit(post: Post) {
    setEditingId(post.id)
    setSaveError('')
    setThumbStatus('idle')
    setUploadStatus('idle')
    setEditForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      date: post.date,
      image_url: post.image_url || '',
      canva_site_url: post.canva_site_url || '',
    })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditForm(null)
    setSaveError('')
    setThumbStatus('idle')
    setUploadStatus('idle')
  }

  async function detectThumbnail() {
    if (!editForm?.canva_site_url) return
    setThumbStatus('detecting')
    try {
      const res = await fetch(`/api/admin/blog-thumbnail?url=${encodeURIComponent(editForm.canva_site_url)}`)
      const data = await res.json()
      if (data.found && data.imageUrl) {
        setEditForm(f => f ? { ...f, image_url: data.imageUrl } : f)
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
    setUploadStatus('uploading')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('secret', secret)
    try {
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        setEditForm(f => f ? { ...f, image_url: data.url } : f)
        setUploadStatus('done')
      } else {
        setUploadStatus('error')
      }
    } catch {
      setUploadStatus('error')
    }
  }

  async function saveEdit(post: Post) {
    if (!editForm) return
    setSaving(true)
    setSaveError('')

    const res = await fetch('/api/admin/blog', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        id: post.id,
        title: editForm.title,
        slug: editForm.slug,
        category: editForm.category,
        excerpt: editForm.excerpt,
        date: editForm.date,
        image_url: editForm.image_url || null,
        canva_site_url: editForm.canva_site_url || null,
      }),
    })

    const data = await res.json()
    setSaving(false)

    if (!res.ok) {
      setSaveError(data.error || 'Failed to save')
      return
    }

    // Update local state
    setPosts(ps =>
      ps.map(p =>
        p.id === post.id
          ? {
              ...p,
              title: editForm.title,
              slug: editForm.slug,
              category: editForm.category,
              excerpt: editForm.excerpt,
              date: editForm.date,
              image_url: editForm.image_url || null,
              canva_site_url: editForm.canva_site_url || null,
            }
          : p
      )
    )
    setEditingId(null)
    setEditForm(null)
  }

  async function deletePost(slug: string, title: string) {
    if (!confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return
    setDeleting(slug)

    const res = await fetch('/api/admin/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, slug }),
    })

    if (res.ok) {
      setPosts(ps => ps.filter(p => p.slug !== slug))
    } else {
      const data = await res.json()
      alert(data.error || 'Failed to delete')
    }
    setDeleting(null)
  }

  const inputStyle = { borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }
  const inputClass = 'w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-300 transition-shadow'
  const labelClass = 'block text-xs uppercase tracking-wider font-medium mb-1.5'

  // ── Lock screen ──────────────────────────────────────────────
  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2E8DE' }}>
        <div className="w-full max-w-sm">
          <p className="text-xs uppercase tracking-widest text-center mb-2" style={{ color: '#92A07F' }}>Blog Admin</p>
          <h1 className="text-2xl font-medium text-center mb-8" style={{ color: '#153F55' }}>
            Balanced Yoga with Kenz
          </h1>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input
              required
              type="password"
              autoFocus
              placeholder="Admin password"
              className={inputClass}
              style={inputStyle}
              value={secret}
              onChange={e => setSecret(e.target.value)}
            />
            {loadError && (
              <p className="text-xs text-center" style={{ color: '#B97230' }}>{loadError}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:opacity-85 disabled:opacity-50 transition-opacity"
              style={{ backgroundColor: '#153F55', color: 'white' }}
            >
              {loading ? 'Unlocking...' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── Manage screen ────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-12 pb-16 px-4" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#92A07F' }}>Blog Admin</p>
            <h1 className="text-2xl font-medium" style={{ color: '#153F55' }}>Blog Posts</h1>
            <p className="text-sm mt-0.5" style={{ color: '#486668' }}>
              {posts.length} {posts.length === 1 ? 'post' : 'posts'}
              {' · '}
              <button onClick={lock} className="hover:opacity-70 transition-opacity" style={{ color: '#486668' }}>
                Lock session
              </button>
            </p>
          </div>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wider hover:opacity-85 transition-opacity shrink-0"
            style={{ backgroundColor: '#153F55', color: 'white' }}
          >
            + New Post
          </Link>
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="text-center py-20 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
            <p className="text-sm mb-4" style={{ color: '#486668' }}>No posts yet.</p>
            <Link
              href="/admin/blog/new"
              className="text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ color: '#B97230' }}
            >
              Create your first post →
            </Link>
          </div>
        )}

        {/* Posts list */}
        <div className="space-y-3">
          {posts.map(post => (
            <div
              key={post.id}
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}
            >
              {editingId === post.id && editForm ? (
                /* ── Edit mode ── */
                <div className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#B97230' }}>
                      Editing
                    </p>
                    <button
                      onClick={cancelEdit}
                      className="text-xs hover:opacity-70 transition-opacity"
                      style={{ color: '#486668' }}
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass} style={{ color: '#486668' }}>Title</label>
                      <input
                        className={inputClass}
                        style={inputStyle}
                        value={editForm.title}
                        onChange={e => {
                          const title = e.target.value
                          setEditForm(f => f ? { ...f, title, slug: toSlug(title) } : f)
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} style={{ color: '#486668' }}>Slug</label>
                        <input
                          className={inputClass}
                          style={inputStyle}
                          value={editForm.slug}
                          onChange={e => setEditForm(f => f ? { ...f, slug: e.target.value } : f)}
                        />
                      </div>
                      <div>
                        <label className={labelClass} style={{ color: '#486668' }}>Date</label>
                        <input
                          className={inputClass}
                          style={inputStyle}
                          value={editForm.date}
                          onChange={e => setEditForm(f => f ? { ...f, date: e.target.value } : f)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} style={{ color: '#486668' }}>Category</label>
                        <select
                          className={inputClass}
                          style={inputStyle}
                          value={editForm.category}
                          onChange={e => setEditForm(f => f ? { ...f, category: e.target.value } : f)}
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass} style={{ color: '#486668' }}>Cover Image</label>
                        <input
                          className={inputClass}
                          style={inputStyle}
                          placeholder="https://... (paste a URL)"
                          value={editForm.image_url}
                          onChange={e => setEditForm(f => f ? { ...f, image_url: e.target.value } : f)}
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
                        {editForm.image_url && (
                          <img
                            src={editForm.image_url}
                            alt="preview"
                            className="mt-2 w-24 h-24 object-cover rounded-lg"
                            style={{ border: '1px solid #E8DDD5' }}
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={labelClass} style={{ color: '#486668' }}>Excerpt</label>
                      <textarea
                        rows={3}
                        className={inputClass}
                        style={inputStyle}
                        value={editForm.excerpt}
                        onChange={e => setEditForm(f => f ? { ...f, excerpt: e.target.value } : f)}
                      />
                    </div>

                    <div>
                      <label className={labelClass} style={{ color: '#486668' }}>
                        Canva Site URL <span className="normal-case text-xs font-normal" style={{ color: '#92A07F' }}>— https://you.my.canva.site/…</span>
                      </label>
                      <input
                        className={inputClass}
                        style={inputStyle}
                        placeholder="https://yourname.my.canva.site/..."
                        value={editForm.canva_site_url}
                        onChange={e => {
                          setEditForm(f => f ? { ...f, canva_site_url: e.target.value } : f)
                          setThumbStatus('idle')
                        }}
                      />
                      {editForm.canva_site_url && (thumbStatus === 'idle' || thumbStatus === 'none') && (
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

                  {saveError && (
                    <p className="text-xs mt-3 px-3 py-2 rounded-lg" style={{ backgroundColor: '#FDF0E0', color: '#B97230', border: '1px solid #E8C99A' }}>
                      {saveError}
                    </p>
                  )}

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={cancelEdit}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium border hover:opacity-70 transition-opacity"
                      style={{ borderColor: '#C4B5A8', color: '#486668' }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(post)}
                      disabled={saving}
                      className="flex-1 py-2.5 rounded-lg text-sm font-medium hover:opacity-85 disabled:opacity-50 transition-opacity"
                      style={{ backgroundColor: '#153F55', color: 'white' }}
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              ) : (
                /* ── View mode ── */
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ backgroundColor: '#FDF0E0', color: '#B97230' }}
                        >
                          {post.category}
                        </span>
                        <span className="text-xs" style={{ color: '#92A07F' }}>{post.date}</span>
                        {post.canva_site_url && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: '#EBF0E8', color: '#3D5019' }}
                          >
                            Canva
                          </span>
                        )}
                      </div>
                      <h2 className="text-base font-medium leading-snug" style={{ color: '#153F55' }}>
                        {post.title}
                      </h2>
                      <p className="text-xs mt-1.5 line-clamp-2 leading-relaxed" style={{ color: '#486668' }}>
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: '1px solid #F0E8E0' }}>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:opacity-70 transition-opacity"
                      style={{ borderColor: '#C4B5A8', color: '#486668' }}
                    >
                      View live ↗
                    </Link>
                    <button
                      onClick={() => startEdit(post)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:opacity-70 transition-opacity"
                      style={{ borderColor: '#153F55', color: '#153F55' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(post.slug, post.title)}
                      disabled={deleting === post.slug}
                      className="ml-auto px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 disabled:opacity-40 transition-opacity"
                      style={{ backgroundColor: '#FDF0E0', color: '#B97230' }}
                    >
                      {deleting === post.slug ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
