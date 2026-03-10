import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function auth(secret: string | null) {
  return !!secret && secret === process.env.ADMIN_SECRET
}

function toSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

function extractVideoId(value: string): string {
  const m = value.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)
  return m ? m[0] : value.trim()
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!auth(secret)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ videos: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!auth(body.secret)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const slug = body.slug || toSlug(body.title)
  const tags: string[] = Array.isArray(body.tags) ? body.tags : []
  const { error } = await supabaseAdmin.from('videos').insert({
    title: body.title,
    slug,
    description: body.description || null,
    bunny_video_id: extractVideoId(body.bunny_video_id),
    duration_minutes: body.duration_minutes ? parseInt(body.duration_minutes) : null,
    category: tags[0] || body.category || null,
    tags,
    thumbnail_url: body.thumbnail_url || null,
    published: body.published ?? true,
    is_free: body.is_free ?? false,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  if (!auth(body.secret)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const tags: string[] = Array.isArray(body.tags) ? body.tags : []
  const { error } = await supabaseAdmin
    .from('videos')
    .update({
      title: body.title,
      slug: body.slug,
      description: body.description || null,
      bunny_video_id: extractVideoId(body.bunny_video_id),
      duration_minutes: body.duration_minutes ? parseInt(body.duration_minutes) : null,
      category: tags[0] || body.category || null,
      tags,
      thumbnail_url: body.thumbnail_url || null,
      published: body.published ?? true,
      is_free: body.is_free ?? false,
    })
    .eq('id', body.id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  if (!auth(body.secret)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { error } = await supabaseAdmin.from('videos').delete().eq('id', body.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
