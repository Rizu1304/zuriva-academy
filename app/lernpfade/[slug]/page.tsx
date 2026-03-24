"use client";
import { use } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const bg = "#C8BFD6";
const glass = {
  background: "rgba(255,255,255,0.82)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.55)",
  boxShadow: "0 2px 20px rgba(80,60,120,0.06)",
} as const;

const pastels: Record<string, { bg: string; text: string; accent: string }> = {
  teal:   { bg: "#D0E8E0", text: "#2D5A4D", accent: "#70B098" },
  red:    { bg: "#EADADA", text: "#6B3D3D", accent: "#C09090" },
  navy:   { bg: "#DDD5E8", text: "#4A3D6B", accent: "#8B7AAF" },
  blue:   { bg: "#D5DEE8", text: "#3D4A6B", accent: "#7B8FAF" },
  indigo: { bg: "#D8D5E8", text: "#4A3D6B", accent: "#8B7AAF" },
  gold:   { bg: "#E8E0D0", text: "#5A4D3D", accent: "#B0A080" },
  sage:   { bg: "#D5E0D5", text: "#3D5A3D", accent: "#7BA37B" },
};

type Module = { id: string; title: string; desc: string; duration: string; status: "done" | "current" | "locked"; isExam?: boolean };
type PathData = { title: string; description: string; pastel: string; icon: string; credits: number; passRate: number; totalQuestions: number; modules: Module[] };

