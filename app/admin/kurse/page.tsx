"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getCourses,
  getCategories,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse as deleteCourseAction,
  createCategory as createCategoryAction,
  addModule as addModuleAction,
  deleteModule as deleteModuleAction,
} from "./actions";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type Category = { id: string; name: string; color: string; _count: { courses: number } };
type Course = {
  id: string;
  title: string;
  description: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  categoryId: string | null;
  duration: number | null;
  credits: number;
  createdAt: Date;
  category: Category | null;
  _count: { modules: number; enrollments: number };
};
type Module = { id: string; title: string; content: string | null; sortOrder: number; lessons: { id: string; title: string }[] };
type CourseDetail = Course & { modules: Module[] };

const STATUS_LABELS: Record<string, { label: string; bg: string; color: string }> = {
  DRAFT: { label: "Entwurf", bg: "#FFF3E0", color: "#E65100" },
  PUBLISHED: { label: "Veröffentlicht", bg: "#E8F5E9", color: "#2E7D32" },
  ARCHIVED: { label: "Archiviert", bg: "#ECEFF1", color: "#546E7A" },
};

export default function KursEditor() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editCourse, setEditCourse] = useState<CourseDetail | null>(null);
  const [filter, setFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ title: "", description: "", status: "DRAFT", categoryId: "", duration: "", credits: "0" });
  const [saving, setSaving] = useState(false);
  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [newModuleTitle, setNewModuleTitle] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [c, cats] = await Promise.all([getCourses(), getCategories()]);
      setCourses(c as Course[]);
      setCategories(cats as Category[]);
    } catch (e) {
      console.error("Fehler beim Laden:", e);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openCreate = () => {
    setForm({ title: "", description: "", status: "DRAFT", categoryId: "", duration: "", credits: "0" });
    setView("create");
  };

  const openEdit = async (courseId: string) => {
    const data = await getCourseById(courseId);
    if (data) {
      setEditCourse(data as CourseDetail);
      setForm({
        title: data.title,
        description: data.description || "",
        status: data.status,
        categoryId: data.categoryId || "",
        duration: data.duration?.toString() || "",
        credits: data.credits.toString(),
      });
      setView("edit");
    }
  };

  const saveCourse = async () => {
    setSaving(true);
    try {
      const payload = { ...form, categoryId: form.categoryId || null };
      if (view === "create") {
        await createCourse(payload);
      } else if (editCourse) {
        await updateCourse(editCourse.id, payload);
      }
      await fetchData();
      setView("list");
      setEditCourse(null);
    } catch (e) {
      console.error("Fehler beim Speichern:", e);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Kurs wirklich löschen? Alle Module und Lektionen werden ebenfalls gelöscht.")) return;
    await deleteCourseAction(id);
    await fetchData();
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) return;
    const cat = await createCategoryAction(newCatName.trim());
    setCategories((prev) => [...prev, { ...cat, _count: { courses: 0 } }]);
    setForm((prev) => ({ ...prev, categoryId: cat.id }));
    setNewCatName("");
    setShowNewCat(false);
  };

  const handleAddModule = async () => {
    if (!newModuleTitle.trim() || !editCourse) return;
    const mod = await addModuleAction(editCourse.id, newModuleTitle.trim());
    setEditCourse((prev) =>
      prev ? { ...prev, modules: [...prev.modules, { ...mod, lessons: mod.lessons || [] }] } : null
    );
    setNewModuleTitle("");
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!editCourse) return;
    await deleteModuleAction(moduleId);
    setEditCourse((prev) =>
      prev ? { ...prev, modules: prev.modules.filter((m) => m.id !== moduleId) } : null
    );
  };

  const filtered = courses.filter((c) => {
    if (filter !== "ALL" && c.status !== filter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
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
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
        <div style={{ padding: "0 12px" }}>
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade" },
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: "#4A4A5A", background: "transparent", borderRadius: 12, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>ADMIN</div>
        <div style={{ padding: "0 12px" }}>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse", active: true },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: 12, boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Admin</div></div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>
              {view === "list" ? "Kurseditor" : view === "create" ? "Neuer Kurs" : "Kurs bearbeiten"}
            </div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>
              {view === "list" ? "Kurse erstellen, bearbeiten und verwalten" : view === "create" ? "Neuen Kurs anlegen" : editCourse?.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "list" ? (
              <button onClick={openCreate} style={{ padding: "8px 16px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neuer Kurs</button>
            ) : (
              <button onClick={() => { setView("list"); setEditCourse(null); }} style={{ padding: "8px 16px", background: "rgba(255,255,255,0.6)", color: "#4A4A5A", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", fontFamily: b }}>← Zurück</button>
            )}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* LIST */}
          {view === "list" && (
            <>
              <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
                <input placeholder="Kurs suchen…" value={search} onChange={(e) => setSearch(e.target.value)} style={{ padding: "8px 14px", width: 260, ...inputStyle }} />
                {["ALL", "DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => (
                  <button key={s} onClick={() => setFilter(s)} style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer", background: filter === s ? "linear-gradient(135deg, #022350, #0E3057)" : "rgba(255,255,255,0.6)", color: filter === s ? "white" : "#4A4A5A", fontFamily: b }}>
                    {s === "ALL" ? "Alle" : STATUS_LABELS[s].label}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Alle Kurse", value: courses.length, color: "#022350" },
                  { label: "Veröffentlicht", value: courses.filter((c) => c.status === "PUBLISHED").length, color: "#0FA4A0" },
                  { label: "Entwürfe", value: courses.filter((c) => c.status === "DRAFT").length, color: "#C8A24D" },
                  { label: "Archiviert", value: courses.filter((c) => c.status === "ARCHIVED").length, color: "#9A9AAA" },
                ].map((s, i) => (
                  <div key={i} style={{ ...glassCard, padding: "20px 22px" }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: 60, color: "#9A9AAA" }}>Laden…</div>
              ) : filtered.length === 0 ? (
                <div style={{ ...glassCard, padding: "60px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 4 }}>Keine Kurse gefunden</div>
                  <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 16 }}>Erstellen Sie Ihren ersten Kurs.</div>
                  <button onClick={openCreate} style={{ padding: "8px 20px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neuer Kurs</button>
                </div>
              ) : (
                <div style={{ ...glassCard, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "rgba(0,0,0,0.02)" }}>
                        {["Kurs", "Kategorie", "Status", "Module", "Teilnehmer", "Credits", "Aktionen"].map((col) => (
                          <th key={col} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9A9AAA", letterSpacing: "0.05em", textTransform: "uppercase" }}>{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((course) => {
                        const st = STATUS_LABELS[course.status];
                        return (
                          <tr key={course.id} style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                            <td style={{ padding: "14px 24px" }}>
                              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{course.title}</div>
                              {course.description && <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 2, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.description}</div>}
                            </td>
                            <td style={{ padding: "14px 24px" }}>
                              {course.category ? (
                                <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: course.category.color + "18", color: course.category.color }}>{course.category.name}</span>
                              ) : <span style={{ fontSize: 12, color: "#9A9AAA" }}>—</span>}
                            </td>
                            <td style={{ padding: "14px 24px" }}>
                              <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: st.bg, color: st.color }}>{st.label}</span>
                            </td>
                            <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{course._count.modules}</td>
                            <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{course._count.enrollments}</td>
                            <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{course.credits}</td>
                            <td style={{ padding: "14px 24px" }}>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={() => openEdit(course.id)} style={{ padding: "5px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#022350", fontFamily: b }}>Bearbeiten</button>
                                <button onClick={() => handleDelete(course.id)} style={{ padding: "5px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#e74c3c", fontFamily: b }}>Löschen</button>
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

          {/* CREATE / EDIT */}
          {(view === "create" || view === "edit") && (
            <div style={{ display: "grid", gridTemplateColumns: view === "edit" ? "1fr 1fr" : "1fr", gap: 24 }}>
              <div style={{ ...glassCard, padding: "28px 28px" }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 20 }}>Kursdetails</div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Kurstitel *</label>
                  <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="z.B. Grundlagen der Lebensversicherung" style={{ width: "100%", padding: "10px 14px", ...inputStyle }} />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Beschreibung</label>
                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Kurze Beschreibung des Kursinhalts…" style={{ width: "100%", padding: "10px 14px", resize: "vertical", ...inputStyle }} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Status</label>
                    <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={{ width: "100%", padding: "10px 14px", ...inputStyle }}>
                      <option value="DRAFT">Entwurf</option>
                      <option value="PUBLISHED">Veröffentlicht</option>
                      <option value="ARCHIVED">Archiviert</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Kategorie</label>
                    {!showNewCat ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} style={{ flex: 1, padding: "10px 14px", ...inputStyle }}>
                          <option value="">Keine Kategorie</option>
                          {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                        </select>
                        <button onClick={() => setShowNewCat(true)} style={{ padding: "0 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 16, cursor: "pointer", color: "#0FA4A0" }} title="Neue Kategorie">+</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 6 }}>
                        <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} placeholder="Neue Kategorie…" onKeyDown={(e) => e.key === "Enter" && handleCreateCategory()} style={{ flex: 1, padding: "10px 14px", ...inputStyle }} />
                        <button onClick={handleCreateCategory} style={{ padding: "0 12px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #0FA4A0, #0d8e8b)", color: "white", fontSize: 12, cursor: "pointer", fontFamily: b }}>OK</button>
                        <button onClick={() => { setShowNewCat(false); setNewCatName(""); }} style={{ padding: "0 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#9A9AAA", fontFamily: b }}>×</button>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Dauer (Minuten)</label>
                    <input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="z.B. 120" style={{ width: "100%", padding: "10px 14px", ...inputStyle }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Credits</label>
                    <input type="number" value={form.credits} onChange={(e) => setForm({ ...form, credits: e.target.value })} style={{ width: "100%", padding: "10px 14px", ...inputStyle }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button onClick={() => { setView("list"); setEditCourse(null); }} style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer", color: "#4A4A5A", fontFamily: b }}>Abbrechen</button>
                  <button onClick={saveCourse} disabled={saving || !form.title.trim()} style={{ padding: "10px 24px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer", background: !form.title.trim() ? "rgba(0,0,0,0.06)" : "linear-gradient(135deg, #022350, #0E3057)", color: !form.title.trim() ? "#9A9AAA" : "white", opacity: saving ? 0.6 : 1, fontFamily: b }}>
                    {saving ? "Speichern…" : view === "create" ? "Kurs erstellen" : "Änderungen speichern"}
                  </button>
                </div>
              </div>

              {/* Modules */}
              {view === "edit" && editCourse && (
                <div style={{ ...glassCard, padding: "28px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Module</div>
                    <span style={{ fontSize: 12, color: "#9A9AAA" }}>{editCourse.modules.length} Module</span>
                  </div>

                  {editCourse.modules.length === 0 ? (
                    <div style={{ padding: "32px 0", textAlign: "center", color: "#9A9AAA", fontSize: 13 }}>Noch keine Module vorhanden.</div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                      {editCourse.modules.map((mod, idx) => (
                        <div key={mod.id} style={{ padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.04)", background: "rgba(0,0,0,0.02)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 24, height: 24, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{idx + 1}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{mod.title}</div>
                              <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{mod.lessons.length} Lektionen</div>
                            </div>
                            <button onClick={() => handleDeleteModule(mod.id)} style={{ padding: "4px 10px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 11, cursor: "pointer", color: "#e74c3c", fontFamily: b }}>×</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 8 }}>
                    <input value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} placeholder="Neues Modul hinzufügen…" onKeyDown={(e) => e.key === "Enter" && handleAddModule()} style={{ flex: 1, padding: "10px 14px", ...inputStyle }} />
                    <button onClick={handleAddModule} disabled={!newModuleTitle.trim()} style={{ padding: "10px 16px", borderRadius: 12, border: "none", fontSize: 12.5, fontWeight: 500, cursor: "pointer", background: newModuleTitle.trim() ? "linear-gradient(135deg, #0FA4A0, #0d8e8b)" : "rgba(0,0,0,0.06)", color: newModuleTitle.trim() ? "white" : "#9A9AAA", fontFamily: b }}>+ Modul</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
