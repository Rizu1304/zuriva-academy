"use client";
import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Search, Filter, MoreHorizontal, Play, Pause, SkipBack, Volume2, Maximize2, X,
  Send, Paperclip, Image, Mic, Plus, Bell, ChevronRight, FileText, Video, Headphones,
  BarChart3, Star, TrendingUp,
} from "lucide-react";

/* ── Fonts ── */
const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

/* ── Marine Blue Palette ── */
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

/* ── Pastels (muted, professional) ── */
const pastels = {
  navy:  { bg: "#D8DFE8", text: "#1A2D50", accent: "#6680A0" },
  teal:  { bg: "#D0E2E0", text: "#1A4A45", accent: "#5A9A92" },
  blue:  { bg: "#D5DEE8", text: "#1A3A5A", accent: "#6888A8" },
  gold:  { bg: "#E2DCCE", text: "#3A3020", accent: "#9A8A60" },
  slate: { bg: "#DDE0E4", text: "#2A3040", accent: "#7A8090" },
  sage:  { bg: "#D4DED4", text: "#2A3A2A", accent: "#6A8A6A" },
};

/* ── Course Data ── */
const courses = [
  { title: "VBV Grundausbildung", desc: "Pflichtausbildung Versicherungsvermittler", slug: "vbv-grundausbildung", pages: 42, videos: 8, duration: "12 Std.", color: pastels.navy, progress: 58 },
  { title: "Sachversicherung", desc: "Grundlagen der Nicht-Leben Versicherung", slug: "grundlagen-sachversicherung", pages: 24, videos: 5, duration: "6 Std.", color: pastels.teal, progress: 68 },
  { title: "Lebensversicherungen", desc: "Produktkenntnisse Leben & Vorsorge", slug: "lebensversicherungen", pages: 32, videos: 6, duration: "8 Std.", color: pastels.blue, progress: 33 },
  { title: "Compliance & FIDLEG", desc: "Regulatorische Pflichten 2026", slug: "compliance-schulung", pages: 18, videos: 4, duration: "5 Std.", color: pastels.gold, progress: 85 },
  { title: "Beratungskompetenz", desc: "Gesprächsführung und Bedarfsanalyse", slug: "beratungskompetenz", pages: 20, videos: 3, duration: "4 Std.", color: pastels.slate, progress: 12 },
  { title: "Telefontraining", desc: "Professionelle Telefonkommunikation", slug: "telefontraining", pages: 14, videos: 4, duration: "4 Std.", color: pastels.sage, progress: 50 },
];

/* ── Icon mapping for courses ── */
const courseIcons = [
  <FileText key="0" size={18} />,
  <BarChart3 key="1" size={18} />,
  <TrendingUp key="2" size={18} />,
  <BookOpen key="3" size={18} />,
  <MessageSquare key="4" size={18} />,
  <Headphones key="5" size={18} />,
];

/* ── Current Lesson ── */
const currentLesson = { title: "Versicherungsvertragsgesetz (VVG)", subtitle: "Modul 2 · Video 3", time: "5:23 / 23:28" };

/* ── Chat messages ── */
const chatMessages = [
  { sender: "Marco B.", avatar: "MB", text: "Das ist eine häufige Frage. Hast du dir Artikel 3 VVG schon genauer angeschaut?", time: "09:14", own: false },
  { sender: "Du", avatar: "LM", text: "Ja, aber die Unterscheidung zwischen vorvertraglicher und vertraglicher Anzeigepflicht ist mir noch unklar.", time: "09:18", own: true },
];

/* ── Content list items ── */
const contentItems = [
  { title: "VVG Einführung", desc: "Grundlagen des Versicherungsvertrag...", duration: "15:48", active: false },
  { title: "VVG-Revision 2022", desc: "Die wichtigsten Neuerungen im Überb...", duration: "23:28", active: true },
  { title: "Vertragsabschluss", desc: "Antrag, Annahme, Police — der Proz...", duration: "12:16", active: false },
  { title: "Pflichten & Rechte", desc: "Versicherungsnehmer und Versicherer...", duration: "15:12", active: false },
  { title: "Quiz: VVG Basics", desc: "10 Fragen zum Selbsttest", duration: "~5 Min.", active: false },
];

