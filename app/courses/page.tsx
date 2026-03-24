"use client";
import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const categories = ["Alle", "Nicht-Leben", "Leben", "Gen. Fähigkeiten", "Krankenzusatz", "Compliance"];

const courses = [
  { id: 1, title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", duration: "2h 40min", modules: 6, credits: 8, progress: 68, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", color: "#022350" },
  { id: 2, title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", duration: "4h 15min", modules: 9, credits: 12, progress: 33, img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", color: "#0FA4A0" },
  { id: 3, title: "FIDLEG und VAG 2026", category: "Compliance", duration: "1h 30min", modules: 4, credits: 6, progress: 0, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80", color: "#e74c3c" },
  { id: 4, title: "Beratungskompetenz und Kundenkommunikation", category: "Gen. Fähigkeiten", duration: "3h 00min", modules: 7, credits: 10, progress: 85, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", color: "#C8A24D" },
  { id: 5, title: "Krankentaggeldversicherung Grundlagen", category: "Krankenzusatz", duration: "2h 00min", modules: 5, credits: 8, progress: 0, img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", color: "#6366f1" },
  { id: 6, title: "Haftpflichtversicherung Vertiefung", category: "Nicht-Leben", duration: "3h 30min", modules: 8, credits: 14, progress: 0, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", color: "#022350" },
  { id: 7, title: "Vorsorge und Pensionskasse UVG BVG", category: "Leben", duration: "5h 00min", modules: 11, credits: 18, progress: 0, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", color: "#0FA4A0" },
  { id: 8, title: "Compliance im Versicherungsvertrieb", category: "Compliance", duration: "2h 15min", modules: 6, credits: 8, progress: 0, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", color: "#e74c3c" },
  { id: 9, title: "Digitale Tools im Beratungsgespräch", category: "Gen. Fähigkeiten", duration: "1h 45min", modules: 4, credits: 6, progress: 0, img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", color: "#C8A24D" },
];

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [search, setSearch] = useState("");

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === "Alle" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8 }}>academy</span>
        </div>
        <div style={{ padding: "0 12px" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Kurse", href: "/courses", active: true },
            { name: "Lernpfade", href: "/lernpfade" },
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: item.active ? 12 : 12, boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block", transition: "all 0.2s ease" }}>{item.name}</a>
          ))}
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: "#4A4A5A", background: "transparent", borderRadius: 12, fontSize: 13, textDecoration: "none", display: "block", transition: "all 0.2s ease" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>Alle Kurse</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>{filtered.length} Kurse verfügbar</div>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Kurse suchen..." style={{ padding: "8px 14px", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, fontSize: 13, outline: "none", width: 220, background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", fontFamily: b, transition: "all 0.2s ease" }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 16px", borderRadius: 20, border: activeCategory === cat ? "none" : "1px solid rgba(0,0,0,0.06)", background: activeCategory === cat ? "#022350" : "rgba(255,255,255,0.72)", color: activeCategory === cat ? "white" : "#4A4A5A", fontSize: 12.5, fontWeight: activeCategory === cat ? 600 : 400, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>{cat}</button>
            ))}
          </div>

          {/* Course grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(course => (
              <div key={course.id} style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", overflow: "hidden", cursor: "pointer", transition: "all 0.2s ease" }}>
                <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
                  <img src={course.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
                  <div style={{ position: "absolute", top: 10, left: 12, background: "rgba(0,0,0,0.5)", color: "white", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{course.category}</div>
                  <div style={{ position: "absolute", top: 10, right: 12, background: "rgba(200,162,77,0.9)", color: "white", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{course.credits} Credits</div>
                </div>
                <div style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 10, lineHeight: 1.35, fontFamily: h }}>{course.title}</div>
                  <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: "#9A9AAA" }}>⏱ {course.duration}</span>
                    <span style={{ fontSize: 11, color: "#9A9AAA" }}>📖 {course.modules} Module</span>
                  </div>
                  <div style={{ background: "rgba(0,0,0,0.04)", height: 3, borderRadius: 2, marginBottom: 6 }}>
                    <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${course.color}, ${course.color}dd)`, width: course.progress + "%", transition: "all 0.2s ease" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "#9A9AAA" }}>{course.progress > 0 ? course.progress + "% abgeschlossen" : "Noch nicht gestartet"}</span>
                    <button style={{ padding: "5px 12px", background: course.progress > 0 ? "linear-gradient(135deg, #0FA4A0, #0d8e8a)" : "linear-gradient(135deg, #022350, #0E3057)", color: "white", border: "none", borderRadius: 12, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>{course.progress > 0 ? "Weiter" : "Starten"}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
