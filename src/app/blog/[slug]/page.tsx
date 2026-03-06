import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getPostBySlug } from "@/lib/blog";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Balanced Yoga with Kenz`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  // Canva posts: aspect-ratio iframe — page scrolls naturally
  if (post.canva_embed_url) {
    // When dimensions are known, use aspect-ratio container so Canva renders at natural scale.
    // When unknown (multi-page / slideshow designs), fall back to full-viewport iframe.
    const hasDimensions = post.design_width && post.design_height
    const paddingTop = hasDimensions
      ? `${(post.design_height! / post.design_width!) * 100}%`
      : null

    return (
      <main>
        <Navbar forceScrolled />
        <div style={{ paddingTop: '60px' }}>
          {hasDimensions ? (
            // Single tall page: aspect-ratio container — page scrolls naturally
            <div style={{ overflowX: 'auto' }}>
              <div style={{ position: 'relative', width: '100%', minWidth: '768px', paddingTop: paddingTop! }}>
                <iframe
                  src={post.canva_embed_url}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', display: 'block' }}
                  allowFullScreen
                  allow="fullscreen"
                  title={post.title}
                />
              </div>
            </div>
          ) : (
            // No dimensions (e.g. slideshow/multi-page): fill viewport height
            <iframe
              src={post.canva_embed_url}
              style={{ display: 'block', width: '100%', height: 'calc(100vh - 60px)', border: 'none' }}
              allowFullScreen
              allow="fullscreen"
              title={post.title}
            />
          )}
        </div>
      </main>
    );
  }

  // Text-only posts: standard layout
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen" style={{ backgroundColor: "#F2E8DE" }}>
        <div className="container-custom max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm mb-10 hover:opacity-70 transition-opacity"
            style={{ color: "#486668" }}
          >
            ← Back to Blog
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider font-medium" style={{ color: "#B97230" }}>
              {post.category}
            </span>
            <span className="text-xs" style={{ color: "#92A07F" }}>{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-medium mb-8 leading-tight" style={{ color: "#153F55" }}>
            {post.title}
          </h1>

          {post.image_url && (
            <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden mb-10">
              <img src={post.image_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="space-y-5">
            {(post.content || []).map((paragraph, i) => (
              <p
                key={i}
                className="leading-relaxed"
                style={{ color: "#3D5019" }}
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#153F55">$1</strong>'),
                }}
              />
            ))}
          </div>

          <div className="mt-14 pt-8 border-t" style={{ borderColor: "#C4B5A8" }}>
            <Link href="/blog" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#486668" }}>
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
