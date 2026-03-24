"use client";
import { useState, useEffect, use } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type Question = { q: string; options: string[]; correct: number };
type ExamConfig = { title: string; color: string; icon: string; questionCount: number; timeMinutes: number; passRate: number };

const examConfigs: Record<string, ExamConfig> = {
  "trainee-ausbildung": { title: "Trainee-Ausbildung Abschlussprüfung", color: "#0FA4A0", icon: "🎓", questionCount: 60, timeMinutes: 60, passRate: 80 },
  "compliance-schulung": { title: "Compliance-Schulung Abschlussprüfung", color: "#e74c3c", icon: "⚖️", questionCount: 65, timeMinutes: 60, passRate: 80 },
  "vbv-grundausbildung": { title: "VBV Grundausbildung Abschlussprüfung", color: "#022350", icon: "📋", questionCount: 70, timeMinutes: 60, passRate: 80 },
  "vbv-krankenkassenzusatz": { title: "VBV Krankenkassenzusatz Abschlussprüfung", color: "#1B6FC2", icon: "🏥", questionCount: 65, timeMinutes: 60, passRate: 80 },
  "vbv-sach-vermoegen": { title: "VBV Sach- & Vermögen Abschlussprüfung", color: "#6366f1", icon: "🏢", questionCount: 70, timeMinutes: 60, passRate: 80 },
  "vbv-muendliche-pruefung": { title: "Mündliche Generalprobe", color: "#C8A24D", icon: "🎤", questionCount: 30, timeMinutes: 45, passRate: 80 },
  "telefontraining": { title: "Telefontraining Abschlussprüfung", color: "#0FA4A0", icon: "📞", questionCount: 60, timeMinutes: 60, passRate: 80 },
  "verkaufstraining": { title: "Verkaufstraining Abschlussprüfung", color: "#C8A24D", icon: "💼", questionCount: 60, timeMinutes: 60, passRate: 80 },
  "einwandbehandlung": { title: "Einwandbehandlung Abschlussprüfung", color: "#1B6FC2", icon: "🎯", questionCount: 60, timeMinutes: 60, passRate: 80 },
};

