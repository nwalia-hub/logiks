// components/navigation.tsx
import { Video, RadioTower, Newspaper, LayoutGrid } from 'lucide-react';
import { ModeToggle } from './ui/theme-toggle';
import Link from 'next/link';

export function Navigation() {
  return (
    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
      <Link href="/" className="text-lg font-bold sm:text-xl">
        Logiks
      </Link>
      <NavLink href="/" icon={<Newspaper className="h-4 w-4" />} label="Home" />
      <NavLink
        href="/video"
        icon={<Video className="h-4 w-4" />}
        label="Video"
      />
      <NavLink
        href="/polls"
        icon={<RadioTower className="h-4 w-4" />}
        label="Polls"
      />
      <NavLink
        href="/magazine"
        icon={<LayoutGrid className="h-4 w-4" />}
        label="Magazine"
      />
      <ModeToggle />
    </nav>
  );
}

function NavLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
