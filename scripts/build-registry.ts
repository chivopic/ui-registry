import fs from "node:fs";
import path from "node:path";
import { registry, type RegistryItem } from "../registry/registry";

const ROOT = path.resolve(__dirname, "..");
const REGISTRY_ROOT = path.join(ROOT, "registry");
const OUT_DIR = path.join(ROOT, "public", "r");

function assertSafeRelativePath(filePath: string, itemName: string): string {
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
  const resolved = path.resolve(ROOT, normalized);
  const registryResolved = path.resolve(REGISTRY_ROOT);
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

interface RegistryJsonFile {
  path: string;
  content: string;
  type: string;
  target?: string;
}

interface RegistryItemJson {
  name: string;
  type: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: RegistryJsonFile[];
}

function buildItem(item: RegistryItem): RegistryItemJson {
  const files: RegistryJsonFile[] = item.files.map((file) => {
    const safePath = assertSafeRelativePath(file.path, item.name);
    const abs = path.join(ROOT, safePath);
    if (!fs.existsSync(abs)) {
      throw new Error(`Missing file for "${item.name}": ${file.path}`);
    }
    const content = fs.readFileSync(abs, "utf8");
    const basename = path.basename(safePath);
    return {
      path: safePath,
      content,
      type: file.type,
      target: `components/ui/${basename}`,
    };
  });

  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
    files,
  };
}

function main(): void {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Clear previous generated JSON (keep directory)
  for (const entry of fs.readdirSync(OUT_DIR)) {
    if (entry.endsWith(".json")) {
      fs.unlinkSync(path.join(OUT_DIR, entry));
    }
  }

  const index: Array<{
    name: string;
    type: string;
    title: string;
    description: string;
  }> = [];

  for (const item of registry) {
    const json = buildItem(item);
    const outPath = path.join(OUT_DIR, `${item.name}.json`);
    fs.writeFileSync(outPath, JSON.stringify(json, null, 2) + "\n", "utf8");
    index.push({
      name: item.name,
      type: item.type,
      title: item.title,
      description: item.description,
    });
    console.log(`Wrote public/r/${item.name}.json`);
  }

  fs.writeFileSync(
    path.join(OUT_DIR, "index.json"),
    JSON.stringify({ items: index }, null, 2) + "\n",
    "utf8"
  );
  console.log(`Wrote public/r/index.json (${index.length} items)`);
}

main();
