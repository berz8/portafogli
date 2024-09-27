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
      <div className="text-center mb-2">
        <h1 className="font-black py-1">PORTAFOGLI</h1>
      </div>
      <div className="md:w-2/3 mx-auto px-4">{children}</div>
    </div>
  );
}
