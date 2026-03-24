import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { courses: true } } },
    });
    return NextResponse.json(categories);
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = await prisma.category.create({
      data: { name: body.name, color: body.color || "#022350" },
    });
    return NextResponse.json(category, { status: 201 });
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
