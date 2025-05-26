import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bookmark, Share2, Flame } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { SanityDocument } from 'next-sanity';
import SanityPortableText from '@/components/sanity-portable-text'; // Import your Portable Text component

interface ArticleContentProps {
  post: SanityDocument;
}

const ArticleContent = ({ post }: ArticleContentProps) => {
  // Extract image URL properly from Sanity asset
  const imageUrl = post.imageUrl;
  console.log(imageUrl, '--IMAGE--');

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">{post.title}</h1>
      <div className="mb-4 flex flex-wrap items-center gap-3 text-muted-foreground">
        <Badge variant="secondary" className="text-xs uppercase">
          Congress
        </Badge>
        <span>2.5m views</span>
        <span className="hidden md:inline">•</span>
        <span className="flex items-center gap-1">
          <Flame className="h-4 w-4" />
          15k
        </span>
        <span>• 39k comments</span>
      </div>

      {imageUrl && (
        <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-xl bg-muted">
          <Image
            src={imageUrl}
            alt={post.image?.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      )}

      <div className="prose max-w-none dark:prose-invert">
        <SanityPortableText content={post.description} />
      </div>

      <Separator className="my-6" />

      <div className="flex gap-3">
        <Button variant="secondary" size="sm" className="gap-1">
          <Bookmark className="h-4 w-4" /> Save to Pocket
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" /> Share on media
        </Button>
      </div>
    </>
  );
};

export default ArticleContent;
