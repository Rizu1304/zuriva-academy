import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "mu2", title: "Bedarfsanalyse meistern", description: "Die richtigen Fragen stellen", credits: 20, lektionen: [
  { id: "mu2-1", title: "Einführung: Bedarfsanalyse meistern", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Bedarfsanalyse meistern", content: "Die richtigen Fragen stellen - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Bedarfsanalyse meistern. Die richtigen Fragen stellen." },
  ] } },
  { id: "mu2-2", title: "Vertiefung: Bedarfsanalyse meistern", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Die richtigen Fragen stellen.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "mu2-3", title: "Quiz: Bedarfsanalyse meistern", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Bedarfsanalyse meistern", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Bedarfsanalyse meistern." },
  ] } },
] };
export default m;
