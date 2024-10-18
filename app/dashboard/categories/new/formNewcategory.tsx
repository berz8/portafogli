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
import {
  addCategoryAction,
  updateCategoryAction,
} from "@/app/actions/categories";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import emojiRegex from "emoji-regex";
import { Category } from "@/db/schema/categories";

export const newCategoryFormSchema = z.object({
  name: z.string().min(1).max(70),
  description: z.string().max(300),
  color: z.string().min(4).max(7),
  icon: z.string(),
});

export default function FormCategory({ category }: { category?: Category }) {
  const form = useForm<z.infer<typeof newCategoryFormSchema>>({
    resolver: zodResolver(newCategoryFormSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      color: category?.color || "#000",
      icon: category?.icon || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) =>
          toast.promise(
            category
              ? updateCategoryAction({
                  ...category,
                  ...data,
                })
              : addCategoryAction(data),
            {
              success: "Category Created",
              error: "Something went wrong",
            },
          ),
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
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-4xl py-2 h-12"
                  maxLength={300}
                  onChange={(e) => {
                    const matches = e.target.value.match(emojiRegex());
                    if (matches?.length === 1 || e.target.value === "") {
                      field.onChange(e.target.value);
                    }
                  }}
                />
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
          {category ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
}
