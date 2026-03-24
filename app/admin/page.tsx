"use client";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const stats = [
  { label: "Mitarbeitende", value: "24", color: "#022350" },
  { label: "Aktive Kurse", value: "18", color: "#0FA4A0" },
  { label: "Prüfungen diese Woche", value: "7", color: "#C8A24D" },
  { label: "Ø Fortschritt Team", value: "61%", color: "#6366f1" },
];

const team = [
  { name: "Laura Meier", role: "Vermittlerin", progress: 57, credits: 342, lastActive: "Heute" },
  { name: "Thomas Müller", role: "Vermittler", progress: 72, credits: 428, lastActive: "Heute" },
  { name: "Anna Schneider", role: "Instruktorin", progress: 95, credits: 580, lastActive: "Gestern" },
  { name: "Beat Keller", role: "Vermittler", progress: 34, credits: 198, lastActive: "Mo 23.03." },
  { name: "Petra Koch", role: "Vermittlerin", progress: 48, credits: 276, lastActive: "Di 24.03." },
  { name: "Marco Bianchi", role: "Lernender", progress: 12, credits: 64, lastActive: "Fr 20.03." },
];

export default function Admin() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8 }}>academy</span>
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
        <div style={{ padding: "0 12px" }}>
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade" },
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: "#4A4A5A", background: "transparent", borderRadius: 12, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>ADMIN</div>
        <div style={{ padding: "0 12px" }}>
          {[
            { name: "Übersicht", href: "/admin", active: true },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Lernpfadeditor", href: "/admin/lernpfade" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Kahoot-Editor", href: "/admin/kahoot" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: 12, boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Admin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>Admin Übersicht</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Zuriva Academy — Verwaltung</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="/admin/kurse" style={{ padding: "8px 16px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, textDecoration: "none" }}>+ Neuer Kurs</a>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", padding: "20px 22px" }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <a href="/admin/kurse" style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", padding: "22px 24px", textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📚</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 4 }}>Kurseditor</div>
              <div style={{ fontSize: 13, color: "#4A4A5A" }}>Kurse erstellen, bearbeiten und verwalten</div>
            </a>
            <a href="/admin/pruefungen" style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", padding: "22px 24px", textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📝</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 4 }}>Prüfungseditor</div>
              <div style={{ fontSize: 13, color: "#4A4A5A" }}>Prüfungen und Fragen verwalten</div>
            </a>
          </div>

          {/* Team Table */}
          <div style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Team Übersicht</div>
              <a href="/admin/team" style={{ fontSize: 12, color: "#0FA4A0", fontWeight: 500, textDecoration: "none" }}>Alle anzeigen →</a>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                  {["Name", "Rolle", "Fortschritt", "Credits", "Zuletzt aktiv"].map(col => (
                    <th key={col} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9A9AAA", letterSpacing: "0.05em", textTransform: "uppercase" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {team.map((member, i) => (
                  <tr key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>{member.name.split(" ").map(n => n[0]).join("")}</div>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{member.name}</div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{member.role}</td>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 80, height: 4, borderRadius: 2, background: "#eef0f3" }}>
                          <div style={{ height: 4, borderRadius: 2, background: member.progress >= 70 ? "#0FA4A0" : member.progress >= 40 ? "#C8A24D" : "#e74c3c", width: member.progress + "%" }} />
                        </div>
                        <span style={{ fontSize: 12, color: "#4A4A5A" }}>{member.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{member.credits}</td>
                    <td style={{ padding: "14px 24px", fontSize: 12, color: "#9A9AAA" }}>{member.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
