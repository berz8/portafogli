import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "next-view-transitions";

export default async function CategoriesAll() {
  return (
    <div>
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center">Recurring Transactions</CardTitle>
          <CardDescription>
            Manage all your subscriptions and recurring expenses
          </CardDescription>
        </CardHeader>
      </Card>
      <Button className="mb-2 w-full" asChild>
        <Link href="/dashboard/recurring/new">Add New</Link>
      </Button>
    </div>
  );
}
