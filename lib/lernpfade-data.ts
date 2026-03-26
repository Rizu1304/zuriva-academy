// Curriculum module imports
import m1 from "./curriculum/m1-versicherungswirtschaft";
import m2 from "./curriculum/m2-recht";
import m3 from "./curriculum/m3-sachversicherung";
import m4 from "./curriculum/m4-personenversicherung";
import m5 from "./curriculum/m5-beratung";
import m6 from "./curriculum/m6-pruefung";

// New path-specific modules
import trainee1 from "./curriculum/trainee/t1-willkommen";
import trainee2 from "./curriculum/trainee/t2-versicherungswelt";
import trainee3 from "./curriculum/trainee/t3-kundenumgang";
import trainee4 from "./curriculum/trainee/t4-produkte-basis";
import trainee5 from "./curriculum/trainee/t5-tools-systeme";
import trainee6 from "./curriculum/trainee/t6-trainee-test";

import kk1 from "./curriculum/krankenkasse/kk1-kvg-grundlagen";
import kk2 from "./curriculum/krankenkasse/kk2-zusatzversicherungen";
import kk3 from "./curriculum/krankenkasse/kk3-verkauf-kranken";
import kk4 from "./curriculum/krankenkasse/kk4-krankenkasse-test";

import sv1 from "./curriculum/sachverm/sv1-gebaeudeversicherung";
import sv2 from "./curriculum/sachverm/sv2-hausrat-haftpflicht";
import sv3 from "./curriculum/sachverm/sv3-motorfahrzeug";
import sv4 from "./curriculum/sachverm/sv4-gewerbe-betrieb";
import sv5 from "./curriculum/sachverm/sv5-sachverm-test";

import mu1 from "./curriculum/muendlich/mu1-gespraechsfuehrung";
import mu2 from "./curriculum/muendlich/mu2-bedarfsanalyse";
import mu3 from "./curriculum/muendlich/mu3-einwand-abschluss";
import mu4 from "./curriculum/muendlich/mu4-rollenspiel";
import mu5 from "./curriculum/muendlich/mu5-muendlich-test";

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
  hours: number;
  prerequisite?: string;
  module: Modul[];
  zertifikat?: string;
  examInfo?: string;
}

export const lernpfade: Lernpfad[] = [
  // ========== 1. TRAINEE GRUNDAUSBILDUNG (20h) ==========
  {
    id: 1,
    title: "Trainee Grundausbildung",
    description: "Der komplette Einstieg für neue Mitarbeitende. 20 Stunden Grundwissen über die Versicherungsbranche, Produkte, Kundenkontakt und interne Systeme.",
    color: "#0FA4A0",
    status: "active",
    credits: 120,
    hours: 20,
    zertifikat: "Trainee Zertifikat",
    module: [trainee1, trainee2, trainee3, trainee4, trainee5, trainee6],
  },

  // ========== 2. VBV GRUNDAUSBILDUNG (30h) ==========
  {
    id: 2,
    title: "VBV Grundausbildung",
    description: "Pflichtausbildung für die VBV-Zertifizierung 2026. 30 Stunden Lernstoff: Versicherungswirtschaft, Recht, Sachversicherung, Personenversicherung, Beratung und Abschlussprüfung.",
    color: "#022350",
    status: "locked",
    credits: 200,
    hours: 30,
    prerequisite: "Trainee Grundausbildung",
    zertifikat: "VBV Grundausbildung Zertifikat",
    examInfo: "Online-Prüfung mit Proctoring, 30 Min., CHF 400",
    module: [m1, m2, m3, m4, m5, m6],
  },

  // ========== 3. VBV KRANKENKASSENZUSATZ (20h) ==========
  {
    id: 3,
    title: "VBV Krankenkassenzusatz",
    description: "Spezialisierung Krankenzusatzversicherung. 20 Stunden: KVG-Grundlagen, Zusatzversicherungen, Spitalzusatz, Alternativmedizin, Verkauf und VBV-Prüfung.",
    color: "#1B6FC2",
    status: "locked",
    credits: 150,
    hours: 20,
    prerequisite: "VBV Grundausbildung",
    zertifikat: "VBV Krankenzusatz Zertifikat",
    examInfo: "Online-Prüfung mit Proctoring, 30 Min., CHF 100",
    module: [kk1, kk2, kk3, kk4],
  },

  // ========== 4. VBV SACH- UND VERMÖGENSVERSICHERUNG (20h) ==========
  {
    id: 4,
    title: "VBV Sach- und Vermögensversicherung",
    description: "Spezialisierung Nicht-Leben. 20 Stunden: Gebäude, Hausrat, Haftpflicht, Motorfahrzeug, Gewerbe, Cyber und VBV-Prüfung.",
    color: "#C8A24D",
    status: "locked",
    credits: 150,
    hours: 20,
    prerequisite: "VBV Grundausbildung",
    zertifikat: "VBV Sach & Vermögen Zertifikat",
    examInfo: "Online-Prüfung mit Proctoring, 60 Min., CHF 100",
    module: [sv1, sv2, sv3, sv4, sv5],
  },

  // ========== 5. VBV MÜNDLICHE PRÜFUNG (20h) ==========
  {
    id: 5,
    title: "VBV Mündliche Prüfung",
    description: "Vorbereitung auf die mündliche VBV-Prüfung. 20 Stunden: Gesprächsführung, Bedarfsanalyse, Einwandbehandlung, Rollenspiele und Prüfungssimulation.",
    color: "#C0392B",
    status: "locked",
    credits: 150,
    hours: 20,
    prerequisite: "VBV Grundausbildung",
    zertifikat: "VBV Mündlich Zertifikat",
    examInfo: "Mündliche Prüfung vor Ort in Bern, 30 Min., CHF 200",
    module: [mu1, mu2, mu3, mu4, mu5],
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
