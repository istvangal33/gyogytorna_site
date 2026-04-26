import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '../lib/blog/blog';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

function BlogCollectionSchema({ posts }: { posts: ReturnType<typeof getAllPosts> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ReStart Physio Blog",
    "description": "Szakmai cikkek gyógytornáról, fizioterápiáról és egészséges mozgásról",
    "url": "https://restartphysio.hu/blog",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://restartphysio.hu/blog/${post.slug}`,
        "name": post.title,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <BlogCollectionSchema posts={posts} />
      <BreadcrumbSchema items={[
        { name: 'Főoldal', url: 'https://restartphysio.hu' },
        { name: 'Blog', url: 'https://restartphysio.hu/blog' },
      ]} />
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-x-0 bottom-0">
          <svg
            className="w-full h-16 md:h-24 text-white"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,186.7C672,171,768,117,864,117.3C960,117,1056,171,1152,186.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#004A6D] mb-4">
              Blog
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Szakmai cikkek gyógytornáról, fizioterápiáról és egészséges mozgásról
            </p>
          </div>
        </div>
      </section>

      {/* BLOG LISTA */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Hamarosan érkeznek a cikkek!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                    {/* Borítókép */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.coverImageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Tartalom */}
                    <div className="p-6">
                      {/* Tagek */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#004A6D]/10 text-[#004A6D]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#004A6D] transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author}</span>
                        <div className="flex items-center gap-3">
                          <span>{new Date(post.date).toLocaleDateString('hu-HU', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          <span>·</span>
                          <span>{post.readingTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}