'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/common/Sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, ChevronDown } from 'lucide-react'
import { SidebarNav } from '@/components/SideBar/sidebar'
import { Topbar } from '@/components/Header/header'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {

  return (
    <div className="min-h-screen bg-background   text-foreground">
       <Topbar />
      <div className="mx-auto flex max-w-[calc(100%-5em)] gap-6 mt-10">
        <SidebarNav />
        <main className="flex flex-1 flex-col gap-6">

            {children}
        </main>
      </div>
    </div>
  )
}