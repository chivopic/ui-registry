import type { RegistryItem } from "@/registry/registry";

export interface PropRow {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface ComponentPageMeta {
  usage: string;
  props: PropRow[];
}

const meta: Record<string, ComponentPageMeta> = {
  button: {
    usage: `import { Button } from "@/components/ui/button"

export function Example() {
  return <Button variant="outline">Click me</Button>
}`,
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        defaultValue: '"default"',
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon"',
        defaultValue: '"default"',
        description: "Size of the button.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Not used in this Phase 1 build (native button only).",
      },
      {
        name: "...props",
        type: "ButtonHTMLAttributes",
        description: "All native button attributes are forwarded.",
      },
    ],
  },
  input: {
    usage: `import { Input } from "@/components/ui/input"

export function Example() {
  return <Input type="email" placeholder="Email" />
}`,
    props: [
      {
        name: "type",
        type: "string",
        defaultValue: '"text"',
        description: "Native input type.",
      },
      {
        name: "...props",
        type: "InputHTMLAttributes",
        description: "All native input attributes are forwarded.",
      },
    ],
  },
  card: {
    usage: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>Content</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  )
}`,
    props: [
      {
        name: "Card",
        type: "HTMLDivElement props",
        description: "Root container with border and shadow.",
      },
      {
        name: "CardHeader / CardContent / CardFooter",
        type: "HTMLDivElement props",
        description: "Layout sections with default padding.",
      },
      {
        name: "CardTitle / CardDescription",
        type: "HTMLDivElement props",
        description: "Typography helpers for header content.",
      },
    ],
  },
};

export function getComponentPageMeta(
  item: RegistryItem
): ComponentPageMeta {
  return (
    meta[item.name] ?? {
      usage: `import { ${item.title} } from "@/components/ui/${item.name}"`,
      props: [],
    }
  );
}
