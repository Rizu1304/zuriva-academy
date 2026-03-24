"use client";
import { useState, use } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";
const glass = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)" } as const;

type Module = { id: string; title: string; desc: string; duration: string; status: "done" | "current" | "locked"; isExam?: boolean };
type PathData = { title: string; description: string; color: string; icon: string; credits: number; passRate: number; totalQuestions: number; modules: Module[] };

const allPaths: Record<string, PathData> = {
  "trainee-ausbildung": {
    title: "Trainee-Ausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende bei Zuriva", color: "#0FA4A0", icon: "🎓", credits: 40, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Willkommen bei Zuriva", desc: "Unternehmenskultur, Geschichte und Werte der Zuriva GmbH", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "Der Schweizer Versicherungsmarkt", desc: "Überblick, Akteure und Regulierung", duration: "~1 Std.", status: "done" },
      { id: "modul-3", title: "Versicherungs-Grundlagen", desc: "Begriffe, Prinzipien und Vertragsrecht", duration: "~1 Std.", status: "done" },
      { id: "modul-4", title: "Unsere Produktpalette", desc: "Leben, Nicht-Leben, Kranken, Vorsorge im Überblick", duration: "~1 Std.", status: "done" },
      { id: "modul-5", title: "Kundenkommunikation Basics", desc: "Gesprächsführung und Bedarfsanalyse", duration: "~1 Std.", status: "done" },
      { id: "modul-6", title: "IT-Systeme & Tools", desc: "CRM, Offerten-System, Policenverwaltung", duration: "~1 Std.", status: "done" },
      { id: "modul-7", title: "Deine erste Beratung", desc: "Praxis-Simulation eines Beratungsgesprächs", duration: "~1 Std.", status: "done" },
      { id: "modul-8", title: "Trainee-Abschlussprüfung", desc: "60 Fragen — mindestens 80% zum Bestehen", duration: "~1.5 Std.", status: "done", isExam: true },
    ],
  },
  "compliance-schulung": {
    title: "Compliance-Schulung", description: "Regulatorische Pflichten und Vorschriften für Versicherungsvermittler", color: "#e74c3c", icon: "⚖️", credits: 30, passRate: 80, totalQuestions: 65,
    modules: [
      { id: "modul-1", title: "FIDLEG im Detail", desc: "Pflichten, Dokumentation und Sanktionen", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "FINIG & Aufsichtsrecht", desc: "Bewilligungspflicht und FINMA-Aufsicht", duration: "~1 Std.", status: "done" },
      { id: "modul-3", title: "Datenschutz & DSG", desc: "Schweizer Datenschutzgesetz und Kundeninformationen", duration: "~1 Std.", status: "done" },
      { id: "modul-4", title: "Geldwäscherei-Bekämpfung", desc: "GwG, Sorgfaltspflichten und Meldepflicht", duration: "~1 Std.", status: "done" },
      { id: "modul-5", title: "Compliance-Abschlussprüfung", desc: "65 Fragen — mindestens 80% zum Bestehen", duration: "~1.5 Std.", status: "done", isExam: true },
    ],
  },
  "vbv-grundausbildung": {
    title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung als Versicherungsvermittler", color: "#022350", icon: "📋", credits: 120, passRate: 80, totalQuestions: 70,
    modules: [
      { id: "modul-1", title: "Einführung VBV-Zertifizierung", desc: "Ziele, Ablauf und Anforderungen der Zertifizierung", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "Versicherungsvertragsgesetz (VVG)", desc: "VVG-Revision, Vertragsabschluss, Pflichten", duration: "~1 Std.", status: "done" },
      { id: "modul-3", title: "Obligationenrecht im Versicherungskontext", desc: "OR-Grundlagen für Versicherungsverträge", duration: "~1 Std.", status: "done" },
      { id: "modul-4", title: "Sozialversicherungssystem Schweiz", desc: "AHV, IV, BVG, UVG — das 3-Säulen-System", duration: "~1 Std.", status: "done" },
      { id: "modul-5", title: "Lebensversicherung Grundlagen", desc: "Risikolebens-, Kapitallebensversicherung", duration: "~1 Std.", status: "done" },
      { id: "modul-6", title: "Lebensversicherung Vertiefung", desc: "Rückkaufswert, Überschussbeteiligung, Steuern", duration: "~1 Std.", status: "done" },
      { id: "modul-7", title: "Krankenversicherung (KVG & VVG)", desc: "Obligatorium vs. Zusatzversicherung", duration: "~1 Std.", status: "current" },
      { id: "modul-8", title: "Unfallversicherung (UVG)", desc: "Berufsunfall, Nichtberufsunfall, Leistungen", duration: "~1 Std.", status: "locked" },
      { id: "modul-9", title: "Haftpflichtversicherung", desc: "Privathaftpflicht, Berufshaftpflicht, Betrieb", duration: "~1 Std.", status: "locked" },
      { id: "modul-10", title: "Motorfahrzeugversicherung", desc: "Haftpflicht, Kasko, Insassenversicherung", duration: "~1 Std.", status: "locked" },
      { id: "modul-11", title: "Berufliche Vorsorge (BVG)", desc: "2. Säule, Pensionskasse, Überobligatorium", duration: "~1 Std.", status: "locked" },
      { id: "modul-12", title: "VBV Grundausbildung Abschlussprüfung", desc: "70 Fragen — mindestens 80% zum Bestehen", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "vbv-krankenkassenzusatz": {
    title: "VBV Krankenkassenzusatz", description: "Spezialisierung auf Krankenzusatzversicherungen nach VVG", color: "#1B6FC2", icon: "🏥", credits: 80, passRate: 80, totalQuestions: 65,
    modules: [
      { id: "modul-1", title: "KVG Grundlagen & Obligatorium", desc: "Obligatorische Krankenpflegeversicherung", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Zusatzversicherungen nach VVG", desc: "Rechtsgrundlagen und Vertragsfreiheit", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Spitalversicherungen", desc: "Allgemein, Halbprivat, Privat", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Ambulante Zusatzversicherungen", desc: "Alternativmedizin, Brille, Auslandsschutz", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "Zahnversicherung & Alternative Medizin", desc: "Leistungsumfang und Wartefristen", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Taggeldversicherung", desc: "KVG-Taggeld vs. VVG-Taggeld", duration: "~1 Std.", status: "locked" },
      { id: "modul-7", title: "Prämienberechnung & Gesundheitsprüfung", desc: "Risikoselektion und Prämienkalkulation", duration: "~1 Std.", status: "locked" },
      { id: "modul-8", title: "Krankenkassenzusatz Abschlussprüfung", desc: "65 Fragen — mindestens 80% zum Bestehen", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "vbv-sach-vermoegen": {
    title: "VBV Sach- und Vermögensversicherung", description: "Vertiefung in Sach-, Haftpflicht- und Vermögensversicherungen", color: "#6366f1", icon: "🏢", credits: 100, passRate: 80, totalQuestions: 70,
    modules: [
      { id: "modul-1", title: "Sachversicherung Grundlagen", desc: "Prinzipien, Deckungsumfang, Bewertung", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Hausratversicherung", desc: "Deckung, Unterversicherung, Neuwertersatz", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Gebäudeversicherung", desc: "Kantonale vs. private Gebäudeversicherung", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Betriebsversicherungen", desc: "Betriebsunterbrechung, Maschinenbruch", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "Technische Versicherungen", desc: "Montage, Bauwesen, Elektronik", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Transportversicherung", desc: "Waren-, Valoren- und Verkehrshaftung", duration: "~1 Std.", status: "locked" },
      { id: "modul-7", title: "Rechtsschutzversicherung", desc: "Privat-, Verkehrs- und Berufsrechtsschutz", duration: "~1 Std.", status: "locked" },
      { id: "modul-8", title: "Vermögensschaden-Haftpflicht", desc: "D&O, E&O, Berufshaftpflicht", duration: "~1 Std.", status: "locked" },
      { id: "modul-9", title: "Cyber-Versicherung", desc: "Cyber-Risiken, Datenverlust, Betriebsunterbrechung", duration: "~1 Std.", status: "locked" },
      { id: "modul-10", title: "Sach- & Vermögen Abschlussprüfung", desc: "70 Fragen — mindestens 80% zum Bestehen", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "vbv-muendliche-pruefung": {
    title: "VBV Mündliche Prüfung", description: "Vorbereitung auf die mündliche VBV-Zertifizierungsprüfung", color: "#C8A24D", icon: "🎤", credits: 60, passRate: 80, totalQuestions: 0,
    modules: [
      { id: "modul-1", title: "Aufbau der mündlichen Prüfung", desc: "Ablauf, Bewertungskriterien, Erwartungen", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Kundenberatungssimulation", desc: "Praxisnahe Beratungssituationen üben", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Fallstudien-Training", desc: "Komplexe Kundenfälle analysieren und lösen", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Präsentationstechnik", desc: "Überzeugend präsentieren und argumentieren", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "Prüfungsangst bewältigen", desc: "Strategien für souveränes Auftreten", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Mündliche Generalprobe", desc: "Vollständige Mock-Prüfung mit Feedback", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "telefontraining": {
    title: "Telefontraining", description: "Professionelle Telefonkommunikation für Versicherungsvermittler", color: "#0FA4A0", icon: "📞", credits: 20, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Telefonische Gesprächsführung", desc: "Stimme, Tonlage, aktives Zuhören", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "Terminvereinbarung am Telefon", desc: "Kaltakquise und Terminscripts", duration: "~1 Std.", status: "current" },
      { id: "modul-3", title: "Einwandbehandlung am Telefon", desc: "Die häufigsten Einwände souverän meistern", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Telefontraining Abschlussprüfung", desc: "60 Fragen — mindestens 80% zum Bestehen", duration: "~1 Std.", status: "locked", isExam: true },
    ],
  },
  "verkaufstraining": {
    title: "Verkaufstraining", description: "Verkaufstechniken und Abschlussstrategien", color: "#C8A24D", icon: "💼", credits: 30, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Verkaufspsychologie Grundlagen", desc: "Kaufmotive, Entscheidungsprozesse, Vertrauen", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Bedarfsanalyse & Beratungsgespräch", desc: "Fragetechniken und Kundentypen", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Angebotspräsentation", desc: "Nutzen kommunizieren, Preis-Leistung argumentieren", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Abschlusstechniken", desc: "Kaufsignale erkennen, Closing-Strategien", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "After-Sales & Empfehlungsmanagement", desc: "Kundenpflege und Weiterempfehlungen", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Verkaufstraining Abschlussprüfung", desc: "60 Fragen — mindestens 80% zum Bestehen", duration: "~1 Std.", status: "locked", isExam: true },
    ],
  },
  "einwandbehandlung": {
    title: "Einwandbehandlung", description: "Kundeneinwände professionell behandeln und überwinden", color: "#1B6FC2", icon: "🎯", credits: 20, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Einwände verstehen", desc: "Typen von Einwänden, Vorwände erkennen", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Die häufigsten Kundeneinwände", desc: "«Zu teuer», «Brauche ich nicht», «Muss überlegen»", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Techniken der Einwandbehandlung", desc: "Bumerang, Ja-aber, Gegenfrage, Reframing", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Einwandbehandlung Abschlussprüfung", desc: "60 Fragen — mindestens 80% zum Bestehen", duration: "~1 Std.", status: "locked", isExam: true },
    ],
  },
};

export default function LernpfadDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const path = allPaths[slug];

  if (!path) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: b }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 20, color: "#022350", fontFamily: h }}>Lernpfad nicht gefunden</div>
          <a href="/lernpfade" style={{ fontSize: 14, color: "#0FA4A0", marginTop: 12, display: "inline-block" }}>← Zurück zu Lernpfade</a>
        </div>
      </div>
    );
  }

  const doneCount = path.modules.filter(m => m.status === "done").length;
  const progress = Math.round((doneCount / path.modules.length) * 100);
  const totalHours = path.modules.length;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)", overflow: "hidden" }}>
      {/* SIDEBAR */}
      <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 24px" }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8 }}>academy</span>
        </div>
        <div style={{ padding: "0 12px", flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
          {[
            { name: "Dashboard", href: "/dashboard" }, { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade", active: true }, { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" }, { name: "Forum", href: "/forum" }, { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ display: "block", padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: 12, fontWeight: item.active ? 600 : 400, fontSize: 13.5, textDecoration: "none", boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none" }}>{item.name}</a>
          ))}
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "20px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" }, { name: "Kurseditor", href: "/admin/kurse" }, { name: "Lernpfadeditor", href: "/admin/lernpfade" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" }, { name: "Kahoot-Editor", href: "/admin/kahoot" }, { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ display: "block", padding: "10px 14px", margin: "2px 0", color: "#4A4A5A", background: "transparent", borderRadius: 12, fontSize: 13.5, textDecoration: "none" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Laura Meier</div><div style={{ fontSize: 10, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ flex: 1, overflowY: "auto" }}>

          {/* HERO BANNER */}
          <div style={{ background: `linear-gradient(135deg, ${path.color} 0%, ${path.color}cc 50%, ${path.color}99 100%)`, padding: "36px 40px 32px", position: "relative", overflow: "hidden" }}>
            <svg viewBox="0 0 800 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06 }}>
              <pattern id="heroGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="1" fill="white" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>
            <div style={{ position: "absolute", top: -60, right: -30, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

            <a href="/lernpfade" style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>← Zurück zu Lernpfade</a>

            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <span style={{ fontSize: 36 }}>{path.icon}</span>
                  <div style={{ fontSize: 28, fontWeight: 400, color: "white", fontFamily: h }}>{path.title}</div>
                </div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 20, maxWidth: 500 }}>{path.description}</div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>📚 <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{path.modules.length} Module</span></span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>⏱ <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>~{totalHours} Stunden</span></span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>⭐ <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{path.credits} Credits</span></span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>✅ <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>{path.passRate}% Bestehensquote</span></span>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ position: "relative", width: 110, height: 110 }}>
                  <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="8" strokeDasharray={`${(progress / 100) * 314} ${314}`} strokeLinecap="round" opacity="0.9" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 400, color: "white", fontFamily: h }}>{progress}%</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)" }}>abgeschlossen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MODULE TIMELINE */}
          <div style={{ padding: "32px 40px 48px", maxWidth: 800, margin: "0 auto" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 24 }}>{doneCount} von {path.modules.length} Modulen abgeschlossen</div>

            {path.modules.map((mod, i) => {
              const isLast = i === path.modules.length - 1;
              return (
                <div key={mod.id} style={{ display: "flex", gap: 20, marginBottom: isLast ? 0 : 0, position: "relative" }}>
                  {/* Timeline line */}
                  {!isLast && (
                    <div style={{ position: "absolute", left: 19, top: 44, bottom: -4, width: 2, background: mod.status === "done" ? `${path.color}40` : "rgba(0,0,0,0.06)", zIndex: 0 }} />
                  )}

                  {/* Number circle */}
                  <div style={{
                    width: 40, height: 40, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: mod.isExam ? 16 : 13, fontWeight: 700, zIndex: 1,
                    background: mod.status === "done" ? `linear-gradient(135deg, ${path.color}, ${path.color}cc)` : mod.status === "current" ? "white" : "rgba(0,0,0,0.04)",
                    color: mod.status === "done" ? "white" : mod.status === "current" ? path.color : "#9A9AAA",
                    border: mod.status === "current" ? `2px solid ${path.color}` : "2px solid transparent",
                    boxShadow: mod.status === "current" ? `0 0 0 4px ${path.color}20` : "none",
                  }}>
                    {mod.status === "done" ? "✓" : mod.isExam ? "📝" : i + 1}
                  </div>

                  {/* Module card */}
                  <div style={{
                    ...glass, flex: 1, padding: mod.isExam ? "20px 24px" : "16px 22px", marginBottom: 12,
                    border: mod.isExam ? `1px solid ${path.color}30` : mod.status === "current" ? `1px solid ${path.color}30` : "1px solid rgba(255,255,255,0.6)",
                    opacity: mod.status === "locked" ? 0.55 : 1,
                    background: mod.isExam ? `linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,255,255,0.72))` : "rgba(255,255,255,0.72)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{mod.title}</div>
                          {mod.isExam && <span style={{ fontSize: 9, fontWeight: 700, background: `${path.color}15`, color: path.color, padding: "2px 8px", borderRadius: 6 }}>PRÜFUNG</span>}
                        </div>
                        <div style={{ fontSize: 12.5, color: "#6A6A7A", marginBottom: 8 }}>{mod.desc}</div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "#9A9AAA" }}>⏱ {mod.duration}</span>
                          {mod.status === "done" && <span style={{ fontSize: 10, fontWeight: 600, color: "#0FA4A0", background: "rgba(15,164,160,0.08)", padding: "2px 8px", borderRadius: 6 }}>✓ Abgeschlossen</span>}
                          {mod.status === "current" && <span style={{ fontSize: 10, fontWeight: 600, color: path.color, background: `${path.color}10`, padding: "2px 8px", borderRadius: 6 }}>● In Bearbeitung</span>}
                          {mod.status === "locked" && <span style={{ fontSize: 10, color: "#9A9AAA" }}>🔒 Gesperrt</span>}
                        </div>
                      </div>
                      {mod.status === "current" && (
                        <a href={mod.isExam ? `/lernpfade/${slug}/pruefung` : `/lernpfade/${slug}/${mod.id}`} style={{
                          padding: "8px 18px", background: `linear-gradient(135deg, ${path.color}, ${path.color}cc)`, color: "white",
                          borderRadius: 12, fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
                          boxShadow: `0 2px 8px ${path.color}30`,
                        }}>Weiterlernen →</a>
                      )}
                      {mod.status === "done" && (
                        <a href={mod.isExam ? `/lernpfade/${slug}/pruefung` : `/lernpfade/${slug}/${mod.id}`} style={{
                          padding: "8px 16px", background: "rgba(0,0,0,0.03)", color: "#4A4A5A",
                          borderRadius: 12, fontSize: 12, fontWeight: 500, textDecoration: "none", whiteSpace: "nowrap",
                        }}>Anzeigen</a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
