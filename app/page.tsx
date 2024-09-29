import { Button } from "@/components/ui/button";
import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-60">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={cn(
          "[mask-image:radial-gradient(450px_circle_at_center,#e2ece9,transparent)]",
          "md:[mask-image:radial-gradient(700px_circle_at_center,#e2ece9,transparent)]",
          "z-[-1]",
        )}
      />
      <div className="flex flex-col gap-4 mb-8">
        <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-[40px] shadow-xl flex items-center justify-around dark-metal-gradient">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+7px)] md:-translate-y-[calc(50%+10px)] text-[156px] md:text-[180px] text-shadow leading-none font-jura font-bold">
            $
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+7px)]  md:-translate-y-[calc(50%+10px)] text-[156px] md:text-[180px] light-metal-text leading-none font-jura font-bold">
            $
          </div>
        </div>
      </div>
      <h1 className="font-bold text-3xl uppercase text-center text-primary px-6">
        The easiest way to track your money
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
