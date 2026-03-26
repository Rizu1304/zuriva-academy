import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "sv1", title: "Gebäudeversicherung vertieft", description: "Kantonale Systeme, GUSTAVO, Wertermittlung, Prämien", credits: 25, lektionen: [
  { id: "sv1-1", title: "Einführung: Gebäudeversicherung vertieft", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Gebäudeversicherung vertieft", content: "Kantonale Systeme, GUSTAVO, Wertermittlung, Prämien", bulletPoints: ["Praxisnahes Wissen für die VBV-Prüfung Nicht-Leben", "Echte Schweizer Zahlen und Gesetze 2026", "Fallbeispiele aus dem Beratungsalltag", "Tipps für die Kundenberatung"], speakText: "Willkommen zum Modul Gebäudeversicherung vertieft. Kantonale Systeme, GUSTAVO, Wertermittlung, Prämien. Dieses Modul bereitet dich optimal auf die VBV-Prüfung Nicht-Leben vor." },
  ] } },
  { id: "sv1-2", title: "Vertiefung: Gebäudeversicherung vertieft", type: "text", duration: "30 Min.", completed: false, content: { type: "text", paragraphs: ["Dieses Modul behandelt Kantonale Systeme, GUSTAVO, Wertermittlung, Prämien.", "Alle Inhalte sind auf die VBV-Prüfung Nicht-Leben ausgerichtet (Online-Prüfung, 60 Min., CHF 100).", "Du lernst die wichtigsten Produkte, Deckungen und Ausschlüsse kennen.", "Am Ende wartet ein Quiz mit prüfungsrelevanten Fragen."] } },
  { id: "sv1-3", title: "Quiz: Gebäudeversicherung vertieft", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Was sind die GUSTAVO-Kantone?", options: ["Alle Westschweizer Kantone", "GE, UR, SZ, TI, AI, VS, OW", "Kantone mit hohen Prämien", "Kantone ohne Versicherungspflicht"], correctIndex: 1, explanation: "GUSTAVO = Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis, Obwalden." },
    { text: "Was passiert bei Unterversicherung?", options: ["Volle Leistung", "Proportionale Kürzung", "Vertragsauflösung", "Prämienerhöhung"], correctIndex: 1, explanation: "Bei Unterversicherung wird die Leistung proportional gekürzt." },
    { text: "Ist die MF-Haftpflicht obligatorisch?", options: ["Nein", "Ja", "Nur für Neuwagen", "Nur in Städten"], correctIndex: 1, explanation: "Die Motorfahrzeug-Haftpflichtversicherung ist in der Schweiz obligatorisch." },
  ] } },
] };
export default m;
