"use client";

import { Input } from "@/registry/components/input";

export function InputDemo() {
  return (
    <div className="grid max-w-sm gap-3">
      <Input type="email" placeholder="Email" aria-label="Email" />
      <Input type="password" placeholder="Password" aria-label="Password" />
      <Input disabled placeholder="Disabled" aria-label="Disabled" />
    </div>
  );
}
