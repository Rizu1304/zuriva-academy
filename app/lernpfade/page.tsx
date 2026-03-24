"use client";
import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Search, ChevronRight, Lock, CheckCircle2, Circle, BookOpenCheck, Timer, Star,
} from "lucide-react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const marine = "#022350";
const marineMid = "#0E3057";
const marineLight = "#1B6FC2";
const bgColor = "#E4E8F0";
const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 20px rgba(2,35,80,0.06)",
} as const;

const pastels: Record<string, { bg: string; text: string; accent: string }> = {
  teal:   { bg: "#D0E2E0", text: "#1A4A45", accent: "#5A9A92" },
  red:    { bg: "#E4DADA", text: "#5A3030", accent: "#A08080" },
  navy:   { bg: "#D8DFE8", text: "#1A2D50", accent: "#6680A0" },
  blue:   { bg: "#D5DEE8", text: "#1A3A5A", accent: "#6888A8" },
  indigo: { bg: "#D8D8E8", text: "#2A2A50", accent: "#7070A0" },
  gold:   { bg: "#E2DCCE", text: "#3A3020", accent: "#9A8A60" },
  sage:   { bg: "#D4DED4", text: "#2A3A2A", accent: "#6A8A6A" },
};

interface LernpfadData {
  id: number; title: string; slug: string; description: string; pastel: string;
  modules: number; hours: number; completed: number; status: "done" | "active" | "locked";
  credits: number; prerequisite?: string;
}

const sections: { label: string; paths: LernpfadData[] }[] = [
  {
    label: "GRUNDAUSBILDUNG",
    paths: [
      { id: 1, title: "Trainee-Ausbildung", slug: "trainee-ausbildung", description: "Umfassender Einstieg für neue Mitarbeitende bei Zuriva", pastel: "teal", modules: 8, hours: 8, completed: 8, status: "done", credits: 80 },
      { id: 2, title: "Compliance-Schulung", slug: "compliance-schulung", description: "Regulatorische Pflichtschulungen und Compliance-Grundlagen", pastel: "red", modules: 5, hours: 5, completed: 5, status: "done", credits: 50 },
    ],
  },
  {
    label: "VBV-ZERTIFIZIERUNG",
    paths: [
      { id: 3, title: "VBV Grundausbildung", slug: "vbv-grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung als Versicherungsvermittler", pastel: "navy", modules: 12, hours: 12, completed: 6, status: "active", credits: 120 },
      { id: 4, title: "VBV Krankenkassenzusatz", slug: "vbv-krankenkassenzusatz", description: "Spezialisierung Krankenzusatzversicherungen", pastel: "blue", modules: 8, hours: 8, completed: 0, status: "locked", credits: 80, prerequisite: "VBV Grundausbildung" },
      { id: 5, title: "VBV Sach- und Vermögen", slug: "vbv-sach-vermoegen", description: "Vertiefung in Sach- und Vermögensversicherungen", pastel: "indigo", modules: 10, hours: 10, completed: 0, status: "locked", credits: 100, prerequisite: "VBV Grundausbildung" },
      { id: 6, title: "VBV Mündliche Prüfung", slug: "vbv-muendliche-pruefung", description: "Vorbereitung auf die mündliche VBV-Prüfung", pastel: "gold", modules: 6, hours: 6, completed: 0, status: "locked", credits: 60, prerequisite: "Alle VBV-Kurse" },
    ],
  },
  {
    label: "TRAININGS",
    paths: [
      { id: 7, title: "Telefontraining", slug: "telefontraining", description: "Professionelle Telefongespräche und Terminvereinbarungen", pastel: "sage", modules: 4, hours: 4, completed: 1, status: "active", credits: 40 },
      { id: 8, title: "Verkaufstraining", slug: "verkaufstraining", description: "Verkaufstechniken und Beratungskompetenz", pastel: "gold", modules: 6, hours: 6, completed: 0, status: "locked", credits: 60 },
      { id: 9, title: "Einwandbehandlung", slug: "einwandbehandlung", description: "Strategien zur professionellen Einwandbehandlung", pastel: "blue", modules: 4, hours: 4, completed: 0, status: "locked", credits: 40 },
    ],
  },
];

const allPaths = sections.flatMap((s) => s.paths);
const totalPaths = allPaths.length;
const completedPaths = allPaths.filter((p) => p.status === "done").length;
const activePaths = allPaths.filter((p) => p.status === "active").length;
const totalHours = allPaths.reduce((s, p) => s + p.hours, 0);

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Kurse", href: "/courses" },
  { icon: Map, label: "Lernpfade", href: "/lernpfade", active: true },
  { icon: MessageSquare, label: "Forum", href: "/forum" },
  { icon: Clock, label: "Prüfungen", href: "/pruefungen" },
  { icon: Award, label: "Zertifikate", href: "/zertifikate" },
];

