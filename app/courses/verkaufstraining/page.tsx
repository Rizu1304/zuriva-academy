"use client";
import { useState } from "react";

const modules = [
  {
    id: 1,
    title: "Modul 1: Verkaufspsychologie verstehen",
    duration: "4h 00min",
    lessons: [
      "1.1 Warum Menschen kaufen: Grundlagen der Kaufentscheidung",
      "1.2 Emotionale vs. rationale Entscheidungen",
      "1.3 Vertrauensaufbau als Verkaufsfundament",
      "1.4 Die sechs Prinzipien der Ueberzeugung (Cialdini)",
      "1.5 Kundentypen erkennen und ansprechen",
    ],
    description:
      "Verstehen Sie die psychologischen Grundlagen hinter jeder Kaufentscheidung. Lernen Sie, warum Vertrauen wichtiger ist als jedes Verkaufsargument und wie Sie die Prinzipien der Ueberzeugung ethisch einsetzen.",
  },
  {
    id: 2,
    title: "Modul 2: Der strukturierte Verkaufsprozess",
    duration: "4h 00min",
    lessons: [
      "2.1 Die 7 Phasen des Versicherungsverkaufs",
      "2.2 Vom Erstkontakt zum Abschluss: Der rote Faden",
      "2.3 Verkaufstrichter und Pipeline-Management",
      "2.4 KPIs im Versicherungsvertrieb",
      "2.5 Zeit- und Selbstmanagement fuer Verkaefer",
    ],
    description:
      "Ein strukturierter Verkaufsprozess ist das Rueckgrat jedes erfolgreichen Vertrieblers. Lernen Sie die 7 Phasen kennen und optimieren Sie Ihren persoenlichen Verkaufstrichter.",
  },
  {
    id: 3,
    title: "Modul 3: Bedarfsanalyse und Beratungsgespraech",
    duration: "4h 00min",
    lessons: [
      "3.1 Die Kunst der richtigen Fragen",
      "3.2 Aktives Zuhoeren als Verkaufstechnik",
      "3.3 Beduerfnispyramide im Versicherungskontext",
      "3.4 Gap-Analyse: Ist-Situation vs. Soll-Zustand",
      "3.5 Dokumentation und Beratungsprotokoll",
    ],
    description:
      "Die Bedarfsanalyse ist das Herzstuck jeder guten Beratung. Lernen Sie, durch gezielte Fragen den tatsaechlichen Bedarf zu ermitteln und passgenaue Loesungen vorzuschlagen.",
  },
  {
    id: 4,
    title: "Modul 4: Praesentationstechnik und Nutzenargumentation",
    duration: "4h 00min",
    lessons: [
      "4.1 Features vs. Benefits: Der entscheidende Unterschied",
      "4.2 Versicherungsprodukte verstaendlich erklaeren",
      "4.3 Storytelling im Verkaufsgespraech",
      "4.4 Visualisierung und Angebotspraesentation",
      "4.5 Die Macht der Vergleiche und Analogien",
    ],
    description:
      "Produkte verkaufen sich nicht von allein - es braucht eine ueberzeugende Praesentation. Lernen Sie, komplexe Versicherungsprodukte in klaren Kundennutzen zu uebersetzen.",
  },
  {
    id: 5,
    title: "Modul 5: Preisverhandlung und Wertargumentation",
    duration: "4h 00min",
    lessons: [
      "5.1 Preis vs. Wert: Die richtige Perspektive",
      "5.2 Preise souveraen nennen und verteidigen",
      "5.3 Verhandlungstechniken fuer Versicherungsvermittler",
      "5.4 Rabattfallen vermeiden",
      "5.5 Paketloesungen und Buendelung als Preisstrategie",
    ],
    description:
      "Der Preis ist selten der wahre Einwand. Lernen Sie, wie Sie den Wert Ihrer Beratung und Produkte ueberzeugend kommunizieren und Preisverhandlungen souveraen fuehren.",
  },
  {
    id: 6,
    title: "Modul 6: Einwaende und Widerstaende meistern",
    duration: "4h 00min",
    lessons: [
      "6.1 Einwaende als versteckte Kaufsignale",
      "6.2 Die 5-Schritt-Methode der Einwandbehandlung",
      "6.3 Typische Einwaende im Versicherungsverkauf",
      "6.4 'Ich habe schon einen Berater' - Wechselmotivation erzeugen",
      "6.5 Vorwaende von echten Einwaenden unterscheiden",
    ],
    description:
      "Einwaende gehoeren zum Verkauf wie das Salz zur Suppe. Meistern Sie die haeufigsten Einwaende im Versicherungsvertrieb und verwandeln Sie Widerstaende in Zustimmung.",
  },
  {
    id: 7,
    title: "Modul 7: Abschlusstechniken",
    duration: "4h 00min",
    lessons: [
      "7.1 Kaufsignale erkennen und nutzen",
      "7.2 Die 8 wichtigsten Abschlusstechniken",
      "7.3 Trial Close: Testen Sie die Kaufbereitschaft",
      "7.4 Der natuerliche Abschluss ohne Druck",
      "7.5 Nach dem Abschluss: Kaufreue vermeiden",
    ],
    description:
      "Der Abschluss ist der natuerliche Hoehepunkt eines guten Verkaufsgespraechs. Lernen Sie verschiedene Abschlusstechniken und wann Sie welche einsetzen.",
  },
  {
    id: 8,
    title: "Modul 8: Empfehlungsmanagement und Netzwerk",
    duration: "4h 00min",
    lessons: [
      "8.1 Warum Empfehlungen der beste Vertriebskanal sind",
      "8.2 Aktiv nach Empfehlungen fragen",
      "8.3 Empfehlungsprogramme aufbauen",
      "8.4 Netzwerken im Versicherungsumfeld",
      "8.5 Social Selling: LinkedIn und Co. im Vertrieb",
    ],
    description:
      "Empfehlungen sind der effizienteste Weg zu neuen Kunden. Lernen Sie, wie Sie systematisch Empfehlungen generieren und ein starkes Netzwerk aufbauen.",
  },
  {
    id: 9,
    title: "Modul 9: Digitaler Vertrieb und Hybrid-Modelle",
    duration: "4h 00min",
    lessons: [
      "9.1 Online-Beratung professionell gestalten",
      "9.2 Digitale Tools im Verkaufsgespraech",
      "9.3 E-Mail-Sequenzen und Follow-Up-Automatisierung",
      "9.4 Video-Botschaften als Verkaufsinstrument",
      "9.5 Der hybride Verkaufsprozess der Zukunft",
    ],
    description:
      "Die Zukunft des Vertriebs ist hybrid. Lernen Sie, wie Sie digitale Kanaele nahtlos in Ihren Verkaufsprozess integrieren und damit Ihre Reichweite vervielfachen.",
  },
  {
    id: 10,
    title: "Modul 10: Praxis-Simulation und Zertifizierung",
    duration: "4h 00min",
    lessons: [
      "10.1 Vollstaendige Verkaufsgespraech-Simulation",
      "10.2 Peer-Feedback und Gruppenarbeit",
      "10.3 Individueller Entwicklungsplan",
      "10.4 Abschlusspruefung: Theorie und Fallstudie",
      "10.5 Praxispruefung: Live-Verkaufsgespraech",
    ],
    description:
      "Stellen Sie Ihr Koennen unter Beweis! In realistischen Simulationen fuehren Sie vollstaendige Verkaufsgespraeche und erhalten detailliertes Feedback von Experten.",
  },
];

