import type { Modul } from "../../lernpfade-data";
const m: Modul = { id: "t3", title: "Kundenumgang Basics", description: "Erster Kontakt, professionelles Auftreten, Kommunikation", credits: 25, lektionen: [
  { id: "t3-1", title: "Der erste Eindruck", type: "slides", duration: "20 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Die ersten 7 Sekunden", content: "Der erste Eindruck entscheidet über Vertrauen:", bulletPoints: ["Blickkontakt herstellen und lächeln", "Fester Händedruck (nicht zu stark, nicht zu schwach)", "Aufrechte Haltung signalisiert Kompetenz", "Gepflegtes, professionelles Erscheinungsbild", "Pünktlichkeit ist Respekt gegenüber dem Kunden", "Visitenkarte bereithalten und überreichen"], speakText: "Der erste Eindruck entsteht in 7 Sekunden. Blickkontakt, Händedruck und gepflegtes Auftreten sind entscheidend." },
    { title: "Begrüssung und Smalltalk", content: "So startest du das Gespräch:", bulletPoints: ["Stelle dich mit vollem Namen und Firma vor", "Bedanke dich für die Zeit des Kunden", "2-3 Minuten Smalltalk zum Aufwärmen", "Themen: Wetter, Anreise, Büro/Wohnung", "NICHT: Politik, Religion, Gehalt", "Überleitung: 'Darf ich zum Anlass unseres Treffens kommen?'"], speakText: "Stelle dich klar vor, bedanke dich und führe kurzen Smalltalk. Vermeide kontroverse Themen." },
  ] } },
  { id: "t3-2", title: "Professionelle Kommunikation", type: "slides", duration: "25 Min.", completed: false, content: { type: "slides", slides: [
    { title: "Verbale Kommunikation", content: "Was du sagst und wie:", bulletPoints: ["Einfache Sprache - keine Fachbegriffe bombardieren", "Versicherungsbegriffe immer erklären", "Kurze Sätze, keine Monologe", "Fragen stellen statt Vorträge halten", "Tempo anpassen an den Kunden", "Pausen bewusst einsetzen"], speakText: "Sprich klar und einfach. Erkläre Fachbegriffe. Stelle Fragen statt Vorträge zu halten." },
    { title: "Nonverbale Kommunikation", content: "Körpersprache sagt mehr als Worte:", bulletPoints: ["Offene Haltung: Arme nicht verschränken", "Nicken zeigt Verständnis", "Spiegeln: Haltung des Kunden dezent nachahmen", "Notizen machen zeigt Interesse", "Augenkontakt 60-70% der Zeit", "Gestik einsetzen um Punkte zu unterstreichen"], speakText: "Körpersprache macht über 50 Prozent der Kommunikation aus. Offene Haltung, Augenkontakt und Gestik sind wichtig." },
    { title: "Telefon und E-Mail", content: "Professionelle Distanzkommunikation:", bulletPoints: ["Telefon: Lächle beim Sprechen - man hört es!", "Melde dich: Vorname, Nachname, Firma", "E-Mail: Professionelle Signatur mit allen Kontaktdaten", "Antwortzeit: Innert 24h auf E-Mails", "WhatsApp: Nur wenn Kunde es wünscht", "Nach jedem Gespräch: Schriftliche Zusammenfassung"], speakText: "Am Telefon immer lächeln. E-Mails innert 24 Stunden beantworten. Nach jedem Gespräch schriftlich zusammenfassen." },
  ] } },
  { id: "t3-3", title: "Schwierige Situationen", type: "text", duration: "20 Min.", completed: false, content: { type: "text", paragraphs: [
    "Im Kundenkontakt triffst du auf schwierige Situationen. So gehst du professionell damit um.",
    "Unzufriedene Kunden: Zuerst zuhören, nicht unterbrechen. Verständnis zeigen: 'Ich verstehe Ihren Ärger.' Sich entschuldigen. Konkrete Lösung anbieten. Beschwerde dokumentieren.",
    "Kunden die 'Nein' sagen: Entscheidung respektieren. Höflich nach dem Grund fragen. Positiven Eindruck hinterlassen. Dankes-Mail senden.",
    "Preisdiskussionen: Nie über den Preis argumentieren, sondern über den Wert. Zeigen was im Schadenfall passiert. 'Das sind weniger als 2 Franken pro Tag für vollständigen Schutz.'",
    "Vertraulichkeit: Kundeninformationen sind streng vertraulich. Nie über andere Kunden sprechen. Datenschutz ist Vertrauensbasis.",
  ] } },
  { id: "t3-4", title: "Quiz: Kundenumgang", type: "quiz", duration: "10 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
    { text: "Wie lange dauert der erste Eindruck?", options: ["30 Sekunden", "7 Sekunden", "2 Minuten", "5 Minuten"], correctIndex: 1, explanation: "Der erste Eindruck entsteht in ca. 7 Sekunden." },
    { text: "Was beim Smalltalk NICHT ansprechen?", options: ["Wetter", "Anreise", "Politik und Religion", "Wohnung"], correctIndex: 2, explanation: "Kontroverse Themen wie Politik und Religion vermeiden." },
    { text: "Wie schnell auf E-Mails antworten?", options: ["Sofort", "Innert 24 Stunden", "Innert 1 Woche", "Wenn Zeit ist"], correctIndex: 1, explanation: "Professionell: Innert 24 Stunden antworten." },
    { text: "Was bei Kundenbeschwerde zuerst tun?", options: ["Widersprechen", "Zuhören und Verständnis zeigen", "Vorgesetzten rufen", "Ignorieren"], correctIndex: 1, explanation: "Zuhören, Verständnis zeigen, dann Lösung anbieten." },
  ] } },
] };
export default m;
