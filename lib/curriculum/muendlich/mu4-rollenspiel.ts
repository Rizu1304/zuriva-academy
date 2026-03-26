import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "mu4", title: "Rollenspiele", description: "Kundenszenarien üben", credits: 20, lektionen: [
  { id: "mu4-1", title: "Einführung: Rollenspiele", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Rollenspiele", content: "Kundenszenarien üben - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Rollenspiele. Kundenszenarien üben." },
  ] } },
  { id: "mu4-2", title: "Vertiefung: Rollenspiele", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Kundenszenarien üben.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "mu4-3", title: "Quiz: Rollenspiele", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Rollenspiele", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Rollenspiele." },
  ] } },
] };
export default m;
