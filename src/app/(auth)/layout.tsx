"use client";

import React from "react";
import { SidebarNav } from "@/components/SideBar/sidebar";
import { Header } from "@/components/Header/header";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background   text-foreground">
      <Header />
      <div className="mx-auto flex max-w-[calc(100%-5em)] gap-6 mt-10">
        <SidebarNav />
        <main className="flex flex-1 flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
