import { getExpense } from "@/app/actions/expenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getFormattedNumber } from "@/lib/utils";
import { format } from "date-fns";
import { Pencil } from "lucide-react";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";

export default async function TransctionDetailPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const expense = await getExpense(Number(id));
  if (!expense) redirect("/dashboard/expenses/all");

  return (
    <div>
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="px-0 flex-row justify-between items-center">
          <div className="flex flex-col gap-1">
            <CardTitle>{expense.description}</CardTitle>
            {expense.category ? (
              <Link
                href={`dashboard/categories/${expense.category?.id}`}
                className="flex gap-2 items-center"
              >
                {expense.category.icon !== "" ? (
                  <div>{expense.category.icon}</div>
                ) : null}
                <div>{expense.category.name}</div>
              </Link>
            ) : (
              <Link
                href={`dashboard/categories/uncategorized`}
                className="flex gap-2 items-center"
              >
                <div>Uncategorized</div>
              </Link>
            )}
          </div>
          <Link
            href={`/dashboard/transactions/${expense.id}/edit`}
            className="p-1"
          >
            <Pencil className="w-5 h-5" />
          </Link>
        </CardHeader>
        <CardContent className="px-0">
          <div
            className={cn(
              "h-2 w-full rounded-md",
              expense.type === "in" ? "bg-green-600" : "bg-red-600",
            )}
          />
          <div className="flex justify-between mt-3 text-lg">
            <div>{format(expense.date, "dd MMMM yyyy")}</div>
            <div className="font-mono text-xl font-bold">
              <span> € {getFormattedNumber(expense.amount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
