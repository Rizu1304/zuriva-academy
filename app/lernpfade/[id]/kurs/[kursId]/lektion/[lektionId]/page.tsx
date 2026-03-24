"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { path1 } from "../../../../data/path1";
import { path2 } from "../../../../data/path2";
import { path3 } from "../../../../data/path3";
import { path4 } from "../../../../data/path4";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Quiz {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Slide {
  title: string;
  image: string;
  content: string;
  keyPoints?: string[];
  quiz?: Quiz;
}

interface Lesson {
  id: number;
  title: string;
  credits: number;
  duration: string;
  slides: Slide[];
}

interface Course {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface PathData {
  id: number;
  title: string;
  courses: Course[];
}

/* ------------------------------------------------------------------ */
/*  Data lookup                                                        */
/* ------------------------------------------------------------------ */

const paths: Record<string, PathData> = {
  "1": path1 as PathData,
  "2": path2 as PathData,
  "3": path3 as PathData,
  "4": path4 as PathData,
};

/* ------------------------------------------------------------------ */
/*  CSS keyframe animations (injected once)                            */
/* ------------------------------------------------------------------ */

const animationCSS = `
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(80px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-80px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bounceIn {
  0%   { transform: scale(0.85); opacity: 0; }
  50%  { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%      { transform: translateX(-8px); }
  40%      { transform: translateX(8px); }
  60%      { transform: translateX(-6px); }
  80%      { transform: translateX(6px); }
}
@keyframes confettiDrop {
  0%   { opacity: 1; transform: translateY(-40px) rotate(0deg); }
  100% { opacity: 0; transform: translateY(420px) rotate(720deg); }
}
@keyframes progressFill {
  from { width: 0%; }
}
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(15,164,160,0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(15,164,160,0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes celebrationPop {
  0%   { transform: scale(0); opacity: 0; }
  60%  { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
`;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function LektionViewer() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;
  const kursId = params.kursId as string;
  const lektionId = params.lektionId as string;

  /* ---- data resolution ---- */
  const pathData = paths[id];
  const course = pathData?.courses.find((c) => c.id === Number(kursId));
  const lesson = course?.lessons.find((l) => l.id === Number(lektionId));
  const slides: Slide[] = lesson?.slides || [];

  /* ---- state ---- */
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [isLoading, setIsLoading] = useState(true);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [startTime] = useState(Date.now());
  const [slideKey, setSlideKey] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  /* ---- inject CSS once ---- */
  useEffect(() => {
    const styleId = "lektion-viewer-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = animationCSS;
      document.head.appendChild(style);
    }
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  /* ---- navigation helpers ---- */
  const goToSlide = useCallback(
    (index: number) => {
      if (index < 0 || index >= slides.length) return;
      setDirection(index > currentSlide ? "right" : "left");
      setCurrentSlide(index);
      setSlideKey((k: number) => k + 1);
      setQuizSelected(null);
      setQuizAnswered(false);
      contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentSlide, slides.length],
  );

  const goNext = useCallback(() => {
    if (currentSlide < slides.length - 1) goToSlide(currentSlide + 1);
  }, [currentSlide, slides.length, goToSlide]);

  const goPrev = useCallback(() => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const goBack = useCallback(() => {
    router.push(`/lernpfade/${id}/kurs/${kursId}`);
  }, [router, id, kursId]);

  /* ---- keyboard ---- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "Escape") goBack();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, goBack]);

  /* ---- derived ---- */
  const slide = slides[currentSlide];
  const progress = slides.length > 0 ? ((currentSlide + 1) / slides.length) * 100 : 0;
  const isLastSlide = currentSlide === slides.length - 1;
  const elapsedMinutes = Math.max(1, Math.round((Date.now() - startTime) / 60000));

  /* ---- helpers ---- */
  const getNextLesson = (): Lesson | undefined => {
    if (!course) return undefined;
    const idx = course.lessons.findIndex((l) => l.id === Number(lektionId));
    return course.lessons[idx + 1];
  };

  /* ================================================================ */
  /*  LOADING STATE                                                    */
  /* ================================================================ */

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#F0F2F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "4px solid #E5E7EB",
              borderTopColor: "#0FA4A0",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: "#6B7280", fontFamily: "sans-serif", fontSize: 14 }}>Lektion wird geladen...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  ERROR STATE                                                      */
  /* ================================================================ */

  if (!pathData || !course || !lesson || slides.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#F0F2F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "48px 40px",
            maxWidth: 440,
            textAlign: "center",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
            animation: "scaleIn 0.4s ease",
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16 }}>&#128533;</div>
          <h2 style={{ color: "#022350", margin: "0 0 8px", fontSize: 22 }}>Lektion nicht gefunden</h2>
          <p style={{ color: "#6B7280", margin: "0 0 24px", lineHeight: 1.6, fontSize: 15 }}>
            Die angeforderte Lektion existiert leider nicht oder wurde verschoben.
          </p>
          <button
            onClick={() => router.push("/lernpfade")}
            style={{
              background: "#0FA4A0",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              padding: "12px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0d918e")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0FA4A0")}
          >
            Zurueck zu den Lernpfaden
          </button>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*  COMPLETION MODAL                                                 */
  /* ================================================================ */

  const CompletionModal = () => {
    const nextLesson = getNextLesson();
    const confettiColors = ["#0FA4A0", "#C8A24D", "#022350", "#e74c3c", "#6366f1", "#f59e0b"];
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(2,35,80,0.6)",
          backdropFilter: "blur(6px)",
          animation: "fadeIn 0.3s ease",
        }}
        onClick={() => setShowCompletion(false)}
      >
        {/* confetti pieces */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "fixed",
              top: -20,
              left: `${Math.random() * 100}%`,
              width: Math.random() * 10 + 6,
              height: Math.random() * 10 + 6,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background: confettiColors[i % confettiColors.length],
              animation: `confettiDrop ${1.5 + Math.random() * 2}s ease-in ${Math.random() * 0.8}s forwards`,
              opacity: 0,
              zIndex: 1001,
            }}
          />
        ))}
        {/* modal card */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "48px 40px",
            maxWidth: 480,
            width: "90%",
            textAlign: "center",
            boxShadow: "0 24px 64px rgba(0,0,0,0.2)",
            animation: "celebrationPop 0.5s ease",
            position: "relative",
            zIndex: 1002,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #0FA4A0, #0d918e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: 36,
              animation: "float 2s ease-in-out infinite",
            }}
          >
            &#10003;
          </div>
          <h2 style={{ color: "#022350", margin: "0 0 8px", fontSize: 26, fontWeight: 700 }}>
            Lektion abgeschlossen!
          </h2>
          <p style={{ color: "#6B7280", margin: "0 0 28px", fontSize: 15, lineHeight: 1.6 }}>
            Herzlichen Glueckwunsch! Du hast &laquo;{lesson.title}&raquo; erfolgreich abgeschlossen.
          </p>

          {/* stats row */}
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              marginBottom: 28,
            }}
          >
            {[
              { label: "Credits", value: `+${lesson.credits}`, icon: "\u2B50", bg: "rgba(200,162,77,0.12)", color: "#C8A24D" },
              { label: "Dauer", value: `${elapsedMinutes} Min.`, icon: "\u23F1", bg: "rgba(15,164,160,0.1)", color: "#0FA4A0" },
              { label: "Folien", value: `${slides.length}`, icon: "\uD83D\uDCC4", bg: "rgba(2,35,80,0.08)", color: "#022350" },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: s.bg,
                  borderRadius: 14,
                  padding: "16px 20px",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* next lesson preview */}
          {nextLesson && (
            <div
              style={{
                background: "#F0F2F5",
                borderRadius: 12,
                padding: "14px 18px",
                marginBottom: 24,
                textAlign: "left",
              }}
            >
              <div style={{ fontSize: 11, color: "#6B7280", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>
                Naechste Lektion
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#022350" }}>{nextLesson.title}</div>
              <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{nextLesson.duration} &middot; {nextLesson.credits} Credits</div>
            </div>
          )}

          {/* actions */}
          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={goBack}
              style={{
                flex: 1,
                padding: "14px 0",
                borderRadius: 12,
                border: "2px solid #E5E7EB",
                background: "#fff",
                color: "#022350",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#0FA4A0";
                e.currentTarget.style.color = "#0FA4A0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E5E7EB";
                e.currentTarget.style.color = "#022350";
              }}
            >
              Zurueck zum Kurs
            </button>
            {nextLesson && (
              <button
                onClick={() => router.push(`/lernpfade/${id}/kurs/${kursId}/lektion/${nextLesson.id}`)}
                style={{
                  flex: 1,
                  padding: "14px 0",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #0FA4A0, #0d918e)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Naechste Lektion &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ================================================================ */
  /*  QUIZ COMPONENT                                                   */
  /* ================================================================ */

  const QuizSection = ({ quiz }: { quiz: Quiz }) => {
    const isCorrect = quizSelected === quiz.correct;
    return (
      <div style={{ animation: "fadeInUp 0.5s ease 0.2s both" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #022350 0%, #0a3a7a 100%)",
            borderRadius: 16,
            padding: "32px 28px",
            marginTop: 28,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span
              style={{
                background: "rgba(200,162,77,0.2)",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 600,
                color: "#C8A24D",
                letterSpacing: 0.5,
              }}
            >
              QUIZ
            </span>
          </div>
          <h3 style={{ margin: "0 0 20px", fontSize: 19, fontWeight: 600, lineHeight: 1.5 }}>
            {quiz.question}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {quiz.options.map((option, idx) => {
              let bg = "rgba(255,255,255,0.08)";
              let border = "2px solid rgba(255,255,255,0.12)";
              let extraStyle = "";

              if (quizAnswered) {
                if (idx === quiz.correct) {
                  bg = "rgba(16,185,129,0.2)";
                  border = "2px solid #10B981";
                  extraStyle = idx === quizSelected ? "bounceIn 0.4s ease" : "";
                } else if (idx === quizSelected) {
                  bg = "rgba(239,68,68,0.2)";
                  border = "2px solid #EF4444";
                  extraStyle = "shake 0.4s ease";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={quizAnswered}
                  onClick={() => {
                    setQuizSelected(idx);
                    setQuizAnswered(true);
                  }}
                  style={{
                    background: bg,
                    border,
                    borderRadius: 12,
                    padding: "14px 18px",
                    textAlign: "left",
                    color: "#fff",
                    fontSize: 15,
                    cursor: quizAnswered ? "default" : "pointer",
                    transition: "all 0.25s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontFamily: "sans-serif",
                    animation: extraStyle,
                  }}
                  onMouseEnter={(e) => {
                    if (!quizAnswered) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!quizAnswered) {
                      e.currentTarget.style.background = bg;
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {quizAnswered && (
            <div style={{ animation: "fadeInUp 0.4s ease", marginTop: 20 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                {isCorrect ? (
                  <>
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#10B981",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        animation: "bounceIn 0.4s ease",
                      }}
                    >
                      &#10003;
                    </span>
                    Richtig!
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: "#EF4444",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        animation: "shake 0.4s ease",
                      }}
                    >
                      &#10007;
                    </span>
                    Leider falsch
                  </>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, opacity: 0.85 }}>
                {quiz.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  /* ================================================================ */
  /*  MAIN RENDER                                                      */
  /* ================================================================ */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F0F2F5",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ---- TOP HEADER BAR ---- */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #E5E7EB",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <button
          onClick={goBack}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "none",
            background: "none",
            color: "#6B7280",
            fontSize: 14,
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: 8,
            transition: "all 0.2s",
            fontFamily: "sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F0F2F5";
            e.currentTarget.style.color = "#022350";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "none";
            e.currentTarget.style.color = "#6B7280";
          }}
        >
          <span style={{ fontSize: 18 }}>&larr;</span>
          Zurueck zum Kurs
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#022350", maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {lesson.title}
          </span>
        </div>

        <div
          style={{
            background: "#F0F2F5",
            borderRadius: 8,
            padding: "4px 12px",
            fontSize: 13,
            color: "#6B7280",
            fontWeight: 500,
          }}
        >
          {currentSlide + 1} / {slides.length}
        </div>
      </header>

      {/* ---- PROGRESS BAR ---- */}
      <div style={{ height: 3, background: "#E5E7EB", flexShrink: 0 }}>
        <div
          style={{
            height: "100%",
            background: "linear-gradient(90deg, #0FA4A0, #0cc0bc)",
            width: `${progress}%`,
            transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            borderRadius: "0 2px 2px 0",
            animation: "progressFill 0.6s ease",
          }}
        />
      </div>

      {/* ---- SLIDE CONTENT ---- */}
      <div
        ref={contentRef}
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          key={slideKey}
          style={{
            maxWidth: 800,
            width: "100%",
            padding: "0 24px 120px",
            animation: `${direction === "right" ? "slideInRight" : "slideInLeft"} 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
          }}
        >
          {/* Hero image */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: 320,
              borderRadius: "0 0 20px 20px",
              overflow: "hidden",
              marginBottom: 32,
              animation: "fadeIn 0.5s ease",
            }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(2,35,80,0.7) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 24,
                left: 28,
                right: 28,
              }}
            >
              <div
                style={{
                  background: "rgba(15,164,160,0.9)",
                  borderRadius: 6,
                  padding: "3px 10px",
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#fff",
                  display: "inline-block",
                  marginBottom: 8,
                  letterSpacing: 0.5,
                }}
              >
                FOLIE {currentSlide + 1} VON {slides.length}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#022350",
              margin: "0 0 20px",
              lineHeight: 1.3,
              animation: "fadeInUp 0.5s ease 0.1s both",
            }}
          >
            {slide.title}
          </h1>

          {/* HTML content */}
          <div
            style={{
              animation: "fadeInUp 0.5s ease 0.15s both",
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: slide.content }}
              style={{
                background: "#fff",
                borderRadius: 16,
                padding: "28px 28px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                border: "1px solid #E5E7EB",
                color: "#374151",
                fontSize: 16,
                lineHeight: 1.75,
              }}
            />
          </div>

          {/* Key points */}
          {slide.keyPoints && slide.keyPoints.length > 0 && (
            <div
              style={{
                marginTop: 24,
                animation: "fadeInUp 0.5s ease 0.25s both",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(15,164,160,0.06) 0%, rgba(15,164,160,0.02) 100%)",
                  border: "1px solid rgba(15,164,160,0.15)",
                  borderRadius: 16,
                  padding: "24px 28px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#0FA4A0",
                    textTransform: "uppercase",
                    letterSpacing: 0.8,
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: "rgba(15,164,160,0.12)",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 14,
                    }}
                  >
                    &#9889;
                  </span>
                  Wichtige Punkte
                </div>
                {slide.keyPoints.map((point, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "10px 0",
                      borderTop: idx > 0 ? "1px solid rgba(15,164,160,0.08)" : "none",
                      animation: `fadeInUp 0.4s ease ${0.3 + idx * 0.08}s both`,
                    }}
                  >
                    <span
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: "#0FA4A0",
                        color: "#fff",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span style={{ color: "#374151", fontSize: 15, lineHeight: 1.6 }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quiz */}
          {slide.quiz && <QuizSection quiz={slide.quiz} />}
        </div>
      </div>

      {/* ---- BOTTOM NAVIGATION BAR ---- */}
      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#fff",
          borderTop: "1px solid #E5E7EB",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
          boxShadow: "0 -2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Previous button */}
        <button
          onClick={goPrev}
          disabled={currentSlide === 0}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 20px",
            borderRadius: 12,
            border: "2px solid #E5E7EB",
            background: "#fff",
            color: currentSlide === 0 ? "#D1D5DB" : "#022350",
            fontSize: 14,
            fontWeight: 600,
            cursor: currentSlide === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s",
            fontFamily: "sans-serif",
            opacity: currentSlide === 0 ? 0.5 : 1,
          }}
          onMouseEnter={(e) => {
            if (currentSlide > 0) {
              e.currentTarget.style.borderColor = "#0FA4A0";
              e.currentTarget.style.color = "#0FA4A0";
            }
          }}
          onMouseLeave={(e) => {
            if (currentSlide > 0) {
              e.currentTarget.style.borderColor = "#E5E7EB";
              e.currentTarget.style.color = "#022350";
            }
          }}
        >
          &larr; Zurueck
        </button>

        {/* Slide dots */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: idx === currentSlide ? 24 : 8,
                height: 8,
                borderRadius: 4,
                border: "none",
                background: idx === currentSlide ? "#0FA4A0" : idx < currentSlide ? "#B0E0DB" : "#D1D5DB",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: 0,
              }}
              aria-label={`Folie ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next / Complete button */}
        {isLastSlide ? (
          <button
            onClick={() => setShowCompletion(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 24px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #C8A24D, #d4a843)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "sans-serif",
              animation: "pulseGlow 2s ease-in-out infinite",
              boxShadow: "0 2px 12px rgba(200,162,77,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,162,77,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(200,162,77,0.3)";
            }}
          >
            Lektion abschliessen &#10003;
          </button>
        ) : (
          <button
            onClick={goNext}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 20px",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #0FA4A0, #0d918e)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "sans-serif",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,164,160,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Weiter &rarr;
          </button>
        )}
      </nav>

      {/* ---- COMPLETION MODAL ---- */}
      {showCompletion && <CompletionModal />}
    </div>
  );
}
