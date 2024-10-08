import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Jura } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";
import type { Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const jura = Jura({
  subsets: ["latin"],
  variable: "--font-jura",
});

export const metadata: Metadata = {
  title: "Portafogli",
  description: "The app to track all your expenses",
};

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ViewTransitions>
        <html lang="en">
          <body
            className={cn(
              geistSans.variable,
              geistMono.variable,
              jura.variable,
              "antialiased",
              "bg-primary-foreground",
              "min-h-full",
            )}
          >
            {children}
            <Toaster
              className="mb-12"
              toastOptions={{
                classNames: {
                  toast: "dark-metal-gradient text-white",
                },
              }}
            />
          </body>
        </html>
      </ViewTransitions>
    </ClerkProvider>
  );
}
