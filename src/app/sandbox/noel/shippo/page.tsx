"use client";
import { createAddress } from "@/actions/shippo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FC } from "react";
import { useForm } from "react-hook-form";

interface pageProps {}

type FormValues = {
  name: string;
  street1: string;
  state: string;
  city: string;
  zip: string;
  country: string;
};

const Page: FC<pageProps> = ({}) => {
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      street1: "",
      city: "",
      state: "",
      zip: "",
      country: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Form submitted\n", data);
    console.log("Shippo response", await createAddress(data));
  };

  return (
    <div className="max-w-3xl mx-auto my-10 ">
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Testing shippo</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Smith" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Apple Road" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Manhattan" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="00000" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="mt-4">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;

//   const shippo = new Shippo(process.env.SHIPPO_TEST_TOKEN as string);
//   const addressFrom = await shippo.address.create({
//     name: "Noel Webb",
//     street1: "126 st spring street",
//     city: "Somille",
//     state: "NJ",
//     zip: "08876",
//     country: "US",
//     validate: true,
//   });

//   console.log(addressFrom);
