"use client";
import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

/* ── Palette ── */
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
  teal:     { bg: "#D0E8E0", text: "#2D5A4D", accent: "#70B098" },
  red:      { bg: "#EADADA", text: "#6B3D3D", accent: "#C09090" },
  navy:     { bg: "#DDD5E8", text: "#4A3D6B", accent: "#8B7AAF" },
  blue:     { bg: "#D5DEE8", text: "#3D4A6B", accent: "#7B8FAF" },
  indigo:   { bg: "#D8D5E8", text: "#4A3D6B", accent: "#8B7AAF" },
  gold:     { bg: "#E8E0D0", text: "#5A4D3D", accent: "#B0A080" },
  sage:     { bg: "#D5E0D5", text: "#3D5A3D", accent: "#7BA37B" },
};

interface LernpfadData {
  id: number; title: string; slug: string; description: string; icon: string; color: string;
  pastel: keyof typeof pastels; modules: number; hours: number; completed: number;
  status: "done" | "active" | "locked"; credits: number; prerequisite?: string;
}

const sections: { label: string; paths: LernpfadData[] }[] = [
  {
    label: "GRUNDAUSBILDUNG",
    paths: [
      { id: 1, title: "Trainee-Ausbildung", slug: "trainee-ausbildung", description: "Umfassender Einstieg für neue Mitarbeitende bei Zuriva", icon: "🎓", color: "#0FA4A0", pastel: "teal", modules: 8, hours: 8, completed: 8, status: "done", credits: 80 },
      { id: 2, title: "Compliance-Schulung", slug: "compliance-schulung", description: "Regulatorische Pflichtschulungen und Compliance-Grundlagen", icon: "⚖️", color: "#e74c3c", pastel: "red", modules: 5, hours: 5, completed: 5, status: "done", credits: 50 },
    ],
  },
  {
    label: "VBV-ZERTIFIZIERUNG",
    paths: [
      { id: 3, title: "VBV Grundausbildung", slug: "vbv-grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung als Versicherungsvermittler", icon: "📋", color: "#022350", pastel: "navy", modules: 12, hours: 12, completed: 6, status: "active", credits: 120 },
      { id: 4, title: "VBV Krankenkassenzusatz", slug: "vbv-krankenkassenzusatz", description: "Spezialisierung Krankenzusatzversicherungen", icon: "🏥", color: "#1B6FC2", pastel: "blue", modules: 8, hours: 8, completed: 0, status: "locked", credits: 80, prerequisite: "VBV Grundausbildung" },
      { id: 5, title: "VBV Sach- und Vermögen", slug: "vbv-sach-vermoegen", description: "Vertiefung in Sach- und Vermögensversicherungen", icon: "🏢", color: "#6366f1", pastel: "indigo", modules: 10, hours: 10, completed: 0, status: "locked", credits: 100, prerequisite: "VBV Grundausbildung" },
      { id: 6, title: "VBV Mündliche Prüfung", slug: "vbv-muendliche-pruefung", description: "Vorbereitung auf die mündliche VBV-Prüfung", icon: "🎤", color: "#C8A24D", pastel: "gold", modules: 6, hours: 6, completed: 0, status: "locked", credits: 60, prerequisite: "Alle VBV-Kurse" },
    ],
  },
  {
    label: "TRAININGS",
    paths: [
      { id: 7, title: "Telefontraining", slug: "telefontraining", description: "Professionelle Telefongespräche und Terminvereinbarungen", icon: "📞", color: "#0FA4A0", pastel: "sage", modules: 4, hours: 4, completed: 1, status: "active", credits: 40 },
      { id: 8, title: "Verkaufstraining", slug: "verkaufstraining", description: "Verkaufstechniken und Beratungskompetenz", icon: "💼", color: "#C8A24D", pastel: "gold", modules: 6, hours: 6, completed: 0, status: "locked", credits: 60 },
      { id: 9, title: "Einwandbehandlung", slug: "einwandbehandlung", description: "Strategien zur professionellen Einwandbehandlung", icon: "🎯", color: "#1B6FC2", pastel: "blue", modules: 4, hours: 4, completed: 0, status: "locked", credits: 40 },
    ],
  },
];

const allPaths = sections.flatMap((s) => s.paths);
const totalPaths = allPaths.length;
const completedPaths = allPaths.filter((p) => p.status === "done").length;
const activePaths = allPaths.filter((p) => p.status === "active").length;
const totalHours = allPaths.reduce((s, p) => s + p.hours, 0);

/* ── Icon Sidebar ── */
const sidebarIcons = [
  { icon: "📊", label: "Dashboard", href: "/dashboard" },
  { icon: "📚", label: "Kurse", href: "/courses" },
  { icon: "🗺️", label: "Lernpfade", href: "/lernpfade", active: true },
  { icon: "💬", label: "Forum", href: "/forum" },
  { icon: "⏱️", label: "Prüfungen", href: "/pruefungen" },
  { icon: "🏆", label: "Zertifikate", href: "/zertifikate" },
];

