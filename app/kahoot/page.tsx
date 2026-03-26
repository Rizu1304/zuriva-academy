"use client";
import { useState, useEffect, useCallback } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Play, Trophy, Clock, CheckCircle, XCircle, ChevronRight, RotateCcw, ArrowLeft, Target, Star } from "lucide-react";

interface Question {
  text: string;
  type: "mc" | "tf";
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  category: string;
  difficulty: "Einfach" | "Mittel" | "Schwer";
  timePerQuestion: number;
  questions: Question[];
}

const quizzes: Quiz[] = [
  {
    id: "1", title: "Sachversicherung Grundlagen", category: "Sachversicherung", difficulty: "Mittel", timePerQuestion: 20,
    questions: [
      { text: "Was deckt eine Gebäudeversicherung in der Schweiz NICHT ab?", type: "mc", options: ["Erdbebenschäden", "Feuerschäden", "Wasserschäden", "Sturmschäden"], correctIndex: 0, explanation: "Erdbebenschäden sind in der Grunddeckung nicht enthalten." },
      { text: "In wie vielen Kantonen ist die Gebäudeversicherung obligatorisch?", type: "mc", options: ["15", "19", "22", "26"], correctIndex: 1, explanation: "19 von 26 Kantonen haben eine obligatorische kantonale Gebäudeversicherung." },
      { text: "Was bedeutet Unterversicherung?", type: "mc", options: ["Zu hohe Prämie", "Versicherungssumme unter dem tatsächlichen Wert", "Doppelversicherung", "Überversicherung"], correctIndex: 1, explanation: "Bei Unterversicherung ist die Summe tiefer als der tatsächliche Wert." },
      { text: "Welche Kantone gehören zu den GUSTAVO-Kantonen?", type: "mc", options: ["Zürich, Bern, Luzern", "Genf, Uri, Schwyz, Tessin, AI, VS, OW", "Basel, Aargau, St. Gallen", "Alle Westschweizer Kantone"], correctIndex: 1, explanation: "GUSTAVO = Genf, Uri, Schwyz, Tessin, Appenzell Innerrhoden, Wallis, Obwalden." },
      { text: "Was ist der Unterschied zwischen Neuwert und Zeitwert?", type: "mc", options: ["Kein Unterschied", "Neuwert = Wiederbeschaffung, Zeitwert = minus Altersentwertung", "Zeitwert ist immer höher", "Neuwert nur für Gebäude"], correctIndex: 1, explanation: "Neuwert = Wiederbeschaffungskosten, Zeitwert = abzüglich Altersentwertung." },
      { text: "Die Hausratversicherung ist in der Schweiz obligatorisch.", type: "tf", options: ["Wahr", "Falsch"], correctIndex: 1, explanation: "Die Hausratversicherung ist freiwillig." },
    ],
  },
  {
    id: "2", title: "VBV Compliance 2026", category: "Compliance", difficulty: "Schwer", timePerQuestion: 25,
    questions: [
      { text: "Welches Gesetz regelt die Vermittlertätigkeit in der Schweiz?", type: "mc", options: ["OR", "VAG", "VVG", "FIDLEG"], correctIndex: 1, explanation: "Das VAG regelt die Vermittlertätigkeit." },
      { text: "Wie viele Weiterbildungsstunden verlangt die VBV pro Jahr?", type: "mc", options: ["10 Stunden", "15 Stunden", "20 Stunden", "30 Stunden"], correctIndex: 1, explanation: "Die VBV verlangt mindestens 15 Stunden pro Jahr." },
      { text: "Was ist die Hauptaufgabe der FINMA?", type: "mc", options: ["Steuererhebung", "Banken- und Versicherungsaufsicht", "Exportförderung", "Arbeitsrecht"], correctIndex: 1, explanation: "Die FINMA ist die Finanzmarktaufsicht." },
      { text: "FIDLEG gilt auch für Versicherungsvermittler.", type: "tf", options: ["Wahr", "Falsch"], correctIndex: 0, explanation: "Seit der Reform gelten FIDLEG-Bestimmungen auch für Versicherungsvermittler." },
      { text: "Was droht bei fehlender VBV-Registrierung?", type: "mc", options: ["Verwarnung", "Busse bis CHF 500", "Berufsverbot und Busse", "Keine Konsequenzen"], correctIndex: 2, explanation: "Ohne VBV-Registrierung droht Berufsverbot und Busse." },
    ],
  },
  {
    id: "3", title: "Beratungstechniken", category: "Beratungskompetenz", difficulty: "Einfach", timePerQuestion: 15,
    questions: [
      { text: "Was ist der erste Schritt in einem Beratungsgespräch?", type: "mc", options: ["Produkt präsentieren", "Vertrag unterschreiben", "Bedürfnisanalyse", "Prämie berechnen"], correctIndex: 2, explanation: "Die Bedürfnisanalyse steht immer am Anfang." },
      { text: "Welche Fragetechnik eignet sich für die Bedarfsermittlung?", type: "mc", options: ["Geschlossene Fragen", "Suggestivfragen", "Offene W-Fragen", "Rhetorische Fragen"], correctIndex: 2, explanation: "Offene W-Fragen fördern ausführliche Antworten." },
      { text: "Aktives Zuhören bedeutet nur still zu sein.", type: "tf", options: ["Wahr", "Falsch"], correctIndex: 1, explanation: "Aktives Zuhören umfasst Paraphrasieren, Nachfragen und nonverbale Signale." },
      { text: "Was gehört NICHT zu professioneller Einwandbehandlung?", type: "mc", options: ["Verständnis zeigen", "Einwand ignorieren", "Gegenargumente liefern", "Nachfragen stellen"], correctIndex: 1, explanation: "Einwände sollten nie ignoriert werden." },
    ],
  },
];

