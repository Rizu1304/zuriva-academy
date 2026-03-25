"use client";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  { value: "4", label: "Aktive Kurse", trend: "+1 diese Woche", up: true, color: "#0FA4A0" },
  { value: "342", label: "Credits total", trend: "+24 diese Woche", up: true, color: "#C8A24D" },
  { value: "34h", label: "Lernzeit total", trend: "+3.2h diese Woche", up: true, color: "#1B6FC2" },
  { value: "94%", label: "Quiz-Score", trend: "-2% letzte Pruefung", up: false, color: "#C0392B" },
];

const courses = [
  { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", tag: "Nicht-Leben", title: "Grundlagen Sachversicherung", p: 68, credits: 8 },
  { img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", tag: "Leben", title: "Lebensversicherungen", p: 33, credits: 12 },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", tag: "Faehigkeiten", title: "Beratungskompetenz", p: 85, credits: 10 },
];

const activities = [
  { text: "Quiz Sachversicherung bestanden", time: "Heute 09:14", color: "#0FA4A0" },
  { text: "Modul 5 Beratungskompetenz abgeschlossen", time: "Heute 08:42", color: "#C8A24D" },
  { text: "Forum Kommentar in Lebensversicherungen", time: "Gestern 16:30", color: "#1B6FC2" },
  { text: "Kurs FIDLEG & VAG eingeschrieben", time: "Fr 20.03.", color: "#022350" },
  { text: "Zertifikat Trainee Grundausbildung erhalten", time: "Mi 18.03.", color: "#0FA4A0" },
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

      {/* STATS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {stats.map((s, i) => (
          <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "22px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}0D`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: s.color }} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: s.up ? "#0FA4A0" : "#C0392B", display: "flex", alignItems: "center", gap: 3 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: s.up ? "none" : "rotate(180deg)" }}><path d="m18 15-6-6-6 6" /></svg>
                {s.trend}
              </div>
            </div>
            <div className="font-heading" style={{ fontSize: 36, fontWeight: 500, color: "#022350", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "#9A9AAA" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* VBV BANNER */}
      <div className="z-card-navy animate-fade-in-up stagger-5" style={{ padding: "28px 32px", marginBottom: 20 }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(15,164,160,0.08)" }} />
        <div style={{ position: "absolute", bottom: -30, right: 120, width: 100, height: 100, borderRadius: "50%", background: "rgba(200,162,77,0.06)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 8 }}>VBV-Zertifizierung 2026</div>
            <div className="font-heading" style={{ fontSize: 26, fontWeight: 500, color: "white", marginBottom: 16 }}>Dein Lernfortschritt</div>
            <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.1)", marginBottom: 12, maxWidth: 400 }}>
              <div style={{ height: 4, borderRadius: 4, background: "linear-gradient(90deg, #0FA4A0, #14C4BF)", width: "57%" }} />
            </div>
            <div style={{ display: "flex", gap: 24 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Ziel: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>600 Credits</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Frist: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>30. Juni 2026</span></div>
            </div>
          </div>
          {/* Circular progress */}
          <div style={{ position: "relative", width: 110, height: 110 }}>
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
              <circle cx="55" cy="55" r="46" fill="none" stroke="#0FA4A0" strokeWidth="6" strokeLinecap="round" strokeDasharray="289" strokeDashoffset="124" style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1.5s ease" }} />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="font-heading" style={{ fontSize: 32, fontWeight: 500, color: "white", lineHeight: 1 }}>57</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>%</div>
            </div>
          </div>
        </div>
      </div>

      {/* COURSES + SIDEBAR */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 330px", gap: 18 }}>
        <div>
          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div className="font-heading" style={{ fontSize: 22, fontWeight: 500, color: "#022350" }}>Aktuelle Kurse</div>
            <a href="/courses" style={{ fontSize: 12.5, color: "#0FA4A0", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              Alle ansehen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>
          </div>

          {/* Course cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14 }}>
            {courses.map((c, i) => (
              <div key={i} className={`animate-scale-in stagger-${i + 1}`} style={{ borderRadius: 14, overflow: "hidden", position: "relative", minHeight: 200, cursor: "pointer", border: "1px solid #E8E4DE" }}>
                <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, filter: "brightness(0.4) saturate(0.85)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,35,80,0.9) 0%, rgba(2,35,80,0.2) 50%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "14px 16px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ background: "rgba(255,255,255,0.15)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 20 }}>{c.tag}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#C8A24D" }}>{c.credits} Cr</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "white", marginBottom: 8, lineHeight: 1.35 }}>{c.title}</div>
                    <div style={{ background: "rgba(255,255,255,0.15)", height: 3, borderRadius: 2, marginBottom: 4 }}>
                      <div style={{ height: 3, borderRadius: 2, background: "#0FA4A0", width: `${c.p}%` }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}>
                      <span>Fortschritt</span><span style={{ color: "white", fontWeight: 600 }}>{c.p}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Exams */}
          <div style={{ marginTop: 20 }}>
            <div className="font-heading" style={{ fontSize: 22, fontWeight: 500, color: "#022350", marginBottom: 16 }}>Naechste Pruefungen</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="z-card animate-fade-in-up stagger-6" style={{ padding: "20px 22px", borderLeft: "3px solid #C0392B" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>Sachversicherung Modul 3</div>
                  <span className="z-badge" style={{ background: "rgba(192,57,43,0.08)", color: "#C0392B" }}>Dringend</span>
                </div>
                <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 12 }}>Grundlagen Sachversicherung</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Frist: <span style={{ color: "#C0392B", fontWeight: 600 }}>28.03.2026</span></span>
                  <button className="z-btn z-btn-primary" style={{ padding: "7px 16px", fontSize: 12 }}>Starten</button>
                </div>
              </div>
              <div className="z-card animate-fade-in-up stagger-7" style={{ padding: "20px 22px", borderLeft: "3px solid #C8A24D" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>Lebensversicherungen</div>
                  <span className="z-badge" style={{ background: "rgba(200,162,77,0.1)", color: "#C8A24D" }}>15.04.</span>
                </div>
                <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 12 }}>Abschlusspruefung</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Bestehensgrenze: <span style={{ fontWeight: 600 }}>75%</span></span>
                  <button className="z-btn z-btn-ghost" style={{ padding: "7px 16px", fontSize: 12 }}>Vorbereiten</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Activities */}
          <div className="z-card-static animate-fade-in-up stagger-3" style={{ padding: "22px 20px" }}>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 500, color: "#022350", marginBottom: 14 }}>Letzte Aktivitaeten</div>
            {activities.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: i < activities.length - 1 ? "1px solid #F0ECE6" : "none", alignItems: "flex-start" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, marginTop: 6, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: "#1A1A2E", lineHeight: 1.45 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="z-card-static animate-fade-in-up stagger-5" style={{ padding: "22px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div className="font-heading" style={{ fontSize: 18, fontWeight: 500, color: "#022350" }}>Rangliste</div>
              <span style={{ fontSize: 10.5, color: "#9A9AAA", fontWeight: 500 }}>Credits</span>
            </div>
            {leaderboard.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: p.you ? "9px 12px" : "9px 0", background: p.you ? "rgba(15,164,160,0.04)" : "transparent", margin: p.you ? "0 -12px" : "0", borderRadius: p.you ? 10 : 0, borderBottom: i < leaderboard.length - 1 ? "1px solid #F0ECE6" : "none" }}>
                <div style={{ width: 20, fontSize: 12, fontWeight: 700, color: i === 0 ? "#C8A24D" : "#9A9AAA", textAlign: "center" }}>{p.rank}</div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: p.you ? "#022350" : "#F0ECE6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: p.you ? "white" : "#4A4A5A" }}>{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: p.you ? 600 : 400, color: p.you ? "#022350" : "#4A4A5A" }}>
                    {p.name} {p.you && <span style={{ fontSize: 10, color: "#9A9AAA" }}>(Du)</span>}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: p.you ? "#0FA4A0" : "#4A4A5A" }}>{p.credits}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
