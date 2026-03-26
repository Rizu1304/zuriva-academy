"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Users, BookOpen, Award, TrendingUp, Search, ChevronRight, AlertTriangle, Download } from "lucide-react";

interface Learner {
  id: string;
  name: string;
  avatar: string;
  email: string;
  role: string;
  credits: number;
  progress: number;
  streak: number;
  lastActive: string;
  status: "aktiv" | "inaktiv" | "gefährdet";
  lernpfad: string;
  currentModule: string;
}

const learners: Learner[] = [
  { id: "1", name: "Anna Schneider", avatar: "AS", email: "anna@zuriva.ch", role: "Instruktorin", credits: 580, progress: 97, streak: 22, lastActive: "Heute 10:30", status: "aktiv", lernpfad: "VBV Grundausbildung", currentModule: "Abschlussprüfung" },
  { id: "2", name: "Thomas Mueller", avatar: "TM", email: "thomas@zuriva.ch", role: "Vermittler", credits: 428, progress: 71, streak: 8, lastActive: "Heute 09:15", status: "aktiv", lernpfad: "VBV Grundausbildung", currentModule: "Haftpflicht" },
  { id: "3", name: "Laura Meier", avatar: "LM", email: "laura@zuriva.ch", role: "Vermittlerin", credits: 342, progress: 57, streak: 12, lastActive: "Heute 08:42", status: "aktiv", lernpfad: "VBV Grundausbildung", currentModule: "Sachversicherung" },
  { id: "4", name: "Petra Koch", avatar: "PK", email: "petra@zuriva.ch", role: "Vermittlerin", credits: 276, progress: 46, streak: 5, lastActive: "Gestern 16:00", status: "aktiv", lernpfad: "VBV Grundausbildung", currentModule: "Lebensversicherung" },
  { id: "5", name: "Marco Brunner", avatar: "MB", email: "marco@zuriva.ch", role: "Vermittler", credits: 195, progress: 33, streak: 0, lastActive: "Vor 5 Tagen", status: "gefährdet", lernpfad: "VBV Grundausbildung", currentModule: "Sachversicherung" },
  { id: "6", name: "Sandra Frei", avatar: "SF", email: "sandra@zuriva.ch", role: "Vermittlerin", credits: 120, progress: 20, streak: 0, lastActive: "Vor 2 Wochen", status: "inaktiv", lernpfad: "Trainee Grundausbildung", currentModule: "Grundlagen" },
  { id: "7", name: "Beat Keller", avatar: "BK", email: "beat@zuriva.ch", role: "Vermittler", credits: 410, progress: 68, streak: 3, lastActive: "Heute 07:30", status: "aktiv", lernpfad: "VBV Grundausbildung", currentModule: "Compliance" },
  { id: "8", name: "Nina Weber", avatar: "NW", email: "nina@zuriva.ch", role: "Vermittlerin", credits: 88, progress: 15, streak: 1, lastActive: "Gestern 11:00", status: "gefährdet", lernpfad: "Trainee Grundausbildung", currentModule: "Erste Schritte" },
];

const statusColor = (s: string) => s === "aktiv" ? "#0FA4A0" : s === "gefährdet" ? "#C8A24D" : "#C0392B";
const statusLabel = (s: string) => s === "aktiv" ? "Aktiv" : s === "gefährdet" ? "Gefährdet" : "Inaktiv";

