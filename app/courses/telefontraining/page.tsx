"use client";
import { useState } from "react";

const modules = [
  {
    id: 1,
    title: "Modul 1: Grundlagen der Telefonkommunikation",
    duration: "4h 00min",
    lessons: [
      "1.1 Die Bedeutung des Telefons im Versicherungsvertrieb",
      "1.2 Stimme, Tonfall und Sprechgeschwindigkeit",
      "1.3 Aktives Zuhoeren am Telefon",
      "1.4 Der erste Eindruck: Die ersten 10 Sekunden",
      "1.5 Professionelle Begruessung und Verabschiedung",
    ],
    description:
      "Lernen Sie die fundamentalen Prinzipien erfolgreicher Telefonkommunikation. Sie verstehen, warum das Telefon nach wie vor eines der wichtigsten Vertriebsinstrumente ist und wie Sie Ihre Stimme als Werkzeug einsetzen.",
  },
  {
    id: 2,
    title: "Modul 2: Gespraechsvorbereitung und Recherche",
    duration: "4h 00min",
    lessons: [
      "2.1 Zieldefinition vor jedem Anruf",
      "2.2 Kundenrecherche und CRM-Nutzung",
      "2.3 Gespraechsleitfaeden entwickeln",
      "2.4 Mentale Vorbereitung und Mindset",
      "2.5 Die richtige Tageszeit fuer Anrufe",
    ],
    description:
      "Eine gruendliche Vorbereitung ist der Schluessel zum Erfolg. Lernen Sie, wie Sie sich systematisch auf Telefonate vorbereiten und mit klaren Zielen in jedes Gespraech gehen.",
  },
  {
    id: 3,
    title: "Modul 3: Kaltakquise meistern",
    duration: "4h 00min",
    lessons: [
      "3.1 Hemmschwellen ueberwinden",
      "3.2 Der perfekte Elevator Pitch am Telefon",
      "3.3 Gatekeeper professionell ueberwinden",
      "3.4 Interesse wecken in 30 Sekunden",
      "3.5 Terminvereinbarung als Ziel",
    ],
    description:
      "Die Kaltakquise ist die Koenigsdisziplin im Telefonvertrieb. Lernen Sie bewaehrte Techniken, um Hemmschwellen zu ueberwinden und aus kalten Kontakten warme Leads zu machen.",
  },
  {
    id: 4,
    title: "Modul 4: Bedarfsanalyse am Telefon",
    duration: "4h 00min",
    lessons: [
      "4.1 Offene und geschlossene Fragen gezielt einsetzen",
      "4.2 Die SPIN-Methode am Telefon",
      "4.3 Beduerfnisse erkennen und spiegeln",
      "4.4 Kundentypen am Telefon identifizieren",
      "4.5 Notizen waehrend des Gespraechs",
    ],
    description:
      "Erfahren Sie, wie Sie durch gezielte Fragetechniken den wahren Bedarf Ihrer Kunden ermitteln und massgeschneiderte Loesungen anbieten koennen.",
  },
  {
    id: 5,
    title: "Modul 5: Einwandbehandlung",
    duration: "4h 00min",
    lessons: [
      "5.1 Die haeufigsten Einwaende im Versicherungsvertrieb",
      "5.2 Die Bumerang-Methode",
      "5.3 Preis-Einwaende souveraen behandeln",
      "5.4 'Ich muss darueber nachdenken' - und jetzt?",
      "5.5 Aus Einwaenden Verkaufsargumente machen",
    ],
    description:
      "Einwaende sind keine Ablehnung, sondern Kaufsignale. Lernen Sie, wie Sie die haeufigsten Einwaende im Versicherungsbereich professionell und ueberzeugend behandeln.",
  },
  {
    id: 6,
    title: "Modul 6: Cross-Selling und Up-Selling am Telefon",
    duration: "4h 00min",
    lessons: [
      "6.1 Bestandskunden systematisch ausbauen",
      "6.2 Zusatzbedarfe erkennen und ansprechen",
      "6.3 Produktkombinationen ueberzeugend praesentieren",
      "6.4 Der richtige Zeitpunkt fuer Cross-Selling",
      "6.5 Wertargumentation statt Produktverkauf",
    ],
    description:
      "Nutzen Sie bestehende Kundenbeziehungen, um durch geschicktes Cross- und Up-Selling den Kundennutzen und gleichzeitig Ihren Umsatz zu steigern.",
  },
  {
    id: 7,
    title: "Modul 7: Beschwerdemanagement am Telefon",
    duration: "4h 00min",
    lessons: [
      "7.1 Beschwerden als Chance verstehen",
      "7.2 Deeskalationstechniken",
      "7.3 Empathie zeigen ohne Schuld einzugestehen",
      "7.4 Loesungsorientierte Gespraechsfuehrung",
      "7.5 Nachfassen nach einer Beschwerde",
    ],
    description:
      "Beschwerden sind die beste Gelegenheit, Kundenloyalitaet zu staerken. Lernen Sie, wie Sie auch in schwierigen Situationen professionell und loesungsorientiert agieren.",
  },
  {
    id: 8,
    title: "Modul 8: Terminierung und Follow-Up",
    duration: "4h 00min",
    lessons: [
      "8.1 Termine verbindlich vereinbaren",
      "8.2 Die Alternativfrage-Technik",
      "8.3 No-Show-Rate reduzieren",
      "8.4 Systematisches Follow-Up",
      "8.5 CRM-Pflege und Pipeline-Management",
    ],
    description:
      "Der beste Anruf nuetzt nichts ohne konkretes Ergebnis. Lernen Sie, wie Sie Termine verbindlich vereinbaren und durch systematisches Follow-Up Ihre Abschlussquote steigern.",
  },
  {
    id: 9,
    title: "Modul 9: Digitale Telefonie und Hybrid-Beratung",
    duration: "4h 00min",
    lessons: [
      "9.1 Video-Calls als Erweiterung des Telefonats",
      "9.2 Screen-Sharing in der Kundenberatung",
      "9.3 Digitale Unterschrift und Fernabschluss",
      "9.4 CRM-Integration und Automatisierung",
      "9.5 KI-gestuetzte Gespraechsanalyse",
    ],
    description:
      "Die Zukunft der Telefonberatung ist digital. Lernen Sie, wie Sie moderne Technologien nutzen, um Ihre Telefonate effizienter und ueberzeugender zu gestalten.",
  },
  {
    id: 10,
    title: "Modul 10: Praxis-Workshop und Zertifizierung",
    duration: "4h 00min",
    lessons: [
      "10.1 Live-Telefonate mit Feedback",
      "10.2 Rollenspiele und Simulationen",
      "10.3 Persoenlicher Aktionsplan",
      "10.4 Abschlusspruefung: Theorie",
      "10.5 Abschlusspruefung: Praxis-Telefonat",
    ],
    description:
      "Wenden Sie alles Gelernte in praxisnahen Uebungen an. Fuehren Sie Live-Telefonate, erhalten Sie individuelles Feedback und schliessen Sie mit der Zertifizierung ab.",
  },
];

