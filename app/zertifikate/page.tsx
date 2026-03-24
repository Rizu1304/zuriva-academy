"use client";

const certs = [
  { id: 1, title: "Trainee Grundausbildung", course: "Trainee Grundausbildung", date: "01.03.2026", score: 94, credits: 40, verified: true },
  { id: 2, title: "Beratungskompetenz", course: "Beratungskompetenz und Kundenkommunikation", date: "15.02.2026", score: 88, credits: 10, verified: true },
];

const F = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif";
const navy = "#022350";
const teal = "#0FA4A0";
const gold = "#C8A24D";
const bg = "#f5f5f7";
const cardShadow = "0 1px 2px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)";
const glass = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" };

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade" },
  { name: "Pruefungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate", active: true },
  { name: "Forum", href: "/forum" },
  { name: "Analytics", href: "#" },
];

export default function Zertifikate() {
  return (
    <>
      <style>{`
        @keyframes zuriva-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .zuriva-cert-card { animation: zuriva-fade-in 0.5s ease; }
        .zuriva-nav-link:hover { background: rgba(15,164,160,0.04); }
        .zuriva-download-btn:hover { background: #03305e !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(2,35,80,0.25); }
        .zuriva-download-btn { transition: all 0.2s ease; }
        .zuriva-cert-card-wrap:hover { transform: translateY(-2px); box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.08) !important; }
        .zuriva-cert-card-wrap { transition: all 0.3s ease; }
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
          <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.14em", color: navy }}>ZURIVA</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: gold, fontVariant: "small-caps", letterSpacing: "0.04em" }}>academy</span>
          </div>

          {/* Nav */}
          <nav style={{ padding: "0 12px", display: "flex", flexDirection: "column", gap: 2 }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="zuriva-nav-link"
                style={{
                  padding: "10px 14px",
                  color: item.active ? navy : "#6e6e73",
                  background: item.active ? "rgba(15,164,160,0.08)" : "transparent",
                  borderRadius: 12,
                  fontWeight: item.active ? 600 : 400,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  letterSpacing: "-0.01em",
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
          </nav>

          <div style={{ flex: 1 }} />

          {/* User */}
          <div style={{ padding: "16px 16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${teal}, #0cc5c0)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "white",
              flexShrink: 0,
            }}>LM</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: navy, letterSpacing: "-0.01em" }}>Laura Meier</div>
              <div style={{ fontSize: 11, color: "#86868b" }}>Vermittlerin</div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* Topbar */}
          <div style={{
            ...glass,
            height: 64,
            minHeight: 64,
            padding: "0 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
          }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 600, color: navy, letterSpacing: "-0.02em" }}>Meine Zertifikate</div>
              <div style={{ fontSize: 13, color: "#86868b", marginTop: 1 }}>{certs.length} Zertifikate erhalten</div>
            </div>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 14,
              background: `linear-gradient(135deg, ${teal}, #0cc5c0)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              color: "white",
            }}>LM</div>
          </div>

          {/* Content */}
          <div style={{ flex: 1, overflowY: "auto", padding: 36 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 920 }}>
              {certs.map((cert, i) => (
                <div
                  key={cert.id}
                  className="zuriva-cert-card zuriva-cert-card-wrap"
                  style={{
                    background: "white",
                    borderRadius: 24,
                    overflow: "hidden",
                    boxShadow: cardShadow,
                    animationDelay: `${i * 0.1}s`,
                    animationFillMode: "both",
                  }}
                >
                  {/* Card Header */}
                  <div style={{
                    background: `linear-gradient(135deg, ${navy} 0%, #0a3a6e 100%)`,
                    padding: "32px 28px 28px",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {/* Decorative circles */}
                    <div style={{
                      position: "absolute",
                      top: -30,
                      right: -20,
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "rgba(200,162,77,0.12)",
                    }} />
                    <div style={{
                      position: "absolute",
                      top: 10,
                      right: 40,
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "rgba(200,162,77,0.06)",
                    }} />
                    <div style={{
                      position: "absolute",
                      bottom: -40,
                      left: 10,
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      background: "rgba(15,164,160,0.08)",
                    }} />
                    <div style={{
                      position: "absolute",
                      bottom: 20,
                      left: 60,
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "rgba(15,164,160,0.05)",
                    }} />

                    <div style={{ position: "relative" }}>
                      <div style={{
                        fontSize: 10,
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: gold,
                        marginBottom: 12,
                        fontVariant: "small-caps",
                      }}>Zuriva Academy</div>
                      <div style={{
                        fontSize: 24,
                        fontWeight: 600,
                        color: "white",
                        lineHeight: 1.2,
                        letterSpacing: "-0.02em",
                        marginBottom: 10,
                      }}>{cert.title}</div>
                      <div style={{
                        fontSize: 13,
                        color: "rgba(255,255,255,0.45)",
                        letterSpacing: "-0.01em",
                      }}>Laura Meier  --  {cert.date}</div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: "24px 28px 28px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 20 }}>
                      {/* Score */}
                      <div>
                        <div style={{
                          fontSize: 32,
                          fontWeight: 700,
                          color: teal,
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                        }}>{cert.score}%</div>
                        <div style={{ fontSize: 11, color: "#86868b", marginTop: 4, fontWeight: 500 }}>Score</div>
                      </div>

                      {/* Credits */}
                      <div>
                        <div style={{
                          fontSize: 32,
                          fontWeight: 700,
                          color: gold,
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                        }}>{cert.credits}</div>
                        <div style={{ fontSize: 11, color: "#86868b", marginTop: 4, fontWeight: 500 }}>Credits</div>
                      </div>

                      {/* Verified */}
                      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                        {cert.verified && (
                          <div style={{
                            ...glass,
                            background: "rgba(15,164,160,0.06)",
                            color: teal,
                            fontSize: 12,
                            fontWeight: 600,
                            padding: "6px 14px",
                            borderRadius: 20,
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            boxShadow: "0 0 0 1px rgba(15,164,160,0.1)",
                          }}>
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                              <path d="M13.5 4.5L6.5 11.5L2.5 7.5" stroke={teal} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Verifiziert
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Download */}
                    <button
                      className="zuriva-download-btn"
                      style={{
                        width: "100%",
                        padding: "13px",
                        background: navy,
                        color: "white",
                        border: "none",
                        borderRadius: 14,
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: F,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      PDF herunterladen
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {certs.length === 0 && (
              <div className="zuriva-cert-card" style={{
                textAlign: "center",
                padding: "80px 20px",
                color: "#86868b",
                animation: "zuriva-fade-in 0.5s ease",
              }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: 20,
                  background: "rgba(15,164,160,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" stroke={teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: navy, marginBottom: 8, letterSpacing: "-0.02em" }}>Noch keine Zertifikate</div>
                <div style={{ fontSize: 14, color: "#86868b" }}>Schliesse Kurse ab um Zertifikate zu erhalten</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
