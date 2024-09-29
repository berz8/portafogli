import { auth } from "@/auth";
import Navigation from "@/components/navigation";
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
      <Navigation />
      <div className="fixed z-10 bg-primary-foreground top-0 left-0 w-full py-2 flex justify-around h-14">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[36px] text-shadow-sm leading-none font-jura font-bold">
          $
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[36px] dark-metal-text leading-none font-jura font-bold">
          $
        </div>
      </div>
      <div className="md:w-2/3 mx-auto mt-[58px] mb-[61px] px-4">
        {children}
      </div>
    </div>
  );
}
