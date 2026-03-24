"use client";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const paths = [
  { id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende", icon: "🎓", color: "#0FA4A0", courses: 5, completed: 5, status: "done", credits: 40 },
  { id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung", icon: "📋", color: "#022350", courses: 10, completed: 6, status: "active", credits: 120, prerequisite: null },
  { id: 3, title: "Spezialisierung Nicht-Leben", description: "Vertiefung in Sach- und Haftpflichtversicherungen", icon: "🏢", color: "#6366f1", courses: 8, completed: 0, status: "locked", credits: 80, prerequisite: "VBV Grundausbildung" },
  { id: 4, title: "Compliance und Updates", description: "Jährliche Pflichtmodule und regulatorische Updates", icon: "⚖️", color: "#e74c3c", courses: 4, completed: 0, status: "locked", credits: 30, prerequisite: "VBV Grundausbildung" },
];

export default function Lernpfade() {
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
            { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade", active: true },
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
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>Lernpfade</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Dein strukturierter Weg zur VBV-Zertifizierung</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 800 }}>
            {paths.map((path, i) => (
              <div key={path.id}>
                {i > 0 && (
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <div style={{ width: 2, height: 24, background: "rgba(0,0,0,0.04)" }} />
                  </div>
                )}
                <div style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: path.status === "active" ? "1px solid rgba(15,164,160,0.4)" : "1px solid rgba(255,255,255,0.6)", boxShadow: path.status === "active" ? "0 2px 24px rgba(15,164,160,0.08)" : "0 2px 24px rgba(2,35,80,0.04)", padding: "24px 28px", opacity: path.status === "locked" ? 0.6 : 1, position: "relative", overflow: "hidden", transition: "all 0.2s ease" }}>
                  {path.status === "done" && (
                    <div style={{ position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg, #0FA4A0, #0d8e8a)", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>✓ Abgeschlossen</div>
                  )}
                  {path.status === "active" && (
                    <div style={{ position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>Aktiv</div>
                  )}
                  {path.status === "locked" && (
                    <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.6)", color: "#9A9AAA", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>🔒 Gesperrt</div>
                  )}

                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `linear-gradient(135deg, ${path.color}, ${path.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{path.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 4, fontFamily: h }}>{path.title}</div>
                      <div style={{ fontSize: 13, color: "#4A4A5A", marginBottom: 16 }}>{path.description}</div>

                      <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                        <div style={{ fontSize: 12, color: "#9A9AAA" }}>📚 {path.courses} Kurse</div>
                        <div style={{ fontSize: 12, color: "#9A9AAA" }}>⭐ {path.credits} Credits</div>
                        <div style={{ fontSize: 12, color: "#9A9AAA" }}>{path.completed}/{path.courses} abgeschlossen</div>
                      </div>

                      <div style={{ background: "rgba(0,0,0,0.04)", height: 4, borderRadius: 3, marginBottom: 8 }}>
                        <div style={{ height: 4, borderRadius: 3, background: `linear-gradient(90deg, ${path.color}, ${path.color}dd)`, width: (path.completed / path.courses * 100) + "%", transition: "all 0.2s ease" }} />
                      </div>

                      {path.prerequisite && (
                        <div style={{ fontSize: 11.5, color: "#9A9AAA", marginTop: 8 }}>Voraussetzung: {path.prerequisite}</div>
                      )}

                      {path.status !== "locked" && (
                        <a href="/courses" style={{ display: "inline-block", marginTop: 14, padding: "8px 20px", background: path.status === "done" ? "rgba(255,255,255,0.6)" : `linear-gradient(135deg, ${path.color}, ${path.color}dd)`, color: path.status === "done" ? "#4A4A5A" : "white", borderRadius: 12, fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all 0.2s ease" }}>
                          {path.status === "done" ? "Anzeigen" : "Weiterlernen"}
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
  );
}
