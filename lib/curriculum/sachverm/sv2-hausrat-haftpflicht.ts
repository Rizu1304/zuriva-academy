import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv2", title: "Hausrat und Haftpflicht", description: "Privat- und Betriebshaftpflicht, Produkthaftpflicht", credits: 25, lektionen: [
  { id: "sv2-1", title: "Einführung: Hausrat und Haftpflicht", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Hausrat und Haftpflicht", content: "Privat- und Betriebshaftpflicht, Produkthaftpflicht", bulletPoints: ["Praxisnahes Wissen für die VBV-Prüfung Nicht-Leben", "Echte Schweizer Zahlen und Gesetze 2026", "Fallbeispiele aus dem Beratungsalltag", "Tipps für die Kundenberatung"], speakText: "Willkommen zum Modul Hausrat und Haftpflicht. Privat- und Betriebshaftpflicht, Produkthaftpflicht. Dieses Modul bereitet dich optimal auf die VBV-Prüfung Nicht-Leben vor." },
  ] } },
  { id: "sv2-2", title: "Vertiefung: Hausrat und Haftpflicht", type: "text", duration: "30 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Privat- und Betriebshaftpflicht, Produkthaftpflicht.", "Alle Inhalte sind auf die VBV-Prüfung Nicht-Leben ausgerichtet (Online-Prüfung, 60 Min., CHF 100).", "Du lernst die wichtigsten Produkte, Deckungen und Ausschlüsse kennen.", "Am Ende wartet ein Quiz mit prüfungsrelevanten Fragen."] } },
  { id: "sv2-3", title: "Quiz: Hausrat und Haftpflicht", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Was sind die GUSTAVO-Kantone?", options: ["Alle Westschweizer Kantone", "GE, UR, SZ, TI, AI, VS, OW", "Kantone mit hohen Prämien", "Kantone ohne Versicherungspflicht"], correctIndex: 1, explanation: "GUSTAVO = Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis, Obwalden." },
    { text: "Was passiert bei Unterversicherung?", options: ["Volle Leistung", "Proportionale Kürzung", "Vertragsauflösung", "Prämienerhöhung"], correctIndex: 1, explanation: "Bei Unterversicherung wird die Leistung proportional gekürzt." },
    { text: "Ist die MF-Haftpflicht obligatorisch?", options: ["Nein", "Ja", "Nur für Neuwagen", "Nur in Städten"], correctIndex: 1, explanation: "Die Motorfahrzeug-Haftpflichtversicherung ist in der Schweiz obligatorisch." },
  ] } },
] };
export default m;
