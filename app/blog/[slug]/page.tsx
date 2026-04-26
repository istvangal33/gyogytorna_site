import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '../../lib/blog/blog';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';

/* ------------------------------------------------------------------ */
/*  Metadata                                                          */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: 'Cikk nem található' };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      url: `https://restartphysio.hu/blog/${post.slug}`,
      images: [
        {
          url: `https://restartphysio.hu${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: post.coverImageAlt,
        },
      ],
      siteName: 'ReStart Physio',
      locale: 'hu_HU',
      publishedTime: post.date,
      modifiedTime: post.updatedDate || post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`https://restartphysio.hu${post.coverImage}`],
    },
    alternates: {
      canonical: `https://restartphysio.hu/blog/${post.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Static params                                                     */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

/* ------------------------------------------------------------------ */
/*  Schema components                                                 */
/* ------------------------------------------------------------------ */
function ArticleSchema({ post }: { post: ReturnType<typeof getPostBySlug> }) {
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDescription,
    "image": `https://restartphysio.hu${post.coverImage}`,
    "datePublished": post.date,
    "dateModified": post.updatedDate || post.date,
    "author": {
      "@type": "Person",
      "name": post.author,
      "jobTitle": "Gyógytornász-fizioterapeuta",
      "url": "https://restartphysio.hu/bemutatkozas"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ReStart Physio",
      "url": "https://restartphysio.hu",
      "logo": {
        "@type": "ImageObject",
        "url": "https://restartphysio.hu/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://restartphysio.hu/blog/${post.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FAQSchema({ post }: { post: ReturnType<typeof getPostBySlug> }) {
  if (!post?.faq || post.faq.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                    */
/* ------------------------------------------------------------------ */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug);

  return (
    <>
      <div className="bg-white min-h-screen">
      <ArticleSchema post={post} />
      <FAQSchema post={post} />
      <BreadcrumbSchema items={[
        { name: 'Főoldal', url: 'https://restartphysio.hu' },
        { name: 'Blog', url: 'https://restartphysio.hu/blog' },
        { name: post.title, url: `https://restartphysio.hu/blog/${post.slug}` },
      ]} />

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-[#004A6D]/5 via-white to-[#EC7007]/5 py-16 md:py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#004A6D] transition-colors">
              Főoldal
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/blog" className="text-gray-500 hover:text-[#004A6D] transition-colors">
              Blog
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-[#004A6D] font-medium">{post.title}</span>
          </nav>

          {/* Tagek */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium px-3 py-1 rounded-full bg-[#004A6D]/10 text-[#004A6D]"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-[#004A6D] mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span className="font-medium">{post.author}</span>
            <span>·</span>
            <span>
              {new Date(post.date).toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>·</span>
            <span>{post.readingTime} olvasás</span>
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
            {/* COVER IMAGE */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-4">
        <div className="relative aspect-[16/9] md:aspect-[2/1] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 896px"
          />
          {/* Enyhe overlay az alsó részén */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
      </div>

      {/* CONTENT */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div
          className="prose prose-lg max-w-none
            prose-headings:text-gray-900
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-a:text-[#004A6D] prose-a:font-semibold hover:prose-a:text-[#EC7007]
            prose-strong:text-gray-900
            prose-li:text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* FAQ */}
        {post.faq && post.faq.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Gyakran Ismételt Kérdések
            </h2>
            <div className="space-y-4">
              {post.faq.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-[#004a6d] mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
                {/* CTA */}
        <div className="mt-20 text-center">
          <div className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition duration-500 max-w-2xl mx-auto">
            <h4 className="text-2xl font-bold text-gray-900 mb-6">
              Szeretne időpontot foglalni?
            </h4>
            <a
              href="/elerhetoseg#contact"
              className="inline-flex items-center gap-2 bg-[#0f1f29] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#d4610a] transition-colors duration-200 shadow-sm hover:shadow-md hover:scale-105 transform"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Kapcsolatfelvétel
            </a>
          </div>
        </div>

        {/* KAPCSOLÓDÓ CIKKEK */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Kapcsolódó cikkek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-32 overflow-hidden">
                      <Image
                        src={related.coverImage}
                        alt={related.coverImageAlt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#004A6D] transition-colors text-sm line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
      </div>
    </>
  );
}