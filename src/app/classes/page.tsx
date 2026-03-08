import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import LogoutButton from '@/components/LogoutButton'
import Navbar from '@/components/Navbar'

type Video = {
  id: string
  title: string
  slug: string
  description: string | null
  duration_minutes: number | null
  category: string | null
  thumbnail_url: string | null
}

export default async function ClassesPage() {
  const supabase = await createSupabaseServerClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: videos } = await supabase
    .from('videos')
    .select('id, title, slug, description, duration_minutes, category, thumbnail_url')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: '#F2E8DE' }}>
      <Navbar forceScrolled />

      {/* Header */}
      <div className="px-4 pt-28 pb-8 max-w-4xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#92A07F' }}>Members Area</p>
            <h1 className="text-3xl font-medium" style={{ color: '#153F55' }}>Your Classes</h1>
            <p className="text-sm mt-1" style={{ color: '#486668' }}>
              Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name}` : ''}
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>

      <div className="px-4 max-w-4xl mx-auto">
        {!videos || videos.length === 0 ? (
          <div className="text-center py-24 rounded-xl" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
            <p className="text-sm mb-1" style={{ color: '#153F55' }}>Classes coming soon</p>
            <p className="text-xs" style={{ color: '#92A07F' }}>Check back shortly — Kenz is uploading your first class.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(videos as Video[]).map(video => (
              <Link key={video.id} href={`/classes/${video.slug}`} className="group block rounded-xl overflow-hidden hover:shadow-md transition-shadow" style={{ backgroundColor: 'white', border: '1px solid #E8DDD5' }}>
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#EBF0E8' }}>
                  {video.thumbnail_url ? (
                    <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-12 h-12 opacity-30" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#3D5019' }}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  {video.duration_minutes && (
                    <span className="absolute bottom-2 right-2 text-xs px-2 py-0.5 rounded font-medium" style={{ backgroundColor: 'rgba(21,63,85,0.85)', color: 'white' }}>
                      {video.duration_minutes} min
                    </span>
                  )}
                </div>
                {/* Info */}
                <div className="p-4">
                  {video.category && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FDF0E0', color: '#B97230' }}>
                      {video.category}
                    </span>
                  )}
                  <h2 className="text-base font-medium mt-2 leading-snug" style={{ color: '#153F55' }}>{video.title}</h2>
                  {video.description && (
                    <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: '#486668' }}>{video.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
