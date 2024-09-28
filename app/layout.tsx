import type { Metadata } from "next";
import localFont from "next/font/local";
import { Jura } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ViewTransitions } from "next-view-transitions";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body
          className={cn(
            geistSans.variable,
            geistMono.variable,
            jura.variable,
            "antialiased",
            "bg-gradient-to-br from-stone-50 via-stone-300 to-stone-200",
            "min-h-screen",
          )}
        >
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
