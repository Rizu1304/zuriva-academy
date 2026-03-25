"use client";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  { label: "Mitarbeitende", value: "24", icon: UsersIcon, color: "#0FA4A0", trend: "+2 diesen Monat" },
  { label: "Aktive Kurse", value: "18", icon: BookIcon, color: "#818CF8", trend: "+3 neu" },
  { label: "Pruefungen diese Woche", value: "7", icon: ClipboardIcon, color: "#D4A843", trend: "3 ausstehend" },
  { label: "Ø Fortschritt Team", value: "61%", icon: ChartIcon, color: "#F472B6", trend: "+4% vs. letzter Monat" },
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
    <DashboardLayout
      title="Admin Uebersicht"
      subtitle="Zuriva Academy — Verwaltung"
      actions={
        <button className="premium-btn" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Neuer Kurs
        </button>
      }
    >
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} className={`glass-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "22px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: `${s.color}10` }} />
            <div style={{ width: 42, height: 42, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
              <s.icon color={s.color} />
            </div>
            <div style={{ fontSize: 34, fontWeight: 800, color: "white", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.trend}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <a href="/admin/kurse" className="glass-card animate-fade-in-up stagger-5" style={{ padding: "24px 28px", textDecoration: "none", display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(15,164,160,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0FA4A0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 4 }}>Kurseditor</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Kurse erstellen, bearbeiten und verwalten</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}><path d="m9 18 6-6-6-6" /></svg>
        </a>
        <a href="/admin/pruefungen" className="glass-card animate-fade-in-up stagger-6" style={{ padding: "24px 28px", textDecoration: "none", display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(212,168,67,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A843" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /></svg>
          </div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: "white", marginBottom: 4 }}>Pruefungseditor</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Pruefungen und Fragen verwalten</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto" }}><path d="m9 18 6-6-6-6" /></svg>
        </a>
      </div>

      {/* Team Table */}
      <div className="glass-card-static animate-fade-in-up stagger-7" style={{ overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "white" }}>Team Uebersicht</div>
          <a href="/admin/team" style={{ fontSize: 12.5, color: "#5EEAD4", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            Alle anzeigen
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Name", "Rolle", "Fortschritt", "Credits", "Zuletzt aktiv"].map((h) => (
                <th key={h} style={{ padding: "14px 24px", textAlign: "left", fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {team.map((member, i) => {
              const progressColor = member.progress >= 70 ? "#0FA4A0" : member.progress >= 40 ? "#D4A843" : "#ef4444";
              return (
                <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.04)", transition: "background 0.2s" }}>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 12, background: `${progressColor}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: progressColor, border: `1px solid ${progressColor}25` }}>{member.avatar}</div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "white" }}>{member.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{member.role}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 80, height: 4, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
                        <div style={{ height: 4, borderRadius: 4, background: progressColor, width: member.progress + "%", boxShadow: `0 0 8px ${progressColor}30` }} />
                      </div>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: progressColor }}>{member.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span className="gold-gradient-text" style={{ fontSize: 14, fontWeight: 800 }}>{member.credits}</span>
                  </td>
                  <td style={{ padding: "16px 24px", fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>{member.lastActive}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

function UsersIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function BookIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
}
function ClipboardIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>;
}
function ChartIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
}
