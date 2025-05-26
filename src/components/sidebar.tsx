import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Flame } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import Link from 'next/link';

const CATEGORIES = [
  'Politics',
  'National',
  'International',
  'Regulations',
  'Business',
  'Finance',
  'Health Care',
  'Technology',
  'Jobs',
  'Media',
  'Administration',
  'Defense',
  'Energy',
  'Latino',
  'Cyber',
  'Sports',
];

export function Sidebar() {
  return (
    <>
      <div className="mb-8 flex items-center gap-3">
        {/* Replace with <Avatar> if you have user pics */}
        <Flame className="h-8 w-8 text-primary" />
        <div>
          <p className="font-semibold leading-none">EzExplains</p>
          <p className="text-xs text-muted-foreground">Neeraj Walia</p>
        </div>
      </div>
      <h2 className="mb-4 text-sm font-semibold uppercase text-muted-foreground">
        Category
      </h2>
      <ScrollArea className="h-[calc(100vh-12rem)] pr-2">
        <ul className="space-y-2 text-sm">
          {CATEGORIES.map((c) => (
            <li key={c}>
              <Link
                href={`/topics/${c.toLowerCase().replace(/\s+/g, '-')}`}
                className="block rounded-md px-2 py-1.5 hover:bg-muted/60 hover:text-foreground"
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </>
  );
}
