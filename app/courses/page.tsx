"use client";
import { useState } from "react";

const categories = ["Alle", "Nicht-Leben", "Leben", "Gen. Faehigkeiten", "Krankenzusatz", "Compliance", "Verkauf & Kommunikation"];

const courses = [
  { id: 1, title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", duration: "2h 40min", modules: 6, credits: 8, progress: 68, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", color: "#022350" },
  { id: 2, title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", duration: "4h 15min", modules: 9, credits: 12, progress: 33, img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", color: "#0FA4A0" },
  { id: 3, title: "FIDLEG und VAG 2026", category: "Compliance", duration: "1h 30min", modules: 4, credits: 6, progress: 0, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80", color: "#e74c3c" },
  { id: 4, title: "Beratungskompetenz und Kundenkommunikation", category: "Gen. Faehigkeiten", duration: "3h 00min", modules: 7, credits: 10, progress: 85, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", color: "#C8A24D" },
  { id: 5, title: "Krankentaggeldversicherung Grundlagen", category: "Krankenzusatz", duration: "2h 00min", modules: 5, credits: 8, progress: 0, img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", color: "#6366f1" },
  { id: 6, title: "Haftpflichtversicherung Vertiefung", category: "Nicht-Leben", duration: "3h 30min", modules: 8, credits: 14, progress: 0, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", color: "#022350" },
  { id: 7, title: "Vorsorge und Pensionskasse UVG BVG", category: "Leben", duration: "5h 00min", modules: 11, credits: 18, progress: 0, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", color: "#0FA4A0" },
  { id: 8, title: "Compliance im Versicherungsvertrieb", category: "Compliance", duration: "2h 15min", modules: 6, credits: 8, progress: 0, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", color: "#e74c3c" },
  { id: 9, title: "Digitale Tools im Beratungsgespraech", category: "Gen. Faehigkeiten", duration: "1h 45min", modules: 4, credits: 6, progress: 0, img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", color: "#C8A24D" },
  { id: 10, title: "Telefontraining: Meisterklasse", category: "Verkauf & Kommunikation", duration: "40h 00min", modules: 10, credits: 80, progress: 0, img: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?w=600&q=80", color: "#0FA4A0", href: "/courses/telefontraining" },
  { id: 11, title: "Verkaufstraining: Die Kunst des Verkaufens", category: "Verkauf & Kommunikation", duration: "40h 00min", modules: 10, credits: 80, progress: 0, img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", color: "#C8A24D", href: "/courses/verkaufstraining" },
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
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
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

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#022350" }}>Alle Kurse</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>{filtered.length} Kurse verfuegbar</div>
          </div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Kurse suchen..." style={{ padding: "8px 14px", border: "0.5px solid #dce0e6", borderRadius: 10, fontSize: 13, outline: "none", width: 220, background: "#F0F2F5" }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 16px", borderRadius: 20, border: "0.5px solid", borderColor: activeCategory === cat ? "#022350" : "#dce0e6", background: activeCategory === cat ? "#022350" : "white", color: activeCategory === cat ? "white" : "#4A4A5A", fontSize: 12.5, fontWeight: activeCategory === cat ? 600 : 400, cursor: "pointer", fontFamily: "sans-serif" }}>{cat}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {filtered.map(course => {
              const CardWrapper = ({ children }: { children: React.ReactNode }) =>
                (course as any).href ? (
                  <a href={(course as any).href} style={{ textDecoration: "none", color: "inherit" }}>{children}</a>
                ) : (
                  <>{children}</>
                );
              return (
                <CardWrapper key={course.id}>
                  <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", overflow: "hidden", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }}>
                    <div style={{ height: 4, background: course.color }} />
                    <div style={{ height: 140, overflow: "hidden", position: "relative" }}>
                      <img src={course.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85)" }} />
                      <div style={{ position: "absolute", top: 10, left: 12, background: "rgba(0,0,0,0.5)", color: "white", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{course.category}</div>
                      <div style={{ position: "absolute", top: 10, right: 12, background: "rgba(200,162,77,0.9)", color: "white", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{course.credits} Credits</div>
                    </div>
                    <div style={{ padding: "14px 16px" }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: "#022350", marginBottom: 10, lineHeight: 1.35 }}>{course.title}</div>
                      <div style={{ display: "flex", gap: 14, marginBottom: 12 }}>
                        <span style={{ fontSize: 11, color: "#9A9AAA" }}>&#9200; {course.duration}</span>
                        <span style={{ fontSize: 11, color: "#9A9AAA" }}>&#128218; {course.modules} Module</span>
                      </div>
                      <div style={{ background: "#eef0f3", height: 3, borderRadius: 2, marginBottom: 6 }}>
                        <div style={{ height: 3, borderRadius: 2, background: course.color, width: course.progress + "%" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 11, color: "#9A9AAA" }}>{course.progress > 0 ? course.progress + "% abgeschlossen" : "Noch nicht gestartet"}</span>
                        <button style={{ padding: "5px 12px", background: course.progress > 0 ? "#0FA4A0" : "#022350", color: "white", border: "none", borderRadius: 7, fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>{course.progress > 0 ? "Weiter" : "Starten"}</button>
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
