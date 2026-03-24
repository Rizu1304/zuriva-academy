"use client";

import { useState } from "react";
import KIToolkit from "@/components/KIToolkit";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type Step = { id: string; title: string; type: "course" | "exam" | "activity"; duration: string };
type LearningPath = {
  id: string;
  title: string;
  description: string;
  targetGroup: string;
  credits: number;
  status: "DRAFT" | "PUBLISHED";
  steps: Step[];
};

const INITIAL_PATHS: LearningPath[] = [
  {
    id: "1", title: "Trainee Grundausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende bei Zuriva",
    targetGroup: "Neue Mitarbeitende", credits: 40, status: "PUBLISHED",
    steps: [
      { id: "s1", title: "Willkommen bei Zuriva", type: "course", duration: "30 Min" },
      { id: "s2", title: "Versicherungsgrundlagen", type: "course", duration: "2 Std" },
      { id: "s3", title: "Grundlagen-Quiz", type: "exam", duration: "45 Min" },
      { id: "s4", title: "Beratungskompetenz Basics", type: "course", duration: "1.5 Std" },
      { id: "s5", title: "Abschlussprüfung Trainee", type: "exam", duration: "60 Min" },
    ],
  },
  {
    id: "2", title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung",
    targetGroup: "Alle Vermittler", credits: 120, status: "PUBLISHED",
    steps: [
      { id: "s6", title: "VBV Einführung & Regulatorik", type: "course", duration: "2 Std" },
      { id: "s7", title: "Sachversicherung Grundlagen", type: "course", duration: "3 Std" },
      { id: "s8", title: "Lebensversicherung Grundlagen", type: "course", duration: "3 Std" },
      { id: "s9", title: "Zwischenprüfung VBV", type: "exam", duration: "90 Min" },
      { id: "s10", title: "FIDLEG & Compliance", type: "course", duration: "2 Std" },
    ],
  },
  {
    id: "3", title: "Spezialisierung Nicht-Leben", description: "Vertiefung in Sach- und Haftpflichtversicherungen",
    targetGroup: "Erfahrene Vermittler", credits: 80, status: "DRAFT",
    steps: [
      { id: "s11", title: "Erweiterte Sachversicherung", type: "course", duration: "3 Std" },
      { id: "s12", title: "Haftpflichtrecht", type: "course", duration: "2.5 Std" },
      { id: "s13", title: "Fallstudien Nicht-Leben", type: "activity", duration: "2 Std" },
    ],
  },
];

const TARGET_GROUPS = ["Neue Mitarbeitende", "Alle Vermittler", "Erfahrene Vermittler", "Teamleiter", "Compliance-Beauftragte"];
const STEP_TYPES: Record<string, { label: string; icon: string; color: string }> = {
  course: { label: "Kurs", icon: "📚", color: "#022350" },
  exam: { label: "Prüfung", icon: "📝", color: "#C8A24D" },
  activity: { label: "Aktivität", icon: "💡", color: "#0FA4A0" },
};

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  DRAFT: { label: "Entwurf", bg: "rgba(200,162,77,0.1)", color: "#C8A24D" },
  PUBLISHED: { label: "Veröffentlicht", bg: "rgba(15,164,160,0.1)", color: "#0FA4A0" },
};

let nextId = 4;
let nextStepId = 14;

