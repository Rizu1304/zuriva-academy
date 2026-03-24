"use client";
import { useState } from "react";

/* ── Design Tokens ─────────────────────────────────────────── */
const F = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif";
const navy = "#022350";
const teal = "#0FA4A0";
const gold = "#C8A24D";
const bg = "#f5f5f7";
const cardShadow = "0 1px 2px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)";
const cardHover = "0 2px 8px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.06)";
const glass = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" } as const;

/* ── Data ──────────────────────────────────────────────────── */
const navItems = [
  { name: "Dashboard", href: "/dashboard", active: true },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade" },
  { name: "Pruefungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate" },
  { name: "Forum", href: "/forum" },
  { name: "Kahoot", href: "#" },
  { name: "KI-Studio", href: "#" },
  { name: "Team", href: "/admin" },
  { name: "Analytics", href: "#" },
];

const stats = [
  { n: "4", l: "Aktive Kurse", t: "+1 diese Woche", up: true, accent: teal },
  { n: "342", l: "Credits total", t: "+24 diese Woche", up: true, accent: gold },
  { n: "34h", l: "Lernzeit total", t: "+3.2h diese Woche", up: true, accent: navy },
  { n: "94%", l: "Quiz-Score", t: "-2% letzte Pruefung", up: false, accent: "#e74c3c" },
];

