// lib/sanity.image.ts
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

// Create image URL builder
const builder = imageUrlBuilder(client);

// Image URL generator function
export const urlForImage = (source: any) => {
  return builder.image(source);
};

// Optional helper with default settings
export function imageUrlFor(source: any) {
  return urlForImage(source).width(1920).quality(80).auto('format').fit('max');
}
