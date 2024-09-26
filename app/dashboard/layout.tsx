import { CirclePlus, Home, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <div className="fixed flex justify-around items-center bottom-0 left-0 w-full p-2 shadow-lg bg-stone-50">
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
      {children}
    </div>
  );
}
