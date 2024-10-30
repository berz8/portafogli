import { getCategoriesWithExpenses } from "@/app/actions/categories";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, getFormattedNumber } from "@/lib/utils";
import { Link } from "next-view-transitions";

export default async function CategoriesAll() {
  const categories = await getCategoriesWithExpenses();

  return (
    <div>
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center">Categories</CardTitle>
        </CardHeader>
      </Card>
      <Button className="mb-2 w-full" asChild>
        <Link href="/dashboard/categories/new">Add New Category</Link>
      </Button>
      <div className="flex flex-col gap-1 mt-3">
        {categories.map((cat, i) => (
          <Link
            href={`/dashboard/categories/${cat.id}`}
            key={cat.id}
            className={cn(
              "flex flex-col gap-2 py-2 px-2 rounded-md",
              i % 2 === 0 && "bg-[#F2F2F1]",
              "transition-all duration-300 hover:scale-105",
            )}
          >
            <div className="font-mono flex gap-2 justify-start">
              {cat.icon !== "" ? <div>{cat.icon}</div> : null}
              <div>{cat.name}</div>
            </div>
            <div className="flex gap-3 items-center">
              <div
                className="grow h-1 rounded-md"
                style={{ background: cat.color || "gray" }}
              />
              <div className="font-mono text-right">
                €{" "}
                {getFormattedNumber(
                  cat.expenses.reduce(
                    (acc, x) =>
                      x.type === "out" ? acc - x.amount : acc + x.amount,
                    0,
                  ),
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
