"user server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener los productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // 2. Obtener el total de páginas
    const totalCount = await prisma.product.count({});
    const totalPages = Math.ceil(totalCount / take);

    // parsear la respuesta (para que sea compatible con la interfaz Product)
    return {
      products: products.map((product) => {
        return {
          ...product,
          images: product.ProductImage.map((image) => image.url),
        };
      }),
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo cargar los productos");
  }
};
