"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

/* ===== QUIZ DATA ===== */

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number; // index of correct answer
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  course: string;
  courseId: number;
  passingScore: number;
  timeLimit: string;
  questions: Question[];
}

const quizzes: Record<string, Quiz> = {
  "sach-grundbegriffe": {
    id: "sach-grundbegriffe", title: "Quiz: Grundbegriffe Sachversicherung", course: "Grundlagen der Sachversicherung", courseId: 1, passingScore: 70, timeLimit: "5 min",
    questions: [
      { id: "q1", question: "Welche Versicherungsart gehoert NICHT zur Sachversicherung?", options: ["Gebaeudeversicherung", "Hausratversicherung", "Lebensversicherung", "Betriebsunterbrechungsversicherung"], correct: 2, explanation: "Die Lebensversicherung gehoert zur Personenversicherung, nicht zur Sachversicherung." },
      { id: "q2", question: "Was deckt die Hausratversicherung in der Regel ab?", options: ["Schaeden am Gebaeude selbst", "Schaeden an beweglichen Gegenstaenden im Haushalt", "Haftpflichtansprueche Dritter", "Schaeden am Fahrzeug"], correct: 1, explanation: "Die Hausratversicherung schuetzt bewegliche Gegenstaende im Haushalt gegen Schaeden durch Feuer, Wasser, Einbruch etc." },
      { id: "q3", question: "Wer ist in der Schweiz fuer die Gebaeudeversicherung zustaendig?", options: ["Ausschliesslich private Versicherer", "In 19 Kantonen die kantonale Gebaeudeversicherung", "Die Bundesversicherung", "Die Gemeinden"], correct: 1, explanation: "In 19 von 26 Kantonen ist die Gebaeudeversicherung durch kantonale Monopolanstalten geregelt. In den restlichen Kantonen sind private Versicherer zugelassen." },
      { id: "q4", question: "Was versteht man unter einer 'Unterversicherung'?", options: ["Der Versicherungsnehmer zahlt zu hohe Praemien", "Die Versicherungssumme ist niedriger als der tatsaechliche Wert", "Die Versicherung wurde gekuendigt", "Der Selbstbehalt ist zu hoch"], correct: 1, explanation: "Bei einer Unterversicherung ist die vereinbarte Versicherungssumme niedriger als der tatsaechliche Wert der versicherten Sache. Im Schadenfall wird dann nur anteilig entschaedigt." },
      { id: "q5", question: "Welches Prinzip gilt bei der Sachversicherung bezueglich der Entschaedigung?", options: ["Gewinnprinzip", "Bereicherungsverbot", "Maximalprinzip", "Pauschalentschaedigung"], correct: 1, explanation: "In der Sachversicherung gilt das Bereicherungsverbot: Der Versicherungsnehmer soll durch die Versicherungsleistung nicht bessergestellt werden als vor dem Schadenfall." },
    ],
  },
  "sach-produkte": {
    id: "sach-produkte", title: "Quiz: Produktkenntnisse Sachversicherung", course: "Grundlagen der Sachversicherung", courseId: 1, passingScore: 70, timeLimit: "8 min",
    questions: [
      { id: "q1", question: "Was deckt eine Betriebsunterbrechungsversicherung (BU) ab?", options: ["Schaeden an Betriebsgebaeuden", "Entgangenen Gewinn und laufende Kosten bei Betriebsstillstand", "Haftpflichtansprueche von Mitarbeitern", "Diebstahl von Betriebsmitteln"], correct: 1, explanation: "Die BU-Versicherung deckt den entgangenen Betriebsgewinn und die weiterlaufenden Fixkosten, wenn der Betrieb aufgrund eines versicherten Schadens stillsteht." },
      { id: "q2", question: "Welcher Wert wird bei der Gebaeudeversicherung in der Regel versichert?", options: ["Verkehrswert", "Neuwert / Wiederherstellungswert", "Buchwert", "Ertragswert"], correct: 1, explanation: "Bei der Gebaeudeversicherung wird in der Regel der Neuwert bzw. Wiederherstellungswert versichert, also die Kosten fuer einen gleichwertigen Neubau." },
      { id: "q3", question: "Was ist der Unterschied zwischen Zeitwert und Neuwert?", options: ["Es gibt keinen Unterschied", "Der Zeitwert beruecksichtigt Altersentwertung, der Neuwert nicht", "Der Neuwert ist immer niedriger als der Zeitwert", "Der Zeitwert gilt nur fuer Immobilien"], correct: 1, explanation: "Der Zeitwert beruecksichtigt den Zustand und das Alter einer Sache (Neuwert minus Altersentwertung), waehrend der Neuwert den Preis fuer eine gleichwertige neue Sache darstellt." },
      { id: "q4", question: "Welche Gefahr ist typischerweise in einer Feuerversicherung eingeschlossen?", options: ["Ueberschwemmung", "Erdbeben", "Blitzschlag", "Hagel"], correct: 2, explanation: "Blitzschlag ist eine typische in der Feuerversicherung eingeschlossene Gefahr, zusammen mit Brand und Explosion." },
      { id: "q5", question: "Was ist ein Selbstbehalt?", options: ["Die maximale Versicherungssumme", "Der Betrag, den der Versicherungsnehmer im Schadenfall selbst traegt", "Die jaehrliche Praemie", "Ein Rabatt auf die Versicherungspraemie"], correct: 1, explanation: "Der Selbstbehalt (auch Franchise) ist der Betrag, den der Versicherungsnehmer bei jedem Schadenfall selbst tragen muss, bevor die Versicherung leistet." },
    ],
  },
  "leben-grundlagen": {
    id: "leben-grundlagen", title: "Quiz: Grundlagen Lebensversicherung", course: "Lebensversicherungen: Produktkenntnisse", courseId: 2, passingScore: 70, timeLimit: "5 min",
    questions: [
      { id: "q1", question: "Aus welchen drei Saeulen besteht das Schweizer Vorsorgesystem?", options: ["AHV, BVG, Saeule 3", "AHV, IV, EO", "UVG, BVG, KVG", "AHV, UVG, Saeule 3"], correct: 0, explanation: "Das Schweizer 3-Saeulen-System besteht aus der AHV/IV (1. Saeule), der beruflichen Vorsorge BVG (2. Saeule) und der privaten Vorsorge Saeule 3a/3b (3. Saeule)." },
      { id: "q2", question: "Was ist der Hauptzweck der 2. Saeule (BVG)?", options: ["Existenzsicherung", "Fortfuehrung des gewohnten Lebensstandards", "Steueroptimierung", "Vermoegensverwaltung"], correct: 1, explanation: "Die 2. Saeule soll zusammen mit der 1. Saeule die Fortfuehrung des gewohnten Lebensstandards in angemessener Weise ermoeglichen." },
      { id: "q3", question: "Welchen steuerlichen Vorteil bietet die Saeule 3a?", options: ["Keine Steuern auf Kapitalertraege", "Einzahlungen sind vom steuerbaren Einkommen abziehbar", "Komplette Steuerfreiheit", "Nur im Kanton Zuerich steuerbefreit"], correct: 1, explanation: "Einzahlungen in die Saeule 3a koennen vom steuerbaren Einkommen abgezogen werden (bis zum jaehrlichen Maximum). Beim Bezug wird das Kapital zu einem reduzierten Satz besteuert." },
      { id: "q4", question: "Was ist eine gemischte Lebensversicherung?", options: ["Eine Versicherung die Leben und Sach kombiniert", "Eine Kombination aus Risiko- und Sparversicherung", "Eine Versicherung fuer Ehepaare", "Eine Versicherung mit variabler Praemie"], correct: 1, explanation: "Die gemischte Lebensversicherung kombiniert den Risikoschutz (Todesfallleistung) mit einem Sparvorgang (Erlebensfallleistung). Sie ist das klassische Lebensversicherungsprodukt." },
      { id: "q5", question: "Was versteht man unter dem Rueckkaufswert?", options: ["Der Betrag bei Vertragsablauf", "Der Betrag, den der Versicherer bei vorzeitiger Kuendigung auszahlt", "Die Summe aller gezahlten Praemien", "Der aktuelle Boersenwert der Anlage"], correct: 1, explanation: "Der Rueckkaufswert ist der Betrag, den die Versicherungsgesellschaft auszahlt, wenn der Versicherungsnehmer den Vertrag vor Ablauf kuendigt. Er ist in der Regel niedriger als die Summe der eingezahlten Praemien." },
    ],
  },
};

