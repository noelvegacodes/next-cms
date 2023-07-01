"use client";

import { Button } from "@/components/ui/button";
import { enableMapSet } from "immer";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import InputList from "./VariantTest";

enableMapSet();

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Card>
        <CardHeader className="border-b">Variants</CardHeader>
        {open && (
          <CardContent className="p-6">
            <InputList productId="" close={() => setOpen(false)} />
          </CardContent>
        )}
        <CardFooter>
          <Button variant={"ghost"} onClick={() => setOpen(true)}>
            Add options like size or color
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
