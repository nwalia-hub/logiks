import { client } from '@/lib/client';
import ArticleContent from '@/components/article-content';
import { RelatedNews } from '@/components/related-news';
import type { SanityDocument } from 'next-sanity';

// 1️⃣  Define the real shape—no Promise
interface ArticlePageProps {
  params: { id: string };
  searchParams?: Record<string, string | string[]>;
}

// 2️⃣  Async component is fine; just use params directly
export default async function ArticlePage({ params }: ArticlePageProps) {
  const post = await client.fetch<SanityDocument>(
    `*[_type=="post" && _id==$id][0]{
      _id,title,description,publishedAt,
      "imageUrl":coalesce(image.asset->url,image._upload.previewImage)
    }`,
    { id: params.id },
    { next: { revalidate: 30 } }
  );

  if (!post) return <h1 className="p-6">Not found</h1>;

  return (
    <main className="flex flex-1 overflow-y-auto">
      <article className="flex-1 px-6 py-8">
        <ArticleContent post={post} />
      </article>

      <aside className="hidden w-[22rem] shrink-0 border-l px-6 py-8 xl:block">
        <RelatedNews excludeId={post._id} />
      </aside>
    </main>
  );
}
