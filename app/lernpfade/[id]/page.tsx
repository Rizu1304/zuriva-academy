"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

interface PathCourse {
  id: number;
  title: string;
  category: string;
  duration: string;
  credits: number;
  modules: number;
  progress: number;
  img: string;
  status: "completed" | "active" | "locked";
}

interface LearningPath {
  id: number;
  title: string;
  description: string;
  color: string;
  totalCredits: number;
  courses: PathCourse[];
}

const paths: Record<string, LearningPath> = {
  "1": {
    id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg fuer neue Mitarbeitende — alle Basiskurse fuer den Start in der Versicherungsbranche.", color: "#0FA4A0", totalCredits: 40,
    courses: [
      { id: 4, title: "Beratungskompetenz und Kundenkommunikation", category: "Gen. Faehigkeiten", duration: "3h 00min", credits: 10, modules: 7, progress: 100, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", status: "completed" },
      { id: 9, title: "Digitale Tools im Beratungsgespraech", category: "Gen. Faehigkeiten", duration: "1h 45min", credits: 6, modules: 4, progress: 100, img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", status: "completed" },
      { id: 1, title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", duration: "2h 40min", credits: 8, modules: 6, progress: 100, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", status: "completed" },
      { id: 2, title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", duration: "4h 15min", credits: 12, modules: 9, progress: 100, img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", status: "completed" },
      { id: 8, title: "Compliance im Versicherungsvertrieb", category: "Compliance", duration: "2h 15min", credits: 4, modules: 3, progress: 100, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", status: "completed" },
    ],
  },
  "2": {
    id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung fuer die VBV-Zertifizierung 2026. Alle erforderlichen Kurse in der richtigen Reihenfolge — von den Grundlagen bis zur Abschlusspruefung.", color: "#022350", totalCredits: 120,
    courses: [
      { id: 1, title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", duration: "2h 40min", credits: 8, modules: 6, progress: 68, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", status: "active" },
      { id: 2, title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", duration: "4h 15min", credits: 12, modules: 9, progress: 33, img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", status: "active" },
      { id: 4, title: "Beratungskompetenz und Kundenkommunikation", category: "Gen. Faehigkeiten", duration: "3h 00min", credits: 10, modules: 7, progress: 85, img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", status: "active" },
      { id: 3, title: "FIDLEG und VAG 2026", category: "Compliance", duration: "1h 30min", credits: 6, modules: 4, progress: 0, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80", status: "locked" },
      { id: 5, title: "Krankentaggeldversicherung Grundlagen", category: "Krankenzusatz", duration: "2h 00min", credits: 8, modules: 5, progress: 0, img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80", status: "locked" },
      { id: 6, title: "Haftpflichtversicherung Vertiefung", category: "Nicht-Leben", duration: "3h 30min", credits: 14, modules: 8, progress: 0, img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80", status: "locked" },
      { id: 7, title: "Vorsorge und Pensionskasse UVG BVG", category: "Leben", duration: "5h 00min", credits: 18, modules: 11, progress: 0, img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80", status: "locked" },
      { id: 8, title: "Compliance im Versicherungsvertrieb", category: "Compliance", duration: "2h 15min", credits: 8, modules: 6, progress: 0, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80", status: "locked" },
      { id: 9, title: "Digitale Tools im Beratungsgespraech", category: "Gen. Faehigkeiten", duration: "1h 45min", credits: 6, modules: 4, progress: 0, img: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80", status: "locked" },
      { id: 10, title: "VBV Abschlusspruefung Vorbereitung", category: "Compliance", duration: "3h 00min", credits: 30, modules: 8, progress: 0, img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80", status: "locked" },
    ],
  },
};

const catColors: Record<string, string> = { "Nicht-Leben": "#022350", "Leben": "#0FA4A0", "Gen. Faehigkeiten": "#C8A24D", "Krankenzusatz": "#1B6FC2", "Compliance": "#C0392B" };

export default function LernpfadDetail() {
  const params = useParams();
  const pathId = params.id as string;
  const path = paths[pathId];

  if (!path) {
    return (
      <DashboardLayout title="Lernpfad nicht gefunden" subtitle="">
        <div className="z-card-static" style={{ padding: 40, textAlign: "center" }}>
          <div className="font-heading" style={{ fontSize: 22, color: "#022350", marginBottom: 8 }}>Lernpfad nicht verfuegbar</div>
          <Link href="/lernpfade" className="z-btn z-btn-primary" style={{ textDecoration: "none", marginTop: 16 }}>Zurueck</Link>
        </div>
      </DashboardLayout>
    );
  }

  const completedCourses = path.courses.filter(c => c.status === "completed").length;
  const activeCourses = path.courses.filter(c => c.status === "active").length;
  const earnedCredits = path.courses.filter(c => c.status === "completed").reduce((s, c) => s + c.credits, 0);
  const progressPercent = Math.round((completedCourses / path.courses.length) * 100);

  return (
    <DashboardLayout title={path.title} subtitle={path.description} actions={
      <Link href="/lernpfade" className="z-btn z-btn-ghost" style={{ textDecoration: "none", fontSize: 12.5 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        Alle Lernpfade
      </Link>
    }>

      {/* Stats Banner */}
      <div className="z-card-navy animate-fade-in-up" style={{ padding: "32px 36px", marginBottom: 28 }}>
        <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${path.color}15, transparent 70%)` }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center", position: "relative" }}>
          <div>
            <div className="z-gold-line" style={{ marginBottom: 14 }} />
            <div style={{ display: "flex", gap: 32, marginBottom: 18 }}>
              <div>
                <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: "white" }}>{completedCourses}/{path.courses.length}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Kurse abgeschlossen</div>
              </div>
              <div>
                <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: "#C8A24D" }}>{earnedCredits}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Credits erhalten</div>
              </div>
              <div>
                <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: "white" }}>{activeCourses}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>In Bearbeitung</div>
              </div>
            </div>
            <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)", maxWidth: 400 }}>
              <div style={{ height: 4, borderRadius: 4, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", width: progressPercent + "%" }} />
            </div>
          </div>
          <div style={{ position: "relative", width: 110, height: 110 }}>
            <svg width="110" height="110" viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
              <circle cx="55" cy="55" r="46" fill="none" stroke="url(#pathGold)" strokeWidth="5" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={289 - (289 * progressPercent) / 100} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
              <defs><linearGradient id="pathGold" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#C8A24D" /><stop offset="100%" stopColor="#E0B95F" /></linearGradient></defs>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="font-heading" style={{ fontSize: 32, fontWeight: 400, color: "white" }}>{progressPercent}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350", marginBottom: 6 }}>Kurse in diesem Lernpfad</div>
      <div className="z-gold-line" style={{ marginBottom: 20 }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {path.courses.map((course, i) => {
          const color = catColors[course.category] || "#022350";
          const isLast = i === path.courses.length - 1;
          return (
            <div key={`${course.id}-${i}`} className={`animate-fade-in-up stagger-${Math.min(i + 1, 8)}`}>
              <div style={{ display: "flex", gap: 18 }}>
                {/* Timeline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32, flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: course.status === "completed" ? "#0FA4A0" : course.status === "active" ? "white" : "#F0ECE6", border: course.status === "active" ? "2px solid #C8A24D" : "none" }}>
                    {course.status === "completed" ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : course.status === "active" ? (
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C8A24D" }} />
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9A9AAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    )}
                  </div>
                  {!isLast && (
                    <div style={{ width: 2, flex: 1, minHeight: 16, background: course.status === "completed" ? "#0FA4A0" : "#ECE8E1" }} />
                  )}
                </div>

                {/* Course Card */}
                <div className="z-card" style={{ flex: 1, marginBottom: 12, padding: 0, overflow: "hidden", opacity: course.status === "locked" ? 0.5 : 1 }}>
                  <div style={{ display: "flex" }}>
                    {/* Image */}
                    <div style={{ width: 140, minHeight: 120, position: "relative", flexShrink: 0 }}>
                      <img src={course.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: course.status === "locked" ? "grayscale(1) brightness(0.6)" : "brightness(0.75) saturate(0.85)" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 50%, rgba(255,255,255,0.9) 100%)" }} />
                    </div>
                    {/* Content */}
                    <div style={{ flex: 1, padding: "16px 20px 16px 10px" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
                        <span className="z-badge" style={{ background: `${color}0D`, color }}>{course.category}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#C8A24D" }}>{course.credits} Cr</span>
                        {course.status === "completed" && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0", marginLeft: "auto" }}>Abgeschlossen</span>}
                        {course.status === "locked" && <span className="z-badge" style={{ background: "#F0ECE6", color: "#9A9AAA", marginLeft: "auto" }}>Gesperrt</span>}
                      </div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: "#022350", marginBottom: 8 }}>{course.title}</div>
                      <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                        <span style={{ fontSize: 11.5, color: "#9A9AAA" }}>{course.duration}</span>
                        <span style={{ fontSize: 11.5, color: "#9A9AAA" }}>{course.modules} Module</span>
                      </div>
                      {course.status !== "locked" && (
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div className="z-progress" style={{ flex: 1 }}>
                            <div className="z-progress-bar" style={{ width: course.progress + "%", background: course.status === "completed" ? "#0FA4A0" : "linear-gradient(90deg, #C8A24D, #E0B95F)" }} />
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 600, color: course.status === "completed" ? "#0FA4A0" : "#C8A24D" }}>{course.progress}%</span>
                          {course.status === "active" && (
                            <Link href={`/courses/${course.id}`} className="z-btn z-btn-primary" style={{ textDecoration: "none", padding: "6px 14px", fontSize: 11.5 }}>Weiter</Link>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
