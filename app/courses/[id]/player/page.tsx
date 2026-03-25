"use client";
import { useState } from "react";
import { use } from "react";
import LessonSlides from "../../../../components/LessonSlides";
import type { Slide } from "../../../../components/LessonSlides";

interface CourseData {
  title: string;
  category: string;
  color: string;
  modules: { title: string; slides: Slide[] }[];
}

const courseData: Record<string, CourseData> = {
  "1": {
    title: "Grundlagen der Sachversicherung",
    category: "Nicht-Leben",
    color: "#022350",
    modules: [
      {
        title: "Modul 1: Einfuehrung in die Sachversicherung",
        slides: [
          {
            title: "Was ist eine Sachversicherung?",
            content: "Die Sachversicherung schuetzt materielle Gueter gegen Schaeden durch unvorhergesehene Ereignisse. Sie ist eine der aeltesten Versicherungsformen und bildet das Rueckgrat des Versicherungsgeschaefts.",
            bulletPoints: [
              "Schutz von Gebaeuden, Inventar und Waren",
              "Absicherung gegen Feuer, Wasser, Einbruch und Elementarschaeden",
              "Unterscheidung zwischen Neuwert- und Zeitwertversicherung",
              "Obligatorische vs. freiwillige Deckungen in der Schweiz",
            ],
            speakText: "Willkommen zur Lektion ueber Sachversicherungen. Die Sachversicherung schuetzt materielle Gueter gegen Schaeden durch unvorhergesehene Ereignisse. Sie ist eine der aeltesten Versicherungsformen und bildet das Rueckgrat des Versicherungsgeschaefts. Wir unterscheiden zwischen dem Schutz von Gebaeuden, Inventar und Waren, der Absicherung gegen Feuer, Wasser, Einbruch und Elementarschaeden, sowie der Unterscheidung zwischen Neuwert und Zeitwertversicherung.",
            icon: "🏢",
          },
          {
            title: "Die wichtigsten Sachversicherungsarten",
            content: "In der Schweiz gibt es verschiedene Arten von Sachversicherungen, die je nach Kanton und Risikoprofil unterschiedlich geregelt sind.",
            bulletPoints: [
              "Gebaeudeversicherung - in vielen Kantonen obligatorisch",
              "Hausratversicherung - schuetzt persoenliche Gegenstaende",
              "Betriebsversicherung - fuer Unternehmen und Gewerbe",
              "Transportversicherung - fuer Waren auf dem Transportweg",
              "Maschinenversicherung - fuer technische Anlagen",
            ],
            speakText: "Die wichtigsten Sachversicherungsarten in der Schweiz umfassen die Gebaeudeversicherung, die in vielen Kantonen obligatorisch ist, die Hausratversicherung zum Schutz persoenlicher Gegenstaende, die Betriebsversicherung fuer Unternehmen, die Transportversicherung fuer Waren auf dem Transportweg, sowie die Maschinenversicherung fuer technische Anlagen.",
            icon: "📋",
          },
          {
            title: "Praemienberechnung und Risikobewertung",
            content: "Die Praemie einer Sachversicherung wird anhand verschiedener Risikofaktoren berechnet. Als Versicherungsvermittler ist es wichtig, diese Faktoren zu verstehen.",
            bulletPoints: [
              "Standort und Bauweise des Gebaeudes",
              "Art und Wert der versicherten Sachen",
              "Vorhandene Sicherheitsmassnahmen",
              "Schadenhistorie des Kunden",
              "Selbstbehalt und Deckungssumme",
            ],
            speakText: "Die Praemienberechnung basiert auf verschiedenen Risikofaktoren. Dazu gehoeren der Standort und die Bauweise des Gebaeudes, die Art und der Wert der versicherten Sachen, vorhandene Sicherheitsmassnahmen wie Alarmanlagen, die Schadenhistorie des Kunden sowie der gewaehlte Selbstbehalt und die Deckungssumme.",
            icon: "💰",
          },
          {
            title: "Schadenabwicklung in der Praxis",
            content: "Ein professioneller Schadenfall-Prozess ist entscheidend fuer die Kundenzufriedenheit und die Reputation als Versicherungsvermittler.",
            bulletPoints: [
              "Schadenmeldung: sofortige Dokumentation und Meldung",
              "Schadenaufnahme: Protokoll mit Fotos und Zeugenaussagen",
              "Gutachten: bei groesseren Schaeden durch unabhaengige Experten",
              "Regulierung: Berechnung und Auszahlung der Entschaedigung",
              "Nachbetreuung: Kundenzufriedenheit sicherstellen",
            ],
            speakText: "Die Schadenabwicklung folgt einem klaren Prozess. Zuerst erfolgt die Schadenmeldung mit sofortiger Dokumentation. Dann die Schadenaufnahme mit Protokoll, Fotos und Zeugenaussagen. Bei groesseren Schaeden wird ein Gutachten durch unabhaengige Experten erstellt. Danach folgt die Regulierung mit Berechnung und Auszahlung der Entschaedigung. Und schliesslich die Nachbetreuung, um die Kundenzufriedenheit sicherzustellen.",
            icon: "📝",
          },
        ],
      },
      {
        title: "Modul 2: Gebaeudeversicherung im Detail",
        slides: [
          {
            title: "Kantonale Gebaeudeversicherungen",
            content: "In der Schweiz gibt es ein einzigartiges System der Gebaeudeversicherung. 19 von 26 Kantonen haben eine obligatorische kantonale Gebaeudeversicherung.",
            bulletPoints: [
              "Monopolkantone: Versicherung nur ueber kantonale Anstalt",
              "GUSTAVO-Kantone: Freie Wahl des Versicherers (GE, UR, SZ, TI, AI, VS, OW)",
              "Grunddeckung umfasst Feuer und Elementarschaeden",
              "Zusatzdeckungen fuer Erdbeben oft separat noetig",
            ],
            speakText: "In der Schweiz haben 19 von 26 Kantonen eine obligatorische kantonale Gebaeudeversicherung. In den sogenannten Monopolkantonen erfolgt die Versicherung ausschliesslich ueber die kantonale Anstalt. In den GUSTAVO-Kantonen, also Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis und Obwalden, besteht freie Wahl des Versicherers. Die Grunddeckung umfasst Feuer und Elementarschaeden, waehrend Zusatzdeckungen fuer Erdbeben oft separat abgeschlossen werden muessen.",
            icon: "🏠",
          },
          {
            title: "Versicherungswert richtig bestimmen",
            content: "Die korrekte Wertermittlung ist die Grundlage jeder Sachversicherung. Eine Unter- oder Ueberversicherung kann schwerwiegende Folgen haben.",
            bulletPoints: [
              "Neuwert: Kosten fuer Wiederherstellung in gleicher Art und Guete",
              "Zeitwert: Neuwert abzueglich Altersentwertung",
              "Unterversicherung: proportionale Kuerzung der Leistung",
              "Erste-Risiko-Versicherung: volle Deckung bis zur Limite",
            ],
            speakText: "Die korrekte Wertermittlung ist fundamental. Der Neuwert beschreibt die Kosten fuer eine Wiederherstellung in gleicher Art und Guete. Der Zeitwert ist der Neuwert abzueglich der Altersentwertung. Bei einer Unterversicherung erfolgt eine proportionale Kuerzung der Versicherungsleistung. Die Erste-Risiko-Versicherung bietet hingegen volle Deckung bis zur vereinbarten Limite, unabhaengig vom Gesamtwert.",
            icon: "🔍",
          },
        ],
      },
    ],
  },
  "2": {
    title: "Lebensversicherungen: Produktkenntnisse",
    category: "Leben",
    color: "#0FA4A0",
    modules: [
      {
        title: "Modul 1: Grundlagen der Lebensversicherung",
        slides: [
          {
            title: "Lebensversicherung - Saeule 3a und 3b",
            content: "Die Lebensversicherung ist ein zentrales Element der privaten Vorsorge in der Schweiz und ergaenzt die staatliche und berufliche Vorsorge.",
            bulletPoints: [
              "Saeule 3a: gebundene Vorsorge mit Steuervorteilen",
              "Saeule 3b: freie Vorsorge ohne Einschraenkungen",
              "Risikoversicherung: reiner Todesfallschutz",
              "Gemischte Versicherung: Spar- und Risikokomponente",
              "Fondsgebundene Police: Anlage in Investmentfonds",
            ],
            speakText: "Willkommen zur Lektion ueber Lebensversicherungen. Die Lebensversicherung ist ein zentrales Element der privaten Vorsorge in der Schweiz. Wir unterscheiden zwischen der Saeule 3a, der gebundenen Vorsorge mit Steuervorteilen, und der Saeule 3b, der freien Vorsorge ohne Einschraenkungen. Ausserdem gibt es die reine Risikoversicherung fuer den Todesfallschutz, die gemischte Versicherung mit Spar- und Risikokomponente, sowie die fondsgebundene Police.",
            icon: "🛡️",
          },
          {
            title: "Bedarfsanalyse beim Kunden",
            content: "Eine gruendliche Bedarfsanalyse ist der Schluessel zu einer passenden Lebensversicherungsloesung. Sie muessen die finanzielle Situation und Ziele des Kunden genau verstehen.",
            bulletPoints: [
              "Familiensituation: Ehepartner, Kinder, Abhaengige",
              "Einkommenssituation und bestehende Vorsorge",
              "Hypothekarschulden und andere Verbindlichkeiten",
              "Steuersituation und Optimierungsmoeglichkeiten",
              "Risikobereitschaft und Anlagehorizont",
            ],
            speakText: "Die Bedarfsanalyse ist der Schluessel zur passenden Lebensversicherungsloesung. Sie muessen die Familiensituation des Kunden kennen, also Ehepartner, Kinder und abhaengige Personen. Dann die Einkommenssituation und bestehende Vorsorge, Hypothekarschulden und andere Verbindlichkeiten, die Steuersituation mit Optimierungsmoeglichkeiten, sowie die Risikobereitschaft und den Anlagehorizont.",
            icon: "👨‍👩‍👧‍👦",
          },
          {
            title: "Steuerliche Vorteile verstehen",
            content: "Die steuerlichen Aspekte der Lebensversicherung sind ein wichtiges Verkaufsargument. In der Schweiz gibt es klare Regelungen fuer die steuerliche Behandlung.",
            bulletPoints: [
              "Saeule 3a: Beitraege sind vom steuerbaren Einkommen abziehbar",
              "Maximalbetrag 2026: CHF 7'258 (Angestellte) bzw. 20% des Nettoeinkommens (Selbstaendige)",
              "Kapitalleistung bei Auszahlung: privilegierte Besteuerung",
              "Saeule 3b: keine Abzuege, aber steuerfreie Auszahlung moeglich",
            ],
            speakText: "Die steuerlichen Vorteile sind ein wichtiges Verkaufsargument. Bei der Saeule 3a sind die Beitraege vom steuerbaren Einkommen abziehbar. Der Maximalbetrag 2026 betraegt 7258 Franken fuer Angestellte beziehungsweise 20 Prozent des Nettoeinkommens fuer Selbstaendige. Die Kapitalleistung bei Auszahlung wird privilegiert besteuert. Bei der Saeule 3b gibt es keine Abzuege, dafuer ist eine steuerfreie Auszahlung unter bestimmten Bedingungen moeglich.",
            icon: "📊",
          },
        ],
      },
    ],
  },
  "4": {
    title: "Beratungskompetenz und Kundenkommunikation",
    category: "Gen. Faehigkeiten",
    color: "#C8A24D",
    modules: [
      {
        title: "Modul 1: Professionelle Gespraechsfuehrung",
        slides: [
          {
            title: "Das Beratungsgespraech strukturieren",
            content: "Ein professionelles Beratungsgespraech folgt einer klaren Struktur. Diese Struktur gibt Ihnen Sicherheit und dem Kunden Vertrauen.",
            bulletPoints: [
              "Begruessung und Vertrauensaufbau in den ersten 2 Minuten",
              "Bedarfsanalyse durch offene Fragen",
              "Loesungspraesentation mit konkretem Kundennutzen",
              "Einwandbehandlung und Abschluss",
              "Nachbetreuung und Empfehlungsmanagement",
            ],
            speakText: "Willkommen zur Lektion ueber professionelle Gespraechsfuehrung. Ein professionelles Beratungsgespraech folgt einer klaren Struktur. Beginnen Sie mit der Begruessung und dem Vertrauensaufbau in den ersten zwei Minuten. Fuehren Sie dann eine gruendliche Bedarfsanalyse durch offene Fragen durch. Praesentieren Sie Ihre Loesung mit konkretem Kundennutzen. Behandeln Sie Einwaende professionell und fuehren Sie zum Abschluss. Vergessen Sie nicht die Nachbetreuung und das Empfehlungsmanagement.",
            icon: "🤝",
          },
          {
            title: "Aktives Zuhoeren und Fragetechnik",
            content: "Aktives Zuhoeren ist die wichtigste Faehigkeit eines erfolgreichen Versicherungsberaters. Der Kunde muss sich verstanden fuehlen.",
            bulletPoints: [
              "Paraphrasieren: Das Gehoerte in eigenen Worten wiedergeben",
              "Offene W-Fragen: Was, Wie, Warum, Wann, Wer",
              "Spiegeln: Emotionen des Kunden aufgreifen",
              "Zusammenfassen: Wichtige Punkte buendeln",
              "Schweigen: Dem Kunden Raum zum Nachdenken geben",
            ],
            speakText: "Aktives Zuhoeren ist die wichtigste Faehigkeit eines erfolgreichen Versicherungsberaters. Nutzen Sie das Paraphrasieren, um das Gehoerte in eigenen Worten wiederzugeben. Stellen Sie offene W-Fragen: Was, Wie, Warum, Wann, Wer. Spiegeln Sie die Emotionen des Kunden. Fassen Sie wichtige Punkte zusammen. Und ganz wichtig: Geben Sie dem Kunden auch Raum zum Nachdenken durch bewusstes Schweigen.",
            icon: "👂",
          },
        ],
      },
    ],
  },
};

