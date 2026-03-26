import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t5", title: "Tools und Systeme", description: "CRM, Vergleichstools, Offertenerstellung und digitale Arbeitsweise", credits: 20, lektionen: [
  { id: "t5-1", title: "Digitale Arbeitsweise", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Dein digitaler Arbeitsplatz", content: "Tools die du täglich nutzen wirst:", bulletPoints: ["CRM-System: Kundendaten, Termine, Aufgaben verwalten", "Vergleichsrechner: Prämien verschiedener Anbieter vergleichen", "Offertentool: Professionelle Offerten in Minuten erstellen", "E-Signatur: Verträge digital unterschreiben lassen", "Zuriva Academy: Weiterbildung und Wissenstest", "Aura KI: Dein KI-Assistent für Fachfragen"], speakText: "Du wirst täglich mit CRM, Vergleichsrechner, Offertentool, E-Signatur und der Zuriva Academy arbeiten." },
    { title: "Der Beratungsprozess digital", content: "So läuft eine moderne Beratung:", bulletPoints: ["1. Vorbereitung: Kundendaten im CRM prüfen", "2. Bedarfsanalyse: Fragebogen digital ausfüllen", "3. Vergleich: Mehrere Anbieter in Sekunden vergleichen", "4. Offerte: Professionell gestaltet, per E-Mail oder vor Ort", "5. Abschluss: E-Signatur oder Papier", "6. Nachbetreuung: Reminder im CRM für Follow-ups"], speakText: "Der moderne Beratungsprozess ist digital unterstützt. Von der Vorbereitung im CRM über den Vergleich bis zum Abschluss mit E-Signatur." },
  ] } },
  { id: "t5-2", title: "Datenschutz und Sicherheit", type: "text", duration: "15 Min.", completed: false, content: { type: "text", paragraphs: [
    "Datenschutz ist nicht nur Gesetz, sondern Vertrauensbasis. Als Versicherungsvermittler arbeitest du mit hochsensiblen Personendaten.",
    "Das Datenschutzgesetz (DSG) der Schweiz wurde per 1. September 2023 komplett revidiert. Es gilt für alle Personen und Unternehmen, die Personendaten bearbeiten.",
    "Deine Pflichten: Personendaten nur für den vereinbarten Zweck verwenden. Daten nur so lange aufbewahren wie nötig. Auskunftsrecht: Jeder Kunde kann jederzeit seine Daten einsehen. Datenschutzverletzungen müssen dem EDÖB gemeldet werden.",
    "Praktische Tipps: Laptop immer sperren wenn du den Platz verlässt. Kundendaten nie per unverschlüsselter E-Mail senden. Passwörter regelmässig ändern und nie teilen. Papierdokumente shreddern, nicht im Altpapier entsorgen. Mobile Geräte mit PIN/Fingerabdruck schützen.",
    "Verstösse gegen das DSG können mit Bussen bis CHF 250'000 bestraft werden. Schütze dich und deine Kunden.",
  ] } },
  { id: "t5-3", title: "Quiz: Tools und Systeme", type: "quiz", duration: "10 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welches Tool nutzt du für Kundenverwaltung?", options: ["Excel", "CRM-System", "WhatsApp", "Taschenrechner"], correctIndex: 1, explanation: "Das CRM-System ist zentral für die Verwaltung von Kundendaten, Terminen und Aufgaben." },
    { text: "Seit wann gilt das revidierte DSG?", options: ["2020", "2023", "2025", "2026"], correctIndex: 1, explanation: "Das revidierte Datenschutzgesetz gilt seit dem 1. September 2023." },
    { text: "Wie hoch können DSG-Bussen sein?", options: ["CHF 1'000", "CHF 50'000", "CHF 250'000", "CHF 1 Mio."], correctIndex: 2, explanation: "Verstösse gegen das DSG können mit Bussen bis CHF 250'000 bestraft werden." },
  ] } },
] };
export default m;
