// lib/sanity.image.ts

import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { client } from './client';

// Shared builder instance
const builder = imageUrlBuilder(client);

/** Build a URL for any Sanity image source */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/** Build a high-res URL with sensible defaults */
export function imageUrlFor(source: SanityImageSource) {
  return urlForImage(source).width(1920).quality(80).auto('format').fit('max');
}
