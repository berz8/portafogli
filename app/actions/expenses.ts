"use server";

import { auth } from "@/auth";
import { newExpenseFormSchema } from "../dashboard/new-expense/form";
import { db } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { redirect } from "next/navigation";
import { z } from "zod";
import { and, desc, eq, gte, lt } from "drizzle-orm";

export async function getCurrentMonthExpenses(startDate: Date, endDate: Date) {
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
) {
  try {
    const session = await auth();
    if (!session) redirect("/");
    await db.insert(expenses).values({
      ...data,
      userId: session?.user?.id,
    });
  } catch (err: unknown) {
    console.log(err);
    return err;
  }
  redirect("/dashboard");
}
