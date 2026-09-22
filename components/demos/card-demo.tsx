"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/components/card";
import { Button } from "@/registry/components/button";

export function CardDemo() {
  return (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Deploy faster</CardTitle>
        <CardDescription>
          Ship UI pieces from a shared registry with one install command.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Cards group related content with clear hierarchy and focus styles.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Get started</Button>
      </CardFooter>
    </Card>
  );
}
