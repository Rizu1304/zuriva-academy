"use client";
import { useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Square, Loader2, Check, CheckCircle, XCircle, BookOpen, Target, Volume2, ArrowLeft, Award } from "lucide-react";
import { getLektion } from "@/lib/lernpfade-data";
import type { SlideContent, QuizContent, VideoContent, LektionContent } from "@/lib/lernpfade-data";

export default function LektionPlayer() {
  const params = useParams();
  const router = useRouter();
  const pfadId = parseInt(params.id as string);
  const modulId = params.modulId as string;
  const lektionId = params.lektionId as string;

  const data = getLektion(pfadId, modulId, lektionId);

  // Slide state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([]);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // TTS state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Completion state
  const [completed, setCompleted] = useState(false);

  const stopAudio = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
    setIsPlaying(false);
  }, []);

  const playTTS = useCallback(async (text: string) => {
    stopAudio();
    setIsLoading(true);
    try {
      const res = await fetch("/api/tts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => { setIsPlaying(false); URL.revokeObjectURL(url); };
      setIsPlaying(true);
      setIsLoading(false);
      await audio.play();
    } catch { setIsLoading(false); setIsPlaying(false); }
  }, [stopAudio]);

  if (!data) {
    return (
      <div style={{ minHeight: "100vh", background: "#EAE5DD", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 18, color: "#022350", marginBottom: 12 }}>Lektion nicht gefunden</div>
          <Link href="/lernpfade" style={{ color: "#C8A24D", textDecoration: "none", fontWeight: 600 }}>Zurück zu Lernpfaden</Link>
        </div>
      </div>
    );
  }

  const { pfad, modul, lektion, lektionIndex, nextLektion } = data;
  const content = lektion.content;
  const totalLektionen = modul.lektionen.length;

  const goNext = () => {
    setCompleted(true);
  };

  const goToNextLektion = () => {
    if (nextLektion) {
      router.push(`/lernpfade/${pfadId}/modul/${modulId}/lektion/${nextLektion.id}`);
      setCompleted(false);
      setCurrentSlide(0);
      setQuizAnswers([]);
      setQuizSubmitted(false);
      setCurrentQuestion(0);
    } else {
      router.push("/lernpfade");
    }
  };

  // COMPLETION SCREEN
  if (completed) {
    return (
      <div style={{ minHeight: "100vh", background: "#EAE5DD", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ maxWidth: 480, textAlign: "center", padding: 40 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(15,164,160,0.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <CheckCircle size={36} color="#0FA4A0" />
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 700, color: "#022350", marginBottom: 8 }}>Lektion abgeschlossen!</div>
          <div style={{ fontSize: 14, color: "#4A5568", marginBottom: 6 }}>{lektion.title}</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 32 }}>Lektion {lektionIndex + 1} von {totalLektionen} · {modul.title}</div>

          {/* Progress */}
          <div style={{ background: "rgba(255,255,255,0.50)", borderRadius: 16, padding: "20px 24px", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
              <span style={{ color: "#4A5568" }}>Modulfortschritt</span>
              <span style={{ fontWeight: 700, color: "#022350" }}>{Math.round(((lektionIndex + 1) / totalLektionen) * 100)}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "rgba(2,35,80,0.06)" }}>
              <div style={{ height: 6, borderRadius: 3, background: pfad.color, width: `${((lektionIndex + 1) / totalLektionen) * 100}%`, transition: "width 0.5s" }} />
            </div>
          </div>

          {nextLektion ? (
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Nächste Lektion:</div>
              <div style={{ background: "rgba(255,255,255,0.50)", borderRadius: 14, padding: "16px 20px", marginBottom: 20, textAlign: "left", display: "flex", alignItems: "center", gap: 12 }}>
                {nextLektion.type === "video" ? <Play size={16} color="#C8A24D" /> : nextLektion.type === "quiz" ? <Target size={16} color="#0FA4A0" /> : <BookOpen size={16} color="#022350" />}
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{nextLektion.title}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{nextLektion.duration}</div>
                </div>
              </div>
              <button onClick={goToNextLektion} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#022350", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                Weiter <ChevronRight size={16} />
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20, color: "#C8A24D" }}>
                <Award size={20} /> <span style={{ fontSize: 14, fontWeight: 600 }}>Modul abgeschlossen!</span>
              </div>
              <button onClick={() => router.push("/lernpfade")} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#022350", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Zurück zu Lernpfaden
              </button>
            </div>
          )}

          <Link href={`/lernpfade`} style={{ display: "block", marginTop: 16, fontSize: 13, color: "#9CA3AF", textDecoration: "none" }}>Zur Übersicht</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EAE5DD", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top Bar */}
      <div style={{ background: "rgba(255,255,255,0.50)", backdropFilter: "blur(20px)", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/lernpfade" style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(2,35,80,0.04)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
            <ArrowLeft size={18} color="#022350" />
          </Link>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{lektion.title}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF" }}>{pfad.title} · {modul.title} · Lektion {lektionIndex + 1}/{totalLektionen}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 120, height: 4, borderRadius: 2, background: "rgba(2,35,80,0.06)" }}>
            <div style={{ height: 4, borderRadius: 2, background: pfad.color, width: `${((lektionIndex) / totalLektionen) * 100}%` }} />
          </div>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>{lektionIndex + 1}/{totalLektionen}</span>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>

        {/* VIDEO */}
        {content?.type === "video" && (
          <div>
            <div style={{ background: "#022350", borderRadius: 16, aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, position: "relative", overflow: "hidden" }}>
              {/* Background image */}
              {(content as VideoContent).image && (
                <img src={(content as VideoContent).image} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.25) saturate(0.7)" }} />
              )}
              {/* ZURIVA Logo */}
              <div style={{ position: "absolute", top: 14, left: 16, display: "flex", alignItems: "baseline", gap: 5, zIndex: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "0.1em", color: "white", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>ZURIVA</span>
                <span style={{ fontSize: 9, fontWeight: 500, color: "#C8A24D", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>academy</span>
              </div>
              {/* Play button */}
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <button onClick={() => isPlaying ? stopAudio() : playTTS((content as VideoContent).speakText)} disabled={isLoading} style={{ width: 80, height: 80, borderRadius: "50%", background: isPlaying ? "rgba(192,57,43,0.8)" : "rgba(200,162,77,0.25)", border: `3px solid ${isPlaying ? "rgba(192,57,43,0.6)" : "rgba(200,162,77,0.5)"}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: isLoading ? "wait" : "pointer", transition: "all 0.3s", backdropFilter: "blur(8px)" }}>
                  {isLoading ? <Loader2 size={32} color="white" style={{ animation: "spin 0.8s linear infinite" }} /> : isPlaying ? <Square size={28} color="white" /> : <Play size={32} color="white" style={{ marginLeft: 4 }} />}
                </button>
                <div style={{ marginTop: 12, fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                  {isLoading ? "Wird geladen..." : isPlaying ? "Klicke zum Stoppen" : "Klicke zum Abspielen"}
                </div>
              </div>
              {/* Audio wave animation when playing */}
              {isPlaying && (
                <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 3, zIndex: 2 }}>
                  {[1,2,3,4,5,6,7].map(i => (
                    <div key={i} style={{ width: 4, borderRadius: 2, background: "#C8A24D", animation: `wave ${0.5 + i * 0.1}s ease-in-out infinite alternate`, height: 8 + Math.random() * 16 }} />
                  ))}
                </div>
              )}
            </div>
            <div style={{ background: "rgba(255,255,255,0.50)", borderRadius: 14, padding: "24px 28px", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 700, color: "#022350", marginBottom: 10 }}>{lektion.title}</div>
              <div style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.8 }}>{(content as VideoContent).description}</div>
            </div>
            <button onClick={goNext} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#022350", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Lektion abschliessen <Check size={16} />
            </button>
          </div>
        )}

        {/* SLIDES */}
        {content?.type === "slides" && (() => {
          const slides = (content as SlideContent).slides;
          const slide = slides[currentSlide];
          return (
            <div>
              {/* Slide indicators */}
              <div style={{ display: "flex", gap: 4, marginBottom: 16, justifyContent: "center" }}>
                {slides.map((_, i) => (
                  <div key={i} onClick={() => { setDirection(i > currentSlide ? 1 : -1); setCurrentSlide(i); }} style={{ width: i === currentSlide ? 24 : 8, height: 8, borderRadius: 4, background: i === currentSlide ? pfad.color : i < currentSlide ? "#022350" : "rgba(2,35,80,0.12)", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={currentSlide} custom={direction} initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                  <div style={{ background: "rgba(255,255,255,0.50)", borderRadius: 16, overflow: "hidden", marginBottom: 24 }}>
                    {/* Slide Image */}
                    {slide.image && (
                      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                        <img src={slide.image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.90) 100%)" }} />
                      </div>
                    )}
                    <div style={{ padding: "28px 40px 36px" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#022350", marginBottom: 14 }}>{slide.title}</div>
                    <div style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.7, marginBottom: slide.bulletPoints ? 20 : 0 }}>{slide.content}</div>
                    {slide.bulletPoints && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {slide.bulletPoints.map((p, i) => (
                          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", background: "rgba(255,255,255,0.50)", borderRadius: 10, borderLeft: `3px solid ${pfad.color}` }}>
                            <CheckCircle size={14} color={pfad.color} style={{ marginTop: 2, flexShrink: 0 }} />
                            <span style={{ fontSize: 14, color: "#1A1A2E", lineHeight: 1.5 }}>{p}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* TTS + Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button onClick={() => { setDirection(-1); setCurrentSlide(Math.max(0, currentSlide - 1)); }} disabled={currentSlide === 0} style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: currentSlide === 0 ? "transparent" : "rgba(255,255,255,0.50)", color: currentSlide === 0 ? "#9CA3AF" : "#022350", fontSize: 13, fontWeight: 500, cursor: currentSlide === 0 ? "default" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, opacity: currentSlide === 0 ? 0.5 : 1 }}>
                  <ChevronLeft size={14} /> Zurück
                </button>
                <button onClick={() => isPlaying ? stopAudio() : playTTS(slide.speakText)} disabled={isLoading} style={{ padding: "10px 20px", borderRadius: 12, border: "none", background: isPlaying ? "#C0392B" : "#022350", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                  {isLoading ? <><Loader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} /> Laden...</> : isPlaying ? <><Square size={14} /> Stoppen</> : <><Volume2 size={14} /> Vorlesen</>}
                </button>
                {currentSlide < slides.length - 1 ? (
                  <button onClick={() => { setDirection(1); setCurrentSlide(currentSlide + 1); }} style={{ padding: "10px 20px", borderRadius: 12, border: "none", background: pfad.color, color: "white", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                    Weiter <ChevronRight size={14} />
                  </button>
                ) : (
                  <button onClick={goNext} style={{ padding: "10px 20px", borderRadius: 12, border: "none", background: "#C8A24D", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                    Abschliessen <Check size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* TEXT */}
        {content?.type === "text" && (
          <div>
            <div style={{ background: "rgba(255,255,255,0.50)", borderRadius: 16, padding: "36px 40px", marginBottom: 24 }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#022350", marginBottom: 20 }}>{lektion.title}</div>
              {(content as LektionContent).paragraphs.map((p, i) => (
                <p key={i} style={{ fontSize: 15, color: "#4A5568", lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
              ))}
            </div>
            <button onClick={goNext} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#022350", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Lektion abschliessen <Check size={16} />
            </button>
          </div>
        )}

        {/* QUIZ */}
        {content?.type === "quiz" && (() => {
          const quiz = content as QuizContent;
          const q = quiz.questions[currentQuestion];
          const answered = quizAnswers[currentQuestion] !== undefined && quizAnswers[currentQuestion] !== null;

          if (quizSubmitted) {
            const correct = quizAnswers.filter((a, i) => a === quiz.questions[i].correctIndex).length;
            const percent = Math.round((correct / quiz.questions.length) * 100);
            const passed = percent >= quiz.passingScore;
            return (
              <div style={{ background: "rgba(255,255,255,0.50)", borderRadius: 16, padding: "36px 40px", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: passed ? "rgba(15,164,160,0.10)" : "rgba(192,57,43,0.10)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  {passed ? <CheckCircle size={32} color="#0FA4A0" /> : <XCircle size={32} color="#C0392B" />}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#022350", marginBottom: 4 }}>{passed ? "Bestanden!" : "Nicht bestanden"}</div>
                <div style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 20 }}>{correct} von {quiz.questions.length} richtig · {percent}%</div>
                {quiz.questions.map((question, i) => (
                  <div key={i} style={{ textAlign: "left", padding: "12px 16px", borderRadius: 12, marginBottom: 8, borderLeft: `3px solid ${quizAnswers[i] === question.correctIndex ? "#0FA4A0" : "#C0392B"}`, background: "rgba(255,255,255,0.50)" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{question.text}</div>
                    <div style={{ fontSize: 12, color: quizAnswers[i] === question.correctIndex ? "#0FA4A0" : "#C0392B", marginTop: 2 }}>
                      {quizAnswers[i] === question.correctIndex ? "Richtig" : `Falsch - Richtig: ${question.options[question.correctIndex]}`}
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>{question.explanation}</div>
                  </div>
                ))}
                <button onClick={passed ? goNext : () => { setQuizAnswers([]); setQuizSubmitted(false); setCurrentQuestion(0); }} style={{ marginTop: 20, width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#022350", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  {passed ? "Weiter" : "Nochmal versuchen"}
                </button>
              </div>
            );
          }

          return (
            <div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8 }}>Frage {currentQuestion + 1} von {quiz.questions.length} · Bestehensgrenze: {quiz.passingScore}%</div>
              <div style={{ background: "rgba(255,255,255,0.50)", borderRadius: 16, padding: "32px 36px", marginBottom: 16 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 700, color: "#022350", marginBottom: 20, lineHeight: 1.4 }}>{q.text}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {q.options.map((opt, oi) => {
                    const isSelected = quizAnswers[currentQuestion] === oi;
                    const isCorrect = answered && oi === q.correctIndex;
                    const isWrong = answered && isSelected && oi !== q.correctIndex;
                    return (
                      <button key={oi} onClick={() => { if (!answered) { const copy = [...quizAnswers]; copy[currentQuestion] = oi; setQuizAnswers(copy); } }} style={{ padding: "14px 18px", borderRadius: 12, border: "1px solid", borderColor: isCorrect ? "#0FA4A0" : isWrong ? "#C0392B" : isSelected ? pfad.color : "rgba(2,35,80,0.08)", background: isCorrect ? "rgba(15,164,160,0.06)" : isWrong ? "rgba(192,57,43,0.06)" : isSelected ? `${pfad.color}08` : "rgba(255,255,255,0.50)", color: "#022350", fontSize: 14, fontFamily: "inherit", cursor: answered ? "default" : "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s" }}>
                        {isCorrect ? <CheckCircle size={18} color="#0FA4A0" /> : isWrong ? <XCircle size={18} color="#C0392B" /> : <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${isSelected ? pfad.color : "rgba(2,35,80,0.15)"}`, background: isSelected ? pfad.color : "transparent" }} />}
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {answered && <div style={{ marginTop: 14, padding: "12px 16px", borderRadius: 10, background: "rgba(200,162,77,0.06)", fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{q.explanation}</div>}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {answered && currentQuestion < quiz.questions.length - 1 && (
                  <button onClick={() => setCurrentQuestion(currentQuestion + 1)} style={{ padding: "12px 24px", borderRadius: 12, border: "none", background: pfad.color, color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                    Nächste Frage <ChevronRight size={14} />
                  </button>
                )}
                {answered && currentQuestion === quiz.questions.length - 1 && (
                  <button onClick={() => setQuizSubmitted(true)} style={{ padding: "12px 24px", borderRadius: 12, border: "none", background: "#C8A24D", color: "white", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
                    Auswertung <Target size={14} />
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } @keyframes wave { 0% { height: 8px; } 100% { height: 24px; } }`}</style>
    </div>
  );
}
