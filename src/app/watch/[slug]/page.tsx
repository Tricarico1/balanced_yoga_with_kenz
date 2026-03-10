import { supabaseAdmin } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function WatchPage({ params }: Props) {
  const { slug } = await params

  const { data: video } = await supabaseAdmin
    .from('videos')
    .select('*')
    .eq('slug', slug)
    .eq('is_free', true)
    .single()

  if (!video) notFound()

  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID || '613097'
  // Strip to bare UUID in case the stored value is a full Bunny URL
  const uuidMatch = video.bunny_video_id.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i)
  const videoId = uuidMatch ? uuidMatch[0] : video.bunny_video_id
  const embedUrl = `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=false&loop=false&muted=false&preload=true`

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F2E8DE' }}>
      <Navbar forceScrolled />

      <div className="max-w-4xl mx-auto px-4 pt-28 pb-16">
        {/* Header */}
        <div className="mb-6">
          {video.category && (
            <span className="text-xs uppercase tracking-widest font-medium px-3 py-1 rounded-full mb-3 inline-block"
              style={{ backgroundColor: '#FDF0E0', color: '#B97230' }}>
              {video.category}
            </span>
          )}
          <h1 className="text-3xl font-medium mt-2" style={{ color: '#153F55' }}>{video.title}</h1>
          {video.duration_minutes && (
            <p className="text-sm mt-1" style={{ color: '#92A07F' }}>{video.duration_minutes} minutes</p>
          )}
        </div>

        {/* Video player */}
        <div className="relative w-full rounded-xl overflow-hidden shadow-lg mb-6" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Description */}
        {video.description && (
          <p className="text-base leading-relaxed mb-8" style={{ color: '#486668' }}>{video.description}</p>
        )}

        {/* CTA — nudge toward membership */}
        <div className="rounded-xl p-6 text-center" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
          <h2 className="text-xl font-medium mb-2" style={{ color: '#153F55' }}>Want more classes like this?</h2>
          <p className="text-sm mb-5" style={{ color: '#486668' }}>
            Create a free account to access the full video library.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/signup"
              className="px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-85 transition-opacity"
              style={{ backgroundColor: '#153F55', color: 'white' }}
            >
              Create Account
            </Link>
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-lg text-sm font-medium border hover:opacity-70 transition-opacity"
              style={{ borderColor: '#153F55', color: '#153F55' }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
