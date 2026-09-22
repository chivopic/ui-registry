export type RegistryItemType = "registry:ui";

export interface RegistryFile {
  path: string;
  type: RegistryItemType;
}

export interface RegistryItem {
  name: string;
  type: RegistryItemType;
  title: string;
  description: string;
  files: RegistryFile[];
  dependencies: string[];
  registryDependencies: string[];
}

export const registry: RegistryItem[] = [
  {
    name: "button",
    type: "registry:ui",
    title: "Button",
    description:
      "Displays a button or a component that looks like a button. Supports variants and sizes.",
    files: [{ path: "registry/components/button.tsx", type: "registry:ui" }],
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: [],
  },
  {
    name: "input",
    type: "registry:ui",
    title: "Input",
    description:
      "Displays a form input field or a component that looks like an input field.",
    files: [{ path: "registry/components/input.tsx", type: "registry:ui" }],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
  },
  {
    name: "card",
    type: "registry:ui",
    title: "Card",
    description:
      "Displays a card with header, content, and footer sections for grouping related content.",
    files: [{ path: "registry/components/card.tsx", type: "registry:ui" }],
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
  },
];

export function getRegistryItem(name: string): RegistryItem | undefined {
  return registry.find((item) => item.name === name);
}
