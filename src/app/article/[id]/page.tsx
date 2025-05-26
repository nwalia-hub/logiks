// News Article Detail UI – Next.js 15 + shadcn/ui
// Drop this file into `app/articles/[slug]/page.tsx`
// and adjust the import aliases ("@/components/ui/*") to match your shadcn extraction path.
// The component is self‑contained for quick scaffolding.

import * as React from 'react';
import { RelatedNews } from '@/components/related-news';
import ArticleContent from '@/components/article-content';
import { SanityDocument } from 'next-sanity';
import { client } from '@/lib/client';

type Props = {
  params: {
    id: string;
  };
};

const SINGLE_POST_QUERY = `*[
  _type == "post"
  && _id == $id
][0]{
  _id,
  title,
  description,
  publishedAt,
  "imageUrl": coalesce(
    image.asset->url,
    image._upload.previewImage
  )
}`;

const options = { next: { revalidate: 30 } };

export default async function NewsArticlePage({ params }: Props) {
  const { id } = params;
  console.log(id, '--id--');

  const post = await client.fetch<SanityDocument>(
    SINGLE_POST_QUERY,
    { id },
    options
  );

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
