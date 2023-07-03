import prisma from "@/lib/prisma";
import StatusCard from "./_components/Cards/StatusCard/StatusCard";
import NameDescriptionCard from "./_components/Cards/NameDescriptionCard/NameDescriptionCard";
import VariantsCard from "./_components/Cards/VariantsCard/VariantsCard";
import PricingCard from "./_components/Cards/PricingCard/PricingCard";
import { ProductProvider } from "@/providers/Product";
import MediaCard from "./_components/Cards/MediaCard/MediaCard";

type PageProps = {
  params: {
    productId: string;
  };
};

export default async function Page({ params }: PageProps) {
  const { productId } = params;
  const response = await prisma.product.findUnique({
    where: { id: productId },
    include: { images: true, variants: { include: { options: true } } },
  });

  if (!response) {
    throw new Error("Product ID does not exist");
  }

  const { variants, images, ...product } = response;
  console.log("product*************************\n", response);

  return (
    <ProductProvider product={product} images={images} variants={variants}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-6 gap-4  h-full pb-20">
        <div className="lg:col-start-5 lg:col-span-2  flex flex-col gap-4">
          <StatusCard />
          {/* <CatalogCard /> */}
        </div>
        <div className="lg:col-start-1 lg:col-span-4 lg:row-start-1 flex flex-col gap-4 ">
          <NameDescriptionCard />
          <PricingCard />
          <MediaCard />
          <VariantsCard />
        </div>
      </div>
    </ProductProvider>
  );
}
