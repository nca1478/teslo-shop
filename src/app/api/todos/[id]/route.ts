import * as yup from "yup";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

interface Segments {
  params: Promise<{ id: string }>;
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserSessionServer();

  if (!user) {
    return null;
  }

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (todo?.userId !== user.id) {
    return null;
  }

  return todo;
};

export async function GET(request: NextRequest, { params }: Segments) {
  const { id } = await params;

  const todo = await getTodo(id);
  if (!todo) {
    return NextResponse.json(
      { message: `Todo con id ${id} no existe` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const postSchema = yup.object({
  description: yup.string().optional(),
  complete: yup.boolean().optional().default(false),
});

export async function PUT(request: NextRequest, { params }: Segments) {
  const { id } = await params;

  const todo = await getTodo(id);
  if (!todo) {
    return NextResponse.json(
      { message: `Todo con id ${id} no existe` },
      { status: 404 }
    );
  }

  try {
    const { complete, description } = await postSchema.validate(
      await request.json()
    );

    const todoUpdated = await prisma.todo.update({
      where: { id },
      data: { complete, description },
    });

    return NextResponse.json(todoUpdated);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
