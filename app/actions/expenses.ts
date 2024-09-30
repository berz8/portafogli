"use server";

import { newExpenseFormSchema } from "../dashboard/transactions/new/form";
import { db } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { redirect } from "next/navigation";
import { z } from "zod";
import { and, desc, eq, gte, lt } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

const newExpenseSchema = z.object({
  amount: z.coerce.number().gt(0),
  type: z.enum(["in", "out"]),
  date: z.date(),
  description: z.string().min(1).max(100),
  currency: z.string(),
});

export async function getExpenses(startDate: Date, endDate: Date) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  const result = await db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        gte(expenses.date, startDate),
        lt(expenses.date, endDate),
      ),
    )
    .orderBy(desc(expenses.date))
    .execute();

  return result;
}

export async function addExpenseAction(
  data: z.infer<typeof newExpenseFormSchema>,
) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  try {
    const expense = newExpenseSchema.parse(data);
    await db.insert(expenses).values({
      ...expense,
      userId,
    });
  } catch (err: unknown) {
    console.log(err);
    return err;
  }
  redirect("/dashboard");
}
