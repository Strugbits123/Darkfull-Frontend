import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  Returned: "bg-[color:var(--badge-warning-bg)] text-[color:var(--badge-warning-fg)]",
  Shipped: "bg-[color:var(--badge-positive-bg)] text-[color:var(--badge-positive-fg)]",
  Picked: "bg-[color:var(--badge-primary-bg)] text-[color:var(--badge-primary-fg)]",
  Packed: "bg-[color:var(--badge-primary-bg)] text-[color:var(--badge-primary-fg)]",
  New: "bg-[color:var(--badge-warning-bg)] text-[color:var(--badge-warning-fg)]",
  Delivered: "bg-[color:var(--badge-positive-bg)] text-[color:var(--badge-positive-fg)]",
  Cancelled: "bg-[color:var(--badge-primary-bg)] text-[color:var(--badge-primary-fg)]",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[5.5rem] items-center justify-center rounded-full px-3 py-1 text-xs font-semibold",
        statusStyles[status] ?? "bg-[color:var(--badge-primary-bg)] text-[color:var(--badge-primary-fg)]",
      )}
    >
      {status}
    </span>
  )
}
