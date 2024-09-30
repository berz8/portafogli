import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FormExpense from "./form";
import BackButton from "@/components/backButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function NewExpense() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  return (
    <div>
      <BackButton href="/dashboard" />
      <div className="pt-4 px-4 -mx-4 drop-shadow-[0_-8px_3px_rgba(150,150,150,0.05)]">
        <div className="relative">
          <svg
            className="w-full h-4 text-[#F6F6F6]"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
          >
            <path
              d="M100 0C96.6667 6.66667 93.3333 6.66667 90 -8.74228e-07C86.6667 6.66667 83.3333 6.66667 80 -1.74846e-06C76.6667 6.66666 73.3333 6.66666 70 -2.62268e-06C66.6667 6.66666 63.3333 6.66666 60 -3.49691e-06C56.6667 6.66666 53.3333 6.66666 50 -4.37114e-06C46.6667 6.66666 43.3333 6.66666 40 -5.24537e-06C36.6667 6.66666 33.3333 6.66666 30 -6.11959e-06C26.6667 6.66666 23.3333 6.66666 20 -6.99382e-06C16.6667 6.66666 13.3333 6.66666 10 -7.86805e-06C6.66667 6.66666 3.33333 6.66666 8.74228e-07 -8.74228e-06L0 9.99999L100 10L100 0Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <Card className="border-none rounded-none shadow-none bg-gradient-to-b from-[#F6F6F6] to-primary-foreground">
          <CardHeader>
            <CardTitle className="text-center">Add New Item</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <FormExpense userId={session.user.id} />
    </div>
  );
}
