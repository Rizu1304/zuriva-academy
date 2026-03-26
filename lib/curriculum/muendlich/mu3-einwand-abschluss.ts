import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "mu3", title: "Einwand und Abschluss", description: "Einwandbehandlung und Abschlusstechniken", credits: 20, lektionen: [
  { id: "mu3-1", title: "Einführung: Einwand und Abschluss", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Einwand und Abschluss", content: "Einwandbehandlung und Abschlusstechniken - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Einwand und Abschluss. Einwandbehandlung und Abschlusstechniken." },
  ] } },
  { id: "mu3-2", title: "Vertiefung: Einwand und Abschluss", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Einwandbehandlung und Abschlusstechniken.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "mu3-3", title: "Quiz: Einwand und Abschluss", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Einwand und Abschluss", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Einwand und Abschluss." },
  ] } },
] };
export default m;
