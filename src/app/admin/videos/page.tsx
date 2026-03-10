'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'

const VIDEO_TAGS = [
  'Vinyasa', 'Hatha', 'Yin', 'Restorative', 'Yoga Workout', 'Pilates',
  'Yoga Stretch & Workout', 'Power Yoga', 'Wild Yoga', 'Meditation', 'Weights',
  'Morning Flow', 'Bedtime Flow',
  '5min', '10min', '15min', '20min', '25min', '30min', '40min', '60min', '90min',
  'Upper Body Focus', 'Lower Body Focus', 'Glutes', 'Legs & Glutes', 'Core Burn', 'Core Focus',
]

type Video = {
  id: string
  title: string
  slug: string
  description: string | null
  bunny_video_id: string
  duration_minutes: number | null
  category: string | null
  tags: string[] | null
  thumbnail_url: string | null
  published: boolean
  is_free: boolean
}

type Form = Omit<Video, 'id'>

const emptyForm = (): Form => ({
  title: '', slug: '', description: '', bunny_video_id: '',
  duration_minutes: null, category: null, tags: [], thumbnail_url: '', published: true, is_free: false,
})

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

// Style constants defined outside component so they don't trigger re-renders
const inputStyle = { borderColor: '#C4B5A8', color: '#153F55', backgroundColor: 'white' }
const inputClass = 'w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-amber-300 transition-shadow'
const labelClass = 'block text-xs uppercase tracking-wider font-medium mb-1.5'

// FormFields defined outside component to prevent remount on every keystroke
function FormFields({ form, setForm, secret }: { form: Form; setForm: (f: Form) => void; secret: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')

  const selectedTags = form.tags || []

  function toggleTag(tag: string) {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag]
    setForm({ ...form, tags: next, category: next[0] || null })
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadStatus('uploading')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('secret', secret)
    fd.append('type', 'video-thumb')
    try {
      const res = await fetch('/api/admin/upload-image', { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data.url) {
        setForm({ ...form, thumbnail_url: data.url })
        setUploadStatus('done')
      } else {
        setUploadStatus('error')
      }
    } catch {
      setUploadStatus('error')
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} style={{ color: '#486668' }}>Title</label>
          <input className={inputClass} style={inputStyle} value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value, slug: toSlug(e.target.value) })} />
        </div>
        <div>
          <label className={labelClass} style={{ color: '#486668' }}>Slug</label>
          <input className={inputClass} style={inputStyle} value={form.slug}
            onChange={e => setForm({ ...form, slug: e.target.value })} />
        </div>
      </div>
      <div>
        <label className={labelClass} style={{ color: '#486668' }}>Bunny Video ID <span className="normal-case text-xs font-normal" style={{ color: '#92A07F' }}>— from Bunny Stream dashboard</span></label>
        <input className={inputClass} style={inputStyle} placeholder="e.g. a1b2c3d4-..." value={form.bunny_video_id}
          onChange={e => setForm({ ...form, bunny_video_id: e.target.value })} />
      </div>
      <div>
        <label className={labelClass} style={{ color: '#486668' }}>Duration (minutes)</label>
        <input type="number" className={inputClass} style={inputStyle} placeholder="60"
          value={form.duration_minutes ?? ''}
          onChange={e => setForm({ ...form, duration_minutes: e.target.value ? parseInt(e.target.value) : null })} />
      </div>
      <div>
        <label className={labelClass} style={{ color: '#486668' }}>Tags <span className="normal-case text-xs font-normal" style={{ color: '#92A07F' }}>— select all that apply</span></label>
        <div className="flex flex-wrap gap-2 mt-1">
          {VIDEO_TAGS.map(tag => {
            const selected = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                style={selected
                  ? { backgroundColor: '#153F55', color: 'white', borderColor: '#153F55' }
                  : { backgroundColor: 'white', color: '#486668', borderColor: '#C4B5A8' }
                }
              >
                {tag}
              </button>
            )
          })}
        </div>
        {selectedTags.length > 0 && (
          <p className="text-xs mt-1.5" style={{ color: '#92A07F' }}>
            Primary: <span style={{ color: '#B97230' }}>{selectedTags[0]}</span>
          </p>
        )}
      </div>
      <div>
        <label className={labelClass} style={{ color: '#486668' }}>Thumbnail <span className="normal-case text-xs font-normal" style={{ color: '#92A07F' }}>— optional</span></label>
        <input className={inputClass} style={inputStyle} placeholder="https://..." value={form.thumbnail_url || ''}
          onChange={e => setForm({ ...form, thumbnail_url: e.target.value })} />
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
          {uploadStatus === 'done' && <span className="text-xs" style={{ color: '#92A07F' }}>Uploaded ✓</span>}
          {uploadStatus === 'error' && <span className="text-xs" style={{ color: '#B97230' }}>Upload failed</span>}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>
        {form.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.thumbnail_url} alt="preview" className="mt-2 w-24 h-14 object-cover rounded-lg" style={{ border: '1px solid #E8DDD5' }} />
        )}
      </div>
      <div>
        <label className={labelClass} style={{ color: '#486668' }}>Description</label>
        <textarea rows={3} className={inputClass} style={inputStyle} value={form.description || ''}
          onChange={e => setForm({ ...form, description: e.target.value })} />
      </div>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.published}
            onChange={e => setForm({ ...form, published: e.target.checked })}
            className="w-4 h-4 rounded" style={{ accentColor: '#153F55' }} />
          <span className="text-sm" style={{ color: '#486668' }}>Published</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.is_free}
            onChange={e => setForm({ ...form, is_free: e.target.checked })}
            className="w-4 h-4 rounded" style={{ accentColor: '#B97230' }} />
          <span className="text-sm" style={{ color: '#486668' }}>Free preview <span className="text-xs" style={{ color: '#92A07F' }}>(shareable without login)</span></span>
        </label>
      </div>
    </div>
  )
}

