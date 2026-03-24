"use client";
import { useState } from "react";

const categories = ["Alle", "Nicht-Leben", "Leben", "Gen. Faehigkeiten", "Krankenzusatz", "Compliance"];

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
];

const F = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif";
const navy = "#022350";
const teal = "#0FA4A0";
const gold = "#C8A24D";
const bg = "#f5f5f7";
const cardShadow = "0 1px 2px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)";
const glass = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" };

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Kurse", href: "/courses", active: true, icon: "courses" },
  { name: "Lernpfade", href: "/lernpfade", icon: "paths" },
  { name: "Pruefungen", href: "/pruefungen", icon: "exams" },
  { name: "Zertifikate", href: "/zertifikate", icon: "certs" },
  { name: "Forum", href: "/forum", icon: "forum" },
  { name: "Analytics", href: "#", icon: "analytics" },
];

function NavIcon({ type, active }: { type: string; active?: boolean }) {
  const color = active ? teal : "#8E8E93";
  const size = 18;
  switch (type) {
    case "dashboard":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "courses":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
          <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
        </svg>
      );
    case "paths":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      );
    case "exams":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
          <line x1="9" y1="11" x2="15" y2="11" />
        </svg>
      );
    case "certs":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
        </svg>
      );
    case "forum":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case "analytics":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    default:
      return null;
  }
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ModuleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function Courses() {
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [search, setSearch] = useState("");

  const filtered = courses.filter(c => {
    const matchCat = activeCategory === "Alle" || c.category === activeCategory;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        @keyframes zuriva-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ display: "flex", height: "100vh", fontFamily: F, background: bg, overflow: "hidden" }}>
        {/* Sidebar */}
        <aside style={{
          width: 260,
          minWidth: 260,
          ...glass,
          display: "flex",
          flexDirection: "column",
          boxShadow: "1px 0 0 rgba(0,0,0,0.04)",
        }}>
          {/* Logo */}
          <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.12em", color: navy }}}>ZURIVA</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: gold }}>academy</span>
          </div>

          {/* Nav items */}
          <nav style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  padding: "10px 14px",
                  color: item.active ? navy : "#6E6E73",
                  background: item.active ? "rgba(15,164,160,0.08)" : "transparent",
                  borderRadius: 12,
                  fontWeight: item.active ? 600 : 450,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "background 0.2s ease",
                  letterSpacing: "-0.01em",
                }}
              >
                <NavIcon type={item.icon} active={item.active} />
                {item.active && (
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: teal,
                    marginRight: -4,
                    flexShrink: 0,
                  }} />
                )}
                {item.name}
              </a>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* User avatar */}
          <div style={{ padding: "16px 16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${teal}, #0DC8C3)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "white",
              letterSpacing: "0.02em",
            }}>LM</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: navy, letterSpacing: "-0.01em" }}>Laura Meier</div>
              <div style={{ fontSize: 11.5, color: "#8E8E93", fontWeight: 450 }}>Vermittlerin</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <div style={{
            ...glass,
            height: 64,
            padding: "0 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: navy, letterSpacing: "-0.01em" }}>Alle Kurse</div>
              <div style={{ fontSize: 12.5, color: "#8E8E93", fontWeight: 450, marginTop: 1 }}>{filtered.length} Kurse verfuegbar</div>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex" }}>
                <SearchIcon />
              </div>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Kurse suchen..."
                style={{
                  padding: "10px 16px 10px 40px",
                  border: "none",
                  borderRadius: 14,
                  fontSize: 13.5,
                  outline: "none",
                  width: 240,
                  background: "white",
                  boxShadow: cardShadow,
                  fontFamily: F,
                  color: navy,
                  fontWeight: 450,
                }}
              />
            </div>
          </div>

          {/* Content area */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px 36px" }}>
            {/* Category filters */}
            <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 24,
                    border: "none",
                    background: activeCategory === cat ? navy : "white",
                    color: activeCategory === cat ? "white" : "#6E6E73",
                    fontSize: 13,
                    fontWeight: activeCategory === cat ? 600 : 500,
                    cursor: "pointer",
                    fontFamily: F,
                    boxShadow: activeCategory === cat ? "none" : cardShadow,
                    transition: "all 0.2s ease",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Course grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 18,
              animation: "zuriva-fade-in 0.5s ease",
            }}>
              {filtered.map(course => (
                <div
                  key={course.id}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: cardShadow,
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = cardShadow;
                  }}
                >
                  {/* Image area */}
                  <div style={{ height: 160, overflow: "hidden", position: "relative" }}>
                    <img
                      src={course.img}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Gradient overlay */}
                    <div style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.15) 100%)",
                    }} />
                    {/* Category badge - glass */}
                    <div style={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      background: "rgba(255,255,255,0.72)",
                      backdropFilter: "blur(16px) saturate(180%)",
                      WebkitBackdropFilter: "blur(16px) saturate(180%)",
                      color: navy,
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 20,
                      letterSpacing: "-0.01em",
                    }}>{course.category}</div>
                    {/* Credits badge - gold tint */}
                    <div style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: "rgba(200,162,77,0.15)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      color: "#A6842F",
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 20,
                      letterSpacing: "-0.01em",
                    }}>
                      <span style={{ marginRight: 2 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#C8A24D" stroke="none" style={{ verticalAlign: "-1px" }}>
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </span>
                      {course.credits} Credits
                    </div>
                  </div>

                  {/* Card content */}
                  <div style={{ padding: "16px 18px 18px" }}>
                    <div style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: navy,
                      marginBottom: 12,
                      lineHeight: 1.4,
                      letterSpacing: "-0.01em",
                    }}>{course.title}</div>

                    <div style={{ display: "flex", gap: 16, marginBottom: 14, alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#8E8E93", display: "flex", alignItems: "center", gap: 5, fontWeight: 450 }}>
                        <ClockIcon />
                        {course.duration}
                      </span>
                      <span style={{ fontSize: 12, color: "#8E8E93", display: "flex", alignItems: "center", gap: 5, fontWeight: 450 }}>
                        <ModuleIcon />
                        {course.modules} Module
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{ background: "#F0F0F2", height: 5, borderRadius: 3, marginBottom: 8, overflow: "hidden" }}>
                      <div style={{
                        height: 5,
                        borderRadius: 3,
                        background: course.progress > 0 ? `linear-gradient(90deg, ${teal}, #0DC8C3)` : "transparent",
                        width: course.progress + "%",
                        transition: "width 0.4s ease",
                      }} />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "#8E8E93", fontWeight: 450 }}>
                        {course.progress > 0 ? course.progress + "% abgeschlossen" : "Noch nicht gestartet"}
                      </span>
                      <button style={{
                        padding: "7px 16px",
                        background: course.progress > 0 ? teal : navy,
                        color: "white",
                        border: "none",
                        borderRadius: 12,
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: F,
                        letterSpacing: "-0.01em",
                        transition: "opacity 0.2s ease",
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
                      >
                        {course.progress > 0 ? "Weiter" : "Starten"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
