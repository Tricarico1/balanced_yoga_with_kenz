import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { blogPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Balanced Yoga with Kenz`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen" style={{ backgroundColor: "#F2E8DE" }}>
        <div className="container-custom max-w-3xl">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center text-sm mb-10 hover:opacity-70 transition-opacity"
            style={{ color: "#486668" }}
          >
            ← Back to Blog
          </Link>

          {/* Category + date */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs uppercase tracking-wider font-medium"
              style={{ color: "#B97230" }}
            >
              {post.category}
            </span>
            <span className="text-xs" style={{ color: "#92A07F" }}>
              {post.date}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-medium mb-8 leading-tight"
            style={{ color: "#153F55" }}
          >
            {post.title}
          </h1>

          {/* Hero image */}
          {post.image && (
            <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden mb-10">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-5">
            {post.content.map((paragraph, i) => (
              <p
                key={i}
                className="leading-relaxed"
                style={{ color: "#3D5019" }}
                dangerouslySetInnerHTML={{
                  __html: paragraph
                    .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#153F55">$1</strong>'),
                }}
              />
            ))}
          </div>

          {/* Divider + back */}
          <div
            className="mt-14 pt-8 border-t"
            style={{ borderColor: "#C4B5A8" }}
          >
            <Link
              href="/blog"
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: "#486668" }}
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