export default function Lernpfade() {
  const [filter, setFilter] = useState<"all" | "done" | "active" | "locked">("all");

  const filteredSections = sections.map((s) => ({
    ...s,
    paths: s.paths.filter((p) => filter === "all" || p.status === filter),
  })).filter((s) => s.paths.length > 0);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bg, overflow: "hidden" }}>

      {/* ═══ Icon Sidebar ═══ */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </div>
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
        <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg, #4A3D6B, #6B5A8F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer" }}>LM</div>
      </aside>

      {/* ═══ Main Content ═══ */}
      <div style={{ flex: 1, ...glass, margin: "10px 10px 10px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "28px 36px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 14, color: "#9A9AAA", marginBottom: 4 }}>Dein strukturierter Weg</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.15 }}>Lernpfade</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ padding: "10px 18px", borderRadius: 14, background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, color: "#9A9AAA" }}>Suchen...</span>
                <span style={{ fontSize: 9, color: "#9A9AAA", background: "rgba(0,0,0,0.04)", padding: "3px 7px", borderRadius: 6 }}>⌘K</span>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div style={{ display: "flex", gap: 16, marginTop: 24, marginBottom: 8 }}>
            {[
              { label: "Gesamt", value: totalPaths, color: "#4A3D6B" },
              { label: "Abgeschlossen", value: completedPaths, color: "#70B098" },
              { label: "Aktiv", value: activePaths, color: "#8B7AAF" },
              { label: "Stunden", value: `~${totalHours}h`, color: "#7B8FAF" },
            ].map((stat) => (
              <div key={stat.label} style={{ padding: "16px 24px", borderRadius: 16, background: "rgba(0,0,0,0.02)", border: "1px solid rgba(0,0,0,0.04)", flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 700, color: stat.color, fontFamily: h }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div style={{ display: "flex", gap: 6, marginTop: 16, marginBottom: 8 }}>
            {([["all", "Alle"], ["active", "Aktiv"], ["done", "Abgeschlossen"], ["locked", "Gesperrt"]] as const).map(([key, label]) => (
              <button key={key} onClick={() => setFilter(key)} style={{
                padding: "8px 18px", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: b,
                background: filter === key ? "#1A1A2E" : "rgba(0,0,0,0.04)",
                color: filter === key ? "white" : "#6B6B80",
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 36px 40px" }}>
          {filteredSections.map((section) => (
            <div key={section.label} style={{ marginBottom: 32 }}>
              {/* Section Label */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: "#9A9AAA" }}>{section.label}</span>
                <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.05)" }} />
              </div>

              {/* Path Cards Grid */}
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
                      transition: "all 0.2s",
                    }}>
                      {/* Card Header */}
                      <div style={{ padding: "20px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", flex: 1 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                            {path.icon}
                          </div>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: p.text, marginBottom: 3 }}>{path.title}</div>
                            <div style={{ fontSize: 12, color: p.accent, lineHeight: 1.4 }}>{path.description}</div>
                          </div>
                        </div>
                        {/* Status */}
                        {isDone && <span style={{ fontSize: 10, fontWeight: 700, color: "#4A8A70", background: "rgba(255,255,255,0.6)", padding: "3px 10px", borderRadius: 8, flexShrink: 0 }}>✓ Fertig</span>}
                        {isActive && <span style={{ fontSize: 10, fontWeight: 700, color: p.text, background: "rgba(255,255,255,0.6)", padding: "3px 10px", borderRadius: 8, flexShrink: 0 }}>Aktiv</span>}
                        {isLocked && <span style={{ fontSize: 10, color: "#9A9AAA", flexShrink: 0 }}>🔒</span>}
                      </div>

                      {/* Stats & Progress */}
                      <div style={{ padding: "16px 22px 18px" }}>
                        <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                          <span style={{ fontSize: 11, color: p.accent }}>📚 {path.modules} Module</span>
                          <span style={{ fontSize: 11, color: p.accent }}>⏱ ~{path.hours} Std.</span>
                          <span style={{ fontSize: 11, color: p.accent }}>⭐ {path.credits} Cr.</span>
                        </div>

                        {/* Progress bar */}
                        <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.5)" }}>
                          <div style={{ height: 4, borderRadius: 2, background: p.text, width: progress + "%", opacity: 0.5 }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                          <span style={{ fontSize: 10, color: p.accent }}>{path.completed}/{path.modules} Module</span>
                          <span style={{ fontSize: 11, fontWeight: 700, color: p.text }}>{progress}%</span>
                        </div>

                        {path.prerequisite && (
                          <div style={{ fontSize: 10, color: p.accent, marginTop: 8, opacity: 0.8 }}>
                            ⚠️ Voraussetzung: {path.prerequisite}
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
