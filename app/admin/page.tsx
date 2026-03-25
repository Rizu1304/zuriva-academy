"use client";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  { label: "Mitarbeitende", value: "24", color: "#022350", trend: "+2 diesen Monat" },
  { label: "Aktive Kurse", value: "18", color: "#0FA4A0", trend: "+3 neu" },
  { label: "Pruefungen diese Woche", value: "7", color: "#C8A24D", trend: "3 ausstehend" },
  { label: "Ø Fortschritt Team", value: "61%", color: "#1B6FC2", trend: "+4% vs. letzter Monat" },
];

const team = [
  { name: "Anna Schneider", role: "Instruktorin", progress: 95, credits: 580, lastActive: "Heute", avatar: "AS" },
  { name: "Thomas Mueller", role: "Vermittler", progress: 72, credits: 428, lastActive: "Heute", avatar: "TM" },
  { name: "Laura Meier", role: "Vermittlerin", progress: 57, credits: 342, lastActive: "Heute", avatar: "LM" },
  { name: "Petra Koch", role: "Vermittlerin", progress: 48, credits: 276, lastActive: "Di 24.03.", avatar: "PK" },
  { name: "Beat Keller", role: "Vermittler", progress: 34, credits: 198, lastActive: "Mo 23.03.", avatar: "BK" },
  { name: "Marco Bianchi", role: "Lernender", progress: 12, credits: 64, lastActive: "Fr 20.03.", avatar: "MB" },
];

export default function Admin() {
  return (
    <DashboardLayout title="Admin Uebersicht" subtitle="Zuriva Academy — Verwaltung" actions={
      <button className="z-btn z-btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
        Neuer Kurs
      </button>
    }>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "22px 24px" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
            </div>
            <div className="font-heading" style={{ fontSize: 36, fontWeight: 500, color: "#022350", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "#9A9AAA", marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: s.color }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <a href="/admin/kurse" className="z-card" style={{ padding: "22px 24px", textDecoration: "none", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(15,164,160,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0FA4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#022350", marginBottom: 2 }}>Kurseditor</div>
            <div style={{ fontSize: 12.5, color: "#9A9AAA" }}>Kurse erstellen, bearbeiten und verwalten</div>
          </div>
        </a>
        <a href="/admin/pruefungen" className="z-card" style={{ padding: "22px 24px", textDecoration: "none", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(200,162,77,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#022350", marginBottom: 2 }}>Pruefungseditor</div>
            <div style={{ fontSize: 12.5, color: "#9A9AAA" }}>Pruefungen und Fragen verwalten</div>
          </div>
        </a>
      </div>

      <div className="z-card-static animate-fade-in-up stagger-6" style={{ overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #F0ECE6" }}>
          <div className="font-heading" style={{ fontSize: 18, fontWeight: 500, color: "#022350" }}>Team Uebersicht</div>
          <a href="/admin/team" style={{ fontSize: 12.5, color: "#0FA4A0", fontWeight: 600, textDecoration: "none" }}>Alle anzeigen →</a>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#FAF8F5" }}>
              {["Name", "Rolle", "Fortschritt", "Credits", "Zuletzt aktiv"].map((h) => (
                <th key={h} style={{ padding: "12px 24px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.1em", textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.map((m, i) => {
              const pColor = m.progress >= 70 ? "#0FA4A0" : m.progress >= 40 ? "#C8A24D" : "#C0392B";
              return (
                <tr key={i} style={{ borderTop: "1px solid #F0ECE6" }}>
                  <td style={{ padding: "14px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>{m.avatar}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{m.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{m.role}</td>
                  <td style={{ padding: "14px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="z-progress" style={{ width: 80 }}><div className="z-progress-bar" style={{ width: m.progress + "%", background: pColor }} /></div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: pColor }}>{m.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 700, color: "#C8A24D" }}>{m.credits}</td>
                  <td style={{ padding: "14px 24px", fontSize: 12, color: "#9A9AAA" }}>{m.lastActive}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
