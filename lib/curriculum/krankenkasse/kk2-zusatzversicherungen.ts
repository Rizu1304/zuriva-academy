import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "kk2", title: "Zusatzversicherungen", description: "Spital, Alternativ, Zahn, Ausland", credits: 20, lektionen: [
  { id: "kk2-1", title: "Einführung: Zusatzversicherungen", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Zusatzversicherungen", content: "Spital, Alternativ, Zahn, Ausland - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Zusatzversicherungen. Spital, Alternativ, Zahn, Ausland." },
  ] } },
  { id: "kk2-2", title: "Vertiefung: Zusatzversicherungen", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Spital, Alternativ, Zahn, Ausland.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "kk2-3", title: "Quiz: Zusatzversicherungen", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Zusatzversicherungen", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Zusatzversicherungen." },
  ] } },
] };
export default m;