export default function LernpfadEditor() {
  const [paths, setPaths] = useState<LearningPath[]>(INITIAL_PATHS);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editPath, setEditPath] = useState<LearningPath | null>(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", targetGroup: "", credits: "0", status: "DRAFT" });
  const [steps, setSteps] = useState<Step[]>([]);
  const [newStep, setNewStep] = useState({ title: "", type: "course", duration: "" });

  const openCreate = () => {
    setForm({ title: "", description: "", targetGroup: "", credits: "0", status: "DRAFT" });
    setSteps([]);
    setView("create");
  };

  const openEdit = (path: LearningPath) => {
    setEditPath(path);
    setForm({ title: path.title, description: path.description, targetGroup: path.targetGroup, credits: path.credits.toString(), status: path.status });
    setSteps([...path.steps]);
    setView("edit");
  };

  const savePath = () => {
    const data: LearningPath = {
      id: view === "edit" && editPath ? editPath.id : String(nextId++),
      title: form.title, description: form.description, targetGroup: form.targetGroup,
      credits: parseInt(form.credits) || 0, status: form.status as "DRAFT" | "PUBLISHED", steps,
    };
    if (view === "create") setPaths(prev => [...prev, data]);
    else setPaths(prev => prev.map(p => p.id === data.id ? data : p));
    setView("list");
    setEditPath(null);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Lernpfad wirklich löschen?")) return;
    setPaths(prev => prev.filter(p => p.id !== id));
  };

  const addStep = () => {
    if (!newStep.title.trim()) return;
    setSteps(prev => [...prev, { id: "s" + nextStepId++, title: newStep.title, type: newStep.type as Step["type"], duration: newStep.duration || "—" }]);
    setNewStep({ title: "", type: "course", duration: "" });
  };

  const removeStep = (id: string) => setSteps(prev => prev.filter(s => s.id !== id));

  const moveStep = (idx: number, dir: -1 | 1) => {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= steps.length) return;
    const arr = [...steps];
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    setSteps(arr);
  };

  const filtered = paths.filter(p => {
    if (filter !== "ALL" && p.status !== filter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const glassCard = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)" };
  const inputStyle = { borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, outline: "none", boxSizing: "border-box" as const, fontFamily: b };

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
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map(item => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: "#4A4A5A", background: "transparent", borderRadius: 12, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Lernpfadeditor", href: "/admin/lernpfade", active: true },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Kahoot-Editor", href: "/admin/kahoot" },
            { name: "Team", href: "/admin/team" },
          ].map(item => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: 12, boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Admin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>
              {view === "list" ? "Lernpfadeditor" : view === "create" ? "Neuer Lernpfad" : "Lernpfad bearbeiten"}
            </div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>
              {view === "list" ? "Lernpfade erstellen, bearbeiten und verwalten" : view === "create" ? "Neuen Lernpfad anlegen" : editPath?.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "list" ? (
              <button onClick={openCreate} style={{ padding: "8px 16px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neuer Lernpfad</button>
            ) : (
              <button onClick={() => { setView("list"); setEditPath(null); }} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.6)", color: "#4A4A5A", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", fontFamily: b }}>&#8592; Zurück</button>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* LIST */}
          {view === "list" && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
                <input placeholder="Lernpfad suchen..." value={search} onChange={e => setSearch(e.target.value)} style={{ padding: "8px 14px", width: 260, ...inputStyle }} />
                {["ALL", "DRAFT", "PUBLISHED"].map(s => (
                  <button key={s} onClick={() => setFilter(s)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", background: filter === s ? "linear-gradient(135deg, #022350, #0E3057)" : "rgba(255,255,255,0.6)", color: filter === s ? "white" : "#4A4A5A", fontFamily: b }}>
                    {s === "ALL" ? "Alle" : STATUS_LABELS[s].label}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Alle Lernpfade", value: paths.length, color: "#022350" },
                  { label: "Veröffentlicht", value: paths.filter(p => p.status === "PUBLISHED").length, color: "#0FA4A0" },
                  { label: "Entwürfe", value: paths.filter(p => p.status === "DRAFT").length, color: "#C8A24D" },
                ].map((s, i) => (
                  <div key={i} style={{ ...glassCard, padding: "20px 22px" }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 ? (
                <div style={{ ...glassCard, padding: "60px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🗺️</div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 4 }}>Keine Lernpfade gefunden</div>
                  <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 16 }}>Erstellen Sie Ihren ersten Lernpfad.</div>
                  <button onClick={openCreate} style={{ padding: "8px 20px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neuer Lernpfad</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {filtered.map(path => {
                    const st = STATUS_LABELS[path.status];
                    return (
                      <div key={path.id} style={{ ...glassCard, padding: "22px 26px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                              <div style={{ fontSize: 17, fontWeight: 500, color: "#022350", fontFamily: h }}>{path.title}</div>
                              <span style={{ padding: "2px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: st.bg, color: st.color }}>{st.label}</span>
                            </div>
                            <div style={{ fontSize: 13, color: "#4A4A5A", marginBottom: 12 }}>{path.description}</div>
                            <div style={{ display: "flex", gap: 20 }}>
                              <div style={{ fontSize: 12, color: "#9A9AAA" }}>Zielgruppe: <span style={{ color: "#4A4A5A", fontWeight: 500 }}>{path.targetGroup}</span></div>
                              <div style={{ fontSize: 12, color: "#9A9AAA" }}>Schritte: <span style={{ color: "#4A4A5A", fontWeight: 500 }}>{path.steps.length}</span></div>
                              <div style={{ fontSize: 12, color: "#9A9AAA" }}>Credits: <span style={{ color: "#C8A24D", fontWeight: 600 }}>{path.credits}</span></div>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button onClick={() => openEdit(path)} style={{ padding: "7px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#022350", fontFamily: b }}>Bearbeiten</button>
                            <button onClick={() => handleDelete(path.id)} style={{ padding: "7px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#e74c3c", fontFamily: b }}>Löschen</button>
                          </div>
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
              {/* Left: Details */}
              <div style={{ ...glassCard, padding: "28px 28px" }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 20 }}>Lernpfad-Details</div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Titel *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="z.B. VBV Grundausbildung" style={{ width: "100%", padding: "10px 14px", ...inputStyle }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Beschreibung</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Kurze Beschreibung des Lernpfads..." style={{ width: "100%", padding: "10px 14px", resize: "vertical", ...inputStyle }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Zielgruppe</label>
                    <select value={form.targetGroup} onChange={e => setForm({ ...form, targetGroup: e.target.value })} style={{ width: "100%", padding: "10px 14px", ...inputStyle }}>
                      <option value="">Auswählen...</option>
                      {TARGET_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Credits</label>
                    <input type="number" value={form.credits} onChange={e => setForm({ ...form, credits: e.target.value })} style={{ width: "100%", padding: "10px 14px", ...inputStyle }} />
                  </div>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ width: "100%", padding: "10px 14px", ...inputStyle }}>
                    <option value="DRAFT">Entwurf</option>
                    <option value="PUBLISHED">Veröffentlicht</option>
                  </select>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button onClick={() => { setView("list"); setEditPath(null); }} style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer", color: "#4A4A5A", fontFamily: b }}>Abbrechen</button>
                  <button onClick={savePath} disabled={!form.title.trim()} style={{ padding: "10px 24px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", background: !form.title.trim() ? "rgba(0,0,0,0.06)" : "linear-gradient(135deg, #022350, #0E3057)", color: !form.title.trim() ? "#9A9AAA" : "white", fontFamily: b }}>
                    {view === "create" ? "Lernpfad erstellen" : "Änderungen speichern"}
                  </button>
                </div>
              </div>

              {/* Right: Steps */}
              <div style={{ ...glassCard, padding: "28px 28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Schritte</div>
                  <span style={{ fontSize: 12, color: "#9A9AAA" }}>{steps.length} Schritte</span>
                </div>

                <div style={{ flex: 1, overflowY: "auto", marginBottom: 20 }}>
                  {steps.length === 0 ? (
                    <div style={{ padding: "32px 0", textAlign: "center", color: "#9A9AAA", fontSize: 13 }}>Noch keine Schritte vorhanden. Nutze den KI-Werkzeugkasten um Schritte zu generieren!</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {steps.map((step, idx) => {
                        const st = STEP_TYPES[step.type];
                        return (
                          <div key={step.id} style={{ padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.04)", background: "rgba(0,0,0,0.02)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <span style={{ width: 28, height: 28, borderRadius: 12, background: `linear-gradient(135deg, ${st.color}, ${st.color}cc)`, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{st.icon}</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{step.title}</div>
                                <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{st.label} &middot; {step.duration}</div>
                              </div>
                              <div style={{ display: "flex", gap: 4 }}>
                                <button onClick={() => moveStep(idx, -1)} disabled={idx === 0} style={{ padding: "4px 8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 11, cursor: idx === 0 ? "default" : "pointer", color: idx === 0 ? "#ccc" : "#4A4A5A", fontFamily: b }}>&#9650;</button>
                                <button onClick={() => moveStep(idx, 1)} disabled={idx === steps.length - 1} style={{ padding: "4px 8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 11, cursor: idx === steps.length - 1 ? "default" : "pointer", color: idx === steps.length - 1 ? "#ccc" : "#4A4A5A", fontFamily: b }}>&#9660;</button>
                                <button onClick={() => removeStep(step.id)} style={{ padding: "4px 8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer", color: "#e74c3c", fontFamily: b }}>&#215;</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Add step */}
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.04)", paddingTop: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#022350", marginBottom: 10 }}>Neuen Schritt hinzufügen</div>
                  <input value={newStep.title} onChange={e => setNewStep({ ...newStep, title: e.target.value })} placeholder="Schritt-Titel..." style={{ width: "100%", padding: "10px 14px", marginBottom: 8, ...inputStyle }} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 10 }}>
                    <select value={newStep.type} onChange={e => setNewStep({ ...newStep, type: e.target.value })} style={{ padding: "8px 14px", ...inputStyle }}>
                      <option value="course">Kurs</option>
                      <option value="exam">Prüfung</option>
                      <option value="activity">Aktivität</option>
                    </select>
                    <input value={newStep.duration} onChange={e => setNewStep({ ...newStep, duration: e.target.value })} placeholder="Dauer z.B. 2 Std" style={{ padding: "8px 14px", ...inputStyle }} />
                  </div>
                  <button onClick={addStep} disabled={!newStep.title.trim()} style={{ padding: "8px 16px", borderRadius: 12, border: "none", fontSize: 12.5, fontWeight: 500, cursor: "pointer", background: newStep.title.trim() ? "linear-gradient(135deg, #0FA4A0, #0d8e8b)" : "rgba(0,0,0,0.06)", color: newStep.title.trim() ? "white" : "#9A9AAA", width: "100%", fontFamily: b }}>+ Schritt hinzufügen</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <KIToolkit context="lernpfad" topic={form.title || "Lernpfad"} />
    </div>
  );
}
