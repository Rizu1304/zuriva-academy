import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv2", title: "Hausrat und Haftpflicht", description: "Privat- und Betriebshaftpflicht", credits: 20, lektionen: [
  { id: "sv2-1", title: "Einführung: Hausrat und Haftpflicht", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Hausrat und Haftpflicht", content: "Privat- und Betriebshaftpflicht - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Hausrat und Haftpflicht. Privat- und Betriebshaftpflicht." },
  ] } },
  { id: "sv2-2", title: "Vertiefung: Hausrat und Haftpflicht", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Privat- und Betriebshaftpflicht.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "sv2-3", title: "Quiz: Hausrat und Haftpflicht", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Hausrat und Haftpflicht", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Hausrat und Haftpflicht." },
  ] } },
] };
export default m;
