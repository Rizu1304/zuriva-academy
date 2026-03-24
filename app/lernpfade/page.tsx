"use client";

const F = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif";
const navy = "#022350";
const teal = "#0FA4A0";
const gold = "#C8A24D";
const bg = "#f5f5f7";
const cardShadow = "0 1px 2px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)";
const glass = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" };

const paths = [
  {
    id: 1,
    title: "Trainee Grundausbildung",
    description: "Der perfekte Einstieg fuer neue Mitarbeitende",
    icon: "T",
    color: teal,
    courses: 5,
    completed: 5,
    status: "done" as const,
    credits: 40,
    prerequisite: null as string | null,
  },
  {
    id: 2,
    title: "VBV Grundausbildung",
    description: "Pflichtausbildung fuer die VBV-Zertifizierung",
    icon: "V",
    color: navy,
    courses: 10,
    completed: 6,
    status: "active" as const,
    credits: 120,
    prerequisite: null as string | null,
  },
  {
    id: 3,
    title: "Spezialisierung Nicht-Leben",
    description: "Vertiefung in Sach- und Haftpflichtversicherungen",
    icon: "S",
    color: "#6366f1",
    courses: 8,
    completed: 0,
    status: "locked" as const,
    credits: 80,
    prerequisite: "VBV Grundausbildung",
  },
  {
    id: 4,
    title: "Compliance und Updates",
    description: "Jaehrliche Pflichtmodule und regulatorische Updates",
    icon: "C",
    color: "#e74c3c",
    courses: 4,
    completed: 0,
    status: "locked" as const,
    credits: 30,
    prerequisite: "VBV Grundausbildung",
  },
];

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "grid" },
  { name: "Kurse", href: "/courses", icon: "book" },
  { name: "Lernpfade", href: "/lernpfade", active: true, icon: "route" },
  { name: "Pruefungen", href: "#", icon: "check" },
  { name: "Zertifikate", href: "#", icon: "award" },
  { name: "Forum", href: "#", icon: "chat" },
  { name: "Analytics", href: "#", icon: "chart" },
];

function NavIcon({ type, active }: { type: string; active?: boolean }) {
  const color = active ? teal : "#8E8E93";
  const s = { width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center" } as const;
  const svgProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "grid":
      return <span style={s}><svg {...svgProps}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></span>;
    case "book":
      return <span style={s}><svg {...svgProps}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>;
    case "route":
      return <span style={s}><svg {...svgProps}><circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M6 9v1a5 5 0 0 0 5 5h2a5 5 0 0 0 5-5V9"/></svg></span>;
    case "check":
      return <span style={s}><svg {...svgProps}><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>;
    case "award":
      return <span style={s}><svg {...svgProps}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg></span>;
    case "chat":
      return <span style={s}><svg {...svgProps}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>;
    case "chart":
      return <span style={s}><svg {...svgProps}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>;
    default:
      return null;
  }
}

function StatusBadge({ status }: { status: string }) {
  const config = {
    done: { bg: teal, color: "#fff", label: "Abgeschlossen" },
    active: { bg: navy, color: "#fff", label: "Aktiv" },
    locked: { bg: "#f3f4f6", color: "#8E8E93", label: "Gesperrt" },
  }[status] || { bg: "#f3f4f6", color: "#8E8E93", label: status };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        background: config.bg,
        color: config.color,
        fontSize: 11,
        fontWeight: 600,
        padding: "4px 12px",
        borderRadius: 20,
        letterSpacing: 0.2,
      }}
    >
      {status === "done" && (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {status === "locked" && (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11 7V5a3 3 0 1 0-6 0v2H4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1zm-4.5-2a1.5 1.5 0 1 1 3 0v2h-3V5z"/>
        </svg>
      )}
      {config.label}
    </span>
  );
}

