import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t1", title: "Willkommen bei Zuriva", description: "Einführung, Werte, Kultur und dein Weg", credits: 15, lektionen: [
  { id: "t1-1", title: "Begrüssung von Mark", type: "video", duration: "5 Min.", completed: false, content: { type: "video", description: "Mark heisst dich willkommen in der Zuriva Academy.", speakText: "Hallo! Ich bin Mark, dein persönlicher Begleiter bei Zuriva. Schön, dass du da bist. Die Zuriva Academy wurde für dich gebaut. Hier lernst du alles, was du als Versicherungsprofi brauchst. Wir stehen für Qualität, Vertrauen und Innovation. Ich wünsche dir viel Erfolg!" } },
  { id: "t1-2", title: "Die Zuriva Werte", type: "slides", duration: "15 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Unsere Mission", content: "Zuriva steht für erstklassige Versicherungsberatung.", bulletPoints: ["Kundenorientierung: Der Kunde steht immer im Mittelpunkt", "Qualität: Fundierte und umfassende Beratung", "Vertrauen: Ehrlichkeit und Transparenz", "Innovation: Moderne Technologie für bessere Beratung"], speakText: "Zuriva steht für erstklassige Versicherungsberatung. Unsere Werte sind Kundenorientierung, Qualität, Vertrauen und Innovation." },
    { title: "Ungebundene Vermittlung", content: "Als ungebundener Vermittler bist du unabhängig:", bulletPoints: ["Über 8 Versicherungspartner", "Dem Kunden verpflichtet, nicht dem Versicherer", "Freie Produktwahl: Beste Lösung für den Kunden", "Transparenz: Alle Vergütungen offengelegt"], speakText: "Als ungebundener Vermittler arbeitest du unabhängig und wählst immer die beste Lösung für den Kunden." },
  ] } },
  { id: "t1-3", title: "Dein Lernweg", type: "slides", duration: "10 Min.", completed: false, content: { type: "slides", slides: [
    { title: "5 Lernpfade", content: "Dein Weg zur VBV-Zertifizierung:", bulletPoints: ["1. Trainee Grundausbildung (20h)", "2. VBV Grundausbildung (30h)", "3. VBV Krankenkassenzusatz (20h)", "4. VBV Sach- und Vermögen (20h)", "5. VBV Mündliche Prüfung (20h)"], speakText: "Die Academy hat 5 Lernpfade mit insgesamt über 110 Stunden Lernstoff." },
  ] } },
  { id: "t1-4", title: "VBV-Zertifizierung 2026", type: "text", duration: "15 Min.", completed: false, content: { type: "text", paragraphs: ["Seit 2026 gelten neue Regeln: Jeder Vermittler braucht eine VBV-Zulassungsprüfung.", "Die Prüfung: 1) Generelle Fähigkeiten (30 Min., CHF 400), 2) Nicht-Leben (60 Min., CHF 100), 3) Leben (60 Min., CHF 100), 4) Krankenzusatz (30 Min., CHF 100).", "Mündliche Prüfung: Vor Ort in Bern, 30 Min., CHF 200.", "Rezertifizierung alle 2 Jahre (CHF 100/Jahr)."] } },
  { id: "t1-5", title: "Quiz: Willkommen", type: "quiz", duration: "10 Min.", completed: false, content: { type: "quiz", passingScore: 60, questions: [
    { text: "Was bedeutet 'ungebundener Vermittler'?", options: ["Angestellt bei einer Versicherung", "Unabhängig, dem Kunden verpflichtet", "Ohne Ausbildung", "Nur online"], correctIndex: 1, explanation: "Ein ungebundener Vermittler ist unabhängig und dem Kunden verpflichtet." },
    { text: "Wie oft muss die VBV-Zertifizierung erneuert werden?", options: ["Jährlich", "Alle 2 Jahre", "Alle 5 Jahre", "Nie"], correctIndex: 1, explanation: "Die Rezertifizierung ist alle 2 Jahre nötig." },
  ] } },
] };
export default m;
