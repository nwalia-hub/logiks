import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
// import { sanity } from './sanity.client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export async function fetchSanity<T>(
//   query: string,
//   params: Record<string, any> = {}
// ) {
//   return sanity.fetch<T>(query, params);
// }
