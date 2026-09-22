import fs from "node:fs";
import path from "node:path";
import { registry, type RegistryItem } from "../registry/registry";
import {
  assertSafeRelativePath,
  getRepoRoot,
} from "../lib/registry-paths";

const ROOT = getRepoRoot(path.resolve(__dirname, ".."));
const OUT_DIR = path.join(ROOT, "public", "r");

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
    const safePath = assertSafeRelativePath(file.path, item.name, ROOT);
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