const questions: Question[] = [
  { q: "Was regelt das Versicherungsvertragsgesetz (VVG)?", options: ["Das Verhältnis zwischen Versicherer und Versicherungsnehmer", "Die Sozialversicherungen der Schweiz", "Das Bankengesetz", "Das Steuerrecht"], correct: 0 },
  { q: "Wie lange dauert das Widerrufsrecht nach der VVG-Revision 2022?", options: ["7 Tage", "14 Tage", "30 Tage", "Es gibt kein Widerrufsrecht"], correct: 1 },
  { q: "Was ist eine Versicherungsprämie?", options: ["Eine Schadenszahlung des Versicherers", "Das Entgelt für den Versicherungsschutz", "Die Provision des Vermittlers", "Eine staatliche Steuer"], correct: 1 },
  { q: "Welches Gesetz regelt die AHV (Alters- und Hinterlassenenversicherung)?", options: ["VVG", "AHVG", "OR", "BVG"], correct: 1 },
  { q: "Was besagt das Äquivalenzprinzip in der Versicherung?", options: ["Die Prämie entspricht dem versicherten Risiko", "Alle Versicherungsnehmer zahlen den gleichen Beitrag", "Solidarität unter den Versicherten", "Gewinnmaximierung des Versicherers"], correct: 0 },
  { q: "Wann muss eine Gefahrerhöhung dem Versicherer gemeldet werden?", options: ["Nach dem nächsten Schadenfall", "Innerhalb von 14 Tagen", "Unverzüglich", "Gar nicht, der Versicherer prüft selbst"], correct: 2 },
  { q: "Was bedeutet Unterversicherung?", options: ["Die Versicherungssumme ist tiefer als der tatsächliche Wert", "Es besteht kein Versicherungsschutz", "Es liegt eine Doppelversicherung vor", "Die Versicherungssumme ist höher als der Wert"], correct: 0 },
  { q: "Welche Säule des Schweizer Vorsorgesystems ist die berufliche Vorsorge?", options: ["1. Säule (AHV/IV)", "2. Säule (BVG)", "3. Säule (private Vorsorge)", "4. Säule (Ergänzungsleistungen)"], correct: 1 },
  { q: "Wofür steht die Abkürzung FIDLEG?", options: ["Finanzdienstleistungsgesetz", "Finanzinstitutsgesetz", "Fondsanlagegesetz", "Finanzmarktaufsichtsgesetz"], correct: 0 },
  { q: "Wann greift die obligatorische Unfallversicherung (UVG)?", options: ["Bei jeder Krankheit", "Bei Berufsunfällen und Berufskrankheiten", "Nur bei Freizeitunfällen", "Nie bei Selbständigen"], correct: 1 },
  { q: "Was ist die Schadenminderungspflicht?", options: ["Der Versicherer muss Kosten sparen", "Der VN muss den Schaden so gering wie möglich halten", "Die Franchise bei Krankenversicherungen", "Der Selbstbehalt im Schadenfall"], correct: 1 },
  { q: "Wie heisst die Finanzmarktaufsichtsbehörde der Schweiz?", options: ["SNB (Schweizerische Nationalbank)", "FINMA", "SBB", "SECO"], correct: 1 },
  { q: "Was regelt das KVG (Krankenversicherungsgesetz)?", options: ["Die obligatorische Krankenpflegeversicherung", "Nur die Zusatzversicherungen", "Die Unfallversicherung", "Die Lebensversicherung"], correct: 0 },
  { q: "Was ist eine Versicherungspolice?", options: ["Der Versicherungsantrag", "Der Versicherungsschein / die Vertragsurkunde", "Die Prämienrechnung", "Die Kündigung"], correct: 1 },
  { q: "Was bedeutet Subrogation im Versicherungsrecht?", options: ["Eine Prämienreduktion", "Der Übergang von Forderungen auf den Versicherer", "Eine Vertragserneuerung", "Eine Schadenszahlung"], correct: 1 },
  { q: "Wer ist der Begünstigte bei einer Lebensversicherung?", options: ["Immer der Versicherungsnehmer", "Die Person, die die Versicherungsleistung erhält", "Der Versicherer", "Der Versicherungsmakler"], correct: 1 },
  { q: "Was ist eine Franchise in der Krankenversicherung?", options: ["Der jährliche Selbstbehalt des Versicherten", "Die monatliche Prämie", "Die Provision des Beraters", "Eine kantonale Steuer"], correct: 0 },
  { q: "Was versteht man unter einer Obliegenheit?", options: ["Eine vertragliche Verhaltenspflicht des Versicherungsnehmers", "Die Leistungspflicht des Versicherers", "Die Prämienzahlung", "Ein Gesetz"], correct: 0 },
  { q: "Wann tritt der Versicherungsfall ein?", options: ["Bei Vertragsabschluss", "Bei Realisierung des versicherten Risikos", "Bei Kündigung des Vertrags", "Bei Prämienzahlung"], correct: 1 },
  { q: "Was besagt das Solidaritätsprinzip in der Versicherung?", options: ["Jeder zahlt nur für sich selbst", "Die Gemeinschaft der Versicherten trägt das Einzelrisiko", "Gewinne werden geteilt", "Der Staat garantiert alle Leistungen"], correct: 1 },
];

