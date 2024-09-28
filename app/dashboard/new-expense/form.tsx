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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const newExpenseFormSchema = z.object({
  amount: z.number().gt(0),
  type: z.enum(["in", "out"]),
  date: z.date(),
  description: z.string().min(1).max(100),
  currency: z.string(),
});

export default function FormExpense({
  addExpenseAction,
}: {
  addExpenseAction: (data: z.infer<typeof newExpenseFormSchema>) => void;
}) {
  const form = useForm<z.infer<typeof newExpenseFormSchema>>({
    resolver: zodResolver(newExpenseFormSchema),
    defaultValues: {
      type: "out",
      date: new Date(),
      amount: 0,
      description: "",
      currency: "euro",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => addExpenseAction(data))}
        className="space-y-8 mt-4"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <div
                className={cn(
                  "w-full p-1 rounded-md",
                  field.value === "out" ? "bg-red-600" : "bg-green-600",
                )}
              />
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex bg-stone-200 shadow-inner p-1 rounded-lg w-full"
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
                      className="w-full mt-0 text-center px-3 py-2 rounded-md text-sm font-medium transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer"
                    >
                      Outgoing
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
                      className="w-full m-0 text-center px-3 py-2 rounded-md text-sm font-medium transition-all peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground cursor-pointer"
                    >
                      Incoming
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
              <FormControl>
                <Input
                  className="text-right"
                  {...field}
                  onChange={(event) => field.onChange(+event.target.value)}
                  type="number"
                />
              </FormControl>
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
        <Button className="w-full" type="submit">
          Add
        </Button>
      </form>
    </Form>
  );
}
