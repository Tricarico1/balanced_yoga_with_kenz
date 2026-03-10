import { supabaseAdmin } from '@/lib/supabase'
import Link from 'next/link'

export default async function VideoPreviewSection() {
  const { data: videos } = await supabaseAdmin
    .from('videos')
    .select('id, title, slug, category, duration_minutes, thumbnail_url, is_free')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (!videos || videos.length === 0) return null

  return (
    <section id="online-yoga" className="py-20" style={{ backgroundColor: '#F2E8DE' }}>
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-widest mb-2 font-medium" style={{ color: '#92A07F' }}>
              Online Classes
            </p>
            <h2 className="text-3xl md:text-4xl font-medium uppercase tracking-wide mb-4" style={{ color: '#153F55' }}>
              Stream Any Time
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: '#486668' }}>
              Every class, on your schedule. Always something new waiting for you.
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/signup"
              className="inline-block px-8 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:opacity-85 transition-opacity"
              style={{ backgroundColor: '#153F55', color: '#F2E8DE' }}
            >
              Access Full Library
            </Link>
            <p className="text-xs mt-3" style={{ color: '#92A07F' }}>
              Already a member?{' '}
              <Link href="/classes" className="underline hover:opacity-70" style={{ color: '#486668' }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function VideoCard({ video }: {
  video: {
    title: string
    slug: string
    category: string | null
    duration_minutes: number | null
    thumbnail_url: string | null
    is_free: boolean
  }
}) {
  const href = video.is_free ? `/watch/${video.slug}` : '/signup'

  return (
    <Link href={href} className="group block rounded-xl overflow-hidden transition-transform hover:-translate-y-0.5 hover:shadow-md"
      style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%', backgroundColor: '#E8DDD5' }}>
        {video.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: '#DDD0C4' }}>
            <svg className="w-10 h-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#153F55' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}

        {/* Play or Lock overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ backgroundColor: 'rgba(21, 63, 85, 0.45)' }}>
          {video.is_free ? (
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2E8DE' }}>
              <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#153F55' }}>
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F2E8DE' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#153F55' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          )}
        </div>

        {/* Badge */}
        <div className="absolute top-2 left-2">
          {video.is_free ? (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: '#3D5019', color: '#F2E8DE' }}>
              Free Preview
            </span>
          ) : (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: 'rgba(21,63,85,0.85)', color: '#F2E8DE' }}>
              Members
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          {video.category && (
            <span className="text-xs" style={{ color: '#B97230' }}>{video.category}</span>
          )}
          {video.duration_minutes && (
            <>
              <span className="text-xs" style={{ color: '#C4B5A8' }}>·</span>
              <span className="text-xs" style={{ color: '#92A07F' }}>{video.duration_minutes} min</span>
            </>
          )}
        </div>
        <h3 className="text-sm font-medium leading-snug" style={{ color: '#153F55' }}>{video.title}</h3>
      </div>
    </Link>
  )
}
