"use client";
import { useState, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

/* ===== COURSE DATA ===== */

const allCourses: Record<string, Course> = {
  "1": {
    id: 1, title: "Grundlagen der Sachversicherung", category: "Nicht-Leben", duration: "2h 40min",
    credits: 8, progress: 68, instructor: "Prof. Dr. Stefan Brunner", instructorRole: "Dozent Sachversicherung",
    description: "Dieser Kurs vermittelt die wesentlichen Grundlagen der Sachversicherung im Schweizer Markt. Von den rechtlichen Rahmenbedingungen ueber Produktkenntnisse bis hin zur Schadenabwicklung — ein umfassender Einstieg fuer angehende Vermittler.",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
    modules: [
      { id: "m1", title: "Einfuehrung in die Sachversicherung", lessons: [
        { id: "l1", title: "Was ist Sachversicherung?", type: "video", duration: "12 min", completed: true },
        { id: "l2", title: "Rechtliche Grundlagen in der Schweiz", type: "text", duration: "8 min", completed: true },
        { id: "l3", title: "Quiz: Grundbegriffe", type: "quiz", duration: "5 min", completed: true, quizId: "sach-grundbegriffe" },
      ]},
      { id: "m2", title: "Produktarten und Deckungen", lessons: [
        { id: "l4", title: "Gebaeudeversicherung", type: "video", duration: "15 min", completed: true },
        { id: "l5", title: "Hausratversicherung", type: "video", duration: "12 min", completed: true },
        { id: "l6", title: "Betriebsunterbrechung", type: "text", duration: "10 min", completed: false },
        { id: "l7", title: "Quiz: Produktkenntnisse", type: "quiz", duration: "8 min", completed: false, quizId: "sach-produkte" },
      ]},
      { id: "m3", title: "Risikobewertung und Praemien", lessons: [
        { id: "l8", title: "Risikoanalyse im Sachbereich", type: "video", duration: "18 min", completed: false },
        { id: "l9", title: "Praemienkalkulation verstehen", type: "text", duration: "12 min", completed: false },
        { id: "l10", title: "Fallstudie: Praemienberechnung", type: "text", duration: "15 min", completed: false },
        { id: "l11", title: "Quiz: Risikobewertung", type: "quiz", duration: "10 min", completed: false },
      ]},
      { id: "m4", title: "Schadenmanagement", lessons: [
        { id: "l12", title: "Schadenmeldung und Prozess", type: "video", duration: "14 min", completed: false },
        { id: "l13", title: "Regulierung und Auszahlung", type: "text", duration: "10 min", completed: false },
        { id: "l14", title: "Quiz: Schadenabwicklung", type: "quiz", duration: "8 min", completed: false },
      ]},
      { id: "m5", title: "Kundenberatung Sach", lessons: [
        { id: "l15", title: "Bedarfsanalyse im Sachbereich", type: "video", duration: "16 min", completed: false },
        { id: "l16", title: "Beratungsgespraech fuehren", type: "video", duration: "12 min", completed: false },
        { id: "l17", title: "Rollenspiel: Kundenfall", type: "text", duration: "20 min", completed: false },
      ]},
      { id: "m6", title: "Abschlusspruefung", lessons: [
        { id: "l18", title: "Pruefungsvorbereitung", type: "text", duration: "10 min", completed: false },
        { id: "l19", title: "Abschlusspruefung Sachversicherung", type: "quiz", duration: "30 min", completed: false },
      ]},
    ],
  },
  "2": {
    id: 2, title: "Lebensversicherungen: Produktkenntnisse", category: "Leben", duration: "4h 15min",
    credits: 12, progress: 33, instructor: "Dr. Claudia Frei", instructorRole: "Leiterin Ausbildung Leben",
    description: "Umfassende Einfuehrung in die Schweizer Lebensversicherungslandschaft. Produkte der Saeulen 2 und 3, gemischte Lebensversicherungen, Rueckkaufswerte und aktuelle Markttrends.",
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80",
    modules: [
      { id: "m1", title: "Grundlagen Lebensversicherung", lessons: [
        { id: "l1", title: "Das 3-Saeulen-System", type: "video", duration: "15 min", completed: true },
        { id: "l2", title: "Arten von Lebensversicherungen", type: "text", duration: "10 min", completed: true },
        { id: "l3", title: "Quiz: Grundlagen", type: "quiz", duration: "5 min", completed: true, quizId: "leben-grundlagen" },
      ]},
      { id: "m2", title: "Saeule 2 — Berufliche Vorsorge", lessons: [
        { id: "l4", title: "BVG im Ueberblick", type: "video", duration: "18 min", completed: true },
        { id: "l5", title: "Obligatorische und ueberobligatorische Leistungen", type: "text", duration: "12 min", completed: false },
        { id: "l6", title: "Quiz: Berufliche Vorsorge", type: "quiz", duration: "8 min", completed: false },
      ]},
      { id: "m3", title: "Saeule 3 — Private Vorsorge", lessons: [
        { id: "l7", title: "Saeule 3a vs. 3b", type: "video", duration: "14 min", completed: false },
        { id: "l8", title: "Steuerliche Vorteile", type: "text", duration: "10 min", completed: false },
        { id: "l9", title: "Quiz: Private Vorsorge", type: "quiz", duration: "6 min", completed: false },
      ]},
    ],
  },
};

/* Fallback for courses not fully defined */
const defaultCourse: Course = {
  id: 0, title: "Kurs", category: "", duration: "", credits: 0, progress: 0,
  instructor: "Zuriva Academy", instructorRole: "Dozent",
  description: "Kursbeschreibung wird geladen...",
  img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  modules: [],
};

interface Lesson { id: string; title: string; type: "video" | "text" | "quiz"; duration: string; completed: boolean; quizId?: string; }
interface Module { id: string; title: string; lessons: Lesson[]; }
interface Course { id: number; title: string; category: string; duration: string; credits: number; progress: number; instructor: string; instructorRole: string; description: string; img: string; modules: Module[]; }

/* ===== COMPONENT ===== */

export default function CourseDetail() {
  const params = useParams();
  const courseId = params.id as string;
  const course = allCourses[courseId] || defaultCourse;

  const [activeModuleIdx, setActiveModuleIdx] = useState(() => {
    // Find first module with incomplete lessons
    const idx = course.modules.findIndex(m => m.lessons.some(l => !l.completed));
    return idx >= 0 ? idx : 0;
  });
  const [activeLessonIdx, setActiveLessonIdx] = useState(() => {
    const mod = course.modules[activeModuleIdx];
    if (!mod) return 0;
    const idx = mod.lessons.findIndex(l => !l.completed);
    return idx >= 0 ? idx : 0;
  });

  const activeModule = course.modules[activeModuleIdx];
  const activeLesson = activeModule?.lessons[activeLessonIdx];

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = course.modules.reduce((sum, m) => sum + m.lessons.filter(l => l.completed).length, 0);
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // TTS voice state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [ttsLoading, setTtsLoading] = useState(false);
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopTts = useCallback(() => {
    if (ttsAudioRef.current) { ttsAudioRef.current.pause(); ttsAudioRef.current = null; }
    setIsSpeaking(false);
  }, []);

  const speakLesson = useCallback(async () => {
    if (isSpeaking) { stopTts(); return; }
    if (!activeLesson) return;
    stopTts();
    setTtsLoading(true);
    const text = `${activeLesson.title}. ${course.description}`;
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      ttsAudioRef.current = audio;
      audio.onended = () => { setIsSpeaking(false); URL.revokeObjectURL(url); };
      setIsSpeaking(true);
      setTtsLoading(false);
      await audio.play();
    } catch {
      setTtsLoading(false);
      setIsSpeaking(false);
    }
  }, [activeLesson, course.description, isSpeaking, stopTts]);

  const typeIcon = (type: string) => {
    if (type === "video") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>;
    if (type === "quiz") return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>;
    return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /></svg>;
  };

  const typeLabel = (type: string) => type === "video" ? "Video" : type === "quiz" ? "Quiz" : "Lektion";

  return (
    <DashboardLayout title={course.title} subtitle={`${course.category} · ${course.credits} Credits · ${course.duration}`} actions={
      <Link href="/courses" className="z-btn z-btn-ghost" style={{ textDecoration: "none", fontSize: 12.5 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        Zurueck
      </Link>
    }>

      {/* HERO */}
      <div className="animate-fade-in-up" style={{ borderRadius: 18, overflow: "hidden", position: "relative", height: 220, marginBottom: 28 }}>
        <img src={course.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.3) saturate(0.8)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(2,35,80,0.95) 0%, rgba(2,35,80,0.6) 60%, transparent 100%)" }} />
        <div style={{ position: "absolute", inset: 0, padding: "32px 36px", display: "flex", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <div className="z-gold-line" style={{ marginBottom: 12 }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)", fontSize: 10.5, fontWeight: 600, padding: "3px 10px", borderRadius: 20 }}>{course.category}</span>
              <span style={{ background: "rgba(200,162,77,0.2)", color: "#E0B95F", fontSize: 10.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{course.credits} Credits</span>
            </div>
            <div className="font-heading" style={{ fontSize: 32, fontWeight: 400, color: "white", lineHeight: 1.15, marginBottom: 14 }}>{course.title}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(200,162,77,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#C8A24D" }}>
                {course.instructor.split(" ").map(n => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "white" }}>{course.instructor}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{course.instructorRole}</div>
              </div>
            </div>
          </div>
          {/* Progress ring */}
          <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="url(#heroGold)" strokeWidth="5" strokeLinecap="round" strokeDasharray="264" strokeDashoffset={264 - (264 * progressPercent) / 100} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
              <defs><linearGradient id="heroGold" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#C8A24D" /><stop offset="100%" stopColor="#E0B95F" /></linearGradient></defs>
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "white" }}>{progressPercent}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>% fertig</div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID: Content + Sidebar */}
      <div className="z-grid-main-320">

        {/* LEFT: Active Lesson */}
        <div>
          {activeLesson ? (
            <div className="z-card-static animate-fade-in-up" style={{ padding: "32px 36px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ color: "#C8A24D" }}>{typeIcon(activeLesson.type)}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#C8A24D", letterSpacing: "0.08em", textTransform: "uppercase" }}>{typeLabel(activeLesson.type)} · {activeLesson.duration}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div>
                  <div className="font-heading" style={{ fontSize: 26, fontWeight: 400, color: "#022350", marginBottom: 6 }}>{activeLesson.title}</div>
                  <div style={{ fontSize: 12.5, color: "#9A9AAA", marginBottom: 24 }}>Modul {activeModuleIdx + 1}: {activeModule.title}</div>
                </div>
                <button
                  onClick={speakLesson}
                  disabled={ttsLoading}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 10,
                    border: "1px solid",
                    borderColor: isSpeaking ? "#C0392B" : "#ECE8E1",
                    background: isSpeaking ? "rgba(192,57,43,0.06)" : "#FAF8F5",
                    color: isSpeaking ? "#C0392B" : ttsLoading ? "#9A9AAA" : "#022350",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: ttsLoading ? "wait" : "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {ttsLoading ? "⏳ Laden..." : isSpeaking ? "■ Stoppen" : "▶ Vorlesen"}
                </button>
              </div>

              {/* Content placeholder */}
              {activeLesson.type === "video" && (
                <div style={{ background: "#022350", borderRadius: 14, height: 320, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", inset: 0, background: `url(${course.img})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.2) blur(4px)" }} />
                  <div style={{ position: "relative", textAlign: "center" }}>
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(200,162,77,0.2)", border: "2px solid rgba(200,162,77,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", cursor: "pointer" }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#C8A24D" stroke="none"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                    </div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{activeLesson.duration}</div>
                  </div>
                </div>
              )}

              {activeLesson.type === "text" && (
                <div style={{ background: "#FAF8F5", borderRadius: 14, padding: "28px 32px", marginBottom: 24, border: "1px solid #ECE8E1" }}>
                  <div style={{ fontSize: 14.5, color: "#4A4A5A", lineHeight: 1.85 }}>
                    <p style={{ marginBottom: 16 }}>Die Sachversicherung bildet einen zentralen Pfeiler des Schweizer Versicherungsmarktes. Sie schuetzt Privatpersonen und Unternehmen vor finanziellen Folgen von Schaeden an materiellen Guetern.</p>
                    <p style={{ marginBottom: 16 }}>In diesem Abschnitt lernen Sie die wesentlichen Konzepte kennen, die fuer eine kompetente Beratung unabdingbar sind. Dabei werden sowohl die theoretischen Grundlagen als auch praktische Anwendungsfaelle behandelt.</p>
                    <p>Besonderes Augenmerk wird auf die regulatorischen Anforderungen gelegt, die seit der VBV-Reform 2025 gelten und fuer die Zertifizierung relevant sind.</p>
                  </div>
                </div>
              )}

              {activeLesson.type === "quiz" && (
                <div style={{ background: "#FAF8F5", borderRadius: 14, padding: "28px 32px", marginBottom: 24, border: "1px solid #ECE8E1", textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(200,162,77,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  </div>
                  <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350", marginBottom: 6 }}>{activeLesson.title}</div>
                  <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 20 }}>{activeLesson.duration} · Bestehensgrenze 70%</div>
                  {activeLesson.quizId ? (
                    <Link href={`/quiz/${activeLesson.quizId}`} className="z-btn z-btn-primary" style={{ textDecoration: "none", padding: "10px 28px" }}>Quiz starten</Link>
                  ) : (
                    <button className="z-btn z-btn-primary" style={{ padding: "10px 28px", opacity: 0.5 }}>Noch nicht verfuegbar</button>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 20, borderTop: "1px solid #F0ECE6" }}>
                <button
                  onClick={() => {
                    if (activeLessonIdx > 0) setActiveLessonIdx(activeLessonIdx - 1);
                    else if (activeModuleIdx > 0) {
                      setActiveModuleIdx(activeModuleIdx - 1);
                      setActiveLessonIdx(course.modules[activeModuleIdx - 1].lessons.length - 1);
                    }
                  }}
                  className="z-btn z-btn-ghost" style={{ fontSize: 12.5, opacity: activeModuleIdx === 0 && activeLessonIdx === 0 ? 0.3 : 1 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                  Zurueck
                </button>
                <span style={{ fontSize: 12, color: "#9A9AAA" }}>{completedLessons} / {totalLessons} Lektionen</span>
                <button
                  onClick={() => {
                    if (activeModule && activeLessonIdx < activeModule.lessons.length - 1) setActiveLessonIdx(activeLessonIdx + 1);
                    else if (activeModuleIdx < course.modules.length - 1) {
                      setActiveModuleIdx(activeModuleIdx + 1);
                      setActiveLessonIdx(0);
                    }
                  }}
                  className="z-btn z-btn-primary" style={{ fontSize: 12.5 }}
                >
                  Weiter
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          ) : (
            <div className="z-card-static" style={{ padding: "40px", textAlign: "center" }}>
              <div className="font-heading" style={{ fontSize: 20, color: "#022350", marginBottom: 8 }}>Kurs noch nicht verfuegbar</div>
              <div style={{ fontSize: 13, color: "#9A9AAA" }}>Die Inhalte werden in Kuerze freigeschaltet.</div>
            </div>
          )}

          {/* Description */}
          <div className="z-card-static animate-fade-in-up stagger-3" style={{ padding: "26px 30px" }}>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Ueber diesen Kurs</div>
            <div className="z-gold-line" style={{ marginBottom: 14 }} />
            <div style={{ fontSize: 14, color: "#4A4A5A", lineHeight: 1.8 }}>{course.description}</div>
          </div>
        </div>

        {/* RIGHT: Module Navigation */}
        <div className="z-card-static animate-slide-in-right" style={{ padding: "24px 0", alignSelf: "start", position: "sticky", top: 32 }}>
          <div style={{ padding: "0 22px", marginBottom: 4 }}>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Kursinhalt</div>
            <div className="z-gold-line" style={{ marginBottom: 10 }} />
            <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 14 }}>{completedLessons} von {totalLessons} abgeschlossen</div>
            <div className="z-progress" style={{ marginBottom: 20 }}>
              <div className="z-progress-bar" style={{ width: progressPercent + "%", background: "linear-gradient(90deg, #C8A24D, #E0B95F)" }} />
            </div>
          </div>

          <div className="z-scroll" style={{ maxHeight: "calc(100vh - 380px)", overflowY: "auto" }}>
            {course.modules.map((mod, mi) => {
              const modCompleted = mod.lessons.filter(l => l.completed).length;
              const isActiveModule = mi === activeModuleIdx;
              return (
                <div key={mod.id}>
                  {/* Module header */}
                  <div
                    onClick={() => { setActiveModuleIdx(mi); setActiveLessonIdx(0); }}
                    style={{ padding: "12px 22px", cursor: "pointer", background: isActiveModule ? "rgba(200,162,77,0.04)" : "transparent", borderLeft: isActiveModule ? "3px solid #C8A24D" : "3px solid transparent", transition: "all 0.2s" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.08em", textTransform: "uppercase" }}>Modul {mi + 1}</div>
                      <span style={{ fontSize: 10.5, color: modCompleted === mod.lessons.length ? "#0FA4A0" : "#9A9AAA", fontWeight: 600 }}>
                        {modCompleted === mod.lessons.length ? "Fertig" : `${modCompleted}/${mod.lessons.length}`}
                      </span>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: isActiveModule ? 600 : 400, color: isActiveModule ? "#022350" : "#4A4A5A" }}>{mod.title}</div>
                  </div>

                  {/* Lessons (show if active module) */}
                  {isActiveModule && mod.lessons.map((lesson, li) => {
                    const isActiveLesson = li === activeLessonIdx;
                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setActiveLessonIdx(li)}
                        style={{ padding: "9px 22px 9px 34px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, background: isActiveLesson ? "rgba(2,35,80,0.03)" : "transparent", transition: "all 0.15s" }}
                      >
                        {/* Status icon */}
                        {lesson.completed ? (
                          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                        ) : (
                          <div style={{ width: 20, height: 20, borderRadius: "50%", border: isActiveLesson ? "2px solid #C8A24D" : "2px solid #E8E4DE", background: isActiveLesson ? "rgba(200,162,77,0.08)" : "white", flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12.5, fontWeight: isActiveLesson ? 600 : 400, color: isActiveLesson ? "#022350" : "#4A4A5A", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lesson.title}</div>
                          <div style={{ fontSize: 10.5, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                            <span style={{ color: lesson.type === "quiz" ? "#C8A24D" : "#9A9AAA" }}>{typeIcon(lesson.type)}</span>
                            {lesson.duration}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
