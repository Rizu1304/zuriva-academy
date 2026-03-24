"use client";

const paths = [
  { id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende", icon: "🎓", color: "#0FA4A0", courses: 5, completed: 5, status: "done", credits: 40 },
  { id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung", icon: "📋", color: "#022350", courses: 10, completed: 6, status: "active", credits: 120, prerequisite: null },
  { id: 3, title: "Spezialisierung Nicht-Leben", description: "Vertiefung in Sach- und Haftpflichtversicherungen", icon: "🏢", color: "#6366f1", courses: 8, completed: 0, status: "locked", credits: 80, prerequisite: "VBV Grundausbildung" },
  { id: 4, title: "Compliance und Updates", description: "Jährliche Pflichtmodule und regulatorische Updates", icon: "⚖️", color: "#e74c3c", courses: 4, completed: 0, status: "locked", credits: 30, prerequisite: "VBV Grundausbildung" },
];

const heading = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const body = "var(--font-dm-sans, 'DM Sans', sans-serif)";

export default function Lernpfade() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: body, background: "#F0F2F5", overflow: "hidden" }}>
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350", fontFamily: heading }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Kurse", href: "/courses" },
          { name: "Lernpfade", href: "/lernpfade", active: true },
          { name: "Prüfungen", href: "/pruefungen" },
          { name: "Zertifikate", href: "/zertifikate" },
          { name: "Forum", href: "/forum" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A9AAA", padding: "18px 22px 6px" }}>Admin</div>
        {[
          { name: "Übersicht", href: "/admin" },
          { name: "Kurseditor", href: "/admin/kurse" },
          { name: "Prüfungseditor", href: "/admin/pruefungen" },
          { name: "Team", href: "/admin/team" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2.5px solid transparent", fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #0a7a77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: "#022350", fontFamily: heading }}>Lernpfade</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Dein strukturierter Weg zur VBV-Zertifizierung</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #0a7a77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white" }}>LM</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 800 }}>
            {paths.map((path, i) => (
              <div key={path.id}>
                {i > 0 && (
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <div style={{ width: 2, height: 24, background: "#dce0e6" }} />
                  </div>
                )}
                <div style={{ background: "white", borderRadius: 16, border: path.status === "active" ? "2px solid #0FA4A0" : "0.5px solid #dce0e6", padding: "24px 28px", opacity: path.status === "locked" ? 0.6 : 1, position: "relative", overflow: "hidden" }}>
                  {path.status === "done" && (
                    <div style={{ position: "absolute", top: 16, right: 16, background: "#0FA4A0", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>✓ Abgeschlossen</div>
                  )}
                  {path.status === "active" && (
                    <div style={{ position: "absolute", top: 16, right: 16, background: "#022350", color: "white", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>Aktiv</div>
                  )}
                  {path.status === "locked" && (
                    <div style={{ position: "absolute", top: 16, right: 16, background: "#f0f2f5", color: "#9A9AAA", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>🔒 Gesperrt</div>
                  )}

                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: path.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{path.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 20, fontWeight: 600, color: "#022350", marginBottom: 4, fontFamily: heading }}>{path.title}</div>
                      <div style={{ fontSize: 13, color: "#4A4A5A", marginBottom: 16 }}>{path.description}</div>

                      <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                        <div style={{ fontSize: 12, color: "#9A9AAA" }}>📚 {path.courses} Kurse</div>
                        <div style={{ fontSize: 12, color: "#9A9AAA" }}>⭐ {path.credits} Credits</div>
                        <div style={{ fontSize: 12, color: "#9A9AAA" }}>{path.completed}/{path.courses} abgeschlossen</div>
                      </div>

                      <div style={{ background: "#eef0f3", height: 4, borderRadius: 3, marginBottom: 8 }}>
                        <div style={{ height: 4, borderRadius: 3, background: path.color, width: (path.completed / path.courses * 100) + "%" }} />
                      </div>

                      {path.prerequisite && (
                        <div style={{ fontSize: 11.5, color: "#9A9AAA", marginTop: 8 }}>Voraussetzung: {path.prerequisite}</div>
                      )}

                      {path.status !== "locked" && (
                        <a href="/courses" style={{ display: "inline-block", marginTop: 14, padding: "8px 20px", background: path.status === "done" ? "#f0f2f5" : path.color, color: path.status === "done" ? "#4A4A5A" : "white", borderRadius: 9, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
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
