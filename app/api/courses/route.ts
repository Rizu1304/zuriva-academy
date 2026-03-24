import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        _count: { select: { modules: true, enrollments: true } },
      },
    });
    return NextResponse.json(courses);
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const course = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description || null,
        status: body.status || "DRAFT",
        categoryId: body.categoryId || null,
        duration: body.duration ? parseInt(body.duration) : null,
        credits: body.credits ? parseInt(body.credits) : 0,
      },
      include: { category: true, _count: { select: { modules: true, enrollments: true } } },
    });
    return NextResponse.json(course, { status: 201 });
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
