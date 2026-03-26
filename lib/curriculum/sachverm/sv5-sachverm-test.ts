import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv5", title: "VBV Sach und Vermögen Test", description: "Prüfungssimulation Nicht-Leben 60 Min.", credits: 25, lektionen: [
  { id: "sv5-1", title: "Einführung: VBV Sach und Vermögen Test", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "VBV Sach und Vermögen Test", content: "Prüfungssimulation Nicht-Leben 60 Min.", bulletPoints: ["Praxisnahes Wissen für die VBV-Prüfung Nicht-Leben", "Echte Schweizer Zahlen und Gesetze 2026", "Fallbeispiele aus dem Beratungsalltag", "Tipps für die Kundenberatung"], speakText: "Willkommen zum Modul VBV Sach und Vermögen Test. Prüfungssimulation Nicht-Leben 60 Min.. Dieses Modul bereitet dich optimal auf die VBV-Prüfung Nicht-Leben vor." },
  ] } },
  { id: "sv5-2", title: "Vertiefung: VBV Sach und Vermögen Test", type: "text", duration: "30 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Prüfungssimulation Nicht-Leben 60 Min..", "Alle Inhalte sind auf die VBV-Prüfung Nicht-Leben ausgerichtet (Online-Prüfung, 60 Min., CHF 100).", "Du lernst die wichtigsten Produkte, Deckungen und Ausschlüsse kennen.", "Am Ende wartet ein Quiz mit prüfungsrelevanten Fragen."] } },
  { id: "sv5-3", title: "Quiz: VBV Sach und Vermögen Test", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Was sind die GUSTAVO-Kantone?", options: ["Alle Westschweizer Kantone", "GE, UR, SZ, TI, AI, VS, OW", "Kantone mit hohen Prämien", "Kantone ohne Versicherungspflicht"], correctIndex: 1, explanation: "GUSTAVO = Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis, Obwalden." },
    { text: "Was passiert bei Unterversicherung?", options: ["Volle Leistung", "Proportionale Kürzung", "Vertragsauflösung", "Prämienerhöhung"], correctIndex: 1, explanation: "Bei Unterversicherung wird die Leistung proportional gekürzt." },
    { text: "Ist die MF-Haftpflicht obligatorisch?", options: ["Nein", "Ja", "Nur für Neuwagen", "Nur in Städten"], correctIndex: 1, explanation: "Die Motorfahrzeug-Haftpflichtversicherung ist in der Schweiz obligatorisch." },
  ] } },
] };
export default m;
