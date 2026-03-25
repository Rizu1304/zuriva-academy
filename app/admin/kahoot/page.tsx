"use client";

import { useState } from "react";
import EditorAI from "@/components/EditorAI";
import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Bell,
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

const sideNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookOpen, label: "Kurse", href: "/courses" },
  { icon: Map, label: "Lernpfade", href: "/lernpfade" },
  { icon: MessageSquare, label: "Forum", href: "/forum" },
  { icon: Clock, label: "Prüfungen", href: "/pruefungen" },
  { icon: Award, label: "Zertifikate", href: "/zertifikate" },
];

const sideAdminItems = [
  { icon: Settings, label: "Admin", href: "/admin" },
  { icon: Gamepad2, label: "Kahoot", href: "/kahoot" },
];

type KahootQuestion = { id: string; text: string; options: string[]; correctIndex: number; timeLimit: number; points: number };
type KahootQuiz = {
  id: string;
  title: string;
  description: string;
  topic: string;
  status: "DRAFT" | "PUBLISHED";
  questions: KahootQuestion[];
};

const INITIAL_QUIZZES: KahootQuiz[] = [
  {
    id: "1", title: "Versicherungs-Basics Blitz", description: "Schnelles Quiz zu Versicherungsgrundlagen",
    topic: "Grundlagen", status: "PUBLISHED",
    questions: [
      { id: "kq1", text: "Was ist eine Prämie?", options: ["Der Versicherungsbeitrag", "Der Schadensfall", "Die Police", "Der Vermittler"], correctIndex: 0, timeLimit: 20, points: 1000 },
      { id: "kq2", text: "Was bedeutet VBV?", options: ["Verband Berliner Versicherer", "Verband Bernischer Versicherer", "Versicherungsberufsverordnung", "Versicherungsvermittlerverordnung"], correctIndex: 2, timeLimit: 20, points: 1000 },
      { id: "kq3", text: "Welche Versicherung ist in der Schweiz obligatorisch?", options: ["Hausratversicherung", "Krankenversicherung", "Lebensversicherung", "Rechtsschutzversicherung"], correctIndex: 1, timeLimit: 15, points: 1000 },
    ],
  },
  {
    id: "2", title: "Sachversicherung Challenge", description: "Teste dein Wissen über Sachversicherungen",
    topic: "Sachversicherung", status: "PUBLISHED",
    questions: [
      { id: "kq4", text: "Was deckt eine Gebäudeversicherung?", options: ["Möbel", "Das Gebäude selbst", "Autos", "Haustiere"], correctIndex: 1, timeLimit: 15, points: 1000 },
      { id: "kq5", text: "Was ist ein Selbstbehalt?", options: ["Eigenanteil bei Schaden", "Prämienrabatt", "Vertragslaufzeit", "Deckungssumme"], correctIndex: 0, timeLimit: 20, points: 1000 },
    ],
  },
  {
    id: "3", title: "Compliance Fun Quiz", description: "Spielerisch Compliance-Wissen testen",
    topic: "Compliance", status: "DRAFT",
    questions: [
      { id: "kq6", text: "Was regelt FIDLEG?", options: ["Finanzdienstleistungsgesetz", "Firmengründungsgesetz", "Finanzderivategesetz", "Förderungsgesetz"], correctIndex: 0, timeLimit: 20, points: 1000 },
    ],
  },
];

const TOPICS = ["Grundlagen", "Sachversicherung", "Lebensversicherung", "Haftpflicht", "Compliance", "VBV", "Beratung", "Recht"];
const TIME_OPTIONS = [10, 15, 20, 30, 45, 60];

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  DRAFT: { label: "Entwurf", bg: "rgba(200,162,77,0.1)", color: "#C8A24D" },
  PUBLISHED: { label: "Veröffentlicht", bg: "rgba(15,164,160,0.1)", color: "#0FA4A0" },
};

let nextId = 4;
let nextQId = 7;

