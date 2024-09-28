"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { CirclePlus, Home, Settings } from "lucide-react";

export default function Navigation() {
  const currentPath = usePathname();

  return (
    <div
      className={cn(
        "fixed flex justify-around items-center bottom-2 left-2 w-[calc(100%-16px)] rounded-lg p-2 shadow-lg bg-stone-50",
        "md:w-auto md:left-1/2 md:-translate-x-1/2 md:bottom-4 md:rounded-lg md:px-4 md:py-2",
      )}
    >
      <Link
        href="/dashboard"
        className={cn(
          "px-4 block py-1",
          currentPath === "/dashboard" ? "text-primary" : "text-zinc-400",
        )}
      >
        <Home className="w-5 h-5" strokeWidth={2.7} />
      </Link>
      <Link
        href="/dashboard/new-expense"
        className={cn(
          "px-4 block py-1",
          currentPath === "/dashboard/new-expense"
            ? "text-primary"
            : "text-zinc-400",
        )}
      >
        <CirclePlus className="w-5 h-5" strokeWidth={2.7} />
      </Link>
      <Link
        href="/dashboard/settings"
        className={cn(
          "px-4 block py-1",
          currentPath === "/dashboard/settings"
            ? "text-primary"
            : "text-zinc-400",
        )}
      >
        <Settings className="w-5 h-5" strokeWidth={2.7} />
      </Link>
    </div>
  );
}
