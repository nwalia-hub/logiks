'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { type SanityDocument } from 'next-sanity';

function PostCard({ post, first }: { post: SanityDocument; first?: boolean }) {
  const big = first;
  const cardClasses = big ? 'md:col-span-2 md:row-span-2 h-full' : '';
  console.log(post.imageUrl, '--POST--');

  return (
    <Card
      className={`group flex h-full flex-col overflow-hidden ${cardClasses}`}
    >
      {/* IMAGE */}
      <div className={`relative w-full ${big ? 'h-64 md:h-full' : 'h-36'}`}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {big && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        )}
      </div>

      {/* BODY */}
      <div className={`flex-1 px-4 ${big ? 'py-6 text-white' : 'py-4'}`}>
        <h2
          className={`font-semibold leading-snug ${
            big ? 'text-xl lg:text-2xl' : 'text-base'
          }`}
        >
          {post.title}
        </h2>
        <p
          className={`mt-1 line-clamp-2 text-sm ${
            big ? 'opacity-90' : 'text-muted-foreground'
          }`}
        >
          {post.desc}
        </p>
      </div>

      {/* FOOTER */}
    </Card>
  );
}

export default PostCard;
