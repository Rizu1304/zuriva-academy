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

const tabs = [
  { key: "alle", label: "Alle" },
  { key: "offen", label: "Offen" },
  { key: "bestanden", label: "Bestanden" },
  { key: "gesperrt", label: "Gesperrt" },
];

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
      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "8px 18px",
              borderRadius: 14,
              border: activeTab === tab.key ? "1px solid rgba(15,164,160,0.4)" : "1px solid rgba(255,255,255,0.08)",
              background: activeTab === tab.key ? "rgba(15,164,160,0.15)" : "rgba(255,255,255,0.03)",
              color: activeTab === tab.key ? "#5EEAD4" : "rgba(255,255,255,0.5)",
              fontSize: 12.5,
              fontWeight: activeTab === tab.key ? 700 : 500,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.3s ease",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exams */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((exam, i) => (
          <div
            key={exam.id}
            className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}
            style={{
              borderRadius: 20,
              border: exam.urgent ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(255,255,255,0.07)",
              background: exam.urgent ? "rgba(239,68,68,0.04)" : "rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              padding: "24px 28px",
              opacity: exam.status === "locked" ? 0.5 : 1,
              transition: "all 0.4s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>{exam.title}</div>
                  {exam.urgent && <span style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>Dringend</span>}
                  {exam.status === "passed" && <span style={{ background: "rgba(15,164,160,0.15)", color: "#5EEAD4", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>Bestanden</span>}
                  {exam.status === "locked" && (
                    <span style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      Gesperrt
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>Kurs: {exam.course}</div>
                <div style={{ display: "flex", gap: 24 }}>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
                    Frist: <span style={{ color: exam.urgent ? "#ef4444" : "rgba(255,255,255,0.7)", fontWeight: 600 }}>{exam.due}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
                    Bestehensgrenze: <span style={{ color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>{exam.passing}%</span>
                  </div>
                  {exam.score && (
                    <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>
                      Ergebnis: <span style={{ color: "#5EEAD4", fontWeight: 700 }}>{exam.score}%</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ flexShrink: 0 }}>
                {exam.status === "pending" && (
                  <button className="premium-btn" style={{ background: exam.urgent ? "linear-gradient(135deg, #ef4444, #dc2626)" : undefined }}>
                    Pruefung starten
                  </button>
                )}
                {exam.status === "passed" && exam.score && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ position: "relative", width: 64, height: 64 }}>
                      <svg width="64" height="64" viewBox="0 0 64 64">
                        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                        <circle cx="32" cy="32" r="26" fill="none" stroke="#0FA4A0" strokeWidth="5" strokeLinecap="round" strokeDasharray="163" strokeDashoffset={163 - (163 * exam.score) / 100} className="progress-ring-circle" />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 800, color: "#5EEAD4" }}>{exam.score}%</div>
                    </div>
                  </div>
                )}
                {exam.status === "locked" && (
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
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