/* ===== QUIZ COMPONENT ===== */

type QuizState = "intro" | "active" | "result";

export default function QuizPage() {
  const params = useParams();
  const quizId = params.id as string;
  const quiz = quizzes[quizId];

  const [state, setState] = useState<QuizState>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  if (!quiz) {
    return (
      <DashboardLayout title="Quiz nicht gefunden" subtitle="">
        <div className="z-card-static" style={{ padding: 40, textAlign: "center" }}>
          <div className="font-heading" style={{ fontSize: 22, color: "#022350", marginBottom: 8 }}>Quiz nicht verfuegbar</div>
          <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 20 }}>Dieses Quiz existiert nicht oder wurde noch nicht freigeschaltet.</div>
          <Link href="/courses" className="z-btn z-btn-primary" style={{ textDecoration: "none" }}>Zurueck zu Kursen</Link>
        </div>
      </DashboardLayout>
    );
  }

  const question = quiz.questions[currentQ];
  const totalQuestions = quiz.questions.length;
  const correctCount = answers.filter((a, i) => a === quiz.questions[i]?.correct).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= quiz.passingScore;

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);

    if (currentQ < totalQuestions - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setState("result");
    }
  };

  /* ---- INTRO ---- */
  if (state === "intro") {
    return (
      <DashboardLayout title={quiz.title} subtitle={quiz.course} actions={
        <Link href={`/courses/${quiz.courseId}`} className="z-btn z-btn-ghost" style={{ textDecoration: "none", fontSize: 12.5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          Zurueck zum Kurs
        </Link>
      }>
        <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 20 }}>
          <div className="z-card-static animate-scale-in" style={{ padding: "44px 40px", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 18, background: "rgba(200,162,77,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            </div>
            <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "#022350", marginBottom: 8 }}>{quiz.title}</div>
            <div style={{ fontSize: 13.5, color: "#9A9AAA", marginBottom: 28 }}>{quiz.course}</div>

            <div className="z-gold-line" style={{ margin: "0 auto 24px" }} />

            <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 32 }}>
              <div style={{ textAlign: "center" }}>
                <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "#022350" }}>{totalQuestions}</div>
                <div style={{ fontSize: 11.5, color: "#9A9AAA" }}>Fragen</div>
              </div>
              <div style={{ width: 1, background: "#ECE8E1" }} />
              <div style={{ textAlign: "center" }}>
                <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "#022350" }}>{quiz.passingScore}%</div>
                <div style={{ fontSize: 11.5, color: "#9A9AAA" }}>Bestehensgrenze</div>
              </div>
              <div style={{ width: 1, background: "#ECE8E1" }} />
              <div style={{ textAlign: "center" }}>
                <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "#022350" }}>{quiz.timeLimit}</div>
                <div style={{ fontSize: 11.5, color: "#9A9AAA" }}>Zeitlimit</div>
              </div>
            </div>

            <button onClick={() => setState("active")} className="z-btn z-btn-primary" style={{ padding: "12px 36px", fontSize: 14 }}>
              Quiz starten
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ---- RESULT ---- */
  if (state === "result") {
    return (
      <DashboardLayout title="Ergebnis" subtitle={quiz.title} actions={
        <Link href={`/courses/${quiz.courseId}`} className="z-btn z-btn-ghost" style={{ textDecoration: "none", fontSize: 12.5 }}>
          Zurueck zum Kurs
        </Link>
      }>
        <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 20 }}>
          <div className="z-card-static animate-scale-in" style={{ padding: "44px 40px", textAlign: "center" }}>
            {/* Score ring */}
            <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 24px" }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="58" fill="none" stroke="#F0ECE6" strokeWidth="6" />
                <circle cx="70" cy="70" r="58" fill="none" stroke={passed ? "#0FA4A0" : "#C0392B"} strokeWidth="6" strokeLinecap="round" strokeDasharray="364" strokeDashoffset={364 - (364 * scorePercent) / 100} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1.5s ease" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div className="font-heading" style={{ fontSize: 44, fontWeight: 400, color: passed ? "#0FA4A0" : "#C0392B" }}>{scorePercent}</div>
                <div style={{ fontSize: 12, color: "#9A9AAA" }}>%</div>
              </div>
            </div>

            <div className="z-badge" style={{ background: passed ? "rgba(15,164,160,0.08)" : "rgba(192,57,43,0.06)", color: passed ? "#0FA4A0" : "#C0392B", fontSize: 12, padding: "5px 16px", marginBottom: 16 }}>
              {passed ? "Bestanden" : "Nicht bestanden"}
            </div>

            <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350", marginBottom: 8 }}>
              {passed ? "Glueckwunsch!" : "Leider nicht bestanden"}
            </div>
            <div style={{ fontSize: 13.5, color: "#9A9AAA", marginBottom: 24 }}>
              {correctCount} von {totalQuestions} Fragen richtig · Bestehensgrenze {quiz.passingScore}%
            </div>

            <div className="z-gold-line" style={{ margin: "0 auto 24px" }} />

            {/* Answer review */}
            <div style={{ textAlign: "left", marginBottom: 28 }}>
              {quiz.questions.map((q, i) => {
                const userAnswer = answers[i];
                const isCorrect = userAnswer === q.correct;
                return (
                  <div key={q.id} style={{ padding: "14px 0", borderBottom: i < totalQuestions - 1 ? "1px solid #F0ECE6" : "none" }}>
                    <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: isCorrect ? "#0FA4A0" : "#C0392B", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        {isCorrect ? (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        ) : (
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#022350", marginBottom: 4 }}>{q.question}</div>
                        {!isCorrect && <div style={{ fontSize: 12, color: "#C0392B", marginBottom: 2 }}>Deine Antwort: {q.options[userAnswer ?? 0]}</div>}
                        <div style={{ fontSize: 12, color: "#0FA4A0" }}>Richtig: {q.options[q.correct]}</div>
                        <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 4, lineHeight: 1.5 }}>{q.explanation}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              {!passed && (
                <button onClick={() => { setState("intro"); setCurrentQ(0); setSelected(null); setConfirmed(false); setAnswers([]); }} className="z-btn z-btn-primary">
                  Nochmal versuchen
                </button>
              )}
              <Link href={`/courses/${quiz.courseId}`} className="z-btn z-btn-ghost" style={{ textDecoration: "none" }}>
                {passed ? "Zurueck zum Kurs" : "Spaeter wiederholen"}
              </Link>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  /* ---- ACTIVE QUIZ ---- */
  return (
    <DashboardLayout title={`Frage ${currentQ + 1} von ${totalQuestions}`} subtitle={quiz.title}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 4, marginBottom: 28 }}>
          {quiz.questions.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < currentQ ? "#0FA4A0" : i === currentQ ? "#C8A24D" : "#ECE8E1", transition: "background 0.3s ease" }} />
          ))}
        </div>

        <div className="z-card-static animate-fade-in-up" style={{ padding: "36px 36px 32px" }}>
          {/* Question */}
          <div style={{ fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Frage {currentQ + 1}</div>
          <div className="font-heading" style={{ fontSize: 22, fontWeight: 400, color: "#022350", lineHeight: 1.4, marginBottom: 28 }}>{question.question}</div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {question.options.map((opt, oi) => {
              const isSelected = selected === oi;
              const isCorrect = oi === question.correct;
              const showCorrect = confirmed && isCorrect;
              const showWrong = confirmed && isSelected && !isCorrect;

              let borderColor = "#ECE8E1";
              let bg = "white";
              let textColor = "#4A4A5A";

              if (showCorrect) { borderColor = "#0FA4A0"; bg = "rgba(15,164,160,0.04)"; textColor = "#0FA4A0"; }
              else if (showWrong) { borderColor = "#C0392B"; bg = "rgba(192,57,43,0.03)"; textColor = "#C0392B"; }
              else if (isSelected && !confirmed) { borderColor = "#C8A24D"; bg = "rgba(200,162,77,0.04)"; textColor = "#022350"; }

              return (
                <button
                  key={oi}
                  onClick={() => !confirmed && setSelected(oi)}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 14, border: `1.5px solid ${borderColor}`, background: bg, cursor: confirmed ? "default" : "pointer", fontFamily: "inherit", fontSize: 14, color: textColor, textAlign: "left", transition: "all 0.2s ease", fontWeight: isSelected ? 500 : 400 }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 8, border: `1.5px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, background: isSelected && !confirmed ? "#C8A24D" : showCorrect ? "#0FA4A0" : showWrong ? "#C0392B" : "white", color: (isSelected && !confirmed) || showCorrect || showWrong ? "white" : "#9A9AAA" }}>
                    {showCorrect ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                    ) : showWrong ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    ) : (
                      String.fromCharCode(65 + oi)
                    )}
                  </div>
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {confirmed && (
            <div className="animate-fade-in-up" style={{ background: "#FAF8F5", borderRadius: 12, padding: "16px 20px", marginBottom: 24, border: "1px solid #ECE8E1" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Erklaerung</div>
              <div style={{ fontSize: 13.5, color: "#4A4A5A", lineHeight: 1.65 }}>{question.explanation}</div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            {!confirmed ? (
              <button onClick={handleConfirm} className="z-btn z-btn-primary" style={{ opacity: selected === null ? 0.4 : 1 }}>
                Antwort pruefen
              </button>
            ) : (
              <button onClick={handleNext} className="z-btn z-btn-primary">
                {currentQ < totalQuestions - 1 ? "Naechste Frage" : "Ergebnis anzeigen"}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
