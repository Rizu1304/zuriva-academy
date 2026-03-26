import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "mu1", title: "Professionelle Gesprächsführung", description: "Struktur und Techniken", credits: 20, lektionen: [
  { id: "mu1-1", title: "Einführung: Professionelle Gesprächsführung", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Professionelle Gesprächsführung", content: "Struktur und Techniken - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Professionelle Gesprächsführung. Struktur und Techniken." },
  ] } },
  { id: "mu1-2", title: "Vertiefung: Professionelle Gesprächsführung", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Struktur und Techniken.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "mu1-3", title: "Quiz: Professionelle Gesprächsführung", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Professionelle Gesprächsführung", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Professionelle Gesprächsführung." },
  ] } },
] };
export default m;
