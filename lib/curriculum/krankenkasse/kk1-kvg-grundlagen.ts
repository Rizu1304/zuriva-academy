import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "kk1", title: "KVG Grundlagen", description: "Obligatorische Krankenversicherung", credits: 20, lektionen: [
  { id: "kk1-1", title: "Einführung: KVG Grundlagen", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "KVG Grundlagen", content: "Obligatorische Krankenversicherung - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul KVG Grundlagen. Obligatorische Krankenversicherung." },
  ] } },
  { id: "kk1-2", title: "Vertiefung: KVG Grundlagen", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Obligatorische Krankenversicherung.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "kk1-3", title: "Quiz: KVG Grundlagen", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "KVG Grundlagen", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt KVG Grundlagen." },
  ] } },
] };
export default m;