export default function Lernpfade() {
  return (
    <>
      <style>{`
        @keyframes zuriva-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .zuriva-card {
          transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .zuriva-card:hover {
          transform: translateY(-2px);
        }
        .zuriva-btn {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: none;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .zuriva-btn:hover {
          filter: brightness(1.08);
          transform: scale(1.02);
        }
        .zuriva-nav-link {
          transition: all 0.2s ease;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .zuriva-nav-link:hover {
          background: rgba(15,164,160,0.05) !important;
        }
      `}</style>

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
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              padding: "28px 24px 24px",
              display: "flex",
              alignItems: "baseline",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: navy,
              }}
            >
              ZURIVA
            </span>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: gold,
                letterSpacing: "0.04em",
              }}
            >
              academy
            </span>
          </div>

          {/* Navigation */}
          <nav style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="zuriva-nav-link"
                style={{
                  padding: "10px 14px",
                  color: item.active ? navy : "#6E6E73",
                  background: item.active ? "rgba(15,164,160,0.08)" : "transparent",
                  borderRadius: 12,
                  fontWeight: item.active ? 600 : 400,
                  fontSize: 13.5,
                  letterSpacing: -0.1,
                  position: "relative",
                }}
              >
                {item.active && (
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: teal,
                      position: "absolute",
                      left: 6,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                )}
                <span style={{ marginLeft: item.active ? 8 : 0 }}>
                  <NavIcon type={item.icon} active={item.active} />
                </span>
                {item.name}
              </a>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* User */}
          <div
            style={{
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 -1px 0 rgba(0,0,0,0.04)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${teal}, #0DBFB9)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "white",
                letterSpacing: 0.5,
                flexShrink: 0,
              }}
            >
              LM
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: navy }}>Laura Meier</div>
              <div style={{ fontSize: 11, color: "#8E8E93", marginTop: 1 }}>Vermittlerin</div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <header
            style={{
              ...glass,
              height: 64,
              minHeight: 64,
              padding: "0 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
              zIndex: 5,
            }}
          >
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: navy, letterSpacing: -0.3 }}>
                Lernpfade
              </div>
              <div style={{ fontSize: 12.5, color: "#8E8E93", marginTop: 1 }}>
                Dein strukturierter Weg zur VBV-Zertifizierung
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${teal}, #0DBFB9)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "white",
                letterSpacing: 0.5,
              }}
            >
              LM
            </div>
          </header>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "36px 40px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: 780,
                margin: "0 auto",
              }}
            >
              {paths.map((path, i) => (
                <div
                  key={path.id}
                  style={{
                    animation: `zuriva-fade-in 0.5s ease ${i * 0.08}s both`,
                  }}
                >
                  {/* Connector line */}
                  {i > 0 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: 36,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 1.5,
                          height: "100%",
                          borderLeft: "2px dotted rgba(0,0,0,0.08)",
                        }}
                      />
                    </div>
                  )}

                  {/* Path card */}
                  <div
                    className="zuriva-card"
                    style={{
                      background: "white",
                      borderRadius: 20,
                      boxShadow:
                        path.status === "active"
                          ? `0 0 0 2px rgba(15,164,160,0.2), 0 4px 20px rgba(0,0,0,0.04)`
                          : cardShadow,
                      padding: "28px 30px",
                      opacity: path.status === "locked" ? 0.55 : 1,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Status badge */}
                    <div style={{ position: "absolute", top: 20, right: 24 }}>
                      <StatusBadge status={path.status} />
                    </div>

                    <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                      {/* Icon box */}
                      <div
                        style={{
                          width: 52,
                          height: 52,
                          borderRadius: 16,
                          background: `linear-gradient(135deg, ${path.color}, ${path.color}dd)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "white",
                          flexShrink: 0,
                          letterSpacing: 0.5,
                          boxShadow: `0 4px 12px ${path.color}33`,
                        }}
                      >
                        {path.icon}
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 17,
                            fontWeight: 600,
                            color: navy,
                            marginBottom: 4,
                            letterSpacing: -0.2,
                          }}
                        >
                          {path.title}
                        </div>
                        <div
                          style={{
                            fontSize: 13.5,
                            color: "#6E6E73",
                            marginBottom: 20,
                            lineHeight: 1.4,
                          }}
                        >
                          {path.description}
                        </div>

                        {/* Meta */}
                        <div
                          style={{
                            display: "flex",
                            gap: 24,
                            marginBottom: 18,
                            flexWrap: "wrap",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 12.5,
                              color: "#8E8E93",
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                            </svg>
                            {path.courses} Kurse
                          </div>
                          <div
                            style={{
                              fontSize: 12.5,
                              color: "#8E8E93",
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            {path.credits} Credits
                          </div>
                          <div
                            style={{
                              fontSize: 12.5,
                              color: "#8E8E93",
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                              <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                            {path.completed}/{path.courses} abgeschlossen
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div
                          style={{
                            background: "#f0f0f2",
                            height: 6,
                            borderRadius: 3,
                            marginBottom: 10,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: 6,
                              borderRadius: 3,
                              background:
                                path.status === "done"
                                  ? `linear-gradient(90deg, ${teal}, #0DBFB9)`
                                  : path.status === "active"
                                  ? `linear-gradient(90deg, ${navy}, #0A4A8A)`
                                  : "#d1d1d6",
                              width: `${(path.completed / path.courses) * 100}%`,
                              transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                          />
                        </div>

                        {/* Prerequisite */}
                        {path.prerequisite && (
                          <div
                            style={{
                              fontSize: 12,
                              color: "#8E8E93",
                              marginTop: 8,
                              display: "flex",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                            Voraussetzung: {path.prerequisite}
                          </div>
                        )}

                        {/* Action button */}
                        {path.status !== "locked" && (
                          <a
                            href="/courses"
                            className="zuriva-btn"
                            style={{
                              marginTop: 18,
                              padding: "10px 22px",
                              background:
                                path.status === "done"
                                  ? "#f5f5f7"
                                  : `linear-gradient(135deg, ${path.color}, ${path.color}dd)`,
                              color: path.status === "done" ? "#6E6E73" : "white",
                              borderRadius: 14,
                              fontSize: 13,
                              fontWeight: 600,
                              letterSpacing: -0.1,
                              boxShadow:
                                path.status === "done"
                                  ? "none"
                                  : `0 2px 8px ${path.color}44`,
                            }}
                          >
                            {path.status === "done" ? "Anzeigen" : "Weiterlernen"}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="9 18 15 12 9 6"/>
                            </svg>
                          </a>
                        )}
                      </div>
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
