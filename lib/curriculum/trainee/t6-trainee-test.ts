import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t6", title: "Trainee Abschlusstest", description: "Prüfungssimulation über alle Trainee-Module", credits: 10, lektionen: [
  { id: "t6-1", title: "Prüfungstipps", type: "text", duration: "10 Min.", completed: false, content: { type: "text", paragraphs: [
    "Du hast die Trainee Grundausbildung fast geschafft! Hier noch ein paar Tipps für den Abschlusstest.",
    "Lies jede Frage genau durch. Achte auf Wörter wie NICHT, IMMER, NIE. Schliesse zuerst die offensichtlich falschen Antworten aus. Wenn du unsicher bist, geh mit deinem Bauchgefühl.",
    "Du brauchst mindestens 70% um zu bestehen. Bei Nichtbestehen kannst du den Test wiederholen.",
    "Nach dem Bestehen wird der Lernpfad 'VBV Grundausbildung' freigeschaltet. Dort geht es richtig in die Tiefe.",
  ] } },
  { id: "t6-2", title: "Trainee Abschlussprüfung", type: "quiz", duration: "30 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Was bedeutet 'ungebundener Vermittler'?", options: ["Bei einer Versicherung angestellt", "Unabhängig, dem Kunden verpflichtet", "Ohne Ausbildung", "Nur online tätig"], correctIndex: 1, explanation: "Ungebundene Vermittler sind unabhängig und dem Kunden verpflichtet." },
    { text: "Prämienvolumen Schweizer Versicherungsmarkt?", options: ["CHF 50 Mrd.", "CHF 226.5 Mrd.", "CHF 500 Mrd.", "CHF 1 Bio."], correctIndex: 1, explanation: "Das Gesamtprämienvolumen beträgt CHF 226.5 Mrd." },
    { text: "Was ist die 13. AHV-Rente?", options: ["Rente für 13-Jährige", "Zusätzliche Monatsrente pro Jahr (neu 2026)", "Sonderrente", "Zuschlag"], correctIndex: 1, explanation: "Die 13. AHV-Rente wird erstmals im Dezember 2026 ausbezahlt." },
    { text: "AHV-Beitragssatz 2026?", options: ["8.70%", "10.60%", "12.40%", "15%"], correctIndex: 1, explanation: "10.60%, je 5.30% AG und AN." },
    { text: "Säule 3a Maximum 2026 mit PK?", options: ["CHF 5'000", "CHF 7'258", "CHF 10'000", "CHF 36'288"], correctIndex: 1, explanation: "CHF 7'258 für Angestellte mit Pensionskasse." },
    { text: "Wofür steht GUSTAVO?", options: ["Versicherer", "7 Kantone ohne Gebäudeversicherungsmonopol", "Prämienformel", "Gesetzesartikel"], correctIndex: 1, explanation: "GUSTAVO = GE, UR, SZ, TI, AI, VS, OW." },
    { text: "UVG-Höchstlohn 2026?", options: ["CHF 100'000", "CHF 126'000", "CHF 148'200", "CHF 200'000"], correctIndex: 2, explanation: "CHF 148'200 pro Jahr." },
    { text: "Erster Eindruck - wie viele Sekunden?", options: ["3 Sek.", "7 Sek.", "30 Sek.", "2 Min."], correctIndex: 1, explanation: "Der erste Eindruck entsteht in ca. 7 Sekunden." },
    { text: "Ist die Privathaftpflicht obligatorisch?", options: ["Ja", "Nein, aber empfohlen", "Nur für Firmen", "Nur ab 18"], correctIndex: 1, explanation: "Nicht obligatorisch, aber dringend empfohlen." },
    { text: "BVG-Obligatorium ab welchem Lohn?", options: ["CHF 15'000", "CHF 22'680", "CHF 30'000", "CHF 50'000"], correctIndex: 1, explanation: "Ab CHF 22'680 Jahreslohn." },
    { text: "DSG-Busse maximal?", options: ["CHF 10'000", "CHF 50'000", "CHF 250'000", "CHF 1 Mio."], correctIndex: 2, explanation: "Bis CHF 250'000." },
    { text: "Nr. 1 Risiko weltweit?", options: ["Naturkatastrophen", "Cybervorfälle", "Pandemie", "Inflation"], correctIndex: 1, explanation: "Cybervorfälle sind das Nr. 1 Risiko weltweit." },
  ] } },
] };
export default m;
