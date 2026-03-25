"use client";

import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Bell, BookOpenCheck, FileText, Users,
} from "lucide-react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const marine = "#022350";
const marineMid = "#0E3057";
const bgColor = "#E4E8F0";
const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 20px rgba(2,35,80,0.06)",
} as const;

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Kurse", href: "/courses" },
  { icon: Map, label: "Lernpfade", href: "/lernpfade" },
  { icon: MessageSquare, label: "Forum", href: "/forum" },
  { icon: Clock, label: "Prüfungen", href: "/pruefungen" },
  { icon: Award, label: "Zertifikate", href: "/zertifikate" },
];

const adminItems = [
  { icon: Settings, label: "Admin", href: "/admin" },
  { icon: Gamepad2, label: "Kahoot", href: "/kahoot" },
];

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
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bgColor, overflow: "hidden" }}>

      {/* ═══ ICON SIDEBAR ═══ */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        {/* Logo */}
        <div style={{ width: 42, height: 42, borderRadius: 14, background: marine, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(2,35,80,0.25)" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </div>

        {/* Nav icons */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent",
              textDecoration: "none", color: "#8090A0", transition: "all 0.2s",
            }}><item.icon size={20} strokeWidth={1.8} /></a>
          ))}
          <div style={{ height: 1, background: "rgba(2,35,80,0.08)", margin: "8px 8px" }} />
          {adminItems.map((item) => {
            const isActive = item.href === "/admin";
            return (
              <a key={item.label} href={item.href} title={item.label} style={{
                width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                background: isActive ? "rgba(255,255,255,0.9)" : "transparent",
                boxShadow: isActive ? "0 2px 10px rgba(2,35,80,0.08)" : "none",
                textDecoration: "none", color: isActive ? marine : "#8090A0", transition: "all 0.2s",
                position: "relative",
              }}>
                <item.icon size={20} strokeWidth={isActive ? 2.2 : 1.8} />
                {isActive && <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", fontSize: 7, fontWeight: 700, color: marine, letterSpacing: "0.05em" }}>ADM</span>}
              </a>
            );
          })}
        </div>

        {/* Notification + Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#8090A0", cursor: "pointer" }}><Bell size={20} /></div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg, ${marine}, ${marineMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", boxShadow: "0 2px 8px rgba(2,35,80,0.2)" }}>LM</div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: marine, fontFamily: h }}>Admin Übersicht</div>
            <div style={{ fontSize: 12, color: "#8090A0" }}>Zuriva Academy — Verwaltung</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <a href="/admin/kurse" style={{ padding: "8px 16px", background: marine, color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, textDecoration: "none" }}>+ Neuer Kurs</a>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ ...glass, padding: "20px 22px" }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <a href="/admin/kurse" style={{ ...glass, padding: "22px 24px", textDecoration: "none", display: "block" }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, color: marine }}><BookOpenCheck size={22} /></div>
              <div style={{ fontSize: 16, fontWeight: 500, color: marine, fontFamily: h, marginBottom: 4 }}>Kurseditor</div>
              <div style={{ fontSize: 13, color: "#4A4A5A" }}>Kurse erstellen, bearbeiten und verwalten</div>
            </a>
            <a href="/admin/pruefungen" style={{ ...glass, padding: "22px 24px", textDecoration: "none", display: "block" }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, color: marine }}><FileText size={22} /></div>
              <div style={{ fontSize: 16, fontWeight: 500, color: marine, fontFamily: h, marginBottom: 4 }}>Prüfungseditor</div>
              <div style={{ fontSize: 13, color: "#4A4A5A" }}>Prüfungen und Fragen verwalten</div>
            </a>
          </div>

          {/* Team Table */}
          <div style={{ ...glass, overflow: "hidden" }}>
            <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={18} color={marine} />
                <span style={{ fontSize: 16, fontWeight: 500, color: marine, fontFamily: h }}>Team Übersicht</span>
              </div>
              <a href="/admin/team" style={{ fontSize: 12, color: "#0FA4A0", fontWeight: 500, textDecoration: "none" }}>Alle anzeigen →</a>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                  {["Name", "Rolle", "Fortschritt", "Credits", "Zuletzt aktiv"].map(col => (
                    <th key={col} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#8090A0", letterSpacing: "0.05em", textTransform: "uppercase" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {team.map((member, i) => (
                  <tr key={i} style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 12, background: `linear-gradient(135deg, ${marine}, ${marineMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>{member.name.split(" ").map(n => n[0]).join("")}</div>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: marine }}>{member.name}</div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{member.role}</td>
                    <td style={{ padding: "14px 24px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 80, height: 4, borderRadius: 2, background: "rgba(2,35,80,0.06)" }}>
                          <div style={{ height: 4, borderRadius: 2, background: member.progress >= 70 ? "#0FA4A0" : member.progress >= 40 ? "#C8A24D" : "#e74c3c", width: member.progress + "%" }} />
                        </div>
                        <span style={{ fontSize: 12, color: "#4A4A5A" }}>{member.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{member.credits}</td>
                    <td style={{ padding: "14px 24px", fontSize: 12, color: "#8090A0" }}>{member.lastActive}</td>
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
