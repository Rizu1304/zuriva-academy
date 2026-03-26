import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return Response.json({ error: "Alle Felder sind erforderlich" }, { status: 400 });
  }

  if (password.length < 8) {
    return Response.json({ error: "Passwort muss mindestens 8 Zeichen lang sein" }, { status: 400 });
  }

  try {
    const prisma = new PrismaClient();

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      await prisma.$disconnect();
      return Response.json({ error: "E-Mail wird bereits verwendet" }, { status: 409 });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash: hashedPassword, role: "LEARNER" },
    });

    await prisma.$disconnect();

    return Response.json({ success: true, user: { id: user.id, name: user.name, email: user.email } }, { status: 201 });
  } catch (err) {
    return Response.json({ error: "Registrierung fehlgeschlagen: " + String(err) }, { status: 500 });
  }
}
