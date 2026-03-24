"use client";
import { useState } from "react";

const exams = [
  { id: 1, title: "Sachversicherung -- Modul 3", course: "Grundlagen Sachversicherung", due: "28.03.2026", status: "pending", score: null, passing: 70, urgent: true },
  { id: 2, title: "Lebensversicherungen Abschlusspruefung", course: "Lebensversicherungen", due: "15.04.2026", status: "pending", score: null, passing: 75, urgent: false },
  { id: 3, title: "Trainee Grundausbildung -- Abschluss", course: "Trainee Grundausbildung", due: "01.03.2026", status: "passed", score: 94, passing: 70, urgent: false },
  { id: 4, title: "Beratungskompetenz Quiz", course: "Beratungskompetenz", due: "10.02.2026", status: "passed", score: 88, passing: 70, urgent: false },
  { id: 5, title: "FIDLEG Grundlagen", course: "FIDLEG und VAG 2026", due: "30.04.2026", status: "locked", score: null, passing: 80, urgent: false },
];

const F = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif";
const navy = "#022350";
const teal = "#0FA4A0";
const gold = "#C8A24D";
const bg = "#f5f5f7";
const cardShadow = "0 1px 2px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)";
const glass = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(24px) saturate(180%)",
  WebkitBackdropFilter: "blur(24px) saturate(180%)",
};

