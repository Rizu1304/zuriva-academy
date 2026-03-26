import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t6", title: "Trainee Abschlusstest", description: "Prüfungssimulation Trainee", credits: 20, lektionen: [
  { id: "t6-1", title: "Einführung: Trainee Abschlusstest", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Trainee Abschlusstest", content: "Prüfungssimulation Trainee - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Trainee Abschlusstest. Prüfungssimulation Trainee." },
  ] } },
  { id: "t6-2", title: "Vertiefung: Trainee Abschlusstest", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Prüfungssimulation Trainee.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "t6-3", title: "Quiz: Trainee Abschlusstest", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Trainee Abschlusstest", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Trainee Abschlusstest." },
  ] } },
] };
export default m;
