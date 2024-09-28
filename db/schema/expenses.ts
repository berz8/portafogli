import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { users } from "./users";
import { categories } from "./categories";

// Expenses table
export const expenses = sqliteTable("expenses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  amount: real("amount").notNull(),
  currency: text("currency").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  userId: text("user_id").references(() => users.id), // Assuming you have a users table
  paymentMethod: text("payment_method"),
  location: text("location"),
  notes: text("notes"),
  type: text("type").notNull().default("out"),
  isRecurring: integer("is_recurring", { mode: "boolean" })
    .notNull()
    .default(false),
  recurrenceFrequency: text("recurrence_frequency"), // New field for recurrence frequency
  recurrenceInterval: integer("recurrence_interval"), // New field for recurrence interval
  nextRecurrenceDate: integer("next_recurrence_date", { mode: "timestamp" }), // New field for next recurrence
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const expensesRelations = relations(expenses, ({ one }) => ({
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id],
  }),
}));
