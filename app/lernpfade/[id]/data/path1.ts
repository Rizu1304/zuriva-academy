export const path1 = {
  id: 1,
  title: "Trainee Grundausbildung",
  description: "Der perfekte Einstieg fuer neue Mitarbeitende",
  icon: "🎓",
  color: "#0FA4A0",
  credits: 40,
  courses: [
    {
      id: 1,
      title: "Willkommen bei Zuriva",
      description: "Lerne Zuriva kennen — Mission, Werte und dein Team",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
      duration: "30min",
      credits: 6,
      status: "done",
      modules: 3,
      lessons: [
        {
          id: 1,
          title: "Ueber Zuriva",
          credits: 2,
          duration: "10min",
          slides: [
            {
              title: "Willkommen bei Zuriva!",
              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200",
              content: "<p>Herzlich willkommen bei <strong>Zuriva</strong> — deinem neuen Arbeitgeber und Partner auf dem Weg zu einer erfolgreichen Karriere in der Versicherungsbranche.</p><p>In dieser Lektion lernst du, wer wir sind, was uns antreibt und wie wir zusammenarbeiten.</p>",
              keyPoints: ["Zuriva ist ein fuehrender Versicherungsvermittler in der Schweiz", "Gegruendet 2012 mit Sitz in Zuerich", "Ueber 200 Mitarbeitende an 8 Standorten"],
            },
            {
              title: "Unsere Mission",
              image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200",
              content: "<p>Unsere Mission ist es, <strong>Versicherung einfach und verstaendlich</strong> zu machen. Wir glauben daran, dass jeder Mensch den passenden Schutz verdient — transparent, fair und individuell.</p>",
              keyPoints: ["Kundenorientierung steht im Zentrum", "Transparente Beratung ohne versteckte Kosten", "Digitale Innovation trifft persoenliche Betreuung"],
            },
            {
              title: "Dein erster Tag",
              image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200",
              content: "<p>Dein erster Tag ist der Beginn einer spannenden Reise. Hier erfaehrst du, was dich in den ersten Wochen erwartet und wie du dich optimal einarbeitest.</p><ul><li>Onboarding-Buddy kennenlernen</li><li>Systeme einrichten</li><li>Erste Schulungen absolvieren</li></ul>",
              quiz: {
                question: "Wann wurde Zuriva gegruendet?",
                options: ["2008", "2010", "2012", "2015"],
                correct: 2,
                explanation: "Zuriva wurde 2012 in Zuerich gegruendet und hat sich seitdem zu einem fuehrenden Versicherungsvermittler entwickelt.",
              },
            },
          ],
        },
        {
          id: 2,
          title: "Unternehmenskultur",
          credits: 2,
          duration: "10min",
          slides: [
            {
              title: "Unsere Werte",
              image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200",
              content: "<p>Bei Zuriva leben wir vier Kernwerte, die unser taegliches Handeln pregen:</p><ol><li><strong>Integritaet</strong> — Wir handeln ehrlich und transparent</li><li><strong>Innovation</strong> — Wir denken voraus und gestalten Zukunft</li><li><strong>Teamgeist</strong> — Gemeinsam sind wir staerker</li><li><strong>Exzellenz</strong> — Wir streben nach dem Besten</li></ol>",
              keyPoints: ["Integritaet in jeder Kundenbeziehung", "Innovation durch digitale Loesungen", "Teamgeist ueber alle Abteilungen hinweg"],
            },
            {
              title: "Zusammenarbeit bei Zuriva",
              image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200",
              content: "<p>Wir arbeiten in agilen Teams und foerdern den offenen Austausch. <strong>Flache Hierarchien</strong> und <strong>kurze Entscheidungswege</strong> sind bei uns keine Floskel, sondern gelebte Realitaet.</p>",
              quiz: {
                question: "Welcher Wert gehoert NICHT zu den Zuriva-Kernwerten?",
                options: ["Integritaet", "Gewinnmaximierung", "Innovation", "Teamgeist"],
                correct: 1,
                explanation: "Gewinnmaximierung gehoert nicht zu unseren Kernwerten. Unsere vier Werte sind: Integritaet, Innovation, Teamgeist und Exzellenz.",
              },
            },
          ],
        },
        {
          id: 3,
          title: "Organisation und Struktur",
          credits: 2,
          duration: "10min",
          slides: [
            {
              title: "Unsere Abteilungen",
              image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200",
              content: "<p>Zuriva ist in mehrere Kernbereiche gegliedert:</p><ul><li><strong>Vertrieb</strong> — Kundenberatung und Akquise</li><li><strong>Operations</strong> — Vertrags- und Schadenmanagement</li><li><strong>IT & Digital</strong> — Technologie und Innovation</li><li><strong>HR & Ausbildung</strong> — Personal und Weiterentwicklung</li></ul>",
              keyPoints: ["4 Hauptabteilungen", "Enge Zusammenarbeit zwischen den Teams", "Jede Abteilung hat einen Teamlead"],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Systeme und Tools",
      description: "CRM, Offerten-Tool und interne Plattformen kennenlernen",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
      duration: "15min",
      credits: 2,
      status: "done",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "CRM-System Einfuehrung",
          credits: 2,
          duration: "15min",
          slides: [
            {
              title: "Das Zuriva CRM",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
              content: "<p>Unser <strong>CRM-System</strong> ist das Herzstuerck deiner taeglichen Arbeit. Hier verwaltest du Kundendaten, Policen und Aufgaben.</p>",
              keyPoints: ["Zentrale Kundenverwaltung", "Policen-Uebersicht auf einen Blick", "Aufgaben- und Terminmanagement"],
            },
            {
              title: "Navigation im CRM",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
              content: "<p>Das Dashboard zeigt dir die wichtigsten Informationen auf einen Blick. Ueber die <strong>Seitennavigation</strong> erreichst du alle Module.</p>",
              quiz: {
                question: "Wofuer steht CRM?",
                options: ["Customer Relation Module", "Customer Relationship Management", "Central Resource Manager", "Client Record Management"],
                correct: 1,
                explanation: "CRM steht fuer Customer Relationship Management — also Kundenbeziehungsmanagement.",
              },
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Versicherungsbasics",
      description: "Grundprinzipien der Versicherung verstehen",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
      duration: "20min",
      credits: 3,
      status: "done",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "Was ist Versicherung?",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Das Prinzip der Versicherung",
              image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
              content: "<p>Versicherung basiert auf dem <strong>Prinzip der Risikogemeinschaft</strong>: Viele zahlen einen kleinen Betrag ein, damit der Einzelne im Schadenfall geschuetzt ist.</p>",
              keyPoints: ["Risikogemeinschaft als Grundprinzip", "Praemie als Gegenleistung fuer Schutz", "Gesetz der grossen Zahlen"],
            },
            {
              title: "Versicherungsarten",
              image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200",
              content: "<p>Man unterscheidet grundsaetzlich zwischen <strong>Personenversicherung</strong> (Leben, Kranken, Unfall) und <strong>Sachversicherung</strong> (Gebaude, Hausrat, Fahrzeug).</p>",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Kundenservice Grundlagen",
      description: "Professionelle Kommunikation mit Kunden",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
      duration: "15min",
      credits: 3,
      status: "done",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "Professionell telefonieren",
          credits: 3,
          duration: "15min",
          slides: [
            {
              title: "Der erste Eindruck am Telefon",
              image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200",
              content: "<p>Am Telefon entscheiden die <strong>ersten 7 Sekunden</strong> ueber den Eindruck, den du hinterlaesst. Eine freundliche Begruessung und klare Sprache sind essenziell.</p>",
              keyPoints: ["Laecheln hoert man am Telefon", "Name nennen und Anliegen erfragen", "Aktiv zuhoeren und mitschreiben"],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Datenschutz und Compliance Intro",
      description: "DSG-Grundlagen und Datenschutz im Arbeitsalltag",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200",
      duration: "15min",
      credits: 3,
      status: "done",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "DSGVO Grundlagen",
          credits: 3,
          duration: "15min",
          slides: [
            {
              title: "Datenschutz im Ueberblick",
              image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200",
              content: "<p>Der <strong>Datenschutz</strong> schuetzt die Persoenlichkeitsrechte natuerlicher Personen bei der Verarbeitung ihrer Daten. In der Schweiz gilt seit September 2023 das neue <strong>DSG</strong>.</p>",
              keyPoints: ["Schutz personenbezogener Daten", "Transparenz gegenueber Betroffenen", "Meldepflicht bei Datenpannen"],
            },
          ],
        },
      ],
    },
  ],
};
