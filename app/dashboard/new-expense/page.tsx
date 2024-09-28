import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FormExpense, { newExpenseFormSchema } from "./form";
import { z } from "zod";
import { db } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function NewExpense() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
        </CardHeader>
      </Card>
      <FormExpense addExpenseAction={addExpense} />
    </div>
  );
}

const addExpense = async (data: z.infer<typeof newExpenseFormSchema>) => {
  "use server";
  try {
    const session = await auth();
    await db.insert(expenses).values({
      ...data,
      userId: session?.user?.id,
    });
  } catch (err: unknown) {
    console.log(err);
    return;
  }
  redirect("/dashboard");
};
