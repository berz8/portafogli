"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTriggerClean,
} from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

export function AllTransactionsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-end mb-2 w-full">
      <Select
        value={searchParams.get("sort") || "date-desc"}
        onValueChange={handleSortChange}
      >
        <SelectTriggerClean className="w-auto border-none shadow-none">
          <ArrowUpDown className="w-5 h-5" />
        </SelectTriggerClean>
        <SelectContent>
          <SelectItem value="date-desc">Date (Newest First)</SelectItem>
          <SelectItem value="date-asc">Date (Oldest First)</SelectItem>
          <SelectItem value="amount-desc">Amount (High to Low)</SelectItem>
          <SelectItem value="amount-asc">Amount (Low to High)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
