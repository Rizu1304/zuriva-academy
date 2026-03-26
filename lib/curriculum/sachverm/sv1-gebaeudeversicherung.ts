import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv1", title: "Gebäudeversicherung", description: "Kantonale Systeme und GUSTAVO", credits: 20, lektionen: [
  { id: "sv1-1", title: "Einführung: Gebäudeversicherung", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Gebäudeversicherung", content: "Kantonale Systeme und GUSTAVO - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Gebäudeversicherung. Kantonale Systeme und GUSTAVO." },
  ] } },
  { id: "sv1-2", title: "Vertiefung: Gebäudeversicherung", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Kantonale Systeme und GUSTAVO.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "sv1-3", title: "Quiz: Gebäudeversicherung", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Gebäudeversicherung", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Gebäudeversicherung." },
  ] } },
] };
export default m;
