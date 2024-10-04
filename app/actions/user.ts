"use server";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const newUserSchema = z.object({
  id: z.string(),
  firstName: z.string().nullable().default(""),
  lastName: z.string().nullable().default(""),
  email: z.string().email().nullable().default(""),
  imageUrl: z.string().nullable(),
});

export async function getUser() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
}

export async function addUser(data: z.infer<typeof newUserSchema>) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) throw new Error("Couldn't retrieve userId");

  try {
    const user = newUserSchema.parse(data);
    await db.insert(users).values({
      ...user,
      id: userId,
    });
  } catch (err: unknown) {
    console.log(err);
    return err;
  }
}
