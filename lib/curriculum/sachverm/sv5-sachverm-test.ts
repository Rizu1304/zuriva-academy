import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv5", title: "VBV Sach und Vermögen Test", description: "Prüfungssimulation Nicht-Leben", credits: 20, lektionen: [
  { id: "sv5-1", title: "Einführung: VBV Sach und Vermögen Test", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "VBV Sach und Vermögen Test", content: "Prüfungssimulation Nicht-Leben - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul VBV Sach und Vermögen Test. Prüfungssimulation Nicht-Leben." },
  ] } },
  { id: "sv5-2", title: "Vertiefung: VBV Sach und Vermögen Test", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Prüfungssimulation Nicht-Leben.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "sv5-3", title: "Quiz: VBV Sach und Vermögen Test", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "VBV Sach und Vermögen Test", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt VBV Sach und Vermögen Test." },
  ] } },
] };
export default m;