const fadeKeyframes = `
@keyframes zuriva-fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "grid" },
  { name: "Kurse", href: "/courses", icon: "book" },
  { name: "Lernpfade", href: "/lernpfade", icon: "route" },
  { name: "Pruefungen", href: "/pruefungen", icon: "exam", active: true },
  { name: "Zertifikate", href: "/zertifikate", icon: "cert" },
  { name: "Forum", href: "#", icon: "chat" },
  { name: "Analytics", href: "#", icon: "chart" },
];

function NavIcon({ type, color }: { type: string; color: string }) {
  const s = { width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" } as const;
  const svgProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "grid":
      return <span style={s}><svg {...svgProps}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></span>;
    case "book":
      return <span style={s}><svg {...svgProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>;
    case "route":
      return <span style={s}><svg {...svgProps}><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6h4a4 4 0 0 1 0 8h-1a4 4 0 0 0 0 8h4"/></svg></span>;
    case "exam":
      return <span style={s}><svg {...svgProps}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>;
    case "cert":
      return <span style={s}><svg {...svgProps}><circle cx="12" cy="8" r="6"/><path d="M15.5 14.5L17 22l-5-3-5 3 1.5-7.5"/></svg></span>;
    case "chat":
      return <span style={s}><svg {...svgProps}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>;
    case "chart":
      return <span style={s}><svg {...svgProps}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>;
    default:
      return null;
  }
}

export default function Pruefungen() {
  const [activeTab, setActiveTab] = useState("alle");

  const filtered = exams.filter((e) => {
    if (activeTab === "alle") return true;
    if (activeTab === "offen") return e.status === "pending";
    if (activeTab === "bestanden") return e.status === "passed";
    if (activeTab === "gesperrt") return e.status === "locked";
    return true;
  });

  return (
    <>
      <style>{fadeKeyframes}</style>
      <div
        style={{
          display: "flex",
          height: "100vh",
          fontFamily: F,
          background: bg,
          overflow: "hidden",
          color: navy,
        }}
      >
        {/* Sidebar */}
        <aside
          style={{
            width: 260,
            minWidth: 260,
            ...glass,
            display: "flex",
            flexDirection: "column",
            boxShadow: "1px 0 0 rgba(0,0,0,0.04)",
          }}
        >
          {/* Logo */}
          <div
            style={{
              padding: "28px 24px 24px",
              display: "flex",
              alignItems: "baseline",
              gap: 7,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: navy,
              }}
            >
              ZURIVA
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: gold,
                letterSpacing: "0.02em",
              }}
            >
              academy
            </span>
          </div>

          {/* Nav */}
          <nav style={{ padding: "4px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: item.active ? "rgba(15,164,160,0.08)" : "transparent",
                  color: item.active ? navy : "#6e6e80",
                  fontWeight: item.active ? 600 : 450,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "background 0.2s ease",
                }}
              >
                <NavIcon type={item.icon} color={item.active ? teal : "#8e8ea0"} />
                {item.name}
                {item.active && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: teal,
                      marginLeft: "auto",
                    }}
                  />
                )}
              </a>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* User */}
          <div
            style={{
              padding: "16px 18px",
              margin: "12px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${teal}, #0bc5c1)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: "white",
                flexShrink: 0,
              }}
            >
              LM
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: navy }}>Laura Meier</div>
              <div style={{ fontSize: 11.5, color: "#8e8ea0", fontWeight: 450 }}>Vermittlerin</div>
            </div>
          </div>
        </aside>

        {/* Main area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <header
            style={{
              height: 64,
              ...glass,
              boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
              padding: "0 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div>
              <div style={{ fontSize: 17, fontWeight: 650, color: navy, letterSpacing: "-0.01em" }}>
                Pruefungen
              </div>
              <div style={{ fontSize: 13, color: "#8e8ea0", fontWeight: 400, marginTop: 1 }}>
                Deine Pruefungen und Ergebnisse
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${teal}, #0bc5c1)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: "white",
              }}
            >
              LM
            </div>
          </header>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px 36px" }}>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
              {[
                { key: "alle", label: "Alle" },
                { key: "offen", label: "Offen" },
                { key: "bestanden", label: "Bestanden" },
                { key: "gesperrt", label: "Gesperrt" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 24,
                    border: "none",
                    background: activeTab === tab.key ? navy : "white",
                    color: activeTab === tab.key ? "white" : "#6e6e80",
                    fontSize: 13,
                    fontWeight: activeTab === tab.key ? 600 : 450,
                    cursor: "pointer",
                    fontFamily: F,
                    boxShadow: activeTab === tab.key ? "none" : cardShadow,
                    transition: "all 0.25s ease",
                    letterSpacing: "0.01em",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Exam cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {filtered.map((exam, i) => (
                <div
                  key={exam.id}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    border: "none",
                    boxShadow: exam.urgent
                      ? `0 0 0 2px rgba(231,76,60,0.15), ${cardShadow}`
                      : cardShadow,
                    padding: "22px 28px",
                    opacity: exam.status === "locked" ? 0.55 : 1,
                    animation: "zuriva-fade-in 0.5s ease",
                    animationDelay: `${i * 0.06}s`,
                    animationFillMode: "both",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "space-between",
                      gap: 20,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 6,
                          flexWrap: "wrap",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 16,
                            fontWeight: 620,
                            color: navy,
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {exam.title}
                        </div>
                        {exam.urgent && (
                          <span
                            style={{
                              ...glass,
                              background: "rgba(231,76,60,0.08)",
                              color: "#e74c3c",
                              fontSize: 11,
                              fontWeight: 650,
                              padding: "3px 10px",
                              borderRadius: 20,
                              letterSpacing: "0.02em",
                            }}
                          >
                            Dringend
                          </span>
                        )}
                        {exam.status === "passed" && (
                          <span
                            style={{
                              ...glass,
                              background: "rgba(15,164,160,0.08)",
                              color: teal,
                              fontSize: 11,
                              fontWeight: 650,
                              padding: "3px 10px",
                              borderRadius: 20,
                              letterSpacing: "0.02em",
                            }}
                          >
                            Bestanden
                          </span>
                        )}
                        {exam.status === "locked" && (
                          <span
                            style={{
                              ...glass,
                              background: "rgba(0,0,0,0.03)",
                              color: "#8e8ea0",
                              fontSize: 11,
                              fontWeight: 650,
                              padding: "3px 10px",
                              borderRadius: 20,
                              letterSpacing: "0.02em",
                            }}
                          >
                            Gesperrt
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: "#8e8ea0",
                          marginBottom: 14,
                          fontWeight: 420,
                        }}
                      >
                        Kurs: {exam.course}
                      </div>
                      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        <div style={{ fontSize: 12.5, color: "#8e8ea0", fontWeight: 420 }}>
                          Frist:{" "}
                          <span
                            style={{
                              color: exam.urgent ? "#e74c3c" : navy,
                              fontWeight: 550,
                            }}
                          >
                            {exam.due}
                          </span>
                        </div>
                        <div style={{ fontSize: 12.5, color: "#8e8ea0", fontWeight: 420 }}>
                          Bestehensgrenze:{" "}
                          <span style={{ color: navy, fontWeight: 550 }}>{exam.passing}%</span>
                        </div>
                        {exam.score && (
                          <div style={{ fontSize: 12.5, color: "#8e8ea0", fontWeight: 420 }}>
                            Ergebnis:{" "}
                            <span style={{ color: teal, fontWeight: 650 }}>{exam.score}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      {exam.status === "pending" && (
                        <button
                          style={{
                            padding: "10px 22px",
                            background: exam.urgent
                              ? "linear-gradient(135deg, #e74c3c, #c0392b)"
                              : `linear-gradient(135deg, ${navy}, #0a3a7a)`,
                            color: "white",
                            border: "none",
                            borderRadius: 14,
                            fontSize: 13.5,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: F,
                            whiteSpace: "nowrap",
                            letterSpacing: "0.01em",
                            boxShadow: exam.urgent
                              ? "0 2px 8px rgba(231,76,60,0.25)"
                              : "0 2px 8px rgba(2,35,80,0.2)",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                          }}
                        >
                          Pruefung starten
                        </button>
                      )}
                      {exam.status === "passed" && (
                        <div style={{ textAlign: "center", minWidth: 64 }}>
                          <div
                            style={{
                              fontSize: 32,
                              fontWeight: 700,
                              color: teal,
                              letterSpacing: "-0.02em",
                              lineHeight: 1,
                            }}
                          >
                            {exam.score}%
                          </div>
                          <div
                            style={{
                              fontSize: 11.5,
                              color: "#8e8ea0",
                              fontWeight: 450,
                              marginTop: 4,
                            }}
                          >
                            Erreicht
                          </div>
                        </div>
                      )}
                      {exam.status === "locked" && (
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 12,
                            background: "rgba(0,0,0,0.03)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#8e8ea0"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                      )}
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
