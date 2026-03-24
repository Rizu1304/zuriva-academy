"use client";
import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Search, Timer, FileText, ChevronRight, Star,
} from "lucide-react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const marine = "#022350";
const marineMid = "#0E3057";
const bgColor = "#E4E8F0";
const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 20px rgba(2,35,80,0.06)",
} as const;

const categories = ["Alle", "Nicht-Leben", "Leben", "Soft Skills", "Krankenzusatz", "Compliance"];

const catColors: Record<string, { bg: string; text: string }> = {
  "Nicht-Leben": { bg: "#D8DFE8", text: "#1A2D50" },
  "Leben": { bg: "#D0E2E0", text: "#1A4A45" },
  "Soft Skills": { bg: "#E2DCCE", text: "#3A3020" },
  "Krankenzusatz": { bg: "#D8D8E8", text: "#2A2A50" },
  "Compliance": { bg: "#E4DADA", text: "#5A3030" },
};

const courses = [
  { id: 1, title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", duration: "2h 40min", modules: 6, credits: 8, progress: 68 },
  { id: 2, title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", duration: "4h 15min", modules: 9, credits: 12, progress: 33 },
  { id: 3, title: "FIDLEG und VAG 2026", category: "Compliance", duration: "1h 30min", modules: 4, credits: 6, progress: 0 },
  { id: 4, title: "Beratungskompetenz und Kundenkommunikation", category: "Soft Skills", duration: "3h 00min", modules: 7, credits: 10, progress: 85 },
  { id: 5, title: "Krankentaggeldversicherung Grundlagen", category: "Krankenzusatz", duration: "2h 00min", modules: 5, credits: 8, progress: 0 },
  { id: 6, title: "Haftpflichtversicherung Vertiefung", category: "Nicht-Leben", duration: "3h 30min", modules: 8, credits: 14, progress: 0 },
  { id: 7, title: "Vorsorge und Pensionskasse UVG BVG", category: "Leben", duration: "5h 00min", modules: 11, credits: 18, progress: 0 },
  { id: 8, title: "Compliance im Versicherungsvertrieb", category: "Compliance", duration: "2h 15min", modules: 6, credits: 8, progress: 0 },
  { id: 9, title: "Digitale Tools im Beratungsgespräch", category: "Soft Skills", duration: "1h 45min", modules: 4, credits: 6, progress: 0 },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Kurse", href: "/courses", active: true },
  { icon: Map, label: "Lernpfade", href: "/lernpfade" },
  { icon: MessageSquare, label: "Forum", href: "/forum" },
  { icon: Clock, label: "Prüfungen", href: "/pruefungen" },
  { icon: Award, label: "Zertifikate", href: "/zertifikate" },
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) => {
    const matchCat = activeCategory === "Alle" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

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
            <a key={item.label} href={item.href} title={item.label} style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", textDecoration: "none", color: "#8090A0" }}><item.icon size={20} strokeWidth={1.8} /></a>
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
              <div style={{ fontSize: 14, color: "#8090A0", marginBottom: 4 }}>{filtered.length} Kurse verfügbar</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: marine, lineHeight: 1.15 }}>Alle Kurse</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(2,35,80,0.03)", borderRadius: 14, padding: "10px 16px", border: "1px solid rgba(2,35,80,0.06)", width: 240 }}>
              <Search size={14} color="#8090A0" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Kurse suchen..." style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontSize: 13, fontFamily: b, color: marine }} />
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: "flex", gap: 6, marginTop: 24, marginBottom: 8 }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: "8px 18px", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: b,
                background: activeCategory === cat ? marine : "rgba(2,35,80,0.04)",
                color: activeCategory === cat ? "white" : "#6B7A8A",
              }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px 36px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map((course) => {
              const cc = catColors[course.category] || { bg: "#D8DFE8", text: "#1A2D50" };
              return (
                <div key={course.id} style={{ borderRadius: 20, overflow: "hidden", background: "white", border: "1px solid rgba(2,35,80,0.05)", cursor: "pointer" }}>
                  {/* Header with category color */}
                  <div style={{ height: 100, background: cc.bg, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ position: "absolute", bottom: -10, left: "30%", width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                    <div style={{ position: "absolute", top: 10, left: 12, fontSize: 10, fontWeight: 700, color: cc.text, background: "rgba(255,255,255,0.5)", padding: "3px 10px", borderRadius: 8 }}>{course.category}</div>
                    <div style={{ position: "absolute", top: 10, right: 12, fontSize: 10, fontWeight: 700, color: cc.text, background: "rgba(255,255,255,0.5)", padding: "3px 10px", borderRadius: 8, display: "flex", alignItems: "center", gap: 3 }}><Star size={10} /> {course.credits} Credits</div>
                    {/* Abstract icon */}
                    <FileText size={36} color={cc.text} strokeWidth={1.2} style={{ opacity: 0.2 }} />
                  </div>

                  <div style={{ padding: "16px 18px 18px" }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: marine, marginBottom: 8, lineHeight: 1.35 }}>{course.title}</div>
                    <div style={{ display: "flex", gap: 14, marginBottom: 14 }}>
                      <span style={{ fontSize: 11, color: "#8090A0", display: "flex", alignItems: "center", gap: 4 }}><Timer size={12} /> {course.duration}</span>
                      <span style={{ fontSize: 11, color: "#8090A0", display: "flex", alignItems: "center", gap: 4 }}><BookOpen size={12} /> {course.modules} Module</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "rgba(2,35,80,0.05)", marginBottom: 8 }}>
                      <div style={{ height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${marine}, #1B6FC2)`, width: course.progress + "%" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "#8090A0" }}>{course.progress > 0 ? course.progress + "% abgeschlossen" : "Noch nicht gestartet"}</span>
                      <button style={{ padding: "6px 14px", background: marine, color: "white", border: "none", borderRadius: 10, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: b, display: "flex", alignItems: "center", gap: 4 }}>
                        {course.progress > 0 ? "Weiter" : "Starten"} <ChevronRight size={12} />
                      </button>
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
