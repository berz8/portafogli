import { auth } from "@/auth";
import { db } from "@/db";
import { expenses } from "@/db/schema/expenses";
import { and, eq, gte, lt } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session || !session.user?.id) redirect("/");
  const currentMonthExpenses = await getCurrentMonthExpenses(session.user.id);

  return (
    <div>
      <div className="text-[3.5rem] font-bold text-stone-900">
        € {currentMonthExpenses.reduce((acc, item) => acc + item.amount, 0)}
      </div>
      <div className="text-lg text-stone-600 font-bold -mt-2">
        Current Month Balance
      </div>
    </div>
  );
}

async function getCurrentMonthExpenses(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const result = await db
    .select()
    .from(expenses)
    .where(
      and(
        eq(expenses.userId, userId),
        gte(expenses.date, startOfMonth),
        lt(expenses.date, startOfNextMonth),
      ),
    )
    .execute();

  return result;
}
