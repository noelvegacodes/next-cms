"use client";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500),
});

export default function CollectionNameAndDescription({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description,
    },
  });
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel>Collection name</FormLabel>
            <FormControl>
              <Input placeholder="Collection name..." {...field} />
            </FormControl>
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
              <Textarea
                className="resize-none"
                placeholder="Description about your collection..."
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}
