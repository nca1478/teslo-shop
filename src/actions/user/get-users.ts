"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/config/auth/auth.config";

export const getUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Acceso denegado - Solo para Administradores",
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return {
    ok: true,
    users,
  };
};
