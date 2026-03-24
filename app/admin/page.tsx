"use client";

const F = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif";
const navy = "#022350";
const teal = "#0FA4A0";
const gold = "#C8A24D";
const bg = "#f5f5f7";
const cardShadow = "0 1px 2px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)";
const glass = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" } as const;

const stats = [
  { label: "Mitarbeitende", value: "24", color: navy },
  { label: "Aktive Kurse", value: "18", color: teal },
  { label: "Pruefungen diese Woche", value: "7", color: gold },
  { label: "Oe Fortschritt Team", value: "61%", color: "#6366f1" },
];

const team = [
  { name: "Laura Meier", role: "Vermittlerin", progress: 57, credits: 342, lastActive: "Heute" },
  { name: "Thomas Mueller", role: "Vermittler", progress: 72, credits: 428, lastActive: "Heute" },
  { name: "Anna Schneider", role: "Instruktorin", progress: 95, credits: 580, lastActive: "Gestern" },
  { name: "Beat Keller", role: "Vermittler", progress: 34, credits: 198, lastActive: "Mo 23.03." },
  { name: "Petra Koch", role: "Vermittlerin", progress: 48, credits: 276, lastActive: "Di 24.03." },
  { name: "Marco Bianchi", role: "Lernender", progress: 12, credits: 64, lastActive: "Fr 20.03." },
];

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade" },
  { name: "Pruefungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate" },
  { name: "Forum", href: "/forum" },
];

const adminItems = [
  { name: "Uebersicht", href: "/admin", active: true },
  { name: "Kurseditor", href: "/admin/kurse" },
  { name: "Pruefungseditor", href: "/admin/pruefungen" },
  { name: "Team", href: "/admin/team" },
  { name: "Analytics", href: "/admin/analytics" },
];

const accentColors = [navy, teal, gold, "#6366f1"];

function progressColor(p: number) {
  if (p >= 70) return teal;
  if (p >= 40) return gold;
  return "#e74c3c";
}