const allPaths: Record<string, PathData> = {
  "trainee-ausbildung": {
    title: "Trainee-Ausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende bei Zuriva", pastel: "teal", icon: "🎓", credits: 40, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Willkommen bei Zuriva", desc: "Unternehmenskultur, Geschichte und Werte", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "Der Schweizer Versicherungsmarkt", desc: "Überblick, Akteure und Regulierung", duration: "~1 Std.", status: "done" },
      { id: "modul-3", title: "Versicherungs-Grundlagen", desc: "Begriffe, Prinzipien und Vertragsrecht", duration: "~1 Std.", status: "done" },
      { id: "modul-4", title: "Unsere Produktpalette", desc: "Leben, Nicht-Leben, Kranken, Vorsorge", duration: "~1 Std.", status: "done" },
      { id: "modul-5", title: "Kundenkommunikation Basics", desc: "Gesprächsführung und Bedarfsanalyse", duration: "~1 Std.", status: "done" },
      { id: "modul-6", title: "IT-Systeme & Tools", desc: "CRM, Offerten-System, Policenverwaltung", duration: "~1 Std.", status: "done" },
      { id: "modul-7", title: "Deine erste Beratung", desc: "Praxis-Simulation eines Beratungsgesprächs", duration: "~1 Std.", status: "done" },
      { id: "modul-8", title: "Trainee-Abschlussprüfung", desc: "60 Fragen — mindestens 80% zum Bestehen", duration: "~1.5 Std.", status: "done", isExam: true },
    ],
  },
  "compliance-schulung": {
    title: "Compliance-Schulung", description: "Regulatorische Pflichten und Vorschriften", pastel: "red", icon: "⚖️", credits: 30, passRate: 80, totalQuestions: 65,
    modules: [
      { id: "modul-1", title: "FIDLEG im Detail", desc: "Pflichten, Dokumentation und Sanktionen", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "FINIG & Aufsichtsrecht", desc: "Bewilligungspflicht und FINMA-Aufsicht", duration: "~1 Std.", status: "done" },
      { id: "modul-3", title: "Datenschutz & DSG", desc: "Schweizer Datenschutzgesetz", duration: "~1 Std.", status: "done" },
      { id: "modul-4", title: "Geldwäscherei-Bekämpfung", desc: "GwG, Sorgfaltspflichten und Meldepflicht", duration: "~1 Std.", status: "done" },
      { id: "modul-5", title: "Compliance-Abschlussprüfung", desc: "65 Fragen — mindestens 80% zum Bestehen", duration: "~1.5 Std.", status: "done", isExam: true },
    ],
  },
  "vbv-grundausbildung": {
    title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung", pastel: "navy", icon: "📋", credits: 120, passRate: 80, totalQuestions: 70,
    modules: [
      { id: "modul-1", title: "Einführung VBV-Zertifizierung", desc: "Ziele, Ablauf und Anforderungen", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "Versicherungsvertragsgesetz (VVG)", desc: "VVG-Revision, Vertragsabschluss, Pflichten", duration: "~1 Std.", status: "done" },
      { id: "modul-3", title: "Obligationenrecht", desc: "OR-Grundlagen für Versicherungsverträge", duration: "~1 Std.", status: "done" },
      { id: "modul-4", title: "Sozialversicherungssystem", desc: "AHV, IV, BVG, UVG — das 3-Säulen-System", duration: "~1 Std.", status: "done" },
      { id: "modul-5", title: "Lebensversicherung Grundlagen", desc: "Risikolebens-, Kapitallebensversicherung", duration: "~1 Std.", status: "done" },
      { id: "modul-6", title: "Lebensversicherung Vertiefung", desc: "Rückkaufswert, Überschussbeteiligung", duration: "~1 Std.", status: "done" },
      { id: "modul-7", title: "Krankenversicherung (KVG & VVG)", desc: "Obligatorium vs. Zusatzversicherung", duration: "~1 Std.", status: "current" },
      { id: "modul-8", title: "Unfallversicherung (UVG)", desc: "Berufsunfall, Nichtberufsunfall", duration: "~1 Std.", status: "locked" },
      { id: "modul-9", title: "Haftpflichtversicherung", desc: "Privat-, Berufshaftpflicht, Betrieb", duration: "~1 Std.", status: "locked" },
      { id: "modul-10", title: "Motorfahrzeugversicherung", desc: "Haftpflicht, Kasko, Insassen", duration: "~1 Std.", status: "locked" },
      { id: "modul-11", title: "Berufliche Vorsorge (BVG)", desc: "2. Säule, Pensionskasse", duration: "~1 Std.", status: "locked" },
      { id: "modul-12", title: "Abschlussprüfung", desc: "70 Fragen — mindestens 80%", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "vbv-krankenkassenzusatz": {
    title: "VBV Krankenkassenzusatz", description: "Spezialisierung Krankenzusatzversicherungen", pastel: "blue", icon: "🏥", credits: 80, passRate: 80, totalQuestions: 65,
    modules: [
      { id: "modul-1", title: "KVG Grundlagen", desc: "Obligatorische Krankenpflegeversicherung", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Zusatzversicherungen nach VVG", desc: "Rechtsgrundlagen und Vertragsfreiheit", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Spitalversicherungen", desc: "Allgemein, Halbprivat, Privat", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Ambulante Zusätze", desc: "Alternativmedizin, Brille, Ausland", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "Zahnversicherung", desc: "Leistungsumfang und Wartefristen", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Taggeldversicherung", desc: "KVG-Taggeld vs. VVG-Taggeld", duration: "~1 Std.", status: "locked" },
      { id: "modul-7", title: "Prämienberechnung", desc: "Risikoselektion und Kalkulation", duration: "~1 Std.", status: "locked" },
      { id: "modul-8", title: "Abschlussprüfung", desc: "65 Fragen — mindestens 80%", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "vbv-sach-vermoegen": {
    title: "VBV Sach- und Vermögen", description: "Vertiefung in Sach- und Vermögensversicherungen", pastel: "indigo", icon: "🏢", credits: 100, passRate: 80, totalQuestions: 70,
    modules: [
      { id: "modul-1", title: "Sachversicherung Grundlagen", desc: "Prinzipien, Deckung, Bewertung", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Hausratversicherung", desc: "Deckung, Unterversicherung", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Gebäudeversicherung", desc: "Kantonale vs. private Versicherung", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Betriebsversicherungen", desc: "Betriebsunterbrechung, Maschinenbruch", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "Technische Versicherungen", desc: "Montage, Bauwesen, Elektronik", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Transportversicherung", desc: "Waren- und Verkehrshaftung", duration: "~1 Std.", status: "locked" },
      { id: "modul-7", title: "Rechtsschutzversicherung", desc: "Privat-, Verkehrsrechtsschutz", duration: "~1 Std.", status: "locked" },
      { id: "modul-8", title: "Vermögensschaden-Haftpflicht", desc: "D&O, E&O, Berufshaftpflicht", duration: "~1 Std.", status: "locked" },
      { id: "modul-9", title: "Cyber-Versicherung", desc: "Cyber-Risiken, Datenverlust", duration: "~1 Std.", status: "locked" },
      { id: "modul-10", title: "Abschlussprüfung", desc: "70 Fragen — mindestens 80%", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "vbv-muendliche-pruefung": {
    title: "VBV Mündliche Prüfung", description: "Vorbereitung mündliche VBV-Prüfung", pastel: "gold", icon: "🎤", credits: 60, passRate: 80, totalQuestions: 0,
    modules: [
      { id: "modul-1", title: "Aufbau der Prüfung", desc: "Ablauf, Bewertung, Erwartungen", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Beratungssimulation", desc: "Praxisnahe Beratungssituationen", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Fallstudien-Training", desc: "Komplexe Kundenfälle lösen", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Präsentationstechnik", desc: "Überzeugend argumentieren", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "Prüfungsangst bewältigen", desc: "Strategien für souveränes Auftreten", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Generalprobe", desc: "Mock-Prüfung mit Feedback", duration: "~1.5 Std.", status: "locked", isExam: true },
    ],
  },
  "telefontraining": {
    title: "Telefontraining", description: "Professionelle Telefonkommunikation", pastel: "sage", icon: "📞", credits: 20, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Telefonische Gesprächsführung", desc: "Stimme, Tonlage, aktives Zuhören", duration: "~1 Std.", status: "done" },
      { id: "modul-2", title: "Terminvereinbarung", desc: "Kaltakquise und Terminscripts", duration: "~1 Std.", status: "current" },
      { id: "modul-3", title: "Einwände am Telefon", desc: "Häufigste Einwände souverän meistern", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Abschlussprüfung", desc: "60 Fragen — mindestens 80%", duration: "~1 Std.", status: "locked", isExam: true },
    ],
  },
  "verkaufstraining": {
    title: "Verkaufstraining", description: "Verkaufstechniken und Abschlussstrategien", pastel: "gold", icon: "💼", credits: 30, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Verkaufspsychologie", desc: "Kaufmotive, Entscheidungsprozesse", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Bedarfsanalyse", desc: "Fragetechniken und Kundentypen", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Angebotspräsentation", desc: "Nutzen kommunizieren", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Abschlusstechniken", desc: "Kaufsignale, Closing-Strategien", duration: "~1 Std.", status: "locked" },
      { id: "modul-5", title: "After-Sales", desc: "Kundenpflege und Empfehlungen", duration: "~1 Std.", status: "locked" },
      { id: "modul-6", title: "Abschlussprüfung", desc: "60 Fragen — mindestens 80%", duration: "~1 Std.", status: "locked", isExam: true },
    ],
  },
  "einwandbehandlung": {
    title: "Einwandbehandlung", description: "Kundeneinwände professionell behandeln", pastel: "blue", icon: "🎯", credits: 20, passRate: 80, totalQuestions: 60,
    modules: [
      { id: "modul-1", title: "Einwände verstehen", desc: "Typen, Vorwände erkennen", duration: "~1 Std.", status: "locked" },
      { id: "modul-2", title: "Häufigste Einwände", desc: "«Zu teuer», «Brauche ich nicht»", duration: "~1 Std.", status: "locked" },
      { id: "modul-3", title: "Techniken", desc: "Bumerang, Ja-aber, Reframing", duration: "~1 Std.", status: "locked" },
      { id: "modul-4", title: "Abschlussprüfung", desc: "60 Fragen — mindestens 80%", duration: "~1 Std.", status: "locked", isExam: true },
    ],
  },
};

/* ── Icon Sidebar ── */
const sidebarIcons = [
  { icon: "📊", label: "Dashboard", href: "/dashboard" },
  { icon: "📚", label: "Kurse", href: "/courses" },
  { icon: "🗺️", label: "Lernpfade", href: "/lernpfade", active: true },
  { icon: "💬", label: "Forum", href: "/forum" },
  { icon: "⏱️", label: "Prüfungen", href: "/pruefungen" },
  { icon: "🏆", label: "Zertifikate", href: "/zertifikate" },
];

export default function LernpfadDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const path = allPaths[slug];

  if (!path) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: b, background: bg }}>
        <div style={{ ...glass, padding: "40px 48px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1A1A2E" }}>Lernpfad nicht gefunden</div>
          <a href="/lernpfade" style={{ fontSize: 14, color: "#8B7AAF", marginTop: 12, display: "inline-block", textDecoration: "none" }}>← Zurück zu Lernpfade</a>
        </div>
      </div>
    );
  }

  const p = pastels[path.pastel] || pastels.navy;
  const doneCount = path.modules.filter((m) => m.status === "done").length;
  const progress = Math.round((doneCount / path.modules.length) * 100);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bg, overflow: "hidden" }}>

      {/* ═══ Icon Sidebar ═══ */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        <a href="/dashboard" style={{ width: 42, height: 42, borderRadius: 14, background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.15)", textDecoration: "none" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </a>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {sidebarIcons.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: item.active ? "rgba(255,255,255,0.85)" : "transparent",
              boxShadow: item.active ? "0 2px 10px rgba(80,60,120,0.1)" : "none",
              textDecoration: "none", fontSize: 18,
            }}>{item.icon}</a>
          ))}
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg, #4A3D6B, #6B5A8F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white" }}>LM</div>
      </aside>

      {/* ═══ Main Content ═══ */}
      <div style={{ flex: 1, ...glass, margin: "10px 10px 10px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Hero Header */}
        <div style={{ background: p.bg, padding: "28px 36px 24px", flexShrink: 0, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -20, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
          <div style={{ position: "absolute", bottom: -30, right: "30%", width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />

          <a href="/lernpfade" style={{ fontSize: 12, color: p.accent, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>← Zurück zu Lernpfade</a>

          <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
                <div style={{ width: 52, height: 52, borderRadius: 16, background: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>{path.icon}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: p.text }}>{path.title}</div>
              </div>
              <div style={{ fontSize: 14, color: p.accent, marginBottom: 16, maxWidth: 500 }}>{path.description}</div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <span style={{ fontSize: 12, color: p.accent }}>📚 <strong style={{ color: p.text }}>{path.modules.length} Module</strong></span>
                <span style={{ fontSize: 12, color: p.accent }}>⏱ <strong style={{ color: p.text }}>~{path.modules.length} Stunden</strong></span>
                <span style={{ fontSize: 12, color: p.accent }}>⭐ <strong style={{ color: p.text }}>{path.credits} Credits</strong></span>
                <span style={{ fontSize: 12, color: p.accent }}>✅ <strong style={{ color: p.text }}>{path.passRate}%</strong></span>
              </div>
            </div>

            {/* Progress circle */}
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ position: "relative", width: 100, height: 100 }}>
                <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="8" />
                  <circle cx="60" cy="60" r="50" fill="none" stroke={p.text} strokeWidth="8" strokeDasharray={`${(progress / 100) * 314} ${314}`} strokeLinecap="round" opacity="0.6" />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: p.text, fontFamily: h }}>{progress}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Timeline */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px 48px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#6B6B80", marginBottom: 20 }}>{doneCount} von {path.modules.length} Modulen abgeschlossen</div>

            {path.modules.map((mod, i) => {
              const isLast = i === path.modules.length - 1;
              const isDone = mod.status === "done";
              const isCurrent = mod.status === "current";
              const isLocked = mod.status === "locked";

              return (
                <div key={mod.id} style={{ display: "flex", gap: 18, position: "relative" }}>
                  {/* Timeline line */}
                  {!isLast && (
                    <div style={{ position: "absolute", left: 19, top: 44, bottom: -4, width: 2, background: isDone ? `${p.accent}40` : "rgba(0,0,0,0.06)", zIndex: 0 }} />
                  )}

                  {/* Number circle */}
                  <div style={{
                    width: 40, height: 40, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: mod.isExam ? 16 : 13, fontWeight: 700, zIndex: 1,
                    background: isDone ? p.bg : isCurrent ? "white" : "rgba(0,0,0,0.03)",
                    color: isDone ? p.text : isCurrent ? p.text : "#9A9AAA",
                    border: isCurrent ? `2px solid ${p.accent}` : "2px solid transparent",
                    boxShadow: isCurrent ? `0 0 0 4px ${p.accent}20` : "none",
                  }}>
                    {isDone ? "✓" : mod.isExam ? "📝" : i + 1}
                  </div>

                  {/* Module card */}
                  <div style={{
                    flex: 1, padding: "16px 20px", marginBottom: 10, borderRadius: 16,
                    background: isCurrent ? p.bg : "rgba(0,0,0,0.02)",
                    border: isCurrent ? `1px solid ${p.accent}30` : "1px solid rgba(0,0,0,0.04)",
                    opacity: isLocked ? 0.5 : 1,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#1A1A2E" }}>{mod.title}</div>
                          {mod.isExam && <span style={{ fontSize: 9, fontWeight: 700, background: `${p.accent}20`, color: p.text, padding: "2px 8px", borderRadius: 6 }}>PRÜFUNG</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 8 }}>{mod.desc}</div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "#9A9AAA" }}>⏱ {mod.duration}</span>
                          {isDone && <span style={{ fontSize: 10, fontWeight: 600, color: "#70B098", background: "rgba(112,176,152,0.1)", padding: "2px 8px", borderRadius: 6 }}>✓ Abgeschlossen</span>}
                          {isCurrent && <span style={{ fontSize: 10, fontWeight: 600, color: p.text, background: `${p.accent}15`, padding: "2px 8px", borderRadius: 6 }}>● In Bearbeitung</span>}
                          {isLocked && <span style={{ fontSize: 10, color: "#9A9AAA" }}>🔒 Gesperrt</span>}
                        </div>
                      </div>
                      {isCurrent && (
                        <a href={mod.isExam ? `/lernpfade/${slug}/pruefung` : `/lernpfade/${slug}/${mod.id}`} style={{
                          padding: "8px 18px", background: p.text, color: "white",
                          borderRadius: 12, fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
                        }}>Weiterlernen →</a>
                      )}
                      {isDone && (
                        <a href={mod.isExam ? `/lernpfade/${slug}/pruefung` : `/lernpfade/${slug}/${mod.id}`} style={{
                          padding: "8px 16px", background: "rgba(0,0,0,0.03)", color: "#6B6B80",
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
