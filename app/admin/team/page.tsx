"use client";

import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type TeamMember = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Instruktor" | "Vermittler" | "Lernender";
  progress: number;
  credits: number;
  lastActive: string;
  status: "active" | "inactive";
};

const initialMembers: TeamMember[] = [
  { id: 1, name: "Laura Meier", email: "laura.meier@zuriva.ch", role: "Admin", progress: 95, credits: 580, lastActive: "Heute", status: "active" },
  { id: 2, name: "Thomas Müller", email: "thomas.mueller@zuriva.ch", role: "Vermittler", progress: 72, credits: 428, lastActive: "Heute", status: "active" },
  { id: 3, name: "Anna Schneider", email: "anna.schneider@zuriva.ch", role: "Instruktor", progress: 88, credits: 520, lastActive: "Gestern", status: "active" },
  { id: 4, name: "Beat Keller", email: "beat.keller@zuriva.ch", role: "Vermittler", progress: 34, credits: 198, lastActive: "Mo 23.03.", status: "inactive" },
  { id: 5, name: "Petra Koch", email: "petra.koch@zuriva.ch", role: "Vermittler", progress: 48, credits: 276, lastActive: "Di 24.03.", status: "active" },
  { id: 6, name: "Marco Bianchi", email: "marco.bianchi@zuriva.ch", role: "Lernender", progress: 12, credits: 64, lastActive: "Fr 20.03.", status: "inactive" },
  { id: 7, name: "Sarah Weber", email: "sarah.weber@zuriva.ch", role: "Vermittler", progress: 61, credits: 342, lastActive: "Heute", status: "active" },
  { id: 8, name: "David Hoffmann", email: "david.hoffmann@zuriva.ch", role: "Vermittler", progress: 55, credits: 310, lastActive: "Gestern", status: "active" },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

function progressColor(p: number) {
  if (p >= 70) return "#0FA4A0";
  if (p >= 40) return "#C8A24D";
  return "#e74c3c";
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "Vermittler" as TeamMember["role"] });

  const filtered = members.filter((m) => {
    if (roleFilter !== "ALL" && m.role !== roleFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!m.name.toLowerCase().includes(q) && !m.email.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const counts = {
    total: members.length,
    admins: members.filter((m) => m.role === "Admin").length,
    instructors: members.filter((m) => m.role === "Instruktor").length,
    learners: members.filter((m) => m.role === "Lernender").length,
  };

  const openAdd = () => {
    setForm({ name: "", email: "", role: "Vermittler" });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditRole = (member: TeamMember) => {
    setForm({ name: member.name, email: member.email, role: member.role });
    setEditingId(member.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (editingId !== null) {
      setMembers((prev) =>
        prev.map((m) => (m.id === editingId ? { ...m, role: form.role } : m))
      );
    } else {
      if (!form.name.trim() || !form.email.trim()) return;
      const newMember: TeamMember = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        progress: 0,
        credits: 0,
        lastActive: "Heute",
        status: "active",
      };
      setMembers((prev) => [...prev, newMember]);
    }
    setShowModal(false);
    setEditingId(null);
  };

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
          { name: "Lernpfadeditor", href: "/admin/lernpfade" },
          { name: "Prüfungseditor", href: "/admin/pruefungen" },
          { name: "Kahoot-Editor", href: "/admin/kahoot" },
          { name: "Team", href: "/admin/team", active: true },
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
            <div style={{ fontSize: 22, fontWeight: 400, color: "#022350", fontFamily: h }}>Team</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Teammitglieder verwalten und Rollen zuweisen</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={openAdd} style={{ padding: "8px 16px", background: "#022350", color: "white", borderRadius: 9, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neues Mitglied</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Mitglieder gesamt", value: counts.total, color: "#022350" },
              { label: "Admins", value: counts.admins, color: "#0FA4A0" },
              { label: "Instruktoren", value: counts.instructors, color: "#C8A24D" },
              { label: "Lernende", value: members.filter((m) => m.role === "Lernender").length, color: "#6366f1" },
            ].map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, border: "1px solid #F0ECE6", padding: "20px 22px" }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1, fontFamily: h }}>{s.value}</div>
                <div style={{ fontSize: 12.5, color: "#4A4A5A", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
            <input
              placeholder="Mitglied suchen..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: "8px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, width: 260, outline: "none", fontFamily: b }}
            />
            {["ALL", "Admin", "Instruktor", "Vermittler", "Lernender"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  border: "1px solid #F0ECE6",
                  cursor: "pointer",
                  background: roleFilter === r ? "#022350" : "white",
                  color: roleFilter === r ? "white" : "#4A4A5A",
                  fontFamily: b,
                }}
              >
                {r === "ALL" ? "Alle" : r}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ background: "white", borderRadius: 14, border: "1px solid #F0ECE6", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f8f9fb" }}>
                  {["Name", "E-Mail", "Rolle", "Fortschritt", "Credits", "Zuletzt aktiv", "Status", "Aktionen"].map((col) => (
                    <th key={col} style={{ padding: "10px 24px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "#9A9AAA", letterSpacing: "0.05em", textTransform: "uppercase" }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} style={{ padding: "40px 24px", textAlign: "center", color: "#9A9AAA", fontSize: 13 }}>
                      Keine Mitglieder gefunden.
                    </td>
                  </tr>
                ) : (
                  filtered.map((member) => (
                    <tr key={member.id} style={{ borderTop: "1px solid #F0ECE6" }}>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white", flexShrink: 0 }}>
                            {getInitials(member.name)}
                          </div>
                          <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{member.name}</div>
                        </div>
                      </td>
                      <td style={{ padding: "14px 24px", fontSize: 12.5, color: "#4A4A5A" }}>{member.email}</td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{
                          padding: "3px 10px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 500,
                          background: member.role === "Admin" ? "#FAF8F5" : member.role === "Instruktor" ? "#E8F5E9" : member.role === "Lernender" ? "#F3E8FF" : "#FFF3E0",
                          color: member.role === "Admin" ? "#022350" : member.role === "Instruktor" ? "#2E7D32" : member.role === "Lernender" ? "#6366f1" : "#E65100",
                        }}>
                          {member.role}
                        </span>
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 80, height: 4, borderRadius: 2, background: "#eef0f3" }}>
                            <div style={{ height: 4, borderRadius: 2, background: progressColor(member.progress), width: member.progress + "%" }} />
                          </div>
                          <span style={{ fontSize: 12, color: "#4A4A5A" }}>{member.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 24px", fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{member.credits}</td>
                      <td style={{ padding: "14px 24px", fontSize: 12, color: "#9A9AAA" }}>{member.lastActive}</td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{
                          padding: "3px 10px",
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 500,
                          background: member.status === "active" ? "#E8F5E9" : "#ECEFF1",
                          color: member.status === "active" ? "#2E7D32" : "#546E7A",
                        }}>
                          {member.status === "active" ? "Aktiv" : "Inaktiv"}
                        </span>
                      </td>
                      <td style={{ padding: "14px 24px" }}>
                        <button
                          onClick={() => openEditRole(member)}
                          style={{ padding: "5px 12px", borderRadius: 7, border: "1px solid #F0ECE6", background: "white", fontSize: 12, cursor: "pointer", color: "#022350", fontFamily: b }}
                        >
                          Bearbeiten
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "white", borderRadius: 16, padding: "32px 32px 28px", width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
            <div style={{ fontSize: 22, fontWeight: 400, color: "#022350", marginBottom: 24, fontFamily: h }}>
              {editingId !== null ? "Rolle bearbeiten" : "Neues Teammitglied"}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Vor- und Nachname"
                disabled={editingId !== null}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 9,
                  border: "1px solid #F0ECE6",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  background: editingId !== null ? "#f8f9fb" : "white",
                  color: editingId !== null ? "#9A9AAA" : "#022350",
                  fontFamily: b,
                }}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>E-Mail *</label>
              <input
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@zuriva.ch"
                disabled={editingId !== null}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 9,
                  border: "1px solid #F0ECE6",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  background: editingId !== null ? "#f8f9fb" : "white",
                  color: editingId !== null ? "#9A9AAA" : "#022350",
                  fontFamily: b,
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 500, color: "#4A4A5A", display: "block", marginBottom: 6 }}>Rolle</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as TeamMember["role"] })}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 9, border: "1px solid #F0ECE6", fontSize: 13, outline: "none", background: "white", boxSizing: "border-box", fontFamily: b }}
              >
                <option value="Admin">Admin</option>
                <option value="Instruktor">Instruktor</option>
                <option value="Vermittler">Vermittler</option>
                <option value="Lernender">Lernender</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button
                onClick={() => { setShowModal(false); setEditingId(null); }}
                style={{ padding: "10px 20px", borderRadius: 9, border: "1px solid #F0ECE6", background: "white", fontSize: 13, cursor: "pointer", color: "#4A4A5A", fontFamily: b }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={editingId === null && (!form.name.trim() || !form.email.trim())}
                style={{
                  padding: "10px 24px",
                  borderRadius: 9,
                  border: "none",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  background: (editingId === null && (!form.name.trim() || !form.email.trim())) ? "#F0ECE6" : "#022350",
                  color: (editingId === null && (!form.name.trim() || !form.email.trim())) ? "#9A9AAA" : "white",
                  fontFamily: b,
                }}
              >
                {editingId !== null ? "Rolle speichern" : "Mitglied hinzufügen"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
