"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function newProduct(name: string) {
  const product = await prisma.product.create({
    data: { name },
    select: { id: true },
  });
  revalidatePath("/products");
  return product.id;
}

export async function updateNameAndDescription(
  id: string,
  name: string,
  description: string
) {
  await prisma.product.update({ where: { id }, data: { name, description } });
  revalidatePath("/products/" + id);
}

export async function insertProductImage({
  productId,
  url,
  height,
  width,
}: {
  productId: string;
  url: string;
  height: number;
  width: number;
}) {
  await prisma.productImage.create({ data: { url, height, width, productId } });
  revalidatePath("/products/" + productId);
}

export async function insertVariantOption(
  productId: string,
  variantId: string,
  value: string
) {
  await prisma.variantValue.create({ data: { value, variantId } });

  revalidatePath("/products/" + productId);
}

export async function insertVariant(
  name: string,
  productId: string,
  values: { value: string }[]
) {
  console.log(productId, name);
  await prisma.variant.create({
    data: { name, productId, values: { create: values } },
  });

  revalidatePath("/products/" + productId);
}

export async function newVariant({
  productId,
  type,
  values,
}: {
  productId: string;
  type: string;
  values: string[];
}) {
  await prisma.variant.create({
    data: {
      name: type,
      productId,
      values: { create: values.map((value) => ({ value })) },
    },
  });
}

export async function updateVariantOptions(
  productId: string,
  variantId: string,
  values: any[]
) {
  await prisma.variantValue.deleteMany({ where: { variantId } });
  const promises = [] as Promise<any>[];
  values.forEach((value) => {
    const promise = prisma.variantValue.create({ data: { variantId, value } });
    promises.push(promise);
  });

  await Promise.all(promises).then((values) => {
    revalidatePath("/products/" + productId);
  });
}

export async function deleteVariantOption(variantValueId: string) {
  await prisma.variantValue.delete({ where: { id: variantValueId } });
}

export async function deleteVariant(variantId: string) {
  await prisma.variant.delete({ where: { id: variantId } });
}

export async function revalidate(path: string) {
  revalidatePath(path);
}

export async function existingVariantFormSubmission(
  variantId: string,
  values: string[]
) {
  await prisma.variantValue.deleteMany({ where: { variantId } });
  await prisma.variantValue.createMany({
    data: values.map((value) => ({ variantId, value })),
  });
}

export async function updateProductStatus({
  id,
  status,
}: {
  id: string;
  status: "INACTIVE" | "ACTIVE";
}) {
  await prisma.product.update({ where: { id }, data: { status } });
}

export async function updateProductPrice({
  productId,
  price,
  priceCompareTo,
  cost,
}: {
  productId: string;
  price: number;
  priceCompareTo: number;
  cost: number;
}) {
  await prisma.product.update({
    where: { id: productId },
    data: { price, priceCompareTo, cost },
  });
}
