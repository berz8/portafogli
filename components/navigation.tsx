"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CirclePlus, Home, Repeat, Settings, TrendingUp } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Navigation() {
  const currentPath = usePathname();
  const isMobile = useIsMobile();

  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Insights",
      url: "/dashboard/insights",
      icon: TrendingUp,
    },
    {
      title: "New Transaction",
      url: "/dashboard/transactions/new",
      icon: CirclePlus,
    },
    {
      title: "Recurring",
      url: "/dashboard/recurring",
      icon: Repeat,
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ];

  if (!isMobile)
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="font-jura font-bold text-4xl -ml-1 mb-6 mt-4 text-background">
              $
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={currentPath === item.url}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );

  return (
    <div className="fixed z-10 bottom-0 left-0 flex justify-around w-full bg-primary-foreground md:bg-transparent">
      <div
        className={cn(
          "m-3 mb-[CALC(0.3rem_+_env(safe-area-inset-bottom))] w-full",
          "flex justify-around items-center rounded-lg p-2",
          "md:w-auto md:bottom-4 md:rounded-lg md:px-4 md:py-2 md:bg-white md:shadow-xl md:gap-5",
        )}
      >
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.url}
            className={cn(
              "px-4 block py-1",
              currentPath === item.url ? "text-primary" : "text-zinc-400",
            )}
            prefetch={true}
          >
            <item.icon className="w-5 h-5" strokeWidth={2.7} />
          </Link>
        ))}
      </div>
    </div>
  );
}
