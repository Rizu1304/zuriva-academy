import { auth } from "@/lib/auth";

// Mark a lesson as completed
export async function POST(request: Request) {
  const { prisma } = await import("@/lib/db");
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const { lessonId } = await request.json();
  if (!lessonId) {
    return Response.json({ error: "lessonId fehlt" }, { status: 400 });
  }

  const progress = await prisma.lessonProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    update: { completed: true, completedAt: new Date() },
    create: { userId: session.user.id, lessonId, completed: true, completedAt: new Date() },
  });

  return Response.json({ success: true, progress });
}

// Get progress for a course
export async function GET(request: Request) {
  const { prisma } = await import("@/lib/db");
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ error: "Nicht angemeldet" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return Response.json({ error: "courseId fehlt" }, { status: 400 });
  }

  const lessons = await prisma.lesson.findMany({
    where: { module: { courseId } },
    include: {
      progress: { where: { userId: session.user.id } },
    },
  });

  const total = lessons.length;
  const completed = lessons.filter((l: { progress: { completed: boolean }[] }) => l.progress.some((p: { completed: boolean }) => p.completed)).length;

  return Response.json({ total, completed, percent: total > 0 ? Math.round((completed / total) * 100) : 0 });
}