export default function AdminDashboard() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("alle");
  const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);

  const filtered = learners.filter(l => {
    if (filterStatus !== "alle" && l.status !== filterStatus) return false;
    if (search && !l.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const avgProgress = Math.round(learners.reduce((s, l) => s + l.progress, 0) / learners.length);
  const totalCredits = learners.reduce((s, l) => s + l.credits, 0);
  const activeCount = learners.filter(l => l.status === "aktiv").length;
  const atRiskCount = learners.filter(l => l.status !== "aktiv").length;

  return (
    <DashboardLayout title="Admin Dashboard" subtitle={`${learners.length} Lernende verwalten`}>

      {/* Stats */}
      <div className="z-grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Lernende", value: learners.length, sub: `${activeCount} aktiv`, icon: <Users size={18} />, color: "#022350" },
          { label: "Ø Fortschritt", value: `${avgProgress}%`, sub: "Durchschnitt", icon: <TrendingUp size={18} />, color: "#0FA4A0" },
          { label: "Credits gesamt", value: totalCredits.toLocaleString(), sub: "alle Lernende", icon: <Award size={18} />, color: "#C8A24D" },
          { label: "Gefährdet", value: atRiskCount, sub: "brauchen Aufmerksamkeit", icon: <AlertTriangle size={18} />, color: "#C0392B" },
        ].map((s, i) => (
          <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "22px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: `${s.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
            <div>
              <div className="font-heading" style={{ fontSize: 26, fontWeight: 700, color: "#022350" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF" }}>{s.label} · {s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter + Search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {[["alle", "Alle"], ["aktiv", "Aktiv"], ["gefährdet", "Gefährdet"], ["inaktiv", "Inaktiv"]].map(([id, label]) => (
            <button key={id} onClick={() => setFilterStatus(id)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: filterStatus === id ? "#022350" : "rgba(2,35,80,0.08)", background: filterStatus === id ? "#022350" : "transparent", color: filterStatus === id ? "white" : "#4A5568", fontSize: 12, fontWeight: filterStatus === id ? 600 : 400, cursor: "pointer", fontFamily: "inherit" }}>{label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: "rgba(255,255,255,0.50)", border: "1px solid rgba(2,35,80,0.08)" }}>
            <Search size={14} color="#9CA3AF" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Suchen..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: "inherit", width: 160, color: "#022350" }} />
          </div>
          <button className="z-btn z-btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}><Download size={14} /> Export</button>
        </div>
      </div>

      {/* Learner Table */}
      <div className="z-card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 0.8fr 1fr 0.8fr 60px", padding: "14px 24px", background: "rgba(2,35,80,0.02)", borderBottom: "1px solid rgba(2,35,80,0.06)", fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5 }}>
          <div>Person</div><div>Lernpfad</div><div>Credits</div><div>Fortschritt</div><div>Status</div><div></div>
        </div>

        {filtered.map(l => (
          <div key={l.id} onClick={() => setSelectedLearner(selectedLearner?.id === l.id ? null : l)} style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 0.8fr 1fr 0.8fr 60px", padding: "16px 24px", borderBottom: "1px solid rgba(2,35,80,0.04)", cursor: "pointer", background: selectedLearner?.id === l.id ? "rgba(200,162,77,0.04)" : "transparent", transition: "all 0.15s", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: l.status === "aktiv" ? "linear-gradient(135deg, #C8A24D, #E0B95F)" : "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: l.status === "aktiv" ? "#022350" : "#9CA3AF" }}>{l.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{l.name}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>{l.role} · {l.lastActive}</div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#4A5568" }}>{l.currentModule}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{l.credits}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="z-progress" style={{ flex: 1, height: 4 }}>
                <div className="z-progress-bar" style={{ width: `${l.progress}%`, background: l.progress > 70 ? "#0FA4A0" : l.progress > 40 ? "#C8A24D" : "#C0392B" }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#022350", width: 32 }}>{l.progress}%</span>
            </div>
            <div><span className="z-badge" style={{ background: `${statusColor(l.status)}10`, color: statusColor(l.status) }}>{statusLabel(l.status)}</span></div>
            <div style={{ textAlign: "right" }}><ChevronRight size={14} color="#9CA3AF" /></div>
          </div>
        ))}
      </div>

      {/* Detail Panel */}
      {selectedLearner && (
        <div className="z-card animate-fade-in-up" style={{ marginTop: 16, padding: "28px 32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #C8A24D, #E0B95F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#022350" }}>{selectedLearner.avatar}</div>
              <div>
                <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350" }}>{selectedLearner.name}</div>
                <div style={{ fontSize: 13, color: "#9CA3AF" }}>{selectedLearner.email} · {selectedLearner.role}</div>
              </div>
            </div>
            <span className="z-badge" style={{ background: `${statusColor(selectedLearner.status)}10`, color: statusColor(selectedLearner.status), fontSize: 13, padding: "6px 16px" }}>{statusLabel(selectedLearner.status)}</span>
          </div>
          <div className="z-grid-4" style={{ marginBottom: 20 }}>
            {[
              { label: "Credits", value: selectedLearner.credits, color: "#C8A24D" },
              { label: "Fortschritt", value: `${selectedLearner.progress}%`, color: "#022350" },
              { label: "Streak", value: `${selectedLearner.streak} Tage`, color: "#C0392B" },
              { label: "Letzte Aktivität", value: selectedLearner.lastActive, color: "#0FA4A0" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(2,35,80,0.02)" }}>
                <div style={{ fontSize: 11, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, color: "#4A5568" }}>
              Lernpfad: <span style={{ fontWeight: 600, color: "#022350" }}>{selectedLearner.lernpfad}</span> · Modul: <span style={{ fontWeight: 600, color: "#022350" }}>{selectedLearner.currentModule}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="z-btn z-btn-ghost" style={{ fontSize: 12 }}>Nachricht</button>
              <button className="z-btn z-btn-primary" style={{ fontSize: 12 }}>Details</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