// Fallback for courses without detailed content
function getDefaultSlides(courseTitle: string): Slide[] {
  return [
    {
      title: `Willkommen: ${courseTitle}`,
      content: "In diesem Kurs lernen Sie die wichtigsten Grundlagen und Konzepte. Jede Lektion baut auf der vorherigen auf und wird durch eine professionelle Sprachausgabe begleitet.",
      bulletPoints: [
        "Strukturierte Lerneinheiten mit klaren Lernzielen",
        "Professionelle Sprachausgabe fuer jede Lektion",
        "Interaktive Animationen fuer besseres Verstaendnis",
        "Quiz und Pruefungen zur Lernkontrolle",
      ],
      speakText: `Willkommen zum Kurs ${courseTitle}. In diesem Kurs lernen Sie die wichtigsten Grundlagen und Konzepte. Jede Lektion baut auf der vorherigen auf und wird durch eine professionelle Sprachausgabe begleitet. Viel Erfolg beim Lernen!`,
      icon: "📚",
    },
    {
      title: "Weitere Inhalte werden geladen",
      content: "Dieser Kurs wird derzeit mit weiteren Lektionen erweitert. Die verfuegbaren Module werden bald freigeschaltet.",
      speakText: "Dieser Kurs wird derzeit mit weiteren Lektionen erweitert. Die verfuegbaren Module werden bald freigeschaltet. Bitte schauen Sie spaeter nochmal vorbei.",
      icon: "🔜",
    },
  ];
}