export default function KahootEditor() {
  const [quizzes, setQuizzes] = useState<KahootQuiz[]>(INITIAL_QUIZZES);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editQuiz, setEditQuiz] = useState<KahootQuiz | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", topic: "", status: "DRAFT" });
  const [questions, setQuestions] = useState<KahootQuestion[]>([]);
  const [newQ, setNewQ] = useState({ text: "", options: ["", "", "", ""], correctIndex: 0, timeLimit: 20, points: 1000 });

  const openCreate = () => {
    setForm({ title: "", description: "", topic: "", status: "DRAFT" });
    setQuestions([]);
    setView("create");
  };

  const openEdit = (quiz: KahootQuiz) => {
    setEditQuiz(quiz);
    setForm({ title: quiz.title, description: quiz.description, topic: quiz.topic, status: quiz.status });
    setQuestions([...quiz.questions]);
    setView("edit");
  };

  const saveQuiz = () => {
    const data: KahootQuiz = {
      id: view === "edit" && editQuiz ? editQuiz.id : String(nextId++),
      title: form.title, description: form.description, topic: form.topic,
      status: form.status as "DRAFT" | "PUBLISHED", questions,
    };
    if (view === "create") setQuizzes(prev => [...prev, data]);
    else setQuizzes(prev => prev.map(q => q.id === data.id ? data : q));
    setView("list");
    setEditQuiz(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Quiz wirklich löschen?")) return;
    setQuizzes(prev => prev.filter(q => q.id !== id));
  };

  const addQuestion = () => {
    if (!newQ.text.trim() || newQ.options.some(o => !o.trim())) return;
    setQuestions(prev => [...prev, { id: "kq" + nextQId++, text: newQ.text, options: [...newQ.options], correctIndex: newQ.correctIndex, timeLimit: newQ.timeLimit, points: newQ.points }]);
    setNewQ({ text: "", options: ["", "", "", ""], correctIndex: 0, timeLimit: 20, points: 1000 });
  };

  const removeQuestion = (id: string) => setQuestions(prev => prev.filter(q => q.id !== id));

  const handleAIQuestions = (items: Record<string, unknown>[]) => {
    const newQuestions: KahootQuestion[] = items.map(item => ({
      id: "kq" + nextQId++,
      text: String(item.text || ""),
      options: Array.isArray(item.options) ? item.options.map(String) : ["", "", "", ""],
      correctIndex: typeof item.correctIndex === "number" ? item.correctIndex : 0,
      timeLimit: typeof item.timeLimit === "number" ? item.timeLimit : 20,
      points: typeof item.points === "number" ? item.points : 1000,
    })).filter(q => q.text);
    setQuestions(prev => [...prev, ...newQuestions]);
  };

  const filtered = quizzes.filter(q => {
    if (filter !== "ALL" && q.status !== filter) return false;
    if (search && !q.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const kahootColors = ["#e21b3c", "#1368ce", "#d89e00", "#26890c"];
  const glassCard = { ...glass };
  const inputStyle = { borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, outline: "none", boxSizing: "border-box" as const, fontFamily: b };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bgColor, overflow: "hidden" }}>

      {/* ICON SIDEBAR */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        <div style={{ width: 42, height: 42, borderRadius: 14, background: marine, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(2,35,80,0.25)" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {sideNavItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent",
              textDecoration: "none", color: "#8090A0", transition: "all 0.2s",
            }}><item.icon size={20} strokeWidth={1.8} /></a>
          ))}
          <div style={{ height: 1, background: "rgba(2,35,80,0.08)", margin: "8px 8px" }} />
          {sideAdminItems.map((item) => {
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#8090A0", cursor: "pointer" }}><Bell size={20} /></div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg, ${marine}, ${marineMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", boxShadow: "0 2px 8px rgba(2,35,80,0.2)" }}>LM</div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: marine, fontFamily: h }}>
              {view === "list" ? "Kahoot-Editor" : view === "create" ? "Neues Quiz" : "Quiz bearbeiten"}
            </div>
            <div style={{ fontSize: 12, color: "#8090A0" }}>
              {view === "list" ? "Kahoot-Quizze erstellen, bearbeiten und verwalten" : view === "create" ? "Neues Quiz anlegen" : editQuiz?.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "list" ? (
              <button onClick={openCreate} style={{ padding: "8px 16px", background: marine, color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neues Quiz</button>
            ) : (
              <button onClick={() => { setView("list"); setEditQuiz(null); }} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.6)", color: "#4A4A5A", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", fontFamily: b }}>&#8592; Zurück</button>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* LIST */}
          {view === "list" && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
                <input placeholder="Quiz suchen..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "8px 14px", width: 260, ...inputStyle }} />
                {["ALL", "DRAFT", "PUBLISHED"].map(s => (
                  <button key={s} onClick={() => setFilter(s)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", background: filter === s ? marine : "rgba(255,255,255,0.6)", color: filter === s ? "white" : "#4A4A5A", fontFamily: b }}>
                    {s === "ALL" ? "Alle" : STATUS_LABELS[s].label}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Alle Quizze", value: quizzes.length, color: "#022350" },
                  { label: "Veröffentlicht", value: quizzes.filter(q => q.status === "PUBLISHED").length, color: "#0FA4A0" },
                  { label: "Entwürfe", value: quizzes.filter(q => q.status === "DRAFT").length, color: "#C8A24D" },
                ].map((s, i) => (
                  <div key={i} style={{ ...glassCard, padding: "20px 22px" }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div style={{ ...glassCard, padding: "60px 24px", textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: marine }}><Gamepad2 size={24} /></div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: marine, fontFamily: h, marginBottom: 4 }}>Keine Quizze gefunden</div>
                  <div style={{ fontSize: 13, color: "#8090A0", marginBottom: 16 }}>Erstellen Sie Ihr erstes Quiz.</div>
                  <button onClick={openCreate} style={{ padding: "8px 20px", background: marine, color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neues Quiz</button>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  {filtered.map(quiz => {
                    const st = STATUS_LABELS[quiz.status];
                    return (
                      <div key={quiz.id} style={{ ...glassCard, padding: "22px 24px", cursor: "pointer", transition: "all 0.2s ease" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                          <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white" }}><Gamepad2 size={20} /></div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 15, fontWeight: 500, color: "#022350", fontFamily: h }}>{quiz.title}</div>
                            <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: st.bg, color: st.color }}>{st.label}</span>
                          </div>
                        </div>
                        <div style={{ fontSize: 13, color: "#4A4A5A", marginBottom: 12 }}>{quiz.description}</div>
                        <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                          <div style={{ fontSize: 12, color: "#9A9AAA" }}>Thema: <span style={{ color: "#4A4A5A", fontWeight: 500 }}>{quiz.topic}</span></div>
                          <div style={{ fontSize: 12, color: "#9A9AAA" }}>Fragen: <span style={{ color: "#4A4A5A", fontWeight: 500 }}>{quiz.questions.length}</span></div>
                        </div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => openEdit(quiz)} style={{ padding: "6px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#022350", fontFamily: b, flex: 1 }}>Bearbeiten</button>
                          <button onClick={() => handleDelete(quiz.id)} style={{ padding: "6px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#e74c3c", fontFamily: b }}>Löschen</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* CREATE / EDIT */}
          {(view === "create" || view === "edit") && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {/* Left: Quiz Details */}
              <div style={{ ...glassCard, padding: "28px 28px" }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 20 }}>Quiz-Details</div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Titel *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="z.B. Versicherungs-Basics Blitz" style={{ width: "100%", padding: "10px 14px", ...inputStyle }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Beschreibung</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Kurze Beschreibung des Quiz..." style={{ width: "100%", padding: "10px 14px", resize: "vertical", ...inputStyle }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Thema</label>
                    <select value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} style={{ width: "100%", padding: "10px 14px", ...inputStyle }}>
                      <option value="">Auswählen...</option>
                      {TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Status</label>
                    <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ width: "100%", padding: "10px 14px", ...inputStyle }}>
                      <option value="DRAFT">Entwurf</option>
                      <option value="PUBLISHED">Veröffentlicht</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
                  <button onClick={() => { setView("list"); setEditQuiz(null); }} style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer", color: "#4A4A5A", fontFamily: b }}>Abbrechen</button>
                  <button onClick={saveQuiz} disabled={!form.title.trim()} style={{ padding: "10px 24px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", background: !form.title.trim() ? "rgba(0,0,0,0.06)" : marine, color: !form.title.trim() ? "#9A9AAA" : "white", fontFamily: b }}>
                    {view === "create" ? "Quiz erstellen" : "Änderungen speichern"}
                  </button>
                </div>
              </div>

              {/* Right: Questions */}
              <div style={{ ...glassCard, padding: "28px 28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Fragen</div>
                  <span style={{ fontSize: 12, color: "#9A9AAA" }}>{questions.length} Fragen</span>
                </div>

                <EditorAI
                  context="kahoot"
                  topic={form.title || form.topic}
                  itemLabel="Fragen"
                  onItemsGenerated={handleAIQuestions}
                  placeholder="z.B. Erstelle 10 lustige Quiz-Fragen über Schweizer Versicherungen"
                />

                <div style={{ flex: 1, overflowY: "auto", marginBottom: 20 }}>
                  {questions.length === 0 ? (
                    <div style={{ padding: "32px 0", textAlign: "center", color: "#9A9AAA", fontSize: 13 }}>Noch keine Fragen vorhanden.</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {questions.map((q, idx) => (
                        <div key={q.id} style={{ padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.04)", background: "rgba(0,0,0,0.02)" }}>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                            <span style={{ width: 26, height: 26, borderRadius: 12, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{idx + 1}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350", marginBottom: 8 }}>{q.text}</div>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                                {q.options.map((opt, oi) => (
                                  <div key={oi} style={{ fontSize: 12, padding: "6px 10px", borderRadius: 8, background: kahootColors[oi] + "18", color: oi === q.correctIndex ? kahootColors[oi] : "#4A4A5A", fontWeight: oi === q.correctIndex ? 600 : 400, border: oi === q.correctIndex ? `1px solid ${kahootColors[oi]}44` : "1px solid transparent" }}>
                                    {oi === q.correctIndex && "✓ "}{opt}
                                  </div>
                                ))}
                              </div>
                              <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 6 }}>{q.timeLimit}s &middot; {q.points} Punkte</div>
                            </div>
                            <button onClick={() => removeQuestion(q.id)} style={{ padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer", color: "#e74c3c", fontFamily: b }}>&#215;</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add question */}
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.04)", paddingTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#022350", marginBottom: 10 }}>Neue Frage hinzufügen</div>
                  <input value={newQ.text} onChange={e => setNewQ({ ...newQ, text: e.target.value })} placeholder="Fragetext eingeben..." style={{ width: "100%", padding: "10px 14px", marginBottom: 8, ...inputStyle }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 8 }}>
                    {newQ.options.map((opt, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input type="radio" name="kahootCorrect" checked={newQ.correctIndex === i} onChange={() => setNewQ({ ...newQ, correctIndex: i })} style={{ accentColor: kahootColors[i], cursor: "pointer" }} />
                        <input value={opt} onChange={e => { const o = [...newQ.options]; o[i] = e.target.value; setNewQ({ ...newQ, options: o }); }} placeholder={`Option ${String.fromCharCode(65 + i)}`} style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1px solid ${kahootColors[i]}44`, fontSize: 12, outline: "none", boxSizing: "border-box", fontFamily: b }} />
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <div>
                      <label style={{ fontSize: 11, color: "#9A9AAA" }}>Zeitlimit</label>
                      <select value={newQ.timeLimit} onChange={e => setNewQ({ ...newQ, timeLimit: parseInt(e.target.value) })} style={{ width: "100%", padding: "6px 10px", ...inputStyle, fontSize: 12 }}>
                        {TIME_OPTIONS.map(t => <option key={t} value={t}>{t} Sekunden</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 11, color: "#9A9AAA" }}>Punkte</label>
                      <select value={newQ.points} onChange={e => setNewQ({ ...newQ, points: parseInt(e.target.value) })} style={{ width: "100%", padding: "6px 10px", ...inputStyle, fontSize: 12 }}>
                        {[500, 1000, 1500, 2000].map(p => <option key={p} value={p}>{p} Punkte</option>)}
                      </select>
                    </div>
                  </div>
                  <button onClick={addQuestion} disabled={!newQ.text.trim() || newQ.options.some(o => !o.trim())} style={{ padding: "8px 16px", borderRadius: 12, border: "none", fontSize: 12.5, fontWeight: 500, cursor: "pointer", background: newQ.text.trim() && newQ.options.every(o => o.trim()) ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "rgba(0,0,0,0.06)", color: newQ.text.trim() && newQ.options.every(o => o.trim()) ? "white" : "#9A9AAA", width: "100%", fontFamily: b }}>+ Frage hinzufügen</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
