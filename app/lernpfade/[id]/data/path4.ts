export const path4 = {
  id: 4,
  title: "Compliance und Updates",
  description: "Jaehrliche Pflichtmodule und regulatorische Updates",
  icon: "⚖️",
  color: "#e74c3c",
  credits: 30,
  courses: [
    {
      id: 1,
      title: "FIDLEG Update 2026",
      description: "Neuerungen im Finanzdienstleistungsgesetz",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200",
      duration: "20min",
      credits: 3,
      status: "active",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "FIDLEG Neuerungen",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "FIDLEG Update 2026",
              image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200",
              content: "<p>Das <strong>Finanzdienstleistungsgesetz (FIDLEG)</strong> wurde 2026 in wichtigen Punkten aktualisiert. Als Versicherungsvermittler musst du die Neuerungen kennen und anwenden.</p>",
              keyPoints: ["Erweiterte Informationspflichten", "Neue Dokumentationsanforderungen", "Aenderungen bei der Eignungspruefung"],
            },
            {
              title: "Praktische Auswirkungen",
              image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
              content: "<p>Die FIDLEG-Aenderungen betreffen vor allem den <strong>Beratungsprozess</strong>: Erweiterte Dokumentation, strengere Eignungspruefung und neue Transparenzanforderungen.</p>",
              quiz: {
                question: "Wofuer steht FIDLEG?",
                options: ["Finanzdienstleistungsgesetz", "Finanzdirektionsleitsatzgesetz", "Finanzinstitutionsgesetz", "Finanzdiensterlaubnisgesetz"],
                correct: 0,
                explanation: "FIDLEG steht fuer Finanzdienstleistungsgesetz. Es regelt die Anforderungen an Finanzdienstleister beim Erbringen von Finanzdienstleistungen.",
              },
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Datenschutz Refresher",
      description: "DSG-Auffrischung und neue Anforderungen",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200",
      duration: "15min",
      credits: 3,
      status: "locked",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "DSG Auffrischung",
          credits: 3,
          duration: "15min",
          slides: [
            {
              title: "Datenschutz Refresher 2026",
              image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=1200",
              content: "<p>Das <strong>Datenschutzgesetz (DSG)</strong> stellt hohe Anforderungen an die Verarbeitung personenbezogener Daten. Dieser Refresher bringt dich auf den neuesten Stand.</p>",
              keyPoints: ["Privacy by Design und Default", "Datenschutz-Folgenabschaetzung", "Meldepflicht bei Datenverletzungen"],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Geldwaescherei-Praevention",
      description: "GwG-Pflichten und Sorgfaltsmassnahmen",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200",
      duration: "20min",
      credits: 3,
      status: "locked",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "GwG Grundlagen",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Geldwaescherei-Praevention",
              image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200",
              content: "<p>Als Versicherungsvermittler bist du verpflichtet, die Vorschriften des <strong>Geldwaeschereigesetzes (GwG)</strong> einzuhalten. Das umfasst Sorgfaltspflichten bei der Kundenidentifikation.</p>",
              keyPoints: ["Know Your Customer (KYC)", "Meldepflicht bei Verdacht", "Dokumentation und Aufbewahrung"],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Marktupdate Versicherung 2026",
      description: "Aktuelle Trends und Entwicklungen im Schweizer Markt",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200",
      duration: "20min",
      credits: 3,
      status: "locked",
      modules: 1,
      lessons: [
        {
          id: 1,
          title: "Markttrends 2026",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Versicherungsmarkt Schweiz 2026",
              image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200",
              content: "<p>Der Schweizer <strong>Versicherungsmarkt</strong> befindet sich im Wandel: Digitalisierung, neue Risiken und veraenderte Kundenbeduerfnisse praegen die Branche.</p>",
              keyPoints: ["Digitalisierung beschleunigt sich", "Cyberversicherung waechst stark", "Nachhaltigkeit wird zum Standard"],
            },
            {
              title: "Trends und Ausblick",
              image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200",
              content: "<p>Die wichtigsten <strong>Trends 2026</strong>:</p><ul><li>Embedded Insurance — Versicherung am Point of Sale</li><li>Parametrische Versicherungen nehmen zu</li><li>KI-gestuetzte Schadenregulierung</li><li>Fokus auf Praevention statt Reaktion</li></ul>",
              quiz: {
                question: "Welcher Versicherungszweig waechst laut Marktupdate 2026 besonders stark?",
                options: ["Feuerversicherung", "Cyberversicherung", "Tierversicherung", "Reiseversicherung"],
                correct: 1,
                explanation: "Die Cyberversicherung gehoert zu den am staerksten wachsenden Versicherungszweigen, getrieben durch zunehmende Digitalisierung und Cyberrisiken.",
              },
            },
          ],
        },
      ],
    },
  ],
};
