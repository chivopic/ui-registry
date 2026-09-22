import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>Open component registry — copy, install, customize.</p>
        <div className="flex gap-4">
          <Link
            href="/components"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Components
          </Link>
          <Link
            href="/docs"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Docs
          </Link>
          <a
            href="/r/index.json"
            className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            Registry JSON
          </a>
        </div>
      </div>
    </footer>
  );
}
