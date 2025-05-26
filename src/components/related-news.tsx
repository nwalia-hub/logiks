// components/related-news.tsx
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import { Card } from './ui/card';
import { client } from '@/lib/client';
import { imageUrlFor } from '@/lib/sanity.image';
import { formatDistanceToNow } from 'date-fns';
import { SanityDocument } from 'next-sanity';

async function fetchRecentPosts(excludeId?: string) {
  const query = `*[_type == "post" && _id != $excludeId] | order(publishedAt desc) [0...3] {
     _id,
    title,
    description,
    publishedAt,
    "imageUrl": coalesce(
      image.asset->url,
      image._upload.previewImage
    )
  }`;

  return client.fetch<SanityDocument[]>(query, { excludeId });
}

export async function RelatedNews({ excludeId }: { excludeId?: string }) {
  const relatedPosts = await fetchRecentPosts(excludeId);
  console.log(relatedPosts, '--ASDASD--');

  if (!relatedPosts?.length) return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Related News</h2>
        <Link href="/archive" className="text-sm text-primary hover:underline">
          See all
        </Link>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)] pr-2">
        <div className="space-y-4">
          {relatedPosts.map((post) => (
            <Card key={post._id} className="overflow-hidden">
              <Link
                href={`/article/${post._id}`}
                className="flex gap-3 p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                  {post.imageUrl && (
                    <Image
                      src={imageUrlFor(post.imageUrl).width(200).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <Badge
                    variant="secondary"
                    className="mb-1 h-5 w-fit text-[10px] uppercase"
                  >
                    {post.tag}
                  </Badge>
                  <p className="line-clamp-2 text-sm font-medium leading-snug">
                    {post.title}
                  </p>
                  <span className="mt-auto text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(post.publishedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
