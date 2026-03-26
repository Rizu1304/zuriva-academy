import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "kk3", title: "Verkauf Krankenzusatz", description: "Beratung und Verkauf von Zusatzversicherungen", credits: 20, lektionen: [
  { id: "kk3-1", title: "Einführung: Verkauf Krankenzusatz", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Verkauf Krankenzusatz", content: "Beratung und Verkauf von Zusatzversicherungen - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Verkauf Krankenzusatz. Beratung und Verkauf von Zusatzversicherungen." },
  ] } },
  { id: "kk3-2", title: "Vertiefung: Verkauf Krankenzusatz", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Beratung und Verkauf von Zusatzversicherungen.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "kk3-3", title: "Quiz: Verkauf Krankenzusatz", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Verkauf Krankenzusatz", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Verkauf Krankenzusatz." },
  ] } },
] };
export default m;
