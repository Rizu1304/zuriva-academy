"use client";
import { useState, type JSX } from "react";

/* ── Fonts ── */
const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

/* ── New Palette (Lavender / Pastel) ── */
const bg = "#C8BFD6";
const cardBg = "rgba(255,255,255,0.82)";
const cardBorder = "rgba(255,255,255,0.55)";
const glass = {
  background: cardBg,
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 22,
  border: `1px solid ${cardBorder}`,
  boxShadow: "0 2px 20px rgba(80,60,120,0.06)",
} as const;

/* ── Pastel Colors for Course Cards ── */
const pastels = {
  sage: { bg: "#D5E0D5", text: "#3D5A3D", accent: "#7BA37B" },
  lavender: { bg: "#DDD5E8", text: "#4A3D6B", accent: "#8B7AAF" },
  rose: { bg: "#EADADA", text: "#6B3D3D", accent: "#C09090" },
  sky: { bg: "#D5DEE8", text: "#3D4A6B", accent: "#7B8FAF" },
  cream: { bg: "#E8E0D0", text: "#5A4D3D", accent: "#B0A080" },
  mint: { bg: "#D0E8E0", text: "#3D5A4D", accent: "#70B098" },
};

/* ── Course Data ── */
const courses = [
  { title: "VBV Grundausbildung", desc: "Pflichtausbildung Versicherungsvermittler", slug: "vbv-grundausbildung", pages: 42, videos: 8, duration: "12 Std.", color: pastels.lavender, emoji: "📋", progress: 58 },
  { title: "Sachversicherung", desc: "Grundlagen der Nicht-Leben Versicherung", slug: "grundlagen-sachversicherung", pages: 24, videos: 5, duration: "6 Std.", color: pastels.sage, emoji: "🛡️", progress: 68 },
  { title: "Lebensversicherungen", desc: "Produktkenntnisse Leben & Vorsorge", slug: "lebensversicherungen", pages: 32, videos: 6, duration: "8 Std.", color: pastels.sky, emoji: "❤️", progress: 33 },
  { title: "Compliance & FIDLEG", desc: "Regulatorische Pflichten 2026", slug: "compliance-schulung", pages: 18, videos: 4, duration: "5 Std.", color: pastels.cream, emoji: "⚖️", progress: 85 },
  { title: "Beratungskompetenz", desc: "Gesprächsführung und Bedarfsanalyse", slug: "beratungskompetenz", pages: 20, videos: 3, duration: "4 Std.", color: pastels.rose, emoji: "🤝", progress: 12 },
  { title: "Telefontraining", desc: "Professionelle Telefonkommunikation", slug: "telefontraining", pages: 14, videos: 4, duration: "4 Std.", color: pastels.mint, emoji: "📞", progress: 50 },
];

/* ── Video / Lesson data ── */
const currentLesson = {
  title: "Versicherungsvertragsgesetz (VVG)",
  subtitle: "Modul 2 · Video 3",
  time: "5:23 / 23:28",
};

/* ── Chat messages ── */
const chatMessages = [
  { sender: "Marco B.", avatar: "MB", text: "Das ist eine häufige Frage. Hast du dir Artikel 3 VVG schon genauer angeschaut?", time: "09:14", own: false },
  { sender: "Du", avatar: "LM", text: "Ja, aber die Unterscheidung zwischen vorvertraglicher und vertraglicher Anzeigepflicht ist mir noch unklar.", time: "09:18", own: true },
];

/* ── Content list items ── */
const contentItems = [
  { title: "VVG Einführung", desc: "Grundlagen des Versicherungsvertrag...", duration: "15:48", type: "video" as const, active: false },
  { title: "VVG-Revision 2022", desc: "Die wichtigsten Neuerungen im Überb...", duration: "23:28", type: "video" as const, active: true },
  { title: "Vertragsabschluss", desc: "Antrag, Annahme, Police — der Proz...", duration: "12:16", type: "video" as const, active: false },
  { title: "Pflichten & Rechte", desc: "Versicherungsnehmer und Versicherer...", duration: "15:12", type: "video" as const, active: false },
  { title: "Quiz: VVG Basics", desc: "10 Fragen zum Selbsttest", duration: "~5 Min.", type: "quiz" as const, active: false },
];

