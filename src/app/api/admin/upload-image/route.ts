import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const ADMIN_SECRET = process.env.ADMIN_SECRET

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const secret = formData.get('secret') as string
    const file = formData.get('file') as File | null

    if (!secret || secret !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file' }, { status: 400 })
    }

    const ext = file.name.split('.').pop() || 'jpg'
    const filename = `blog-${Date.now()}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const { error } = await supabaseAdmin.storage
      .from('blog-images')
      .upload(filename, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabaseAdmin.storage
      .from('blog-images')
      .getPublicUrl(filename)

    return NextResponse.json({ url: urlData.publicUrl })
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
