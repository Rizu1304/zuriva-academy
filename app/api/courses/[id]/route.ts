import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        modules: { orderBy: { sortOrder: "asc" }, include: { lessons: { orderBy: { sortOrder: "asc" } } } },
      },
    });
    if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const course = await prisma.course.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description ?? undefined,
        status: body.status ?? undefined,
        categoryId: body.categoryId ?? undefined,
        duration: body.duration !== undefined ? (body.duration ? parseInt(body.duration) : null) : undefined,
        credits: body.credits !== undefined ? parseInt(body.credits) : undefined,
      },
      include: { category: true, _count: { select: { modules: true, enrollments: true } } },
    });
    return NextResponse.json(course);
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
