// Popular Articles Grid – Next.js 15 + shadcn/ui
// Drop this file into `app/articles/page.tsx` (or `/popular` route).
// Uses CSS Grid + `grid-auto-rows` for a masonry‑like layout without JS.
// Adjust the @/components/ui/* paths to match your shadcn extraction.

import * as React from 'react';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/post-card';
import { client } from '@/lib/client';
import { type SanityDocument } from 'next-sanity';
import Link from 'next/link';

const POSTS_QUERY = `*[
  _type == "post"
  // skip drafts so you only see ready-to-ship docs
  && !(_id in path("drafts.**"))
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  description,
  publishedAt,

  // 1️⃣ finished upload  ➜ real CDN URL
  // 2️⃣ still uploading  ➜ base64 preview (handy in Studio preview mode)
  "imageUrl": coalesce(
    image.asset->url,           // when the asset ref exists
    image._upload.previewImage  // while the file is still uploading
  )
}`;
const options = { next: { revalidate: 30 } };

// const POSTS: Post[] = [
//   {
//     id: 1,
//     title: 'Effective Forms Advertising Internet Web Site',
//     desc: 'Discover how persuasive ad formats and well‑timed CTAs can double your ROAS overnight.',
//     author: 'Lora Stevenson',
//     date: 'Aug 15',
//     image:
//       'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
//     big: true,
//   },
//   {
//     id: 2,
//     title: 'Effective Forms Advertising Internet Web Site',
//     desc: 'A design teardown of 2025’s highest‑converting ad placements and why they work.',
//     author: 'Randall Erickson',
//     date: 'Jan 21',
//     image:
//       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 3,
//     title: 'The Idea Of God Is Not Henceforth Relevant',
//     desc: 'A philosophical dive into post‑secular society and the rise of empirical spirituality.',
//     author: 'Elmer Adkins',
//     date: 'Oct 9',
//     image:
//       'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 4,
//     title: 'Star Lifts Feel The Freedom Of Your Home',
//     desc: 'How compact residential elevators are transforming multi‑storey living for seniors.',
//     author: 'Mario Baxter',
//     date: 'Jan 27',
//     image:
//       'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 5,
//     title: 'Comment On The Importance Of Human Life',
//     desc: 'Ethicists debate AI personhood and what it means for future legislation.',
//     author: 'Ivan Jimenez',
//     date: 'Sep 12',
//     image:
//       'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 6,
//     title: 'Adwords Keyword Research For Beginners',
//     desc: 'Step‑by‑step guide to finding profitable long‑tail keywords in under 30 minutes.',
//     author: 'Jamie Cummings',
//     date: 'Feb 18',
//     image:
//       'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 7,
//     title: 'Tips For Designing An Effective Business Card',
//     desc: 'Modern print specs, NFC tags, and minimalist layouts that leave a lasting impression.',
//     author: 'Jennie Cummings',
//     date: 'Aug 11',
//     image:
//       'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 8,
//     title: 'Popular Uses Of The Internet',
//     desc: 'Five emerging web applications—from VR classrooms to tele‑surgery—that reshape life.',
//     author: 'Katherine Wise',
//     date: 'Mar 02',
//     image:
//       'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 9,
//     title: 'Cooking Recipes Anytime And Anywhere',
//     desc: 'AI meal planners meet smart ovens: effortless gourmet dinners in 20 minutes.',
//     author: 'Jerry Simmons',
//     date: 'May 16',
//     image:
//       'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 10,
//     title: 'The Surprising Popularity Of Cigar Smoking',
//     desc: 'Data reveals a Gen‑Z renaissance in boutique cigar lounges and craftsmanship.',
//     author: 'Maxine Harmon',
//     date: 'Nov 11',
//     image:
//       'https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=900&q=80',
//   },
//   {
//     id: 11,
//     title: 'Vampires The Romantic Ideology Behind Them',
//     desc: 'From Bram Stoker to streaming: why the undead continue to capture pop culture.',
//     author: 'Jane Jennings',
//     date: 'Dec 20',
//     image:
//       'https://images.unsplash.com/photo-1515876305937-2ad82a4f3f9f?auto=format&fit=crop&w=900&q=80',
//   },
// ];

// -----------------------------------------------------------------------------
export default async function ArticlesPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);
  console.log(posts);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 overflow-y-auto">
      {/* Page header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Popular
        </h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            Articles
          </Button>
          <Button variant="ghost" size="sm">
            Channels
          </Button>
          <Button variant="ghost" size="sm">
            Authors
          </Button>
          <div className="ml-3 flex items-center gap-1 text-sm text-muted-foreground">
            <span>Sort by</span>
            <Button variant="outline" size="sm">
              New
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section
        className="grid auto-rows-[1fr] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        // Masonry trick: each card sets its own row-span via class
      >
        {posts.map((post, idx) => (
          <Link
            key={post._id}
            href={`/article/${post._id}`}
            className="contents" // ← Key modifier to preserve grid layout
          >
            <PostCard post={post} first={idx === 0} />
          </Link>
        ))}
      </section>

      {/* Load more */}
      <div className="mt-10 flex justify-center">
        <Button variant="secondary" size="lg">
          Load More
        </Button>
      </div>
    </div>
  );
}
