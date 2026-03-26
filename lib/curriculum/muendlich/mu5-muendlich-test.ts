import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "mu5", title: "VBV Mündliche Prüfung", description: "Prüfungssimulation mündlich", credits: 20, lektionen: [
  { id: "mu5-1", title: "Einführung: VBV Mündliche Prüfung", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "VBV Mündliche Prüfung", content: "Prüfungssimulation mündlich - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul VBV Mündliche Prüfung. Prüfungssimulation mündlich." },
  ] } },
  { id: "mu5-2", title: "Vertiefung: VBV Mündliche Prüfung", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Prüfungssimulation mündlich.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "mu5-3", title: "Quiz: VBV Mündliche Prüfung", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "VBV Mündliche Prüfung", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt VBV Mündliche Prüfung." },
  ] } },
] };
export default m;
