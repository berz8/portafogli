"use server";

import { ChevronLeft } from "lucide-react";
import { Link } from "next-view-transitions";

export default async function BackButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="fixed z-20 text-primary p-3 top-2 left-2"
      prefetch={true}
    >
      <ChevronLeft className="w-6 h-6 -translate-x-2" />
    </Link>
  );
}