/* ── Sidebar icons ── */
const sidebarIcons = [
  { icon: "📊", label: "Dashboard", href: "/dashboard", active: true },
  { icon: "📚", label: "Kurse", href: "/courses", active: false },
  { icon: "🗺️", label: "Lernpfade", href: "/lernpfade", active: false },
  { icon: "💬", label: "Forum", href: "/forum", active: false },
  { icon: "⏱️", label: "Prüfungen", href: "/pruefungen", active: false },
  { icon: "🏆", label: "Zertifikate", href: "/zertifikate", active: false },
];

const adminIcons = [
  { icon: "⚙️", label: "Admin", href: "/admin", active: false },
  { icon: "🎮", label: "Kahoot", href: "/kahoot", active: false },
];

/* ── Filters ── */
const allFilters = ["Nicht-Leben", "Leben", "Compliance", "Vorsorge", "Soft Skills", "VBV"];

export default function Dashboard() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["VBV", "Compliance"]);
  const [contentTab, setContentTab] = useState<"files" | "videos" | "audio">("videos");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bg, overflow: "hidden" }}>

      {/* ═══ ICON SIDEBAR ═══ */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        {/* Logo */}
        <div style={{ width: 42, height: 42, borderRadius: 14, background: "#1A1A2E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </div>

        {/* Nav icons */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {sidebarIcons.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: item.active ? "rgba(255,255,255,0.85)" : "transparent",
              boxShadow: item.active ? "0 2px 10px rgba(80,60,120,0.1)" : "none",
              textDecoration: "none", fontSize: 18, transition: "all 0.2s",
            }}>{item.icon}</a>
          ))}
          <div style={{ height: 1, background: "rgba(255,255,255,0.3)", margin: "8px 8px" }} />
          {adminIcons.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", textDecoration: "none", fontSize: 18, opacity: 0.7,
            }}>{item.icon}</a>
          ))}
        </div>

        {/* Notification + Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>🔔</div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg, #4A3D6B, #6B5A8F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", boxShadow: "0 2px 8px rgba(80,60,120,0.2)" }}>LM</div>
        </div>
      </aside>

      {/* ═══ LEFT PANEL — Syllabus ═══ */}
      <div style={{ width: 360, minWidth: 360, ...glass, borderRadius: "22px 0 0 22px", margin: "10px 0 10px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "28px 28px 0" }}>
          {/* Greeting */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ fontSize: 14, color: "#6B6B80" }}>Hallo, Laura</div>
            <button style={{ width: 32, height: 32, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: "#6B6B80" }}>⋯</button>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#1A1A2E", lineHeight: 1.15, marginBottom: 20 }}>
            Dein<br />Lernplan
          </div>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(0,0,0,0.03)", borderRadius: 14, padding: "10px 16px", border: "1px solid rgba(0,0,0,0.05)" }}>
              <span style={{ fontSize: 13, color: "#9A9AAA", flex: 1 }}>
                <input
                  type="text"
                  placeholder="Suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: 13, fontFamily: b, color: "#1A1A2E" }}
                />
              </span>
            </div>
            <button style={{ width: 42, height: 42, borderRadius: 14, background: "#1A1A2E", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <span style={{ fontSize: 16, color: "white" }}>⌕</span>
            </button>
          </div>

          {/* Filter Chips */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            <button style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, cursor: "pointer", color: "#6B6B80", flexShrink: 0 }}>☰</button>
            {activeFilters.map((f) => (
              <button key={f} onClick={() => toggleFilter(f)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20,
                background: "#1A1A2E", color: "white", border: "none", fontSize: 12, fontWeight: 500,
                cursor: "pointer", fontFamily: b,
              }}>
                {f} <span style={{ fontSize: 10, opacity: 0.7 }}>✕</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Course Card */}
        <div style={{ padding: "0 28px", marginBottom: 16 }}>
          <div style={{
            background: courses[0].color.bg, borderRadius: 20, padding: "20px 22px", position: "relative", overflow: "hidden",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: courses[0].color.text, marginBottom: 4 }}>{courses[0].title}</div>
                <div style={{ fontSize: 12, color: courses[0].color.accent, lineHeight: 1.4, maxWidth: 180 }}>{courses[0].desc}</div>
              </div>
              <button style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", color: courses[0].color.text }}>⋯</button>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: courses[0].color.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Seiten</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: courses[0].color.text, fontFamily: h }}>{courses[0].pages}</div>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: courses[0].color.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Videos</div>
                <div style={{ fontSize: 26, fontWeight: 700, color: courses[0].color.text, fontFamily: h }}>{courses[0].videos}</div>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, color: courses[0].color.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>⏱</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: courses[0].color.text, marginTop: 8 }}>{courses[0].duration}</div>
              </div>
            </div>

            {/* Progress */}
            <div style={{ marginTop: 14 }}>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.5)" }}>
                <div style={{ height: 4, borderRadius: 2, background: courses[0].color.text, width: courses[0].progress + "%", opacity: 0.6 }} />
              </div>
              <div style={{ fontSize: 10, color: courses[0].color.accent, marginTop: 4, textAlign: "right" }}>{courses[0].progress}%</div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px 20px" }}>
          {courses.slice(1).map((course, i) => (
            <a key={i} href={`/lernpfade/${course.slug}`} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", marginBottom: 6,
              borderRadius: 16, background: course.color.bg, textDecoration: "none", transition: "all 0.2s",
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {course.emoji}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: course.color.text, marginBottom: 2 }}>{course.title}</div>
                <div style={{ fontSize: 11, color: course.color.accent, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ═══ CENTER AREA ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, padding: "10px 10px 10px 10px", minWidth: 0 }}>

        {/* ── Video Player ── */}
        <div style={{ ...glass, flex: 1.2, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {/* Video area */}
          <div style={{ flex: 1, background: "linear-gradient(135deg, #2C2440 0%, #3D3360 40%, #4A4070 100%)", position: "relative", borderRadius: "22px 22px 0 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Decorative elements simulating video */}
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(200,180,220,0.15) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", top: -40, right: -20, width: 200, height: 200, borderRadius: "50%", background: "rgba(200,180,220,0.08)" }} />

            {/* Title overlay */}
            <div style={{ position: "absolute", top: 24, left: 28, zIndex: 2 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>{currentLesson.title}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{currentLesson.subtitle}</div>
            </div>

            {/* Close button */}
            <button style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: 12, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}>
              <span style={{ fontSize: 16, color: "white" }}>✕</span>
            </button>

            {/* Centered play icon */}
            <div style={{ width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
              <span style={{ fontSize: 28, color: "white", marginLeft: 4 }}>▶</span>
            </div>

            {/* Abstract illustration */}
            <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.06, zIndex: 0 }}>
              <circle cx="280" cy="120" r="80" fill="white" />
              <circle cx="160" cy="200" r="50" fill="white" />
              <rect x="60" y="60" width="80" height="60" rx="10" fill="white" />
              <path d="M300,220 Q340,180 360,240" fill="none" stroke="white" strokeWidth="2" />
            </svg>
          </div>

          {/* Video controls bar */}
          <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 16, background: "rgba(44,36,64,0.95)", borderRadius: "0 0 22px 22px" }}>
            <button style={{ background: "none", border: "none", fontSize: 16, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>⟲</button>
            <button style={{ background: "none", border: "none", fontSize: 18, color: "white", cursor: "pointer" }}>▶</button>
            <button style={{ background: "none", border: "none", fontSize: 16, color: "rgba(255,255,255,0.6)", cursor: "pointer" }}>⏱</button>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 90 }}>{currentLesson.time}</span>
            {/* Progress bar */}
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", position: "relative", cursor: "pointer" }}>
              <div style={{ width: "22%", height: 4, borderRadius: 2, background: "white" }} />
              <div style={{ position: "absolute", top: -4, left: "22%", width: 12, height: 12, borderRadius: "50%", background: "white", boxShadow: "0 1px 6px rgba(0,0,0,0.3)", transform: "translateX(-50%)" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ background: "none", border: "none", fontSize: 14, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>📋</button>
              <button style={{ background: "none", border: "none", fontSize: 14, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>🔊</button>
              <button style={{ background: "none", border: "none", fontSize: 14, color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>⛶</button>
            </div>
          </div>
        </div>

        {/* ── Course Chat ── */}
        <div style={{ ...glass, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Chat header */}
          <div style={{ padding: "18px 24px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#1A1A2E" }}>Kurs-Chat</div>
              <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>18 Teilnehmer, 3 online</div>
            </div>
            <button style={{ width: 32, height: 32, borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer", color: "#6B6B80" }}>↗</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: "flex", flexDirection: msg.own ? "row-reverse" : "row", gap: 10, alignItems: "flex-end" }}>
                {!msg.own && (
                  <div style={{ width: 32, height: 32, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "linear-gradient(135deg, #D5DEE8, #B8C8D8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#4A5A6B" }}>{msg.avatar}</div>
                )}
                <div style={{
                  maxWidth: "75%", padding: "12px 16px", borderRadius: msg.own ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.own ? "#E8E0F0" : "rgba(0,0,0,0.03)",
                }}>
                  {!msg.own && <div style={{ fontSize: 11, fontWeight: 600, color: "#6B6B80", marginBottom: 4 }}>{msg.sender}</div>}
                  <div style={{ fontSize: 13, color: "#1A1A2E", lineHeight: 1.5 }}>{msg.text}</div>
                </div>
              </div>
            ))}
            {/* Typing indicator */}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #D0E8E0, #B0D0C0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#3D5A4D" }}>SK</div>
              <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {[0, 1, 2].map((d) => (
                    <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9A9AAA", opacity: 0.5 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div style={{ padding: "12px 20px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(0,0,0,0.03)", borderRadius: 16, padding: "10px 16px", border: "1px solid rgba(0,0,0,0.05)" }}>
              <input type="text" placeholder="Nachricht schreiben..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: b, color: "#1A1A2E" }} />
              <button style={{ width: 34, height: 34, borderRadius: 12, background: "#1A1A2E", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <span style={{ fontSize: 14, color: "white", transform: "rotate(-45deg)", display: "inline-block" }}>➤</span>
              </button>
            </div>
            {/* Attachment buttons */}
            <div style={{ display: "flex", gap: 8, marginTop: 10, paddingLeft: 4 }}>
              {[
                { icon: "📎", label: "Dateien" },
                { icon: "🖼️", label: "Bilder" },
                { icon: "🎙️", label: "Audio" },
                { icon: "+", label: "" },
              ].map((btn, i) => (
                <button key={i} style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.06)", background: "white", fontSize: 12, color: "#6B6B80",
                  cursor: "pointer", fontFamily: b,
                }}>
                  <span style={{ fontSize: 13 }}>{btn.icon}</span>
                  {btn.label && <span>{btn.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Content ═══ */}
      <div style={{ width: 300, minWidth: 300, ...glass, borderRadius: "0 22px 22px 0", margin: "10px 10px 10px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "24px 24px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#1A1A2E" }}>VBV Grundausbildung</div>
              <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 2 }}>Modul 2</div>
            </div>
            <button style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, cursor: "pointer", color: "#6B6B80" }}>⋯</button>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 6, marginTop: 18 }}>
            {(["files", "videos", "audio"] as const).map((tab) => (
              <button key={tab} onClick={() => setContentTab(tab)} style={{
                padding: "8px 18px", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: b, transition: "all 0.2s",
                background: contentTab === tab ? "#1A1A2E" : "rgba(0,0,0,0.04)",
                color: contentTab === tab ? "white" : "#6B6B80",
              }}>
                {tab === "files" ? "Dateien" : tab === "videos" ? "Videos" : "Audio"}
              </button>
            ))}
          </div>
        </div>

        {/* Content List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>
          {contentItems.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 14px", marginBottom: 4,
              borderRadius: 16, cursor: "pointer", transition: "all 0.2s",
              background: item.active ? "#E8E0F0" : "transparent",
              border: item.active ? "1px solid rgba(100,80,140,0.15)" : "1px solid transparent",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: item.active ? "#4A3D6B" : "rgba(0,0,0,0.04)",
                color: item.active ? "white" : "#9A9AAA",
                fontSize: item.type === "quiz" ? 14 : 12,
              }}>
                {item.type === "quiz" ? "📝" : item.active ? "⏸" : "▶"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.active ? "#2C2440" : "#1A1A2E", marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#9A9AAA", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
              </div>
              <div style={{ fontSize: 12, color: item.active ? "#4A3D6B" : "#9A9AAA", fontWeight: 500, flexShrink: 0 }}>{item.duration}</div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div style={{ padding: "16px 24px 20px", borderTop: "1px solid rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#9A9AAA" }}>Fortschritt</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#4A3D6B" }}>58%</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: "rgba(0,0,0,0.05)" }}>
            <div style={{ height: 5, borderRadius: 3, background: "linear-gradient(90deg, #8B7AAF, #B8A0D0)", width: "58%" }} />
          </div>
          <a href="/lernpfade/vbv-grundausbildung" style={{ display: "block", marginTop: 14, padding: "10px 0", textAlign: "center", background: "#1A1A2E", color: "white", borderRadius: 14, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            Weiterlernen →
          </a>
        </div>
      </div>
    </div>
  );
}
