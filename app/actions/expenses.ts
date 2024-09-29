"use server";

import { auth } from "@/auth";
import { newExpenseFormSchema } from "../dashboard/transactions/new/form";
import { db } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { redirect } from "next/navigation";
import { z } from "zod";
import { and, desc, eq, gte, lt } from "drizzle-orm";

const newExpenseSchema = z.object({
  amount: z.coerce.number().gt(0),
  type: z.enum(["in", "out"]),
  date: z.date(),
  description: z.string().min(1).max(100),
  currency: z.string(),
});

export async function getExpenses(startDate: Date, endDate: Date) {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const result = await db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, session.user.id),
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
  userId: string,
) {
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
