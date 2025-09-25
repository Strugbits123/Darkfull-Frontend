import { cn } from "@/lib/utils";
import { Layers, Package, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/dist/client/components/navigation";
import Link from "next/link";

const menuSections = [
  {
    title: "Menu",
    items: [
      { label: "Inventory", icon: Layers, active: false },
      { label: "Adjustment", icon: Package, active: false },
      { label: "Fulfillments", icon: Package, active: true },
    ],
  },
  {
    title: "Others",
    items: [{ label: "Setting", icon: Settings, active: false }],
  },
];

export function SidebarNav() {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")?.[2] ?? ""; // Get the second segment of the path
 console.log(pathname.split("/"))
  return (
    <aside className="flex w-64 flex-col rounded-2xl bg-sidebar p-6 shadow-sm">
      <nav className="flex flex-1 flex-col space-y-8">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {section.title}
            </p>
            <div className="space-y-1.5">
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={`/${pathname.split("/")[1]}/${item.label.toLowerCase()}`}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors",
                    item.label.toLowerCase() === currentPath
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                  <span className="text-pretty">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <button
        type="button"
        className="mt-8 flex items-center justify-center gap-3 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[color:color-mix(in_srgb,var(--primary)_92%,var(--card)_8%)]"
      >
        <LogOut className="h-5 w-5" aria-hidden="true" />
        Logout
      </button>
    </aside>
  );
}
