"use client";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const glass = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 24px rgba(2,35,80,0.04)",
} as const;

const courses = [
  {
    title: "Grundlagen Sachversicherung",
    sub: "Nicht-Leben",
    progress: 68,
    due: "28 Mär",
    score: 4.6,
    gradient: "linear-gradient(135deg, #022350 0%, #0E3057 60%, #1B6FC2 100%)",
    pattern: (
      <svg viewBox="0 0 300 180" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
        <circle cx="240" cy="30" r="80" fill="white" />
        <circle cx="260" cy="50" r="50" fill="white" />
        <path d="M150,90 L180,40 L210,90 Z" fill="none" stroke="white" strokeWidth="2" />
        <rect x="30" y="120" width="60" height="40" rx="8" fill="white" opacity="0.5" />
        <circle cx="60" cy="70" r="25" fill="none" stroke="white" strokeWidth="1.5" />
        <path d="M60,55 L60,85 M45,70 L75,70" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    icon: "🛡️",
  },
  {
    title: "Lebensversicherungen",
    sub: "Produktkenntnisse",
    progress: 33,
    due: "15 Apr",
    score: 4.2,
    gradient: "linear-gradient(135deg, #0FA4A0 0%, #0d8e8a 50%, #14C4BF 100%)",
    pattern: (
      <svg viewBox="0 0 300 180" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}>
        <circle cx="80" cy="90" r="60" fill="none" stroke="white" strokeWidth="1.5" />
        <circle cx="80" cy="90" r="40" fill="none" stroke="white" strokeWidth="1" />
        <circle cx="80" cy="90" r="20" fill="white" opacity="0.3" />
        <circle cx="220" cy="50" r="45" fill="white" opacity="0.15" />
        <circle cx="200" cy="130" r="30" fill="white" opacity="0.1" />
        <circle cx="260" cy="100" r="20" fill="white" opacity="0.2" />
      </svg>
    ),
    icon: "❤️",
  },
  {
    title: "Beratungskompetenz",
    sub: "Gen. Fähigkeiten",
    progress: 85,
    due: "10 Feb",
    score: 4.8,
    gradient: "linear-gradient(135deg, #8B6914 0%, #C8A24D 50%, #E0B95F 100%)",
    pattern: (
      <svg viewBox="0 0 300 180" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
        <circle cx="60" cy="40" r="5" fill="white" />
        <circle cx="140" cy="60" r="5" fill="white" />
        <circle cx="100" cy="120" r="5" fill="white" />
        <circle cx="200" cy="40" r="5" fill="white" />
        <circle cx="240" cy="100" r="5" fill="white" />
        <circle cx="180" cy="140" r="5" fill="white" />
        <line x1="60" y1="40" x2="140" y2="60" stroke="white" strokeWidth="1" />
        <line x1="140" y1="60" x2="100" y2="120" stroke="white" strokeWidth="1" />
        <line x1="100" y1="120" x2="180" y2="140" stroke="white" strokeWidth="1" />
        <line x1="140" y1="60" x2="200" y2="40" stroke="white" strokeWidth="1" />
        <line x1="200" y1="40" x2="240" y2="100" stroke="white" strokeWidth="1" />
        <line x1="240" y1="100" x2="180" y2="140" stroke="white" strokeWidth="1" />
        <line x1="60" y1="40" x2="100" y2="120" stroke="white" strokeWidth="0.5" opacity="0.5" />
        <line x1="200" y1="40" x2="180" y2="140" stroke="white" strokeWidth="0.5" opacity="0.5" />
      </svg>
    ),
    icon: "🤝",
  },
  {
    title: "FIDLEG und VAG 2026",
    sub: "Compliance",
    progress: 12,
    due: "30 Apr",
    score: 3.9,
    gradient: "linear-gradient(135deg, #1B6FC2 0%, #2D8FE5 50%, #4AA3F0 100%)",
    pattern: (
      <svg viewBox="0 0 300 180" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12 }}>
        <rect x="40" y="30" width="70" height="90" rx="6" fill="none" stroke="white" strokeWidth="1.5" />
        <line x1="55" y1="55" x2="95" y2="55" stroke="white" strokeWidth="1.5" />
        <line x1="55" y1="70" x2="95" y2="70" stroke="white" strokeWidth="1.5" />
        <line x1="55" y1="85" x2="80" y2="85" stroke="white" strokeWidth="1.5" />
        <rect x="180" y="50" width="80" height="100" rx="6" fill="white" opacity="0.1" />
        <path d="M200,80 L215,95 L240,70" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="150" cy="140" r="20" fill="white" opacity="0.08" />
      </svg>
    ),
    icon: "📋",
  },
];

