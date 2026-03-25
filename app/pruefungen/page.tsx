"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

const exams = [
  { id: 1, title: "Sachversicherung — Grundbegriffe", course: "Grundlagen Sachversicherung", courseId: 1, quizId: "sach-grundbegriffe", due: "28.03.2026", status: "pending" as const, score: null, passing: 70, urgent: true, questions: 5, duration: "5 min" },
  { id: 2, title: "Sachversicherung — Produktkenntnisse", course: "Grundlagen Sachversicherung", courseId: 1, quizId: "sach-produkte", due: "02.04.2026", status: "pending" as const, score: null, passing: 70, urgent: false, questions: 5, duration: "8 min" },
  { id: 3, title: "Lebensversicherung — Grundlagen", course: "Lebensversicherungen", courseId: 2, quizId: "leben-grundlagen", due: "15.04.2026", status: "pending" as const, score: null, passing: 70, urgent: false, questions: 5, duration: "5 min" },
  { id: 4, title: "Trainee Grundausbildung — Abschluss", course: "Trainee Grundausbildung", courseId: null, quizId: null, due: "01.03.2026", status: "passed" as const, score: 94, passing: 70, urgent: false, questions: 20, duration: "30 min" },
  { id: 5, title: "Beratungskompetenz Quiz", course: "Beratungskompetenz", courseId: null, quizId: null, due: "10.02.2026", status: "passed" as const, score: 88, passing: 70, urgent: false, questions: 10, duration: "12 min" },
  { id: 6, title: "FIDLEG Grundlagen", course: "FIDLEG und VAG 2026", courseId: 3, quizId: null, due: "30.04.2026", status: "locked" as const, score: null, passing: 80, urgent: false, questions: 8, duration: "10 min" },
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

  const openCount = exams.filter(e => e.status === "pending").length;
  const passedCount = exams.filter(e => e.status === "passed").length;
  const avgScore = exams.filter(e => e.score).reduce((s, e) => s + (e.score ?? 0), 0) / (passedCount || 1);

  return (
    <DashboardLayout title="Pruefungen" subtitle="Deine Pruefungen und Ergebnisse">

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <div className="z-card animate-fade-in-up stagger-1" style={{ padding: "22px 24px" }}>
          <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: "#C8A24D", lineHeight: 1, marginBottom: 4 }}>{openCount}</div>
          <div style={{ fontSize: 12.5, color: "#9A9AAA" }}>Offene Pruefungen</div>
        </div>
        <div className="z-card animate-fade-in-up stagger-2" style={{ padding: "22px 24px" }}>
          <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: "#0FA4A0", lineHeight: 1, marginBottom: 4 }}>{passedCount}</div>
          <div style={{ fontSize: 12.5, color: "#9A9AAA" }}>Bestanden</div>
        </div>
        <div className="z-card animate-fade-in-up stagger-3" style={{ padding: "22px 24px" }}>
          <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: "#022350", lineHeight: 1, marginBottom: 4 }}>{Math.round(avgScore)}%</div>
          <div style={{ fontSize: 12.5, color: "#9A9AAA" }}>Durchschnitt</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ padding: "7px 18px", borderRadius: 20, border: "1px solid", borderColor: activeTab === tab.key ? "#022350" : "#E8E4DE", background: activeTab === tab.key ? "#022350" : "white", color: activeTab === tab.key ? "white" : "#4A4A5A", fontSize: 12.5, fontWeight: activeTab === tab.key ? 600 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s ease" }}>
            {tab.label}
            {tab.key === "offen" && openCount > 0 && <span style={{ marginLeft: 6, background: activeTab === tab.key ? "rgba(255,255,255,0.2)" : "rgba(200,162,77,0.1)", color: activeTab === tab.key ? "white" : "#C8A24D", padding: "1px 6px", borderRadius: 10, fontSize: 10, fontWeight: 700 }}>{openCount}</span>}
          </button>
        ))}
      </div>

      {/* Exam List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map((exam, i) => (
          <div key={exam.id} className={`z-card animate-fade-in-up stagger-${Math.min(i + 1, 8)}`} style={{ padding: "24px 28px", opacity: exam.status === "locked" ? 0.5 : 1, borderLeft: exam.urgent ? "3px solid #C0392B" : exam.status === "passed" ? "3px solid #0FA4A0" : undefined }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#022350" }}>{exam.title}</div>
                  {exam.urgent && <span className="z-badge" style={{ background: "rgba(192,57,43,0.06)", color: "#C0392B" }}>Dringend</span>}
                  {exam.status === "passed" && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0" }}>Bestanden</span>}
                  {exam.status === "locked" && <span className="z-badge" style={{ background: "#F0ECE6", color: "#9A9AAA" }}>Gesperrt</span>}
                </div>
                <div style={{ fontSize: 12.5, color: "#9A9AAA", marginBottom: 12 }}>Kurs: {exam.course}</div>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Frist: <span style={{ color: exam.urgent ? "#C0392B" : "#022350", fontWeight: 600 }}>{exam.due}</span></span>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>{exam.questions} Fragen · {exam.duration}</span>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Bestehensgrenze: <span style={{ fontWeight: 600 }}>{exam.passing}%</span></span>
                  {exam.score && <span style={{ fontSize: 12, color: "#4A4A5A" }}>Ergebnis: <span style={{ color: "#0FA4A0", fontWeight: 700 }}>{exam.score}%</span></span>}
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                {exam.status === "pending" && exam.quizId && (
                  <Link href={`/quiz/${exam.quizId}`} className={`z-btn ${exam.urgent ? "z-btn-primary" : "z-btn-teal"}`} style={{ textDecoration: "none" }}>
                    Pruefung starten
                  </Link>
                )}
                {exam.status === "pending" && !exam.quizId && (
                  <button className="z-btn z-btn-ghost" style={{ opacity: 0.5 }}>Bald verfuegbar</button>
                )}
                {exam.status === "passed" && exam.score && (
                  <div style={{ textAlign: "center" }}>
                    <div className="font-heading" style={{ fontSize: 32, fontWeight: 400, color: "#0FA4A0" }}>{exam.score}%</div>
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
