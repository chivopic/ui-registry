import path from "node:path";

/**
 * Absolute path to the repo root (directory containing package.json / registry/).
 * Scripts should pass an explicit directory (e.g. path.resolve(__dirname, "..")).
 * Next.js server code relies on process.cwd() (the package root at runtime).
 */
export function getRepoRoot(fromDir: string = process.cwd()): string {
  return path.resolve(fromDir);
}

/** Absolute path to the registry/ directory under the repo root. */
export function getRegistryRoot(repoRoot: string = getRepoRoot()): string {
  return path.join(repoRoot, "registry");
}

/**
 * Normalize and validate a registry-relative file path.
 * Rejects absolute paths, `..` segments, and anything that resolves outside `registry/`.
 * Returns a forward-slash normalized path that starts with `registry/`.
 */
export function assertSafeRelativePath(
  filePath: string,
  itemName = "unknown",
  repoRoot: string = getRepoRoot()
): string {
  if (path.isAbsolute(filePath)) {
    throw new Error(`Item "${itemName}" has absolute path: ${filePath}`);
  }
  if (filePath.includes("..") || filePath.split(/[/\\]/).includes("..")) {
    throw new Error(
      `Item "${itemName}" path escapes registry via "..": ${filePath}`
    );
  }
  const normalized = path.normalize(filePath).replace(/\\/g, "/");
  if (!normalized.startsWith("registry/")) {
    throw new Error(
      `Item "${itemName}" path must stay under registry/: got ${filePath}`
    );
  }
  const registryRoot = getRegistryRoot(repoRoot);
  const resolved = path.resolve(repoRoot, normalized);
  const registryResolved = path.resolve(registryRoot);
  if (
    resolved !== registryResolved &&
    !resolved.startsWith(registryResolved + path.sep)
  ) {
    throw new Error(
      `Item "${itemName}" resolved path escapes registry/: ${filePath}`
    );
  }
  return normalized;
}

/**
 * Resolve a registry-relative path to an absolute filesystem path after safety checks.
 */
export function resolveRegistryFile(
  filePath: string,
  itemName = "unknown",
  repoRoot: string = getRepoRoot()
): string {
  const safe = assertSafeRelativePath(filePath, itemName, repoRoot);
  return path.join(repoRoot, safe);
}
