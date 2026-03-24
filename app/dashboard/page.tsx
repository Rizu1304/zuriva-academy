"use client";
import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const programs = [
  { title: "Grundlagen Sachversicherung", sub: "Nicht-Leben", participants: 18, progress: 68, due: "28 Mär 2026", score: 4.6 },
  { title: "Lebensversicherungen", sub: "Produktkenntnisse", participants: 12, progress: 33, due: "15 Apr 2026", score: 4.2 },
  { title: "Beratungskompetenz", sub: "Gen. Fähigkeiten", participants: 8, progress: 85, due: "10 Feb 2026", score: 4.8 },
  { title: "FIDLEG und VAG 2026", sub: "Compliance", participants: 24, progress: 12, due: "30 Apr 2026", score: 3.9 },
];

const teamRoles = [
  { role: "Admin", count: 2, color: "#022350" },
  { role: "Instruktor", count: 4, color: "#1B6FC2" },
  { role: "Vermittler", count: 14, color: "#0FA4A0" },
  { role: "Trainee", count: 4, color: "#C8A24D" },
];

const teamPerf = [
  { dept: "Nicht-Leben", score: 4.6, pct: 92 },
  { dept: "Leben", score: 4.2, pct: 84 },
  { dept: "Compliance", score: 3.9, pct: 78 },
  { dept: "Gen. Fähigkeiten", score: 3.5, pct: 70 },
  { dept: "Krankenzusatz", score: 2.8, pct: 56 },
];

const activities = [
  { text: "Quiz Sachversicherung bestanden", time: "Heute 09:14", color: "#0FA4A0" },
  { text: "Modul 5 Beratungskompetenz abgeschlossen", time: "Heute 08:42", color: "#C8A24D" },
  { text: "Forum-Beitrag in Lebensversicherungen", time: "Gestern 16:30", color: "#1B6FC2" },
  { text: "Kurs FIDLEG & VAG eingeschrieben", time: "Fr 20.03.", color: "#022350" },
  { text: "Zertifikat Trainee Grundausbildung", time: "Mi 18.03.", color: "#0FA4A0" },
];