const courses = [
  { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", tag: "Nicht-Leben", title: "Grundlagen Sachversicherung", p: 68, credits: 8, due: "28 Maer", rating: 4.6, color: "#0a2a4a", icon: "\u{1F6E1}\uFE0F" },
  { img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", tag: "Produktkenntnisse", title: "Lebensversicherungen", p: 33, credits: 12, due: "15 Apr", rating: 4.2, color: teal, icon: "\u2764\uFE0F" },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", tag: "Gen. Faehigkeiten", title: "Beratungskompetenz", p: 85, credits: 10, due: "10 Feb", rating: 4.8, color: "#b8942a", icon: "\u{1F91D}" },
  { img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80", tag: "Compliance", title: "FIDLEG und VAG 2026", p: 12, credits: 6, due: "30 Apr", rating: 3.9, color: "#3b82f6", icon: "\u{1F4CB}" },
];

const activities = [
  { text: "Quiz Sachversicherung bestanden", time: "Heute 09:14", color: teal },
  { text: "Modul 5 Beratungskompetenz abgeschlossen", time: "Heute 08:42", color: gold },
  { text: "Forum Kommentar in Lebensversicherungen", time: "Gestern 16:30", color: "#6366f1" },
  { text: "Kurs FIDLEG & VAG eingeschrieben", time: "Fr 20.03.", color: navy },
  { text: "Zertifikat Trainee Grundausbildung erhalten", time: "Mi 18.03.", color: teal },
];

/* ── Component ─────────────────────────────────────────────── */
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
    setTimeout(() => setMessages(m => [...m, { role: "bot", text: "Danke fuer deine Frage! Ich helfe dir gerne weiter." }]), 800);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: F, background: bg, overflow: "hidden" }}>

      {/* ── SIDEBAR ── */}
      <aside style={{ width: 260, minWidth: 260, ...glass, boxShadow: "1px 0 0 rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", overflowY: "auto", zIndex: 10 }}>
        {/* Logo */}
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.14em", color: navy }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: gold, letterSpacing: "0.04em" }}>academy</span>
        </div>

        {/* Nav: Lernen */}
        <div style={{ padding: "0 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A9AAA", padding: "16px 8px 8px" }}>Lernen</div>
          {navItems.slice(0, 6).map(item => (
            <a key={item.name} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", marginBottom: 2,
              borderRadius: 12, textDecoration: "none", fontSize: 13.5, fontWeight: item.active ? 600 : 400,
              color: item.active ? navy : "#6b7280",
              background: item.active ? "rgba(15,164,160,0.08)" : "transparent",
              transition: "all 0.2s ease",
            }}>
              {item.active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: teal, flexShrink: 0 }} />}
              {item.name}
            </a>
          ))}
        </div>

        {/* Nav: Tools */}
        <div style={{ padding: "0 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A9AAA", padding: "16px 8px 8px" }}>Tools</div>
          {navItems.slice(6, 8).map(item => (
            <a key={item.name} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", marginBottom: 2,
              borderRadius: 12, textDecoration: "none", fontSize: 13.5, fontWeight: 400, color: "#6b7280",
              transition: "all 0.2s ease",
            }}>{item.name}</a>
          ))}
        </div>

        {/* Nav: Admin */}
        <div style={{ padding: "0 16px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A9AAA", padding: "16px 8px 8px" }}>Admin</div>
          {navItems.slice(8).map(item => (
            <a key={item.name} href={item.href} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", marginBottom: 2,
              borderRadius: 12, textDecoration: "none", fontSize: 13.5, fontWeight: 400, color: "#6b7280",
              transition: "all 0.2s ease",
            }}>{item.name}</a>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* User */}
        <div style={{ padding: "16px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 14, background: `linear-gradient(135deg, ${teal}, #0a7a77)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", boxShadow: "0 2px 8px rgba(15,164,160,0.3)" }}>LM</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: navy }}>Laura Meier</div>
            <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div style={{ ...glass, boxShadow: "0 1px 0 rgba(0,0,0,0.04)", height: 64, padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, zIndex: 5 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, color: navy, letterSpacing: "-0.01em" }}>Guten Morgen, Laura</div>
            <div style={{ fontSize: 12.5, color: "#9CA3AF", marginTop: 1 }}>Montag, 24. Maerz 2026 &middot; VBV-Frist in 99 Tagen</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "white", boxShadow: cardShadow, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17, transition: "all 0.2s ease" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: `linear-gradient(135deg, ${teal}, #0a7a77)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white", boxShadow: "0 2px 8px rgba(15,164,160,0.25)" }}>LM</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px 48px" }}>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 20, animation: "zuriva-fade-in 0.5s ease" }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 20, padding: "22px 24px", boxShadow: cardShadow, position: "relative", overflow: "hidden", transition: "box-shadow 0.25s ease, transform 0.25s ease", cursor: "default" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: s.accent, borderRadius: "0 2px 2px 0" }} />
                <div style={{ fontSize: 32, fontWeight: 700, color: navy, lineHeight: 1, letterSpacing: "-0.02em", marginBottom: 4 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>{s.l}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: s.up ? teal : "#e74c3c", display: "flex", alignItems: "center", gap: 4 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d={s.up ? "M6 2.5v7M3 5.5l3-3 3 3" : "M6 9.5v-7M3 6.5l3 3 3-3"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {s.t}
                </div>
              </div>
            ))}
          </div>

          {/* VBV Banner */}
          <div style={{
            background: `linear-gradient(135deg, ${navy} 0%, #0a3a6e 40%, #0d4a80 100%)`,
            borderRadius: 24, padding: "28px 32px", marginBottom: 20,
            display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center",
            position: "relative", overflow: "hidden",
            boxShadow: "0 4px 24px rgba(2,35,80,0.2)",
            animation: "zuriva-slide-up 0.6s ease",
          }}>
            <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(15,164,160,0.08)" }} />
            <div style={{ position: "absolute", bottom: -80, right: 100, width: 240, height: 240, borderRadius: "50%", background: "rgba(200,162,77,0.06)" }} />
            <div style={{ position: "absolute", top: 20, right: 200, width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>VBV-Zertifizierung 2026</div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "white", marginBottom: 16, letterSpacing: "-0.01em" }}>Dein Lernfortschritt</div>
              <div style={{ background: "rgba(255,255,255,0.1)", height: 6, borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
                <div style={{ height: 6, borderRadius: 3, background: `linear-gradient(90deg, ${teal}, #0dc4bf)`, width: "57%", transition: "width 1s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>Ziel: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>600 Credits</span></div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>Frist: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>30. Juni 2026</span></div>
              </div>
            </div>
            <div style={{ textAlign: "right", position: "relative" }}>
              <div style={{ fontSize: 56, fontWeight: 700, color: gold, lineHeight: 1, letterSpacing: "-0.03em" }}>342</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>/ 600 Credits</div>
            </div>
          </div>

          {/* 2 Column Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>

            {/* Courses */}
            <div style={{ animation: "zuriva-fade-in 0.7s ease" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: navy, letterSpacing: "-0.01em" }}>Aktive Lernprogramme</div>
                <a href="/courses" style={{ fontSize: 12.5, color: "#9CA3AF", fontWeight: 500, textDecoration: "none", border: "1px solid #e5e7eb", borderRadius: 24, padding: "6px 16px", transition: "all 0.2s ease" }}>Alle Kurse &rarr;</a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
                {courses.map((c, i) => (
                  <div key={i} style={{ borderRadius: 20, overflow: "hidden", background: "white", boxShadow: cardShadow, cursor: "pointer", transition: "box-shadow 0.3s ease, transform 0.3s ease" }}>
                    {/* Header */}
                    <div style={{ height: 140, position: "relative", overflow: "hidden", background: c.color }}>
                      <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, opacity: 0.2, mixBlendMode: "luminosity" }} />
                      <div style={{ position: "absolute", top: -20, left: -20, width: 100, height: 100, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.1)" }} />
                      <div style={{ position: "absolute", bottom: -30, right: -10, width: 120, height: 120, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.06)" }} />
                      <div style={{ position: "absolute", top: 30, right: 40, width: 60, height: 60, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)" }} />
                      <div style={{ position: "absolute", top: 10, right: 10, ...glass, background: "rgba(255,255,255,0.18)", color: "white", fontSize: 10, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{c.tag}</div>
                      {c.p >= 80 && <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(231,76,60,0.9)", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>Fast fertig!</div>}
                      <div style={{ position: "absolute", bottom: 14, left: 16, fontSize: 30, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}>{c.icon}</div>
                    </div>
                    {/* Body */}
                    <div style={{ padding: "16px 16px 18px" }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: navy, marginBottom: 8, lineHeight: 1.35, letterSpacing: "-0.01em" }}>{c.title}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>Faellig: {c.due}</span>
                        <span style={{ fontSize: 11.5, color: "#d1d5db" }}>&middot;</span>
                        <span style={{ fontSize: 11.5, color: gold, fontWeight: 600 }}>{c.rating}</span>
                      </div>
                      <div style={{ background: "#f3f4f6", height: 5, borderRadius: 3, marginBottom: 10, overflow: "hidden" }}>
                        <div style={{ height: 5, borderRadius: 3, background: `linear-gradient(90deg, ${c.color}, ${c.color}dd)`, width: `${c.p}%`, transition: "width 0.6s ease" }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: navy }}>{c.p}%</span>
                        <a href="/courses" style={{ fontSize: 12, color: teal, fontWeight: 600, textDecoration: "none" }}>Weiterlernen &rarr;</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div style={{ background: "white", borderRadius: 20, padding: "22px 24px", boxShadow: cardShadow, animation: "zuriva-fade-in 0.8s ease" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: navy, marginBottom: 18, letterSpacing: "-0.01em" }}>Letzte Aktivitaeten</div>
              {activities.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: i < activities.length - 1 ? "1px solid #f3f4f6" : "none", alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 5, flexShrink: 0, boxShadow: `0 0 0 3px ${a.color}18` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.45, fontWeight: 450 }}>{a.text}</div>
                    <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 3 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── AURA CHAT ── */}
      {chatOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: 420, height: "100vh", ...glass, background: "rgba(255,255,255,0.92)", boxShadow: "-12px 0 48px rgba(2,35,80,0.12)", zIndex: 999999, display: "flex", flexDirection: "column", animation: "zuriva-scale-in 0.25s ease" }}>
          <div style={{ background: `linear-gradient(135deg, ${navy}, #0a3a6e)`, padding: "22px 24px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 16, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "white", letterSpacing: "-0.01em" }}>Aura</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} /> Online
              </div>
            </div>
            <div onClick={() => setChatOpen(false)} style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l12 12M13 1L1 13"/></svg>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                maxWidth: "85%", fontSize: 13.5, padding: "12px 16px", borderRadius: 18, lineHeight: 1.5,
                background: m.role === "bot" ? "#f3f4f6" : `linear-gradient(135deg, ${navy}, #0a3a6e)`,
                color: m.role === "bot" ? "#374151" : "white",
                alignSelf: m.role === "bot" ? "flex-start" : "flex-end",
                borderBottomLeftRadius: m.role === "bot" ? 6 : 18,
                borderBottomRightRadius: m.role === "bot" ? 18 : 6,
              }}>{m.text}</div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #f3f4f6", padding: "16px 20px", display: "flex", gap: 10, flexShrink: 0, background: "white" }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Frage Aura..." style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: F, color: "#374151" }} />
            <button onClick={sendMsg} style={{ width: 38, height: 38, borderRadius: 12, background: `linear-gradient(135deg, ${teal}, #0a7a77)`, border: "none", cursor: "pointer", color: "white", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(15,164,160,0.3)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2L7 9"/><path d="M14 2l-5 12-2-5-5-2z"/></svg>
            </button>
          </div>
        </div>
      )}

      {/* Aura Button */}
      <div onClick={() => setChatOpen(!chatOpen)} style={{
        position: "fixed", bottom: 28, right: 28, width: 60, height: 60, borderRadius: 20,
        background: `linear-gradient(135deg, ${navy}, #0a3a6e)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", boxShadow: "0 4px 20px rgba(2,35,80,0.3), 0 0 0 0 rgba(15,164,160,0)",
        zIndex: 99999, transition: "all 0.3s ease",
        animation: "zuriva-glow 3s ease-in-out infinite",
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>
      </div>
    </div>
  );
}
