import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { courses: true } } },
  });
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const slug = body.name
    .toLowerCase()
    .replace(/[\u00e4\u00f6\u00fc\u00df]/g, (c: string) => ({ "\u00e4": "ae", "\u00f6": "oe", "\u00fc": "ue", "\u00df": "ss" })[c] || c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const category = await prisma.category.create({
    data: {
      name: body.name,
      slug,
      color: body.color || "#022350",
      icon: body.icon || "\uD83D\uDCDA",
    },
  });

  return NextResponse.json(category, { status: 201 });
}
