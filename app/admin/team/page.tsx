"use client";

import { useState } from "react";
import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Bell, Users,
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

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: marine, fontFamily: h }}>Team</div>
            <div style={{ fontSize: 12, color: "#8090A0" }}>Teammitglieder verwalten und Rollen zuweisen</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={openAdd} style={{ padding: "8px 16px", background: marine, color: "white", borderRadius: 12, fontSize: 12.5, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: b }}>+ Neues Mitglied</button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 24 }}>
            {[
              { label: "Mitglieder gesamt", value: counts.total, color: "#022350" },
              { label: "Admins", value: counts.admins, color: "#0FA4A0" },
              { label: "Instruktoren", value: counts.instructors, color: "#C8A24D" },
              { label: "Lernende", value: members.filter((m) => m.role === "Lernender").length, color: "#6366f1" },
            ].map((s, i) => (
              <div key={i} style={{ ...glass, padding: "20px 22px" }}>
                <div style={{ fontSize: 36, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
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
              style={{ padding: "8px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, width: 260, outline: "none", fontFamily: b }}
            />
            {["ALL", "Admin", "Instruktor", "Vermittler", "Lernender"].map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  border: "1px solid rgba(0,0,0,0.06)",
                  cursor: "pointer",
                  background: roleFilter === r ? marine : "rgba(255,255,255,0.6)",
                  color: roleFilter === r ? "white" : "#4A4A5A",
                  fontFamily: b,
                }}
              >
                {r === "ALL" ? "Alle" : r}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ ...glass, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(0,0,0,0.02)" }}>
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
                    <tr key={member.id} style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 12, background: `linear-gradient(135deg, ${marine}, ${marineMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white", flexShrink: 0 }}>
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
                          style={{ padding: "5px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: marine, fontFamily: b }}
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
          <div style={{ ...glass, borderRadius: 22, padding: "32px 32px 28px", width: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
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
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.06)",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  background: editingId !== null ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.6)",
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
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.06)",
                  fontSize: 13,
                  outline: "none",
                  boxSizing: "border-box",
                  background: editingId !== null ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.6)",
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
                style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", fontSize: 13, outline: "none", background: "rgba(255,255,255,0.6)", boxSizing: "border-box", fontFamily: b }}
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
                style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, cursor: "pointer", color: "#4A4A5A", fontFamily: b }}
              >
                Abbrechen
              </button>
              <button
                onClick={handleSave}
                disabled={editingId === null && (!form.name.trim() || !form.email.trim())}
                style={{
                  padding: "10px 24px",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  background: (editingId === null && (!form.name.trim() || !form.email.trim())) ? "rgba(0,0,0,0.06)" : marine,
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