const answerColors = ["#022350", "#0FA4A0", "#C8A24D", "#C0392B"];

type GameState = "selection" | "countdown" | "playing" | "answered" | "result";

export default function Kahoot() {
  const [gameState, setGameState] = useState<GameState>("selection");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [filterCat, setFilterCat] = useState("Alle");

  const categories = ["Alle", ...new Set(quizzes.map(q => q.category))];
  const filtered = quizzes.filter(q => filterCat === "Alle" || q.category === filterCat);

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setCountdown(3);
    setGameState("countdown");
  };

  // Countdown
  useEffect(() => {
    if (gameState !== "countdown") return;
    if (countdown <= 0) {
      setGameState("playing");
      setTimeLeft(selectedQuiz?.timePerQuestion || 20);
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, countdown, selectedQuiz]);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft(tl => tl - 1), 1000);
    return () => clearTimeout(t);
  }, [gameState, timeLeft]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAnswer = useCallback((idx: number) => {
    if (!selectedQuiz || gameState !== "playing") return;
    const correct = selectedQuiz.questions[currentQ].correctIndex;
    const isCorrect = idx === correct;
    if (isCorrect) {
      const timeBonus = Math.round((timeLeft / (selectedQuiz.timePerQuestion || 20)) * 500);
      setScore(s => s + 500 + timeBonus);
    }
    setSelectedAnswer(idx);
    setAnswers(a => [...a, idx]);
    setGameState("answered");
  }, [selectedQuiz, gameState, currentQ, timeLeft]);

  const nextQuestion = () => {
    if (!selectedQuiz) return;
    if (currentQ + 1 >= selectedQuiz.questions.length) {
      setGameState("result");
    } else {
      setCurrentQ(c => c + 1);
      setSelectedAnswer(null);
      setTimeLeft(selectedQuiz.timePerQuestion);
      setGameState("playing");
    }
  };

  const resetGame = () => {
    setGameState("selection");
    setSelectedQuiz(null);
    setCurrentQ(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
  };

  const diffColor = (d: string) => d === "Einfach" ? "#0FA4A0" : d === "Mittel" ? "#C8A24D" : "#C0392B";

  // COUNTDOWN
  if (gameState === "countdown") {
    return (
      <DashboardLayout title="Kahoot" subtitle="Quiz startet...">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 500 }}>
          <div style={{ textAlign: "center" }}>
            <div className="font-heading" style={{ fontSize: 120, fontWeight: 700, color: "#022350", lineHeight: 1, animation: "pulse 1s ease-in-out infinite" }}>
              {countdown > 0 ? countdown : "Los!"}
            </div>
            <div style={{ fontSize: 16, color: "#9CA3AF", marginTop: 16 }}>{selectedQuiz?.title}</div>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }`}</style>
      </DashboardLayout>
    );
  }

  // PLAYING / ANSWERED
  if ((gameState === "playing" || gameState === "answered") && selectedQuiz) {
    const q = selectedQuiz.questions[currentQ];
    const timerPercent = (timeLeft / selectedQuiz.timePerQuestion) * 100;
    const timerColor = timerPercent > 50 ? "#0FA4A0" : timerPercent > 25 ? "#C8A24D" : "#C0392B";

    return (
      <DashboardLayout title={`Frage ${currentQ + 1} von ${selectedQuiz.questions.length}`} subtitle={selectedQuiz.title}>
        {/* Timer Bar */}
        <div style={{ height: 6, borderRadius: 3, background: "rgba(2,35,80,0.06)", marginBottom: 24, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, background: timerColor, width: `${timerPercent}%`, transition: "width 1s linear, background 0.3s" }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#4A5568" }}>
            <Clock size={14} /> {timeLeft}s
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>
            <Star size={14} /> {score} Punkte
          </div>
        </div>

        {/* Question */}
        <div className="z-card" style={{ padding: "32px 36px", marginBottom: 24, textAlign: "center" }}>
          <div className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: "#022350", lineHeight: 1.4 }}>
            {q.text}
          </div>
        </div>

        {/* Answers */}
        <div style={{ display: "grid", gridTemplateColumns: q.type === "tf" ? "1fr 1fr" : "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {q.options.map((opt, oi) => {
            const isCorrect = oi === q.correctIndex;
            const isSelected = selectedAnswer === oi;
            const isAnswered = gameState === "answered";
            let bg = answerColors[oi % 4];
            let border = "none";
            if (isAnswered) {
              if (isCorrect) { bg = "#0FA4A0"; border = "3px solid #0FA4A0"; }
              else if (isSelected && !isCorrect) { bg = "#C0392B"; border = "3px solid #C0392B"; }
              else { bg = `${answerColors[oi % 4]}80`; }
            }

            return (
              <button
                key={oi}
                onClick={() => !isAnswered && handleAnswer(oi)}
                disabled={isAnswered}
                style={{
                  padding: "20px 24px",
                  borderRadius: 14,
                  border,
                  background: bg,
                  color: "white",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: isAnswered ? "default" : "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  minHeight: 70,
                  opacity: isAnswered && !isCorrect && !isSelected ? 0.5 : 1,
                }}
              >
                {isAnswered && isCorrect && <CheckCircle size={20} />}
                {isAnswered && isSelected && !isCorrect && <XCircle size={20} />}
                <span style={{ fontSize: 13, fontWeight: 700, opacity: 0.7 }}>{String.fromCharCode(65 + oi)}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {gameState === "answered" && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {q.explanation && (
              <div className="z-card" style={{ padding: "16px 22px", marginBottom: 16, borderLeft: "3px solid #C8A24D" }}>
                <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.6 }}>{q.explanation}</div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button onClick={nextQuestion} className="z-btn z-btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {currentQ + 1 >= selectedQuiz.questions.length ? "Ergebnis anzeigen" : "Nächste Frage"} <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
        <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </DashboardLayout>
    );
  }

  // RESULT
  if (gameState === "result" && selectedQuiz) {
    const total = selectedQuiz.questions.length;
    const correct = answers.filter((a, i) => a === selectedQuiz.questions[i].correctIndex).length;
    const percent = Math.round((correct / total) * 100);
    const medal = percent >= 90 ? "Gold" : percent >= 70 ? "Silber" : percent >= 50 ? "Bronze" : null;
    const medalColor = medal === "Gold" ? "#C8A24D" : medal === "Silber" ? "#9CA3AF" : medal === "Bronze" ? "#B87333" : "#C0392B";

    return (
      <DashboardLayout title="Ergebnis" subtitle={selectedQuiz.title}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {/* Score Card */}
          <div className="z-card" style={{ padding: "40px", textAlign: "center", marginBottom: 24 }}>
            {percent >= 70 && <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 14, pointerEvents: "none" }}>{Array.from({ length: 20 }).map((_, i) => <div key={i} style={{ position: "absolute", width: 8, height: 8, borderRadius: "50%", background: ["#C8A24D", "#0FA4A0", "#022350", "#E0B95F"][i % 4], top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animation: `confetti ${1.5 + Math.random()}s ease-out forwards`, animationDelay: `${Math.random() * 0.5}s` }} />)}</div>}
            <div style={{ position: "relative" }}>
              <Trophy size={48} color={medalColor} style={{ marginBottom: 16 }} />
              <div className="font-heading" style={{ fontSize: 56, fontWeight: 700, color: "#022350", lineHeight: 1 }}>{score}</div>
              <div style={{ fontSize: 14, color: "#9CA3AF", marginTop: 4 }}>Punkte</div>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 24 }}>
                <div>
                  <div className="font-heading" style={{ fontSize: 28, fontWeight: 700, color: "#0FA4A0" }}>{correct}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Richtig</div>
                </div>
                <div>
                  <div className="font-heading" style={{ fontSize: 28, fontWeight: 700, color: "#C0392B" }}>{total - correct}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Falsch</div>
                </div>
                <div>
                  <div className="font-heading" style={{ fontSize: 28, fontWeight: 700, color: "#022350" }}>{percent}%</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Ergebnis</div>
                </div>
              </div>
              {medal && (
                <div className="z-badge" style={{ marginTop: 16, background: `${medalColor}18`, color: medalColor, fontSize: 14, padding: "6px 20px", display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <Target size={16} /> {medal}-Medaille
                </div>
              )}
            </div>
          </div>

          {/* Review */}
          <div className="font-heading" style={{ fontSize: 20, color: "#022350", marginBottom: 12 }}>Auswertung</div>
          {selectedQuiz.questions.map((q, i) => {
            const isCorrect = answers[i] === q.correctIndex;
            return (
              <div key={i} className="z-card" style={{ padding: "16px 20px", marginBottom: 8, borderLeft: `3px solid ${isCorrect ? "#0FA4A0" : "#C0392B"}`, display: "flex", alignItems: "center", gap: 12 }}>
                {isCorrect ? <CheckCircle size={18} color="#0FA4A0" /> : <XCircle size={18} color="#C0392B" />}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#022350", fontWeight: 500 }}>{q.text}</div>
                  {!isCorrect && <div style={{ fontSize: 12, color: "#0FA4A0", marginTop: 2 }}>Richtig: {q.options[q.correctIndex]}</div>}
                </div>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button onClick={resetGame} className="z-btn z-btn-ghost" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <ArrowLeft size={14} /> Zur Übersicht
            </button>
            <button onClick={() => startQuiz(selectedQuiz)} className="z-btn z-btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <RotateCcw size={14} /> Nochmal spielen
            </button>
          </div>
        </div>
        <style>{`@keyframes confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(300px) rotate(720deg); opacity: 0; } }`}</style>
      </DashboardLayout>
    );
  }

  // SELECTION
  return (
    <DashboardLayout title="Kahoot" subtitle="Wähle ein Quiz und teste dein Wissen">
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilterCat(c)} style={{ padding: "6px 16px", borderRadius: 20, border: "1px solid", borderColor: filterCat === c ? "#022350" : "rgba(2,35,80,0.08)", background: filterCat === c ? "#022350" : "transparent", color: filterCat === c ? "white" : "#4A5568", fontSize: 12, fontWeight: filterCat === c ? 600 : 400, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>{c}</button>
        ))}
      </div>

      <div className="z-grid-3">
        {filtered.map((quiz, i) => (
          <div key={quiz.id} className={`z-card animate-scale-in stagger-${Math.min(i + 1, 8)}`} style={{ padding: "28px 28px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span className="z-badge" style={{ background: `${diffColor(quiz.difficulty)}12`, color: diffColor(quiz.difficulty) }}>{quiz.difficulty}</span>
              <span style={{ fontSize: 12, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {quiz.questions.length * quiz.timePerQuestion / 60} Min.</span>
            </div>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: "#022350", marginBottom: 4, lineHeight: 1.3 }}>{quiz.title}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 20 }}>{quiz.category} · {quiz.questions.length} Fragen</div>
            <button onClick={() => startQuiz(quiz)} className="z-btn z-btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Play size={14} /> Quiz starten
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
