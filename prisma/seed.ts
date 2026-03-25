import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.forumReply.deleteMany();
  await prisma.forumPost.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.learningPathCourse.deleteMany();
  await prisma.learningPath.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // ===== USERS =====
  const passwordHash = await bcrypt.hash("demo123", 10);

  const laura = await prisma.user.create({
    data: { email: "laura@zuriva.ch", name: "Laura Meier", passwordHash, role: "LEARNER", avatarInitials: "LM" },
  });

  const thomas = await prisma.user.create({
    data: { email: "thomas@zuriva.ch", name: "Thomas Mueller", passwordHash, role: "LEARNER", avatarInitials: "TM" },
  });

  const anna = await prisma.user.create({
    data: { email: "anna@zuriva.ch", name: "Anna Schneider", passwordHash, role: "INSTRUCTOR", avatarInitials: "AS" },
  });

  await prisma.user.create({
    data: { email: "admin@zuriva.ch", name: "Admin Zuriva", passwordHash, role: "ADMIN", avatarInitials: "AZ" },
  });

  // ===== COURSE: Sachversicherung =====
  const sachCourse = await prisma.course.create({
    data: {
      title: "Grundlagen der Sachversicherung",
      description: "Dieser Kurs vermittelt die wesentlichen Grundlagen der Sachversicherung im Schweizer Markt.",
      category: "Nicht-Leben",
      imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
      duration: "2h 40min",
      credits: 8,
      published: true,
      sortOrder: 1,
    },
  });

  const sachM1 = await prisma.module.create({
    data: { courseId: sachCourse.id, title: "Einfuehrung in die Sachversicherung", sortOrder: 1 },
  });

  const sachL1 = await prisma.lesson.create({ data: { moduleId: sachM1.id, title: "Was ist Sachversicherung?", type: "VIDEO", duration: "12 min", sortOrder: 1 } });
  const sachL2 = await prisma.lesson.create({ data: { moduleId: sachM1.id, title: "Rechtliche Grundlagen in der Schweiz", type: "TEXT", duration: "8 min", sortOrder: 2 } });
  const sachL3 = await prisma.lesson.create({ data: { moduleId: sachM1.id, title: "Quiz: Grundbegriffe", type: "QUIZ", duration: "5 min", sortOrder: 3 } });

  // Quiz for Sachversicherung Grundbegriffe
  const sachQuiz1 = await prisma.quiz.create({
    data: { lessonId: sachL3.id, passingScore: 70, timeLimit: "5 min" },
  });

  await prisma.quizQuestion.createMany({
    data: [
      { quizId: sachQuiz1.id, question: "Welche Versicherungsart gehoert NICHT zur Sachversicherung?", options: ["Gebaeudeversicherung", "Hausratversicherung", "Lebensversicherung", "Betriebsunterbrechungsversicherung"], correctIdx: 2, explanation: "Die Lebensversicherung gehoert zur Personenversicherung, nicht zur Sachversicherung.", sortOrder: 1 },
      { quizId: sachQuiz1.id, question: "Was deckt die Hausratversicherung in der Regel ab?", options: ["Schaeden am Gebaeude", "Bewegliche Gegenstaende im Haushalt", "Haftpflichtansprueche", "Fahrzeugschaeden"], correctIdx: 1, explanation: "Die Hausratversicherung schuetzt bewegliche Gegenstaende im Haushalt.", sortOrder: 2 },
      { quizId: sachQuiz1.id, question: "Wer ist in der Schweiz fuer die Gebaeudeversicherung zustaendig?", options: ["Private Versicherer", "Kantonale Gebaeudeversicherung (19 Kantone)", "Bundesversicherung", "Gemeinden"], correctIdx: 1, explanation: "In 19 von 26 Kantonen ist die Gebaeudeversicherung durch kantonale Monopolanstalten geregelt.", sortOrder: 3 },
      { quizId: sachQuiz1.id, question: "Was versteht man unter Unterversicherung?", options: ["Zu hohe Praemien", "Versicherungssumme niedriger als tatsaechlicher Wert", "Versicherung gekuendigt", "Selbstbehalt zu hoch"], correctIdx: 1, explanation: "Bei Unterversicherung ist die Versicherungssumme niedriger als der tatsaechliche Wert.", sortOrder: 4 },
      { quizId: sachQuiz1.id, question: "Welches Prinzip gilt bei der Sachversicherung?", options: ["Gewinnprinzip", "Bereicherungsverbot", "Maximalprinzip", "Pauschalentschaedigung"], correctIdx: 1, explanation: "Das Bereicherungsverbot besagt, dass der Versicherungsnehmer nicht bessergestellt werden soll als vor dem Schadenfall.", sortOrder: 5 },
    ],
  });

  // ===== COURSE: Lebensversicherungen =====
  const lebenCourse = await prisma.course.create({
    data: {
      title: "Lebensversicherungen: Produktkenntnisse",
      description: "Umfassende Einfuehrung in die Schweizer Lebensversicherungslandschaft.",
      category: "Leben",
      imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
      duration: "4h 15min",
      credits: 12,
      published: true,
      sortOrder: 2,
    },
  });

  const lebenM1 = await prisma.module.create({
    data: { courseId: lebenCourse.id, title: "Grundlagen Lebensversicherung", sortOrder: 1 },
  });

  await prisma.lesson.create({ data: { moduleId: lebenM1.id, title: "Das 3-Saeulen-System", type: "VIDEO", duration: "15 min", sortOrder: 1 } });
  await prisma.lesson.create({ data: { moduleId: lebenM1.id, title: "Arten von Lebensversicherungen", type: "TEXT", duration: "10 min", sortOrder: 2 } });
  const lebenL3 = await prisma.lesson.create({ data: { moduleId: lebenM1.id, title: "Quiz: Grundlagen", type: "QUIZ", duration: "5 min", sortOrder: 3 } });

  const lebenQuiz = await prisma.quiz.create({
    data: { lessonId: lebenL3.id, passingScore: 70, timeLimit: "5 min" },
  });

  await prisma.quizQuestion.createMany({
    data: [
      { quizId: lebenQuiz.id, question: "Aus welchen drei Saeulen besteht das Schweizer Vorsorgesystem?", options: ["AHV, BVG, Saeule 3", "AHV, IV, EO", "UVG, BVG, KVG", "AHV, UVG, Saeule 3"], correctIdx: 0, explanation: "AHV/IV (1. Saeule), BVG (2. Saeule), Saeule 3a/3b (3. Saeule).", sortOrder: 1 },
      { quizId: lebenQuiz.id, question: "Was ist der Hauptzweck der 2. Saeule (BVG)?", options: ["Existenzsicherung", "Fortfuehrung des Lebensstandards", "Steueroptimierung", "Vermoegensverwaltung"], correctIdx: 1, explanation: "Die 2. Saeule soll den gewohnten Lebensstandard in angemessener Weise ermoeglichen.", sortOrder: 2 },
      { quizId: lebenQuiz.id, question: "Welchen Vorteil bietet die Saeule 3a?", options: ["Keine Steuern auf Ertraege", "Einzahlungen sind vom Einkommen abziehbar", "Komplette Steuerfreiheit", "Nur in ZH steuerbefreit"], correctIdx: 1, explanation: "Einzahlungen in die Saeule 3a koennen vom steuerbaren Einkommen abgezogen werden.", sortOrder: 3 },
    ],
  });

  // ===== ENROLLMENTS & PROGRESS =====
  await prisma.enrollment.create({ data: { userId: laura.id, courseId: sachCourse.id } });
  await prisma.enrollment.create({ data: { userId: laura.id, courseId: lebenCourse.id } });

  // Laura completed first 2 lessons of Sachversicherung
  await prisma.lessonProgress.create({ data: { userId: laura.id, lessonId: sachL1.id, completed: true, completedAt: new Date() } });
  await prisma.lessonProgress.create({ data: { userId: laura.id, lessonId: sachL2.id, completed: true, completedAt: new Date() } });

  // ===== CERTIFICATES =====
  await prisma.certificate.create({
    data: { userId: laura.id, title: "Trainee Grundausbildung", courseName: "Trainee Grundausbildung", score: 94, credits: 40 },
  });
  await prisma.certificate.create({
    data: { userId: laura.id, title: "Beratungskompetenz", courseName: "Beratungskompetenz und Kundenkommunikation", score: 88, credits: 10 },
  });

  // ===== FORUM =====
  const post1 = await prisma.forumPost.create({
    data: { userId: thomas.id, title: "UVG vs. KVG in der Haftpflicht — was gilt wann?", content: "Kann jemand die Abgrenzung zwischen UVG und KVG erklaeren?", category: "Nicht-Leben", solved: true },
  });

  await prisma.forumReply.create({
    data: { postId: post1.id, userId: anna.id, content: "Das UVG deckt Berufsunfaelle und Berufskrankheiten ab, waehrend das KVG die Grundversicherung regelt.", isBestAnswer: true },
  });

  console.log("Seed complete!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
