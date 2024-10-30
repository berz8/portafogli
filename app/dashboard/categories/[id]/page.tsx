import { redirect } from "next/navigation";
import { getCategory } from "@/app/actions/categories";
import { Link } from "next-view-transitions";
import { Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getExpensesByCategory } from "@/app/actions/expenses";
import { cn, getFormattedNumber } from "@/lib/utils";
import TotalCard from "../../transactions/all/totalCard";
import { AllTransactionsFilters } from "../../transactions/all/filters";

export default async function categoryIdPage({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const category = await getCategory(Number(id));
  if (!category) redirect("/dashboard");

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
  const expenses = await getExpensesByCategory(
    Number(id),
    startDate,
    endDate,
    searchParams?.["sort"]?.toString().split("-") ?? ["date", "desc"],
  );

  return (
    <div>
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="px-0 flex-row justify-between items-center">
          <div className="flex gap-2 items-center">
            {category.icon !== "" ? (
              <span className="text-2xl">{category.icon}</span>
            ) : null}
            <CardTitle className="">{category.name}</CardTitle>
          </div>
          <Link
            href={`/dashboard/categories/${category.id}/edit`}
            className="p-1"
          >
            <Pencil className="w-5 h-5" />
          </Link>
        </CardHeader>
        <CardContent className="px-0">
          <div
            className="w-full h-2 rounded-md"
            style={{ background: category.color ?? "#fafafa" }}
          />
          <p className="mt-2">{category.description}</p>
        </CardContent>
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
          <div
            key={item.id}
            className={cn(
              "p-1 pl-2 flex justify-between rounded-md",
              i % 2 !== 0 && "bg-[#F2F2F1]",
            )}
          >
            <div className="flex flex-col gap-1">
              <div className="font-mono ">{item.description}</div>
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
          </div>
        ))}
      </div>
    </div>
  );
}