export default function Telefontraining() {
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
          <img src="https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=1200&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.4)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px" }}>
            <a href="/courses" style={{ color: "#0FA4A0", fontSize: 12, textDecoration: "none", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
              &#8592; Zurueck zu allen Kursen
            </a>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <span style={{ background: "rgba(15,164,160,0.9)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Verkauf & Kommunikation</span>
              <span style={{ background: "rgba(200,162,77,0.9)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>80 Credits</span>
              <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>Zertifikatskurs</span>
            </div>
            <h1 style={{ color: "white", fontSize: 28, fontWeight: 700, margin: 0, marginBottom: 6 }}>Telefontraining: Meisterklasse</h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: 0, maxWidth: 600 }}>
              Werden Sie zum Telefonprofi im Versicherungsvertrieb. 10 praxisnahe Module fuer messbar mehr Termine, hoehere Abschlussquoten und begeisterte Kunden.
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
                borderBottom: activeTab === tab ? "2px solid #0FA4A0" : "2px solid transparent",
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
                  Das Telefon bleibt das wichtigste Vertriebsinstrument im Versicherungsbereich. Doch erfolgreiche Telefonate fuehren sich nicht von allein.
                  In dieser umfassenden Meisterklasse lernen Sie Schritt fuer Schritt, wie Sie am Telefon ueberzeugend auftreten, Vertrauen aufbauen und messbare
                  Ergebnisse erzielen. Von der Kaltakquise ueber die Bedarfsanalyse bis hin zum Abschluss und dem professionellen Beschwerdemanagement deckt
                  dieser Kurs alle Aspekte der telefonischen Kundenberatung ab.
                </p>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Was Sie lernen werden</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 24 }}>
                  {[
                    "Professionelle Gespraechsfuehrung am Telefon",
                    "Kaltakquise ohne Hemmschwellen",
                    "Einwaende souveraen behandeln",
                    "Cross-Selling und Up-Selling Techniken",
                    "Beschwerdemanagement und Deeskalation",
                    "Terminvereinbarung mit hoher Verbindlichkeit",
                    "Digitale Tools fuer die Telefonberatung",
                    "Messbare Steigerung Ihrer Abschlussquote",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#4A4A5A" }}>
                      <span style={{ color: "#0FA4A0", fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                      {item}
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Fuer wen ist dieser Kurs?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                  {[
                    "Versicherungsvermittler, die mehr Termine generieren moechten",
                    "Kundenberater im Innen- und Aussendienst",
                    "Quereinsteiger in der Versicherungsbranche",
                    "Teamleiter, die ihre Mannschaft im Telefonvertrieb schulen wollen",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: "#4A4A5A" }}>
                      <span style={{ color: "#C8A24D", fontWeight: 700, flexShrink: 0 }}>&#9654;</span>
                      {item}
                    </div>
                  ))}
                </div>

                <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Methodik</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4A4A5A", margin: 0 }}>
                  Dieser Kurs kombiniert Theorie mit intensiver Praxis. Jedes Modul enthaelt Video-Lektionen, interaktive Uebungen, Rollenspiele und
                  Praxisaufgaben. Sie fuehren echte Telefonate unter Anleitung und erhalten individuelles Coaching-Feedback. Am Ende steht eine
                  praktische Pruefung, in der Sie ein reales Verkaufsgespraech am Telefon fuehren.
                </p>
              </div>

              {/* Right Column - Sidebar */}
              <div>
                <div style={{ background: "white", border: "0.5px solid #dce0e6", borderRadius: 14, padding: 24, marginBottom: 20 }}>
                  <div style={{ fontSize: 11, color: "#9A9AAA", marginBottom: 4 }}>Ihr Fortschritt</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: "#022350", marginBottom: 8 }}>0%</div>
                  <div style={{ background: "#eef0f3", height: 6, borderRadius: 3, marginBottom: 16 }}>
                    <div style={{ height: 6, borderRadius: 3, background: "#0FA4A0", width: "0%" }} />
                  </div>
                  <button style={{ width: "100%", padding: "12px 0", background: "#022350", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif", marginBottom: 10 }}>
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
                    { l: "Format", v: "Video + Live-Praxis" },
                    { l: "Zugang", v: "12 Monate" },
                  ].map((d) => (
                    <div key={d.l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "0.5px solid #f0f0f0" }}>
                      <span style={{ fontSize: 12, color: "#9A9AAA" }}>{d.l}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A" }}>{d.v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ background: "linear-gradient(135deg, #022350 0%, #0a3a6e 100%)", borderRadius: 14, padding: 24, color: "white" }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 8px" }}>Zertifizierung</h4>
                  <p style={{ fontSize: 12, lineHeight: 1.6, margin: "0 0 12px", opacity: 0.85 }}>
                    Nach erfolgreichem Abschluss erhalten Sie das Zuriva-Zertifikat &quot;Telefonprofi im Versicherungsvertrieb&quot; und 80 Weiterbildungs-Credits.
                  </p>
                  <div style={{ display: "flex", gap: 6 }}>
                    <span style={{ background: "rgba(255,255,255,0.15)", fontSize: 10, padding: "3px 8px", borderRadius: 12 }}>IDD-konform</span>
                    <span style={{ background: "rgba(255,255,255,0.15)", fontSize: 10, padding: "3px 8px", borderRadius: 12 }}>80 Credits</span>
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
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#022350", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
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
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #022350)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "white", flexShrink: 0 }}>MK</div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 600, color: "#022350", margin: "0 0 4px" }}>Marco Keller</h2>
                  <p style={{ fontSize: 13, color: "#0FA4A0", margin: "0 0 8px", fontWeight: 500 }}>Senior Vertriebstrainer & Telefoncoach</p>
                  <p style={{ fontSize: 13, color: "#9A9AAA", margin: 0 }}>15+ Jahre Erfahrung im Versicherungsvertrieb und Telefoncoaching</p>
                </div>
              </div>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Ueber den Dozenten</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#4A4A5A", margin: "0 0 20px" }}>
                Marco Keller begann seine Karriere als Versicherungsvermittler und hat ueber 50&apos;000 Telefonate im Vertrieb gefuehrt. Nach seiner Zeit als
                Top-Performer gruendete er seine eigene Trainingsagentur und hat seitdem ueber 3&apos;000 Vertriebsmitarbeiter im DACH-Raum geschult.
                Seine praxisnahe Methodik basiert auf echten Erfahrungen aus dem Versicherungsalltag.
              </p>

              <h3 style={{ fontSize: 15, fontWeight: 600, color: "#022350", margin: "0 0 12px" }}>Qualifikationen</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Zertifizierter Vertriebstrainer (BDVT)",
                  "NLP Master Practitioner",
                  "Ehemaliger Vertriebsleiter bei Zurich & Helvetia",
                  "Autor: 'Am Telefon ueberzeugen' (Gabal Verlag)",
                  "Keynote Speaker auf Branchenkongressen",
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
