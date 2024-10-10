import BackButton from "@/components/backButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/db";
import { categories } from "@/db/schema/categories";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";

export default async function CategoriesAll() {
  const { userId } = auth();
  if (!userId) redirect("/");

  const userCategories = await db
    .select()
    .from(categories)
    .where(eq(categories.userId, userId));

  return (
    <div>
      <BackButton href="/dashboard" />
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center">Categories</CardTitle>
        </CardHeader>
      </Card>
      <Button className="mb-2 w-full" asChild>
        <Link href="/dashboard/categories/new">Add New Category</Link>
      </Button>
      <div className="flex flex-col gap-1 mt-3">
        {userCategories.map((cat) => (
          <div className="flex flex-col gap-1 pt-1">
            <div className="font-mono">{cat.name}</div>
            <div
              className="h-2 w-full rounded-md"
              style={{ background: cat.color ?? "#fafafa" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
