"use client";
import * as React from "react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { insertProductImage } from "@/actions/product";
import { cn } from "@/lib/utils";

export default function AddImageButton({ id }: { id: string }) {
  const [files, setFiles] = useState<FileList>();

  return (
    <Label className={cn(buttonVariants(), "cursor-pointer")}>
      <p>Add Image</p>
      <Input
        id="img"
        type="file"
        className="hidden"
        multiple
        accept="image/png, image/jpeg"
        onInput={async (e) => {
          const files = e.currentTarget.files;
          if (!files) return;
          setFiles(files);
          if (!files) return;

          for (const file of files) {
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("upload_preset", "acid-beta");
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/acidfork/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );
            const data = await response.json();
            const { secure_url: url, height, width } = data;
            await insertProductImage({ productId: id, url, height, width });
          }
        }}
      />
    </Label>
  );
}
