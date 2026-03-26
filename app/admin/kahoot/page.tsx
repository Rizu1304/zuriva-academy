"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown, Save, X, CheckCircle, Circle, Search } from "lucide-react";

interface Question {
  id: string;
  text: string;
  type: "mc" | "tf";
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: "Einfach" | "Mittel" | "Schwer";
  status: "Aktiv" | "Entwurf";
  timePerQuestion: number;
  questions: Question[];
}

const categories = ["Alle", "Sachversicherung", "Lebensversicherung", "Compliance", "Beratungskompetenz", "Allgemein"];

const initialQuizzes: Quiz[] = [
  {
    id: "1", title: "Sachversicherung Grundlagen", category: "Sachversicherung", difficulty: "Mittel", status: "Aktiv", timePerQuestion: 20,
    questions: [
      { id: "q1", text: "Was deckt eine Gebäudeversicherung in der Schweiz NICHT ab?", type: "mc", options: ["Erdbebenschäden", "Feuerschäden", "Wasserschäden", "Sturmschäden"], correctIndex: 0, explanation: "Erdbebenschäden sind in der Grunddeckung der meisten kantonalen Gebäudeversicherungen nicht enthalten." },
      { id: "q2", text: "In wie vielen Kantonen ist die Gebäudeversicherung obligatorisch?", type: "mc", options: ["15", "19", "22", "26"], correctIndex: 1, explanation: "19 von 26 Kantonen haben eine obligatorische kantonale Gebäudeversicherung." },
      { id: "q3", text: "Was bedeutet Unterversicherung?", type: "mc", options: ["Zu hohe Prämie", "Versicherungssumme unter dem tatsächlichen Wert", "Doppelversicherung", "Überversicherung"], correctIndex: 1, explanation: "Bei Unterversicherung ist die Versicherungssumme tiefer als der tatsächliche Wert der versicherten Sachen." },
      { id: "q4", text: "Welche Kantone gehören zu den GUSTAVO-Kantonen?", type: "mc", options: ["Zürich, Bern, Luzern", "Genf, Uri, Schwyz, Tessin, AI, VS, OW", "Basel, Aargau, St. Gallen", "Alle Westschweizer Kantone"], correctIndex: 1, explanation: "GUSTAVO steht für Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis und Obwalden." },
      { id: "q5", text: "Was ist der Unterschied zwischen Neuwert und Zeitwert?", type: "mc", options: ["Kein Unterschied", "Neuwert = Wiederbeschaffung, Zeitwert = abzüglich Altersentwertung", "Zeitwert ist immer höher", "Neuwert gilt nur für Gebäude"], correctIndex: 1, explanation: "Der Neuwert entspricht den Wiederbeschaffungskosten, der Zeitwert berücksichtigt die Altersentwertung." },
      { id: "q6", text: "Die Hausratversicherung ist in der Schweiz obligatorisch.", type: "tf", options: ["Wahr", "Falsch"], correctIndex: 1, explanation: "Die Hausratversicherung ist in der Schweiz freiwillig, wird aber dringend empfohlen." },
    ],
  },
  {
    id: "2", title: "VBV Compliance 2026", category: "Compliance", difficulty: "Schwer", status: "Aktiv", timePerQuestion: 25,
    questions: [
      { id: "q1", text: "Welches Gesetz regelt die Vermittlertätigkeit in der Schweiz?", type: "mc", options: ["OR", "VAG", "VVG", "FIDLEG"], correctIndex: 1, explanation: "Das Versicherungsaufsichtsgesetz (VAG) regelt die Vermittlertätigkeit." },
      { id: "q2", text: "Wie viele Weiterbildungsstunden verlangt die VBV pro Jahr?", type: "mc", options: ["10 Stunden", "15 Stunden", "20 Stunden", "30 Stunden"], correctIndex: 1, explanation: "Die VBV verlangt mindestens 15 Stunden Weiterbildung pro Jahr." },
      { id: "q3", text: "Was ist die Hauptaufgabe der FINMA?", type: "mc", options: ["Steuererhebung", "Banken- und Versicherungsaufsicht", "Exportförderung", "Arbeitsrecht"], correctIndex: 1, explanation: "Die FINMA ist die eidgenössische Finanzmarktaufsicht." },
      { id: "q4", text: "FIDLEG gilt auch für Versicherungsvermittler.", type: "tf", options: ["Wahr", "Falsch"], correctIndex: 0, explanation: "Seit der Reform gelten FIDLEG-Bestimmungen auch für Versicherungsvermittler." },
      { id: "q5", text: "Was droht bei fehlender VBV-Registrierung?", type: "mc", options: ["Verwarnung", "Busse bis CHF 500", "Berufsverbot und Busse", "Keine Konsequenzen"], correctIndex: 2, explanation: "Ohne gültige VBV-Registrierung droht ein Berufsverbot und eine empfindliche Busse." },
    ],
  },
  {
    id: "3", title: "Beratungstechniken", category: "Beratungskompetenz", difficulty: "Einfach", status: "Entwurf", timePerQuestion: 15,
    questions: [
      { id: "q1", text: "Was ist der erste Schritt in einem Beratungsgespräch?", type: "mc", options: ["Produkt präsentieren", "Vertrag unterschreiben", "Bedürfnisanalyse", "Prämie berechnen"], correctIndex: 2, explanation: "Die Bedürfnisanalyse steht immer am Anfang eines professionellen Beratungsgesprächs." },
      { id: "q2", text: "Welche Fragetechnik eignet sich am besten für die Bedarfsermittlung?", type: "mc", options: ["Geschlossene Fragen", "Suggestivfragen", "Offene W-Fragen", "Rhetorische Fragen"], correctIndex: 2, explanation: "Offene W-Fragen (Was, Wie, Warum) fördern ausführliche Antworten des Kunden." },
      { id: "q3", text: "Aktives Zuhören bedeutet nur still zu sein.", type: "tf", options: ["Wahr", "Falsch"], correctIndex: 1, explanation: "Aktives Zuhören umfasst Paraphrasieren, Nachfragen und nonverbale Signale." },
      { id: "q4", text: "Was gehört NICHT zu einer professionellen Einwandbehandlung?", type: "mc", options: ["Verständnis zeigen", "Einwand ignorieren", "Gegenargumente liefern", "Nachfragen stellen"], correctIndex: 1, explanation: "Einwände sollten nie ignoriert werden - sie zeigen Interesse des Kunden." },
    ],
  },
];

