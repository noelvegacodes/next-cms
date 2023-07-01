"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateNameAndDescription } from "@/actions/product";
import Spinner from "@/components/Spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(500),
});

export default function NameDescriptionCard({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await updateNameAndDescription(id, values.name, values.description);
    console.log(values);
  }

  useEffect(() => {
    form.reset({ name, description });
  }, [id, name, description]);
  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>Name & Description</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea rows={6} className="resize-none" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={!form.formState.isDirty}>
              <Spinner show={form.formState.isSubmitting} />
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
