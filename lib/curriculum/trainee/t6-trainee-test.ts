import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t6", title: "Trainee Abschlusstest", description: "Prüfung über alle Trainee-Module", credits: 10, lektionen: [
  { id: "t6-1", title: "Prüfungstipps", type: "text", duration: "5 Min.", completed: false, content: { type: "text", paragraphs: [
    "Du hast die Trainee Grundausbildung fast geschafft! Jetzt kommt der Abschlusstest.",
    "Der Test enthält 15 Fragen aus allen 5 vorherigen Modulen. Du brauchst 70% um zu bestehen. Bei Nichtbestehen kannst du wiederholen.",
    "Tipps: Lies jede Frage genau. Achte auf Wörter wie NICHT, IMMER, NIE. Schliesse zuerst die falschen Antworten aus. Wenn unsicher: Geh mit dem Bauchgefühl.",
    "Nach dem Bestehen wird der Lernpfad 'VBV Grundausbildung' freigeschaltet. Viel Erfolg!",
  ] } },
  { id: "t6-2", title: "Trainee Abschlussprüfung", type: "quiz", duration: "20 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Was bedeutet 'ungebundener Vermittler'? (t1)", options: ["Bei einer Versicherung angestellt", "Unabhängig, dem Kunden verpflichtet", "Ohne Ausbildung", "Nur online beratend"], correctIndex: 1, explanation: "Modul 1: Ungebunden = unabhängig und dem Kunden verpflichtet." },
    { text: "Wie oft muss die VBV-Zertifizierung erneuert werden? (t1)", options: ["Jährlich", "Alle 2 Jahre", "Alle 5 Jahre", "Nie"], correctIndex: 1, explanation: "Modul 1: Rezertifizierung alle 2 Jahre." },
    { text: "Welcher ist der älteste Privatversicherer der Schweiz? (t2)", options: ["Zurich", "Helvetia", "Mobiliar", "AXA"], correctIndex: 2, explanation: "Modul 2: Mobiliar, gegründet 1826." },
    { text: "Wie hoch ist der AHV-Beitragssatz 2026? (t2)", options: ["8.70%", "10.60%", "12.40%", "15%"], correctIndex: 1, explanation: "Modul 2: 10.60%, je 5.30% AG und AN." },
    { text: "Maximale AHV-Rente 2026? (t2)", options: ["CHF 1'225/Mt.", "CHF 2'450/Mt.", "CHF 3'500/Mt.", "CHF 5'000/Mt."], correctIndex: 1, explanation: "Modul 2: Max. CHF 2'450/Monat." },
    { text: "Säule 3a Maximum 2026 mit PK? (t2)", options: ["CHF 5'000", "CHF 7'258", "CHF 10'000", "CHF 36'288"], correctIndex: 1, explanation: "Modul 2: CHF 7'258 mit Pensionskasse." },
    { text: "Wie viele Sekunden dauert der erste Eindruck? (t3)", options: ["3", "7", "30", "60"], correctIndex: 1, explanation: "Modul 3: 7 Sekunden." },
    { text: "Wie viel Prozent der Kommunikation ist nonverbal? (t3)", options: ["10%", "30%", "Über 55%", "90%"], correctIndex: 2, explanation: "Modul 3: Über 55% ist nonverbal." },
    { text: "Innert welcher Frist auf E-Mails antworten? (t3)", options: ["Sofort", "24 Stunden", "1 Woche", "Egal"], correctIndex: 1, explanation: "Modul 3: Innert 24 Stunden." },
    { text: "Ab wann gilt NBU-Versicherung (UVG)? (t4)", options: ["Immer", "Ab 8 Wochenstunden", "Ab 20h", "Ab 40h"], correctIndex: 1, explanation: "Modul 4: Ab 8 Wochenstunden beim gleichen AG." },
    { text: "Was bedeutet GUSTAVO? (t4)", options: ["Versicherungsprodukt", "7 Kantone ohne Monopol", "Prämienformel", "Gesetz"], correctIndex: 1, explanation: "Modul 4: 7 Kantone ohne Gebäudeversicherungsmonopol." },
    { text: "Ist Privathaftpflicht obligatorisch? (t4)", options: ["Ja", "Nein, aber empfohlen", "Nur für Firmen", "Nur ab 18"], correctIndex: 1, explanation: "Modul 4: Nicht obligatorisch, aber dringend empfohlen." },
    { text: "Seit wann gilt das revidierte DSG? (t5)", options: ["2020", "September 2023", "2025", "2026"], correctIndex: 1, explanation: "Modul 5: Seit 1. September 2023." },
    { text: "Maximale DSG-Busse? (t5)", options: ["CHF 10'000", "CHF 50'000", "CHF 250'000", "CHF 1 Mio."], correctIndex: 2, explanation: "Modul 5: Bis CHF 250'000." },
    { text: "Was ist das Nr. 1 Risiko weltweit? (t2)", options: ["Naturkatastrophen", "Cybervorfälle", "Pandemien", "Inflation"], correctIndex: 1, explanation: "Modul 2: Cybervorfälle mit 10 Prozentpunkten Vorsprung." },
  ] } },
] };
export default m;
