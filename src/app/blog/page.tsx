import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getAllPosts } from "@/lib/blog";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Blog — Balanced Yoga with Kenz",
  description: "Yoga inspiration, practice tips, and stories from Mackenzie Homan.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main>
      <Navbar forceScrolled />

      <div className="pb-16 min-h-screen" style={{ backgroundColor: "#F2E8DE" }}>
        <div className="container-custom pt-28">
          <h1 className="text-3xl md:text-4xl font-medium mb-2" style={{ color: "#153F55" }}>The Blog</h1>
          <p className="text-sm mb-12" style={{ color: "#92A07F" }}>Stories, practice tips, and reflections from life on and off the mat.</p>

          {posts.length === 0 ? (
            <p className="text-center" style={{ color: "#486668" }}>
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                  <div className="rounded-lg overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:scale-[1.02]" style={{ backgroundColor: "white" }}>
                    {post.image_url && (
                      <div className="h-52 overflow-hidden">
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <span
                        className="text-xs uppercase tracking-wider font-medium mb-2"
                        style={{ color: "#B97230" }}
                      >
                        {post.category}
                      </span>
                      <h2
                        className="text-lg font-medium mb-3 leading-snug"
                        style={{ color: "#153F55" }}
                      >
                        {post.title}
                      </h2>
                      <p
                        className="text-sm leading-relaxed flex-1"
                        style={{ color: "#486668" }}
                      >
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs" style={{ color: "#92A07F" }}>
                          {post.date}
                        </span>
                        <span
                          className="text-xs font-medium uppercase tracking-wide"
                          style={{ color: "#153F55" }}
                        >
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

