"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { addExpenseAction } from "@/app/actions/expenses";
import { toast } from "sonner";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export const newExpenseFormSchema = z.object({
  amount: z.string(),
  type: z.enum(["in", "out"]),
  date: z.date(),
  description: z.string().min(1).max(100),
  currency: z.string(),
  categoryId: z.number().nullable(),
});

export default function FormExpense({
  categories,
}: {
  categories: Array<{
    id: number;
    name: string;
    color: string | null;
    icon: string | null;
  }>;
}) {
  const form = useForm<z.infer<typeof newExpenseFormSchema>>({
    resolver: zodResolver(newExpenseFormSchema),
    defaultValues: {
      type: "out",
      amount: "",
      date: new Date(),
      description: "",
      currency: "euro",
      categoryId: null,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          toast.promise(
            addExpenseAction({
              ...data,
              date: new Date(data.date.setHours(12, 0, 0, 0)),
            }),
            {
              success: "Item Added",
              error: "Something went wrong",
            },
          ),
        )}
        className="space-y-6 mt-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <div
                className={cn(
                  "w-full p-1 rounded-sm opacity-90",
                  field.value === "out" ? "bg-red-600" : "bg-green-600",
                )}
              />
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex bg-stone-200 shadow-[inset_0_0_4px_2px_rgba(0,0,0,0.1)] p-[0.35rem] rounded-xl w-full"
                >
                  <FormItem className="flex items-center grow space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="out"
                        id="r1"
                        className="peer sr-only"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="r1"
                      className="w-full mt-0 text-center px-3 py-2 rounded-lg text-sm font-medium transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer"
                    >
                      Expense
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center grow space-y-0">
                    <FormControl>
                      <RadioGroupItem
                        value="in"
                        id="r2"
                        className="peer sr-only"
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="r2"
                      className="w-full m-0 text-center px-3 py-2 rounded-lg text-sm font-medium transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer"
                    >
                      Income
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <div className="flex gap-3 items-center">
                <div className="text-4xl font-mono">€</div>
                <FormControl>
                  <Input
                    autoFocus
                    className="text-right text-3xl h-11"
                    {...field}
                    onChange={(event) => {
                      if (
                        Number(event.target.value.replace(",", ".")) ||
                        event.target.value === ""
                      )
                        field.onChange(event.target.value.replace(",", "."));
                    }}
                    inputMode="decimal"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal bg-[#F6F6F6]",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date("1900-01-01")}
                    initialFocus
                    className="font-mono"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="bg-[#F6F6F6]">
                    <SelectValue className="font-mono" placeholder="-" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      <div className="flex gap-2 justify-start">
                        {category.icon !== "" ? (
                          <div>{category.icon}</div>
                        ) : null}
                        <div>{category.name}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className={cn(
            "fixed bottom-[CALC(2.9rem_+_env(safe-area-inset-bottom))] px-4 left-0 w-full",
            "md:bottom-[CALC(3.3rem_+_env(safe-area-inset-bottom))] md:w-2/3 md:left-1/2 md:-translate-x-1/2",
            "lg:w-1/2",
          )}
        >
          <div className="drop-shadow-[0_-8px_3px_rgba(150,150,150,0.05)] px-4 -mx-4">
            <div className="relative">
              <svg
                className="w-full h-4 text-[#F6F6F6]"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M100 0C96.6667 6.66667 93.3333 6.66667 90 -8.74228e-07C86.6667 6.66667 83.3333 6.66667 80 -1.74846e-06C76.6667 6.66666 73.3333 6.66666 70 -2.62268e-06C66.6667 6.66666 63.3333 6.66666 60 -3.49691e-06C56.6667 6.66666 53.3333 6.66666 50 -4.37114e-06C46.6667 6.66666 43.3333 6.66666 40 -5.24537e-06C36.6667 6.66666 33.3333 6.66666 30 -6.11959e-06C26.6667 6.66666 23.3333 6.66666 20 -6.99382e-06C16.6667 6.66666 13.3333 6.66666 10 -7.86805e-06C6.66667 6.66666 3.33333 6.66666 8.74228e-07 -8.74228e-06L0 9.99999L100 10L100 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="w-full bg-gradient-to-b from-[#F6F6F6] to-primary-foreground px-3 pt-4 pb-4">
              <Button className="w-full" type="submit">
                Add
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
