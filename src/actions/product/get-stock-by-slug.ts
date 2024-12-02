"use server";

import prisma from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
    });

    if (!product) return null;

    return product.inStock;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error al obtener el producto por slug", {
        cause: error,
      });
    } else {
      throw new Error("Error al obtener el producto por slug");
    }
  }
};
