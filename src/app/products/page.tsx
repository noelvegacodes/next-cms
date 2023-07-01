import prisma from "@/lib/prisma";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import NewProductForm from "./NewProductForm";
import { Product, ProductImage } from "@prisma/client";
import { Card } from "@/components/ui/card";

type ProductImages = {
  images: ProductImages[];
};

type ProductWithImages = Product & { images: ProductImage[] };

export default async function Page() {
  let products = (await prisma.product.findMany({
    include: { images: { take: 1 } },
  })) as ProductWithImages[];

  if (!products) {
    products = [];
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Products
        </h2>
        <NewProductForm />
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  );
}
