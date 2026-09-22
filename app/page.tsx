import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { registry } from "@/registry/registry";
import { getInstallCommand } from "@/lib/site-url";
import { CopyButton } from "@/components/site/copy-button";

export default function HomePage() {
  const featured = registry.slice(0, 3);
  const quickStart = getInstallCommand("button");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-sm font-medium text-muted-foreground">
          Phase 1 · Open UI registry
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Installable components, one source of truth
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Browse accessible shadcn-style primitives, preview them live, and add
          them to your app with a single{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
            shadcn add
          </code>{" "}
          command. No database, no auth — just JSON and source files.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/components"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Browse components
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            href="/docs"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Read docs
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Featured components
          </h2>
          <Link
            href="/components"
            className="text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <Link
              key={item.name}
              href={`/components/${item.name}`}
              className="group rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <h3 className="font-medium group-hover:underline">{item.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-xl border border-border bg-muted/40 p-6 sm:p-8">
        <h2 className="text-xl font-semibold tracking-tight">Quick start</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Point{" "}
          <code className="rounded bg-muted px-1 py-0.5">shadcn</code> at a
          registry JSON URL (set{" "}
          <code className="rounded bg-muted px-1 py-0.5">
            NEXT_PUBLIC_SITE_URL
          </code>{" "}
          in production). Relative paths work for local previews.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <pre className="flex-1 overflow-x-auto rounded-lg border border-border bg-background px-4 py-3 font-mono text-xs sm:text-sm">
            <code>{quickStart}</code>
          </pre>
          <CopyButton value={quickStart} />
        </div>
      </section>
    </div>
  );
}
