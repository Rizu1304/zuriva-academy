import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
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
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
