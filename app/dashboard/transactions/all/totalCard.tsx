"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

export default function TotalCard({ total }: { total: string }) {
  const [openFilter, setOpenFilter] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const year = searchParams.get("year") || new Date().getFullYear().toString();
  const month = searchParams.get("month") || format(new Date(), "MM");

  const updateSearchParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative w-full transition-all duration-300">
      <div className="relative z-20 rounded-xl dark-metal-gradient px-4 py-3 text-right shadow-lg flex justify-between items-center">
        <div className="text-primary-foreground text-lg opacity-70 flex gap-1 items-center">
          <span>{format(new Date(`${year}-${month}-01`), "MMM yy")}</span>
          <motion.div
            animate={{ rotate: openFilter ? 180 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="p-1"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>
        <div className="light-metal-text text-2xl font-mono font-semibold text-primary-foreground">
          € {total}
        </div>
      </div>
      <AnimatePresence>
        {openFilter ? (
          <motion.div
            key="filters"
            initial={{ marginTop: -55 }}
            animate={{ marginTop: openFilter ? -20 : -55 }}
            exit={{ marginTop: -55 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="rounded-xl relative z-10 bg-white shaod-lg -mt-4 pt-5 pb-1 flex gap-1 overflow-hidden"
          >
            <Select
              value={year}
              name="year"
              onValueChange={(value) => updateSearchParams("year", value)}
            >
              <SelectTrigger className="w-[70px] border-none shadow-none flex-row-reverse justify-end focus:ring-0">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={month}
              name="month"
              onValueChange={(value) => updateSearchParams("month", value)}
            >
              <SelectTrigger className="w-[150px] border-none shadow-none flex-row-reverse justify-end focus:ring-0">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
