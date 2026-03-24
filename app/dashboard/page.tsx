"use client";
import { useState } from "react";
import { chat } from "@/app/aura/actions";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const card = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 24px rgba(2,35,80,0.04)",
} as const;

const programs = [
  { title: "Grundlagen Sachversicherung", sub: "Nicht-Leben", progress: 68, due: "28 Mär", score: 4.6, color: "#022350" },
  { title: "Lebensversicherungen", sub: "Produktkenntnisse", progress: 33, due: "15 Apr", score: 4.2, color: "#0FA4A0" },
  { title: "Beratungskompetenz", sub: "Gen. Fähigkeiten", progress: 85, due: "10 Feb", score: 4.8, color: "#C8A24D" },
  { title: "FIDLEG und VAG 2026", sub: "Compliance", progress: 12, due: "30 Apr", score: 3.9, color: "#1B6FC2" },
];

const teamPerf = [
  { dept: "Nicht-Leben", score: 4.6, pct: 92, color: "#0FA4A0" },
  { dept: "Leben", score: 4.2, pct: 84, color: "#1B6FC2" },
  { dept: "Compliance", score: 3.9, pct: 78, color: "#C8A24D" },
  { dept: "Gen. Fähigkeiten", score: 3.5, pct: 70, color: "#E0B95F" },
];

