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

export default function TotalCard({ total }: { total: string }) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="relative w-full transition-all duration-300">
      <div className="relative z-20 rounded-xl dark-metal-gradient px-4 py-3 text-right shadow-lg flex justify-between items-center">
        <div className="text-primary-foreground text-lg opacity-70 flex gap-1 items-center">
          <span>{format(new Date(), "MMM yy")}</span>
          <div className="p-1" onClick={() => setOpenFilter(!openFilter)}>
            <ChevronDown className="w-4 h-4" />
          </div>
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
            <Select value="2024">
              <SelectTrigger className="w-[70px] border-none shadow-none flex-row-reverse justify-end">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>
            <Select value="01">
              <SelectTrigger className="w-[150px] border-none shadow-none flex-row-reverse justify-end">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">January</SelectItem>
                <SelectItem value="02">February</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
