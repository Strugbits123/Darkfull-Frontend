"use client";

import React from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="flex flex-1 flex-col gap-6">{children}</main>
    </div>
  );
}
