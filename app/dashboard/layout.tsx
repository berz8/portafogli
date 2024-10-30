import Navigation from "@/components/navigation";

export default async function DashboadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Navigation />
      <div className="md:w-5/6 lg:w-3/5 mx-auto mt-4 mb-[CALC(60px_+_env(safe-area-inset-bottom))] px-4">
        {children}
      </div>
    </div>
  );
}
