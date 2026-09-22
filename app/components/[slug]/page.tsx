import fs from "node:fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { registry, getRegistryItem } from "@/registry/registry";
import { getInstallCommand } from "@/lib/site-url";
import { getComponentPageMeta } from "@/lib/component-meta";
import { resolveRegistryFile } from "@/lib/registry-paths";
import { CopyButton } from "@/components/site/copy-button";
import { ButtonDemo } from "@/components/demos/button-demo";
import { InputDemo } from "@/components/demos/input-demo";
import { CardDemo } from "@/components/demos/card-demo";

const demos: Record<string, ReactNode> = {
  button: <ButtonDemo />,
  input: <InputDemo />,
  card: <CardDemo />,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return registry.map((item) => ({ slug: item.name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getRegistryItem(slug);
  if (!item) return { title: "Not found" };
  return {
    title: item.title,
    description: item.description,
  };
}

function readSource(relPath: string): string {
  // Reject .. / absolute / outside registry/; shared with registry scripts.
  const abs = resolveRegistryFile(relPath);
  return fs.readFileSync(abs, "utf8");
}

export default async function ComponentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getRegistryItem(slug);
  if (!item) notFound();

  const install = getInstallCommand(item.name);
  const pageMeta = getComponentPageMeta(item);
  const sources = item.files.map((file) => ({
    path: file.path,
    content: readSource(file.path),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link
          href="/components"
          className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Components
        </Link>
        <span className="mx-2" aria-hidden>
          /
        </span>
        <span className="text-foreground">{item.title}</span>
      </nav>

      <header className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
        <p className="mt-2 text-muted-foreground">{item.description}</p>
      </header>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold tracking-tight">Demo</h2>
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          {demos[item.name] ?? (
            <p className="text-sm text-muted-foreground">No demo yet.</p>
          )}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Install</h2>
          <CopyButton value={install} />
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 px-4 py-3 font-mono text-xs sm:text-sm">
          <code>{install}</code>
        </pre>
      </section>

      <section className="mt-10">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Usage</h2>
          <CopyButton value={pageMeta.usage} label="Copy usage" />
        </div>
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 px-4 py-3 font-mono text-xs sm:text-sm">
          <code>{pageMeta.usage}</code>
        </pre>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">
          Source code
        </h2>
        <div className="space-y-4">
          {sources.map((src) => (
            <div key={src.path}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="font-mono text-xs text-muted-foreground">
                  {src.path}
                </p>
                <CopyButton value={src.content} label="Copy source" />
              </div>
              <pre className="max-h-[28rem] overflow-auto rounded-xl border border-border bg-muted/40 px-4 py-3 font-mono text-xs leading-relaxed sm:text-sm">
                <code>{src.content}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold tracking-tight">Props</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-border bg-muted/50">
              <tr>
                <th className="px-4 py-3 font-medium">Prop</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Default</th>
                <th className="px-4 py-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              {pageMeta.props.map((row) => (
                <tr
                  key={row.name}
                  className="border-b border-border last:border-0"
                >
                  <td className="px-4 py-3 font-mono text-xs">{row.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.type}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {row.defaultValue ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {row.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
