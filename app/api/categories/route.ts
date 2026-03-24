import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function getDb() {
  const { PrismaClient } = await import("@prisma/client");
  return new PrismaClient();
}

export async function GET() {
  try {
    const prisma = await getDb();
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { courses: true } } },
    });
    return NextResponse.json(categories);
  } catch (e) {
    console.error("DB error:", e);
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const prisma = await getDb();
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
