"use client";
import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Bell, Lock,
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
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: false },
  { icon: BookOpen, label: "Kurse", href: "/courses", active: false },
  { icon: Map, label: "Lernpfade", href: "/lernpfade", active: false },
  { icon: MessageSquare, label: "Forum", href: "/forum", active: false },
  { icon: Clock, label: "Prüfungen", href: "/pruefungen", active: true },
  { icon: Award, label: "Zertifikate", href: "/zertifikate", active: false },
];

const adminItems = [
  { icon: Settings, label: "Admin", href: "/admin", active: false },
  { icon: Gamepad2, label: "Kahoot", href: "/kahoot", active: false },
];

const exams = [
  { id: 1, title: "Sachversicherung — Modul 3", course: "Grundlagen Sachversicherung", due: "28.03.2026", status: "pending", score: null, passing: 70, urgent: true },
  { id: 2, title: "Lebensversicherungen Abschlussprüfung", course: "Lebensversicherungen", due: "15.04.2026", status: "pending", score: null, passing: 75, urgent: false },
  { id: 3, title: "Trainee Grundausbildung — Abschluss", course: "Trainee Grundausbildung", due: "01.03.2026", status: "passed", score: 94, passing: 70, urgent: false },
  { id: 4, title: "Beratungskompetenz Quiz", course: "Beratungskompetenz", due: "10.02.2026", status: "passed", score: 88, passing: 70, urgent: false },
  { id: 5, title: "FIDLEG Grundlagen", course: "FIDLEG und VAG 2026", due: "30.04.2026", status: "locked", score: null, passing: 80, urgent: false },
];

export default function Pruefungen() {
  const [activeTab, setActiveTab] = useState("alle");

  const filtered = exams.filter(e => {
    if (activeTab === "alle") return true;
    if (activeTab === "offen") return e.status === "pending";
    if (activeTab === "bestanden") return e.status === "passed";
    if (activeTab === "gesperrt") return e.status === "locked";
    return true;
  });

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
              background: item.active ? "rgba(255,255,255,0.9)" : "transparent",
              boxShadow: item.active ? "0 2px 10px rgba(2,35,80,0.08)" : "none",
              textDecoration: "none", color: item.active ? marine : "#8090A0", transition: "all 0.2s",
            }}><item.icon size={20} strokeWidth={item.active ? 2.2 : 1.8} /></a>
          ))}
          <div style={{ height: 1, background: "rgba(2,35,80,0.08)", margin: "8px 8px" }} />
          {adminItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", textDecoration: "none", color: "#8090A0",
            }}><item.icon size={20} strokeWidth={1.8} /></a>
          ))}
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
            <div style={{ fontSize: 28, fontWeight: 700, color: marine }}>Prüfungen</div>
            <div style={{ fontSize: 12, color: "#8090A0" }}>Deine Prüfungen und Ergebnisse</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {[
              { key: "alle", label: "Alle" },
              { key: "offen", label: "Offen" },
              { key: "bestanden", label: "Bestanden" },
              { key: "gesperrt", label: "Gesperrt" },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: "6px 16px", borderRadius: 20, border: activeTab === tab.key ? "none" : "1px solid rgba(2,35,80,0.08)", background: activeTab === tab.key ? marine : "rgba(255,255,255,0.85)", color: activeTab === tab.key ? "white" : "#4A4A5A", fontSize: 12.5, fontWeight: activeTab === tab.key ? 600 : 400, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>{tab.label}</button>
            ))}
          </div>

          {/* Exam list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(exam => (
              <div key={exam.id} style={{ ...glass, border: exam.urgent ? "1px solid rgba(231,76,60,0.3)" : "1px solid rgba(255,255,255,0.6)", boxShadow: exam.urgent ? "0 2px 24px rgba(231,76,60,0.06)" : "0 2px 20px rgba(2,35,80,0.06)", padding: "20px 24px", opacity: exam.status === "locked" ? 0.6 : 1, transition: "all 0.2s ease" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: marine, fontFamily: h }}>{exam.title}</div>
                      {exam.urgent && <span style={{ background: "rgba(231,76,60,0.1)", color: "#e74c3c", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Dringend</span>}
                      {exam.status === "passed" && <span style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Bestanden</span>}
                      {exam.status === "locked" && <span style={{ background: "rgba(255,255,255,0.6)", color: "#9A9AAA", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Gesperrt</span>}
                    </div>
                    <div style={{ fontSize: 12.5, color: "#4A4A5A", marginBottom: 12 }}>Kurs: {exam.course}</div>
                    <div style={{ display: "flex", gap: 20 }}>
                      <div style={{ fontSize: 12, color: "#8090A0" }}>Frist: <span style={{ color: exam.urgent ? "#e74c3c" : "#4A4A5A", fontWeight: 500 }}>{exam.due}</span></div>
                      <div style={{ fontSize: 12, color: "#8090A0" }}>Bestehensgrenze: <span style={{ color: "#4A4A5A", fontWeight: 500 }}>{exam.passing}%</span></div>
                      {exam.score && <div style={{ fontSize: 12, color: "#8090A0" }}>Ergebnis: <span style={{ color: "#0FA4A0", fontWeight: 600 }}>{exam.score}%</span></div>}
                    </div>
                  </div>
                  <div>
                    {exam.status === "pending" && (
                      <button style={{ padding: "9px 20px", background: exam.urgent ? "linear-gradient(135deg, #e74c3c, #c0392b)" : `linear-gradient(135deg, ${marine}, ${marineMid})`, color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: b, whiteSpace: "nowrap", transition: "all 0.2s ease" }}>Prüfung starten</button>
                    )}
                    {exam.status === "passed" && (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#0FA4A0", fontFamily: h }}>{exam.score}%</div>
                        <div style={{ fontSize: 11, color: "#8090A0" }}>Erreicht</div>
                      </div>
                    )}
                    {exam.status === "locked" && <Lock size={20} color="#8090A0" />}
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
