"use server";

import { newCategoryFormSchema } from "../dashboard/categories/new/formNewcategory";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { categories } from "@/db/schema/categories";

const newCategorySchema = z.object({
  name: z.string().min(1).max(70),
  description: z.string().max(300),
  color: z.string().min(4).max(7).default("#000000"),
  icon: z.string(),
});

export async function getCategories() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  return await db
    .select()
    .from(categories)
    .where(and(eq(categories.userId, userId)))
    .execute();
}

export async function addCategoryAction(
  data: z.infer<typeof newCategoryFormSchema>,
  doRedirect: boolean = true,
) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  try {
    const category = newCategorySchema.parse(data);
    await db.insert(categories).values({
      ...category,
      userId,
    });
  } catch (err: unknown) {
    console.log(err);
    return err;
  }
  if (doRedirect) {
    redirect("/dashboard/categories/all");
  }
}
