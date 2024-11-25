import Navigation from "@/components/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[rgba(39,39,42,1)]">
      <SidebarProvider>
        <Navigation />
        <main className="bg-primary-foreground md:m-2 md:rounded-lg w-full">
          <div className="md:w-5/6 lg:w-4/5 mx-auto mt-4 mb-[CALC(60px_+_env(safe-area-inset-bottom))] px-4">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
