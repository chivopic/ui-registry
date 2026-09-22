export function getSiteUrl(): string {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;
  if (env) {
    return env.startsWith("http") ? env.replace(/\/$/, "") : `https://${env}`;
  }
  return "";
}

/** Install URL for a registry item — prefers absolute site URL when set. */
export function getInstallUrl(name: string): string {
  const base = getSiteUrl();
  if (base) return `${base}/r/${name}.json`;
  return `/r/${name}.json`;
}

export function getInstallCommand(name: string): string {
  const url = getInstallUrl(name);
  return `pnpm dlx shadcn@latest add ${url}`;
}
