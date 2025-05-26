// app/article/[id]/page.tsx
import { client } from '@/lib/client';
import ArticleContent from '@/components/article-content';
import { RelatedNews } from '@/components/related-news';
import { SanityDocument } from 'next-sanity';

export default async function Page(
  /** The inferred type is fine; add your own only if you really need it */
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const post = await client.fetch<SanityDocument>(
    `*[_type=="post" && _id==$id][0]{
      _id,title,description,publishedAt,
      "imageUrl":coalesce(image.asset->url,image._upload.previewImage)
    }`,
    { id },
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
