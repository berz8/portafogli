import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { CirclePlus, Home, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="relative">
      <div
        className={cn(
          "fixed flex justify-around items-center bottom-0 left-0 w-full p-2 shadow-lg bg-stone-50",
          "md:w-auto md:left-1/2 md:-translate-x-1/2 md:bottom-4 md:rounded-lg md:px-4 md:py-2",
        )}
      >
        <Link href="/dashboard" className="px-4 block py-2">
          <Home className="w-6 h-6" />
        </Link>
        <Link href="/dashboard/new-expense" className="px-4 block py-2">
          <CirclePlus className="w-6 h-6" />
        </Link>
        <Link href="/dashboard/settings" className="px-4 block py-2">
          <Settings className="w-6 h-6" />
        </Link>
      </div>
      <div className="text-center mb-2">
        <h1 className="font-black py-1">PORTAFOGLI</h1>
      </div>
      <div className="md:w-2/3 mx-auto px-4">{children}</div>
    </div>
  );
}
