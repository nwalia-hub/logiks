// components/sanity-portable-text.tsx
'use client';

import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { useNextSanityImage } from 'next-sanity-image';
import { client } from '@/lib/client';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 text-xl font-semibold">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-gray-300 pl-4 italic">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        {children}
      </a>
    ),
  },

  types: {
    image: ({ value }) => {
      const imageProps = useNextSanityImage(client, value as SanityImageSource);

      if (!imageProps) return null;

      return (
        <figure className="my-6">
          <Image
            {...imageProps}
            alt={value.alt || ''}
            placeholder={value.asset?.metadata?.lqip ? 'blur' : 'empty'}
            blurDataURL={value.asset?.metadata?.lqip}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-sm text-gray-500">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    code: ({ value }) => (
      <pre className="my-6 overflow-x-auto rounded-lg bg-gray-800 p-4">
        <code className="text-gray-100">{value?.code}</code>
      </pre>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc pl-6">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal pl-6">{children}</ol>
    ),
  },
};

type Props = {
  content: PortableTextBlock[];
};

export default function SanityPortableText({ content }: Props) {
  return <PortableText value={content} components={components} />;
}
