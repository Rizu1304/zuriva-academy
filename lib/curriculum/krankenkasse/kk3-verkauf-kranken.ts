import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "kk3", title: "Verkauf Krankenzusatz", description: "Beratung, Vergleich und Verkauf von Krankenzusatzversicherungen", credits: 30, lektionen: [
  { id: "kk3-1", title: "Bedarfsermittlung Krankenversicherung", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Die richtigen Fragen stellen", content: "Spezifisch für Krankenversicherung:", bulletPoints: ["'Wie oft gehen Sie zum Arzt?' → Franchise-Empfehlung", "'Nutzen Sie Alternativmedizin?' → Komplementär-Zusatz", "'Haben Sie Kinder unter 18?' → Zahnversicherung!", "'Reisen Sie häufig ins Ausland?' → Reise-/Auslandschutz", "'Ist Ihnen freie Spitalwahl wichtig?' → Spitalzusatz", "'Planen Sie eine Familie?' → Schwangerschaftsleistungen prüfen"], speakText: "Stelle gezielte Fragen zur Krankenversicherung. Arztbesuchshäufigkeit, Alternativmedizin, Kinder, Reisen und Spitalwahl bestimmen den Bedarf." },
    { title: "Prämienvergleich erstellen", content: "So überzeugst du den Kunden:", bulletPoints: ["Vergleiche mindestens 3-5 Kassen", "Zeige Prämienersparnis in CHF pro Jahr", "Franchise-Optimierung: Höhere Franchise = tiefere Prämie", "Modellwechsel: HMO/Telmed spart bis 25%", "Kombination: Grundversicherung + passende Zusätze", "Total-Ersparnis aufzeigen: 'Sie sparen CHF 1'200 pro Jahr'"], speakText: "Vergleiche mindestens 3 bis 5 Kassen und zeige die konkrete Jahresersparnis. Optimiere Franchise und Modell für maximale Einsparung." },
  ] } },
  { id: "kk3-2", title: "Häufige Kundensituationen", type: "text", duration: "25 Min.", completed: false, content: { type: "text", paragraphs: [
    "Situation 1 - Junge Erwachsene (18-25): Oft noch bei den Eltern mitversichert, wollen sparen. Empfehlung: Hohe Franchise (CHF 2'500), günstiges Modell (Telmed/HMO). Zusatz: Alternativmedizin wenn gewünscht, Auslandschutz wenn Reisen geplant.",
    "Situation 2 - Junge Familie: Kinder brauchen guten Schutz. Empfehlung: Für Kinder Franchise CHF 0, Zahnversicherung abschliessen (Zahnspange!), Spitalzusatz für Kinder (Rooming-in). Für Eltern: Mutterschaftsleistungen prüfen.",
    "Situation 3 - Berufstätige 30-50: Oft gesund, wollen optimieren. Empfehlung: Franchise-Optimierung, Modellwechsel prüfen. Spitalzusatz jetzt abschliessen bevor Prämien steigen! Alternativmedizin wenn genutzt.",
    "Situation 4 - Über 50: Prämien steigen, Vorerkrankungen möglich. Empfehlung: Bestehende Zusatzversicherungen behalten (Neuabschluss schwieriger!). Franchise anpassen wenn häufiger beim Arzt. Vorsorge-Checkup empfehlen.",
    "Situation 5 - Neuzuzüger: Müssen sich innert 3 Monaten versichern. Empfehlung: Sofort Grund- und Zusatzversicherung abschliessen. Keine Vorerkrankungen in der Schweiz = idealer Zeitpunkt für Zusatzversicherungen!",
  ] } },
  { id: "kk3-3", title: "Kassenwechsel Prozess", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Schritt für Schritt", content: "Der korrekte Ablauf:", bulletPoints: ["1. Bedarfsanalyse durchführen", "2. Prämienvergleich erstellen", "3. Zusatzversicherung bei neuer Kasse BEANTRAGEN", "4. Warten auf Zusage der Zusatzversicherung", "5. ERST DANN Grundversicherung bei alter Kasse kündigen (per 30.11.)", "6. Neue Grundversicherung abschliessen", "7. Bestätigung an den Kunden senden"], speakText: "Der wichtigste Punkt: Erst die Zusatzversicherung beantragen, dann die Grundversicherung kündigen. Nie umgekehrt!" },
  ] } },
  { id: "kk3-4", title: "Quiz: Verkauf Kranken", type: "quiz", duration: "15 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Welche Franchise empfiehlst du jemandem der selten krank ist?", options: ["CHF 300", "CHF 1'000", "CHF 2'500", "Egal"], correctIndex: 2, explanation: "Hohe Franchise = tiefere Prämie. Lohnt sich wenn man selten zum Arzt geht." },
    { text: "Was sollte man für Kinder IMMER empfehlen?", options: ["Hohe Franchise", "Zahnversicherung", "Rechtsschutz", "Reiseversicherung"], correctIndex: 1, explanation: "Zahnversicherung für Kinder wegen möglicher Zahnspangenkosten." },
    { text: "Was ist der häufigste Fehler beim Kassenwechsel?", options: ["Zu spät kündigen", "Grundversicherung kündigen BEVOR Zusatz bestätigt ist", "Zu viele Kassen vergleichen", "Franchise vergessen"], correctIndex: 1, explanation: "Erst Zusatz beantragen, dann Grundversicherung kündigen!" },
    { text: "Frist für Neuzuzüger in der Schweiz?", options: ["1 Monat", "3 Monate", "6 Monate", "1 Jahr"], correctIndex: 1, explanation: "3 Monate nach Zuzug muss die Grundversicherung abgeschlossen sein." },
  ] } },
] };
export default m;