const nav = [
  { name: "Dashboard", href: "/dashboard", active: true },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade" },
  { name: "Prüfungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate" },
  { name: "Forum", href: "/forum" },
];

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hallo! Ich bin Aura, deine KI-Assistentin der Zuriva Academy. Wie kann ich dir helfen?" }
  ]);
  const [input, setInput] = useState("");

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => setMessages(m => [...m, { role: "bot", text: "Danke für deine Frage! Ich helfe dir gerne weiter." }]), 800);
  };

  const total = teamRoles.reduce((s, r) => s + r.count, 0);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "#FAF8F5", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "1px solid #F0ECE6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 22px", borderBottom: "1px solid #F0ECE6" }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8, letterSpacing: "0.04em" }}>academy</span>
        </div>

        <div style={{ padding: "20px 0 4px" }}>
          <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "0 24px 8px" }}>LERNEN</div>
          {nav.map((item) => (
            <a key={item.name} href={item.href} style={{ display: "block", padding: "10px 24px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#FAF8F5" : "transparent", borderLeft: item.active ? "2px solid #C8A24D" : "2px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", letterSpacing: "0.01em" }}>{item.name}</a>
          ))}
        </div>

        <div style={{ padding: "16px 0 4px" }}>
          <div style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "0 24px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ display: "block", padding: "10px 24px", color: "#4A4A5A", background: "transparent", borderLeft: "2px solid transparent", fontSize: 13, textDecoration: "none" }}>{item.name}</a>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 24px", borderTop: "1px solid #F0ECE6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "white", letterSpacing: "0.02em" }}>LM</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "#1A1A2E" }}>Laura Meier</div>
            <div style={{ fontSize: 10, color: "#9A9AAA" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* TOPBAR */}
        <div style={{ background: "white", borderBottom: "1px solid #F0ECE6", height: 64, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 400, color: "#022350", fontFamily: h }}>Guten Morgen, Laura</div>
            <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>Deine Lernaktivitäten auf einen Blick.</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", background: "#FAF8F5", borderRadius: 10, border: "1px solid #F0ECE6" }}>
              <span style={{ fontSize: 12, color: "#9A9AAA" }}>Suchen...</span>
              <span style={{ fontSize: 10, color: "#9A9AAA", background: "white", padding: "2px 6px", borderRadius: 4, border: "1px solid #F0ECE6" }}>⌘K</span>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500, color: "white" }}>LM</div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px 40px" }}>

          {/* ROW 1: Programs + VBV Status */}
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, marginBottom: 20 }}>

            {/* Active Learning Programs */}
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #F0ECE6", overflow: "hidden" }}>
              <div style={{ padding: "20px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#022350", fontFamily: h, fontSize: 16 }}>Aktive Lernprogramme</div>
                <a href="/courses" style={{ fontSize: 11, color: "#9A9AAA", textDecoration: "none" }}>↗</a>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Kurs", "Teilnehmer", "Fortschritt", "Frist", "Score"].map(col => (
                      <th key={col} style={{ padding: "8px 24px", textAlign: "left", fontSize: 10, fontWeight: 500, color: "#9A9AAA", borderTop: "1px solid #F0ECE6", borderBottom: "1px solid #F0ECE6" }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p, i) => (
                    <tr key={i} style={{ borderBottom: i < programs.length - 1 ? "1px solid #F0ECE6" : "none" }}>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#1A1A2E" }}>{p.title}</div>
                        <div style={{ fontSize: 10, color: "#9A9AAA", marginTop: 1 }}>{p.sub}</div>
                      </td>
                      <td style={{ padding: "14px 24px", fontSize: 12, color: "#4A4A5A" }}>+{p.participants}</td>
                      <td style={{ padding: "14px 24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 60, height: 4, borderRadius: 2, background: "#F0ECE6" }}>
                            <div style={{ height: 4, borderRadius: 2, background: p.progress >= 70 ? "#0FA4A0" : p.progress >= 40 ? "#C8A24D" : "#1B6FC2", width: p.progress + "%" }} />
                          </div>
                          <span style={{ fontSize: 11, color: "#4A4A5A" }}>{p.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 24px", fontSize: 11, color: "#4A4A5A" }}>{p.due}</td>
                      <td style={{ padding: "14px 24px" }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>⭐ {p.score}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VBV Status Overview */}
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #F0ECE6", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>VBV-Status</div>
                <a href="/lernpfade" style={{ fontSize: 11, color: "#9A9AAA", textDecoration: "none" }}>↗</a>
              </div>

              {/* Donut chart placeholder */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                <div style={{ position: "relative", width: 140, height: 140 }}>
                  <svg viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="70" cy="70" r="56" fill="none" stroke="#F0ECE6" strokeWidth="12" />
                    <circle cx="70" cy="70" r="56" fill="none" stroke="#0FA4A0" strokeWidth="12" strokeDasharray={`${0.57 * 352} ${352}`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 400, color: "#022350", fontFamily: h }}>342</div>
                    <div style={{ fontSize: 10, color: "#9A9AAA" }}>/ 600 Credits</div>
                  </div>
                </div>
              </div>

              {/* Role legend */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {teamRoles.map(r => (
                  <div key={r.role} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: r.color }} />
                    <span style={{ fontSize: 11, color: "#4A4A5A" }}>{r.role}</span>
                    <span style={{ fontSize: 11, fontWeight: 500, color: "#1A1A2E", marginLeft: "auto" }}>{r.count}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 16, padding: "12px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 10, color: "#9A9AAA" }}>Fortschritt</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: "#0FA4A0" }}>57%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "#F0ECE6" }}>
                  <div style={{ height: 6, borderRadius: 3, background: "linear-gradient(90deg, #0FA4A0, #14C4BF)", width: "57%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2: Team Performance + Activities + Learning Completion */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>

            {/* Team Performance */}
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #F0ECE6", padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Team Performance</div>
                <a href="/admin/team" style={{ fontSize: 11, color: "#9A9AAA", textDecoration: "none" }}>↗</a>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {teamPerf.map(t => (
                  <div key={t.dept}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: "#4A4A5A" }}>{t.dept}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: "#1A1A2E" }}>{t.score}</span>
                    </div>
                    <div style={{ height: 4, borderRadius: 2, background: "#F0ECE6" }}>
                      <div style={{ height: 4, borderRadius: 2, background: t.pct >= 80 ? "#0FA4A0" : t.pct >= 60 ? "#C8A24D" : "#C0392B", width: t.pct + "%" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 11, color: "#9A9AAA", lineHeight: 1.5 }}>
                Nicht-Leben zeigt die stärkste Performance, Krankenzusatz braucht Unterstützung.
              </div>
            </div>

            {/* Letzte Aktivitäten */}
            <div style={{ background: "white", borderRadius: 16, border: "1px solid #F0ECE6", padding: "20px 24px" }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 20, fontFamily: h }}>Letzte Aktivitäten</div>
              {activities.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < activities.length - 1 ? "1px solid #F0ECE6" : "none", alignItems: "flex-start" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: a.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: "#1A1A2E", lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 10, color: "#9A9AAA", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Lernfortschritt Card */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Lernzeit */}
              <div style={{ background: "white", borderRadius: 16, border: "1px solid #F0ECE6", padding: "20px 24px", flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 16, fontFamily: h }}>Lernzeit</div>
                <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
                  {[
                    { label: "Diese Woche", value: "6.2h", color: "#0FA4A0" },
                    { label: "Letzter Monat", value: "34h", color: "#1B6FC2" },
                  ].map(s => (
                    <div key={s.label}>
                      <div style={{ fontSize: 24, fontWeight: 400, color: s.color, fontFamily: h }}>{s.value}</div>
                      <div style={{ fontSize: 10, color: "#9A9AAA", marginTop: 2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "#9A9AAA" }}>+18% mehr Lernzeit als letzten Monat.</div>
              </div>

              {/* Completion Rate */}
              <div style={{ background: "#022350", borderRadius: 16, padding: "20px 24px" }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "white", marginBottom: 12, fontFamily: h }}>Abschlussrate</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 400, color: "white", fontFamily: h }}>76%</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>Abgeschlossen</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 28, fontWeight: 400, color: "#C8A24D", fontFamily: h }}>24%</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}>In Bearbeitung</div>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.15)" }}>
                  <div style={{ height: 6, borderRadius: 3, background: "white", width: "76%" }} />
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>Abschlussrate ist 12% höher als letzten Monat.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AURA CHAT */}
      {chatOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: 380, height: "100vh", background: "white", borderLeft: "1px solid #F0ECE6", boxShadow: "-8px 0 40px rgba(2,35,80,0.08)", zIndex: 999999, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#022350", padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(200,162,77,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#C8A24D" }}>✦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "white", fontFamily: h }}>Aura</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#14C4BF" }} /> Online
              </div>
            </div>
            <div onClick={() => setChatOpen(false)} style={{ color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 18, lineHeight: 1 }}>×</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10, background: "#FAF8F5" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", fontSize: 13, padding: "10px 14px", borderRadius: 12, background: m.role === "bot" ? "white" : "#022350", color: m.role === "bot" ? "#1A1A2E" : "white", alignSelf: m.role === "bot" ? "flex-start" : "flex-end", border: m.role === "bot" ? "1px solid #F0ECE6" : "none" }}>{m.text}</div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #F0ECE6", padding: "12px 16px", display: "flex", gap: 8, flexShrink: 0 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Frage Aura..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: b, color: "#1A1A2E" }} />
            <button onClick={sendMsg} style={{ width: 32, height: 32, borderRadius: 8, background: "#0FA4A0", border: "none", cursor: "pointer", color: "white", fontSize: 14 }}>→</button>
          </div>
        </div>
      )}

      {/* AURA BUTTON */}
      <div onClick={() => setChatOpen(!chatOpen)} style={{ position: "fixed", bottom: 28, right: 28, width: 52, height: 52, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer", boxShadow: "0 4px 20px rgba(2,35,80,0.25)", zIndex: 99999, color: "#C8A24D" }}>✦</div>

    </div>
  );
}
