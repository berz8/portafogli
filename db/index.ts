import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";
import dotenv from "dotenv";
import { users } from "./schema/users";
import { expenses, expensesRelations } from "./schema/expenses";
import { categories, categoriesRelations } from "./schema/categories";

dotenv.config({
  path: [".env.local", ".env"],
});

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});
export const db = drizzle(client, {
  schema: {
    users,
    expenses,
    expensesRelations,
    categories,
    categoriesRelations,
  },
});
