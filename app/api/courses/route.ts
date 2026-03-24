import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      _count: { select: { modules: true, enrollments: true } },
    },
  });
  return NextResponse.json(courses);
}

export async function POST(request: Request) {
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
}