export default function KahootAdmin() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);
  const [view, setView] = useState<"list" | "edit">("list");
  const [editQuiz, setEditQuiz] = useState<Quiz | null>(null);
  const [filterCat, setFilterCat] = useState("Alle");
  const [search, setSearch] = useState("");

  const filtered = quizzes.filter(q => {
    if (filterCat !== "Alle" && q.category !== filterCat) return false;
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const openEdit = (quiz: Quiz) => { setEditQuiz({ ...quiz, questions: quiz.questions.map(q => ({ ...q })) }); setView("edit"); };
  const openNew = () => {
    setEditQuiz({ id: Date.now().toString(), title: "", category: "Allgemein", difficulty: "Mittel", status: "Entwurf", timePerQuestion: 20, questions: [] });
    setView("edit");
  };

  const saveQuiz = () => {
    if (!editQuiz || !editQuiz.title.trim()) return;
    setQuizzes(prev => {
      const idx = prev.findIndex(q => q.id === editQuiz.id);
      if (idx >= 0) { const copy = [...prev]; copy[idx] = editQuiz; return copy; }
      return [...prev, editQuiz];
    });
    setView("list");
    setEditQuiz(null);
  };

  const deleteQuiz = (id: string) => { setQuizzes(prev => prev.filter(q => q.id !== id)); };

  const addQuestion = () => {
    if (!editQuiz) return;
    setEditQuiz({ ...editQuiz, questions: [...editQuiz.questions, { id: Date.now().toString(), text: "", type: "mc", options: ["", "", "", ""], correctIndex: 0, explanation: "" }] });
  };

  const updateQuestion = (idx: number, updates: Partial<Question>) => {
    if (!editQuiz) return;
    const qs = [...editQuiz.questions];
    qs[idx] = { ...qs[idx], ...updates };
    setEditQuiz({ ...editQuiz, questions: qs });
  };

  const removeQuestion = (idx: number) => {
    if (!editQuiz) return;
    setEditQuiz({ ...editQuiz, questions: editQuiz.questions.filter((_, i) => i !== idx) });
  };

  const moveQuestion = (idx: number, dir: -1 | 1) => {
    if (!editQuiz) return;
    const qs = [...editQuiz.questions];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= qs.length) return;
    [qs[idx], qs[newIdx]] = [qs[newIdx], qs[idx]];
    setEditQuiz({ ...editQuiz, questions: qs });
  };

  const diffColor = (d: string) => d === "Einfach" ? "#0FA4A0" : d === "Mittel" ? "#C8A24D" : "#C0392B";

  if (view === "edit" && editQuiz) {
    return (
      <DashboardLayout title={editQuiz.title || "Neues Quiz"} subtitle="Quiz bearbeiten">
        <div style={{ maxWidth: 900 }}>
          {/* Quiz Settings */}
          <div className="z-card" style={{ padding: "28px 32px", marginBottom: 20 }}>
            <div className="font-heading" style={{ fontSize: 20, color: "#022350", marginBottom: 16 }}>Quiz-Einstellungen</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Titel</label>
                <input value={editQuiz.title} onChange={e => setEditQuiz({ ...editQuiz, title: e.target.value })} placeholder="Quiz-Titel eingeben..." style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Kategorie</label>
                <select value={editQuiz.category} onChange={e => setEditQuiz({ ...editQuiz, category: e.target.value })} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none" }}>
                  {categories.slice(1).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Schwierigkeit</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["Einfach", "Mittel", "Schwer"] as const).map(d => (
                    <button key={d} onClick={() => setEditQuiz({ ...editQuiz, difficulty: d })} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "1px solid", borderColor: editQuiz.difficulty === d ? diffColor(d) : "rgba(2,35,80,0.08)", background: editQuiz.difficulty === d ? `${diffColor(d)}12` : "transparent", color: editQuiz.difficulty === d ? diffColor(d) : "#4A5568", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{d}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Zeit pro Frage</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {[10, 15, 20, 30].map(t => (
                    <button key={t} onClick={() => setEditQuiz({ ...editQuiz, timePerQuestion: t })} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "1px solid", borderColor: editQuiz.timePerQuestion === t ? "#C8A24D" : "rgba(2,35,80,0.08)", background: editQuiz.timePerQuestion === t ? "rgba(200,162,77,0.08)" : "transparent", color: editQuiz.timePerQuestion === t ? "#C8A24D" : "#4A5568", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t}s</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: 6 }}>Status</label>
                <div style={{ display: "flex", gap: 6 }}>
                  {(["Entwurf", "Aktiv"] as const).map(s => (
                    <button key={s} onClick={() => setEditQuiz({ ...editQuiz, status: s })} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "1px solid", borderColor: editQuiz.status === s ? (s === "Aktiv" ? "#0FA4A0" : "#C8A24D") : "rgba(2,35,80,0.08)", background: editQuiz.status === s ? (s === "Aktiv" ? "rgba(15,164,160,0.08)" : "rgba(200,162,77,0.08)") : "transparent", color: editQuiz.status === s ? (s === "Aktiv" ? "#0FA4A0" : "#C8A24D") : "#4A5568", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{s}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div className="font-heading" style={{ fontSize: 20, color: "#022350" }}>Fragen ({editQuiz.questions.length})</div>
            <button onClick={addQuestion} className="z-btn z-btn-primary" style={{ fontSize: 12, padding: "8px 16px", display: "flex", alignItems: "center", gap: 6 }}>
              <Plus size={14} /> Frage hinzufügen
            </button>
          </div>

          {editQuiz.questions.map((q, qi) => (
            <div key={q.id} className="z-card" style={{ padding: "24px 28px", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>Frage {qi + 1}</div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button onClick={() => moveQuestion(qi, -1)} disabled={qi === 0} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: qi === 0 ? "transparent" : "rgba(2,35,80,0.04)", cursor: qi === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronUp size={14} color={qi === 0 ? "#9CA3AF" : "#022350"} /></button>
                  <button onClick={() => moveQuestion(qi, 1)} disabled={qi === editQuiz.questions.length - 1} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: qi === editQuiz.questions.length - 1 ? "transparent" : "rgba(2,35,80,0.04)", cursor: qi === editQuiz.questions.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronDown size={14} color={qi === editQuiz.questions.length - 1 ? "#9CA3AF" : "#022350"} /></button>
                  <button onClick={() => removeQuestion(qi)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "rgba(192,57,43,0.06)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Trash2 size={14} color="#C0392B" /></button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {(["mc", "tf"] as const).map(t => (
                  <button key={t} onClick={() => updateQuestion(qi, { type: t, options: t === "tf" ? ["Wahr", "Falsch"] : ["", "", "", ""], correctIndex: 0 })} style={{ padding: "5px 12px", borderRadius: 20, border: "1px solid", borderColor: q.type === t ? "#022350" : "rgba(2,35,80,0.08)", background: q.type === t ? "#022350" : "transparent", color: q.type === t ? "white" : "#4A5568", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t === "mc" ? "Multiple Choice" : "Wahr/Falsch"}</button>
                ))}
              </div>

              <textarea value={q.text} onChange={e => updateQuestion(qi, { text: e.target.value })} placeholder="Frage eingeben..." rows={2} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", marginBottom: 12 }} />

              <div style={{ display: "grid", gridTemplateColumns: q.type === "tf" ? "1fr 1fr" : "1fr 1fr", gap: 8, marginBottom: 12 }}>
                {q.options.map((opt, oi) => (
                  <div key={oi} onClick={() => updateQuestion(qi, { correctIndex: oi })} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderRadius: 12, border: "1px solid", borderColor: q.correctIndex === oi ? "#0FA4A0" : "rgba(2,35,80,0.08)", background: q.correctIndex === oi ? "rgba(15,164,160,0.06)" : "rgba(255,255,255,0.50)", cursor: "pointer" }}>
                    {q.correctIndex === oi ? <CheckCircle size={16} color="#0FA4A0" /> : <Circle size={16} color="#9CA3AF" />}
                    {q.type === "tf" ? (
                      <span style={{ fontSize: 13, color: "#022350", fontWeight: 500 }}>{opt}</span>
                    ) : (
                      <input value={opt} onChange={e => { const opts = [...q.options]; opts[oi] = e.target.value; updateQuestion(qi, { options: opts }); }} onClick={e => e.stopPropagation()} placeholder={`Antwort ${String.fromCharCode(65 + oi)}`} style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: "inherit", color: "#022350" }} />
                    )}
                  </div>
                ))}
              </div>

              <input value={q.explanation} onChange={e => updateQuestion(qi, { explanation: e.target.value })} placeholder="Erklärung (optional)..." style={{ width: "100%", padding: "10px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.30)", fontSize: 13, fontFamily: "inherit", outline: "none", color: "#4A5568" }} />
            </div>
          ))}

          {/* Action Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            <button onClick={() => { setView("list"); setEditQuiz(null); }} className="z-btn z-btn-ghost" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <X size={14} /> Abbrechen
            </button>
            <button onClick={saveQuiz} className="z-btn z-btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Save size={14} /> Quiz speichern
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Kahoot Quizzes" subtitle={`${filtered.length} Quizzes verwalten`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: "rgba(255,255,255,0.50)", border: "1px solid rgba(2,35,80,0.08)" }}>
            <Search size={14} color="#9CA3AF" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Quiz suchen..." style={{ border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: "inherit", width: 160, color: "#022350" }} />
          </div>
        </div>
        <button onClick={openNew} className="z-btn z-btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Plus size={14} /> Neues Quiz
        </button>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilterCat(c)} style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid", borderColor: filterCat === c ? "#022350" : "rgba(2,35,80,0.08)", background: filterCat === c ? "#022350" : "transparent", color: filterCat === c ? "white" : "#4A5568", fontSize: 12, fontWeight: filterCat === c ? 600 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>{c}</button>
        ))}
      </div>

      <div className="z-grid-3">
        {filtered.map((quiz, i) => (
          <div key={quiz.id} className={`z-card animate-scale-in stagger-${Math.min(i + 1, 8)}`} style={{ padding: "24px 26px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span className="z-badge" style={{ background: quiz.status === "Aktiv" ? "rgba(15,164,160,0.10)" : "rgba(200,162,77,0.12)", color: quiz.status === "Aktiv" ? "#0FA4A0" : "#9A7B35" }}>{quiz.status}</span>
              <span className="z-badge" style={{ background: `${diffColor(quiz.difficulty)}12`, color: diffColor(quiz.difficulty) }}>{quiz.difficulty}</span>
            </div>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 700, color: "#022350", marginBottom: 4 }}>{quiz.title}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 16 }}>{quiz.category} · {quiz.questions.length} Fragen · {quiz.timePerQuestion}s pro Frage</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => openEdit(quiz)} className="z-btn z-btn-ghost" style={{ flex: 1, fontSize: 12, padding: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <Pencil size={13} /> Bearbeiten
              </button>
              <button onClick={() => deleteQuiz(quiz.id)} style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: "rgba(192,57,43,0.06)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Trash2 size={14} color="#C0392B" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
