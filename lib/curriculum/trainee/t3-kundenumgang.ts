import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t3", title: "Kundenumgang Basics", description: "Erster Kontakt und professionelles Auftreten", credits: 20, lektionen: [
  { id: "t3-1", title: "Einführung: Kundenumgang Basics", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Kundenumgang Basics", content: "Erster Kontakt und professionelles Auftreten - Detaillierter Inhalt wird geladen.", bulletPoints: ["Modul wird aktuell mit Inhalten befüllt", "Alle Themen basieren auf aktuellem VBV-Prüfungsstoff 2026", "Echte Schweizer Zahlen und Fakten", "Praxisnahe Beispiele und Übungen"], speakText: "Willkommen zum Modul Kundenumgang Basics. Erster Kontakt und professionelles Auftreten." },
  ] } },
  { id: "t3-2", title: "Vertiefung: Kundenumgang Basics", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Erster Kontakt und professionelles Auftreten.", "Der Inhalt wird laufend mit aktuellem VBV-Prüfungsstoff 2026 ergänzt.", "Alle Zahlen und Fakten entsprechen dem aktuellen Stand der Schweizer Versicherungsbranche.", "Am Ende des Moduls wartet ein Quiz zur Lernkontrolle."] } },
  { id: "t3-3", title: "Quiz: Kundenumgang Basics", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Thema behandelt dieses Modul?", options: ["Kochrezepte", "Kundenumgang Basics", "Astronomie", "Sportregeln"], correctIndex: 1, explanation: "Dieses Modul behandelt Kundenumgang Basics." },
  ] } },
] };
export default m;
