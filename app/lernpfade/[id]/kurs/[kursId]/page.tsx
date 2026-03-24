"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { path1 } from "../../data/path1";
import { path2 } from "../../data/path2";
import { path3 } from "../../data/path3";
import { path4 } from "../../data/path4";

const allPaths: Record<string, typeof path1> = { "1": path1, "2": path2, "3": path3, "4": path4 };

const typeIcons: Record<string, { icon: string; label: string }> = {
  video: { icon: "▶️", label: "Video" },
  text: { icon: "📖", label: "Lektion" },
  quiz: { icon: "❓", label: "Quiz" },
  interactive: { icon: "🎯", label: "Interaktiv" },
};

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade", active: true },
  { name: "Pruefungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate" },
  { name: "Forum", href: "/forum" },
  { name: "Admin", href: "/admin" },
];

export default function KursDetail() {
  const params = useParams();
  const router = useRouter();
  const pathId = params.id as string;
  const kursId = params.kursId as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const pathData = allPaths[pathId];
  const course = pathData?.courses?.find((c: { id: number }) => c.id === Number(kursId));
  const totalCoursesInPath = pathData?.courses?.length || 0;

  if (!course) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🚧</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#022350", marginBottom: 8 }}>Kursinhalt wird vorbereitet</div>
          <div style={{ fontSize: 14, color: "#9A9AAA", marginBottom: 20 }}>Dieser Kurs ist noch nicht verfuegbar.</div>
          <button onClick={() => router.push(`/lernpfade/${pathId}`)} style={{ padding: "10px 24px", background: "#022350", color: "white", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>
            ← Zurueck zum Lernpfad
          </button>
        </div>
      </div>
    );
  }

  const lessons = course.lessons || [];
  const completedLessons = lessons.filter((l: { status: string }) => l.status === "done").length;
  const totalLessons = lessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const courseColor = pathData?.color || "#022350";

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .lesson-row { transition: all 0.2s ease; cursor: pointer; }
        .lesson-row:hover { background: #f8f9fb !important; transform: translateX(4px); }
        .lesson-row:active { transform: translateX(2px); }
        .start-btn { transition: all 0.2s ease; }
        .start-btn:hover { filter: brightness(1.1); transform: scale(1.03); box-shadow: 0 4px 15px rgba(0,0,0,0.15); }
        .nav-link { transition: all 0.15s ease; }
        .nav-link:hover { background: #f0f2f5 !important; }
        .back-btn { transition: all 0.2s ease; }
        .back-btn:hover { background: #f0f2f5 !important; transform: translateX(-2px); }
      `}</style>
      <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
        <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350" }}>ZURIVA</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
          </div>
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link" style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
            <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
          </div>
        </aside>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", padding: "0 32px", height: 60, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button onClick={() => router.push(`/lernpfade/${pathId}`)} className="back-btn" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#4A4A5A", display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 8, fontFamily: "sans-serif" }}>
              ← Lernpfad
            </button>
            <div style={{ width: 1, height: 24, background: "#dce0e6" }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#022350" }}>{course.title}</div>
              <div style={{ fontSize: 12, color: "#9A9AAA" }}>{completedLessons} von {totalLessons} Lektionen</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
            {/* Hero Banner */}
            <div style={{
              background: `linear-gradient(135deg, ${courseColor}, ${courseColor}cc)`,
              borderRadius: 20, padding: "28px 32px", color: "white", marginBottom: 28,
              position: "relative", overflow: "hidden",
              animation: mounted ? "scaleIn 0.4s ease" : "none",
            }}>
              {course.image && (
                <div style={{ position: "absolute", inset: 0, opacity: 0.15 }}>
                  <img src={course.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.8, marginBottom: 6 }}>Kurs {kursId} von {totalCoursesInPath}</div>
                <div style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{course.title}</div>
                <div style={{ fontSize: 13.5, opacity: 0.85, maxWidth: 600, lineHeight: 1.6, marginBottom: 20 }}>{course.description}</div>

                <div style={{ display: "flex", gap: 24, marginBottom: 16 }}>
                  <div style={{ fontSize: 13 }}>⏱ {course.duration}</div>
                  <div style={{ fontSize: 13 }}>📚 {totalLessons} Lektionen</div>
                  <div style={{ fontSize: 13 }}>⭐ {course.credits} Credits</div>
                  <div style={{ fontSize: 13 }}>✅ {progressPercent}% abgeschlossen</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.2)", height: 5, borderRadius: 3 }}>
                  <div style={{
                    height: 5, borderRadius: 3, background: "white",
                    width: mounted ? progressPercent + "%" : "0%",
                    transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
                  }} />
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div style={{ background: "white", borderRadius: 16, border: "0.5px solid #dce0e6", overflow: "hidden", maxWidth: 860 }}>
              <div style={{ padding: "18px 24px", borderBottom: "0.5px solid #dce0e6" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#022350" }}>Lektionen</div>
              </div>

              {lessons.map((lesson: { id: number; title: string; duration: string; type: string; status: string; description: string }, i: number) => {
                const typeInfo = typeIcons[lesson.type] || typeIcons.text;
                return (
                  <div
                    key={lesson.id}
                    className={lesson.status !== "locked" ? "lesson-row" : ""}
                    onClick={() => {
                      if (lesson.status !== "locked") {
                        router.push(`/lernpfade/${pathId}/kurs/${kursId}/lektion/${lesson.id}`);
                      }
                    }}
                    style={{
                      display: "flex", alignItems: "center", gap: 16, padding: "16px 24px",
                      borderBottom: i < lessons.length - 1 ? "0.5px solid #f0f2f5" : "none",
                      opacity: lesson.status === "locked" ? 0.5 : 1,
                      cursor: lesson.status === "locked" ? "not-allowed" : "pointer",
                      animation: mounted ? `fadeInUp 0.4s ease ${i * 0.06}s both` : "none",
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                      background: lesson.status === "done" ? "#0FA4A0" : lesson.status === "active" ? courseColor : "#f0f2f5",
                      color: lesson.status === "locked" ? "#9A9AAA" : "white",
                      fontWeight: 700,
                    }}>
                      {lesson.status === "done" ? "✓" : lesson.status === "locked" ? "🔒" : typeInfo.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{lesson.title}</div>
                        <span style={{ fontSize: 10, fontWeight: 600, color: "#9A9AAA", background: "#f0f2f5", padding: "2px 7px", borderRadius: 6 }}>{typeInfo.label}</span>
                        {lesson.status === "active" && (
                          <span style={{ fontSize: 10, fontWeight: 700, background: courseColor, color: "white", padding: "2px 8px", borderRadius: 10 }}>AKTUELL</span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 2 }}>{lesson.description}</div>
                    </div>

                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 4 }}>{lesson.duration}</div>
                      {lesson.status === "active" && (
                        <button className="start-btn" style={{ padding: "6px 16px", background: courseColor, color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif" }}>
                          Starten →
                        </button>
                      )}
                      {lesson.status === "done" && (
                        <span style={{ fontSize: 11.5, color: "#0FA4A0", fontWeight: 500 }}>Abgeschlossen</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
