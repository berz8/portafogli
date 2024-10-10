import { getCategories } from "@/app/actions/categories";
import BackButton from "@/components/backButton";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "next-view-transitions";

export default async function CategoriesAll() {
  const categories = await getCategories();

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
        {categories.map((cat) => (
          <div key={cat.id} className="flex flex-col gap-1 pt-1">
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
