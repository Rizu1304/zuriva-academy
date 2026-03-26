import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t5", title: "Tools und Systeme", description: "Interne Systeme und digitale Werkzeuge", credits: 20, lektionen: [
  { id: "t5-1", title: "Einführung: Tools und Systeme", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Tools und Systeme", content: "Interne Systeme und digitale Werkzeuge - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Tools und Systeme. Interne Systeme und digitale Werkzeuge." },
  ] } },
  { id: "t5-2", title: "Vertiefung: Tools und Systeme", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Interne Systeme und digitale Werkzeuge.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "t5-3", title: "Quiz: Tools und Systeme", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Tools und Systeme", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Tools und Systeme." },
  ] } },
] };
export default m;
