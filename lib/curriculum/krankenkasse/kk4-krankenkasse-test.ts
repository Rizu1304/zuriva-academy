import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "kk4", title: "VBV Krankenkasse Test", description: "Prüfungssimulation Krankenzusatzversicherung", credits: 25, lektionen: [
  { id: "kk4-1", title: "Prüfungsvorbereitung", type: "text", duration: "10 Min.", completed: false, content: { type: "text", paragraphs: [
    "Die VBV-Prüfung Krankenzusatzversicherung ist eine Online-Fernprüfung mit Proctoring. Dauer: 30 Minuten. Kosten: CHF 100.",
    "Geprüft werden: KVG-Grundlagen, Zusatzversicherungen (VVG), Beratungskompetenz im Bereich Krankenversicherung.",
    "Format: Wissens- und Verständnisfragen sowie geleitete Fallbearbeitung.",
    "Tipp: Konzentriere dich auf den Unterschied KVG vs. VVG, die Beratung zum Kassenwechsel und die verschiedenen Zusatzprodukte.",
  ] } },
  { id: "kk4-2", title: "Probequiz Krankenzusatz", type: "quiz", duration: "30 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welchem Gesetz unterliegt die Grundversicherung?", options: ["VVG", "KVG", "OR", "VAG"], correctIndex: 1, explanation: "Die Grundversicherung unterliegt dem KVG." },
    { text: "Gilt Aufnahmepflicht bei Zusatzversicherungen?", options: ["Ja, immer", "Nein, Gesundheitsprüfung möglich", "Nur für Kinder", "Nur im Dezember"], correctIndex: 1, explanation: "Bei VVG-Zusatzversicherungen gibt es keine Aufnahmepflicht." },
    { text: "Maximale KVG-Franchise Erwachsene?", options: ["CHF 300", "CHF 1'500", "CHF 2'500", "CHF 5'000"], correctIndex: 2, explanation: "CHF 2'500 ist das Maximum." },
    { text: "Was deckt das KVG bei Zahnbehandlung?", options: ["Alles", "Nur unfallbedingt", "Bis CHF 1'000", "Nur für Kinder"], correctIndex: 1, explanation: "KVG deckt Zahnbehandlung nur bei Unfall." },
    { text: "Maximaler Selbstbehalt KVG pro Jahr?", options: ["CHF 350", "CHF 500", "CHF 700", "CHF 1'000"], correctIndex: 2, explanation: "Max. CHF 700/Jahr für Erwachsene." },
    { text: "Was bedeutet 'Halbprivat'?", options: ["Halbe Prämie", "Zweibettzimmer, freie Spitalwahl", "50% Selbstbehalt", "Nur ambulant"], correctIndex: 1, explanation: "Halbprivat = Zweibettzimmer mit freier Spitalwahl." },
    { text: "Wann Grundversicherung kündigen?", options: ["Sofort", "Per 30. November", "Per 31. Dezember", "Jederzeit"], correctIndex: 1, explanation: "Ordentliche Kündigung per 30. November." },
    { text: "Was zuerst bei Kassenwechsel?", options: ["Grundversicherung kündigen", "Zusatzversicherung bei neuer Kasse beantragen", "Arzt wechseln", "Franchise ändern"], correctIndex: 1, explanation: "IMMER zuerst Zusatz beantragen, dann Grund kündigen." },
    { text: "Wie viel spart ein HMO-Modell typisch?", options: ["5%", "10%", "Bis 25%", "50%"], correctIndex: 2, explanation: "HMO-Modelle können bis 25% Prämie einsparen." },
    { text: "VBV-Prüfung Krankenzusatz: Dauer?", options: ["15 Min.", "30 Min.", "60 Min.", "90 Min."], correctIndex: 1, explanation: "Die Prüfung dauert 30 Minuten." },
  ] } },
] };
export default m;
