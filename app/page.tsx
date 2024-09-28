import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-screen">
      <div className="w-44 md:w-60">
        <img src="/icon.svg" alt="Portafogli - Icon" />
      </div>
      <h1 className="font-mono font-bold text-3xl uppercase text-center px-6">
        The App to track all your expenses
      </h1>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <Button type="submit" className="font-mono px-12 font-semibold text-md">
          SignIn with Google
        </Button>
      </form>
    </div>
  );
}
