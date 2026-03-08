import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import Navbar from '@/components/Navbar'

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/classes/' + slug)

  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!video) notFound()

  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: '#F2E8DE' }}>
      <Navbar forceScrolled />
      <div className="max-w-3xl mx-auto px-4 pt-28">
        {/* Back */}
        <Link
          href="/classes"
          className="inline-flex items-center gap-1 text-sm hover:opacity-70 transition-opacity mb-6"
          style={{ color: '#486668' }}
        >
          ← All Classes
        </Link>

        {/* Category + title */}
        <div className="mb-4">
          {video.category && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FDF0E0', color: '#B97230' }}>
              {video.category}
            </span>
          )}
          <h1 className="text-2xl sm:text-3xl font-medium mt-2 leading-tight" style={{ color: '#153F55' }}>{video.title}</h1>
          {video.duration_minutes && (
            <p className="text-sm mt-1" style={{ color: '#92A07F' }}>{video.duration_minutes} min</p>
          )}
        </div>

        {/* Video player */}
        <div
          className="w-full rounded-xl overflow-hidden"
          style={{ aspectRatio: '16/9', backgroundColor: '#1a1a1a' }}
        >
          <iframe
            src={`https://iframe.mediadelivery.net/embed/${libraryId}/${video.bunny_video_id}?autoplay=false&responsive=true`}
            className="w-full h-full"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Description */}
        {video.description && (
          <div className="mt-6 p-5 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
            <p className="text-sm leading-relaxed" style={{ color: '#486668' }}>{video.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
