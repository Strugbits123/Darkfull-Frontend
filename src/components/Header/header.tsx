import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";

export function Header() {
  return (
    <header className="flex items-center justify-between  bg-card px-8 py-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl text-primary-foreground">
          <Image src="/images/logo.svg" alt="Darkful" width={50} height={50} />
        </span>
        <div>
          <p className="text-lg font-semibold text-foreground">Darkful</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
        </button>
        <ModeToggle />
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">
              Ahmed Al-Rashid
            </p>
            <p className="text-xs text-muted-foreground">Director</p>
          </div>
          <Avatar className="h-11 w-11 ring-2 ring-border">
            <AvatarImage src="/team-avatar.png" alt="Ahmed Al-Rashid" />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