const stats = [
  { n: "4", l: "Aktive Kurse", trend: "+1", up: true, color: "#022350" },
  { n: "342", l: "Credits total", trend: "+24", up: true, color: "#0FA4A0" },
  { n: "34h", l: "Lernzeit", trend: "+3.2h", up: true, color: "#C8A24D" },
  { n: "94%", l: "Quiz-Score", trend: "-2%", up: false, color: "#1B6FC2" },
];

const activities = [
  { text: "Quiz Sachversicherung bestanden", time: "09:14", color: "#0FA4A0", icon: "✓" },
  { text: "Modul 5 abgeschlossen", time: "08:42", color: "#C8A24D", icon: "★" },
  { text: "Forum-Beitrag erstellt", time: "Gestern", color: "#1B6FC2", icon: "💬" },
  { text: "Neuer Kurs eingeschrieben", time: "Fr 20.03.", color: "#022350", icon: "+" },
];

const teamPerf = [
  { dept: "Nicht-Leben", score: 4.6, pct: 92, color: "#0FA4A0" },
  { dept: "Leben", score: 4.2, pct: 84, color: "#1B6FC2" },
  { dept: "Compliance", score: 3.9, pct: 78, color: "#C8A24D" },
  { dept: "Gen. Fähigkeiten", score: 3.5, pct: 70, color: "#E0B95F" },
];

