import { getUserSessionServer } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import * as yup from "yup";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get("take") ?? "10");
  const skip = Number(searchParams.get("skip") ?? "0");

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json(
      { message: "Take o Skip deben ser números" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});
// .strict(true)
// .noUnknown(true, "Solo se permiten los datos: description y complete.");

export async function POST(request: NextRequest) {
  const user = await getUserSessionServer();

  if (!user) {
    return NextResponse.json("No autorizado", { status: 401 });
  }

  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
      // { stripUnknown: true }
    );

    const todo = await prisma.todo.create({
      data: { complete, description, userId: user.id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    // let message = "Error desconocido";
    // if (error instanceof Error) {
    //   message = error.message;
    // } else if (typeof error === "string") {
    //   message = error;
    // }

    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE() {
  const user = await getUserSessionServer();

  if (!user) {
    return NextResponse.json("No autorizado", { status: 401 });
  }

  try {
    await prisma.todo.deleteMany({
      where: { complete: true, userId: user.id },
    });
    return NextResponse.json({ message: "Todos Deleted" });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
