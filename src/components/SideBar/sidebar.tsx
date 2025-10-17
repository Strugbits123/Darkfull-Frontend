"use client";
import { cn } from "@/lib/utils";
import { clearAuthCookies } from "@/lib/utils/cookies";
import { Layers, Package, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
const listSidebarUserPermission = [
  {
    role: "SUPER_ADMIN",
    permissions: [
      {
        title: "Menu",
        items: [{ label: "Director", icon: Layers, active: false }],
      },
    ],
  },

  {
    role: "DIRECTOR",
    permissions: [
      {
        title: "Menu",
        items: [
          { label: "Inventory", icon: Layers, active: false },
          { label: "Adjustment", icon: Package, active: false },
          { label: "Fulfillments", icon: Package, active: true },
          { label: "Analytics", icon: Package, active: false },
        ],
      },
      {
        title: "Others",
        items: [{ label: "Setting", icon: Settings, active: false }],
      },
    ],
  },
  {
    role: "ADMIN",
    permissions: [
      {
        title: "Menu",
        items: [
          { label: "Directors", icon: Layers, active: false },
          { label: "Profile", icon: Package, active: false },
        ],
      },
      {
        title: "Others",
        items: [{ label: "Setting", icon: Settings, active: false }],
      },
    ],
  },

  {
    role: "CLIENT",
    permissions: [
      {
        title: "Menu",
        items: [
          { label: "Products", icon: Layers, active: false },
          { label: "Inventory", icon: Package, active: false },
          { label: "Fulfillments", icon: Package, active: false },
          { label: "Return", icon: Package, active: false },
          { label: "Analytics", icon: Package, active: false },
        ],
      },
      {
        title: "Others",
        items: [{ label: "Profile Settings", icon: Settings, active: false }],
      },
    ],
  },

  {
    role: "MANAGER",
    permissions: [
      {
        title: "Menu",
        items: [
          { label: "Inventory", icon: Layers, active: false },
          { label: "Return", icon: Package, active: false },
          { label: "Fulfillments", icon: Package, active: false },
          { label: "Analytics", icon: Package, active: false },
        ],
      },
      {
        title: "Others",
        link: "/manager/profile",
        items: [{ label: "Profile Settings", icon: Settings, active: false }],
      },
    ],
  },
  {
    role: "WORKER",
    permissions: [
      {
        title: "Menu",
        items: [
          { label: "Inventory", icon: Layers, active: false },
          { label: "Fulfillments", icon: Package, active: false },
          { label: "Return", icon: Package, active: false },
        ],
      },
    ],
  },
];

export function SidebarNav({ role }: { role: string }) {
  console.log("User Role in SidebarNav:", role); // Debug log to check the role prop
  const pathname = usePathname();
  const currentPath = pathname?.split("/")?.[2] ?? ""; // Get the second segment of the path
  const userRole = role.toUpperCase(); // Example role, this should come from your auth logic
  const router = useRouter();
  return (
    <aside className="flex w-64 flex-col rounded-2xl bg-sidebar min-h-[calc(70vh-40px)] p-6 shadow-sm">
      <nav className="flex flex-1 flex-col space-y-8">
        {listSidebarUserPermission.map(
          (role) =>
            role.role === userRole &&
            role.permissions.map((menu) => (
              <div key={menu.title}>
                <h4 className="text-[14px] mb-3 font-semibold text-muted-foreground">
                  {menu.title}
                </h4>
                {menu.items.map((section) => (
                  <div key={section.label} className="space-y-3">
                    <Link
                      key={section.label}
                      href={
                        menu?.link ||
                        `/${
                          pathname.split("/")[1]
                        }/${section.label.toLowerCase()}`
                      }
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                        section.label.toLowerCase() === currentPath
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <section.icon className="h-7 w-7" aria-hidden="true" />
                      <span className="text-[16px]">{section.label}</span>
                    </Link>
                  </div>
                ))}
              </div>
            ))
        )}
      </nav>

      <button
        onClick={() => {
          clearAuthCookies();
          router.refresh();
        }}
        className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:color-mix(in_srgb,var(--primary)_92%,var(--card)_8%)]"
      >
        <LogOut className="h-5 w-5" aria-hidden="true" />
        Logout
      </button>
    </aside>
  );
}
