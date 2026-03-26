import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "mu3", title: "Einwand und Abschluss", description: "Einwandbehandlung, Bumerang-Technik, Abschlusstechniken", credits: 25, lektionen: [
  { id: "mu3-1", title: "Einführung: Einwand und Abschluss", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Einwand und Abschluss", content: "Einwandbehandlung, Bumerang-Technik, Abschlusstechniken", bulletPoints: ["Praxisorientierte Vorbereitung auf die mündliche Prüfung", "Rollenspiele mit realistischen Kundenszenarien", "Tipps von erfahrenen Prüfungsexperten", "Feedback und Verbesserungsvorschläge"], speakText: "Willkommen zum Modul Einwand und Abschluss. Einwandbehandlung, Bumerang-Technik, Abschlusstechniken. Dieses Modul bereitet dich auf die mündliche VBV-Prüfung vor Ort in Bern vor." },
  ] } },
  { id: "mu3-2", title: "Vertiefung: Einwand und Abschluss", type: "text", duration: "30 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Einwandbehandlung, Bumerang-Technik, Abschlusstechniken.", "Die mündliche Prüfung dauert 30 Minuten und findet vor Ort in Bern statt. Kosten: CHF 200.", "Ein Experte spielt den Kunden, ein zweiter protokolliert. Die Fallbeschreibung kommt aus dem Bereich Privater Haushalt oder kleine Unternehmen.", "Du musst Fach-, Methoden- und Sozialkompetenz unter Beweis stellen."] } },
  { id: "mu3-3", title: "Quiz: Einwand und Abschluss", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Wo findet die mündliche VBV-Prüfung statt?", options: ["Online", "Zürich", "Bern", "Basel"], correctIndex: 2, explanation: "Die mündliche Prüfung findet vor Ort in Bern statt." },
    { text: "Wie lange dauert die mündliche Prüfung?", options: ["15 Min.", "30 Min.", "60 Min.", "90 Min."], correctIndex: 1, explanation: "Die mündliche Prüfung dauert 30 Minuten." },
    { text: "Was ist der erste Schritt im Beratungsgespräch?", options: ["Produkt verkaufen", "Bedarfsanalyse", "Vertrag unterschreiben", "Prämie berechnen"], correctIndex: 1, explanation: "Die Bedarfsanalyse steht immer am Anfang." },
  ] } },
] };
export default m;
