"user server";

import { Gender } from "@/interfaces";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  // validaciones page
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
      // filtrar por género, null: muestra todo los productos
      where: { gender },
    });

    // 2. Obtener el total de páginas
    const totalCount = await prisma.product.count({
      where: { gender },
    });

    const totalPages = Math.ceil(totalCount / take);

    // 3. Parsear la respuesta (para que sea compatible con la interfaz Product)
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
    // aqui muestra la vista error.tsx
    throw new Error("No se pudo cargar los productos");
  }
};
