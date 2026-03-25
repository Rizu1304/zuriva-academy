"use client";
import DashboardLayout from "@/components/DashboardLayout";

const monthlyData = [
  { month: "Okt", credits: 42, hours: 6.2 },
  { month: "Nov", credits: 58, hours: 8.5 },
  { month: "Dez", credits: 35, hours: 5.1 },
  { month: "Jan", credits: 67, hours: 9.8 },
  { month: "Feb", credits: 82, hours: 11.2 },
  { month: "Mär", credits: 58, hours: 7.4 },
];

const topCourses = [
  { title: "Beratungskompetenz", progress: 85, credits: 10, color: "#C8A24D" },
  { title: "Grundlagen Sachversicherung", progress: 68, credits: 8, color: "#022350" },
  { title: "Lebensversicherungen", progress: 33, credits: 12, color: "#0FA4A0" },
  { title: "FIDLEG und VAG 2026", progress: 0, credits: 6, color: "#C0392B" },
];

const weeklyActivity = [
  { day: "Mo", hours: 1.5 },
  { day: "Di", hours: 2.2 },
  { day: "Mi", hours: 0.8 },
  { day: "Do", hours: 1.9 },
  { day: "Fr", hours: 0.5 },
  { day: "Sa", hours: 0 },
  { day: "So", hours: 0.3 },
];

const maxCredits = Math.max(...monthlyData.map(d => d.credits));
const maxHours = Math.max(...weeklyActivity.map(d => d.hours));

export default function Analytics() {
  return (
    <DashboardLayout title="Analytics" subtitle="Dein Lernverhalten im Ueberblick">

      {/* Top Stats */}
      <div className="z-grid-4" style={{ marginBottom: 24 }}>
        {[
          { value: "342", label: "Credits gesamt", sub: "von 600 Ziel", color: "#C8A24D" },
          { value: "34h", label: "Lernzeit gesamt", sub: "+3.2h diese Woche", color: "#0FA4A0" },
          { value: "91%", label: "Quiz-Durchschnitt", sub: "5 Quizzes bestanden", color: "#022350" },
          { value: "12", label: "Lern-Streak", sub: "Tage in Folge", color: "#1B6FC2" },
        ].map((s, i) => (
          <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "22px 24px" }}>
            <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12.5, color: "#4A4A5A", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "#9A9AAA" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="z-grid-main">
        <div>
          {/* Monthly Credits Chart */}
          <div className="z-card-static animate-fade-in-up stagger-5" style={{ padding: "26px 28px", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350" }}>Credits pro Monat</div>
              <span style={{ fontSize: 11, color: "#9A9AAA" }}>Letzte 6 Monate</span>
            </div>
            <div className="z-gold-line" style={{ marginBottom: 24 }} />

            <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, paddingBottom: 28, position: "relative" }}>
              {/* Y axis labels */}
              <div style={{ position: "absolute", left: 0, top: 0, bottom: 28, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <span style={{ fontSize: 10, color: "#9A9AAA" }}>{maxCredits}</span>
                <span style={{ fontSize: 10, color: "#9A9AAA" }}>{Math.round(maxCredits / 2)}</span>
                <span style={{ fontSize: 10, color: "#9A9AAA" }}>0</span>
              </div>

              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, flex: 1, marginLeft: 32 }}>
                {monthlyData.map((d, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#022350" }}>{d.credits}</div>
                    <div style={{ width: "100%", maxWidth: 40, height: (d.credits / maxCredits) * 120, borderRadius: "6px 6px 2px 2px", background: i === monthlyData.length - 1 ? "linear-gradient(180deg, #C8A24D, #E0B95F)" : "#ECE8E1", transition: "height 1s ease" }} />
                    <div style={{ fontSize: 10.5, color: "#9A9AAA" }}>{d.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Weekly Activity */}
          <div className="z-card-static animate-fade-in-up stagger-6" style={{ padding: "26px 28px" }}>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Wochenaktivitaet</div>
            <div className="z-gold-line" style={{ marginBottom: 20 }} />

            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 100 }}>
              {weeklyActivity.map((d, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 10, fontWeight: 500, color: d.hours > 0 ? "#022350" : "#9A9AAA" }}>{d.hours > 0 ? d.hours + "h" : "-"}</div>
                  <div style={{ width: "100%", maxWidth: 32, height: maxHours > 0 ? Math.max((d.hours / maxHours) * 60, d.hours > 0 ? 6 : 2) : 2, borderRadius: 4, background: d.hours >= 1.5 ? "#0FA4A0" : d.hours > 0 ? "#ECE8E1" : "#F5F3EF" }} />
                  <div style={{ fontSize: 10.5, color: "#9A9AAA", fontWeight: i < 5 ? 400 : 500 }}>{d.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Course Progress */}
          <div className="z-card-static animate-fade-in-up stagger-3" style={{ padding: "24px 22px" }}>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Kursfortschritt</div>
            <div className="z-gold-line" style={{ marginBottom: 16 }} />

            {topCourses.map((c, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < topCourses.length - 1 ? "1px solid #F0ECE6" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12.5, color: "#022350", fontWeight: 500 }}>{c.title}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: c.color }}>{c.progress}%</span>
                </div>
                <div className="z-progress">
                  <div className="z-progress-bar" style={{ width: c.progress + "%", background: c.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="z-card-static animate-fade-in-up stagger-5" style={{ padding: "24px 22px" }}>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Erfolge</div>
            <div className="z-gold-line" style={{ marginBottom: 16 }} />

            {[
              { icon: "🎯", title: "Erste Pruefung bestanden", date: "10.02.2026" },
              { icon: "🔥", title: "7-Tage Lern-Streak", date: "18.02.2026" },
              { icon: "⭐", title: "100 Credits erreicht", date: "25.02.2026" },
              { icon: "🏆", title: "Trainee Zertifikat", date: "01.03.2026" },
              { icon: "📚", title: "10 Lektionen an einem Tag", date: "15.03.2026" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: i < 4 ? "1px solid #F0ECE6" : "none", alignItems: "center" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FAF8F5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{a.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>{a.title}</div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>{a.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
