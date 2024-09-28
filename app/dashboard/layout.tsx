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
      <div className="relative mx-2 py-2 flex justify-around h-14">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+7px)] text-[36px] text-shadow-sm leading-none font-jura font-bold">
          $
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+7px)] text-[36px] dark-metal-text leading-none font-jura font-bold">
          $
        </div>
      </div>
      <div className="md:w-2/3 mx-auto px-4">{children}</div>
    </div>
  );
}