export default function Admin() {
  return (
    <>
      <style>{`
        @keyframes zuriva-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .zuriva-fade { animation: zuriva-fade-in 0.5s ease; }
        .zuriva-quick:hover { transform: translateY(-2px); box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08) !important; }
        .zuriva-quick { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .zuriva-row:hover { background: #f9fafb; }
        .zuriva-nav:hover { background: rgba(15,164,160,0.04); }
      `}</style>
      <div style={{ display: "flex", height: "100vh", fontFamily: F, background: bg, overflow: "hidden" }} className="zuriva-fade">

        {/* Sidebar */}
        <aside style={{
          width: 260,
          minWidth: 260,
          ...glass,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid rgba(0,0,0,0.06)",
        }}>
          {/* Logo */}
          <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.14em", color: navy }}>ZURIVA</span>
            <span style={{ fontSize: 12.5, fontWeight: 500, color: gold, letterSpacing: "0.02em" }}>academy</span>
          </div>

          {/* Regular nav */}
          <div style={{ padding: "0 12px" }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="zuriva-nav"
                style={{
                  padding: "10px 14px",
                  color: "#6b7280",
                  fontSize: 13.5,
                  fontWeight: 450,
                  textDecoration: "none",
                  display: "block",
                  borderRadius: 12,
                  marginBottom: 1,
                  transition: "background 0.15s ease",
                }}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Admin section label */}
          <div style={{
            fontSize: 10.5,
            fontWeight: 600,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "#9ca3af",
            padding: "20px 26px 8px",
          }}>
            ADMIN
          </div>

          {/* Admin nav */}
          <div style={{ padding: "0 12px" }}>
            {adminItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={item.active ? undefined : "zuriva-nav"}
                style={{
                  padding: "10px 14px",
                  color: item.active ? navy : "#6b7280",
                  background: item.active ? "rgba(15,164,160,0.08)" : "transparent",
                  fontWeight: item.active ? 600 : 450,
                  fontSize: 13.5,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  borderRadius: 12,
                  marginBottom: 1,
                  transition: "background 0.15s ease",
                }}
              >
                {item.active && (
                  <span style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: teal,
                    flexShrink: 0,
                  }} />
                )}
                {item.name}
              </a>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* User avatar */}
          <div style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{
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
            }}>
              LM
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: navy }}>Laura Meier</div>
              <div style={{ fontSize: 11.5, color: "#9ca3af", fontWeight: 450 }}>Admin</div>
            </div>
          </div>
        </aside>

        {/* Main */}
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
            boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.02)",
          }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, color: navy, letterSpacing: "-0.01em" }}>Admin Uebersicht</div>
              <div style={{ fontSize: 12.5, color: "#9ca3af", fontWeight: 400 }}>Zuriva Academy -- Verwaltung</div>
            </div>
            <a
              href="/admin/kurse"
              style={{
                padding: "10px 22px",
                background: `linear-gradient(135deg, ${teal}, #0bc5c1)`,
                color: "white",
                borderRadius: 14,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(15,164,160,0.3)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
            >
              + Neuer Kurs
            </a>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px 36px" }}>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "white",
                    borderRadius: 20,
                    boxShadow: cardShadow,
                    padding: "24px 26px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    left: 0,
                    top: 16,
                    bottom: 16,
                    width: 3,
                    borderRadius: "0 3px 3px 0",
                    background: accentColors[i],
                  }} />
                  <div style={{ fontSize: 38, fontWeight: 700, color: s.color, lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
                  <div style={{ fontSize: 13, color: "#6b7280", marginTop: 8, fontWeight: 450 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick access */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              <a
                href="/admin/kurse"
                className="zuriva-quick"
                style={{
                  background: "white",
                  borderRadius: 20,
                  boxShadow: cardShadow,
                  padding: "26px 28px",
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "rgba(15,164,160,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 14,
                  color: teal,
                  fontWeight: 700,
                }}>
                  K
                </div>
                <div style={{ fontSize: 16.5, fontWeight: 650, color: navy, marginBottom: 6, letterSpacing: "-0.01em" }}>Kurseditor</div>
                <div style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.5, fontWeight: 400 }}>Kurse erstellen, bearbeiten und verwalten</div>
              </a>
              <a
                href="/admin/pruefungen"
                className="zuriva-quick"
                style={{
                  background: "white",
                  borderRadius: 20,
                  boxShadow: cardShadow,
                  padding: "26px 28px",
                  textDecoration: "none",
                  display: "block",
                  border: "none",
                }}
              >
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "rgba(200,162,77,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  marginBottom: 14,
                  color: gold,
                  fontWeight: 700,
                }}>
                  P
                </div>
                <div style={{ fontSize: 16.5, fontWeight: 650, color: navy, marginBottom: 6, letterSpacing: "-0.01em" }}>Pruefungseditor</div>
                <div style={{ fontSize: 13.5, color: "#6b7280", lineHeight: 1.5, fontWeight: 400 }}>Pruefungen und Fragen verwalten</div>
              </a>
            </div>

            {/* Team table */}
            <div style={{
              background: "white",
              borderRadius: 20,
              boxShadow: cardShadow,
              overflow: "hidden",
            }}>
              <div style={{
                padding: "20px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #f3f4f6",
              }}>
                <div style={{ fontSize: 17, fontWeight: 650, color: navy, letterSpacing: "-0.01em" }}>Team Uebersicht</div>
                <a href="/admin/team" style={{ fontSize: 12.5, color: teal, fontWeight: 550, textDecoration: "none" }}>Alle anzeigen --&gt;</a>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f9fafb" }}>
                    {["Name", "Rolle", "Fortschritt", "Credits", "Zuletzt aktiv"].map(h => (
                      <th key={h} style={{
                        padding: "12px 28px",
                        textAlign: "left" as const,
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#9ca3af",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {team.map((member, i) => (
                    <tr key={i} className="zuriva-row" style={{ borderTop: "1px solid #f3f4f6", transition: "background 0.15s ease" }}>
                      <td style={{ padding: "16px 28px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{
                            width: 34,
                            height: 34,
                            borderRadius: 12,
                            background: `linear-gradient(135deg, ${navy}, #0a3a6e)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 11.5,
                            fontWeight: 600,
                            color: "white",
                            letterSpacing: "0.02em",
                          }}>
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: navy }}>{member.name}</div>
                        </div>
                      </td>
                      <td style={{ padding: "16px 28px", fontSize: 13, color: "#6b7280", fontWeight: 450 }}>{member.role}</td>
                      <td style={{ padding: "16px 28px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 88, height: 6, borderRadius: 3, background: "#f3f4f6" }}>
                            <div style={{
                              height: 6,
                              borderRadius: 3,
                              background: progressColor(member.progress),
                              width: member.progress + "%",
                              transition: "width 0.4s ease",
                            }} />
                          </div>
                          <span style={{ fontSize: 12.5, color: "#6b7280", fontWeight: 500, minWidth: 32 }}>{member.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 28px", fontSize: 13.5, fontWeight: 650, color: gold }}>{member.credits}</td>
                      <td style={{ padding: "16px 28px", fontSize: 12.5, color: "#9ca3af", fontWeight: 450 }}>{member.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
