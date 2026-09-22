import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Docs",
  description: "How to use and extend the component registry.",
};

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Docs</h1>
      <p className="mt-2 text-muted-foreground">
        Short Phase 1 notes. Full contributor guide lives in the repo README.
      </p>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">Install a component</h2>
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 px-4 py-3 font-mono text-sm">
          <code>
            {`pnpm dlx shadcn@latest add https://YOUR_DOMAIN/r/button.json`}
          </code>
        </pre>
        <p className="text-sm text-muted-foreground">
          Or open any{" "}
          <Link
            href="/components"
            className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            component page
          </Link>{" "}
          and copy the install command.
        </p>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">Add a component</h2>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>
            Create source under{" "}
            <code className="rounded bg-muted px-1">registry/components/</code>
          </li>
          <li>
            Register metadata in{" "}
            <code className="rounded bg-muted px-1">registry/registry.ts</code>
          </li>
          <li>
            Add a demo under{" "}
            <code className="rounded bg-muted px-1">components/demos/</code>
          </li>
          <li>
            Run{" "}
            <code className="rounded bg-muted px-1">pnpm registry:check</code>{" "}
            and{" "}
            <code className="rounded bg-muted px-1">pnpm registry:build</code>
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold">Generated registry</h2>
        <p className="text-sm text-muted-foreground">
          JSON under{" "}
          <code className="rounded bg-muted px-1">public/r/</code> is generated
          only — never hand-edit as source of truth. See{" "}
          <a
            href="/r/index.json"
            className="underline underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            /r/index.json
          </a>
          .
        </p>
      </section>
    </div>
  );
}