export default function AdminVideosPage() {
  const [secret, setSecret] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [videos, setVideos] = useState<Video[]>([])
  const [loadError, setLoadError] = useState('')
  const [loading, setLoading] = useState(false)

  const [showNew, setShowNew] = useState(false)
  const [newForm, setNewForm] = useState<Form>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Form | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  const loadVideos = useCallback(async (s: string) => {
    setLoading(true)
    setLoadError('')
    const res = await fetch(`/api/admin/videos?secret=${encodeURIComponent(s)}`)
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setLoadError(data.error || 'Incorrect password'); return false }
    setVideos(data.videos)
    setUnlocked(true)
    return true
  }, [])

  useEffect(() => {
    const saved = sessionStorage.getItem('byk_admin_secret')
    if (saved) { setSecret(saved); loadVideos(saved) }
  }, [loadVideos])

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    const ok = await loadVideos(secret)
    if (ok) sessionStorage.setItem('byk_admin_secret', secret)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setSaveError('')
    const res = await fetch('/api/admin/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newForm, secret }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setSaveError(data.error || 'Failed'); return }
    setShowNew(false)
    setNewForm(emptyForm())
    loadVideos(secret)
  }

  async function handleSaveEdit(id: string) {
    if (!editForm) return
    setSaving(true); setSaveError('')
    const res = await fetch('/api/admin/videos', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...editForm, id, secret }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setSaveError(data.error || 'Failed'); return }
    setEditingId(null); setEditForm(null)
    loadVideos(secret)
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"?\n\nThis cannot be undone.`)) return
    setDeleting(id)
    await fetch('/api/admin/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, secret }),
    })
    setDeleting(null)
    loadVideos(secret)
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#F2E8DE' }}>
        <div className="w-full max-w-sm">
          <p className="text-xs uppercase tracking-widest text-center mb-2" style={{ color: '#92A07F' }}>Admin</p>
          <h1 className="text-2xl font-medium text-center mb-8" style={{ color: '#153F55' }}>Video Library</h1>
          <form onSubmit={handleUnlock} className="space-y-4">
            <input required type="password" autoFocus placeholder="Admin password" className={inputClass} style={inputStyle} value={secret} onChange={e => setSecret(e.target.value)} />
            {loadError && <p className="text-xs text-center" style={{ color: '#B97230' }}>{loadError}</p>}
            <button type="submit" disabled={loading} className="w-full py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:opacity-85 disabled:opacity-50 transition-opacity" style={{ backgroundColor: '#153F55', color: 'white' }}>
              {loading ? 'Unlocking…' : 'Unlock'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-12 pb-16 px-4" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link href="/" className="text-xs hover:opacity-70 transition-opacity" style={{ color: '#92A07F' }}>← Home</Link>
              <span className="text-xs" style={{ color: '#C4B5A8' }}>|</span>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#92A07F' }}>Admin</p>
            </div>
            <h1 className="text-2xl font-medium" style={{ color: '#153F55' }}>Video Library</h1>
            <p className="text-sm mt-0.5" style={{ color: '#486668' }}>{videos.length} {videos.length === 1 ? 'video' : 'videos'}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/blog" className="text-sm hover:opacity-70 transition-opacity" style={{ color: '#486668' }}>Blog</Link>
            <button
              onClick={() => { setShowNew(true); setNewForm(emptyForm()); setSaveError('') }}
              className="px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wider hover:opacity-85 transition-opacity"
              style={{ backgroundColor: '#153F55', color: 'white' }}
            >
              + Add Video
            </button>
          </div>
        </div>

        {/* New video form */}
        {showNew && (
          <div className="mb-4 p-5 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#B97230' }}>New Video</p>
              <button onClick={() => setShowNew(false)} className="text-xs hover:opacity-70 transition-opacity" style={{ color: '#486668' }}>Cancel</button>
            </div>
            <form onSubmit={handleCreate}>
              <FormFields form={newForm} setForm={setNewForm} secret={secret} />
              {saveError && <p className="text-xs mt-3 px-3 py-2 rounded-lg" style={{ backgroundColor: '#FDF0E0', color: '#B97230', border: '1px solid #E8C99A' }}>{saveError}</p>}
              <button type="submit" disabled={saving} className="mt-4 w-full py-2.5 rounded-lg text-sm font-medium hover:opacity-85 disabled:opacity-50 transition-opacity" style={{ backgroundColor: '#153F55', color: 'white' }}>
                {saving ? 'Saving…' : 'Add Video'}
              </button>
            </form>
          </div>
        )}

        {/* Videos list */}
        <div className="space-y-3">
          {videos.map(video => (
            <div key={video.id} className="rounded-xl overflow-hidden" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
              {editingId === video.id && editForm ? (
                <div className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs uppercase tracking-widest font-medium" style={{ color: '#B97230' }}>Editing</p>
                    <button onClick={() => { setEditingId(null); setEditForm(null) }} className="text-xs hover:opacity-70 transition-opacity" style={{ color: '#486668' }}>Cancel</button>
                  </div>
                  <FormFields form={editForm} setForm={setEditForm} secret={secret} />
                  {saveError && <p className="text-xs mt-3 px-3 py-2 rounded-lg" style={{ backgroundColor: '#FDF0E0', color: '#B97230', border: '1px solid #E8C99A' }}>{saveError}</p>}
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => { setEditingId(null); setEditForm(null) }} className="flex-1 py-2.5 rounded-lg text-sm font-medium border hover:opacity-70 transition-opacity" style={{ borderColor: '#C4B5A8', color: '#486668' }}>Cancel</button>
                    <button onClick={() => handleSaveEdit(video.id)} disabled={saving} className="flex-1 py-2.5 rounded-lg text-sm font-medium hover:opacity-85 disabled:opacity-50 transition-opacity" style={{ backgroundColor: '#153F55', color: 'white' }}>
                      {saving ? 'Saving…' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-5 flex items-start gap-4">
                  {video.thumbnail_url && (
                    <img src={video.thumbnail_url} alt={video.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" style={{ border: '1px solid #E8DDD5' }} />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {video.category && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FDF0E0', color: '#B97230' }}>{video.category}</span>}
                      {video.duration_minutes && <span className="text-xs" style={{ color: '#92A07F' }}>{video.duration_minutes} min</span>}
                      {video.is_free && <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#EEF4E8', color: '#3D5019' }}>Free preview</span>}
                      {!video.published && <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: '#F0E8E0', color: '#B97230' }}>Draft</span>}
                    </div>
                    <h2 className="text-base font-medium leading-snug" style={{ color: '#153F55' }}>{video.title}</h2>
                    {video.is_free && (
                      <p className="text-xs mt-0.5 font-mono" style={{ color: '#92A07F' }}>/watch/{video.slug}</p>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => { setEditingId(video.id); setEditForm({ title: video.title, slug: video.slug, description: video.description, bunny_video_id: video.bunny_video_id, duration_minutes: video.duration_minutes, category: video.category, tags: video.tags || [], thumbnail_url: video.thumbnail_url, published: video.published, is_free: video.is_free ?? false }); setSaveError('') }}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border hover:opacity-70 transition-opacity" style={{ borderColor: '#153F55', color: '#153F55' }}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(video.id, video.title)} disabled={deleting === video.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-80 disabled:opacity-40 transition-opacity" style={{ backgroundColor: '#FDF0E0', color: '#B97230' }}>
                      {deleting === video.id ? '…' : 'Delete'}
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
