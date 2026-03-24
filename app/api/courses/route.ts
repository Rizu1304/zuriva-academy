import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const categoryId = searchParams.get("categoryId");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (categoryId) where.categoryId = categoryId;
  if (search) where.title = { contains: search, mode: "insensitive" };

  const courses = await prisma.course.findMany({
    where,
    include: { category: true, modules: { orderBy: { sortOrder: "asc" } }, _count: { select: { enrollments: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(courses);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = body.title
    .toLowerCase()
    .replace(/[\u00e4\u00f6\u00fc\u00df]/g, (c: string) => ({ "\u00e4": "ae", "\u00f6": "oe", "\u00fc": "ue", "\u00df": "ss" })[c] || c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const course = await prisma.course.create({
    data: {
      title: body.title,
      description: body.description || null,
      slug,
      status: body.status || "DRAFT",
      coverImage: body.coverImage || null,
      duration: body.duration || 0,
      credits: body.credits || 0,
      categoryId: body.categoryId || null,
      authorId: body.authorId,
    },
    include: { category: true, modules: true },
  });

  return NextResponse.json(course, { status: 201 });
}
