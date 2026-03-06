import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

const BlogSection = async () => {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <section id="blog" className="py-16" style={{ backgroundColor: "#F2E8DE" }}>
      <div className="container-custom">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2
              className="text-2xl md:text-3xl lg:text-4xl uppercase font-medium"
              style={{ color: "#153F55" }}
            >
              From the Blog
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#486668" }}>
              Stories, practice tips, and reflections from life on and off the mat.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-block text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity whitespace-nowrap ml-8"
            style={{ color: "#B97230" }}
          >
            View All →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-sm" style={{ color: "#486668" }}>
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <div className="rounded-lg overflow-hidden flex flex-col h-full transition-transform duration-300 group-hover:scale-[1.02]" style={{ backgroundColor: "white" }}>
                  {post.image_url && (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <span
                      className="text-xs uppercase tracking-wider font-medium mb-2"
                      style={{ color: "#B97230" }}
                    >
                      {post.category}
                    </span>
                    <h3
                      className="text-base font-medium mb-2 leading-snug"
                      style={{ color: "#153F55" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed flex-1 line-clamp-3"
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

        {/* Mobile "View All" */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="text-sm font-medium uppercase tracking-wide hover:opacity-70 transition-opacity"
            style={{ color: "#B97230" }}
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
