export const path3 = {
  id: 3,
  title: "Spezialisierung Nicht-Leben",
  courses: [
    {
      id: 1,
      title: "Technische Versicherungen",
      lessons: [
        {
          id: 1,
          title: "Maschinenversicherung",
          credits: 4,
          duration: "25min",
          slides: [
            {
              title: "Technische Versicherungen im Ueberblick",
              image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200",
              content: "<p><strong>Technische Versicherungen</strong> schuetzen Maschinen, Anlagen und technische Einrichtungen gegen unvorhergesehene Schaeden waehrend Betrieb, Montage oder Transport.</p>",
              keyPoints: ["Maschinenbruchversicherung", "Montageversicherung", "Elektronikversicherung"],
            },
            {
              title: "Deckungsumfang",
              image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200",
              content: "<p>Die <strong>Allgefahrendeckung</strong> ist das Grundprinzip technischer Versicherungen: Gedeckt ist alles, was nicht ausdruecklich ausgeschlossen ist.</p>",
              quiz: {
                question: "Welches Prinzip liegt technischen Versicherungen zugrunde?",
                options: ["Benannte Gefahren", "Allgefahrendeckung", "Pauschaldeckung", "Minimalprinzip"],
                correct: 1,
                explanation: "Technische Versicherungen basieren auf dem Prinzip der Allgefahrendeckung — alles ist gedeckt, was nicht explizit ausgeschlossen ist.",
              },
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Transportversicherung",
      lessons: [
        {
          id: 1,
          title: "Grundlagen Transport",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Transportversicherung verstehen",
              image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200",
              content: "<p>Die <strong>Transportversicherung</strong> schuetzt Waren und Gueter waehrend des Transports auf Strasse, Schiene, See und in der Luft.</p>",
              keyPoints: ["Warentransportversicherung", "Verkehrshaftungsversicherung", "CMR-Haftung beachten"],
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Betriebshaftpflicht Vertiefung",
      lessons: [
        {
          id: 1,
          title: "Produkthaftung",
          credits: 4,
          duration: "25min",
          slides: [
            {
              title: "Produkthaftpflicht",
              image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200",
              content: "<p>Die <strong>Produkthaftpflicht</strong> deckt Schaeden, die durch fehlerhafte Produkte bei Dritten entstehen. In der Schweiz gilt das Produktehaftpflichtgesetz (PrHG).</p>",
              keyPoints: ["Verschuldensunabhaengige Haftung", "Hersteller und Importeur haften", "Beweislastumkehr zugunsten Geschaedigter"],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Gebaeude und Elementar",
      lessons: [
        {
          id: 1,
          title: "Gebaeudeversicherung",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Gebaeudeversicherung Grundlagen",
              image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200",
              content: "<p>Die <strong>Gebaeudeversicherung</strong> schuetzt Immobilien gegen Feuer, Elementar und weitere Gefahren. In der Schweiz ist sie kantonal unterschiedlich geregelt.</p>",
              keyPoints: ["Kantonale Monopolanstalten", "Private Versicherung in Nicht-Monopol-Kantonen", "Elementarschadendeckung"],
            },
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Motorfahrzeugversicherung",
      lessons: [
        {
          id: 1,
          title: "MFZ-Versicherung Grundlagen",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Motorfahrzeugversicherung",
              image: "https://images.unsplash.com/photo-1449965408869-ebd13bc7f550?w=1200",
              content: "<p>Die <strong>Motorfahrzeugversicherung</strong> umfasst die obligatorische Haftpflicht sowie freiwillige Kasko- und Zusatzversicherungen.</p>",
              keyPoints: ["MFZ-Haftpflicht ist obligatorisch", "Vollkasko vs. Teilkasko", "Insassenunfallversicherung als Ergaenzung"],
            },
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Rechtsschutzversicherung",
      lessons: [
        {
          id: 1,
          title: "Rechtsschutz Grundlagen",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Rechtsschutzversicherung",
              image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200",
              content: "<p>Die <strong>Rechtsschutzversicherung</strong> uebernimmt die Kosten fuer rechtliche Auseinandersetzungen: Anwaltskosten, Gerichtskosten und Expertenhonorare.</p>",
              keyPoints: ["Privat-, Verkehrs-, Berufsrechtsschutz", "Wartefrist beachten", "Freie Anwaltswahl"],
            },
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Underwriting Grundlagen",
      lessons: [
        {
          id: 1,
          title: "Risikopruefung",
          credits: 4,
          duration: "25min",
          slides: [
            {
              title: "Underwriting — Die Kunst der Risikopruefung",
              image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
              content: "<p><strong>Underwriting</strong> ist der Prozess der Risikobewertung und -annahme. Der Underwriter entscheidet, ob und zu welchen Konditionen ein Risiko versichert wird.</p>",
              keyPoints: ["Risikoanalyse und -bewertung", "Tarifierung und Praemienberechnung", "Zeichnungsrichtlinien einhalten"],
            },
          ],
        },
      ],
    },
    {
      id: 8,
      title: "Schadenmanagement",
      lessons: [
        {
          id: 1,
          title: "Schadenregulierung",
          credits: 3,
          duration: "20min",
          slides: [
            {
              title: "Professionelle Schadenregulierung",
              image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200",
              content: "<p>Die <strong>Schadenregulierung</strong> ist der Moment der Wahrheit fuer jede Versicherung: Hier zeigt sich, ob das Leistungsversprechen eingeloest wird.</p>",
              keyPoints: ["Schadenmeldung und -pruefung", "Schadenbewertung und -regulierung", "Regress und Subrogation"],
            },
          ],
        },
      ],
    },
  ],
};
