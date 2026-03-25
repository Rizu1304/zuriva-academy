"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

interface ModuleData { id: string; title: string; lessons: LessonData[]; }
interface LessonData { id: string; title: string; type: "VIDEO" | "TEXT" | "QUIZ"; duration: string; }
interface CourseData { id: string; title: string; category: string; credits: number; duration: string; description: string; published: boolean; modules: ModuleData[]; }

const initialCourses: CourseData[] = [
  { id: "1", title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", credits: 8, duration: "2h 40min", description: "Grundlagen der Sachversicherung im Schweizer Markt.", published: true, modules: [
    { id: "m1", title: "Einfuehrung in die Sachversicherung", lessons: [
      { id: "l1", title: "Was ist Sachversicherung?", type: "VIDEO", duration: "12 min" },
      { id: "l2", title: "Rechtliche Grundlagen in der Schweiz", type: "TEXT", duration: "8 min" },
      { id: "l3", title: "Quiz: Grundbegriffe", type: "QUIZ", duration: "5 min" },
    ]},
    { id: "m2", title: "Produktarten und Deckungen", lessons: [
      { id: "l4", title: "Gebaeudeversicherung", type: "VIDEO", duration: "15 min" },
      { id: "l5", title: "Hausratversicherung", type: "VIDEO", duration: "12 min" },
      { id: "l6", title: "Quiz: Produktkenntnisse", type: "QUIZ", duration: "8 min" },
    ]},
  ]},
  { id: "2", title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", credits: 12, duration: "4h 15min", description: "Einfuehrung in die Lebensversicherungslandschaft.", published: true, modules: [
    { id: "m3", title: "Grundlagen Lebensversicherung", lessons: [
      { id: "l7", title: "Das 3-Saeulen-System", type: "VIDEO", duration: "15 min" },
      { id: "l8", title: "Arten von Lebensversicherungen", type: "TEXT", duration: "10 min" },
      { id: "l9", title: "Quiz: Grundlagen", type: "QUIZ", duration: "5 min" },
    ]},
  ]},
  { id: "3", title: "FIDLEG und VAG 2026", category: "Compliance", credits: 6, duration: "1h 30min", description: "Regulatorische Anforderungen.", published: false, modules: [] },
];

const categories = ["Nicht-Leben", "Leben", "Gen. Faehigkeiten", "Krankenzusatz", "Compliance"];
const catColors: Record<string, string> = { "Nicht-Leben": "#022350", "Leben": "#0FA4A0", "Gen. Faehigkeiten": "#C8A24D", "Krankenzusatz": "#1B6FC2", "Compliance": "#C0392B" };

type View = "list" | "edit";

