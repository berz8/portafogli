import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "next-view-transitions";

export default async function Recurring() {
  return (
    <div>
      <Card className="bg-transparent border-none shadow-none">
        <CardHeader>
          <CardTitle className="text-center">Recurring Transactions</CardTitle>
          <CardDescription className="text-center">
            Manage all your subscriptions and recurring expenses
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="w-full">
        <Button className="mb-2 w-full md:w-1/2 md:mx-auto block">
          <Link href="/dashboard/recurring/new">Add New</Link>
        </Button>
      </div>
    </div>
  );
}
