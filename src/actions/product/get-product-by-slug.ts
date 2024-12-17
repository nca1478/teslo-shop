"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug,
      },
      include: {
        ProductImage: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
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
