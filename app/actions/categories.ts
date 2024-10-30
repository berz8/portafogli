"use server";

import { newCategoryFormSchema } from "../dashboard/categories/new/formNewcategory";
import { db } from "@/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { categories } from "@/db/schema/categories";
import { Category } from "@/db/schema/categories";

const newCategorySchema = z.object({
  name: z.string().min(1).max(70),
  description: z.string().max(300),
  color: z.string().min(4).max(7).default("#000000"),
  icon: z.string(),
});

export async function getCategory(id: number) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  return await db.query.categories.findFirst({
    where: and(eq(categories.userId, userId), eq(categories.id, id)),
  });
}

export async function getCategories() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  return await db
    .select()
    .from(categories)
    .where(and(eq(categories.userId, userId)))
    .execute();
}

export async function getCategoriesWithExpenses(
  startDate?: Date,
  endDate?: Date,
) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  return await db.query.categories
    .findMany({
      with: {
        expenses: {
          where: (expenses, { and, gte, lte }) => {
            const conditions = [];

            if (startDate) {
              conditions.push(gte(expenses.date, startDate));
            }
            if (endDate) {
              conditions.push(lte(expenses.date, endDate));
            }

            return conditions.length > 0 ? and(...conditions) : undefined;
          },
        },
      },
      where: eq(categories.userId, userId),
    })
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

export async function updateCategoryAction(
  data: Category,
  doRedirect: boolean = true,
) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  try {
    // Validate input data using Zod
    const categorySchema = z.object({
      id: z.number(),
      name: z.string().min(1).max(70),
      description: z.string().max(300),
      color: z.string().min(4).max(7),
      icon: z.string(),
      userId: z.string(),
    });
    const validatedCategory = categorySchema.parse(data);

    // Check if the category exists and belongs to the user
    const existingCategory = await db.query.categories.findFirst({
      where: and(
        eq(categories.id, validatedCategory.id),
        eq(categories.userId, userId),
      ),
    });

    if (!existingCategory) {
      throw new Error("Category not found or doesn't belong to the user");
    }

    // Update the category
    await db
      .update(categories)
      .set({
        name: validatedCategory.name,
        description: validatedCategory.description,
        color: validatedCategory.color,
        icon: validatedCategory.icon,
      })
      .where(eq(categories.id, validatedCategory.id));
  } catch (err: unknown) {
    console.error(err);
    return err;
  }

  if (doRedirect) {
    redirect(`/dashboard/categories/${data.id}`);
  }
}
