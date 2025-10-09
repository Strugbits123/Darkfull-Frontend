import React from "react";
import { SidebarNav } from "@/components/SideBar/sidebar";
import { Header } from "@/components/Header/header";
import { cookies } from "next/headers";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value || null;
  const role = cookieStore.get("role")?.value || null;
  return (
    <div className="min-h-screen bg-background   text-foreground">
      <Header />
      <div className="mx-auto flex max-w-[calc(100%-5em)] gap-6 mt-10">
        <SidebarNav token={token} role={role} />
        <main className="flex flex-1 flex-col gap-6">{children}</main>
      </div>
    </div>
  );
}
