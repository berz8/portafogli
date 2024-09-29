import { getExpenses } from "@/app/actions/expenses";
import BackButton from "@/components/backButton";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getFormattedNumber } from "@/lib/utils";
import { endOfMonth, format, startOfMonth } from "date-fns";

export default async function NewTransactionPage() {
  const expenses = await getExpenses(
    startOfMonth(new Date()),
    endOfMonth(new Date()),
  );

  return (
    <div>
      <BackButton href="/dashboard" />
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center">Transactions List</CardTitle>
        </CardHeader>
      </Card>
      <div className="rounded-xl mb-4 dark-metal-gradient px-4 py-3 text-right shadow-lg flex justify-between items-center">
        <div className="text-primary-foreground text-lg opacity-70">
          {format(new Date(), "MMM yy")}
        </div>
        <div className="light-metal-text text-2xl font-mono font-semibold text-primary-foreground">
          €{" "}
          {getFormattedNumber(
            expenses.reduce((acc, item) => {
              if (item.type === "in") {
                return acc + Number(item.amount);
              } else {
                return acc - Number(item.amount);
              }
            }, 0),
          )}
        </div>
      </div>
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
              <div className="text-sm opacity-55">
                {format(item.date, "dd MMM yyyy")}
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
          </div>
        ))}
      </div>
    </div>
  );
}