export default function Verkaufstraining() {
  const [openModule, setOpenModule] = useState<number | null>(1);
  const [activeTab, setActiveTab] = useState<"overview" | "modules" | "instructor">("overview");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350" }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Kurse", href: "/courses", active: true },
          { name: "Lernpfade", href: "#" },
          { name: "Pruefungen", href: "#" },
          { name: "Zertifikate", href: "#" },
          { name: "Forum", href: "#" },
          { name: "Analytics", href: "#" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Hero Banner */}
        <div style={{ position: "relative", height: 220, flexShrink: 0, overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px" }}>
            <a href="/courses" style={{ color: "#C8A24D", fontSize: 12, textDecoration: "none", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              &#8592; Zurueck zu allen Kursen
            </a>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ background: "rgba(200,162,77,0.9)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Verkauf & Kommunikation</span>
              <span style={{ background: "rgba(15,164,160,0.9)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>80 Credits</span>
              <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Zertifikatskurs</span>
            </div>
            <h1 style={{ color: "white", fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 6 }}>Verkaufstraining: Die Kunst des Verkaufens</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: 0, maxWidth: 600 }}>
              Meistern Sie den gesamten Verkaufsprozess im Versicherungsvertrieb. Von der Psychologie ueber die Bedarfsanalyse bis zum Abschluss und Empfehlungsmanagement.
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", padding: "16px 48px", display: "flex", gap: 40, flexShrink: 0 }}>
          {[
            { label: "Dauer", value: "40 Stunden" },
            { label: "Module", value: "10 Module" },
            { label: "Lektionen", value: "50 Lektionen" },
            { label: "Credits", value: "80 Credits" },
            { label: "Niveau", value: "Alle Stufen" },
            { label: "Zertifikat", value: "Ja" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 11, color: "#9A9AAA", marginBottom: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", padding: "0 48px", display: "flex", gap: 0, flexShrink: 0 }}>
          {(["overview", "modules", "instructor"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 24px",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #C8A24D" : "2px solid transparent",
                color: activeTab === tab ? "#022350" : "#9A9AAA",
                fontWeight: activeTab === tab ? 600 : 400,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "sans-serif",
              }}
            >
              {tab === "overview" ? "Uebersicht" : tab === "modules" ? "Module & Lektionen" : "Dozent"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 48px" }}>
          {activeTab === "overview" && (
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
              {/* Left Column */}
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 600, color: "#022350", margin: "0 0 16px" }}>Kursbeschreibung</h2>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4A4A5A", margin: "0 0 20px" }}>
                  Verkaufen ist keine angeborene Gabe - es ist ein Handwerk, das man lernen kann. In diesem umfassenden Kurs erlernen Sie die gesamte
                  Palette des modernen Versicherungsvertriebs: von der Verkaufspsychologie ueber die strukturierte Bedarfsanalyse bis hin zu
                  professionellen Abschlusstechniken. Dieser Kurs verbindet bewaehrte Verkaufsmethoden mit den neuesten Erkenntnissen aus der
                  Verhaltensforschung und passt sie speziell auf den Versicherungskontext an.
                </p>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Was Sie lernen werden</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
                  {[
                    "Verkaufspsychologie und Ueberzeugungsprinzipien",
                    "Strukturierter Verkaufsprozess von A bis Z",
                    "Professionelle Bedarfsanalyse durchfuehren",
                    "Ueberzeugende Nutzenargumentation aufbauen",
                    "Preisverhandlungen souveraen fuehren",
                    "Einwaende in Abschluesse verwandeln",
                    "Empfehlungsmanagement systematisch betreiben",
                    "Digitale Vertriebskanaele erfolgreich nutzen",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#4A4A5A" }}>
                      <span style={{ color: "#C8A24D", fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                      {item}
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Fuer wen ist dieser Kurs?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {[
                    "Versicherungsvermittler die ihre Abschlussquote steigern wollen",
                    "Neueinsteiger im Versicherungsvertrieb",
                    "Erfahrene Berater die frische Impulse suchen",
                    "Fuehrungskraefte die ihr Vertriebsteam weiterentwickeln moechten",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#4A4A5A" }}>
                      <span style={{ color: "#0FA4A0", fontWeight: 700, flexShrink: 0 }}>&#9654;</span>
                      {item}
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Methodik</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4A4A5A", margin: 0 }}>
                  Dieser Kurs setzt auf einen stark praxisorientierten Ansatz. Neben Videolektionen und theoretischen Grundlagen arbeiten Sie mit
                  realen Fallstudien aus dem Versicherungsalltag. Rollenspiele, Peer-Reviews und Live-Simulationen sorgen dafuer, dass Sie das
                  Gelernte sofort anwenden koennen. Die Abschlusspruefung besteht aus einer theoretischen Klausur und einem simulierten Verkaufsgespraech.
                </p>
              </div>

              {/* Right Column - Sidebar */}
              <div>
                <div style={{ background: "white", border: "0.5px solid #dce0e6", borderRadius: 14, padding: 24, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: "#9A9AAA", marginBottom: 4 }}>Ihr Fortschritt</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#022350", marginBottom: 8 }}>0%</div>
                  <div style={{ background: "#eef0f3", height: 6, borderRadius: 3, marginBottom: 16 }}>
                    <div style={{ height: 6, borderRadius: 3, background: "#C8A24D", width: "0%" }} />
                  </div>
                  <button style={{ width: "100%", padding: "12px 0", background: "#C8A24D", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif", marginBottom: 10 }}>
                    Kurs starten
                  </button>
                  <button style={{ width: "100%", padding: "10px 0", background: "transparent", color: "#022350", border: "1px solid #dce0e6", borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>
                    Lesezeichen setzen
                  </button>
                </div>

                <div style={{ background: "white", border: "0.5px solid #dce0e6", borderRadius: 14, padding: 24, marginBottom: 20 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Kurs-Details</h4>
                  {[
                    { l: "Sprache", v: "Deutsch" },
                    { l: "Untertitel", v: "Deutsch, Englisch" },
                    { l: "Aktualisiert", v: "Maerz 2026" },
                    { l: "Format", v: "Video + Fallstudien" },
                    { l: "Zugang", v: "12 Monate" },
                  ].map((d) => (
                    <div key={d.l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f0f0f0" }}>
                      <span style={{ fontSize: 12, color: "#9A9AAA" }}>{d.l}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A" }}>{d.v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: "linear-gradient(135deg, #C8A24D 0%, #a07c2e 100%)", borderRadius: 14, padding: 24, color: "white" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>Zertifizierung</h4>
                  <p style={{ fontSize: 12, lineHeight: 1.6, margin: "0 0 12px", opacity: 0.9 }}>
                    Nach erfolgreichem Abschluss erhalten Sie das Zuriva-Zertifikat &quot;Versicherungsverkauf Professional&quot; und 80 Weiterbildungs-Credits.
                  </p>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 10, padding: "3px 8px", borderRadius: 12 }}>IDD-konform</span>
                    <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 10, padding: "3px 8px", borderRadius: 12 }}>80 Credits</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "modules" && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#022350", margin: "0 0 8px" }}>Kursinhalt</h2>
              <p style={{ fontSize: 13, color: "#9A9AAA", margin: "0 0 24px" }}>10 Module &middot; 50 Lektionen &middot; 40 Stunden Gesamtdauer</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {modules.map((mod) => (
                  <div key={mod.id} style={{ background: "white", border: "0.5px solid #dce0e6", borderRadius: 12, overflow: "hidden" }}>
                    <button
                      onClick={() => setOpenModule(openModule === mod.id ? null : mod.id)}
                      style={{
                        width: "100%",
                        padding: "16px 20px",
                        background: openModule === mod.id ? "#fafbfc" : "white",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontFamily: "sans-serif",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#C8A24D", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                          {mod.id}
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{mod.title}</div>
                          <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{mod.lessons.length} Lektionen &middot; {mod.duration}</div>
                        </div>
                      </div>
                      <span style={{ fontSize: 18, color: "#9A9AAA", transform: openModule === mod.id ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>&#9660;</span>
                    </button>
                    {openModule === mod.id && (
                      <div style={{ padding: "0 20px 16px", borderTop: "0.5px solid #eef0f3" }}>
                        <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#4A4A5A", margin: "12px 0 14px" }}>{mod.description}</p>
                        {mod.lessons.map((lesson) => (
                          <div key={lesson} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "0.5px solid #f5f5f5" }}>
                            <div style={{ width: 18, height: 18, borderRadius: "50%", border: "1.5px solid #dce0e6", flexShrink: 0 }} />
                            <span style={{ fontSize: 13, color: "#4A4A5A" }}>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "instructor" && (
            <div style={{ maxWidth: 680 }}>
              <div style={{ display: "flex", gap: 24, marginBottom: 32, alignItems: "center" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #C8A24D, #022350)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "white", flexShrink: 0 }}>SW</div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: "#022350", margin: "0 0 4px" }}>Sandra Weber</h2>
                  <p style={{ fontSize: 13, color: "#C8A24D", margin: "0 0 8px", fontWeight: 500 }}>Senior Vertriebstrainerin & Verkaufscoach</p>
                  <p style={{ fontSize: 13, color: "#9A9AAA", margin: 0 }}>18+ Jahre Erfahrung im Versicherungsverkauf und Vertriebscoaching</p>
                </div>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Ueber die Dozentin</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4A4A5A", margin: "0 0 20px" }}>
                Sandra Weber ist eine der renommiertesten Vertriebstrainerinnen im deutschsprachigen Versicherungsmarkt. Nach ihrer Karriere als
                Top-Verkaeuferin bei Swiss Life und Allianz hat sie sich auf die Ausbildung von Versicherungsvermittlern spezialisiert. Ihre
                Trainings zeichnen sich durch hohe Praxisnaehe und messbare Ergebnisse aus - ihre Teilnehmer steigern ihre Abschlussquote
                im Durchschnitt um 35%.
              </p>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Qualifikationen</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Zertifizierte Vertriebstrainerin (BDVT)",
                  "Master of Sales (Universitaet St. Gallen)",
                  "Ehemalige Vertriebsleiterin bei Swiss Life & Allianz",
                  "Autorin: 'Verkaufen mit Vertrauen' (Campus Verlag)",
                  "Top-100 Trainerin DACH (Managerseminare)",
                ].map((q) => (
                  <div key={q} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "#4A4A5A" }}>
                    <span style={{ color: "#C8A24D" }}>&#9733;</span> {q}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
