import { getExpenses } from "@/app/actions/expenses";
import BackButton from "@/components/backButton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getFormattedNumber } from "@/lib/utils";
import { endOfMonth, format, startOfMonth } from "date-fns";
import { AllTransactionsFilters } from "./filters";
import TotalCard from "./totalCard";
import { getCategories } from "@/app/actions/categories";
import { Link } from "next-view-transitions";

export default async function NewTransactionPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const currentDate = new Date();
  const year = parseInt(
    searchParams?.["year"]?.toString() ?? currentDate.getFullYear().toString(),
  );
  const month = parseInt(
    searchParams?.["month"]?.toString() ??
      (currentDate.getMonth() + 1).toString(),
  );

  const startDate = new Date(year, month - 1, 1); // month is 0-indexed in Date constructor
  const endDate = new Date(year, month, 0); // Last day of the month

  const expenses = await getExpenses(
    startOfMonth(new Date(startDate.toUTCString())),
    endOfMonth(new Date(endDate.toUTCString())),
    searchParams?.["sort"]?.toString().split("-") ?? ["date", "desc"],
  );

  const categories = await getCategories();

  return (
    <div>
      <BackButton href="/dashboard" />
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center">Transactions List</CardTitle>
        </CardHeader>
      </Card>
      <TotalCard
        total={getFormattedNumber(
          expenses.reduce((acc, item) => {
            if (item.type === "in") {
              return acc + Number(item.amount);
            } else {
              return acc - Number(item.amount);
            }
          }, 0),
        )}
      />
      <AllTransactionsFilters />
      <div className="flex flex-col flex-1 gap-1">
        {expenses.map((item, i) => (
          <Link
            href={`/dashboard/transactions/${item.id}`}
            key={item.id}
            className={cn(
              "p-1 pl-2 flex justify-between rounded-md",
              i % 2 !== 0 && "bg-[#F2F2F1]",
              "transition-all duration-300 hover:scale-105",
            )}
          >
            <div className="flex flex-col gap-1">
              <div className="font-mono ">{item.description}</div>
              <div className="text-sm opacity-55">
                {format(item.date, "dd MMM yyyy")} -{" "}
                {categories.find((cat) => cat.id === item.categoryId)?.name ||
                  "Uncategorized"}
              </div>
            </div>
            <div className="flex font-mono">
              <span> € {getFormattedNumber(item.amount)}</span>
              <div
                className={cn(
                  "h-full w-1 rounded-md ml-2",
                  item.type === "in" ? "bg-green-600" : "bg-red-600",
                )}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