/* ── Sidebar Navigation ── */
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: true },
  { icon: BookOpen, label: "Kurse", href: "/courses", active: false },
  { icon: Map, label: "Lernpfade", href: "/lernpfade", active: false },
  { icon: MessageSquare, label: "Forum", href: "/forum", active: false },
  { icon: Clock, label: "Prüfungen", href: "/pruefungen", active: false },
  { icon: Award, label: "Zertifikate", href: "/zertifikate", active: false },
];

const adminItems = [
  { icon: Settings, label: "Admin", href: "/admin", active: false },
  { icon: Gamepad2, label: "Kahoot", href: "/kahoot", active: false },
];

/* ── Filters ── */
const allFilters = ["VBV", "Compliance"];

export default function Dashboard() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["VBV", "Compliance"]);
  const [contentTab, setContentTab] = useState<"files" | "videos" | "audio">("videos");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFilter = (f: string) => {
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bgColor, overflow: "hidden" }}>

      {/* ═══ ICON SIDEBAR ═══ */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        {/* Logo */}
        <div style={{ width: 42, height: 42, borderRadius: 14, background: marine, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(2,35,80,0.25)" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </div>

        {/* Nav icons */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: item.active ? "rgba(255,255,255,0.9)" : "transparent",
              boxShadow: item.active ? "0 2px 10px rgba(2,35,80,0.08)" : "none",
              textDecoration: "none", color: item.active ? marine : "#8090A0", transition: "all 0.2s",
            }}><item.icon size={20} strokeWidth={item.active ? 2.2 : 1.8} /></a>
          ))}
          <div style={{ height: 1, background: "rgba(2,35,80,0.08)", margin: "8px 8px" }} />
          {adminItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", textDecoration: "none", color: "#8090A0",
            }}><item.icon size={20} strokeWidth={1.8} /></a>
          ))}
        </div>

        {/* Notification + Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#8090A0", cursor: "pointer" }}><Bell size={20} /></div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg, ${marine}, ${marineMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", boxShadow: "0 2px 8px rgba(2,35,80,0.2)" }}>LM</div>
        </div>
      </aside>

      {/* ═══ LEFT PANEL — Syllabus ═══ */}
      <div style={{ width: 360, minWidth: 360, ...glass, borderRadius: "22px 0 0 22px", margin: "10px 0 10px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "28px 28px 0" }}>
          {/* Greeting */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ fontSize: 14, color: "#6B7A8A" }}>Hallo, Laura</div>
            <button style={{ width: 32, height: 32, borderRadius: 10, border: "1px solid rgba(2,35,80,0.08)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7A8A" }}><MoreHorizontal size={16} /></button>
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: marine, lineHeight: 1.15, marginBottom: 20 }}>
            Dein<br />Lernplan
          </div>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(2,35,80,0.03)", borderRadius: 14, padding: "10px 16px", border: "1px solid rgba(2,35,80,0.06)" }}>
              <input type="text" placeholder="Suchen..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: 13, fontFamily: b, color: marine }} />
            </div>
            <button style={{ width: 42, height: 42, borderRadius: 14, background: marine, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
              <Search size={16} color="white" />
            </button>
          </div>

          {/* Filter Chips */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            <button style={{ width: 34, height: 34, borderRadius: 10, border: "1px solid rgba(2,35,80,0.08)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#6B7A8A", flexShrink: 0 }}><Filter size={14} /></button>
            {activeFilters.map((f) => (
              <button key={f} onClick={() => toggleFilter(f)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 20,
                background: marine, color: "white", border: "none", fontSize: 12, fontWeight: 500,
                cursor: "pointer", fontFamily: b,
              }}>
                {f} <X size={10} style={{ opacity: 0.7 }} />
              </button>
            ))}
          </div>
        </div>

        {/* Featured Course Card */}
        <div style={{ padding: "0 28px", marginBottom: 16 }}>
          <div style={{ background: courses[0].color.bg, borderRadius: 20, padding: "20px 22px", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: courses[0].color.text, marginBottom: 4 }}>{courses[0].title}</div>
                <div style={{ fontSize: 12, color: courses[0].color.accent, lineHeight: 1.4, maxWidth: 180 }}>{courses[0].desc}</div>
              </div>
              <button style={{ width: 28, height: 28, borderRadius: 8, border: "none", background: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: courses[0].color.text }}><MoreHorizontal size={14} /></button>
            </div>
            <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
              <div><div style={{ fontSize: 9, fontWeight: 600, color: courses[0].color.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Seiten</div><div style={{ fontSize: 26, fontWeight: 700, color: courses[0].color.text, fontFamily: h }}>{courses[0].pages}</div></div>
              <div><div style={{ fontSize: 9, fontWeight: 600, color: courses[0].color.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Videos</div><div style={{ fontSize: 26, fontWeight: 700, color: courses[0].color.text, fontFamily: h }}>{courses[0].videos}</div></div>
              <div><div style={{ fontSize: 9, fontWeight: 600, color: courses[0].color.accent, textTransform: "uppercase", letterSpacing: "0.05em" }}>Dauer</div><div style={{ fontSize: 12, fontWeight: 600, color: courses[0].color.text, marginTop: 8 }}>{courses[0].duration}</div></div>
            </div>
            <div style={{ marginTop: 14 }}>
              <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.5)" }}><div style={{ height: 4, borderRadius: 2, background: courses[0].color.text, width: courses[0].progress + "%", opacity: 0.5 }} /></div>
              <div style={{ fontSize: 10, color: courses[0].color.accent, marginTop: 4, textAlign: "right" }}>{courses[0].progress}%</div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 28px 20px" }}>
          {courses.slice(1).map((course, i) => (
            <a key={i} href={`/lernpfade/${course.slug}`} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", marginBottom: 6,
              borderRadius: 16, background: course.color.bg, textDecoration: "none",
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: course.color.text }}>
                {courseIcons[i + 1]}
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, padding: "10px", minWidth: 0 }}>

        {/* ── Video Player ── */}
        <div style={{ ...glass, flex: 1.2, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1, background: `linear-gradient(135deg, ${marine} 0%, ${marineMid} 40%, ${marineLight} 100%)`, position: "relative", borderRadius: "22px 22px 0 0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 60% 40%, rgba(27,111,194,0.15) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", top: -40, right: -20, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

            <div style={{ position: "absolute", top: 24, left: 28, zIndex: 2 }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: "white", marginBottom: 4 }}>{currentLesson.title}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>{currentLesson.subtitle}</div>
            </div>

            <button style={{ position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: 12, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}>
              <X size={16} color="white" />
            </button>

            <div style={{ width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
              <Play size={28} color="white" fill="white" style={{ marginLeft: 3 }} />
            </div>

            <svg viewBox="0 0 400 300" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, zIndex: 0 }}>
              <circle cx="280" cy="120" r="80" fill="white" />
              <circle cx="160" cy="200" r="50" fill="white" />
              <rect x="60" y="60" width="80" height="60" rx="10" fill="white" />
            </svg>
          </div>

          {/* Video controls */}
          <div style={{ padding: "14px 24px", display: "flex", alignItems: "center", gap: 16, background: `${marine}f2`, borderRadius: "0 0 22px 22px" }}>
            <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex" }}><SkipBack size={16} /></button>
            <button style={{ background: "none", border: "none", color: "white", cursor: "pointer", display: "flex" }}><Play size={18} fill="white" /></button>
            <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", display: "flex" }}><Clock size={16} /></button>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", minWidth: 90 }}>{currentLesson.time}</span>
            <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", position: "relative", cursor: "pointer" }}>
              <div style={{ width: "22%", height: 4, borderRadius: 2, background: "white" }} />
              <div style={{ position: "absolute", top: -4, left: "22%", width: 12, height: 12, borderRadius: "50%", background: "white", boxShadow: "0 1px 6px rgba(0,0,0,0.3)", transform: "translateX(-50%)" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex" }}><FileText size={14} /></button>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex" }}><Volume2 size={14} /></button>
              <button style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", display: "flex" }}><Maximize2 size={14} /></button>
            </div>
          </div>
        </div>

        {/* ── Course Chat ── */}
        <div style={{ ...glass, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 24px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(2,35,80,0.05)" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: marine }}>Kurs-Chat</div>
              <div style={{ fontSize: 11, color: "#8090A0", marginTop: 2 }}>18 Teilnehmer, 3 online</div>
            </div>
            <button style={{ width: 32, height: 32, borderRadius: 10, border: "1px solid rgba(2,35,80,0.06)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8090A0" }}><Maximize2 size={14} /></button>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            {chatMessages.map((msg, i) => (
              <div key={i} style={{ display: "flex", flexDirection: msg.own ? "row-reverse" : "row", gap: 10, alignItems: "flex-end" }}>
                {!msg.own && (
                  <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${marineMid}, ${marineLight})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>{msg.avatar}</div>
                )}
                <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: msg.own ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: msg.own ? "#D8DFE8" : "rgba(2,35,80,0.03)" }}>
                  {!msg.own && <div style={{ fontSize: 11, fontWeight: 600, color: "#6B7A8A", marginBottom: 4 }}>{msg.sender}</div>}
                  <div style={{ fontSize: 13, color: marine, lineHeight: 1.5 }}>{msg.text}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg, #5A9A92, #70B0A8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>SK</div>
              <div style={{ padding: "12px 16px", borderRadius: "16px 16px 16px 4px", background: "rgba(2,35,80,0.03)" }}>
                <div style={{ display: "flex", gap: 4 }}>{[0, 1, 2].map((d) => (<div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#8090A0", opacity: 0.4 }} />))}</div>
              </div>
            </div>
          </div>

          <div style={{ padding: "12px 20px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(2,35,80,0.03)", borderRadius: 16, padding: "10px 16px", border: "1px solid rgba(2,35,80,0.05)" }}>
              <input type="text" placeholder="Nachricht schreiben..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: b, color: marine }} />
              <button style={{ width: 34, height: 34, borderRadius: 12, background: marine, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Send size={14} color="white" />
              </button>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, paddingLeft: 4 }}>
              {[{ Icon: Paperclip, label: "Dateien" }, { Icon: Image, label: "Bilder" }, { Icon: Mic, label: "Audio" }, { Icon: Plus, label: "" }].map((btn, i) => (
                <button key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.06)", background: "white", fontSize: 12, color: "#6B7A8A", cursor: "pointer", fontFamily: b }}>
                  <btn.Icon size={13} />
                  {btn.label && <span>{btn.label}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Content ═══ */}
      <div style={{ width: 300, minWidth: 300, ...glass, borderRadius: "0 22px 22px 0", margin: "10px 10px 10px 0", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "24px 24px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: marine }}>VBV Grundausbildung</div>
              <div style={{ fontSize: 12, color: "#8090A0", marginTop: 2 }}>Modul 2</div>
            </div>
            <button style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(2,35,80,0.06)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#8090A0" }}><MoreHorizontal size={14} /></button>
          </div>

          <div style={{ display: "flex", gap: 6, marginTop: 18 }}>
            {(["files", "videos", "audio"] as const).map((tab) => (
              <button key={tab} onClick={() => setContentTab(tab)} style={{
                padding: "8px 18px", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: b,
                background: contentTab === tab ? marine : "rgba(2,35,80,0.04)",
                color: contentTab === tab ? "white" : "#6B7A8A",
              }}>
                {tab === "files" ? "Dateien" : tab === "videos" ? "Videos" : "Audio"}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 16px 20px" }}>
          {contentItems.map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 14px", marginBottom: 4,
              borderRadius: 16, cursor: "pointer",
              background: item.active ? "#D8DFE8" : "transparent",
              border: item.active ? `1px solid rgba(2,35,80,0.1)` : "1px solid transparent",
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                background: item.active ? marine : "rgba(2,35,80,0.04)",
                color: item.active ? "white" : "#8090A0",
              }}>
                {item.active ? <Pause size={14} /> : <Play size={14} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.active ? marine : "#2A3A50", marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "#8090A0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.desc}</div>
              </div>
              <div style={{ fontSize: 12, color: item.active ? marine : "#8090A0", fontWeight: 500, flexShrink: 0 }}>{item.duration}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "16px 24px 20px", borderTop: "1px solid rgba(2,35,80,0.05)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 11, color: "#8090A0" }}>Fortschritt</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: marine }}>58%</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: "rgba(2,35,80,0.06)" }}>
            <div style={{ height: 5, borderRadius: 3, background: `linear-gradient(90deg, ${marine}, ${marineLight})`, width: "58%" }} />
          </div>
          <a href="/lernpfade/vbv-grundausbildung" style={{ display: "block", marginTop: 14, padding: "10px 0", textAlign: "center", background: marine, color: "white", borderRadius: 14, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
            Weiterlernen <ChevronRight size={14} style={{ verticalAlign: "middle", marginLeft: 2 }} />
          </a>
        </div>
      </div>
    </div>
  );
}