export default function Pruefung({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const config = examConfigs[slug] || examConfigs["vbv-grundausbildung"];

  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examFinished, setExamFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(config.timeMinutes * 60);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!examStarted || examFinished) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setExamFinished(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, examFinished]);

  const answeredCount = Object.keys(answers).length;
  const totalQ = questions.length;
  const correctCount = Object.entries(answers).filter(([i, a]) => questions[Number(i)]?.correct === a).length;
  const scorePct = Math.round((correctCount / totalQ) * 100);
  const passed = scorePct >= config.passRate;
  const neededCorrect = Math.ceil((config.passRate / 100) * totalQ);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  const selectAnswer = (qi: number, ai: number) => { setAnswers(prev => ({ ...prev, [qi]: ai })); };
  const submitExam = () => { setExamFinished(true); };

  // ==================== INTRO SCREEN ====================
  if (!examStarted) {
    return (
      <div style={{ height: "100vh", fontFamily: b, background: "#FAF8F5", display: "flex", flexDirection: "column" }}>
        <div style={{ background: `linear-gradient(135deg, ${config.color} 0%, ${config.color}cc 50%, ${config.color}99 100%)`, padding: "48px 40px", position: "relative", overflow: "hidden", textAlign: "center" }}>
          <svg viewBox="0 0 800 200" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }}>
            <pattern id="examGrid" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="15" cy="15" r="1" fill="white" /></pattern>
            <rect width="100%" height="100%" fill="url(#examGrid)" />
          </svg>
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>{config.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 400, color: "white", fontFamily: h }}>{config.title}</div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
          <div style={{ maxWidth: 600, width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
              {[
                { label: "Fragen", value: `${config.questionCount}`, sub: `(${totalQ} Demo-Fragen)` },
                { label: "Zeitlimit", value: `${config.timeMinutes} Min.`, sub: "Countdown läuft" },
                { label: "Bestehensquote", value: `${config.passRate}%`, sub: `${neededCorrect} von ${totalQ} richtig` },
              ].map((s, i) => (
                <div key={i} style={{ background: "white", borderRadius: 18, border: "1px solid #F0ECE6", padding: "22px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 400, color: config.color, fontFamily: h }}>{s.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#022350", marginTop: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 10, color: "#9A9AAA", marginTop: 2 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "white", borderRadius: 18, border: "1px solid #F0ECE6", padding: "24px 28px", marginBottom: 32 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 14 }}>Regeln</div>
              {[
                "Jede Frage hat genau eine richtige Antwort",
                "Du kannst zwischen Fragen frei navigieren",
                "Die Zeit läuft ab dem Moment, wo du startest",
                `Du brauchst mindestens ${config.passRate}% richtige Antworten`,
                "Die Prüfung wird automatisch abgegeben wenn die Zeit abläuft",
              ].map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", padding: "6px 0" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: config.color, opacity: 0.4, flexShrink: 0 }} />
                  <div style={{ fontSize: 13, color: "#4A4A5A" }}>{r}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <a href={`/lernpfade/${slug}`} style={{ padding: "12px 24px", background: "rgba(0,0,0,0.04)", color: "#4A4A5A", borderRadius: 14, fontSize: 14, textDecoration: "none" }}>← Zurück</a>
              <button onClick={() => setExamStarted(true)} style={{ padding: "12px 36px", background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, color: "white", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: b, boxShadow: `0 4px 16px ${config.color}40` }}>Prüfung starten →</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==================== RESULTS SCREEN ====================
  if (examFinished) {
    return (
      <div style={{ height: "100vh", fontFamily: b, background: "#FAF8F5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        {passed && (
          <>
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 8 + Math.random() * 12, height: 8 + Math.random() * 12,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                background: ["#0FA4A0", "#C8A24D", "#1B6FC2", "#E0B95F", "#14C4BF"][i % 5],
                opacity: 0.15 + Math.random() * 0.2,
                left: Math.random() * 100 + "%", top: Math.random() * 100 + "%",
              }} />
            ))}
          </>
        )}
        <div style={{ maxWidth: 500, width: "100%", textAlign: "center", position: "relative" }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>{passed ? "🎉" : "😔"}</div>
          <div style={{ fontSize: 36, fontWeight: 400, color: "#022350", fontFamily: h, marginBottom: 8 }}>
            {passed ? "Bestanden!" : "Leider nicht bestanden"}
          </div>
          <div style={{ fontSize: 14, color: "#9A9AAA", marginBottom: 32 }}>{config.title}</div>

          {/* Score Ring */}
          <div style={{ position: "relative", width: 160, height: 160, margin: "0 auto 24px" }}>
            <svg viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="60" cy="60" r="50" fill="none" stroke="#F0ECE6" strokeWidth="10" />
              <circle cx="60" cy="60" r="50" fill="none" stroke={passed ? "#0FA4A0" : "#e74c3c"} strokeWidth="10" strokeDasharray={`${(scorePct / 100) * 314} 314`} strokeLinecap="round" />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 400, color: passed ? "#0FA4A0" : "#e74c3c", fontFamily: h }}>{scorePct}%</div>
              <div style={{ fontSize: 10, color: "#9A9AAA" }}>{correctCount}/{totalQ} richtig</div>
            </div>
          </div>

          <div style={{ fontSize: 14, color: "#4A4A5A", marginBottom: 8 }}>
            Du hast <strong>{correctCount} von {totalQ}</strong> Fragen richtig beantwortet.
          </div>
          <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 32 }}>
            {passed ? `Herzlichen Glückwunsch! Du hast die Mindestanforderung von ${config.passRate}% erreicht.` : `Du brauchst mindestens ${config.passRate}% (${neededCorrect} richtige Antworten). Versuch es erneut!`}
          </div>

          {/* Wrong answers summary */}
          {!passed && (
            <div style={{ background: "white", borderRadius: 18, border: "1px solid #F0ECE6", padding: "20px 24px", marginBottom: 24, textAlign: "left", maxHeight: 200, overflowY: "auto" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#e74c3c", marginBottom: 10 }}>Falsch beantwortete Fragen:</div>
              {Object.entries(answers).filter(([i, a]) => questions[Number(i)]?.correct !== a).map(([i]) => (
                <div key={i} style={{ fontSize: 12, color: "#4A4A5A", padding: "4px 0", borderBottom: "1px solid #F0ECE6" }}>
                  Frage {Number(i) + 1}: {questions[Number(i)]?.q.substring(0, 60)}...
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <a href={`/lernpfade/${slug}`} style={{ padding: "12px 24px", background: "rgba(0,0,0,0.04)", color: "#4A4A5A", borderRadius: 14, fontSize: 14, textDecoration: "none" }}>Zurück zum Lernpfad</a>
            {passed ? (
              <a href="/zertifikate" style={{ padding: "12px 28px", background: "linear-gradient(135deg, #0FA4A0, #14C4BF)", color: "white", borderRadius: 14, fontSize: 14, fontWeight: 600, textDecoration: "none", boxShadow: "0 4px 12px rgba(15,164,160,0.3)" }}>Zertifikat anzeigen →</a>
            ) : (
              <button onClick={() => { setExamFinished(false); setExamStarted(false); setAnswers({}); setCurrentQuestion(0); setTimeLeft(config.timeMinutes * 60); }} style={{ padding: "12px 28px", background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, color: "white", border: "none", borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: b }}>Erneut versuchen</button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==================== EXAM MODE ====================
  const question = questions[currentQuestion];
  return (
    <div style={{ height: "100vh", fontFamily: b, background: "#FAF8F5", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* TOP BAR */}
      <div style={{ background: "white", borderBottom: "1px solid #F0ECE6", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontSize: 20 }}>{config.icon}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{config.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 13, color: "#9A9AAA" }}>Frage <strong style={{ color: "#022350" }}>{currentQuestion + 1}</strong> von {totalQ}</div>
          <div style={{ padding: "6px 14px", borderRadius: 10, background: timeLeft < 300 ? "rgba(231,76,60,0.08)" : "rgba(2,35,80,0.04)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14 }}>⏱</span>
            <span style={{ fontSize: 15, fontWeight: 600, color: timeLeft < 300 ? "#e74c3c" : "#022350", fontFamily: h, fontVariantNumeric: "tabular-nums" }}>{mm}:{ss}</span>
          </div>
          <div style={{ fontSize: 12, color: "#9A9AAA" }}>{answeredCount}/{totalQ} beantwortet</div>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ height: 3, background: "#F0ECE6", flexShrink: 0 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${config.color}, ${config.color}99)`, width: (answeredCount / totalQ * 100) + "%", transition: "width 0.3s ease" }} />
      </div>

      {/* QUESTION */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 40px", overflowY: "auto" }}>
          <div style={{ maxWidth: 650, width: "100%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white" }}>{currentQuestion + 1}</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#9A9AAA", textTransform: "uppercase", letterSpacing: "0.08em" }}>Frage {currentQuestion + 1} von {totalQ}</div>
            </div>

            <div style={{ fontSize: 20, fontWeight: 500, color: "#022350", lineHeight: 1.5, marginBottom: 32 }}>{question.q}</div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {question.options.map((opt, i) => {
                const selected = answers[currentQuestion] === i;
                return (
                  <button key={i} onClick={() => selectAnswer(currentQuestion, i)} style={{
                    padding: "16px 22px", borderRadius: 16, cursor: "pointer", fontFamily: b, fontSize: 14, textAlign: "left",
                    display: "flex", alignItems: "center", gap: 14,
                    background: selected ? `${config.color}08` : "white",
                    border: selected ? `2px solid ${config.color}` : "2px solid #F0ECE6",
                    color: "#1A1A2E",
                    transition: "all 0.15s ease",
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 13, fontWeight: 700, flexShrink: 0,
                      background: selected ? config.color : "rgba(0,0,0,0.03)",
                      color: selected ? "white" : "#4A4A5A",
                      transition: "all 0.15s ease",
                    }}>{String.fromCharCode(65 + i)}</div>
                    <span style={{ fontWeight: selected ? 500 : 400 }}>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* QUESTION GRID (side panel) */}
        <div style={{ width: 220, minWidth: 220, background: "white", borderLeft: "1px solid #F0ECE6", padding: "20px 16px", overflowY: "auto" }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "#9A9AAA", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Übersicht</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
            {questions.map((_, i) => (
              <button key={i} onClick={() => setCurrentQuestion(i)} style={{
                width: 34, height: 34, borderRadius: 8, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, fontFamily: b,
                background: i === currentQuestion ? `linear-gradient(135deg, ${config.color}, ${config.color}cc)` : answers[i] !== undefined ? "rgba(15,164,160,0.12)" : "rgba(0,0,0,0.03)",
                color: i === currentQuestion ? "white" : answers[i] !== undefined ? "#0FA4A0" : "#9A9AAA",
              }}>{i + 1}</button>
            ))}
          </div>
          <div style={{ marginTop: 16, fontSize: 11, color: "#9A9AAA" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 4 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: "rgba(15,164,160,0.12)" }} /> Beantwortet ({answeredCount})</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}><div style={{ width: 10, height: 10, borderRadius: 3, background: "rgba(0,0,0,0.03)" }} /> Offen ({totalQ - answeredCount})</div>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div style={{ background: "white", borderTop: "1px solid #F0ECE6", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} style={{ padding: "10px 22px", background: currentQuestion === 0 ? "rgba(0,0,0,0.02)" : "rgba(0,0,0,0.04)", color: currentQuestion === 0 ? "#CCC" : "#4A4A5A", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: currentQuestion === 0 ? "default" : "pointer", fontFamily: b }}>← Vorherige</button>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {questions.map((_, i) => (
            <div key={i} style={{ width: i === currentQuestion ? 16 : 6, height: 6, borderRadius: 3, background: i === currentQuestion ? config.color : answers[i] !== undefined ? "#0FA4A0" : "#E0E0E0", transition: "all 0.2s ease" }} />
          ))}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {currentQuestion < totalQ - 1 ? (
            <button onClick={() => setCurrentQuestion(currentQuestion + 1)} style={{ padding: "10px 22px", background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`, color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: b }}>Nächste →</button>
          ) : null}
          <button onClick={() => { if (answeredCount < totalQ) { setShowConfirm(true); } else { submitExam(); } }} style={{ padding: "10px 22px", background: answeredCount === totalQ ? "linear-gradient(135deg, #0FA4A0, #14C4BF)" : "rgba(0,0,0,0.04)", color: answeredCount === totalQ ? "white" : "#4A4A5A", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: b, boxShadow: answeredCount === totalQ ? "0 2px 8px rgba(15,164,160,0.25)" : "none" }}>Prüfung abgeben</button>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "white", borderRadius: 24, padding: "32px 36px", maxWidth: 420, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 8 }}>Noch nicht alle Fragen beantwortet</div>
            <div style={{ fontSize: 13, color: "#4A4A5A", marginBottom: 24 }}>Du hast {answeredCount} von {totalQ} Fragen beantwortet. Unbeantwortete Fragen werden als falsch gewertet.</div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setShowConfirm(false)} style={{ padding: "10px 22px", background: "rgba(0,0,0,0.04)", color: "#4A4A5A", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: b }}>Weiter beantworten</button>
              <button onClick={() => { setShowConfirm(false); submitExam(); }} style={{ padding: "10px 22px", background: "linear-gradient(135deg, #e74c3c, #c0392b)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: b }}>Trotzdem abgeben</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
