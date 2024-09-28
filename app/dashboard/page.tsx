import { auth } from "@/auth";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { startOfMonth, endOfMonth } from "date-fns";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";
import { getCurrentMonthExpenses } from "../actions/expenses";

export default async function Dashboard() {
  const session = await auth();
  if (!session || !session.user?.id) redirect("/");

  const currentMonthExpenses = await getCurrentMonthExpenses(
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  );

  return (
    <div>
      <div className="rounded-xl dark-metal-gradient p-4 text-right shadow-lg">
        <div className="text-[3.3rem] leading-[3rem] font-mono font-semibold text-primary-foreground">
          €{" "}
          {currentMonthExpenses
            .reduce((acc, item) => {
              if (item.type === "in") {
                return acc + Number(item.amount);
              } else {
                return acc - Number(item.amount);
              }
            }, 0)
            .toFixed(2)}
        </div>
        <div className="text-primary-foreground opacity-70">
          Current Month Balance
        </div>
      </div>
      <h3 className="my-4 font-bold text-gray-600">Recent expenses</h3>
      <div className="flex flex-col gap-1">
        {currentMonthExpenses.slice(0, 6).map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "p-1 pl-2 font-mono flex justify-between",
              i % 2 === 0 && "bg-gray-200",
            )}
          >
            <div>€ {item.amount}</div>
            <div className="flex">
              <div>{item.description}</div>
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
      <Link
        href="/dashboard/expenses/all"
        className="mt-2 flex gap-3 justify-center items-center w-full"
      >
        <span>See all</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
