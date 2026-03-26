import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv4", title: "Gewerbe und Betrieb", description: "Betriebssach, BU, Cyber, D&O", credits: 20, lektionen: [
  { id: "sv4-1", title: "Einführung: Gewerbe und Betrieb", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Gewerbe und Betrieb", content: "Betriebssach, BU, Cyber, D&O - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Gewerbe und Betrieb. Betriebssach, BU, Cyber, D&O." },
  ] } },
  { id: "sv4-2", title: "Vertiefung: Gewerbe und Betrieb", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Betriebssach, BU, Cyber, D&O.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "sv4-3", title: "Quiz: Gewerbe und Betrieb", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Gewerbe und Betrieb", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Gewerbe und Betrieb." },
  ] } },
] };
export default m;
