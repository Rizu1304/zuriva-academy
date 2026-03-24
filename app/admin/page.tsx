"use client";

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
    <div style={{ display: "flex", height: "100vh", fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)", background: "#F0F2F5", overflow: "hidden" }}>
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350" }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Kurse", href: "/courses" },
          { name: "Lernpfade", href: "/lernpfade" },
          { name: "Pruefungen", href: "/pruefungen" },
          { name: "Zertifikate", href: "/zertifikate" },
          { name: "Forum", href: "/forum" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2.5px solid transparent", fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A9AAA", padding: "18px 22px 6px" }}>Admin</div>
        {[
          { name: "Übersicht", href: "/admin", active: true },
          { name: "Kurseditor", href: "/admin/kurse" },
          { name: "Prüfungseditor", href: "/admin/pruefungen" },
          { name: "Team", href: "/admin/team" },
          { name: "Analytics", href: "/admin/analytics" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Admin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#022350" }}>Admin Übersicht</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Zuriva Academy — Verwaltung</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="/admin/kurse" style={{ padding: "8px 16px", background: "#022350", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 500, textDecoration: "none" }}>+ Neuer Kurs</a>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "20px 22px" }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <a href="/admin/kurse" style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "22px 24px", textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📚</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 4 }}>Kurseditor</div>
              <div style={{ fontSize: 13, color: "#4A4A5A" }}>Kurse erstellen, bearbeiten und verwalten</div>
            </a>
            <a href="/admin/pruefungen" style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "22px 24px", textDecoration: "none", display: "block" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>📝</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 4 }}>Prüfungseditor</div>
              <div style={{ fontSize: 13, color: "#4A4A5A" }}>Prüfungen und Fragen verwalten</div>
            </a>
          </div>

          <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", borderBottom: "0.5px solid #dce0e6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#022350" }}>Team Übersicht</div>
              <a href="/admin/team" style={{ fontSize: 12, color: "#0FA4A0", fontWeight: 500, textDecoration: "none" }}>Alle anzeigen →</a>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f9fb" }}>
                  {["Name", "Rolle", "Fortschritt", "Credits", "Zuletzt aktiv"].map(h => (
                    <th key={h} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9A9AAA", letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {team.map((member, i) => (
                  <tr key={i} style={{ borderTop: "0.5px solid #dce0e6" }}>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>{member.name.split(" ").map(n => n[0]).join("")}</div>
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