"use client";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  { value: "4", label: "Aktive Kurse", trend: "+1 diese Woche", up: true, icon: BookIcon, color: "#0FA4A0" },
  { value: "342", label: "Credits total", trend: "+24 diese Woche", up: true, icon: StarIcon, color: "#D4A843" },
  { value: "34h", label: "Lernzeit total", trend: "+3.2h diese Woche", up: true, icon: ClockIcon, color: "#818CF8" },
  { value: "94%", label: "Quiz-Score", trend: "-2% letzte Pruefung", up: false, icon: TrophyIcon, color: "#F472B6" },
];

const courses = [
  { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", tag: "Nicht-Leben", title: "Grundlagen Sachversicherung", p: 68, credits: 8, color: "#0FA4A0" },
  { img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", tag: "Leben", title: "Lebensversicherungen", p: 33, credits: 12, color: "#D4A843" },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", tag: "Faehigkeiten", title: "Beratungskompetenz", p: 85, credits: 10, color: "#818CF8" },
];

const activities = [
  { text: "Quiz Sachversicherung bestanden", time: "Heute 09:14", icon: CheckCircleIcon, color: "#0FA4A0" },
  { text: "Modul 5 Beratungskompetenz abgeschlossen", time: "Heute 08:42", icon: BookmarkIcon, color: "#D4A843" },
  { text: "Forum Kommentar in Lebensversicherungen", time: "Gestern 16:30", icon: ChatIcon, color: "#818CF8" },
  { text: "Kurs FIDLEG & VAG eingeschrieben", time: "Fr 20.03.", icon: PlusCircleIcon, color: "#F472B6" },
  { text: "Zertifikat Trainee Grundausbildung erhalten", time: "Mi 18.03.", icon: AwardIcon, color: "#0FA4A0" },
];

const leaderboard = [
  { name: "Anna Schneider", credits: 580, avatar: "AS", rank: 1 },
  { name: "Thomas Mueller", credits: 428, avatar: "TM", rank: 2 },
  { name: "Laura Meier", credits: 342, avatar: "LM", rank: 3, you: true },
  { name: "Petra Koch", credits: 276, avatar: "PK", rank: 4 },
];

export default function Dashboard() {
  return (
    <DashboardLayout title="Guten Morgen, Laura" subtitle="Mittwoch, 25. Maerz 2026 · VBV-Frist in 97 Tagen">
      {/* STATS ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} className={`glass-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "22px 24px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -15, right: -15, width: 70, height: 70, borderRadius: "50%", background: `${s.color}10`, opacity: 0.6 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: 14, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <s.icon color={s.color} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, background: s.up ? "rgba(15,164,160,0.1)" : "rgba(239,68,68,0.1)", color: s.up ? "#5EEAD4" : "#ef4444", display: "flex", alignItems: "center", gap: 4 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: s.up ? "none" : "rotate(180deg)" }}>
                  <path d="m18 15-6-6-6 6" />
                </svg>
                {s.trend}
              </div>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "white", lineHeight: 1, marginBottom: 4, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* VBV CERTIFICATION BANNER */}
      <div className="animate-fade-in-up stagger-5" style={{ borderRadius: 24, padding: "28px 32px", marginBottom: 20, position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(15,164,160,0.15), rgba(212,168,67,0.08))", border: "1px solid rgba(15,164,160,0.15)" }}>
        {/* Decorative elements */}
        <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "rgba(15,164,160,0.08)" }} />
        <div style={{ position: "absolute", bottom: -40, right: 100, width: 120, height: 120, borderRadius: "50%", background: "rgba(212,168,67,0.06)" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", position: "relative" }}>
          <div>
            <div className="gold-gradient-text" style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
              VBV-Zertifizierung 2026
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.01em" }}>
              Dein Lernfortschritt
            </div>
            <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,0.08)", marginBottom: 12, maxWidth: 400 }}>
              <div style={{ height: 6, borderRadius: 6, background: "linear-gradient(90deg, #0FA4A0, #5EEAD4)", width: "57%", transition: "width 1.5s ease", boxShadow: "0 0 16px rgba(15,164,160,0.4)" }} />
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>Ziel: <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>600 Credits</span></div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>Frist: <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>30. Juni 2026</span></div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)" }}>Verbleibend: <span style={{ color: "#5EEAD4", fontWeight: 600 }}>258 Credits</span></div>
            </div>
          </div>

          {/* Circular Progress */}
          <div style={{ position: "relative", width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="50" fill="none"
                stroke="url(#progressGradient)" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="314"
                strokeDashoffset="135"
                className="progress-ring-circle"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0FA4A0" />
                  <stop offset="100%" stopColor="#5EEAD4" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "white", lineHeight: 1 }}>57</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>%</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID: Courses + Sidebar */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* LEFT: Courses */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>Aktuelle Kurse</div>
            <a href="/courses" style={{ fontSize: 12.5, color: "#5EEAD4", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Alle ansehen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14 }}>
            {courses.map((c, i) => (
              <div key={i} className={`animate-scale-in stagger-${i + 1}`} style={{ borderRadius: 20, overflow: "hidden", position: "relative", minHeight: 220, cursor: "pointer", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, filter: "brightness(0.3) saturate(0.8)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,14,39,0.95) 0%, rgba(10,14,39,0.3) 50%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "14px 16px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)" }}>{c.tag}</span>
                    <span className="gold-gradient-text" style={{ fontSize: 14, fontWeight: 800 }}>{c.credits} Cr</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "white", marginBottom: 10, lineHeight: 1.35 }}>{c.title}</div>
                    <div style={{ background: "rgba(255,255,255,0.1)", height: 4, borderRadius: 4, marginBottom: 6 }}>
                      <div style={{ height: 4, borderRadius: 4, background: `linear-gradient(90deg, ${c.color}, ${c.color}aa)`, width: `${c.p}%`, boxShadow: `0 0 10px ${c.color}40` }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>
                      <span>Fortschritt</span><span style={{ color: "white", fontWeight: 700 }}>{c.p}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Exams */}
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 16, letterSpacing: "-0.01em" }}>Naechste Pruefungen</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="glass-card animate-fade-in-up stagger-4" style={{ padding: "20px 22px", borderLeft: "3px solid #ef4444" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Sachversicherung Modul 3</div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>Dringend</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Grundlagen Sachversicherung</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Frist: <span style={{ color: "#ef4444", fontWeight: 600 }}>28.03.2026</span></span>
                  <button className="premium-btn" style={{ padding: "7px 16px", fontSize: 12 }}>Starten</button>
                </div>
              </div>
              <div className="glass-card animate-fade-in-up stagger-5" style={{ padding: "20px 22px", borderLeft: "3px solid #D4A843" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "white" }}>Lebensversicherungen</div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20, background: "rgba(212,168,67,0.15)", color: "#D4A843" }}>15.04.</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>Abschlusspruefung</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Bestehensgrenze: <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>75%</span></span>
                  <button style={{ padding: "7px 16px", fontSize: 12, borderRadius: 12, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontWeight: 600, cursor: "pointer" }}>Vorbereiten</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Activities */}
          <div className="glass-card-static animate-fade-in-up stagger-3" style={{ padding: "22px 20px" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white", marginBottom: 16 }}>Letzte Aktivitaeten</div>
            {activities.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < activities.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "flex-start" }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: `${a.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <a.icon color={a.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.75)", lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="glass-card-static animate-fade-in-up stagger-5" style={{ padding: "22px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Rangliste</div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Credits</span>
            </div>
            {leaderboard.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, borderBottom: i < leaderboard.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", alignItems: "center", background: p.you ? "rgba(15,164,160,0.06)" : "transparent", margin: p.you ? "0 -20px" : "0", padding: p.you ? "10px 20px" : "10px 0", borderRadius: p.you ? 12 : 0 }}>
                <div style={{ width: 24, fontSize: 13, fontWeight: 800, color: i === 0 ? "#D4A843" : i === 1 ? "rgba(255,255,255,0.5)" : i === 2 ? "#CD7F32" : "rgba(255,255,255,0.3)", textAlign: "center" }}>
                  {i === 0 ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#D4A843" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  ) : p.rank}
                </div>
                <div style={{ width: 34, height: 34, borderRadius: 12, background: p.you ? "linear-gradient(135deg, #0FA4A0, #0d8c89)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: p.you ? "white" : "rgba(255,255,255,0.5)", border: p.you ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
                  {p.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: p.you ? 700 : 500, color: p.you ? "#5EEAD4" : "rgba(255,255,255,0.7)" }}>
                    {p.name} {p.you && <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>(Du)</span>}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: p.you ? "#5EEAD4" : "rgba(255,255,255,0.5)" }}>{p.credits}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

/* ========== ICON COMPONENTS ========== */

function BookIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
}
function StarIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}
function ClockIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>;
}
function TrophyIcon({ color }: { color: string }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>;
}
function CheckCircleIcon({ color }: { color: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>;
}
function BookmarkIcon({ color }: { color: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" /></svg>;
}
function ChatIcon({ color }: { color: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
function PlusCircleIcon({ color }: { color: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>;
}
function AwardIcon({ color }: { color: string }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>;
}
