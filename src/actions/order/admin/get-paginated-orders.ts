"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/config/auth/auth.config";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 5,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Acceso denegado - Solo para Administradores",
    };
  }

  try {
    const orders = await prisma.order.findMany({
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

    const totalCount = await prisma.order.count();
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
