import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv3", title: "Motorfahrzeugversicherung", description: "Haftpflicht, Teil-/Vollkasko, Bonus, E-Mobilität", credits: 25, lektionen: [
  { id: "sv3-1", title: "Einführung: Motorfahrzeugversicherung", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Motorfahrzeugversicherung", content: "Haftpflicht, Teil-/Vollkasko, Bonus, E-Mobilität", bulletPoints: ["Praxisnahes Wissen für die VBV-Prüfung Nicht-Leben", "Echte Schweizer Zahlen und Gesetze 2026", "Fallbeispiele aus dem Beratungsalltag", "Tipps für die Kundenberatung"], speakText: "Willkommen zum Modul Motorfahrzeugversicherung. Haftpflicht, Teil-/Vollkasko, Bonus, E-Mobilität. Dieses Modul bereitet dich optimal auf die VBV-Prüfung Nicht-Leben vor." },
  ] } },
  { id: "sv3-2", title: "Vertiefung: Motorfahrzeugversicherung", type: "text", duration: "30 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Haftpflicht, Teil-/Vollkasko, Bonus, E-Mobilität.", "Alle Inhalte sind auf die VBV-Prüfung Nicht-Leben ausgerichtet (Online-Prüfung, 60 Min., CHF 100).", "Du lernst die wichtigsten Produkte, Deckungen und Ausschlüsse kennen.", "Am Ende wartet ein Quiz mit prüfungsrelevanten Fragen."] } },
  { id: "sv3-3", title: "Quiz: Motorfahrzeugversicherung", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Was sind die GUSTAVO-Kantone?", options: ["Alle Westschweizer Kantone", "GE, UR, SZ, TI, AI, VS, OW", "Kantone mit hohen Prämien", "Kantone ohne Versicherungspflicht"], correctIndex: 1, explanation: "GUSTAVO = Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis, Obwalden." },
    { text: "Was passiert bei Unterversicherung?", options: ["Volle Leistung", "Proportionale Kürzung", "Vertragsauflösung", "Prämienerhöhung"], correctIndex: 1, explanation: "Bei Unterversicherung wird die Leistung proportional gekürzt." },
    { text: "Ist die MF-Haftpflicht obligatorisch?", options: ["Nein", "Ja", "Nur für Neuwagen", "Nur in Städten"], correctIndex: 1, explanation: "Die Motorfahrzeug-Haftpflichtversicherung ist in der Schweiz obligatorisch." },
  ] } },
] };
export default m;
