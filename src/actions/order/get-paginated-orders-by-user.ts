"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/config/auth/auth.config";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrdersByUser = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session!.user.id,
      },
      include: {
        OrderAddress: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
      take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.order.count({
      where: {
        userId: session!.user.id,
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    return {
      ok: true,
      orders,
      currentPage: page,
      totalPages,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No se pudo cargar las ordenes", { cause: error });
    } else {
      throw new Error("No se pudo cargar las ordenes");
    }
  }
};
