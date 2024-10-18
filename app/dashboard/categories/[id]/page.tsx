import { redirect } from "next/navigation";
import { getCategory } from "@/app/actions/categories";
import { Link } from "next-view-transitions";
import { Pencil } from "lucide-react";
import BackButton from "@/components/backButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function categoryIdPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const category = await getCategory(Number(id));
  if (!category) redirect("/dashboard");

  return (
    <div>
      <BackButton href="/dashboard/categories/all" />
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="flex-row justify-between items-center">
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
        <CardContent>
          <div
            className="w-full h-2 rounded-md"
            style={{ background: category.color ?? "#fafafa" }}
          />
          <p className="mt-2">{category.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
