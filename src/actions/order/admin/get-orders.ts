"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/config/auth/auth.config";

export const getOrders = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Acceso denegado - Solo para Administradores",
    };
  }

  const orders = await prisma.order.findMany({
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    ok: true,
    orders,
  };
};
