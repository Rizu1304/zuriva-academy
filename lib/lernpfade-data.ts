export interface LektionContent {
  type: "text";
  paragraphs: string[];
}

export interface SlideContent {
  type: "slides";
  slides: { title: string; content: string; bulletPoints?: string[]; speakText: string }[];
}

export interface QuizContent {
  type: "quiz";
  questions: { text: string; options: string[]; correctIndex: number; explanation: string }[];
  passingScore: number;
}

export interface VideoContent {
  type: "video";
  description: string;
  speakText: string;
}

export type ContentData = LektionContent | SlideContent | QuizContent | VideoContent;

export interface Lektion {
  id: string;
  title: string;
  type: "video" | "slides" | "text" | "quiz";
  duration: string;
  completed: boolean;
  content?: ContentData;
}

export interface Modul {
  id: string;
  title: string;
  description: string;
  credits: number;
  lektionen: Lektion[];
}

export interface Lernpfad {
  id: number;
  title: string;
  description: string;
  color: string;
  status: "done" | "active" | "locked";
  credits: number;
  prerequisite?: string;
  module: Modul[];
  zertifikat?: string;
}

export const lernpfade: Lernpfad[] = [
  {
    id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende.", color: "#0FA4A0", status: "done", credits: 40, zertifikat: "Trainee Zertifikat",
    module: [
      { id: "m1", title: "Willkommen bei Zuriva", description: "Einführung in die Zuriva Academy", credits: 5, lektionen: [
        { id: "l1", title: "Begrüssung von Mark", type: "video", duration: "3 Min.", completed: true, content: { type: "video", description: "Mark begrüsst dich persönlich in der Zuriva Academy.", speakText: "Hallo! Ich bin Mark, dein persönlicher Begleiter hier bei Zuriva. Schön, dass du da bist. Du bist jetzt Teil von etwas Besonderem. Die Zuriva Academy wurde für dich gebaut. Hier lernst du alles, was du als Versicherungsprofi brauchst. Schritt für Schritt. In deinem Tempo." } },
        { id: "l2", title: "So funktioniert die Academy", type: "slides", duration: "5 Min.", completed: true, content: { type: "slides", slides: [
          { title: "Dein Lernweg", content: "Die Academy ist in Lernpfade unterteilt. Jeder Lernpfad besteht aus Modulen, und jedes Modul aus einzelnen Lektionen.", bulletPoints: ["Lernpfade zeigen dir den roten Faden", "Module sind thematische Blöcke", "Lektionen sind einzelne Lerneinheiten", "Am Ende jedes Moduls wartet ein Quiz"], speakText: "Die Academy ist in Lernpfade unterteilt. Jeder Lernpfad besteht aus Modulen, und jedes Modul aus einzelnen Lektionen." },
          { title: "Lektionsarten", content: "Es gibt verschiedene Arten von Lektionen:", bulletPoints: ["Videos: Erklärungen von Mark", "Slides: Interaktive Folien zum Durchklicken", "Texte: Vertiefende Informationen", "Quizzes: Teste dein Wissen"], speakText: "Es gibt Videos, interaktive Slides, vertiefende Texte und Quizzes." },
        ] } },
        { id: "l3", title: "Dein Lernplan", type: "text", duration: "3 Min.", completed: true, content: { type: "text", paragraphs: ["Willkommen zu deinem persönlichen Lernplan. Hier erfährst du, wie du die Academy optimal nutzt.", "Dein Ziel ist die VBV-Zertifizierung 2026. Dafür brauchst du 600 Credits. Jedes Modul bringt dir Credits, die du durch das Abschliessen von Lektionen und Quizzes erhältst.", "Wir empfehlen dir, täglich 30-60 Minuten zu lernen. So schaffst du die Zertifizierung entspannt vor der Frist.", "Nutze die Gamification-Features: Sammle XP, halte deinen Streak aufrecht und verdiene Badges. Das motiviert und macht Spass!", "Bei Fragen steht dir Aura, unsere KI-Assistentin, jederzeit zur Verfügung. Klicke einfach auf das Aura-Symbol unten rechts."] } },
      ]},
      { id: "m2", title: "Grundlagen Versicherung", description: "Die Schweizer Versicherungslandschaft verstehen", credits: 10, lektionen: [
        { id: "l4", title: "Das 3-Säulen-System", type: "video", duration: "12 Min.", completed: true, content: { type: "video", description: "Erklärung des Schweizer 3-Säulen-Systems.", speakText: "Das Schweizer Vorsorgesystem basiert auf drei Säulen. Die erste Säule ist die AHV, die staatliche Vorsorge. Die zweite Säule ist die berufliche Vorsorge über die Pensionskasse. Und die dritte Säule ist die private Vorsorge, unterteilt in Säule 3a und 3b." } },
        { id: "l5", title: "Versicherungsarten Überblick", type: "slides", duration: "8 Min.", completed: true, content: { type: "slides", slides: [
          { title: "Personenversicherung", content: "Versicherungen die Personen schützen:", bulletPoints: ["Lebensversicherung", "Krankenversicherung", "Unfallversicherung", "Erwerbsunfähigkeitsversicherung"], speakText: "Personenversicherungen schützen Menschen gegen Risiken wie Tod, Krankheit, Unfall und Erwerbsunfähigkeit." },
          { title: "Sachversicherung", content: "Versicherungen die Sachen schützen:", bulletPoints: ["Gebäudeversicherung", "Hausratversicherung", "Motorfahrzeugversicherung", "Transportversicherung"], speakText: "Sachversicherungen schützen materielle Güter wie Gebäude, Hausrat, Fahrzeuge und Waren." },
          { title: "Haftpflichtversicherung", content: "Schutz wenn du anderen Schaden zufügst:", bulletPoints: ["Privathaftpflicht", "Betriebshaftpflicht", "Berufshaftpflicht", "Motorfahrzeughaftpflicht"], speakText: "Haftpflichtversicherungen schützen dich, wenn du anderen einen Schaden zufügst und dafür haften musst." },
        ] } },
        { id: "l6", title: "Quiz: Grundbegriffe", type: "quiz", duration: "5 Min.", completed: true, content: { type: "quiz", passingScore: 70, questions: [
          { text: "Wie viele Säulen hat das Schweizer Vorsorgesystem?", options: ["2", "3", "4", "5"], correctIndex: 1, explanation: "Das Schweizer Vorsorgesystem basiert auf 3 Säulen." },
          { text: "Was ist die AHV?", options: ["Private Vorsorge", "Berufliche Vorsorge", "Staatliche Vorsorge", "Zusatzversicherung"], correctIndex: 2, explanation: "Die AHV ist die 1. Säule - die staatliche Alters- und Hinterlassenenversicherung." },
          { text: "Welche Versicherung schützt Gebäude?", options: ["Personenversicherung", "Sachversicherung", "Haftpflichtversicherung", "Krankenversicherung"], correctIndex: 1, explanation: "Die Gebäudeversicherung gehört zu den Sachversicherungen." },
        ] } },
      ]},
    ],
  },
  {
    id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung 2026.", color: "#022350", status: "active", credits: 120,
    module: [
      { id: "m1", title: "Sachversicherung", description: "Gebäude-, Hausrat- und Betriebsversicherung", credits: 20, lektionen: [
        { id: "l1", title: "Einführung Sachversicherung", type: "video", duration: "12 Min.", completed: true, content: { type: "video", description: "Überblick über die Sachversicherung in der Schweiz.", speakText: "Die Sachversicherung schützt materielle Güter gegen Schäden durch unvorhergesehene Ereignisse. Sie ist eine der ältesten Versicherungsformen und bildet das Rückgrat des Versicherungsgeschäfts in der Schweiz." } },
        { id: "l2", title: "Gebäudeversicherung Schweiz", type: "slides", duration: "10 Min.", completed: true, content: { type: "slides", slides: [
          { title: "Kantonale Gebäudeversicherungen", content: "In der Schweiz gibt es ein einzigartiges System der Gebäudeversicherung.", bulletPoints: ["19 von 26 Kantonen haben eine obligatorische kantonale Gebäudeversicherung", "GUSTAVO-Kantone: Genf, Uri, Schwyz, Tessin, AI, Wallis, Obwalden", "Grunddeckung umfasst Feuer und Elementarschäden", "Zusatzdeckungen für Erdbeben oft separat nötig"], speakText: "19 von 26 Kantonen haben eine obligatorische kantonale Gebäudeversicherung. In den GUSTAVO-Kantonen besteht freie Wahl des Versicherers." },
          { title: "Versicherungswert", content: "Die korrekte Wertermittlung ist die Grundlage jeder Sachversicherung.", bulletPoints: ["Neuwert: Kosten für Wiederherstellung in gleicher Art und Güte", "Zeitwert: Neuwert abzüglich Altersentwertung", "Unterversicherung: proportionale Kürzung der Leistung", "Erste-Risiko-Versicherung: volle Deckung bis zur Limite"], speakText: "Die korrekte Wertermittlung ist fundamental. Der Neuwert beschreibt die Kosten für eine Wiederherstellung. Der Zeitwert berücksichtigt die Altersentwertung." },
        ] } },
        { id: "l3", title: "Hausratversicherung", type: "slides", duration: "8 Min.", completed: true, content: { type: "slides", slides: [
          { title: "Was ist Hausrat?", content: "Alles was nicht fest mit dem Gebäude verbunden ist:", bulletPoints: ["Möbel, Kleider, Elektronik", "Sportgeräte, Musikinstrumente", "Wertsachen (oft mit Sublimit)", "Auch: Sachen von Gästen und Hausangestellten"], speakText: "Zum Hausrat gehört alles, was nicht fest mit dem Gebäude verbunden ist." },
        ] } },
        { id: "l4", title: "GUSTAVO-Kantone", type: "text", duration: "5 Min.", completed: true, content: { type: "text", paragraphs: ["Die GUSTAVO-Kantone sind: Genf (GE), Uri (UR), Schwyz (SZ), Tessin (TI), Appenzell Innerrhoden (AI), Wallis (VS) und Obwalden (OW).", "In diesen Kantonen gibt es keine kantonale Monopolanstalt. Die Gebäudeversicherung wird von privaten Versicherern angeboten.", "Das bedeutet: Als Vermittler kannst du in diesen Kantonen aktiv Gebäudeversicherungen vermitteln. In den anderen Kantonen ist dies nicht möglich, da die kantonale Anstalt das Monopol hat.", "Wichtig: Die Prämien in den GUSTAVO-Kantonen sind oft höher als in Monopol-Kantonen, da der Wettbewerb anders funktioniert."] } },
        { id: "l5", title: "Prämienberechnung", type: "slides", duration: "12 Min.", completed: false, content: { type: "slides", slides: [
          { title: "Faktoren der Prämie", content: "Die Prämie wird durch verschiedene Faktoren bestimmt:", bulletPoints: ["Standort und Bauweise des Gebäudes", "Versicherungssumme und Selbstbehalt", "Vorhandene Sicherheitsmassnahmen", "Schadenhistorie des Kunden"], speakText: "Die Prämienberechnung basiert auf verschiedenen Risikofaktoren wie Standort, Bauweise, Versicherungssumme und Sicherheitsmassnahmen." },
          { title: "Berechnungsbeispiel", content: "So berechnest du eine Prämie für einen Kundenfall:", bulletPoints: ["Gebäudewert CHF 800'000 (Neuwert)", "Standort: Zürich (tiefes Risiko)", "Bauweise: Massiv (tiefes Risiko)", "Alarmanlage: Ja (10% Rabatt)", "Geschätzte Jahresprämie: CHF 450-650"], speakText: "Für ein Gebäude im Wert von 800'000 Franken in Zürich, Massivbauweise mit Alarmanlage, liegt die geschätzte Jahresprämie bei 450 bis 650 Franken." },
        ] } },
        { id: "l6", title: "Schadenabwicklung", type: "video", duration: "10 Min.", completed: false, content: { type: "video", description: "Der professionelle Schadenfall-Prozess.", speakText: "Die Schadenabwicklung folgt einem klaren Prozess. Zuerst die Schadenmeldung mit sofortiger Dokumentation. Dann die Schadenaufnahme mit Protokoll und Fotos. Bei grösseren Schäden ein Gutachten. Dann die Regulierung und Auszahlung. Und schliesslich die Nachbetreuung." } },
        { id: "l7", title: "Quiz: Sachversicherung", type: "quiz", duration: "10 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
          { text: "In wie vielen Kantonen ist die Gebäudeversicherung obligatorisch?", options: ["15", "19", "22", "26"], correctIndex: 1, explanation: "19 von 26 Kantonen haben eine obligatorische kantonale Gebäudeversicherung." },
          { text: "Was bedeutet GUSTAVO?", options: ["Ein Versicherungsprodukt", "Kantone ohne Monopol", "Eine Berechnungsformel", "Ein Versicherer"], correctIndex: 1, explanation: "GUSTAVO steht für die 7 Kantone ohne kantonales Gebäudeversicherungsmonopol." },
          { text: "Was ist der Unterschied zwischen Neuwert und Zeitwert?", options: ["Kein Unterschied", "Neuwert = Wiederbeschaffung, Zeitwert = minus Entwertung", "Zeitwert ist immer höher", "Nur für Autos relevant"], correctIndex: 1, explanation: "Der Neuwert sind die Wiederbeschaffungskosten, der Zeitwert berücksichtigt die Altersentwertung." },
          { text: "Welcher Faktor beeinflusst die Prämie NICHT?", options: ["Standort", "Bauweise", "Lieblingsfarbe des Kunden", "Sicherheitsmassnahmen"], correctIndex: 2, explanation: "Die Lieblingsfarbe hat keinen Einfluss auf die Prämie." },
          { text: "Was ist eine Unterversicherung?", options: ["Zu viele Versicherungen", "Versicherungssumme unter dem echten Wert", "Eine günstige Versicherung", "Eine Zusatzversicherung"], correctIndex: 1, explanation: "Bei Unterversicherung ist die Summe tiefer als der tatsächliche Wert." },
        ] } },
      ]},
      { id: "m2", title: "Lebensversicherung", description: "Säule 3a/3b, gemischte LV, Rückkaufswerte", credits: 20, lektionen: [
        { id: "l8", title: "Das 3-Säulen-System vertieft", type: "video", duration: "15 Min.", completed: true, content: { type: "video", description: "Vertiefung des 3-Säulen-Systems.", speakText: "Die Lebensversicherung ist ein zentrales Element der privaten Vorsorge. Wir unterscheiden zwischen der gebundenen Vorsorge Säule 3a mit Steuervorteilen und der freien Vorsorge Säule 3b ohne Einschränkungen." } },
        { id: "l9", title: "Säule 3a und 3b", type: "slides", duration: "10 Min.", completed: false, content: { type: "slides", slides: [
          { title: "Säule 3a - Gebundene Vorsorge", content: "Die steuerlich begünstigte Vorsorge:", bulletPoints: ["Beiträge vom steuerbaren Einkommen abziehbar", "Max. 2026: CHF 7'258 (Angestellte)", "Bezug frühestens 5 Jahre vor AHV-Alter", "Kapitalbezug: privilegierte Besteuerung"], speakText: "Die Säule 3a bietet Steuervorteile. Beiträge sind abziehbar, maximal 7258 Franken für Angestellte." },
          { title: "Säule 3b - Freie Vorsorge", content: "Die flexible Vorsorge ohne Einschränkungen:", bulletPoints: ["Keine Beitragslimite", "Freie Verfügbarkeit des Kapitals", "Keine Steuerabzüge bei Einzahlung", "Unter Bedingungen steuerfreie Auszahlung"], speakText: "Die Säule 3b bietet maximale Flexibilität ohne Beitragslimite, aber auch ohne Steuerabzüge bei der Einzahlung." },
        ] } },
        { id: "l10", title: "Steuerliche Vorteile", type: "text", duration: "8 Min.", completed: false, content: { type: "text", paragraphs: ["Die steuerlichen Vorteile der Lebensversicherung sind ein wichtiges Verkaufsargument.", "Säule 3a: Der Maximalbetrag 2026 beträgt CHF 7'258 für Angestellte mit Pensionskasse. Für Selbständige ohne Pensionskasse sind es 20% des Nettoeinkommens, maximal CHF 36'288.", "Die Steuerersparnis hängt vom Grenzsteuersatz ab. In Zürich spart ein Angestellter mit 3a-Einzahlung typischerweise CHF 1'800-2'500 pro Jahr.", "Bei der Auszahlung wird das Kapital separat und zu einem reduzierten Satz besteuert. Das macht die Säule 3a zu einem der attraktivsten Sparinstrumente in der Schweiz."] } },
        { id: "l11", title: "Quiz: Lebensversicherung", type: "quiz", duration: "10 Min.", completed: false, content: { type: "quiz", passingScore: 70, questions: [
          { text: "Was ist der maximale 3a-Beitrag 2026 für Angestellte?", options: ["CHF 5'000", "CHF 7'258", "CHF 10'000", "CHF 36'288"], correctIndex: 1, explanation: "Der Maximalbetrag für Angestellte mit PK beträgt CHF 7'258." },
          { text: "Was ist ein Vorteil der Säule 3b gegenüber 3a?", options: ["Höhere Steuerabzüge", "Freie Verfügbarkeit", "Höhere Rendite", "Obligatorisch"], correctIndex: 1, explanation: "Die Säule 3b bietet freie Verfügbarkeit ohne Bezugsbeschränkungen." },
          { text: "Wann kann man Säule 3a frühestens beziehen?", options: ["Jederzeit", "5 Jahre vor AHV-Alter", "Bei Pensionierung", "Nach 10 Jahren"], correctIndex: 1, explanation: "Der Bezug ist frühestens 5 Jahre vor dem AHV-Alter möglich." },
        ] } },
      ]},
    ],
  },
];

export function getLernpfad(id: number): Lernpfad | undefined {
  return lernpfade.find(p => p.id === id);
}

export function getModul(pfadId: number, modulId: string): Modul | undefined {
  const pfad = getLernpfad(pfadId);
  return pfad?.module.find(m => m.id === modulId);
}

export function getLektion(pfadId: number, modulId: string, lektionId: string): { pfad: Lernpfad; modul: Modul; lektion: Lektion; lektionIndex: number; nextLektion?: Lektion } | undefined {
  const pfad = getLernpfad(pfadId);
  if (!pfad) return undefined;
  const modul = pfad.module.find(m => m.id === modulId);
  if (!modul) return undefined;
  const lektionIndex = modul.lektionen.findIndex(l => l.id === lektionId);
  if (lektionIndex < 0) return undefined;
  const lektion = modul.lektionen[lektionIndex];
  const nextLektion = modul.lektionen[lektionIndex + 1];
  return { pfad, modul, lektion, lektionIndex, nextLektion };
}
