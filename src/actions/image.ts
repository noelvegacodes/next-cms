"use server";
import prisma from "@/lib/prisma";

export async function deleteImages(images: string[]) {
  await prisma.productImage.deleteMany({
    where: {
      id: {
        in: images,
      },
    },
  });
}
