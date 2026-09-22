# Component Registry Site

Phase 1 open UI component registry built with **Next.js App Router**, **TypeScript (strict)**, **Tailwind CSS**, and **pnpm**.

Browse live demos, copy install commands, and serve shadcn-style registry JSON from `public/r/`.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- shadcn/ui-style CSS variables + light/dark via `next-themes`
- No database, no auth, no online code editor

## Scripts

| Script | Purpose |
| --- | --- |
| `pnpm dev` | Local Next.js server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm registry:check` | Validate registry metadata & sources (no stale `public/r`) |
| `pnpm registry:build` | Generate `public/r/{name}.json` + `public/r/index.json` |
| `pnpm build` | Rebuild registry JSON, then `next build` |

Quality bar:

```bash
pnpm install && pnpm lint && pnpm typecheck && pnpm registry:check && pnpm registry:build && pnpm build
```

## Directory layout

```
app/                    # /, /components, /components/[slug], /docs
components/ui/          # Site chrome UI only
components/site/        # Header, footer, theme toggle
components/demos/       # Live demos importing from @/registry/components
registry/components/    # PUBLIC distributable sources
registry/registry.ts    # Metadata entries
scripts/                # build-registry + validate-registry
public/r/               # GENERATED only — never hand-edit as source of truth
lib/                    # cn(), site URL helpers, page meta
docs/                   # Short pointers
```

## Add a component

1. Add the source file under `registry/components/` (e.g. `badge.tsx`).
2. Append an entry in `registry/registry.ts` with `name`, `type: "registry:ui"`, `title`, `description`, `files`, `dependencies`, `registryDependencies`.
3. Paths in `files` must stay under `registry/` — no `..`, no absolute paths.
4. Add a demo in `components/demos/` that imports from `@/registry/components/...`.
5. Wire the demo into `app/components/[slug]/page.tsx` and optional props/usage in `lib/component-meta.ts`.
6. Run `pnpm registry:check && pnpm registry:build`.

## Demo import rule

`components/demos/*` must import featured components **only** from `@/registry/components/*` (the distributable source of truth). Site chrome under `components/site/*` may use `@/components/ui/*`.

## public/r — do not hand-edit

`public/r/*.json` is **generated** by `pnpm registry:build` (also run automatically as the first step of `pnpm build`). Do not hand-edit these files; change `registry/components/` + `registry/registry.ts` and rebuild. Generated JSON may be committed for convenience, but the build script is the source of truth on Vercel.

## Registry JSON

Generated items look like shadcn registry payloads: metadata + file contents for installers. Example install:

```bash
pnpm dlx shadcn@latest add https://YOUR_DOMAIN/r/button.json
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://ui.example.com`) so install commands on the site use absolute URLs. Without it, commands fall back to relative `/r/{name}.json`.

## Deploy (Vercel)

1. Create a new Vercel project from this repo (suggested names: `chivopic/component-registry` or `ui-registry`).
2. Framework preset: Next.js. Install command: `pnpm install`. Build: `pnpm build`.
3. Set env `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Do **not** hand-edit `public/r/` — it is regenerated on every build.

## License

MIT (or project default). Sources under `registry/components/` are intended for redistribution via the registry JSON.
