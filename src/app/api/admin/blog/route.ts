import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

function checkSecret(secret: string | null): boolean {
  return !!secret && secret === process.env.ADMIN_SECRET
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!checkSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .select('id, slug, title, date, category, tags, excerpt, image_url, canva_site_url, canva_embed_url, published')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts: data })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, slug, category, tags, excerpt, date, image_url, canva_site_url, canva_embed_url, design_width, design_height, canva_embed_url_mobile, mobile_design_width, mobile_design_height, secret } = body

  if (!checkSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!title || !slug || !excerpt || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const tagsArr: string[] = Array.isArray(tags) ? tags : []
  const resolvedCategory = tagsArr[0] || category || 'General'

  const { error } = await supabaseAdmin
    .from('blog_posts')
    .insert({
      title,
      slug,
      category: resolvedCategory,
      tags: tagsArr,
      excerpt,
      date,
      image_url: image_url || null,
      canva_site_url: canva_site_url || null,
      canva_embed_url: canva_embed_url || null,
      design_width: design_width || null,
      design_height: design_height || null,
      canva_embed_url_mobile: canva_embed_url_mobile || null,
      mobile_design_width: mobile_design_width || null,
      mobile_design_height: mobile_design_height || null,
      content: [],
      published: true,
    })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'A post with that slug already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ slug })
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const { secret, id, title, slug, category, tags, excerpt, date, image_url, canva_site_url, canva_embed_url, design_width, design_height, canva_embed_url_mobile, mobile_design_width, mobile_design_height } = body

  if (!checkSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!id || !title || !slug || !excerpt || !date) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const tagsArr: string[] = Array.isArray(tags) ? tags : []
  const resolvedCategory = tagsArr[0] || category || 'General'

  const { error } = await supabaseAdmin
    .from('blog_posts')
    .update({
      title,
      slug,
      category: resolvedCategory,
      tags: tagsArr,
      excerpt,
      date,
      image_url: image_url || null,
      canva_site_url: canva_site_url || null,
      canva_embed_url: canva_embed_url || null,
      design_width: design_width || null,
      design_height: design_height || null,
      canva_embed_url_mobile: canva_embed_url_mobile || null,
      mobile_design_width: mobile_design_width || null,
      mobile_design_height: mobile_design_height || null,
    })
    .eq('id', id)

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'That slug is already used by another post' }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ slug })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const { secret, slug } = body

  if (!checkSecret(secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('blog_posts')
    .delete()
    .eq('slug', slug)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