export default function Dashboard() {
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
          {[
            { name: "Dashboard", href: "/dashboard", active: true },
            { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade" },
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{
              display: "block", padding: "10px 14px", margin: "2px 0",
              color: item.active ? "#022350" : "#4A4A5A",
              background: item.active ? "rgba(255,255,255,0.8)" : "transparent",
              borderRadius: 12,
              fontWeight: item.active ? 600 : 400, fontSize: 13.5, textDecoration: "none",
              boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none",
            }}>{item.name}</a>
          ))}
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "20px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Lernpfadeditor", href: "/admin/lernpfade" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Kahoot-Editor", href: "/admin/kahoot" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{
              display: "block", padding: "10px 14px", margin: "2px 0",
              color: "#4A4A5A", background: "transparent", borderRadius: 12,
              fontSize: 13.5, textDecoration: "none",
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
            <div style={{ ...glass, padding: "9px 18px", borderRadius: 14, display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <span style={{ fontSize: 12, color: "#9A9AAA" }}>Suchen...</span>
              <span style={{ fontSize: 9, color: "#9A9AAA", background: "rgba(0,0,0,0.04)", padding: "3px 7px", borderRadius: 6 }}>⌘K</span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 40px" }}>

          {/* HERO BANNER */}
          <div style={{ borderRadius: 24, padding: "36px 40px", marginBottom: 24, background: "linear-gradient(135deg, #022350 0%, #0E3057 40%, #1B6FC2 100%)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, right: -40, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,164,160,0.25) 0%, transparent 70%)" }} />
            <div style={{ position: "absolute", bottom: -60, left: "25%", width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,162,77,0.15) 0%, transparent 70%)" }} />
            <svg viewBox="0 0 800 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 12 }}>VBV-Zertifizierung 2026</div>
                <div style={{ fontSize: 28, fontWeight: 400, color: "white", fontFamily: h, marginBottom: 8, lineHeight: 1.2 }}>Dein Lernfortschritt</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 20 }}>Du bist auf einem guten Weg — 57% abgeschlossen</div>
                <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.1)", marginBottom: 12, maxWidth: 420 }}>
                  <div style={{ height: 6, borderRadius: 3, background: "linear-gradient(90deg, #0FA4A0, #14C4BF)", width: "57%" }} />
                </div>
                <div style={{ display: "flex", gap: 28 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Ziel: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>600 Credits</span></span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Erreicht: <span style={{ color: "#C8A24D", fontWeight: 600 }}>342 Credits</span></span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Frist: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>30. Juni 2026</span></span>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ position: "relative", width: 130, height: 130 }}>
                  <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                    <circle cx="60" cy="60" r="50" fill="none" stroke="url(#progGrad)" strokeWidth="8" strokeDasharray={`${0.57 * 314} ${314}`} strokeLinecap="round" />
                    <defs><linearGradient id="progGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0FA4A0" /><stop offset="100%" stopColor="#C8A24D" /></linearGradient></defs>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 32, fontWeight: 400, color: "#C8A24D", fontFamily: h }}>342</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>von 600</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* STATS ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ ...glass, padding: "22px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -12, right: -12, width: 64, height: 64, borderRadius: "50%", background: s.color, opacity: 0.06 }} />
                <div style={{ fontSize: 32, fontWeight: 400, color: "#022350", fontFamily: h, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "#4A4A5A", marginTop: 6 }}>{s.l}</div>
                <div style={{ fontSize: 11, fontWeight: 600, marginTop: 10, color: s.up ? "#0FA4A0" : "#C0392B", display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 9 }}>{s.up ? "↑" : "↓"}</span> {s.trend} diese Woche
                </div>
              </div>
            ))}
          </div>

          {/* COURSE CARDS WITH VISUAL HEADERS */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 18, fontWeight: 500, color: "#022350", fontFamily: h }}>Aktive Lernprogramme</div>
              <a href="/courses" style={{ fontSize: 12, color: "#9A9AAA", textDecoration: "none", padding: "5px 12px", background: "rgba(0,0,0,0.03)", borderRadius: 8 }}>Alle Kurse →</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {courses.map((c, i) => (
                <div key={i} style={{ ...glass, overflow: "hidden", cursor: "pointer" }}>
                  {/* Visual Header / Image Area */}
                  <div style={{ height: 140, background: c.gradient, position: "relative", overflow: "hidden" }}>
                    {c.pattern}
                    <div style={{ position: "absolute", bottom: 12, left: 16 }}>
                      <span style={{ fontSize: 28, filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))" }}>{c.icon}</span>
                    </div>
                    <div style={{ position: "absolute", top: 12, right: 12 }}>
                      <span style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 600, color: "white" }}>{c.sub}</span>
                    </div>
                    {c.progress >= 80 && (
                      <div style={{ position: "absolute", top: 12, left: 12 }}>
                        <span style={{ background: "rgba(15,164,160,0.9)", padding: "3px 8px", borderRadius: 20, fontSize: 9, fontWeight: 700, color: "white" }}>Fast fertig!</span>
                      </div>
                    )}
                  </div>
                  {/* Card Content */}
                  <div style={{ padding: "16px 18px 18px" }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 4, lineHeight: 1.3 }}>{c.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
                      <span style={{ fontSize: 11, color: "#9A9AAA" }}>Fällig: {c.due}</span>
                      <span style={{ fontSize: 11, color: "#9A9AAA" }}>·</span>
                      <span style={{ fontSize: 11, color: "#C8A24D" }}>⭐ {c.score}</span>
                    </div>
                    <div style={{ height: 5, borderRadius: 3, background: "rgba(0,0,0,0.05)", marginBottom: 8 }}>
                      <div style={{ height: 5, borderRadius: 3, background: c.gradient, width: c.progress + "%" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#022350" }}>{c.progress}%</span>
                      <span style={{ fontSize: 11, color: "#0FA4A0", fontWeight: 500, cursor: "pointer" }}>Weiterlernen →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>

            {/* Activities */}
            <div style={{ ...glass, padding: "22px 26px" }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 16, fontFamily: h }}>Letzte Aktivitäten</div>
              {activities.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < activities.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none", alignItems: "center" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${a.color}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: a.color, flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, color: "#1A1A2E" }}>{a.text}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#9A9AAA", flexShrink: 0 }}>{a.time}</div>
                </div>
              ))}
            </div>

            {/* Team Performance */}
            <div style={{ ...glass, padding: "22px 26px" }}>
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
                    <div style={{ height: 5, borderRadius: 3, background: `linear-gradient(90deg, ${t.color}, ${t.color}88)`, width: t.pct + "%" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Lernzeit */}
            <div style={{ ...glass, padding: "22px 26px" }}>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#022350", marginBottom: 20, fontFamily: h }}>Lernzeit</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                {[
                  { label: "Diese Woche", value: "6.2h", bg: "linear-gradient(135deg, #0FA4A0, #14C4BF)" },
                  { label: "Gesamt", value: "34h", bg: "linear-gradient(135deg, #1B6FC2, #2D8FE5)" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "18px 16px", borderRadius: 16, background: s.bg, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: -10, right: -10, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ fontSize: 26, fontWeight: 400, color: "white", fontFamily: h, position: "relative" }}>{s.value}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", marginTop: 4, position: "relative" }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#0FA4A0", padding: "12px 16px", background: "rgba(15,164,160,0.06)", borderRadius: 12, fontWeight: 500 }}>
                ↑ 18% mehr als letzten Monat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
