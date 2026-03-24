"use client";

import { useEffect, useState, useCallback } from "react";

type Category = { id: string; name: string; color: string; _count: { courses: number } };
type Course = {
  id: string;
  title: string;
  description: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  categoryId: string | null;
  duration: number | null;
  credits: number;
  createdAt: string;
  category: Category | null;
  _count: { modules: number; enrollments: number };
};
type Module = { id: string; title: string; content: string | null; sortOrder: number; lessons: Lesson[] };
type Lesson = { id: string; title: string; content: string | null; videoUrl: string | null; sortOrder: number };
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

  // Form state
  const [form, setForm] = useState({ title: "", description: "", status: "DRAFT", categoryId: "", duration: "", credits: "0" });
  const [saving, setSaving] = useState(false);

  // New category
  const [showNewCat, setShowNewCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  // New module
  const [newModuleTitle, setNewModuleTitle] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [coursesRes, catsRes] = await Promise.all([
        fetch("/api/courses"),
        fetch("/api/categories"),
      ]);
      if (coursesRes.ok) setCourses(await coursesRes.json());
      if (catsRes.ok) setCategories(await catsRes.json());
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
    const res = await fetch(`/api/courses/${courseId}`);
    if (res.ok) {
      const data: CourseDetail = await res.json();
      setEditCourse(data);
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
      const url = view === "create" ? "/api/courses" : `/api/courses/${editCourse?.id}`;
      const method = view === "create" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: form.categoryId || null,
        }),
      });
      if (res.ok) {
        await fetchData();
        setView("list");
      }
    } catch (e) {
      console.error("Fehler beim Speichern:", e);
    }
    setSaving(false);
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Kurs wirklich löschen? Alle Module und Lektionen werden ebenfalls gelöscht.")) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    await fetchData();
  };

  const createCategory = async () => {
    if (!newCatName.trim()) return;
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCatName.trim() }),
    });
    if (res.ok) {
      const cat = await res.json();
      setCategories((prev) => [...prev, cat]);
      setForm((prev) => ({ ...prev, categoryId: cat.id }));
      setNewCatName("");
      setShowNewCat(false);
    }
  };

  const addModule = async () => {
    if (!newModuleTitle.trim() || !editCourse) return;
    const res = await fetch(`/api/courses/${editCourse.id}/modules`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newModuleTitle.trim() }),
    });
    if (res.ok) {
      const mod = await res.json();
      setEditCourse((prev) => prev ? { ...prev, modules: [...prev.modules, mod] } : null);
      setNewModuleTitle("");
    }
  };

  const filtered = courses.filter((c) => {
    if (filter !== "ALL" && c.status !== filter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
      {/* Sidebar */}
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
            <div style={{ fontSize: 15, fontWeight: 500, color: "#022350" }}>
              {view === "list" ? "Kurseditor" : view === "create" ? "Neuer Kurs" : `Kurs bearbeiten`}
            </div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>
              {view === "list" ? "Kurse erstellen, bearbeiten und verwalten" : view === "create" ? "Neuen Kurs anlegen" : editCourse?.title}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {view === "list" ? (
              <button onClick={openCreate} style={{ padding: "8px 16px", background: "#022350", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer" }}>+ Neuer Kurs</button>
            ) : (
              <button onClick={() => { setView("list"); setEditCourse(null); }} style={{ padding: "8px 16px", background: "white", color: "#4A4A5A", borderRadius: 9, fontSize: 12.5, fontWeight: 500, border: "0.5px solid #dce0e6", cursor: "pointer" }}>← Zurück</button>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>

          {/* LIST VIEW */}
          {view === "list" && (
            <>
              {/* Filter bar */}
              <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
                <input
                  placeholder="Kurs suchen…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ padding: "8px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, width: 260, outline: "none" }}
                />
                {["ALL", "DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    style={{
                      padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, border: "0.5px solid #dce0e6", cursor: "pointer",
                      background: filter === s ? "#022350" : "white",
                      color: filter === s ? "white" : "#4A4A5A",
                    }}
                  >
                    {s === "ALL" ? "Alle" : STATUS_LABELS[s].label}
                  </button>
                ))}
              </div>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
                {[
                  { label: "Alle Kurse", value: courses.length, color: "#022350" },
                  { label: "Veröffentlicht", value: courses.filter((c) => c.status === "PUBLISHED").length, color: "#0FA4A0" },
                  { label: "Entwürfe", value: courses.filter((c) => c.status === "DRAFT").length, color: "#C8A24D" },
                  { label: "Archiviert", value: courses.filter((c) => c.status === "ARCHIVED").length, color: "#9A9AAA" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "20px 22px" }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Course table */}
              {loading ? (
                <div style={{ textAlign: "center", padding: 60, color: "#9A9AAA" }}>Laden…</div>
              ) : filtered.length === 0 ? (
                <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "60px 24px", textAlign: "center" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📚</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 4 }}>Keine Kurse gefunden</div>
                  <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 16 }}>Erstellen Sie Ihren ersten Kurs.</div>
                  <button onClick={openCreate} style={{ padding: "8px 20px", background: "#022350", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer" }}>+ Neuer Kurs</button>
                </div>
              ) : (
                <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#f8f9fb" }}>
                        {["Kurs", "Kategorie", "Status", "Module", "Teilnehmer", "Credits", "Aktionen"].map((h) => (
                          <th key={h} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9A9AAA", letterSpacing: "0.05em", textTransform: "uppercase" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((course) => {
                        const st = STATUS_LABELS[course.status];
                        return (
                          <tr key={course.id} style={{ borderTop: "0.5px solid #dce0e6" }}>
                            <td style={{ padding: "14px 24px" }}>
                              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{course.title}</div>
                              {course.description && <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 2, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{course.description}</div>}
                            </td>
                            <td style={{ padding: "14px 24px" }}>
                              {course.category ? (
                                <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: course.category.color + "18", color: course.category.color }}>{course.category.name}</span>
                              ) : (
                                <span style={{ fontSize: 12, color: "#9A9AAA" }}>—</span>
                              )}
                            </td>
                            <td style={{ padding: "14px 24px" }}>
                              <span style={{ padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500, background: st.bg, color: st.color }}>{st.label}</span>
                            </td>
                            <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{course._count.modules}</td>
                            <td style={{ padding: "14px 24px", fontSize: 13, color: "#4A4A5A" }}>{course._count.enrollments}</td>
                            <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{course.credits}</td>
                            <td style={{ padding: "14px 24px" }}>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button onClick={() => openEdit(course.id)} style={{ padding: "5px 12px", borderRadius: 7, border: "0.5px solid #dce0e6", background: "white", fontSize: 12, cursor: "pointer", color: "#022350" }}>Bearbeiten</button>
                                <button onClick={() => deleteCourse(course.id)} style={{ padding: "5px 12px", borderRadius: 7, border: "0.5px solid #dce0e6", background: "white", fontSize: 12, cursor: "pointer", color: "#e74c3c" }}>Löschen</button>
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
            <div style={{ display: "grid", gridTemplateColumns: view === "edit" ? "1fr 1fr" : "1fr", gap: 24 }}>
              {/* Course form */}
              <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "28px 28px" }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 20 }}>Kursdetails</div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Kurstitel *</label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="z.B. Grundlagen der Lebensversicherung"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Beschreibung</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    placeholder="Kurze Beschreibung des Kursinhalts…"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "inherit" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm({ ...form, status: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none", background: "white", boxSizing: "border-box" }}
                    >
                      <option value="DRAFT">Entwurf</option>
                      <option value="PUBLISHED">Veröffentlicht</option>
                      <option value="ARCHIVED">Archiviert</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Kategorie</label>
                    {!showNewCat ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <select
                          value={form.categoryId}
                          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                          style={{ flex: 1, padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none", background: "white", boxSizing: "border-box" }}
                        >
                          <option value="">Keine Kategorie</option>
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <button onClick={() => setShowNewCat(true)} style={{ padding: "0 12px", borderRadius: 9, border: "0.5px solid #dce0e6", background: "white", fontSize: 16, cursor: "pointer", color: "#0FA4A0" }} title="Neue Kategorie">+</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", gap: 6 }}>
                        <input
                          value={newCatName}
                          onChange={(e) => setNewCatName(e.target.value)}
                          placeholder="Neue Kategorie…"
                          onKeyDown={(e) => e.key === "Enter" && createCategory()}
                          style={{ flex: 1, padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                        />
                        <button onClick={createCategory} style={{ padding: "0 12px", borderRadius: 9, border: "none", background: "#0FA4A0", color: "white", fontSize: 12, cursor: "pointer" }}>OK</button>
                        <button onClick={() => { setShowNewCat(false); setNewCatName(""); }} style={{ padding: "0 12px", borderRadius: 9, border: "0.5px solid #dce0e6", background: "white", fontSize: 12, cursor: "pointer", color: "#9A9AAA" }}>×</button>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Dauer (Minuten)</label>
                    <input
                      type="number"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      placeholder="z.B. 120"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Credits</label>
                    <input
                      type="number"
                      value={form.credits}
                      onChange={(e) => setForm({ ...form, credits: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
                  <button
                    onClick={() => { setView("list"); setEditCourse(null); }}
                    style={{ padding: "10px 20px", borderRadius: 9, border: "0.5px solid #dce0e6", background: "white", fontSize: 13, cursor: "pointer", color: "#4A4A5A" }}
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={saveCourse}
                    disabled={saving || !form.title.trim()}
                    style={{
                      padding: "10px 24px", borderRadius: 9, border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer",
                      background: !form.title.trim() ? "#dce0e6" : "#022350",
                      color: !form.title.trim() ? "#9A9AAA" : "white",
                      opacity: saving ? 0.6 : 1,
                    }}
                  >
                    {saving ? "Speichern…" : view === "create" ? "Kurs erstellen" : "Änderungen speichern"}
                  </button>
                </div>
              </div>

              {/* Modules panel (only in edit view) */}
              {view === "edit" && editCourse && (
                <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "28px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: "#022350" }}>Module</div>
                    <span style={{ fontSize: 12, color: "#9A9AAA" }}>{editCourse.modules.length} Module</span>
                  </div>

                  {editCourse.modules.length === 0 ? (
                    <div style={{ padding: "32px 0", textAlign: "center", color: "#9A9AAA", fontSize: 13 }}>
                      Noch keine Module vorhanden.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                      {editCourse.modules.map((mod, idx) => (
                        <div key={mod.id} style={{ padding: "14px 18px", borderRadius: 10, border: "0.5px solid #dce0e6", background: "#f8f9fb" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#022350", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{idx + 1}</span>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{mod.title}</div>
                              <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{mod.lessons.length} Lektionen</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add module */}
                  <div style={{ display: "flex", gap: 8 }}>
                    <input
                      value={newModuleTitle}
                      onChange={(e) => setNewModuleTitle(e.target.value)}
                      placeholder="Neues Modul hinzufügen…"
                      onKeyDown={(e) => e.key === "Enter" && addModule()}
                      style={{ flex: 1, padding: "10px 14px", borderRadius: 9, border: "0.5px solid #dce0e6", fontSize: 13, outline: "none" }}
                    />
                    <button
                      onClick={addModule}
                      disabled={!newModuleTitle.trim()}
                      style={{
                        padding: "10px 16px", borderRadius: 9, border: "none", fontSize: 12.5, fontWeight: 500, cursor: "pointer",
                        background: newModuleTitle.trim() ? "#0FA4A0" : "#dce0e6",
                        color: newModuleTitle.trim() ? "white" : "#9A9AAA",
                      }}
                    >
                      + Modul
                    </button>
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
