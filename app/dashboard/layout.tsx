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
      <div className="mb-2 py-2 flex justify-around">
        <img
          className="w-8"
          src="/icon-dollar-dark.svg"
          alt="Portafogli - Logo"
        />
      </div>
      <div className="md:w-2/3 mx-auto px-4">{children}</div>
    </div>
  );
}