export default function KursEditor() {
  const [courses, setCourses] = useState<CourseData[]>(initialCourses);
  const [view, setView] = useState<View>("list");
  const [editCourse, setEditCourse] = useState<CourseData | null>(null);

  const openEdit = (course: CourseData) => { setEditCourse({ ...course, modules: course.modules.map(m => ({ ...m, lessons: [...m.lessons] })) }); setView("edit"); };

  const openNew = () => {
    setEditCourse({ id: `new-${Date.now()}`, title: "", category: "Nicht-Leben", credits: 0, duration: "", description: "", published: false, modules: [] });
    setView("edit");
  };

  const saveCourse = () => {
    if (!editCourse) return;
    setCourses(prev => {
      const exists = prev.find(c => c.id === editCourse.id);
      if (exists) return prev.map(c => c.id === editCourse.id ? editCourse : c);
      return [...prev, editCourse];
    });
    setView("list");
    setEditCourse(null);
  };

  const deleteCourse = (id: string) => { setCourses(prev => prev.filter(c => c.id !== id)); };

  const addModule = () => {
    if (!editCourse) return;
    setEditCourse({ ...editCourse, modules: [...editCourse.modules, { id: `m-${Date.now()}`, title: "Neues Modul", lessons: [] }] });
  };

  const addLesson = (moduleId: string) => {
    if (!editCourse) return;
    setEditCourse({
      ...editCourse,
      modules: editCourse.modules.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, { id: `l-${Date.now()}`, title: "Neue Lektion", type: "TEXT", duration: "10 min" }] } : m),
    });
  };

  const removeModule = (moduleId: string) => {
    if (!editCourse) return;
    setEditCourse({ ...editCourse, modules: editCourse.modules.filter(m => m.id !== moduleId) });
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    if (!editCourse) return;
    setEditCourse({
      ...editCourse,
      modules: editCourse.modules.map(m => m.id === moduleId ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) } : m),
    });
  };

  /* ===== LIST VIEW ===== */
  if (view === "list") {
    return (
      <DashboardLayout title="Kurseditor" subtitle={`${courses.length} Kurse verwalten`} actions={
        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/admin" className="z-btn z-btn-ghost" style={{ textDecoration: "none", fontSize: 12.5 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            Admin
          </Link>
          <button onClick={openNew} className="z-btn z-btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Neuer Kurs
          </button>
        </div>
      }>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {courses.map((course, i) => {
            const color = catColors[course.category] || "#022350";
            const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
            return (
              <div key={course.id} className={`z-card animate-fade-in-up stagger-${Math.min(i + 1, 8)}`} style={{ padding: "22px 26px", display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: `${color}0D`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#022350" }}>{course.title}</div>
                    <span className="z-badge" style={{ background: course.published ? "rgba(15,164,160,0.08)" : "rgba(200,162,77,0.08)", color: course.published ? "#0FA4A0" : "#C8A24D" }}>
                      {course.published ? "Publiziert" : "Entwurf"}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#9A9AAA" }}>
                    <span>{course.category}</span>
                    <span>{course.modules.length} Module</span>
                    <span>{totalLessons} Lektionen</span>
                    <span style={{ color: "#C8A24D", fontWeight: 600 }}>{course.credits} Credits</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => openEdit(course)} className="z-btn z-btn-ghost" style={{ padding: "7px 14px", fontSize: 12 }}>Bearbeiten</button>
                  <button onClick={() => deleteCourse(course.id)} style={{ width: 34, height: 34, borderRadius: 10, background: "white", border: "1px solid #E8E4DE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardLayout>
    );
  }

  /* ===== EDIT VIEW ===== */
  if (!editCourse) return null;

  return (
    <DashboardLayout title={editCourse.title || "Neuer Kurs"} subtitle="Kurs bearbeiten" actions={
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={() => { setView("list"); setEditCourse(null); }} className="z-btn z-btn-ghost" style={{ fontSize: 12.5 }}>Abbrechen</button>
        <button onClick={saveCourse} className="z-btn z-btn-primary">Speichern</button>
      </div>
    }>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
        {/* Left: Module/Lesson editor */}
        <div>
          {/* Course basics */}
          <div className="z-card-static" style={{ padding: "26px 28px", marginBottom: 20 }}>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Kursdetails</div>
            <div className="z-gold-line" style={{ marginBottom: 18 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Kurstitel</label>
                <input value={editCourse.title} onChange={e => setEditCourse({ ...editCourse, title: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Kategorie</label>
                <select value={editCourse.category} onChange={e => setEditCourse({ ...editCourse, category: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "white" }}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Credits</label>
                <input type="number" value={editCourse.credits} onChange={e => setEditCourse({ ...editCourse, credits: parseInt(e.target.value) || 0 })} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Dauer</label>
                <input value={editCourse.duration} onChange={e => setEditCourse({ ...editCourse, duration: e.target.value })} placeholder="z.B. 2h 30min" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Beschreibung</label>
              <textarea value={editCourse.description} onChange={e => setEditCourse({ ...editCourse, description: e.target.value })} rows={3} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical" }} />
            </div>
          </div>

          {/* Modules & Lessons */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350" }}>Module & Lektionen</div>
            <button onClick={addModule} className="z-btn z-btn-teal" style={{ fontSize: 12, padding: "7px 16px" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Modul
            </button>
          </div>

          {editCourse.modules.map((mod, mi) => (
            <div key={mod.id} className="z-card-static" style={{ padding: "20px 22px", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.08em" }}>MODUL {mi + 1}</span>
                <input value={mod.title} onChange={e => {
                  const mods = [...editCourse.modules];
                  mods[mi] = { ...mods[mi], title: e.target.value };
                  setEditCourse({ ...editCourse, modules: mods });
                }} style={{ flex: 1, padding: "7px 12px", borderRadius: 8, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", fontWeight: 600 }} />
                <button onClick={() => removeModule(mod.id)} style={{ width: 30, height: 30, borderRadius: 8, background: "white", border: "1px solid #E8E4DE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>

              {mod.lessons.map((lesson, li) => (
                <div key={lesson.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderTop: li > 0 ? "1px solid #F0ECE6" : "none" }}>
                  <select value={lesson.type} onChange={e => {
                    const mods = [...editCourse.modules];
                    mods[mi] = { ...mods[mi], lessons: mods[mi].lessons.map((l, i) => i === li ? { ...l, type: e.target.value as LessonData["type"] } : l) };
                    setEditCourse({ ...editCourse, modules: mods });
                  }} style={{ width: 80, padding: "6px 8px", borderRadius: 8, border: "1px solid #ECE8E1", fontSize: 11.5, fontFamily: "inherit", background: "white" }}>
                    <option value="VIDEO">Video</option>
                    <option value="TEXT">Text</option>
                    <option value="QUIZ">Quiz</option>
                  </select>
                  <input value={lesson.title} onChange={e => {
                    const mods = [...editCourse.modules];
                    mods[mi] = { ...mods[mi], lessons: mods[mi].lessons.map((l, i) => i === li ? { ...l, title: e.target.value } : l) };
                    setEditCourse({ ...editCourse, modules: mods });
                  }} style={{ flex: 1, padding: "6px 10px", borderRadius: 8, border: "1px solid #ECE8E1", fontSize: 12.5, fontFamily: "inherit", outline: "none" }} />
                  <input value={lesson.duration} onChange={e => {
                    const mods = [...editCourse.modules];
                    mods[mi] = { ...mods[mi], lessons: mods[mi].lessons.map((l, i) => i === li ? { ...l, duration: e.target.value } : l) };
                    setEditCourse({ ...editCourse, modules: mods });
                  }} placeholder="Dauer" style={{ width: 70, padding: "6px 8px", borderRadius: 8, border: "1px solid #ECE8E1", fontSize: 11.5, fontFamily: "inherit", outline: "none" }} />
                  <button onClick={() => removeLesson(mod.id, lesson.id)} style={{ width: 26, height: 26, borderRadius: 6, background: "transparent", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A9AAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                  </button>
                </div>
              ))}

              <button onClick={() => addLesson(mod.id)} style={{ marginTop: 10, fontSize: 12, color: "#0FA4A0", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                Lektion hinzufuegen
              </button>
            </div>
          ))}

          {editCourse.modules.length === 0 && (
            <div className="z-card-static" style={{ padding: "40px", textAlign: "center" }}>
              <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 14 }}>Noch keine Module. Fuege ein Modul hinzu um Lektionen zu erstellen.</div>
              <button onClick={addModule} className="z-btn z-btn-teal">Erstes Modul erstellen</button>
            </div>
          )}
        </div>

        {/* Right: Preview */}
        <div className="z-card-static" style={{ padding: "24px 22px", alignSelf: "start", position: "sticky", top: 32 }}>
          <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Vorschau</div>
          <div className="z-gold-line" style={{ marginBottom: 16 }} />

          <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 6 }}>{editCourse.title || "Kurstitel"}</div>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <span className="z-badge" style={{ background: `${catColors[editCourse.category] || "#022350"}0D`, color: catColors[editCourse.category] || "#022350" }}>{editCourse.category}</span>
            <span style={{ fontSize: 11, color: "#C8A24D", fontWeight: 600 }}>{editCourse.credits} Credits</span>
          </div>
          <div style={{ fontSize: 12.5, color: "#9A9AAA", lineHeight: 1.6, marginBottom: 16 }}>{editCourse.description || "Keine Beschreibung"}</div>

          <div style={{ borderTop: "1px solid #F0ECE6", paddingTop: 14 }}>
            {editCourse.modules.map((m, mi) => (
              <div key={m.id} style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.08em" }}>MODUL {mi + 1}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#022350", marginBottom: 4 }}>{m.title}</div>
                {m.lessons.map(l => (
                  <div key={l.id} style={{ fontSize: 11.5, color: "#9A9AAA", paddingLeft: 12, marginBottom: 2 }}>
                    {l.type === "VIDEO" ? "▶" : l.type === "QUIZ" ? "?" : "◼"} {l.title} · {l.duration}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #F0ECE6", paddingTop: 14, marginTop: 10, display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9A9AAA" }}>
            <span>{editCourse.modules.length} Module</span>
            <span>{editCourse.modules.reduce((s, m) => s + m.lessons.length, 0)} Lektionen</span>
          </div>

          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <label style={{ fontSize: 12, color: "#4A4A5A" }}>Status:</label>
            <button onClick={() => setEditCourse({ ...editCourse, published: !editCourse.published })} style={{ padding: "5px 14px", borderRadius: 20, fontSize: 11.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", border: "1px solid", borderColor: editCourse.published ? "#0FA4A0" : "#ECE8E1", background: editCourse.published ? "rgba(15,164,160,0.08)" : "white", color: editCourse.published ? "#0FA4A0" : "#9A9AAA" }}>
              {editCourse.published ? "Publiziert" : "Entwurf"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
