import prisma from "@/lib/prisma";
import StatusCard from "./_components/Cards/Status/StatusCard";
import NameDescriptionCard from "./_components/Cards/NameDescription/NameDescriptionCard";
import MediaCard from "./_components/Cards/Media/MediaCard";
import VariantsCard from "./_components/Cards/VariantsCard/VariantsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PricingCard from "./_components/Cards/PricingCard/PricingCard";
import CatalogCard from "./_components/Cards/CatalogCard/CatalogCard";
type PageProps = {
  params: {
    productId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { id: params.productId },
    include: {
      images: true,
      variants: {
        include: {
          values: true,
        },
      },
    },
  });

  console.log(product);
  if (!product) {
    throw new Error("Product ID does not exist");
  }

  product.price;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-4  h-full pb-20">
      <div className="lg:col-start-5 lg:col-span-2  flex flex-col gap-4">
        <StatusCard productId={product.id} status={product.status} />
        <CatalogCard productId={product.id} />
      </div>
      <div className="lg:col-start-1 lg:col-span-4 lg:row-start-1 flex flex-col gap-4 ">
        <NameDescriptionCard
          id={product.id}
          name={product.name}
          description={product.description}
        />
        <PricingCard
          productId={product.id}
          defaultValues={{
            price: product.price.toNumber(),
            cost: product.cost.toNumber(),
            priceCompareTo: product.priceCompareTo.toNumber(),
          }}
        />
        <MediaCard images={product.images} productId={product.id} />
        <VariantsCard productId={product.id} variants={product.variants} />
      </div>
    </div>
  );
}
