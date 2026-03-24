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
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "#FAF8F5", overflow: "hidden" }}>
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "1px solid #F0ECE6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "1px solid #F0ECE6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "18px 22px 6px" }}>LERNEN</div>
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Kurse", href: "/courses" },
          { name: "Lernpfade", href: "/lernpfade" },
          { name: "Prüfungen", href: "/pruefungen", active: true },
          { name: "Zertifikate", href: "/zertifikate" },
          { name: "Forum", href: "/forum" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#FAF8F5" : "transparent", borderLeft: item.active ? "2px solid #C8A24D" : "2px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "18px 22px 6px" }}>ADMIN</div>
        {[
          { name: "Übersicht", href: "/admin" },
          { name: "Kurseditor", href: "/admin/kurse" },
          { name: "Prüfungseditor", href: "/admin/pruefungen" },
          { name: "Team", href: "/admin/team" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2px solid transparent", fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "1px solid #F0ECE6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", borderBottom: "1px solid #F0ECE6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 400, color: "#022350", fontFamily: h }}>Prüfungen</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Deine Prüfungen und Ergebnisse</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white" }}>LM</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            {[
              { key: "alle", label: "Alle" },
              { key: "offen", label: "Offen" },
              { key: "bestanden", label: "Bestanden" },
              { key: "gesperrt", label: "Gesperrt" },
            ].map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid", borderColor: activeTab === tab.key ? "#022350" : "#F0ECE6", background: activeTab === tab.key ? "#022350" : "white", color: activeTab === tab.key ? "white" : "#4A4A5A", fontSize: 12.5, fontWeight: activeTab === tab.key ? 600 : 400, cursor: "pointer", fontFamily: b }}>{tab.label}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filtered.map(exam => (
              <div key={exam.id} style={{ background: "white", borderRadius: 14, border: exam.urgent ? "1.5px solid #e74c3c" : "1px solid #F0ECE6", padding: "20px 24px", opacity: exam.status === "locked" ? 0.6 : 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>{exam.title}</div>
                      {exam.urgent && <span style={{ background: "rgba(231,76,60,0.1)", color: "#e74c3c", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Dringend</span>}
                      {exam.status === "passed" && <span style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Bestanden</span>}
                      {exam.status === "locked" && <span style={{ background: "#FAF8F5", color: "#9A9AAA", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>Gesperrt</span>}
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
                      <button style={{ padding: "9px 20px", background: exam.urgent ? "#e74c3c" : "#022350", color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: b, whiteSpace: "nowrap" }}>Prüfung starten</button>
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
