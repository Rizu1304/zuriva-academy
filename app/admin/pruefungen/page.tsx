"use client";

import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

type Exam = {
  id: string;
  title: string;
  description: string;
  courseName: string;
  passingScore: number;
  timeLimit: number;
  status: "DRAFT" | "PUBLISHED";
  questions: Question[];
};

const INITIAL_EXAMS: Exam[] = [
  {
    id: "1",
    title: "Grundlagen der Lebensversicherung",
    description: "Abschlussprüfung zum Kurs Lebensversicherung",
    courseName: "Lebensversicherung Basics",
    passingScore: 70,
    timeLimit: 45,
    status: "PUBLISHED",
    questions: [
      { id: "q1", text: "Was ist eine Kapitallebensversicherung?", options: ["Reine Risikoabsicherung", "Kombination aus Sparen und Risikoschutz", "Eine Form der Sachversicherung", "Ein Bankprodukt"], correctIndex: 1 },
      { id: "q2", text: "Welche Rolle spielt der Rechnungszins?", options: ["Bestimmt die Versicherungsdauer", "Beeinflusst die Garantieleistung", "Regelt die Kündigungsfrist", "Definiert den Versicherungsumfang"], correctIndex: 1 },
      { id: "q3", text: "Was bedeutet der Begriff 'Überschussbeteiligung'?", options: ["Zusätzliche Beiträge des Versicherten", "Beteiligung an erwirtschafteten Überschüssen", "Gebühren für Verwaltung", "Steuerliche Belastung"], correctIndex: 1 },
    ],
  },
  {
    id: "2",
    title: "Sachversicherung Prüfung",
    description: "Wissenstest zu Sachversicherungen",
    courseName: "Sachversicherung Kompakt",
    passingScore: 80,
    timeLimit: 60,
    status: "PUBLISHED",
    questions: [
      { id: "q4", text: "Was deckt eine Hausratversicherung ab?", options: ["Gebäudeschäden", "Bewegliche Gegenstände im Haushalt", "Haftpflichtschäden", "Kfz-Schäden"], correctIndex: 1 },
      { id: "q5", text: "Was ist der Neuwert?", options: ["Zeitwert minus Abschreibung", "Wiederbeschaffungspreis eines gleichwertigen neuen Gegenstands", "Marktwert des Gegenstands", "Restwert nach Schaden"], correctIndex: 1 },
    ],
  },
  {
    id: "3",
    title: "Haftpflichtrecht Grundlagen",
    description: "Grundlagenprüfung zum Haftpflichtrecht",
    courseName: "Haftpflichtversicherung",
    passingScore: 75,
    timeLimit: 30,
    status: "DRAFT",
    questions: [
      { id: "q6", text: "Was regelt § 823 BGB?", options: ["Vertragliche Haftung", "Deliktische Haftung", "Gefährdungshaftung", "Produkthaftung"], correctIndex: 1 },
    ],
  },
  {
    id: "4",
    title: "Krankenversicherung Abschlusstest",
    description: "Umfassende Prüfung zur Krankenversicherung",
    courseName: "Krankenversicherung A-Z",
    passingScore: 65,
    timeLimit: 50,
    status: "DRAFT",
    questions: [
      { id: "q7", text: "Was ist die Gesundheitsprüfung?", options: ["Ärztliche Untersuchung", "Risikoprüfung bei Antragstellung", "Jährlicher Gesundheitscheck", "Prüfung der Beitragsrückerstattung"], correctIndex: 1 },
      { id: "q8", text: "Was bedeutet PKV?", options: ["Pflichtversicherung", "Private Krankenversicherung", "Pauschale Krankenvergütung", "Persönliche Kostenvereinbarung"], correctIndex: 1 },
      { id: "q9", text: "Welche Wartezeit gilt in der PKV?", options: ["Keine", "3 Monate allgemein", "6 Monate", "12 Monate"], correctIndex: 1 },
      { id: "q10", text: "Was ist ein Selbstbehalt?", options: ["Eigenanteil des Versicherten", "Beitragserhöhung", "Verwaltungsgebühr", "Stornogebühr"], correctIndex: 0 },
    ],
  },
  {
    id: "5",
    title: "Berufsunfähigkeitsversicherung",
    description: "Prüfung zur BU-Versicherung",
    courseName: "Berufsunfähigkeit & Vorsorge",
    passingScore: 70,
    timeLimit: 40,
    status: "PUBLISHED",
    questions: [
      { id: "q11", text: "Ab welchem Grad gilt man als berufsunfähig?", options: ["25%", "50%", "75%", "100%"], correctIndex: 1 },
      { id: "q12", text: "Was ist eine abstrakte Verweisung?", options: ["Verweis auf einen anderen Beruf", "Verweis auf einen Arzt", "Verweis auf einen Gutachter", "Verweis auf die GKV"], correctIndex: 0 },
    ],
  },
];

