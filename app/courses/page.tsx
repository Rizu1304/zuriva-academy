"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const categories = ["Alle", "Nicht-Leben", "Leben", "Gen. Faehigkeiten", "Krankenzusatz", "Compliance"];

const catColors: Record<string, string> = {
  "Nicht-Leben": "#0FA4A0",
  "Leben": "#818CF8",
  "Gen. Faehigkeiten": "#D4A843",
  "Krankenzusatz": "#F472B6",
  "Compliance": "#ef4444",
};

const courses = [
  { id: 1, title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", duration: "2h 40min", modules: 6, credits: 8, progress: 68, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { id: 2, title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", duration: "4h 15min", modules: 9, credits: 12, progress: 33, img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80" },
  { id: 3, title: "FIDLEG und VAG 2026", category: "Compliance", duration: "1h 30min", modules: 4, credits: 6, progress: 0, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80" },
  { id: 4, title: "Beratungskompetenz und Kundenkommunikation", category: "Gen. Faehigkeiten", duration: "3h 00min", modules: 7, credits: 10, progress: 85, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80" },
  { id: 5, title: "Krankentaggeldversicherung Grundlagen", category: "Krankenzusatz", duration: "2h 00min", modules: 5, credits: 8, progress: 0, img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80" },
  { id: 6, title: "Haftpflichtversicherung Vertiefung", category: "Nicht-Leben", duration: "3h 30min", modules: 8, credits: 14, progress: 0, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80" },
  { id: 7, title: "Vorsorge und Pensionskasse UVG BVG", category: "Leben", duration: "5h 00min", modules: 11, credits: 18, progress: 0, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80" },
  { id: 8, title: "Compliance im Versicherungsvertrieb", category: "Compliance", duration: "2h 15min", modules: 6, credits: 8, progress: 0, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80" },
  { id: 9, title: "Digitale Tools im Beratungsgespraech", category: "Gen. Faehigkeiten", duration: "1h 45min", modules: 4, credits: 6, progress: 0, img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80" },
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
    <DashboardLayout
      title="Alle Kurse"
      subtitle={`${filtered.length} Kurse verfuegbar`}
      actions={
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Kurse suchen..."
            style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, color: "white", fontFamily: "inherit", width: 160 }}
          />
        </div>
      }
    >
      {/* Category Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 18px",
              borderRadius: 14,
              border: activeCategory === cat ? "1px solid rgba(15,164,160,0.4)" : "1px solid rgba(255,255,255,0.08)",
              background: activeCategory === cat ? "rgba(15,164,160,0.15)" : "rgba(255,255,255,0.03)",
              color: activeCategory === cat ? "#5EEAD4" : "rgba(255,255,255,0.5)",
              fontSize: 12.5,
              fontWeight: activeCategory === cat ? 700 : 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {filtered.map((course, i) => {
          const color = catColors[course.category] || "#0FA4A0";
          return (
            <div key={course.id} className={`glass-card animate-scale-in stagger-${Math.min(i + 1, 8)}`} style={{ overflow: "hidden", cursor: "pointer", padding: 0 }}>
              {/* Color accent line */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}66)` }} />

              {/* Image */}
              <div style={{ height: 150, overflow: "hidden", position: "relative" }}>
                <img src={course.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35) saturate(0.7)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(10,14,39,0.9) 100%)" }} />
                <div style={{ position: "absolute", top: 12, left: 14 }}>
                  <span style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>{course.category}</span>
                </div>
                <div style={{ position: "absolute", top: 10, right: 14 }}>
                  <span className="gold-gradient-text" style={{ fontSize: 13, fontWeight: 800 }}>{course.credits} Cr</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "18px 20px 20px" }}>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: "white", marginBottom: 12, lineHeight: 1.4 }}>{course.title}</div>
                <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {course.duration}
                  </span>
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                    {course.modules} Module
                  </span>
                </div>
                <div style={{ background: "rgba(255,255,255,0.06)", height: 4, borderRadius: 4, marginBottom: 10 }}>
                  <div style={{ height: 4, borderRadius: 4, background: `linear-gradient(90deg, ${color}, ${color}88)`, width: course.progress + "%", boxShadow: course.progress > 0 ? `0 0 10px ${color}40` : "none" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.4)" }}>{course.progress > 0 ? course.progress + "% abgeschlossen" : "Noch nicht gestartet"}</span>
                  <button className="premium-btn" style={{ padding: "7px 16px", fontSize: 12, background: course.progress > 0 ? "linear-gradient(135deg, #0FA4A0, #0d8c89)" : "rgba(255,255,255,0.08)", border: course.progress > 0 ? "none" : "1px solid rgba(255,255,255,0.12)" }}>
                    {course.progress > 0 ? "Weiter" : "Starten"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
