"use client";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Square, Loader2, ChevronLeft, ChevronRight, Check } from "lucide-react";

export interface Slide {
  title: string;
  content: string;
  bulletPoints?: string[];
  speakText: string;
  icon?: string;
}

interface LessonSlidesProps {
  slides: Slide[];
  courseTitle: string;
  onComplete?: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 600 : -600,
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -600 : 600,
    opacity: 0,
    scale: 0.9,
  }),
};

export default function LessonSlides({ slides, courseTitle, onComplete }: LessonSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const playSlideAudio = useCallback(async (slideIndex: number) => {
    stopAudio();
    setIsLoading(true);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: slides[slideIndex].speakText }),
      });

      if (!response.ok) throw new Error("TTS failed");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };

      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
      };

      setIsPlaying(true);
      setIsLoading(false);
      await audio.play();
    } catch {
      setIsLoading(false);
      setIsPlaying(false);
    }
  }, [slides, stopAudio]);

  const goToSlide = useCallback((newIndex: number) => {
    if (newIndex < 0 || newIndex >= slides.length) return;
    stopAudio();
    setDirection(newIndex > currentSlide ? 1 : -1);
    setCurrentSlide(newIndex);
  }, [currentSlide, slides.length, stopAudio]);

  const nextSlide = useCallback(() => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentSlide, slides.length, goToSlide, onComplete]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const slide = slides[currentSlide];

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: "#9A9AAA", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{courseTitle}</div>
          <div style={{ fontSize: 13, color: "#4A4A5A", marginTop: 2 }}>Lektion {currentSlide + 1} von {slides.length}</div>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: i === currentSlide ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === currentSlide ? "#0FA4A0" : i < currentSlide ? "#022350" : "#dce0e6",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Slide Area */}
      <div style={{
        background: "white",
        borderRadius: 18,
        border: "0.5px solid #dce0e6",
        overflow: "hidden",
        position: "relative",
        minHeight: 420,
      }}>
        {/* Top accent bar */}
        <div style={{ height: 4, background: "linear-gradient(90deg, #022350, #0FA4A0, #C8A24D)" }} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.4 }}
            style={{ padding: "40px 48px" }}
          >
            {/* Icon */}
            {slide.icon && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                style={{ marginBottom: 16 }}
              >
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #022350, #0FA4A0)" }} />
              </motion.div>
            )}

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              style={{ fontSize: 26, fontWeight: 700, color: "#022350", marginBottom: 16, lineHeight: 1.3 }}
            >
              {slide.title}
            </motion.h2>

            {/* Content */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              style={{ fontSize: 15, lineHeight: 1.7, color: "#4A4A5A", marginBottom: slide.bulletPoints ? 20 : 0, maxWidth: 700 }}
            >
              {slide.content}
            </motion.p>

            {/* Bullet Points */}
            {slide.bulletPoints && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {slide.bulletPoints.map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "10px 14px",
                      background: "#f7f8fa",
                      borderRadius: 10,
                      borderLeft: "3px solid #0FA4A0",
                    }}
                  >
                    <span style={{ color: "#0FA4A0", fontWeight: 700, fontSize: 16, lineHeight: 1.4 }}>&#10003;</span>
                    <span style={{ fontSize: 14, color: "#1A1A2E", lineHeight: 1.5 }}>{point}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "0.5px solid #dce0e6",
            background: currentSlide === 0 ? "#f0f2f5" : "white",
            color: currentSlide === 0 ? "#9A9AAA" : "#022350",
            fontSize: 13,
            fontWeight: 500,
            cursor: currentSlide === 0 ? "default" : "pointer",
            fontFamily: "inherit",
          }}
        >
          <ChevronLeft size={14} /> Zurueck
        </button>

        {/* Voice Button */}
        <button
          onClick={() => isPlaying ? stopAudio() : playSlideAudio(currentSlide)}
          disabled={isLoading}
          style={{
            padding: "10px 24px",
            borderRadius: 10,
            border: "none",
            background: isPlaying ? "#e74c3c" : isLoading ? "#9A9AAA" : "#022350",
            color: "white",
            fontSize: 13,
            fontWeight: 600,
            cursor: isLoading ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "inherit",
            transition: "background 0.2s",
          }}
        >
          {isLoading ? (
            <>
              <Loader2 size={14} style={{ animation: "spin 0.8s linear infinite" }} />
              Wird geladen...
            </>
          ) : isPlaying ? (
            <><Square size={14} /> Stoppen</>
          ) : (
            <><Play size={14} /> Vorlesen lassen</>
          )}
        </button>

        <button
          onClick={nextSlide}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: currentSlide === slides.length - 1 ? "#C8A24D" : "#0FA4A0",
            color: "white",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          {currentSlide === slides.length - 1 ? (<>Abschliessen <Check size={14} /></>) : (<>Weiter <ChevronRight size={14} /></>)}
        </button>
      </div>

      {/* Spinner animation */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
