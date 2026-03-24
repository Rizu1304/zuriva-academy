import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const maxOrder = await prisma.module.aggregate({
    where: { courseId: body.courseId },
    _max: { sortOrder: true },
  });

  const module = await prisma.module.create({
    data: {
      title: body.title,
      description: body.description || null,
      type: body.type || "TEXT",
      content: body.content || null,
      videoUrl: body.videoUrl || null,
      duration: body.duration || 0,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
      courseId: body.courseId,
    },
  });

  return NextResponse.json(module, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const module = await prisma.module.update({
    where: { id: body.id },
    data: {
      title: body.title,
      description: body.description,
      type: body.type,
      content: body.content,
      videoUrl: body.videoUrl,
      duration: body.duration,
      sortOrder: body.sortOrder,
    },
  });

  return NextResponse.json(module);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await prisma.module.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
