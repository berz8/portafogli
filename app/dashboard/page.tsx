import { cn, getFormattedNumber } from "@/lib/utils";
import { startOfMonth, endOfMonth } from "date-fns";
import { Link } from "next-view-transitions";
import { ArrowRight, Plus } from "lucide-react";
import { getExpenses } from "../actions/expenses";
import { Button } from "@/components/ui/button";
import { getCategories } from "../actions/categories";

export default async function Dashboard() {
  const startDate = new Date();
  const endDate = new Date();

  const currentMonthExpenses = await getExpenses(
    startOfMonth(new Date(startDate.toUTCString())),
    endOfMonth(new Date(endDate.toUTCString())),
    ["date", "desc"],
  );

  const userCategories = await getCategories();

  const calculateCategoryExpenses = (
    expenses: typeof currentMonthExpenses,
    categories: typeof userCategories,
  ) => {
    const categoryExpenses = new Map();
    categories.forEach((category) => categoryExpenses.set(category.id, 0));
    categoryExpenses.set("uncategorized", 0);

    expenses.forEach((expense) => {
      if (expense.categoryId) {
        categoryExpenses.set(
          expense.categoryId,
          expense.type === "in"
            ? categoryExpenses.get(expense.categoryId) + Number(expense.amount)
            : categoryExpenses.get(expense.categoryId) - Number(expense.amount),
        );
      } else {
        categoryExpenses.set(
          "uncategorized",
          expense.type === "in"
            ? categoryExpenses.get("uncategorized") + Number(expense.amount)
            : categoryExpenses.get("uncategorized") - Number(expense.amount),
        );
      }
    });

    return categoryExpenses;
  };

  const categoryExpenses = calculateCategoryExpenses(
    currentMonthExpenses,
    userCategories,
  );

  const categoriesWithExpenses = [
    ...userCategories.map((category) => ({
      ...category,
      amount: categoryExpenses.get(category.id),
    })),
    {
      id: "uncategorized",
      name: "Uncategorized",
      color: "grey",
      amount: categoryExpenses.get("uncategorized"),
      icon: "",
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="rounded-xl dark-metal-gradient p-4 text-right shadow-xl md:basis-1/2 md:items-center">
          <div className="light-metal-text text-[3.3rem] leading-[3rem] font-mono font-semibold text-primary-foreground">
            €{" "}
            {getFormattedNumber(
              categoriesWithExpenses.reduce(
                (acc, item) => acc + item.amount,
                0,
              ),
            )}
          </div>
          <div className="text-primary-foreground opacity-70">
            Current Month Balance
          </div>
        </div>
        <div className="md:basis-1/2 w-full">
          <h3 className="my-4 font-bold text-gray-600">Recent transactions</h3>
          <div className="flex flex-col gap-1">
            {currentMonthExpenses.slice(0, 6).map((item, i) => (
              <Link
                href={`/dashboard/transactions/${item.id}`}
                key={item.id}
                className={cn(
                  "p-1 pl-2 font-mono flex justify-between rounded-md",
                  i % 2 === 0 && "bg-[#F2F2F1]",
                  "transition-all duration-300 hover:scale-105",
                )}
              >
                <div className="flex">
                  <div>{item.description}</div>
                </div>
                <div className="flex">
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
          {currentMonthExpenses.length > 0 ? (
            <Link
              href="/dashboard/transactions/all"
              prefetch={true}
              className="mt-2 flex gap-3 justify-center items-center w-full"
            >
              <span>See All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Button variant="outline" asChild className="w-full">
              <Link
                href="/dashboard/transactions/new"
                className="flex gap-3 justify-center items-center w-full"
              >
                <span>Add your first transaction</span>
                <Plus className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      <div>
        <h3 className="my-4 font-bold text-gray-600">Categories</h3>
        <div className="flex flex-col">
          {categoriesWithExpenses.map((cat, i) => (
            <Link
              href={`/dashboard/categories/${cat.id}`}
              key={cat.id}
              className={cn(
                "flex gap-3 py-1 px-2 rounded-md items-center",
                i % 2 === 0 && "bg-[#F2F2F1]",
                "transition-all duration-300 hover:scale-105",
              )}
            >
              <div className="font-mono flex gap-2">
                {cat.icon !== "" ? <div>{cat.icon}</div> : null}
                <div>{cat.name}</div>
              </div>
              <div
                className="grow h-1 rounded-md"
                style={{ background: cat.color || "gray" }}
              />
              <div className="font-mono text-right">
                € {getFormattedNumber(cat.amount)}
              </div>
            </Link>
          ))}
        </div>
        <Link
          href="/dashboard/categories/all"
          prefetch={true}
          className="mt-2 flex gap-3 justify-center items-center w-full"
        >
          <span>All Categories</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
