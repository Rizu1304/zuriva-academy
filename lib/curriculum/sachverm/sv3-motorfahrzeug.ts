import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv3", title: "Motorfahrzeugversicherung", description: "Haftpflicht, Kasko, Zusatzdeckungen", credits: 20, lektionen: [
  { id: "sv3-1", title: "Einführung: Motorfahrzeugversicherung", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Motorfahrzeugversicherung", content: "Haftpflicht, Kasko, Zusatzdeckungen - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Motorfahrzeugversicherung. Haftpflicht, Kasko, Zusatzdeckungen." },
  ] } },
  { id: "sv3-2", title: "Vertiefung: Motorfahrzeugversicherung", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Haftpflicht, Kasko, Zusatzdeckungen.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "sv3-3", title: "Quiz: Motorfahrzeugversicherung", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Motorfahrzeugversicherung", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Motorfahrzeugversicherung." },
  ] } },
] };
export default m;
