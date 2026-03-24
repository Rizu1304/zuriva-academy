import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = await prisma.course.findUnique({
    where: { id },
    include: { category: true, modules: { orderBy: { sortOrder: "asc" } }, _count: { select: { enrollments: true } } },
  });
  if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(course);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.status !== undefined) data.status = body.status;
  if (body.coverImage !== undefined) data.coverImage = body.coverImage;
  if (body.duration !== undefined) data.duration = body.duration;
  if (body.credits !== undefined) data.credits = body.credits;
  if (body.categoryId !== undefined) data.categoryId = body.categoryId || null;

  const course = await prisma.course.update({
    where: { id },
    data,
    include: { category: true, modules: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(course);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.course.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
