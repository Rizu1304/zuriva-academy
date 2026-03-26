import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "kk4", title: "VBV Krankenkasse Test", description: "Prüfungssimulation Krankenzusatz", credits: 20, lektionen: [
  { id: "kk4-1", title: "Einführung: VBV Krankenkasse Test", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "VBV Krankenkasse Test", content: "Prüfungssimulation Krankenzusatz - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul VBV Krankenkasse Test. Prüfungssimulation Krankenzusatz." },
  ] } },
  { id: "kk4-2", title: "Vertiefung: VBV Krankenkasse Test", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Prüfungssimulation Krankenzusatz.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "kk4-3", title: "Quiz: VBV Krankenkasse Test", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "VBV Krankenkasse Test", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt VBV Krankenkasse Test." },
  ] } },
] };
export default m;