export default function Lernpfade() {
  const [filter, setFilter] = useState<"all" | "done" | "active" | "locked">("all");

  const filteredSections = sections.map((s) => ({
    ...s,
    paths: s.paths.filter((p) => filter === "all" || p.status === filter),
  })).filter((s) => s.paths.length > 0);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bgColor, overflow: "hidden" }}>

      {/* Icon Sidebar */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        <a href="/dashboard" style={{ width: 42, height: 42, borderRadius: 14, background: marine, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(2,35,80,0.25)", textDecoration: "none" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </a>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: item.active ? "rgba(255,255,255,0.9)" : "transparent",
              boxShadow: item.active ? "0 2px 10px rgba(2,35,80,0.08)" : "none",
              textDecoration: "none", color: item.active ? marine : "#8090A0",
            }}><item.icon size={20} strokeWidth={item.active ? 2.2 : 1.8} /></a>
          ))}
          <div style={{ height: 1, background: "rgba(2,35,80,0.08)", margin: "8px 8px" }} />
          {[{ icon: Settings, label: "Admin", href: "/admin" }, { icon: Gamepad2, label: "Kahoot", href: "/kahoot" }].map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", textDecoration: "none", color: "#8090A0",
            }}><item.icon size={20} strokeWidth={1.8} /></a>
          ))}
        </div>
        <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg, ${marine}, ${marineMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white" }}>LM</div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, ...glass, margin: "10px 10px 10px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "28px 36px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, color: "#8090A0", marginBottom: 4 }}>Dein strukturierter Weg</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: marine, lineHeight: 1.15 }}>Lernpfade</div>
            </div>
            <div style={{ padding: "10px 18px", borderRadius: 14, background: "rgba(2,35,80,0.03)", border: "1px solid rgba(2,35,80,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
              <Search size={14} color="#8090A0" />
              <span style={{ fontSize: 13, color: "#8090A0" }}>Suchen...</span>
              <span style={{ fontSize: 9, color: "#8090A0", background: "rgba(2,35,80,0.04)", padding: "3px 7px", borderRadius: 6 }}>⌘K</span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 16, marginTop: 24, marginBottom: 8 }}>
            {[
              { label: "Gesamt", value: totalPaths, Icon: BookOpenCheck },
              { label: "Abgeschlossen", value: completedPaths, Icon: CheckCircle2 },
              { label: "Aktiv", value: activePaths, Icon: Circle },
              { label: "Stunden", value: `~${totalHours}h`, Icon: Timer },
            ].map((stat) => (
              <div key={stat.label} style={{ padding: "16px 24px", borderRadius: 16, background: "rgba(2,35,80,0.02)", border: "1px solid rgba(2,35,80,0.05)", flex: 1, display: "flex", alignItems: "center", gap: 14 }}>
                <stat.Icon size={18} color={marine} strokeWidth={1.8} style={{ opacity: 0.5 }} />
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: marine, fontFamily: h }}>{stat.value}</div>
                  <div style={{ fontSize: 11, color: "#8090A0" }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: 6, marginTop: 16, marginBottom: 8 }}>
            {([["all", "Alle"], ["active", "Aktiv"], ["done", "Abgeschlossen"], ["locked", "Gesperrt"]] as const).map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} style={{
                padding: "8px 18px", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: b,
                background: filter === key ? marine : "rgba(2,35,80,0.04)",
                color: filter === key ? "white" : "#6B7A8A",
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 36px 40px" }}>
          {filteredSections.map((section) => (
            <div key={section.label} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "#8090A0" }}>{section.label}</span>
                <div style={{ flex: 1, height: 1, background: "rgba(2,35,80,0.06)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 14 }}>
                {section.paths.map((path) => {
                  const p = pastels[path.pastel] || pastels.navy;
                  const progress = path.modules > 0 ? Math.round((path.completed / path.modules) * 100) : 0;
                  const isLocked = path.status === "locked";
                  const isDone = path.status === "done";
                  const isActive = path.status === "active";

                  return (
                    <a key={path.id} href={`/lernpfade/${path.slug}`} style={{
                      textDecoration: "none", borderRadius: 20, overflow: "hidden",
                      background: p.bg, opacity: isLocked ? 0.6 : 1,
                      border: isActive ? `2px solid ${p.accent}60` : "2px solid transparent",
                    }}>
                      <div style={{ padding: "20px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 700, color: p.text, marginBottom: 3 }}>{path.title}</div>
                          <div style={{ fontSize: 12, color: p.accent, lineHeight: 1.4 }}>{path.description}</div>
                        </div>
                        {isDone && <span style={{ fontSize: 10, fontWeight: 700, color: "#3A7A5A", background: "rgba(255,255,255,0.6)", padding: "3px 10px", borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}><CheckCircle2 size={10} /> Fertig</span>}
                        {isActive && <span style={{ fontSize: 10, fontWeight: 700, color: p.text, background: "rgba(255,255,255,0.6)", padding: "3px 10px", borderRadius: 8, flexShrink: 0 }}>Aktiv</span>}
                        {isLocked && <Lock size={14} color="#8090A0" style={{ flexShrink: 0, marginTop: 2 }} />}
                      </div>

                      <div style={{ padding: "16px 22px 18px" }}>
                        <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                          <span style={{ fontSize: 11, color: p.accent, display: "flex", alignItems: "center", gap: 4 }}><BookOpen size={12} /> {path.modules} Module</span>
                          <span style={{ fontSize: 11, color: p.accent, display: "flex", alignItems: "center", gap: 4 }}><Timer size={12} /> ~{path.hours} Std.</span>
                          <span style={{ fontSize: 11, color: p.accent, display: "flex", alignItems: "center", gap: 4 }}><Star size={12} /> {path.credits} Cr.</span>
                        </div>
                        <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.5)" }}>
                          <div style={{ height: 4, borderRadius: 2, background: p.text, width: progress + "%", opacity: 0.5 }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                          <span style={{ fontSize: 10, color: p.accent }}>{path.completed}/{path.modules} Module</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: p.text }}>{progress}%</span>
                        </div>
                        {path.prerequisite && (
                          <div style={{ fontSize: 10, color: p.accent, marginTop: 8, opacity: 0.8, display: "flex", alignItems: "center", gap: 4 }}>
                            <Lock size={10} /> Voraussetzung: {path.prerequisite}
                          </div>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
