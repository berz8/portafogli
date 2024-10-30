"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { CirclePlus, Home, Repeat, Settings } from "lucide-react";

export default function Navigation() {
  const currentPath = usePathname();

  return (
    <div className="fixed z-10 bottom-0 left-0 flex justify-around w-full bg-primary-foreground md:bg-transparent">
      <div
        className={cn(
          "m-3 mb-[CALC(0.3rem_+_env(safe-area-inset-bottom))] w-full",
          "flex justify-around items-center rounded-lg p-2",
          "md:w-auto md:bottom-4 md:rounded-lg md:px-4 md:py-2 md:bg-white md:shadow-xl md:gap-5",
        )}
      >
        <Link
          href="/dashboard"
          className={cn(
            "px-4 block py-1",
            currentPath === "/dashboard" ? "text-primary" : "text-zinc-400",
          )}
          prefetch={true}
        >
          <Home className="w-5 h-5" strokeWidth={2.7} />
        </Link>
        <Link
          href="/dashboard/transactions/new"
          className={cn(
            "px-4 block py-1",
            currentPath === "/dashboard/transactions/new"
              ? "text-primary"
              : "text-zinc-400",
          )}
          prefetch={true}
        >
          <CirclePlus className="w-5 h-5" strokeWidth={2.7} />
        </Link>
        <Link
          href="/dashboard/recurring"
          className={cn(
            "px-4 block py-1",
            currentPath === "/dashboard/recurring"
              ? "text-primary"
              : "text-zinc-400",
          )}
          prefetch={true}
        >
          <Repeat className="w-5 h-5" strokeWidth={2.7} />
        </Link>
        <Link
          href="/dashboard/settings"
          className={cn(
            "px-4 block py-1",
            currentPath === "/dashboard/settings"
              ? "text-primary"
              : "text-zinc-400",
          )}
          prefetch={true}
        >
          <Settings className="w-5 h-5" strokeWidth={2.7} />
        </Link>
      </div>
    </div>
  );
}
