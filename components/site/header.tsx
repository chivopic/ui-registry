import Link from "next/link";
import { ThemeToggle } from "@/components/site/theme-toggle";

const nav = [
  { href: "/components", label: "Components" },
  { href: "/docs", label: "Docs" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            Component Registry
          </Link>
          <nav className="hidden items-center gap-4 sm:flex" aria-label="Main">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/components"
            className="text-sm text-muted-foreground sm:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Browse
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
