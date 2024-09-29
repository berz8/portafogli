import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function TransactionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <div>{children}</div>;
}
