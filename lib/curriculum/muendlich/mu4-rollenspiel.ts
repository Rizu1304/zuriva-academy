import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "mu4", title: "Rollenspiele", description: "Kundenszenarien üben, Prüfungssimulation", credits: 25, lektionen: [
  { id: "mu4-1", title: "Einführung: Rollenspiele", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Rollenspiele", content: "Kundenszenarien üben, Prüfungssimulation", bulletPoints: ["Praxisorientierte Vorbereitung auf die mündliche Prüfung", "Rollenspiele mit realistischen Kundenszenarien", "Tipps von erfahrenen Prüfungsexperten", "Feedback und Verbesserungsvorschläge"], speakText: "Willkommen zum Modul Rollenspiele. Kundenszenarien üben, Prüfungssimulation. Dieses Modul bereitet dich auf die mündliche VBV-Prüfung vor Ort in Bern vor." },
  ] } },
  { id: "mu4-2", title: "Vertiefung: Rollenspiele", type: "text", duration: "30 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Kundenszenarien üben, Prüfungssimulation.", "Die mündliche Prüfung dauert 30 Minuten und findet vor Ort in Bern statt. Kosten: CHF 200.", "Ein Experte spielt den Kunden, ein zweiter protokolliert. Die Fallbeschreibung kommt aus dem Bereich Privater Haushalt oder kleine Unternehmen.", "Du musst Fach-, Methoden- und Sozialkompetenz unter Beweis stellen."] } },
  { id: "mu4-3", title: "Quiz: Rollenspiele", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Wo findet die mündliche VBV-Prüfung statt?", options: ["Online", "Zürich", "Bern", "Basel"], correctIndex: 2, explanation: "Die mündliche Prüfung findet vor Ort in Bern statt." },
    { text: "Wie lange dauert die mündliche Prüfung?", options: ["15 Min.", "30 Min.", "60 Min.", "90 Min."], correctIndex: 1, explanation: "Die mündliche Prüfung dauert 30 Minuten." },
    { text: "Was ist der erste Schritt im Beratungsgespräch?", options: ["Produkt verkaufen", "Bedarfsanalyse", "Vertrag unterschreiben", "Prämie berechnen"], correctIndex: 1, explanation: "Die Bedarfsanalyse steht immer am Anfang." },
  ] } },
] };
export default m;
