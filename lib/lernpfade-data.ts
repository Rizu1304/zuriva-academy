import m1 from "./curriculum/m1-versicherungswirtschaft";
import m2 from "./curriculum/m2-recht";
import m3 from "./curriculum/m3-sachversicherung";
import m4 from "./curriculum/m4-personenversicherung";
import m5 from "./curriculum/m5-beratung";
import m6 from "./curriculum/m6-pruefung";

export interface LektionContent {
  type: "text";
  paragraphs: string[];
}

export interface SlideContent {
  type: "slides";
  slides: { title: string; content: string; bulletPoints?: string[]; speakText: string }[];
}

export interface QuizContent {
  type: "quiz";
  questions: { text: string; options: string[]; correctIndex: number; explanation: string }[];
  passingScore: number;
}

export interface VideoContent {
  type: "video";
  description: string;
  speakText: string;
}

export type ContentData = LektionContent | SlideContent | QuizContent | VideoContent;

export interface Lektion {
  id: string;
  title: string;
  type: "video" | "slides" | "text" | "quiz";
  duration: string;
  completed: boolean;
  content?: ContentData;
}

export interface Modul {
  id: string;
  title: string;
  description: string;
  credits: number;
  lektionen: Lektion[];
}

export interface Lernpfad {
  id: number;
  title: string;
  description: string;
  color: string;
  status: "done" | "active" | "locked";
  credits: number;
  prerequisite?: string;
  module: Modul[];
  zertifikat?: string;
}

