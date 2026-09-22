import fs from "node:fs";
import path from "node:path";
import { registry, type RegistryItem } from "../registry/registry";

const ROOT = path.resolve(__dirname, "..");
const REGISTRY_ROOT = path.join(ROOT, "registry");

const SECRET_PATTERNS: RegExp[] = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:api[_-]?key|secret|password|token)\s*[:=]\s*['"][^'"]{8,}['"]/i,
  /sk-[a-zA-Z0-9]{20,}/,
  /ghp_[a-zA-Z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
];

const ABSOLUTE_PATH_IN_CONTENT =
  /(?:^|[\s"'`(=])(?:\/(?:Users|home|var|tmp|opt|root)\/[^\s"'`)]+|C:\\[^\s"'`)]+)/;

function fail(message: string): never {
  console.error(`registry:check failed: ${message}`);
  process.exit(1);
}

function assertSafeRelativePath(filePath: string, itemName: string): string {
  if (path.isAbsolute(filePath)) {
    fail(`Item "${itemName}" has absolute path: ${filePath}`);
  }
  if (filePath.includes("..") || filePath.split(/[/\\]/).includes("..")) {
    fail(`Item "${itemName}" path escapes registry via "..": ${filePath}`);
  }
  const normalized = path.normalize(filePath).replace(/\\/g, "/");
  if (!normalized.startsWith("registry/")) {
    fail(
      `Item "${itemName}" path must stay under registry/: got ${filePath}`
    );
  }
  const resolved = path.resolve(ROOT, normalized);
  const registryResolved = path.resolve(REGISTRY_ROOT);
  if (
    resolved !== registryResolved &&
    !resolved.startsWith(registryResolved + path.sep)
  ) {
    fail(`Item "${itemName}" resolved path escapes registry/: ${filePath}`);
  }
  return normalized;
}

function scanContent(content: string, label: string): void {
  for (const pattern of SECRET_PATTERNS) {
    if (pattern.test(content)) {
      fail(`Possible secret detected in ${label}`);
    }
  }
  if (ABSOLUTE_PATH_IN_CONTENT.test(content)) {
    fail(`Absolute machine path detected in content of ${label}`);
  }
}

function validateItem(item: RegistryItem, seen: Set<string>): void {
  if (!item.name || typeof item.name !== "string") {
    fail("Registry item missing name");
  }
  if (seen.has(item.name)) {
    fail(`Duplicate registry name: ${item.name}`);
  }
  seen.add(item.name);

  if (item.type !== "registry:ui") {
    fail(`Item "${item.name}" has unsupported type: ${item.type}`);
  }
  if (!item.title) fail(`Item "${item.name}" missing title`);
  if (!item.description) fail(`Item "${item.name}" missing description`);
  if (!Array.isArray(item.files) || item.files.length === 0) {
    fail(`Item "${item.name}" must list at least one file`);
  }
  if (!Array.isArray(item.dependencies)) {
    fail(`Item "${item.name}" dependencies must be an array`);
  }
  if (!Array.isArray(item.registryDependencies)) {
    fail(`Item "${item.name}" registryDependencies must be an array`);
  }

  for (const file of item.files) {
    const safePath = assertSafeRelativePath(file.path, item.name);
    const abs = path.join(ROOT, safePath);
    if (!fs.existsSync(abs)) {
      fail(`Item "${item.name}" missing file: ${file.path}`);
    }
    const content = fs.readFileSync(abs, "utf8");
    scanContent(content, `${item.name}:${file.path}`);
  }
}

function main(): void {
  if (!Array.isArray(registry) || registry.length === 0) {
    fail("registry is empty");
  }
  const seen = new Set<string>();
  for (const item of registry) {
    validateItem(item, seen);
  }
  console.log(`registry:check passed (${registry.length} items)`);
}

main();
