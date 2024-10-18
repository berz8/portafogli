"use server";

import { newExpenseFormSchema } from "../dashboard/transactions/new/form";
import { db } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { redirect } from "next/navigation";
import { z } from "zod";
import { and, desc, eq, gte, lt, asc } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

const newExpenseSchema = z.object({
  amount: z.coerce.number().gt(0),
  type: z.enum(["in", "out"]),
  date: z.date(),
  description: z.string().min(1).max(100),
  currency: z.string(),
  categoryId: z.number().nullable(),
});

export async function getExpenses(
  startDate: Date,
  endDate: Date,
  sort: unknown,
) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  const sortSchema = z.tuple([
    z.enum(["date", "amount"]).default("date"),
    z.enum(["asc", "desc"]).default("desc"),
  ]);

  const [sortBy, sortDirection] = sortSchema.parse(sort);

  // Convert startDate and endDate to GMT
  const startDateGMT = new Date(
    Date.UTC(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate(),
    ),
  );
  const endDateGMT = new Date(
    Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
  );
  console.log(startDateGMT, startDate);

  const result = await db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        gte(expenses.date, startDate),
        lt(expenses.date, endDateGMT),
      ),
    )
    .orderBy(
      sortDirection === "asc" ? asc(expenses[sortBy]) : desc(expenses[sortBy]),
    )
    .execute();

  return result;
}

export async function getExpensesByCategory(
  categoryId: number,
  startDate: Date,
  endDate: Date,
  sort: unknown,
) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  const sortSchema = z.tuple([
    z.enum(["date", "amount"]).default("date"),
    z.enum(["asc", "desc"]).default("desc"),
  ]);

  const [sortBy, sortDirection] = sortSchema.parse(sort);

  const result = await db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        eq(expenses.categoryId, categoryId),
        gte(expenses.date, startDate),
        lt(expenses.date, endDate),
      ),
    )
    .orderBy(
      sortDirection === "asc" ? asc(expenses[sortBy]) : desc(expenses[sortBy]),
    )
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
