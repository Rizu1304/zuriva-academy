"use client";
import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

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
            { name: "Lernpfade", href: "/lernpfade" },
            { name: "Prüfungen", href: "/pruefungen", active: true },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: 12, boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block", transition: "all 0.2s ease" }}>{item.name}</a>
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
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>Prüfungen</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Deine Prüfungen und Ergebnisse</div>
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
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: "6px 16px", borderRadius: 20, border: activeTab === tab.key ? "none" : "1px solid rgba(0,0,0,0.06)", background: activeTab === tab.key ? "#022350" : "rgba(255,255,255,0.72)", color: activeTab === tab.key ? "white" : "#4A4A5A", fontSize: 12.5, fontWeight: activeTab === tab.key ? 600 : 400, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>{tab.label}</button>
            ))}
          </div>

          {/* Exam list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(exam => (
              <div key={exam.id} style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: exam.urgent ? "1px solid rgba(231,76,60,0.3)" : "1px solid rgba(255,255,255,0.6)", boxShadow: exam.urgent ? "0 2px 24px rgba(231,76,60,0.06)" : "0 2px 24px rgba(2,35,80,0.04)", padding: "20px 24px", opacity: exam.status === "locked" ? 0.6 : 1, transition: "all 0.2s ease" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>{exam.title}</div>
                      {exam.urgent && <span style={{ background: "rgba(231,76,60,0.1)", color: "#e74c3c", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Dringend</span>}
                      {exam.status === "passed" && <span style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Bestanden</span>}
                      {exam.status === "locked" && <span style={{ background: "rgba(255,255,255,0.6)", color: "#9A9AAA", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Gesperrt</span>}
                    </div>
                    <div style={{ fontSize: 12.5, color: "#4A4A5A", marginBottom: 12 }}>Kurs: {exam.course}</div>
                    <div style={{ display: "flex", gap: 20 }}>
                      <div style={{ fontSize: 12, color: "#9A9AAA" }}>Frist: <span style={{ color: exam.urgent ? "#e74c3c" : "#4A4A5A", fontWeight: 500 }}>{exam.due}</span></div>
                      <div style={{ fontSize: 12, color: "#9A9AAA" }}>Bestehensgrenze: <span style={{ color: "#4A4A5A", fontWeight: 500 }}>{exam.passing}%</span></div>
                      {exam.score && <div style={{ fontSize: 12, color: "#9A9AAA" }}>Ergebnis: <span style={{ color: "#0FA4A0", fontWeight: 600 }}>{exam.score}%</span></div>}
                    </div>
                  </div>
                  <div>
                    {exam.status === "pending" && (
                      <button style={{ padding: "9px 20px", background: exam.urgent ? "linear-gradient(135deg, #e74c3c, #c0392b)" : "linear-gradient(135deg, #022350, #0E3057)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: b, whiteSpace: "nowrap", transition: "all 0.2s ease" }}>Prüfung starten</button>
                    )}
                    {exam.status === "passed" && (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 28, fontWeight: 700, color: "#0FA4A0", fontFamily: h }}>{exam.score}%</div>
                        <div style={{ fontSize: 11, color: "#9A9AAA" }}>Erreicht</div>
                      </div>
                    )}
                    {exam.status === "locked" && <div style={{ fontSize: 20 }}>🔒</div>}
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
