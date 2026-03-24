"use client";

import { useEffect, useState, useCallback } from "react";

type Category = { id: string; name: string; slug: string; color: string; icon: string; _count?: { courses: number } };
type Module = { id: string; title: string; description: string | null; type: string; duration: number; sortOrder: number; content: string | null; videoUrl: string | null };
type Course = {
  id: string; title: string; description: string | null; slug: string; status: string;
  coverImage: string | null; duration: number; credits: number; categoryId: string | null;
  authorId: string; createdAt: string; updatedAt: string;
  category: Category | null; modules: Module[]; _count?: { enrollments: number };
};

const TEMP_AUTHOR_ID = "admin-placeholder";
const statusLabels: Record<string, string> = { DRAFT: "Entwurf", PUBLISHED: "Veröffentlicht", ARCHIVED: "Archiviert" };
const statusColors: Record<string, string> = { DRAFT: "#C8A24D", PUBLISHED: "#0FA4A0", ARCHIVED: "#9A9AAA" };
const moduleTypeLabels: Record<string, string> = { VIDEO: "Video", TEXT: "Text", QUIZ: "Quiz", DOCUMENT: "Dokument" };

export default function Kurseditor() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Editor state
  const [editing, setEditing] = useState<Course | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", status: "DRAFT", duration: 0, credits: 0, categoryId: "" });
  const [saving, setSaving] = useState(false);

  // Module editor
  const [moduleForm, setModuleForm] = useState({ title: "", description: "", type: "TEXT", duration: 0, content: "", videoUrl: "" });
  const [showModuleForm, setShowModuleForm] = useState(false);

  // Category creator
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filterStatus) params.set("status", filterStatus);
    if (filterCategory) params.set("categoryId", filterCategory);
    if (search) params.set("search", search);

    const [coursesRes, catsRes] = await Promise.all([
      fetch(`/api/courses?${params}`),
      fetch("/api/categories"),
    ]);
    setCourses(await coursesRes.json());
    setCategories(await catsRes.json());
    setLoading(false);
  }, [filterStatus, filterCategory, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => {
    setEditing(null);
    setFormData({ title: "", description: "", status: "DRAFT", duration: 0, credits: 0, categoryId: "" });
    setShowForm(true);
  };

  const openEdit = (course: Course) => {
    setEditing(course);
    setFormData({
      title: course.title,
      description: course.description || "",
      status: course.status,
      duration: course.duration,
      credits: course.credits,
      categoryId: course.categoryId || "",
    });
    setShowForm(true);
  };

  const saveCourse = async () => {
    setSaving(true);
    if (editing) {
      await fetch(`/api/courses/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, authorId: TEMP_AUTHOR_ID }),
      });
    }
    setSaving(false);
    setShowForm(false);
    fetchData();
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Kurs wirklich löschen?")) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    fetchData();
  };

  const addModule = async () => {
    if (!editing) return;
    await fetch("/api/modules", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...moduleForm, courseId: editing.id }),
    });
    setModuleForm({ title: "", description: "", type: "TEXT", duration: 0, content: "", videoUrl: "" });
    setShowModuleForm(false);
    // Refresh course detail
    const res = await fetch(`/api/courses/${editing.id}`);
    const updated = await res.json();
    setEditing(updated);
    fetchData();
  };

  const deleteModule = async (moduleId: string) => {
    await fetch(`/api/modules?id=${moduleId}`, { method: "DELETE" });
    if (editing) {
      const res = await fetch(`/api/courses/${editing.id}`);
      const updated = await res.json();
      setEditing(updated);
    }
    fetchData();
  };

  const createCategory = async () => {
    if (!newCategoryName.trim()) return;
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName }),
    });
    setNewCategoryName("");
    setShowCategoryForm(false);
    const catsRes = await fetch("/api/categories");
    setCategories(await catsRes.json());
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
      {/* Sidebar — gleiche Struktur wie Admin Übersicht */}
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350" }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Kurse", href: "/courses" },
          { name: "Lernpfade", href: "/lernpfade" },
          { name: "Pruefungen", href: "/pruefungen" },
          { name: "Zertifikate", href: "/zertifikate" },
          { name: "Forum", href: "/forum" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2.5px solid transparent", fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A9AAA", padding: "18px 22px 6px" }}>Admin</div>
        {[
          { name: "Übersicht", href: "/admin" },
          { name: "Kurseditor", href: "/admin/kurse", active: true },
          { name: "Prüfungseditor", href: "/admin/pruefungen" },
          { name: "Team", href: "/admin/team" },
          { name: "Analytics", href: "/admin/analytics" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Admin</div></div>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#022350" }}>Kurseditor</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Kurse erstellen, bearbeiten und verwalten</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => setShowCategoryForm(true)} style={{ padding: "8px 16px", background: "white", color: "#022350", border: "1px solid #dce0e6", borderRadius: 9, fontSize: 12.5, fontWeight: 500, cursor: "pointer" }}>+ Kategorie</button>
            <button onClick={openNew} style={{ padding: "8px 16px", background: "#022350", color: "white", border: "none", borderRadius: 9, fontSize: 12.5, fontWeight: 500, cursor: "pointer" }}>+ Neuer Kurs</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          {/* Filters */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
            <input
              placeholder="Kurs suchen…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, outline: "none", background: "white" }}
            />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, background: "white", color: "#4A4A5A", cursor: "pointer" }}>
              <option value="">Alle Status</option>
              <option value="DRAFT">Entwurf</option>
              <option value="PUBLISHED">Veröffentlicht</option>
              <option value="ARCHIVED">Archiviert</option>
            </select>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, background: "white", color: "#4A4A5A", cursor: "pointer" }}>
              <option value="">Alle Kategorien</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Alle Kurse", value: courses.length, color: "#022350" },
              { label: "Veröffentlicht", value: courses.filter(c => c.status === "PUBLISHED").length, color: "#0FA4A0" },
              { label: "Entwürfe", value: courses.filter(c => c.status === "DRAFT").length, color: "#C8A24D" },
              { label: "Kategorien", value: categories.length, color: "#6366f1" },
            ].map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "20px 22px" }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Course list */}
          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: "#9A9AAA", fontSize: 14 }}>Kurse werden geladen…</div>
          ) : courses.length === 0 ? (
            <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "60px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 6 }}>Noch keine Kurse</div>
              <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 16 }}>Erstelle deinen ersten Kurs, um loszulegen.</div>
              <button onClick={openNew} style={{ padding: "10px 20px", background: "#022350", color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>+ Neuer Kurs</button>
            </div>
          ) : (
            <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fb" }}>
                    {["Kurs", "Kategorie", "Status", "Module", "Dauer", "Credits", "Teilnehmer", "Aktionen"].map(h => (
                      <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9A9AAA", letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.id} style={{ borderTop: "0.5px solid #dce0e6" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{course.title}</div>
                        {course.description && <div style={{ fontSize: 11.5, color: "#9A9AAA", marginTop: 2, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.description}</div>}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        {course.category ? (
                          <span style={{ fontSize: 11.5, padding: "3px 10px", borderRadius: 20, background: course.category.color + "18", color: course.category.color, fontWeight: 500 }}>
                            {course.category.icon} {course.category.name}
                          </span>
                        ) : (
                          <span style={{ fontSize: 11.5, color: "#9A9AAA" }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ fontSize: 11.5, padding: "3px 10px", borderRadius: 20, background: statusColors[course.status] + "18", color: statusColors[course.status], fontWeight: 500 }}>
                          {statusLabels[course.status]}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#4A4A5A" }}>{course.modules.length}</td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#4A4A5A" }}>{course.duration} Min</td>
                      <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{course.credits}</td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "#4A4A5A" }}>{course._count?.enrollments ?? 0}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => openEdit(course)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 7, border: "1px solid #dce0e6", background: "white", color: "#022350", cursor: "pointer", fontWeight: 500 }}>Bearbeiten</button>
                          <button onClick={() => deleteCourse(course.id)} style={{ padding: "5px 12px", fontSize: 12, borderRadius: 7, border: "1px solid #e74c3c33", background: "#fef2f2", color: "#e74c3c", cursor: "pointer", fontWeight: 500 }}>Löschen</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Course form modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowForm(false)}>
          <div style={{ background: "white", borderRadius: 18, width: 600, maxHeight: "90vh", overflow: "auto", padding: 0 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: "24px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: "#022350" }}>{editing ? "Kurs bearbeiten" : "Neuer Kurs"}</div>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 20, color: "#9A9AAA", cursor: "pointer" }}>×</button>
            </div>

            <div style={{ padding: "20px 28px 28px", display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", marginBottom: 4, display: "block" }}>Kurstitel *</label>
                <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="z.B. Versicherungsrecht Grundlagen" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>

              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", marginBottom: 4, display: "block" }}>Beschreibung</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} placeholder="Kursbeschreibung…" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", marginBottom: 4, display: "block" }}>Kategorie</label>
                  <select value={formData.categoryId} onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, background: "white", cursor: "pointer" }}>
                    <option value="">Keine Kategorie</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", marginBottom: 4, display: "block" }}>Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, background: "white", cursor: "pointer" }}>
                    <option value="DRAFT">Entwurf</option>
                    <option value="PUBLISHED">Veröffentlicht</option>
                    <option value="ARCHIVED">Archiviert</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", marginBottom: 4, display: "block" }}>Dauer (Minuten)</label>
                  <input type="number" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", marginBottom: 4, display: "block" }}>Credits</label>
                  <input type="number" value={formData.credits} onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>

              {/* Module section — only when editing */}
              {editing && (
                <div style={{ borderTop: "1px solid #eef0f3", paddingTop: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>Module ({editing.modules.length})</div>
                    <button onClick={() => setShowModuleForm(true)} style={{ padding: "5px 14px", fontSize: 12, borderRadius: 7, border: "1px solid #dce0e6", background: "white", color: "#022350", cursor: "pointer", fontWeight: 500 }}>+ Modul</button>
                  </div>

                  {editing.modules.length === 0 ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#9A9AAA", fontSize: 13, background: "#f8f9fb", borderRadius: 10 }}>
                      Noch keine Module. Füge das erste Modul hinzu.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {editing.modules.map((mod, idx) => (
                        <div key={mod.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: "#f8f9fb", borderRadius: 10 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ fontSize: 12, color: "#9A9AAA", fontWeight: 600, width: 20 }}>{idx + 1}.</span>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 500, color: "#022350" }}>{mod.title}</div>
                              <div style={{ fontSize: 11, color: "#9A9AAA" }}>{moduleTypeLabels[mod.type]} · {mod.duration} Min</div>
                            </div>
                          </div>
                          <button onClick={() => deleteModule(mod.id)} style={{ background: "none", border: "none", fontSize: 16, color: "#e74c3c", cursor: "pointer" }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add module form */}
                  {showModuleForm && (
                    <div style={{ marginTop: 12, padding: 16, background: "#f8f9fb", borderRadius: 12, display: "flex", flexDirection: "column", gap: 10 }}>
                      <input value={moduleForm.title} onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })} placeholder="Modul-Titel" style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #dce0e6", fontSize: 13, outline: "none" }} />
                      <textarea value={moduleForm.description} onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })} placeholder="Beschreibung (optional)" rows={2} style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #dce0e6", fontSize: 13, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        <select value={moduleForm.type} onChange={(e) => setModuleForm({ ...moduleForm, type: e.target.value })} style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #dce0e6", fontSize: 13, background: "white" }}>
                          <option value="TEXT">Text</option>
                          <option value="VIDEO">Video</option>
                          <option value="QUIZ">Quiz</option>
                          <option value="DOCUMENT">Dokument</option>
                        </select>
                        <input type="number" value={moduleForm.duration} onChange={(e) => setModuleForm({ ...moduleForm, duration: parseInt(e.target.value) || 0 })} placeholder="Dauer (Min)" style={{ padding: "9px 12px", borderRadius: 8, border: "1px solid #dce0e6", fontSize: 13, outline: "none" }} />
                      </div>
                      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                        <button onClick={() => setShowModuleForm(false)} style={{ padding: "7px 14px", fontSize: 12, borderRadius: 7, border: "1px solid #dce0e6", background: "white", color: "#4A4A5A", cursor: "pointer" }}>Abbrechen</button>
                        <button onClick={addModule} style={{ padding: "7px 14px", fontSize: 12, borderRadius: 7, border: "none", background: "#022350", color: "white", cursor: "pointer", fontWeight: 500 }}>Hinzufügen</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
                <button onClick={() => setShowForm(false)} style={{ padding: "10px 20px", fontSize: 13, borderRadius: 10, border: "1px solid #dce0e6", background: "white", color: "#4A4A5A", cursor: "pointer" }}>Abbrechen</button>
                <button onClick={saveCourse} disabled={!formData.title || saving} style={{ padding: "10px 20px", fontSize: 13, borderRadius: 10, border: "none", background: !formData.title ? "#9A9AAA" : "#022350", color: "white", cursor: !formData.title ? "default" : "pointer", fontWeight: 500 }}>
                  {saving ? "Speichern…" : editing ? "Aktualisieren" : "Kurs erstellen"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category form modal */}
      {showCategoryForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }} onClick={() => setShowCategoryForm(false)}>
          <div style={{ background: "white", borderRadius: 18, width: 400, padding: "24px 28px" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 600, color: "#022350", marginBottom: 16 }}>Neue Kategorie</div>
            <input value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} placeholder="z.B. Versicherungsrecht" autoFocus style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box", marginBottom: 16 }} />
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button onClick={() => setShowCategoryForm(false)} style={{ padding: "10px 20px", fontSize: 13, borderRadius: 10, border: "1px solid #dce0e6", background: "white", color: "#4A4A5A", cursor: "pointer" }}>Abbrechen</button>
              <button onClick={createCategory} disabled={!newCategoryName.trim()} style={{ padding: "10px 20px", fontSize: 13, borderRadius: 10, border: "none", background: !newCategoryName.trim() ? "#9A9AAA" : "#022350", color: "white", cursor: !newCategoryName.trim() ? "default" : "pointer", fontWeight: 500 }}>Erstellen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
