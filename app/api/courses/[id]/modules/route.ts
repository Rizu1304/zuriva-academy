import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function getDb() {
  const { PrismaClient } = await import("@prisma/client");
  return new PrismaClient();
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const prisma = await getDb();
    const { id } = await params;
    const body = await request.json();
    const maxOrder = await prisma.module.aggregate({
      where: { courseId: id },
      _max: { sortOrder: true },
    });
    const mod = await prisma.module.create({
      data: {
        title: body.title,
        content: body.content || null,
        courseId: id,
        sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      },
      include: { lessons: true },
    });
    return NextResponse.json(mod, { status: 201 });
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