export const lernpfade: Lernpfad[] = [
  {
    id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende.", color: "#0FA4A0", status: "done", credits: 40, zertifikat: "Trainee Zertifikat",
    module: [
      { id: "m1", title: "Willkommen bei Zuriva", description: "Einführung in die Zuriva Academy", credits: 5, lektionen: [
        { id: "l1", title: "Begrüssung von Mark", type: "video", duration: "3 Min.", completed: true, content: { type: "video", description: "Mark begrüsst dich persönlich in der Zuriva Academy.", speakText: "Hallo! Ich bin Mark, dein persönlicher Begleiter hier bei Zuriva. Schön, dass du da bist. Du bist jetzt Teil von etwas Besonderem. Die Zuriva Academy wurde für dich gebaut. Hier lernst du alles, was du als Versicherungsprofi brauchst. Schritt für Schritt. In deinem Tempo." } },
        { id: "l2", title: "So funktioniert die Academy", type: "slides", duration: "5 Min.", completed: true, content: { type: "slides", slides: [
          { title: "Dein Lernweg", content: "Die Academy ist in Lernpfade unterteilt. Jeder Lernpfad besteht aus Modulen, und jedes Modul aus einzelnen Lektionen.", bulletPoints: ["Lernpfade zeigen dir den roten Faden", "Module sind thematische Blöcke", "Lektionen sind einzelne Lerneinheiten", "Am Ende jedes Moduls wartet ein Quiz"], speakText: "Die Academy ist in Lernpfade unterteilt. Jeder Lernpfad besteht aus Modulen, und jedes Modul aus einzelnen Lektionen." },
          { title: "Lektionsarten", content: "Es gibt verschiedene Arten von Lektionen:", bulletPoints: ["Videos: Erklärungen von Mark", "Slides: Interaktive Folien zum Durchklicken", "Texte: Vertiefende Informationen", "Quizzes: Teste dein Wissen"], speakText: "Es gibt Videos, interaktive Slides, vertiefende Texte und Quizzes." },
        ] } },
        { id: "l3", title: "Dein Lernplan", type: "text", duration: "3 Min.", completed: true, content: { type: "text", paragraphs: ["Willkommen zu deinem persönlichen Lernplan. Hier erfährst du, wie du die Academy optimal nutzt.", "Dein Ziel ist die VBV-Zertifizierung 2026. Dafür brauchst du 600 Credits. Jedes Modul bringt dir Credits, die du durch das Abschliessen von Lektionen und Quizzes erhältst.", "Wir empfehlen dir, täglich 30-60 Minuten zu lernen. So schaffst du die Zertifizierung entspannt vor der Frist.", "Nutze die Gamification-Features: Sammle XP, halte deinen Streak aufrecht und verdiene Badges. Das motiviert und macht Spass!", "Bei Fragen steht dir Aura, unsere KI-Assistentin, jederzeit zur Verfügung. Klicke einfach auf das Aura-Symbol unten rechts."] } },
      ]},
      { id: "m2", title: "Grundlagen Versicherung", description: "Die Schweizer Versicherungslandschaft verstehen", credits: 10, lektionen: [
        { id: "l4", title: "Das 3-Säulen-System", type: "video", duration: "12 Min.", completed: true, content: { type: "video", description: "Erklärung des Schweizer 3-Säulen-Systems.", speakText: "Das Schweizer Vorsorgesystem basiert auf drei Säulen. Die erste Säule ist die AHV, die staatliche Vorsorge. Die zweite Säule ist die berufliche Vorsorge über die Pensionskasse. Und die dritte Säule ist die private Vorsorge, unterteilt in Säule 3a und 3b." } },
        { id: "l5", title: "Versicherungsarten Überblick", type: "slides", duration: "8 Min.", completed: true, content: { type: "slides", slides: [
          { title: "Personenversicherung", content: "Versicherungen die Personen schützen:", bulletPoints: ["Lebensversicherung", "Krankenversicherung", "Unfallversicherung", "Erwerbsunfähigkeitsversicherung"], speakText: "Personenversicherungen schützen Menschen gegen Risiken wie Tod, Krankheit, Unfall und Erwerbsunfähigkeit." },
          { title: "Sachversicherung", content: "Versicherungen die Sachen schützen:", bulletPoints: ["Gebäudeversicherung", "Hausratversicherung", "Motorfahrzeugversicherung", "Transportversicherung"], speakText: "Sachversicherungen schützen materielle Güter wie Gebäude, Hausrat, Fahrzeuge und Waren." },
          { title: "Haftpflichtversicherung", content: "Schutz wenn du anderen Schaden zufügst:", bulletPoints: ["Privathaftpflicht", "Betriebshaftpflicht", "Berufshaftpflicht", "Motorfahrzeughaftpflicht"], speakText: "Haftpflichtversicherungen schützen dich, wenn du anderen einen Schaden zufügst und dafür haften musst." },
        ] } },
        { id: "l6", title: "Quiz: Grundbegriffe", type: "quiz", duration: "5 Min.", completed: true, content: { type: "quiz", passingScore: 70, questions: [
          { text: "Wie viele Säulen hat das Schweizer Vorsorgesystem?", options: ["2", "3", "4", "5"], correctIndex: 1, explanation: "Das Schweizer Vorsorgesystem basiert auf 3 Säulen." },
          { text: "Was ist die AHV?", options: ["Private Vorsorge", "Berufliche Vorsorge", "Staatliche Vorsorge", "Zusatzversicherung"], correctIndex: 2, explanation: "Die AHV ist die 1. Säule - die staatliche Alters- und Hinterlassenenversicherung." },
          { text: "Welche Versicherung schützt Gebäude?", options: ["Personenversicherung", "Sachversicherung", "Haftpflichtversicherung", "Krankenversicherung"], correctIndex: 1, explanation: "Die Gebäudeversicherung gehört zu den Sachversicherungen." },
        ] } },
      ]},
    ],
  },
  {
    id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung 2026. 6 Module, 20+ Stunden Lernstoff.", color: "#022350", status: "active", credits: 200,
    module: [m1, m2, m3, m4, m5, m6],
  },
];

export function getLernpfad(id: number): Lernpfad | undefined {
  return lernpfade.find(p => p.id === id);
}

export function getModul(pfadId: number, modulId: string): Modul | undefined {
  const pfad = getLernpfad(pfadId);
  return pfad?.module.find(m => m.id === modulId);
}

export function getLektion(pfadId: number, modulId: string, lektionId: string): { pfad: Lernpfad; modul: Modul; lektion: Lektion; lektionIndex: number; nextLektion?: Lektion } | undefined {
  const pfad = getLernpfad(pfadId);
  if (!pfad) return undefined;
  const modul = pfad.module.find(m => m.id === modulId);
  if (!modul) return undefined;
  const lektionIndex = modul.lektionen.findIndex(l => l.id === lektionId);
  if (lektionIndex < 0) return undefined;
  const lektion = modul.lektionen[lektionIndex];
  const nextLektion = modul.lektionen[lektionIndex + 1];
  return { pfad, modul, lektion, lektionIndex, nextLektion };
}