const activities = [
  { text: "Quiz Sachversicherung bestanden", time: "09:14", color: "#0FA4A0", icon: "✓" },
  { text: "Modul 5 abgeschlossen", time: "08:42", color: "#C8A24D", icon: "★" },
  { text: "Forum-Beitrag erstellt", time: "Gestern", color: "#1B6FC2", icon: "💬" },
  { text: "Neuer Kurs eingeschrieben", time: "Fr 20.03.", color: "#022350", icon: "+" },
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
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hallo! Ich bin Aura, deine KI-Assistentin. Wie kann ich dir helfen?" }
  ]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);

  const sendMsg = async () => {
    if (!input.trim() || chatLoading) return;
    const userText = input.trim();
    setMessages(m => [...m, { role: "user", text: userText }]);
    setInput("");
    setChatLoading(true);

    try {
      const apiMessages = [...messages.filter(m => m.role !== "bot" || messages.indexOf(m) > 0 ? true : false), { role: "user" as const, text: userText }]
        .map(m => ({
          role: (m.role === "bot" ? "assistant" : "user") as "user" | "assistant",
          content: m.text,
        }));
      const response = await chat({ messages: apiMessages });
      setMessages(m => [...m, { role: "bot", text: response.content }]);
    } catch {
      setMessages(m => [...m, { role: "bot", text: "Entschuldigung, es gab einen Fehler. Bitte versuche es erneut." }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 24px" }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8, letterSpacing: "0.04em" }}>academy</span>
        </div>

        <div style={{ padding: "0 12px", flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
          {nav.map((item) => (
            <a key={item.name} href={item.href} style={{
              display: "block", padding: "10px 14px", margin: "2px 0",
              color: item.active ? "#022350" : "#4A4A5A",
              background: item.active ? "rgba(255,255,255,0.8)" : "transparent",
              borderRadius: 12,
              fontWeight: item.active ? 600 : 400, fontSize: 13.5, textDecoration: "none",
              boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none",
              transition: "all 0.2s ease",
            }}>{item.name}</a>
          ))}

          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "20px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{
              display: "block", padding: "10px 14px", margin: "2px 0",
              color: "#4A4A5A", background: "transparent", borderRadius: 12,
              fontSize: 13.5, textDecoration: "none", transition: "all 0.2s ease",
            }}>{item.name}</a>
          ))}
        </div>

        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, color: "white" }}>LM</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Laura Meier</div>
            <div style={{ fontSize: 10, color: "#9A9AAA" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* TOPBAR */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h, lineHeight: 1.2 }}>Guten Morgen, Laura</div>
            <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 4 }}>Montag, 24. März 2026 · VBV-Frist in 99 Tagen</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ ...card, padding: "9px 18px", borderRadius: 14, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: "#9A9AAA" }}>Suchen...</span>
              <span style={{ fontSize: 9, color: "#9A9AAA", background: "rgba(0,0,0,0.04)", padding: "3px 7px", borderRadius: 6 }}>⌘K</span>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 500, color: "white" }}>LM</div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 40px" }}>

          {/* STATS ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20 }}>
            {[
              { n: "4", l: "Aktive Kurse", trend: "+1", up: true, gradient: "linear-gradient(135deg, #022350, #0E3057)" },
              { n: "342", l: "Credits total", trend: "+24", up: true, gradient: "linear-gradient(135deg, #0FA4A0, #14C4BF)" },
              { n: "34h", l: "Lernzeit", trend: "+3.2h", up: true, gradient: "linear-gradient(135deg, #C8A24D, #E0B95F)" },
              { n: "94%", l: "Quiz-Score", trend: "-2%", up: false, gradient: "linear-gradient(135deg, #1B6FC2, #2D8FE5)" },
            ].map((s, i) => (
              <div key={i} style={{ ...card, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -8, right: -8, width: 60, height: 60, borderRadius: "50%", background: s.gradient, opacity: 0.07 }} />
                <div style={{ fontSize: 32, fontWeight: 400, color: "#022350", fontFamily: h, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "#4A4A5A", marginTop: 6 }}>{s.l}</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 10, color: s.up ? "#0FA4A0" : "#C0392B", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 9 }}>{s.up ? "↑" : "↓"}</span> {s.trend} diese Woche
                </div>
              </div>
            ))}
          </div>

          {/* VBV HERO */}
          <div style={{ borderRadius: 24, padding: "32px 36px", marginBottom: 20, background: "linear-gradient(135deg, #022350 0%, #0E3057 40%, #1B6FC2 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -30, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,164,160,0.2) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: -40, left: "30%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,162,77,0.12) 0%, transparent 70%)" }} />
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 10 }}>VBV-Zertifizierung 2026</div>
                <div style={{ fontSize: 26, fontWeight: 400, color: "white", fontFamily: h, marginBottom: 16, lineHeight: 1.2 }}>Dein Lernfortschritt</div>
                <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.12)", marginBottom: 10, maxWidth: 400 }}>
                  <div style={{ height: 5, borderRadius: 3, background: "linear-gradient(90deg, #0FA4A0, #14C4BF)", width: "57%" }} />
                </div>
                <div style={{ display: "flex", gap: 24 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Ziel: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>600 Credits</span></span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Frist: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>30. Juni 2026</span></span>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ position: "relative", width: 120, height: 120 }}>
                  <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="url(#grad)" strokeWidth="8" strokeDasharray={`${0.57 * 314} ${314}`} strokeLinecap="round" />
                    <defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0FA4A0" /><stop offset="100%" stopColor="#14C4BF" /></linearGradient></defs>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 28, fontWeight: 400, color: "#C8A24D", fontFamily: h }}>342</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Credits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20, marginBottom: 20 }}>

            {/* Active Programs */}
            <div style={{ ...card, overflow: "hidden" }}>
              <div style={{ padding: "22px 26px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Aktive Lernprogramme</div>
                <a href="/courses" style={{ fontSize: 11, color: "#9A9AAA", textDecoration: "none", padding: "4px 10px", background: "rgba(0,0,0,0.03)", borderRadius: 8 }}>Alle →</a>
              </div>
              <div style={{ padding: "0 26px 22px" }}>
                {programs.map((p, i) => (
                  <div key={i} style={{ padding: "14px 0", borderBottom: i < programs.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "white", fontWeight: 500, flexShrink: 0 }}>{p.sub[0]}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#1A1A2E", marginBottom: 6 }}>{p.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 4, borderRadius: 2, background: "rgba(0,0,0,0.04)" }}>
                          <div style={{ height: 4, borderRadius: 2, background: `linear-gradient(90deg, ${p.color}, ${p.color}aa)`, width: p.progress + "%", transition: "width 0.6s ease" }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: p.color, minWidth: 32 }}>{p.progress}%</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: "#9A9AAA", textAlign: "right", flexShrink: 0 }}>
                      <div>⭐ {p.score}</div>
                      <div style={{ marginTop: 2 }}>{p.due}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              {/* Team Performance */}
              <div style={{ ...card, padding: "22px 26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", fontFamily: h }}>Team Performance</div>
                  <a href="/admin/team" style={{ fontSize: 11, color: "#9A9AAA", textDecoration: "none" }}>↗</a>
                </div>
                {teamPerf.map((t, i) => (
                  <div key={i} style={{ marginBottom: i < teamPerf.length - 1 ? 14 : 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: "#4A4A5A" }}>{t.dept}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: t.color }}>{t.score}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: "rgba(0,0,0,0.04)" }}>
                      <div style={{ height: 5, borderRadius: 3, background: `linear-gradient(90deg, ${t.color}, ${t.color}88)`, width: t.pct + "%", transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Completion Rate */}
              <div style={{ borderRadius: 20, padding: "24px 26px", background: "linear-gradient(135deg, #022350, #0E3057)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,162,77,0.15) 0%, transparent 70%)" }} />
                <div style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.6)", marginBottom: 14, fontFamily: h }}>Abschlussrate</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 14 }}>
                  <div><div style={{ fontSize: 36, fontWeight: 400, color: "white", fontFamily: h, lineHeight: 1 }}>76%</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Abgeschlossen</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 24, fontWeight: 400, color: "#C8A24D", fontFamily: h, lineHeight: 1 }}>24%</div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Offen</div></div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)" }}>
                  <div style={{ height: 6, borderRadius: 3, background: "linear-gradient(90deg, #0FA4A0, #14C4BF)", width: "76%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Activities */}
            <div style={{ ...card, padding: "22px 26px" }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 16, fontFamily: h }}>Letzte Aktivitäten</div>
              {activities.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < activities.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none", alignItems: "center" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: `${a.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: a.color, flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, color: "#1A1A2E" }}>{a.text}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#9A9AAA", flexShrink: 0 }}>{a.time}</div>
                </div>
              ))}
            </div>

            {/* Lernzeit */}
            <div style={{ ...card, padding: "22px 26px" }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 20, fontFamily: h }}>Lernzeit</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                {[
                  { label: "Diese Woche", value: "6.2h", color: "#0FA4A0", bg: "linear-gradient(135deg, #0FA4A0, #14C4BF)" },
                  { label: "Gesamt", value: "34h", color: "#1B6FC2", bg: "linear-gradient(135deg, #1B6FC2, #2D8FE5)" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "18px 18px", borderRadius: 16, background: s.bg, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -10, right: -10, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ fontSize: 26, fontWeight: 400, color: "white", fontFamily: h, position: "relative" }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 4, position: "relative" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#9A9AAA", padding: "12px 16px", background: "rgba(15,164,160,0.06)", borderRadius: 12 }}>
                ↑ 18% mehr Lernzeit als letzten Monat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AURA CHAT */}
      {chatOpen && (
        <div style={{ position: "fixed", top: 12, right: 12, bottom: 12, width: 380, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRadius: 24, boxShadow: "0 8px 60px rgba(2,35,80,0.12)", zIndex: 999999, display: "flex", flexDirection: "column", overflow: "hidden", border: "1px solid rgba(255,255,255,0.6)" }}>
          <div style={{ background: "linear-gradient(135deg, #022350, #0E3057)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, borderRadius: "24px 24px 0 0" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(200,162,77,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#C8A24D" }}>✦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "white", fontFamily: h }}>Aura</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#14C4BF" }} /> Online
              </div>
            </div>
            <a href="/aura" style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 12, textDecoration: "none" }} title="Vollbild-Chat">↗</a>
            <div onClick={() => setChatOpen(false)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 14 }}>×</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", fontSize: 13, padding: "12px 16px", borderRadius: 16, background: m.role === "bot" ? "rgba(0,0,0,0.03)" : "linear-gradient(135deg, #022350, #0E3057)", color: m.role === "bot" ? "#1A1A2E" : "white", alignSelf: m.role === "bot" ? "flex-start" : "flex-end", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{m.text}</div>
            ))}
            {chatLoading && (
              <div style={{ maxWidth: "85%", fontSize: 13, padding: "12px 16px", borderRadius: 16, background: "rgba(0,0,0,0.03)", color: "#9A9AAA", alignSelf: "flex-start", lineHeight: 1.5, display: "flex", gap: 2 }}>
                <span style={{ animation: "dotPulse 1.4s infinite 0s" }}>.</span>
                <span style={{ animation: "dotPulse 1.4s infinite 0.2s" }}>.</span>
                <span style={{ animation: "dotPulse 1.4s infinite 0.4s" }}>.</span>
                <style>{`@keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }`}</style>
              </div>
            )}
          </div>
          <div style={{ padding: "12px 16px", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8, background: "rgba(0,0,0,0.03)", borderRadius: 14, padding: "4px 4px 4px 16px", alignItems: "center" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Frage Aura..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: b, color: "#1A1A2E", background: "transparent" }} />
              <button onClick={sendMsg} style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0FA4A0, #14C4BF)", border: "none", cursor: "pointer", color: "white", fontSize: 14, flexShrink: 0 }}>→</button>
            </div>
          </div>
        </div>
      )}

      {/* AURA BUTTON */}
      <div onClick={() => setChatOpen(!chatOpen)} style={{ position: "fixed", bottom: 28, right: 28, width: 56, height: 56, borderRadius: 18, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, cursor: "pointer", boxShadow: "0 4px 24px rgba(2,35,80,0.25)", zIndex: 99999, color: "#C8A24D", transition: "transform 0.2s ease, box-shadow 0.2s ease" }}>✦</div>
    </div>
  );
}
