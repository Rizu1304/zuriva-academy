"use client";
import DashboardLayout from "@/components/DashboardLayout";
import { Hash, MessageSquare } from "lucide-react";

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
      <div className="z-grid-4" style={{ marginBottom: 24 }}>
        {stats.map((s, i) => (
          <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "26px 26px 24px", position: "relative", overflow: "hidden" }}>
            {/* Gold accent top line */}
            <div style={{ position: "absolute", top: 0, left: 24, right: 24, height: 2, background: `linear-gradient(90deg, ${s.color}, transparent)`, opacity: 0.4 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: s.up ? "#0FA4A0" : "#C0392B", display: "flex", alignItems: "center", gap: 3, letterSpacing: "0.02em" }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: s.up ? "none" : "rotate(180deg)" }}><path d="m18 15-6-6-6 6" /></svg>
                {s.trend}
              </div>
            </div>
            <div className="font-heading" style={{ fontSize: 42, fontWeight: 400, color: "#022350", lineHeight: 1, marginBottom: 6, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "#9A9AAA", fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* VBV CERTIFICATION BANNER */}
      <div className="z-glass-card animate-fade-in-up stagger-5" style={{ padding: "36px 40px", marginBottom: 28 }}>
        {/* Decorative orbs */}
        <div style={{ position: "absolute", top: -50, right: -50, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,162,77,0.08), transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,164,160,0.06), transparent 70%)" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center", position: "relative" }}>
          <div>
            <div className="z-gold-line" style={{ marginBottom: 14 }} />
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 10 }}>VBV-Zertifizierung 2026</div>
            <div className="font-heading" style={{ fontSize: 30, fontWeight: 400, color: "white", marginBottom: 20, letterSpacing: "-0.01em" }}>Dein Lernfortschritt</div>
            <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)", marginBottom: 14, maxWidth: 420 }}>
              <div style={{ height: 4, borderRadius: 4, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", width: "57%" }} />
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Ziel: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>600 Credits</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Frist: <span style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>30. Juni 2026</span></div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Verbleibend: <span style={{ color: "#C8A24D", fontWeight: 600 }}>258 Credits</span></div>
            </div>
          </div>

          {/* Elegant circular progress */}
          <div style={{ position: "relative", width: 130, height: 130 }}>
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle cx="65" cy="65" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
              <circle cx="65" cy="65" r="54" fill="none" stroke="url(#goldGrad)" strokeWidth="5" strokeLinecap="round" strokeDasharray="339" strokeDashoffset="146" style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1.5s ease" }} />
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#C8A24D" />
                  <stop offset="100%" stopColor="#E0B95F" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="font-heading" style={{ fontSize: 40, fontWeight: 400, color: "white", lineHeight: 1 }}>342</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Credits</div>
            </div>
          </div>
        </div>
      </div>

      {/* COURSES + RIGHT SIDEBAR */}
      <div className="z-grid-main">
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350" }}>Aktuelle Kurse</div>
            <a href="/courses" style={{ fontSize: 12.5, color: "#C8A24D", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4, letterSpacing: "0.02em" }}>
              Alle ansehen
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </a>
          </div>

          <div className="z-grid-courses">
            {courses.map((c, i) => (
              <div key={i} className={`z-card animate-scale-in stagger-${i + 1}`} style={{ borderRadius: 16, overflow: "hidden", position: "relative", minHeight: 220, cursor: "pointer", padding: 0 }}>
                <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, filter: "brightness(0.55) saturate(0.9)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,35,80,0.85) 0%, rgba(2,35,80,0.1) 45%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: 0, padding: "16px 18px 18px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{c.tag}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#C8A24D" }}>{c.credits} Cr</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: "white", marginBottom: 10, lineHeight: 1.35 }}>{c.title}</div>
                    <div style={{ background: "rgba(255,255,255,0.12)", height: 3, borderRadius: 2, marginBottom: 5 }}>
                      <div style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", width: `${c.p}%` }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "rgba(255,255,255,0.45)" }}>
                      <span>Fortschritt</span><span style={{ color: "white", fontWeight: 600 }}>{c.p}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Upcoming Exams */}
          <div style={{ marginTop: 28 }}>
            <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350", marginBottom: 18 }}>Naechste Pruefungen</div>
            <div className="z-grid-2" style={{ gap: 14 }}>
              <div className="z-card animate-fade-in-up stagger-6" style={{ padding: "22px 24px", borderLeft: "3px solid #C0392B" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: "#022350" }}>Sachversicherung Modul 3</div>
                  <span className="z-badge" style={{ background: "rgba(192,57,43,0.06)", color: "#C0392B" }}>Dringend</span>
                </div>
                <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 14 }}>Grundlagen Sachversicherung</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Frist: <span style={{ color: "#C0392B", fontWeight: 600 }}>28.03.</span></span>
                  <button className="z-btn z-btn-primary" style={{ padding: "8px 18px", fontSize: 12 }}>Starten</button>
                </div>
              </div>
              <div className="z-card animate-fade-in-up stagger-7" style={{ padding: "22px 24px", borderLeft: "3px solid #C8A24D" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: "#022350" }}>Lebensversicherungen</div>
                  <span className="z-badge" style={{ background: "rgba(200,162,77,0.08)", color: "#C8A24D" }}>15.04.</span>
                </div>
                <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 14 }}>Abschlusspruefung · 75%</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#4A4A5A" }}>Bestehensgrenze: <span style={{ fontWeight: 600 }}>75%</span></span>
                  <button className="z-btn z-btn-ghost" style={{ padding: "8px 18px", fontSize: 12 }}>Vorbereiten</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Activities */}
          <div className="z-card animate-fade-in-up stagger-3" style={{ padding: "24px 22px" }}>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Letzte Aktivitaeten</div>
            <div className="z-gold-line" style={{ marginBottom: 16 }} />
            {activities.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: i < activities.length - 1 ? "1px solid #F0ECE6" : "none", alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 5, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, color: "#1A1A2E", lineHeight: 1.45 }}>{a.text}</div>
                  <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="z-card animate-fade-in-up stagger-5" style={{ padding: "24px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350" }}>Rangliste</div>
              <span style={{ fontSize: 10, color: "#C8A24D", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>Credits</span>
            </div>
            <div className="z-gold-line" style={{ marginBottom: 14 }} />
            {leaderboard.map((p, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: p.you ? "10px 14px" : "10px 0", background: p.you ? "rgba(200,162,77,0.04)" : "transparent", margin: p.you ? "0 -14px" : "0", borderRadius: p.you ? 10 : 0, borderBottom: i < leaderboard.length - 1 ? "1px solid #F0ECE6" : "none" }}>
                <div className="font-heading" style={{ width: 22, fontSize: 16, fontWeight: 500, color: i === 0 ? "#C8A24D" : "#9A9AAA", textAlign: "center" }}>{p.rank}</div>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: p.you ? "linear-gradient(135deg, #C8A24D, #E0B95F)" : "#F0ECE6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: p.you ? "#022350" : "#4A4A5A" }}>{p.avatar}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: p.you ? 600 : 400, color: p.you ? "#022350" : "#4A4A5A" }}>
                    {p.name} {p.you && <span style={{ fontSize: 10, color: "#C8A24D", fontWeight: 600 }}>(Du)</span>}
                  </div>
                </div>
                <div className="font-heading" style={{ fontSize: 16, fontWeight: 500, color: p.you ? "#C8A24D" : "#4A4A5A" }}>{p.credits}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIVE FORUM FEED */}
      <div style={{ marginTop: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
          <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350" }}>Forum Live</div>
          <a href="/forum" style={{ fontSize: 12.5, color: "#C8A24D", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
            Zum Forum
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </a>
        </div>
        <div className="z-card animate-fade-in-up stagger-8" style={{ padding: "20px 24px" }}>
          {[
            { channel: "Sachversicherung", author: "Laura Meier", avatar: "LM", msg: "Super erklärt! Ich hatte letzte Woche einen ähnlichen Fall.", time: "09:14", own: true, color: "#022350" },
            { channel: "Lebensversicherung", author: "Laura Meier", avatar: "LM", msg: "Am besten holst du den genauen Wert bei der Versicherung ein.", time: "07:42", own: true, color: "#0FA4A0" },
            { channel: "Compliance", author: "Laura Meier", avatar: "LM", msg: "Welches Tool verwendet ihr für die Dokumentation?", time: "Gestern", own: true, color: "#C0392B" },
            { channel: "Sachversicherung", author: "Anna Schneider", avatar: "AS", msg: "Das UVG deckt Berufsunfälle und Berufskrankheiten ab.", time: "08:45", own: false, color: "#022350" },
            { channel: "Beratungstipps", author: "Thomas Mueller", avatar: "TM", msg: "Immer konkrete Schadenbeispiele bringen. Das macht den Nutzen greifbar.", time: "Fr", own: false, color: "#C8A24D" },
          ].map((item, i) => (
            <a href="/forum" key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 0", borderBottom: i < 4 ? "1px solid rgba(2,35,80,0.04)" : "none", textDecoration: "none", color: "inherit", transition: "all 0.2s" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: item.own ? "linear-gradient(135deg, #C8A24D, #E0B95F)" : "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: item.own ? "#022350" : "#4A5568", flexShrink: 0 }}>{item.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <Hash size={11} color={item.color} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: item.color }}>{item.channel}</span>
                  <span style={{ fontSize: 11, color: "#9CA3AF" }}>{item.author}</span>
                  <span style={{ fontSize: 10, color: "#9CA3AF", marginLeft: "auto" }}>{item.time}</span>
                </div>
                <div style={{ fontSize: 13, color: "#4A5568", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.msg}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
