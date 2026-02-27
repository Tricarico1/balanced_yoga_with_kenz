import Link from "next/link";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/lib/blog";

export const metadata = {
  title: "Blog — Balanced Yoga with Kenz",
  description: "Yoga inspiration, practice tips, and stories from Mackenzie Homan.",
};

export default function BlogPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-24 pb-16 min-h-screen" style={{ backgroundColor: "#F2E8DE" }}>
        <div className="container-custom">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl uppercase font-medium text-center mb-4"
            style={{ color: "#153F55" }}
          >
            Blog
          </h1>
          <p
            className="text-center max-w-2xl mx-auto mb-14 leading-relaxed"
            style={{ color: "#486668" }}
          >
            Stories, practice tips, and reflections from life on and off the mat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="rounded-lg overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:scale-[1.02]" style={{ backgroundColor: "white" }}>
                  {post.image && (
                    <div className="h-52 overflow-hidden">
                      <img
                        src={post.image}
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
        </div>
      </div>
    </main>
  );
}
