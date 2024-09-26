import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen">
      <Wallet className="w-24 h-24 text-stone-700" />
      <h1 className="font-extrabold text-3xl text-center px-6">
        The App to track all your expenses
      </h1>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit" className="px-12">
          SignIn with Google
        </Button>
      </form>
    </div>
  );
}