const COURSE_OPTIONS = [
  "Lebensversicherung Basics",
  "Sachversicherung Kompakt",
  "Haftpflichtversicherung",
  "Krankenversicherung A-Z",
  "Berufsunfähigkeit & Vorsorge",
  "Altersvorsorge Masterclass",
  "Finanzplanung Grundlagen",
];

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  DRAFT: { label: "Entwurf", bg: "#FFF3E0", color: "#E65100" },
  PUBLISHED: { label: "Veröffentlicht", bg: "#E8F5E9", color: "#2E7D32" },
};

let nextId = 6;
let nextQId = 13;

export default function PruefungsEditor() {
  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editExam, setEditExam] = useState<Exam | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", courseName: "", passingScore: "70", timeLimit: "45", status: "DRAFT" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newOptions, setNewOptions] = useState(["", "", "", ""]);
  const [newCorrectIndex, setNewCorrectIndex] = useState(0);

  const openCreate = () => {
    setForm({ title: "", description: "", courseName: "", passingScore: "70", timeLimit: "45", status: "DRAFT" });
    setQuestions([]);
    setView("create");
  };

  const openEdit = (exam: Exam) => {
    setEditExam(exam);
    setForm({
      title: exam.title,
      description: exam.description,
      courseName: exam.courseName,
      passingScore: exam.passingScore.toString(),
      timeLimit: exam.timeLimit.toString(),
      status: exam.status,
    });
    setQuestions([...exam.questions]);
    setView("edit");
  };

  const saveExam = () => {
    const examData: Exam = {
      id: view === "edit" && editExam ? editExam.id : String(nextId++),
      title: form.title,
      description: form.description,
      courseName: form.courseName,
      passingScore: parseInt(form.passingScore) || 70,
      timeLimit: parseInt(form.timeLimit) || 45,
      status: form.status as "DRAFT" | "PUBLISHED",
      questions: questions,
    };
    if (view === "create") {
      setExams((prev) => [...prev, examData]);
    } else {
      setExams((prev) => prev.map((e) => (e.id === examData.id ? examData : e)));
    }
    setView("list");
    setEditExam(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Prüfung wirklich löschen?")) return;
    setExams((prev) => prev.filter((e) => e.id !== id));
  };

  const toggleStatus = (id: string) => {
    setExams((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: e.status === "DRAFT" ? "PUBLISHED" : "DRAFT" } : e
      )
    );
  };

  const addQuestion = () => {
    if (!newQuestion.trim() || newOptions.some((o) => !o.trim())) return;
    setQuestions((prev) => [
      ...prev,
      { id: "q" + nextQId++, text: newQuestion, options: [...newOptions], correctIndex: newCorrectIndex },
    ]);
    setNewQuestion("");
    setNewOptions(["", "", "", ""]);
    setNewCorrectIndex(0);
  };

  const removeQuestion = (qId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== qId));
  };

  const filtered = exams.filter((e) => {
    if (filter !== "ALL" && e.status !== filter) return false;
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalExams = exams.length;
  const publishedCount = exams.filter((e) => e.status === "PUBLISHED").length;
  const draftCount = exams.filter((e) => e.status === "DRAFT").length;
  const avgPassing = exams.length > 0 ? Math.round(exams.reduce((sum, e) => sum + e.passingScore, 0) / exams.length) : 0;

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "#FAF8F5", overflow: "hidden" }}>
      {/* Sidebar */}
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
          { name: "Prüfungen", href: "/pruefungen" },
          { name: "Zertifikate", href: "/zertifikate" },
          { name: "Forum", href: "/forum" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2px solid transparent", fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "18px 22px 6px" }}>ADMIN</div>
        {[
          { name: "Übersicht", href: "/admin" },
          { name: "Kurseditor", href: "/admin/kurse" },
          { name: "Prüfungseditor", href: "/admin/pruefungen", active: true },
          { name: "Team", href: "/admin/team" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#FAF8F5" : "transparent", borderLeft: item.active ? "2px solid #C8A24D" : "2px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "1px solid #F0ECE6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Admin</div></div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", borderBottom: "1px solid #F0ECE6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 400, color: "#022350", fontFamily: h }}>
              {view === "list" ? "Prüfungseditor" : view === "create" ? "Neue Prüfung" : "Prüfung bearbeiten"}
            </div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>
              {view === "list" ? "Prüfungen erstellen, bearbeiten und verwalten" : view === "create" ? "Neue Prüfung anlegen" : editExam?.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "list" ? (
              <button onClick={openCreate} style={{ padding: "8px 16px", background: "#022350", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neue Prüfung</button>
            ) : (
              <button onClick={() => { setView("list"); setEditExam(null); }} style={{ padding: "8px 16px", background: "white", color: "#4A4A5A", borderRadius: 9, fontSize: 12.5, fontWeight: 500, border: "1px solid #F0ECE6", cursor: "pointer", fontFamily: b }}>&#8592; Zurück</button>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          {/* LIST VIEW */}
          {view === "list" && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
                <input placeholder="Prüfung suchen…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "8px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, width: 260, outline: "none", fontFamily: b }} />
                {["ALL", "DRAFT", "PUBLISHED"].map((s) => (
                  <button key={s} onClick={() => setFilter(s)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "1px solid #F0ECE6", cursor: "pointer", background: filter === s ? "#022350" : "white", color: filter === s ? "white" : "#4A4A5A", fontFamily: b }}>
                    {s === "ALL" ? "Alle" : STATUS_LABELS[s].label}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Alle Prüfungen", value: totalExams, color: "#022350" },
                  { label: "Veröffentlicht", value: publishedCount, color: "#0FA4A0" },
                  { label: "Entwürfe", value: draftCount, color: "#C8A24D" },
                  { label: "Ø Bestehensquote", value: avgPassing + "%", color: "#9A9AAA" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 14, border: "1px solid #F0ECE6", padding: "20px 22px" }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1, fontFamily: h }}>{s.value}</div>
                    <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Table */}
              {filtered.length === 0 ? (
                <div style={{ background: "white", borderRadius: 14, border: "1px solid #F0ECE6", padding: "60px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 4 }}>Keine Prüfungen gefunden</div>
                  <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 16 }}>Erstellen Sie Ihre erste Prüfung.</div>
                  <button onClick={openCreate} style={{ padding: "8px 20px", background: "#022350", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neue Prüfung</button>
                </div>
              ) : (
                <div style={{ background: "white", borderRadius: 14, border: "1px solid #F0ECE6", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9fb" }}>
                        {["Prüfung", "Kurs", "Bestehensquote", "Zeitlimit", "Fragen", "Status", "Aktionen"].map((col) => (
                          <th key={col} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9A9AAA", letterSpacing: "0.05em", textTransform: "uppercase" }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((exam) => {
                        const st = STATUS_LABELS[exam.status];
                        return (
                          <tr key={exam.id} style={{ borderTop: "1px solid #F0ECE6" }}>
                            <td style={{ padding: "14px 24px" }}>
                              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{exam.title}</div>
                              {exam.description && <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 2, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exam.description}</div>}
                            </td>
                            <td style={{ padding: "14px 24px" }}>
                              <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: "#FAF8F5", color: "#022350" }}>{exam.courseName}</span>
                            </td>
                            <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{exam.passingScore}%</td>
                            <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{exam.timeLimit} Min.</td>
                            <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{exam.questions.length}</td>
                            <td style={{ padding: "14px 24px" }}>
                              <span
                                onClick={() => toggleStatus(exam.id)}
                                style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: st.bg, color: st.color, cursor: "pointer" }}
                                title="Klicken um Status zu ändern"
                              >
                                {st.label}
                              </span>
                            </td>
                            <td style={{ padding: "14px 24px" }}>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={() => openEdit(exam)} style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #F0ECE6", background: "white", fontSize: 12, cursor: "pointer", color: "#022350", fontFamily: b }}>Bearbeiten</button>
                                <button onClick={() => handleDelete(exam.id)} style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #F0ECE6", background: "white", fontSize: 12, cursor: "pointer", color: "#e74c3c", fontFamily: b }}>Löschen</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}

          {/* CREATE / EDIT VIEW */}
          {(view === "create" || view === "edit") && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Left: Exam Details */}
              <div style={{ background: "white", borderRadius: 14, border: "1px solid #F0ECE6", padding: "28px 28px" }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 20, fontFamily: h }}>Prüfungsdetails</div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Prüfungstitel *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="z.B. Grundlagen der Lebensversicherung" style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: b }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Beschreibung</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Kurze Beschreibung der Prüfung…" style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: b }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Kurs zuordnen</label>
                  <select value={form.courseName} onChange={(e) => setForm({ ...form, courseName: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", background: "white", boxSizing: "border-box", fontFamily: b }}>
                    <option value="">Kurs auswählen…</option>
                    {COURSE_OPTIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Bestehensquote (%)</label>
                    <input type="number" min="0" max="100" value={form.passingScore} onChange={(e) => setForm({ ...form, passingScore: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: b }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Zeitlimit (Minuten)</label>
                    <input type="number" min="1" value={form.timeLimit} onChange={(e) => setForm({ ...form, timeLimit: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: b }} />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", background: "white", boxSizing: "border-box", fontFamily: b }}>
                    <option value="DRAFT">Entwurf</option>
                    <option value="PUBLISHED">Veröffentlicht</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button onClick={() => { setView("list"); setEditExam(null); }} style={{ padding: "10px 20px", borderRadius: 9, border: "1px solid #F0ECE6", background: "white", fontSize: 13, cursor: "pointer", color: "#4A4A5A", fontFamily: b }}>Abbrechen</button>
                  <button onClick={saveExam} disabled={!form.title.trim()} style={{ padding: "10px 24px", borderRadius: 9, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", background: !form.title.trim() ? "#F0ECE6" : "#022350", color: !form.title.trim() ? "#9A9AAA" : "white", fontFamily: b }}>
                    {view === "create" ? "Prüfung erstellen" : "Änderungen speichern"}
                  </button>
                </div>
              </div>

              {/* Right: Questions */}
              <div style={{ background: "white", borderRadius: 14, border: "1px solid #F0ECE6", padding: "28px 28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Fragen</div>
                  <span style={{ fontSize: 12, color: "#9A9AAA" }}>{questions.length} Fragen</span>
                </div>

                {/* Existing questions */}
                <div style={{ flex: 1, overflowY: "auto", marginBottom: 20 }}>
                  {questions.length === 0 ? (
                    <div style={{ padding: "32px 0", textAlign: "center", color: "#9A9AAA", fontSize: 13 }}>Noch keine Fragen vorhanden.</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {questions.map((q, idx) => (
                        <div key={q.id} style={{ padding: "14px 18px", borderRadius: 10, border: "1px solid #F0ECE6", background: "#f8f9fb" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#022350", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0, marginTop: 1 }}>{idx + 1}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350", marginBottom: 8 }}>{q.text}</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                {q.options.map((opt, oi) => (
                                  <div key={oi} style={{ fontSize: 12, color: oi === q.correctIndex ? "#0FA4A0" : "#4A4A5A", fontWeight: oi === q.correctIndex ? 600 : 400, display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ width: 16, height: 16, borderRadius: "50%", border: oi === q.correctIndex ? "2px solid #0FA4A0" : "1.5px solid #F0ECE6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: oi === q.correctIndex ? "#E8F8F7" : "white" }}>
                                      {oi === q.correctIndex && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0FA4A0" }} />}
                                    </span>
                                    {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button onClick={() => removeQuestion(q.id)} style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #F0ECE6", background: "white", fontSize: 11, cursor: "pointer", color: "#e74c3c", flexShrink: 0, fontFamily: b }}>&#215;</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add question form */}
                <div style={{ borderTop: "1px solid #F0ECE6", paddingTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#022350", marginBottom: 10 }}>Neue Frage hinzufügen</div>
                  <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Fragetext eingeben…" style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 10, fontFamily: b }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    {newOptions.map((opt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input
                          type="radio"
                          name="correctOption"
                          checked={newCorrectIndex === i}
                          onChange={() => setNewCorrectIndex(i)}
                          style={{ accentColor: "#0FA4A0", cursor: "pointer" }}
                          title="Als richtige Antwort markieren"
                        />
                        <input
                          value={opt}
                          onChange={(e) => {
                            const updated = [...newOptions];
                            updated[i] = e.target.value;
                            setNewOptions(updated);
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + i)}`}
                          style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "1px solid #F0ECE6", fontSize: 12, outline: "none", boxSizing: "border-box", fontFamily: b }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: "#9A9AAA", marginBottom: 10 }}>Radiobutton = richtige Antwort markieren</div>
                  <button
                    onClick={addQuestion}
                    disabled={!newQuestion.trim() || newOptions.some((o) => !o.trim())}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 9,
                      border: "none",
                      fontSize: 12.5,
                      fontWeight: 500,
                      cursor: "pointer",
                      background: newQuestion.trim() && newOptions.every((o) => o.trim()) ? "#0FA4A0" : "#F0ECE6",
                      color: newQuestion.trim() && newOptions.every((o) => o.trim()) ? "white" : "#9A9AAA",
                      width: "100%",
                      fontFamily: b,
                    }}
                  >
                    + Frage hinzufügen
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
