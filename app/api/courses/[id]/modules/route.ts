import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const maxOrder = await prisma.module.aggregate({
    where: { courseId: id },
    _max: { sortOrder: true },
  });
  const module = await prisma.module.create({
    data: {
      title: body.title,
      content: body.content || null,
      courseId: id,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
    include: { lessons: true },
  });
  return NextResponse.json(module, { status: 201 });
}
