import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import FormExpense from "./form";

export default function NewExpense() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>New Item</CardTitle>
        </CardHeader>
      </Card>
      <FormExpense />
    </div>
  );
}
