"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import AddImageButton from "./AddImageButton";
import { Maximize2, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useContext, useState, useTransition } from "react";
import Link from "next/link";
import { CheckedState } from "@radix-ui/react-checkbox";
import { deleteImages } from "@/actions/image";
import { revalidate } from "@/actions/product";
import { ProductContext } from "@/providers/Product";

export default function MediaCard() {
  const {
    product: { id, images },
  } = useContext(ProductContext);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleSelect = (check: CheckedState, image: any) => {
    if (check) {
      setSelectedImages((prev) => [...prev, image.id]);
    } else {
      setSelectedImages((prev) =>
        prev.filter((imageId) => imageId !== image.id)
      );
    }
  };

  return (
    <Card className="shadow">
      <CardHeader>
        <CardTitle>Media</CardTitle>
      </CardHeader>
      <CardContent className=" ">
        <div className="min-h-[300px] h-full w-full  grid grid-cols-12 grid-rows-6 gap-2">
          {images.map((image: any, i: any) => {
            const isSelected = selectedImages.find(
              (imageId) => imageId === image.id
            );
            if (i === 0) {
              return (
                <MediaImageCard
                  className="group col-span-6 row-span-6 p-1.5 relative h-full  border-2 rounded-lg overflow-hidden cursor-pointer"
                  image={image}
                  isSelected={isSelected !== undefined}
                  onCheck={(c) => handleSelect(c, image)}
                  key={image.id}
                />
              );
            } else {
              return (
                <MediaImageCard
                  className="group col-span-3 row-span-3 p-1.5 relative h-full  border-2 rounded-lg overflow-hidden cursor-pointer"
                  image={image}
                  isSelected={isSelected !== undefined}
                  onCheck={(c) => handleSelect(c, image)}
                  key={image.id}
                />
              );
            }
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <AddImageButton id={id} />
          {selectedImages.length > 0 && (
            <Button
              variant="destructive"
              onClick={async () => {
                await deleteImages(selectedImages);
                revalidate("/products/" + id);
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

function MediaImageCard({
  image,
  isSelected,
  onCheck,
  className,
}: {
  image: any;
  isSelected: boolean;
  onCheck: (check: CheckedState) => void;
  className: string;
}) {
  return (
    <div
      key={image.id}
      className={className + ` ${isSelected && "opacity-70"}`}
    >
      <Image src={image.url} alt="" fill quality={100} />

      <Label
        htmlFor={image.id}
        className={`peer  p-1 absolute top-2 left-2 ${
          !isSelected && "hidden"
        } group-hover:block z-10`}
      >
        <Checkbox
          id={image.id}
          className={`border border-gray-300 h-5 w-5 accent-blue-500    data-[state=checked]:bg-blue-500 bg-white`}
          onCheckedChange={onCheck}
        />
      </Label>
      <Link
        href="#"
        className={`absolute h-full w-full top-0 left-0  ${
          isSelected
            ? " bg-white/40"
            : "group-hover:bg-black/40 peer-hover:bg-black/40 peer-hover:opacity-100 opacity-0 hover:opacity-100"
        }  transition-color duration-200 `}
      >
        <div className="p-2">
          <Button
            variant={"link"}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Maximize2 className="h-6 w-6 text-white " />
          </Button>
        </div>
      </Link>
    </div>
  );
}
