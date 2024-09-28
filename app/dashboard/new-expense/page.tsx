import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FormExpense from "./form";

export default async function NewExpense() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add New Item</CardTitle>
        </CardHeader>
      </Card>
      <FormExpense />
    </div>
  );
}
