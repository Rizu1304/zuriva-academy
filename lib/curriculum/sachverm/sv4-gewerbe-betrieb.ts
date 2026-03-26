import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv4", title: "Gewerbe und Betrieb", description: "Betriebssach, BU, Cyber, D&O, Transport", credits: 25, lektionen: [
  { id: "sv4-1", title: "Einführung: Gewerbe und Betrieb", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Gewerbe und Betrieb", content: "Betriebssach, BU, Cyber, D&O, Transport", bulletPoints: ["Praxisnahes Wissen für die VBV-Prüfung Nicht-Leben", "Echte Schweizer Zahlen und Gesetze 2026", "Fallbeispiele aus dem Beratungsalltag", "Tipps für die Kundenberatung"], speakText: "Willkommen zum Modul Gewerbe und Betrieb. Betriebssach, BU, Cyber, D&O, Transport. Dieses Modul bereitet dich optimal auf die VBV-Prüfung Nicht-Leben vor." },
  ] } },
  { id: "sv4-2", title: "Vertiefung: Gewerbe und Betrieb", type: "text", duration: "30 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Betriebssach, BU, Cyber, D&O, Transport.", "Alle Inhalte sind auf die VBV-Prüfung Nicht-Leben ausgerichtet (Online-Prüfung, 60 Min., CHF 100).", "Du lernst die wichtigsten Produkte, Deckungen und Ausschlüsse kennen.", "Am Ende wartet ein Quiz mit prüfungsrelevanten Fragen."] } },
  { id: "sv4-3", title: "Quiz: Gewerbe und Betrieb", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Was sind die GUSTAVO-Kantone?", options: ["Alle Westschweizer Kantone", "GE, UR, SZ, TI, AI, VS, OW", "Kantone mit hohen Prämien", "Kantone ohne Versicherungspflicht"], correctIndex: 1, explanation: "GUSTAVO = Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis, Obwalden." },
    { text: "Was passiert bei Unterversicherung?", options: ["Volle Leistung", "Proportionale Kürzung", "Vertragsauflösung", "Prämienerhöhung"], correctIndex: 1, explanation: "Bei Unterversicherung wird die Leistung proportional gekürzt." },
    { text: "Ist die MF-Haftpflicht obligatorisch?", options: ["Nein", "Ja", "Nur für Neuwagen", "Nur in Städten"], correctIndex: 1, explanation: "Die Motorfahrzeug-Haftpflichtversicherung ist in der Schweiz obligatorisch." },
  ] } },
] };
export default m;
