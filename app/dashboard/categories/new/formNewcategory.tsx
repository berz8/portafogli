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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addCategoryAction } from "@/app/actions/categories";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

export const newCategoryFormSchema = z.object({
  name: z.string().min(1).max(70),
  description: z.string().max(300),
  color: z.string().min(4).max(7),
  icon: z.string(),
});

export default function FormCategory() {
  const form = useForm<z.infer<typeof newCategoryFormSchema>>({
    resolver: zodResolver(newCategoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#000",
      icon: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          toast.promise(addCategoryAction(data), {
            success: "Category Created",
            error: "Something went wrong",
          }),
        )}
        className="space-y-6 mt-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} maxLength={70} />
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
                <Input {...field} maxLength={300} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="block w-full h-8 rounded-lg shadow-lg focus:outline-none"
                      style={{ backgroundColor: field.value }}
                      aria-label="Open color picker"
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-0 border-none w-[200px]"
                    align="start"
                  >
                    <HexColorPicker
                      color={field.value}
                      onChange={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full mt-4" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
}
