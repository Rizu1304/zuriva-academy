"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCourses() {
  try {
    return await prisma.course.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        _count: { select: { modules: true, enrollments: true } },
      },
    });
  } catch {
    return [];
  }
}

export async function getCategories() {
  try {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { courses: true } } },
    });
  } catch {
    return [];
  }
}

export async function getCourseById(id: string) {
  try {
    return await prisma.course.findUnique({
      where: { id },
      include: {
        category: true,
        _count: { select: { modules: true, enrollments: true } },
        modules: {
          orderBy: { sortOrder: "asc" },
          include: { lessons: { orderBy: { sortOrder: "asc" } } },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function createCourse(data: {
  title: string;
  description?: string;
  status?: string;
  categoryId?: string | null;
  duration?: string;
  credits?: string;
}) {
  const course = await prisma.course.create({
    data: {
      title: data.title,
      description: data.description || null,
      status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT",
      categoryId: data.categoryId || null,
      duration: data.duration ? parseInt(data.duration) : null,
      credits: data.credits ? parseInt(data.credits) : 0,
    },
  });
  revalidatePath("/admin/kurse");
  return course;
}

export async function updateCourse(
  id: string,
  data: {
    title: string;
    description?: string;
    status?: string;
    categoryId?: string | null;
    duration?: string;
    credits?: string;
  }
) {
  const course = await prisma.course.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description || null,
      status: (data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT",
      categoryId: data.categoryId || null,
      duration: data.duration ? parseInt(data.duration) : null,
      credits: data.credits ? parseInt(data.credits) : 0,
    },
  });
  revalidatePath("/admin/kurse");
  return course;
}

export async function deleteCourse(id: string) {
  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin/kurse");
}

export async function createCategory(name: string, color?: string) {
  const category = await prisma.category.create({
    data: { name, color: color || "#022350" },
  });
  revalidatePath("/admin/kurse");
  return category;
}

export async function addModule(courseId: string, title: string) {
  const maxOrder = await prisma.module.aggregate({
    where: { courseId },
    _max: { sortOrder: true },
  });
  const mod = await prisma.module.create({
    data: {
      title,
      courseId,
      sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
    },
    include: { lessons: true },
  });
  revalidatePath("/admin/kurse");
  return mod;
}

export async function deleteModule(id: string) {
  await prisma.module.delete({ where: { id } });
  revalidatePath("/admin/kurse");
}
