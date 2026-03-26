import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t4", title: "Produkte Grundwissen", description: "Überblick aller Versicherungsprodukte", credits: 20, lektionen: [
  { id: "t4-1", title: "Einführung: Produkte Grundwissen", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Produkte Grundwissen", content: "Überblick aller Versicherungsprodukte - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Produkte Grundwissen. Überblick aller Versicherungsprodukte." },
  ] } },
  { id: "t4-2", title: "Vertiefung: Produkte Grundwissen", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Überblick aller Versicherungsprodukte.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "t4-3", title: "Quiz: Produkte Grundwissen", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Produkte Grundwissen", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Produkte Grundwissen." },
  ] } },
] };
export default m;
