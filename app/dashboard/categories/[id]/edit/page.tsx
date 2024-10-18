import { getCategory } from "@/app/actions/categories";
import { redirect } from "next/navigation";
import FormCategory from "../../new/formNewcategory";

export default async function editCategoryPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const category = await getCategory(Number(id));
  if (!category) redirect("/dashboard");

  return (
    <div>
      <h1 className="font-mono text-center font-bold">Edit Category</h1>
      <FormCategory category={category} />
    </div>
  );
}
