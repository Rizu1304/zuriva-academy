"use client";
import { useState, useEffect, useCallback } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const card = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 24px rgba(2,35,80,0.04)",
} as const;

/* ── Nav ── */
const navLernen = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade" },
  { name: "Prüfungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate" },
  { name: "Forum", href: "/forum" },
  { name: "Kahoot", href: "/kahoot", active: true },
];
const navAdmin = [
  { name: "Übersicht", href: "/admin" },
  { name: "Kurseditor", href: "/admin/kurse" },
  { name: "Prüfungseditor", href: "/admin/pruefungen" },
  { name: "Team", href: "/admin/team" },
];

/* ── Quiz data ── */
interface Question {
  q: string;
  options: [string, string, string, string];
  correct: number;
}

interface Quiz {
  id: number;
  title: string;
  category: string;
  questions: Question[];
  participants: number;
  difficulty: string;
  color: string;
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: "Sachversicherung Basics",
    category: "Nicht-Leben",
    participants: 24,
    difficulty: "Mittel",
    color: "#022350",
    questions: [
      {
        q: "Welche Versicherung deckt Schäden durch Feuer, Wasser und Einbruchdiebstahl an Gebäuden?",
        options: ["Haftpflichtversicherung", "Gebäudeversicherung", "Rechtsschutzversicherung", "Motorfahrzeugversicherung"],
        correct: 1,
      },
      {
        q: "Was versteht man unter dem Zeitwert eines versicherten Gegenstandes?",
        options: ["Der ursprüngliche Kaufpreis", "Der Neuwert abzüglich Altersentwertung", "Der aktuelle Börsenwert", "Der Versicherungswert bei Vertragsabschluss"],
        correct: 1,
      },
      {
        q: "Welches Prinzip besagt, dass der Versicherungsnehmer nicht besser gestellt werden darf als vor dem Schadenereignis?",
        options: ["Äquivalenzprinzip", "Bereicherungsverbot", "Subsidiaritätsprinzip", "Solidaritätsprinzip"],
        correct: 1,
      },
      {
        q: "Was ist eine Unterversicherung?",
        options: ["Wenn die Prämie zu niedrig ist", "Wenn die Versicherungssumme unter dem tatsächlichen Wert liegt", "Wenn der Selbstbehalt zu hoch ist", "Wenn mehrere Versicherungen den gleichen Schaden decken"],
        correct: 1,
      },
      {
        q: "Welche der folgenden Gefahren ist typischerweise NICHT in der Hausratversicherung gedeckt?",
        options: ["Einbruchdiebstahl", "Leitungswasserschaden", "Erdbeben", "Feuer"],
        correct: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Lebensversicherung Challenge",
    category: "Leben",
    participants: 18,
    difficulty: "Schwer",
    color: "#0FA4A0",
    questions: [
      {
        q: "Welche Lebensversicherungsform kombiniert Sparen und Risikoschutz?",
        options: ["Reine Risikolebensversicherung", "Gemischte Lebensversicherung", "Rentenversicherung", "Tontine"],
        correct: 1,
      },
      {
        q: "Was ist der Rückkaufswert einer Lebensversicherung?",
        options: ["Der Betrag bei Tod des Versicherten", "Der Betrag bei vorzeitiger Kündigung", "Die jährliche Rendite", "Der Steuerfreibetrag"],
        correct: 1,
      },
      {
        q: "Welches Gesetz regelt in der Schweiz die Aufsicht über Versicherungsunternehmen?",
        options: ["OR", "VAG", "ZGB", "SchKG"],
        correct: 1,
      },
      {
        q: "Was bedeutet der Begriff «Erlebensfallleistung»?",
        options: ["Auszahlung im Todesfall", "Auszahlung bei Vertragsablauf, wenn die versicherte Person lebt", "Prämienrückerstattung", "Auszahlung bei Invalidität"],
        correct: 1,
      },
      {
        q: "Welche Säule der Schweizer Altersvorsorge umfasst die gebundene Vorsorge (Säule 3a)?",
        options: ["Erste Säule (AHV/IV)", "Zweite Säule (BVG)", "Dritte Säule (private Vorsorge)", "Vierte Säule (Erwerbseinkommen)"],
        correct: 2,
      },
    ],
  },
  {
    id: 3,
    title: "Compliance Speed-Round",
    category: "Compliance",
    participants: 31,
    difficulty: "Experte",
    color: "#C8A24D",
    questions: [
      {
        q: "Wofür steht die Abkürzung FIDLEG?",
        options: [
          "Finanzdienstleistungsgesetz",
          "Finanzinstitutionsgesetz",
          "Finanzmarktinfrastrukturgesetz",
          "Finanzdienstleistungsergänzungsgesetz",
        ],
        correct: 0,
      },
      {
        q: "Welche Pflicht schreibt FIDLEG bei der Kundenberatung zwingend vor?",
        options: ["Gewinngarantie", "Angemessenheits- und Eignungsprüfung", "Kostenlose Beratung", "Jährliche Vertragserneuerung"],
        correct: 1,
      },
      {
        q: "Was regelt das VAG (Versicherungsaufsichtsgesetz) primär?",
        options: [
          "Steuerpflicht der Versicherten",
          "Aufsicht über private Versicherungsunternehmen",
          "Sozialversicherungsleistungen",
          "Bankgeheimnis",
        ],
        correct: 1,
      },
      {
        q: "Welche Organisation ist in der Schweiz die zuständige Aufsichtsbehörde für Versicherungen?",
        options: ["SNB", "FINMA", "SECO", "BAG"],
        correct: 1,
      },
      {
        q: "Wie lange muss gemäss FIDLEG die Dokumentation einer Beratung aufbewahrt werden?",
        options: ["5 Jahre", "10 Jahre", "15 Jahre", "20 Jahre"],
        correct: 1,
      },
    ],
  },
];

const optionGradients = [
  "linear-gradient(135deg, #C0392B 0%, #E74C3C 100%)",
  "linear-gradient(135deg, #1B6FC2 0%, #2980B9 100%)",
  "linear-gradient(135deg, #C8A24D 0%, #E0B95F 100%)",
  "linear-gradient(135deg, #0FA4A0 0%, #16C2A2 100%)",
];

const optionLabels = ["A", "B", "C", "D"];

const difficultyColors: Record<string, { bg: string; fg: string }> = {
  Mittel: { bg: "rgba(27,111,194,0.1)", fg: "#1B6FC2" },
  Schwer: { bg: "rgba(200,162,77,0.1)", fg: "#C8A24D" },
  Experte: { bg: "rgba(192,57,43,0.1)", fg: "#C0392B" },
};

type View = "lobby" | "game" | "results";

export default function Kahoot() {
  const [view, setView] = useState<View>("lobby");
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [qIdx, setQIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timer, setTimer] = useState(10);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  /* timer */
  useEffect(() => {
    if (view !== "game" || showResult || timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [view, showResult, timer]);

  /* time-out → mark unanswered */
  useEffect(() => {
    if (view === "game" && timer === 0 && !showResult) {
      setShowResult(true);
      setStreak(0);
      setAnswers((a) => [...a, null]);
    }
  }, [timer, view, showResult]);

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setQIdx(0);
    setScore(0);
    setStreak(0);
    setTimer(10);
    setSelected(null);
    setShowResult(false);
    setAnswers([]);
    setView("game");
  };

  const pickAnswer = useCallback(
    (idx: number) => {
      if (showResult || !activeQuiz) return;
      setSelected(idx);
      setShowResult(true);
      const correct = activeQuiz.questions[qIdx].correct;
      if (idx === correct) {
        const bonus = streak >= 2 ? 200 : streak >= 1 ? 100 : 0;
        const timeBonus = timer * 50;
        setScore((s) => s + 1000 + bonus + timeBonus);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
      setAnswers((a) => [...a, idx]);
    },
    [showResult, activeQuiz, qIdx, streak, timer],
  );

  const nextQuestion = () => {
    if (!activeQuiz) return;
    if (qIdx + 1 >= activeQuiz.questions.length) {
      setView("results");
    } else {
      setQIdx((i) => i + 1);
      setTimer(10);
      setSelected(null);
      setShowResult(false);
    }
  };

  const backToLobby = () => {
    setView("lobby");
    setActiveQuiz(null);
  };

  /* ── Render ── */
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: b,
        background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)",
        overflow: "hidden",
      }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: 260,
          minWidth: 260,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          borderRight: "1px solid rgba(255,255,255,0.5)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ padding: "28px 24px 24px" }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8, letterSpacing: "0.04em" }}>academy</span>
        </div>

        <div style={{ padding: "0 12px", flex: 1 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
          {navLernen.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                display: "block",
                padding: "10px 14px",
                margin: "2px 0",
                color: item.active ? "#022350" : "#4A4A5A",
                background: item.active ? "rgba(255,255,255,0.8)" : "transparent",
                borderRadius: 12,
                fontWeight: item.active ? 600 : 400,
                fontSize: 13.5,
                textDecoration: "none",
                boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              {item.name}
            </a>
          ))}

          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "20px 12px 8px" }}>ADMIN</div>
          {navAdmin.map((item) => (
            <a
              key={item.name}
              href={item.href}
              style={{
                display: "block",
                padding: "10px 14px",
                margin: "2px 0",
                color: "#4A4A5A",
                background: "transparent",
                borderRadius: 12,
                fontSize: 13.5,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* user */}
        <div
          style={{
            padding: "16px 20px",
            margin: "0 12px 12px",
            background: "rgba(255,255,255,0.6)",
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 12,
              background: "linear-gradient(135deg, #022350, #0E3057)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 500,
              color: "white",
            }}
          >
            LM
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Laura Meier</div>
            <div style={{ fontSize: 10, color: "#9A9AAA" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
        {view === "lobby" && <Lobby quizzes={quizzes} onStart={startQuiz} />}
        {view === "game" && activeQuiz && (
          <Game
            quiz={activeQuiz}
            qIdx={qIdx}
            timer={timer}
            score={score}
            streak={streak}
            selected={selected}
            showResult={showResult}
            onPick={pickAnswer}
            onNext={nextQuestion}
          />
        )}
        {view === "results" && activeQuiz && (
          <Results quiz={activeQuiz} score={score} answers={answers} onBack={backToLobby} />
        )}
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════
   LOBBY
   ══════════════════════════════════════════ */
function Lobby({ quizzes, onStart }: { quizzes: Quiz[]; onStart: (q: Quiz) => void }) {
  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: h, fontSize: 36, fontWeight: 400, color: "#022350", margin: 0, marginBottom: 6 }}>Kahoot!</h1>
        <p style={{ color: "#6B6B7B", fontSize: 14, margin: 0 }}>Teste dein Wissen in spannenden Quiz-Spielen rund um Versicherungen.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340, 1fr))", gap: 20 }}>
        {quizzes.map((quiz) => {
          const dc = difficultyColors[quiz.difficulty] || difficultyColors.Mittel;
          return (
            <div key={quiz.id} style={{ ...card, padding: 0, overflow: "hidden" }}>
              {/* accent bar */}
              <div style={{ height: 6, background: `linear-gradient(90deg, ${quiz.color}, ${quiz.color}88)` }} />
              <div style={{ padding: "24px 28px 28px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h2 style={{ fontFamily: h, fontSize: 24, fontWeight: 500, color: "#022350", margin: 0, marginBottom: 4 }}>{quiz.title}</h2>
                    <span style={{ fontSize: 12, color: "#6B6B7B" }}>{quiz.category}</span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: 20,
                      background: dc.bg,
                      color: dc.fg,
                    }}
                  >
                    {quiz.difficulty}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 20, marginBottom: 20, fontSize: 13, color: "#6B6B7B" }}>
                  <span>{quiz.questions.length} Fragen</span>
                  <span>{quiz.participants} Teilnehmer</span>
                </div>

                <button
                  onClick={() => onStart(quiz)}
                  style={{
                    width: "100%",
                    padding: "14px 0",
                    border: "none",
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${quiz.color}, ${quiz.color}CC)`,
                    color: "white",
                    fontFamily: b,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "transform 0.15s ease, box-shadow 0.15s ease",
                    boxShadow: `0 4px 16px ${quiz.color}33`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 6px 24px ${quiz.color}44`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px ${quiz.color}33`;
                  }}
                >
                  Spiel starten
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ══════════════════════════════════════════
   GAME
   ══════════════════════════════════════════ */
function Game({
  quiz,
  qIdx,
  timer,
  score,
  streak,
  selected,
  showResult,
  onPick,
  onNext,
}: {
  quiz: Quiz;
  qIdx: number;
  timer: number;
  score: number;
  streak: number;
  selected: number | null;
  showResult: boolean;
  onPick: (i: number) => void;
  onNext: () => void;
}) {
  const question = quiz.questions[qIdx];
  const correct = question.correct;
  const total = quiz.questions.length;
  const progress = ((qIdx + (showResult ? 1 : 0)) / total) * 100;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto" }}>
      {/* top bar: score + timer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ ...card, padding: "10px 20px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "#6B6B7B", fontWeight: 500 }}>Punkte</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: "#022350", fontFamily: h }}>{score.toLocaleString()}</span>
          </div>
          {streak >= 2 && (
            <div
              style={{
                ...card,
                padding: "10px 16px",
                background: "rgba(200,162,77,0.12)",
                border: "1px solid rgba(200,162,77,0.3)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 16 }}>&#9889;</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{streak}x Streak!</span>
            </div>
          )}
        </div>

        {/* timer circle */}
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: timer <= 3 ? "linear-gradient(135deg, #C0392B, #E74C3C)" : "linear-gradient(135deg, #022350, #0E3057)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: 22,
            fontWeight: 700,
            fontFamily: h,
            transition: "background 0.3s ease",
            boxShadow: timer <= 3 ? "0 0 20px rgba(192,57,43,0.3)" : "0 4px 16px rgba(2,35,80,0.15)",
          }}
        >
          {timer}
        </div>
      </div>

      {/* progress bar */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#6B6B7B" }}>
            Frage {qIdx + 1} von {total}
          </span>
          <span style={{ fontSize: 12, color: "#6B6B7B" }}>{Math.round(progress)}%</span>
        </div>
        <div style={{ height: 6, borderRadius: 3, background: "rgba(2,35,80,0.08)", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              borderRadius: 3,
              background: "linear-gradient(90deg, #0FA4A0, #1B6FC2)",
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {/* question */}
      <div style={{ ...card, padding: "36px 40px", marginBottom: 24, textAlign: "center" }}>
        <h2
          style={{
            fontFamily: h,
            fontSize: 28,
            fontWeight: 500,
            color: "#022350",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {question.q}
        </h2>
      </div>

      {/* answer options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {question.options.map((opt, i) => {
          const isSelected = selected === i;
          const isCorrect = i === correct;
          let opacity = 1;
          let border = "3px solid transparent";
          let transform = "scale(1)";

          if (showResult) {
            if (isCorrect) {
              border = "3px solid #27AE60";
              transform = "scale(1.02)";
            } else if (isSelected && !isCorrect) {
              opacity = 0.7;
              border = "3px solid #C0392B";
            } else {
              opacity = 0.45;
            }
          }

          return (
            <button
              key={i}
              onClick={() => onPick(i)}
              disabled={showResult}
              style={{
                position: "relative",
                padding: "28px 24px",
                border,
                borderRadius: 18,
                background: optionGradients[i],
                color: "white",
                fontFamily: b,
                fontSize: 16,
                fontWeight: 600,
                cursor: showResult ? "default" : "pointer",
                opacity,
                transform,
                transition: "all 0.3s ease",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 14,
                minHeight: 80,
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}
              onMouseEnter={(e) => {
                if (!showResult) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                if (!showResult) (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {optionLabels[i]}
              </span>
              <span style={{ lineHeight: 1.4 }}>{opt}</span>
              {showResult && isCorrect && (
                <span style={{ position: "absolute", top: 10, right: 14, fontSize: 22 }}>&#10003;</span>
              )}
              {showResult && isSelected && !isCorrect && (
                <span style={{ position: "absolute", top: 10, right: 14, fontSize: 22 }}>&#10007;</span>
              )}
            </button>
          );
        })}
      </div>

      {/* next button */}
      {showResult && (
        <div style={{ textAlign: "center", marginTop: 28 }}>
          <div style={{ marginBottom: 14, fontSize: 16, fontWeight: 600, color: selected === correct ? "#0FA4A0" : selected === null ? "#C8A24D" : "#C0392B" }}>
            {selected === correct ? "Richtig! Weiter so!" : selected === null ? "Zeit abgelaufen!" : "Leider falsch!"}
          </div>
          <button
            onClick={onNext}
            style={{
              padding: "14px 48px",
              border: "none",
              borderRadius: 14,
              background: "linear-gradient(135deg, #022350, #0E3057)",
              color: "white",
              fontFamily: b,
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(2,35,80,0.2)",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            }}
          >
            {qIdx + 1 >= quiz.questions.length ? "Ergebnisse anzeigen" : "Nächste Frage"}
          </button>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   RESULTS
   ══════════════════════════════════════════ */
function Results({
  quiz,
  score,
  answers,
  onBack,
}: {
  quiz: Quiz;
  score: number;
  answers: (number | null)[];
  onBack: () => void;
}) {
  const correctCount = answers.filter((a, i) => a === quiz.questions[i].correct).length;
  const total = quiz.questions.length;
  const pct = Math.round((correctCount / total) * 100);

  /* fake ranking */
  const ranking = [
    { name: "Laura Meier", score, you: true },
    { name: "Thomas Müller", score: Math.max(0, score - 800 + Math.floor(Math.random() * 400)) },
    { name: "Beat Keller", score: Math.max(0, score - 1600 + Math.floor(Math.random() * 600)) },
    { name: "Anna Schneider", score: Math.max(0, score - 2400 + Math.floor(Math.random() * 800)) },
  ].sort((a, bb) => bb.score - a.score);

  const yourRank = ranking.findIndex((r) => r.you) + 1;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {/* hero */}
      <div
        style={{
          ...card,
          padding: "48px 40px",
          textAlign: "center",
          marginBottom: 28,
          background: "linear-gradient(135deg, rgba(2,35,80,0.04), rgba(15,164,160,0.06))",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>
          {pct >= 80 ? "\uD83C\uDFC6" : pct >= 50 ? "\uD83C\uDF1F" : "\uD83D\uDCAA"}
        </div>
        <h1 style={{ fontFamily: h, fontSize: 36, fontWeight: 400, color: "#022350", margin: "0 0 8px" }}>
          {quiz.title} — Ergebnis
        </h1>
        <div style={{ fontSize: 48, fontWeight: 700, color: "#022350", fontFamily: h, margin: "16px 0 4px" }}>
          {score.toLocaleString()}
        </div>
        <div style={{ fontSize: 14, color: "#6B6B7B", marginBottom: 16 }}>Punkte</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 32 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#0FA4A0", fontFamily: h }}>{correctCount}/{total}</div>
            <div style={{ fontSize: 12, color: "#6B6B7B" }}>Richtig</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#1B6FC2", fontFamily: h }}>{pct}%</div>
            <div style={{ fontSize: 12, color: "#6B6B7B" }}>Quote</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: "#C8A24D", fontFamily: h }}>#{yourRank}</div>
            <div style={{ fontSize: 12, color: "#6B6B7B" }}>Rang</div>
          </div>
        </div>
      </div>

      {/* ranking */}
      <div style={{ ...card, padding: "24px 28px", marginBottom: 28 }}>
        <h3 style={{ fontFamily: h, fontSize: 22, fontWeight: 400, color: "#022350", margin: "0 0 16px" }}>Rangliste</h3>
        {ranking.map((r, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 16px",
              borderRadius: 12,
              background: r.you ? "rgba(15,164,160,0.06)" : "transparent",
              border: r.you ? "1px solid rgba(15,164,160,0.15)" : "1px solid transparent",
              marginBottom: 4,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background:
                  i === 0
                    ? "linear-gradient(135deg, #C8A24D, #E0B95F)"
                    : i === 1
                      ? "linear-gradient(135deg, #9A9AAA, #B0B0B8)"
                      : i === 2
                        ? "linear-gradient(135deg, #B87333, #D4915C)"
                        : "#E8E8EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: i < 3 ? "white" : "#6B6B7B",
              }}
            >
              {i + 1}
            </span>
            <span style={{ flex: 1, fontSize: 14, fontWeight: r.you ? 600 : 400, color: "#022350" }}>
              {r.name} {r.you && <span style={{ fontSize: 11, color: "#0FA4A0" }}>(Du)</span>}
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#022350", fontFamily: h }}>{r.score.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {/* answers summary */}
      <div style={{ ...card, padding: "24px 28px", marginBottom: 28 }}>
        <h3 style={{ fontFamily: h, fontSize: 22, fontWeight: 400, color: "#022350", margin: "0 0 16px" }}>Antworten</h3>
        {quiz.questions.map((q, i) => {
          const userAnswer = answers[i];
          const isCorrect = userAnswer === q.correct;
          return (
            <div
              key={i}
              style={{
                padding: "16px 0",
                borderBottom: i < quiz.questions.length - 1 ? "1px solid rgba(2,35,80,0.06)" : "none",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
                <span
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 8,
                    background: isCorrect ? "rgba(15,164,160,0.12)" : "rgba(192,57,43,0.1)",
                    color: isCorrect ? "#0FA4A0" : "#C0392B",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {isCorrect ? "\u2713" : "\u2717"}
                </span>
                <span style={{ fontSize: 14, color: "#022350", fontWeight: 500, lineHeight: 1.4 }}>{q.q}</span>
              </div>
              <div style={{ marginLeft: 34, fontSize: 13 }}>
                {userAnswer !== null && userAnswer !== q.correct && (
                  <div style={{ color: "#C0392B", marginBottom: 2 }}>
                    Deine Antwort: {q.options[userAnswer]}
                  </div>
                )}
                {userAnswer === null && (
                  <div style={{ color: "#C8A24D", marginBottom: 2 }}>Nicht beantwortet</div>
                )}
                <div style={{ color: "#0FA4A0" }}>Richtig: {q.options[q.correct]}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* back button */}
      <div style={{ textAlign: "center", paddingBottom: 40 }}>
        <button
          onClick={onBack}
          style={{
            padding: "14px 48px",
            border: "none",
            borderRadius: 14,
            background: "linear-gradient(135deg, #022350, #0E3057)",
            color: "white",
            fontFamily: b,
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(2,35,80,0.2)",
            transition: "transform 0.15s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
          }}
        >
          Zurück zur Lobby
        </button>
      </div>
    </div>
  );
}
