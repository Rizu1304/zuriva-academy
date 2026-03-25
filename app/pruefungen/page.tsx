"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const exams = [
  { id: 1, title: "Sachversicherung — Modul 3", course: "Grundlagen Sachversicherung", due: "28.03.2026", status: "pending" as const, score: null, passing: 70, urgent: true },
  { id: 2, title: "Lebensversicherungen Abschlusspruefung", course: "Lebensversicherungen", due: "15.04.2026", status: "pending" as const, score: null, passing: 75, urgent: false },
  { id: 3, title: "Trainee Grundausbildung — Abschluss", course: "Trainee Grundausbildung", due: "01.03.2026", status: "passed" as const, score: 94, passing: 70, urgent: false },
  { id: 4, title: "Beratungskompetenz Quiz", course: "Beratungskompetenz", due: "10.02.2026", status: "passed" as const, score: 88, passing: 70, urgent: false },
  { id: 5, title: "FIDLEG Grundlagen", course: "FIDLEG und VAG 2026", due: "30.04.2026", status: "locked" as const, score: null, passing: 80, urgent: false },
];

const tabs = [{ key: "alle", label: "Alle" }, { key: "offen", label: "Offen" }, { key: "bestanden", label: "Bestanden" }, { key: "gesperrt", label: "Gesperrt" }];

export default function Pruefungen() {
  const [activeTab, setActiveTab] = useState("alle");
  const filtered = exams.filter((e) => {
    if (activeTab === "alle") return true;
    if (activeTab === "offen") return e.status === "pending";
    if (activeTab === "bestanden") return e.status === "passed";
    if (activeTab === "gesperrt") return e.status === "locked";
    return true;
  });

  return (
    <DashboardLayout title="Pruefungen" subtitle="Deine Pruefungen und Ergebnisse">
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: "7px 18px", borderRadius: 20, border: "1px solid", borderColor: activeTab === tab.key ? "#022350" : "#E8E4DE", background: activeTab === tab.key ? "#022350" : "white", color: activeTab === tab.key ? "white" : "#4A4A5A", fontSize: 12.5, fontWeight: activeTab === tab.key ? 600 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s ease" }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((exam, i) => (
          <div key={exam.id} className={`z-card animate-fade-in-up stagger-${Math.min(i + 1, 8)}`} style={{ padding: "22px 26px", opacity: exam.status === "locked" ? 0.55 : 1, borderLeft: exam.urgent ? "3px solid #C0392B" : undefined }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#022350" }}>{exam.title}</div>
                  {exam.urgent && <span className="z-badge" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}>Dringend</span>}
                  {exam.status === "passed" && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0" }}>Bestanden</span>}
                  {exam.status === "locked" && <span className="z-badge" style={{ background: "#F0ECE6", color: "#9A9AAA" }}>Gesperrt</span>}
                </div>
                <div style={{ fontSize: 12.5, color: "#9A9AAA", marginBottom: 10 }}>Kurs: {exam.course}</div>
                <div style={{ display: "flex", gap: 20 }}>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Frist: <span style={{ color: exam.urgent ? "#C0392B" : "#022350", fontWeight: 600 }}>{exam.due}</span></span>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Bestehensgrenze: <span style={{ fontWeight: 600 }}>{exam.passing}%</span></span>
                  {exam.score && <span style={{ fontSize: 12, color: "#4A4A5A" }}>Ergebnis: <span style={{ color: "#0FA4A0", fontWeight: 700 }}>{exam.score}%</span></span>}
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                {exam.status === "pending" && <button className={`z-btn ${exam.urgent ? "z-btn-primary" : "z-btn-teal"}`}>Pruefung starten</button>}
                {exam.status === "passed" && exam.score && (
                  <div style={{ textAlign: "center" }}>
                    <div className="font-heading" style={{ fontSize: 30, fontWeight: 500, color: "#0FA4A0" }}>{exam.score}%</div>
                    <div style={{ fontSize: 11, color: "#9A9AAA" }}>Erreicht</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