export default function CoursePlayer({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = courseData[id];
  const [activeModule, setActiveModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);

  const title = course?.title || "Kurs";
  const color = course?.color || "#022350";
  const modules = course?.modules || [{ title: "Modul 1", slides: getDefaultSlides(title) }];

  const handleModuleComplete = () => {
    if (!completedModules.includes(activeModule)) {
      setCompletedModules([...completedModules, activeModule]);
    }
    if (activeModule < modules.length - 1) {
      setActiveModule(activeModule + 1);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "DM Sans, sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 280, minWidth: 280, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 22px", borderBottom: "0.5px solid #dce0e6" }}>
          <a href="/courses" style={{ fontSize: 12, color: "#0FA4A0", textDecoration: "none", fontWeight: 500, display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            &#8592; Zurueck zu Kursen
          </a>
          <div style={{ height: 3, borderRadius: 2, background: color, marginBottom: 10 }} />
          <div style={{ fontSize: 15, fontWeight: 600, color: "#022350", lineHeight: 1.35 }}>{title}</div>
          <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 4 }}>{modules.length} Module · {modules.reduce((acc, m) => acc + m.slides.length, 0)} Lektionen</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
          {modules.map((module, i) => (
            <div key={i}>
              <div
                onClick={() => setActiveModule(i)}
                style={{
                  padding: "12px 22px",
                  cursor: "pointer",
                  background: i === activeModule ? "#EEF5FF" : "transparent",
                  borderLeft: i === activeModule ? `3px solid ${color}` : "3px solid transparent",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: completedModules.includes(i) ? "#0FA4A0" : i === activeModule ? color : "#dce0e6",
                    color: "white",
                    fontSize: 10,
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    {completedModules.includes(i) ? "✓" : i + 1}
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: i === activeModule ? 600 : 400, color: i === activeModule ? "#022350" : "#4A4A5A" }}>
                    {module.title}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: "#9A9AAA", marginTop: 4, paddingLeft: 30 }}>
                  {module.slides.length} Slides
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div style={{ padding: "16px 22px", borderTop: "0.5px solid #dce0e6" }}>
          <div style={{ fontSize: 11, color: "#9A9AAA", marginBottom: 6 }}>Fortschritt</div>
          <div style={{ background: "#eef0f3", height: 4, borderRadius: 2 }}>
            <div style={{
              height: 4,
              borderRadius: 2,
              background: color,
              width: `${modules.length > 0 ? (completedModules.length / modules.length) * 100 : 0}%`,
              transition: "width 0.5s ease",
            }} />
          </div>
          <div style={{ fontSize: 11, color: "#4A4A5A", marginTop: 4, fontWeight: 500 }}>
            {completedModules.length} / {modules.length} Module abgeschlossen
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top Bar */}
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 56, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{modules[activeModule]?.title}</div>
            <div style={{ fontSize: 11, color: "#9A9AAA" }}>Echte Stimme powered by ElevenLabs</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 12, color: "#4A4A5A" }}>Sprachausgabe aktiv</span>
          </div>
        </div>

        {/* Slide Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
          <LessonSlides
            slides={modules[activeModule]?.slides || []}
            courseTitle={title}
            onComplete={handleModuleComplete}
          />
        </div>
      </div>
    </div>
  );
}
