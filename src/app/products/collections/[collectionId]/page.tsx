import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CollectionNameAndDescription from "./_components/CollectionNameAndDescription";

import { products } from "./_components/data";
import { columns } from "./_components/collectionProductColumns";

import { ProductDataTable } from "./_components/data-table";
import PublishCard from "./_components/PublishCard";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImgCard from "./_components/ImgCard";
import Link from "next/link";
import OnlineStoreCard from "./_components/OnlineStoreCard";

type PageProps = {
  params: {
    collectionId: string;
  };
};
export default function Page({ params }: PageProps) {
  return (
    <Card className=" p-4 flex flex-col items-center gap-6">
      <CardHeader className=" w-1/2 flex flex-row items-center gap-10 justify-start">
        <Link href={"/products/collections"}>
          <ArrowLeft />
        </Link>

        <CardTitle>{}</CardTitle>
      </CardHeader>
      <CardContent className=" w-1/2">
        <div className=" flex gap-6 ">
          <div className=" flex flex-col gap-6">
            <Card className=" p-4 pb-4">
              <CollectionNameAndDescription
                id={params.collectionId}
                name=""
                description=""
              />
            </Card>
            <ProductDataTable columns={columns} data={products} />
          </div>
          <div className="flex flex-col gap-6">
            <PublishCard />
            <ImgCard />
            <OnlineStoreCard />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
