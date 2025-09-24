'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Users, User, Settings, LogOut, FileCheck, Sliders, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface SidebarItem {
  label: string
  href: string
  icon: React.ReactNode
  active?: boolean
  badge?: string
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface SidebarProps {
  userRole?: string
  onLogout?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  userRole = 'Admin',
  onLogout 
}) => {
  const pathname = usePathname()

  const mainSections: SidebarSection[] = [
    {
      title: 'Menu',
      items: [
        {
          label: 'Inventory',
          href: '/admin/inventory',
          icon: <FileCheck className="h-4 w-4" />,
          active: pathname.includes('/inventory')
        },
        {
          label: 'Adjustment',
          href: '/admin/adjustment',
          icon: <Sliders className="h-4 w-4" />,
          active: pathname.includes('/adjustment')
        },
        {
          label: 'Fulfillments',
          href: '/admin/fulfillments',
          icon: <Truck className="h-4 w-4" />,
          active: pathname.includes('/fulfillments')
        }
      ]
    },
    {
      title: 'Others',
      items: [
        {
          label: 'Setting',
          href: '/admin/settings',
          icon: <Settings className="h-4 w-4" />,
          active: pathname.includes('/settings')
        }
      ]
    }
  ]

  return (
    <div className="flex flex-col h-full w-64 bg-white rounded-lg shadow-sm">
      {/* Navigation */}
      <div className="flex-1 py-6">
        {mainSections.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? 'mt-8' : ''}>
            <div className="px-6 mb-3">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wider">
                {section.title}
              </span>
            </div>
            <nav className="space-y-1 px-3">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${item.active 
                      ? 'bg-blue-50 text-gray-900' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <Button
          className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-lg py-3 flex items-center justify-center"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export default Sidebar