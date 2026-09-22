import Link from "next/link";
import type { Metadata } from "next";
import { registry } from "@/registry/registry";

export const metadata: Metadata = {
  title: "Components",
  description: "Browse all components in the registry.",
};

export default function ComponentsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="mt-2 text-muted-foreground">
          {registry.length} installable UI primitives. Each page includes a
          live demo, install command, usage snippet, and source.
        </p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {registry.map((item) => (
          <Link
            key={item.name}
            href={`/components/${item.name}`}
            className="rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-medium">{item.title}</h2>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {item.type.replace("registry:", "")}
              </span>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {item.description}
            </p>
            {item.dependencies.length > 0 && (
              <p className="mt-3 text-xs text-muted-foreground">
                deps: {item.dependencies.join(", ")}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
