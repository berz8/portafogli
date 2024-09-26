import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen">
      <Wallet className="w-24 h-24 text-stone-700" />
      <h1 className="font-extrabold text-3xl text-center px-6">
        The App to track all your expenses
      </h1>
      <Button className="px-12" asChild>
        <Link href="/dashboard">Start Now</Link>
      </Button>
    </div>
  );
}
