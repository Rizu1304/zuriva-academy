"use client";
import { useState, use, type JSX } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type Slide = { type: "title" | "content" | "image" | "highlight" | "quiz" | "summary"; title: string; body?: string; illustration?: string; tip?: string; question?: string; options?: { text: string; correct: boolean }[]; takeaways?: string[] };

const sampleSlides: Slide[] = [
  { type: "title", title: "Versicherungsvertragsgesetz (VVG)", body: "Modul 2 · VBV Grundausbildung\n~1 Stunde · 12 Folien" },
  { type: "content", title: "Was ist das VVG?", body: "Das Versicherungsvertragsgesetz (VVG) regelt die privatrechtlichen Beziehungen zwischen Versicherungsunternehmen und Versicherungsnehmern in der Schweiz.\n\nEs bildet die zentrale Rechtsgrundlage für alle Versicherungsverträge ausserhalb der Sozialversicherung und definiert die Rechte und Pflichten beider Vertragsparteien.", illustration: "document" },
  { type: "content", title: "Geschichte des VVG", body: "Das VVG trat erstmals 1908 in Kraft und wurde über ein Jahrhundert kaum verändert.\n\nAm 1. Januar 2022 trat die umfassende VVG-Revision in Kraft. Diese Revision war ein Meilenstein: Sie modernisierte das Gesetz grundlegend und stärkte den Konsumentenschutz massiv.\n\nDie wichtigsten Änderungen betreffen das Widerrufsrecht, die Kündigungsrechte und die Informationspflichten.", illustration: "timeline" },
  { type: "highlight", title: "Wichtig: Die VVG-Revision 2022", body: "Die zentralen Neuerungen der Revision:\n\n• 14-tägiges Widerrufsrecht nach Vertragsabschluss\n• Ordentliches Kündigungsrecht nach jedem Schadenfall\n• Verbot missbräuchlicher Unterversicherungsklauseln\n• Erweiterte vorvertragliche Informationspflichten\n• Stärkung der Rechte bei Gesundheitsfragebögen", tip: "Diese Änderungen kommen in der VBV-Prüfung garantiert vor!" },
  { type: "content", title: "Vertragsabschluss", body: "Der Versicherungsvertrag kommt durch übereinstimmende Willenserklärungen zustande:\n\n1. Antrag: Der Versicherungsnehmer stellt einen Antrag\n2. Annahme: Der Versicherer nimmt den Antrag an\n3. Police: Die Versicherungspolice wird ausgestellt\n\nBesonders wichtig: Die vorvertragliche Anzeigepflicht verpflichtet den Antragsteller, alle für die Risikobewertung erheblichen Tatsachen wahrheitsgemäss anzugeben.", illustration: "handshake" },
  { type: "image", title: "Lebenszyklus eines Versicherungsvertrags", body: "Antrag → Risikoprüfung → Annahme → Police → Vertragsdauer → Schadenfall/Kündigung → Vertragsende" },
  { type: "content", title: "Pflichten des Versicherungsnehmers", body: "Der Versicherungsnehmer hat folgende Hauptpflichten:\n\n• Prämienzahlungspflicht: Fristgerechte Bezahlung der vereinbarten Prämien\n• Anzeigepflicht: Meldung von Gefahrerhöhungen und Schadensfällen\n• Schadenminderungspflicht: Massnahmen zur Begrenzung des Schadens\n• Auskunftspflicht: Wahrheitsgemässe Angaben im Schadenfall\n• Obliegenheiten: Einhaltung vereinbarter Sicherheitsvorschriften", illustration: "checklist" },
  { type: "content", title: "Pflichten des Versicherers", body: "Der Versicherer ist verpflichtet zu:\n\n• Leistungspflicht: Erbringung der vereinbarten Leistungen im Schadenfall\n• Informationspflichten: Umfassende Aufklärung vor und bei Vertragsabschluss\n• Beratungspflicht: Beratung entsprechend der Komplexität des Produkts\n• Fristgerechte Schadenregulierung: Zeitnahe Bearbeitung von Schäden\n• Transparenz: Verständliche Vertragsbedingungen (AVB)", illustration: "shield" },
  { type: "quiz", title: "Wissens-Check", question: "Wie lang ist das Widerrufsrecht nach der VVG-Revision 2022?", options: [{ text: "7 Tage", correct: false }, { text: "14 Tage", correct: true }, { text: "30 Tage", correct: false }, { text: "Es gibt kein Widerrufsrecht", correct: false }] },
  { type: "content", title: "Kündigung und Vertragsende", body: "Es gibt verschiedene Wege, wie ein Versicherungsvertrag enden kann:\n\n• Ordentliche Kündigung: Zum Ende der Vertragslaufzeit unter Einhaltung der Kündigungsfrist (meist 3 Monate)\n• Kündigung nach Schadenfall: Beide Parteien können nach einem Schadenfall kündigen (neu seit 2022)\n• Widerruf: Innerhalb von 14 Tagen nach Vertragsabschluss\n• Ablauf: Bei befristeten Verträgen\n• Einvernehmliche Auflösung: Jederzeit möglich", illustration: "calendar" },
  { type: "highlight", title: "Praxis-Tipp für die Beratung", body: "Bei jeder Kundenberatung unbedingt beachten:\n\n• Alle Informationspflichten schriftlich dokumentieren\n• FIDLEG-konform beraten und Beratungsprotokoll erstellen\n• Kunden aktiv auf das 14-tägige Widerrufsrecht hinweisen\n• Bei Gesundheitsfragen auf die Bedeutung wahrheitsgemässer Angaben hinweisen\n• Alles schriftlich festhalten — im Zweifelsfall schützt die Dokumentation", tip: "Dokumentation ist dein bester Schutz!" },
  { type: "summary", title: "Zusammenfassung — Modul 2", takeaways: ["Das VVG regelt privatrechtliche Versicherungsverträge", "Die VVG-Revision 2022 stärkt den Konsumentenschutz erheblich", "14 Tage Widerrufsrecht nach Vertragsabschluss", "Vorvertragliche Anzeigepflicht ist zentral", "Kündigungsrecht nach Schadenfall (neu seit 2022)", "Dokumentation aller Beratungsgespräche ist Pflicht", "Versicherungsnehmer und Versicherer haben klar definierte Pflichten"] },
];

const illustrations: Record<string, JSX.Element> = {
  document: (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <rect x="40" y="20" width="120" height="160" rx="12" fill="white" opacity="0.15" />
      <rect x="50" y="30" width="100" height="140" rx="8" fill="white" opacity="0.1" />
      <line x1="65" y1="60" x2="135" y2="60" stroke="white" strokeWidth="2" opacity="0.4" />
      <line x1="65" y1="80" x2="135" y2="80" stroke="white" strokeWidth="2" opacity="0.3" />
      <line x1="65" y1="100" x2="115" y2="100" stroke="white" strokeWidth="2" opacity="0.3" />
      <line x1="65" y1="120" x2="125" y2="120" stroke="white" strokeWidth="2" opacity="0.2" />
      <circle cx="100" cy="155" r="10" fill="white" opacity="0.15" />
      <path d="M96,155 L100,160 L108,150" fill="none" stroke="white" strokeWidth="2" opacity="0.4" />
    </svg>
  ),
  timeline: (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <line x1="30" y1="100" x2="170" y2="100" stroke="white" strokeWidth="2" opacity="0.3" />
      <circle cx="50" cy="100" r="8" fill="white" opacity="0.3" /><text x="50" y="85" textAnchor="middle" fill="white" fontSize="10" opacity="0.5">1908</text>
      <circle cx="100" cy="100" r="6" fill="white" opacity="0.2" />
      <circle cx="150" cy="100" r="10" fill="white" opacity="0.4" /><text x="150" y="85" textAnchor="middle" fill="white" fontSize="10" opacity="0.5">2022</text>
      <path d="M140,130 L150,120 L160,130" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <circle cx="70" cy="90" r="30" fill="white" opacity="0.1" />
      <circle cx="130" cy="90" r="30" fill="white" opacity="0.1" />
      <path d="M80,105 Q100,130 120,105" fill="none" stroke="white" strokeWidth="2.5" opacity="0.35" strokeLinecap="round" />
      <path d="M60,80 L80,90" stroke="white" strokeWidth="2" opacity="0.3" />
      <path d="M140,80 L120,90" stroke="white" strokeWidth="2" opacity="0.3" />
    </svg>
  ),
  checklist: (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      {[50, 80, 110, 140].map((y, i) => (
        <g key={i}><rect x="50" y={y} width="14" height="14" rx="3" fill="white" opacity="0.15" /><line x1="75" y1={y + 7} x2="145" y2={y + 7} stroke="white" strokeWidth="1.5" opacity="0.2" />{i < 3 && <path d={`M53,${y + 7} L56,${y + 10} L62,${y + 4}`} fill="none" stroke="white" strokeWidth="2" opacity="0.4" />}</g>
      ))}
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <path d="M100,30 L150,60 L150,120 Q150,170 100,180 Q50,170 50,120 L50,60 Z" fill="white" opacity="0.1" />
      <path d="M100,50 L140,75 L140,115 Q140,155 100,165 Q60,155 60,115 L60,75 Z" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
      <path d="M85,110 L95,120 L120,90" fill="none" stroke="white" strokeWidth="3" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
      <rect x="40" y="40" width="120" height="120" rx="12" fill="white" opacity="0.1" />
      <rect x="40" y="40" width="120" height="30" rx="12" fill="white" opacity="0.15" />
      <line x1="80" y1="35" x2="80" y2="50" stroke="white" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
      <line x1="120" y1="35" x2="120" y2="50" stroke="white" strokeWidth="3" opacity="0.3" strokeLinecap="round" />
      {[90, 110, 130].map(y => [65, 90, 115, 140].map((x, i) => <rect key={`${y}-${x}`} x={x} y={y} width="16" height="12" rx="2" fill="white" opacity={y === 110 && i === 1 ? 0.35 : 0.1} />))}
    </svg>
  ),
};

export default function ModulViewer({ params }: { params: Promise<{ slug: string; moduleId: string }> }) {
  const { slug, moduleId } = use(params);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const slides = sampleSlides;
  const slide = slides[currentSlide];
  const total = slides.length;
  const progressPct = ((currentSlide + 1) / total) * 100;

  const goNext = () => { if (currentSlide < total - 1) { setCurrentSlide(currentSlide + 1); setQuizAnswer(null); setShowQuizResult(false); } };
  const goPrev = () => { if (currentSlide > 0) { setCurrentSlide(currentSlide - 1); setQuizAnswer(null); setShowQuizResult(false); } };

  const pathColor = "#022350";

  return (
    <div style={{ height: "100vh", fontFamily: b, background: "#FAF8F5", display: "flex", flexDirection: "column", overflow: "hidden" }}>

      {/* TOP BAR */}
      <div style={{ background: "white", borderBottom: "1px solid #F0ECE6", padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <a href={`/lernpfade/${slug}`} style={{ fontSize: 13, color: "#9A9AAA", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>← Zurück zum Lernpfad</a>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{slide.type === "title" ? "Modul starten" : slide.title}</div>
        <div style={{ fontSize: 12, color: "#9A9AAA" }}>Folie {currentSlide + 1} von {total}</div>
      </div>

      {/* PROGRESS BAR */}
      <div style={{ height: 3, background: "#F0ECE6", flexShrink: 0 }}>
        <div style={{ height: 3, background: `linear-gradient(90deg, ${pathColor}, #1B6FC2)`, width: progressPct + "%", transition: "width 0.4s ease" }} />
      </div>

      {/* SLIDE CONTENT */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px", overflow: "auto" }}>
        <div style={{ maxWidth: 850, width: "100%" }}>

          {/* TITLE SLIDE */}
          {slide.type === "title" && (
            <div style={{ borderRadius: 24, padding: "60px 48px", background: `linear-gradient(135deg, ${pathColor} 0%, #0E3057 50%, #1B6FC2 100%)`, position: "relative", overflow: "hidden", textAlign: "center" }}>
              <svg viewBox="0 0 800 400" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05 }}>
                <pattern id="tGrid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1.5" fill="white" /></pattern>
                <rect width="100%" height="100%" fill="url(#tGrid)" />
              </svg>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(15,164,160,0.12)" }} />
              <div style={{ position: "absolute", bottom: -30, left: "20%", width: 150, height: 150, borderRadius: "50%", background: "rgba(200,162,77,0.1)" }} />
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>📋</div>
                <div style={{ fontSize: 36, fontWeight: 400, color: "white", fontFamily: h, marginBottom: 16 }}>{slide.title}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", whiteSpace: "pre-line" }}>{slide.body}</div>
                <button onClick={goNext} style={{ marginTop: 32, padding: "12px 32px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 14, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: b }}>Modul starten →</button>
              </div>
            </div>
          )}

          {/* CONTENT SLIDE */}
          {slide.type === "content" && (
            <div style={{ display: "grid", gridTemplateColumns: slide.illustration ? "1fr 280px" : "1fr", gap: 32, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 24, fontWeight: 400, color: "#022350", fontFamily: h, marginBottom: 20 }}>{slide.title}</div>
                <div style={{ fontSize: 15, color: "#4A4A5A", lineHeight: 1.85, whiteSpace: "pre-line" }}>{slide.body}</div>
              </div>
              {slide.illustration && illustrations[slide.illustration] && (
                <div style={{ height: 240, borderRadius: 20, background: `linear-gradient(135deg, ${pathColor}, #1B6FC2)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
                  {illustrations[slide.illustration]}
                </div>
              )}
            </div>
          )}

          {/* IMAGE SLIDE */}
          {slide.type === "image" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 400, color: "#022350", fontFamily: h, marginBottom: 24 }}>{slide.title}</div>
              <div style={{ borderRadius: 24, background: `linear-gradient(135deg, ${pathColor} 0%, #0E3057 60%, #1B6FC2 100%)`, padding: "48px 40px", position: "relative", overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
                  {(slide.body || "").split("→").map((step, i, arr) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: "16px 20px", minWidth: 80, textAlign: "center" }}>
                        <div style={{ fontSize: 13, color: "white", fontWeight: 500 }}>{step.trim()}</div>
                      </div>
                      {i < arr.length - 1 && <div style={{ fontSize: 20, color: "rgba(255,255,255,0.3)" }}>→</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HIGHLIGHT SLIDE */}
          {slide.type === "highlight" && (
            <div style={{ background: "white", borderRadius: 24, border: "1px solid #F0ECE6", overflow: "hidden" }}>
              <div style={{ height: 4, background: "linear-gradient(90deg, #C8A24D, #E0B95F)" }} />
              <div style={{ padding: "36px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 24 }}>💡</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#C8A24D", background: "rgba(200,162,77,0.1)", padding: "4px 12px", borderRadius: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Wichtig</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 400, color: "#022350", fontFamily: h, marginBottom: 16 }}>{slide.title}</div>
                <div style={{ fontSize: 15, color: "#4A4A5A", lineHeight: 1.85, whiteSpace: "pre-line" }}>{slide.body}</div>
                {slide.tip && (
                  <div style={{ marginTop: 20, padding: "14px 20px", background: "rgba(200,162,77,0.06)", borderRadius: 14, border: "1px solid rgba(200,162,77,0.15)" }}>
                    <div style={{ fontSize: 13, color: "#a07828", fontWeight: 600 }}>⚡ {slide.tip}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QUIZ SLIDE */}
          {slide.type === "quiz" && (
            <div style={{ maxWidth: 650, margin: "0 auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
                <span style={{ fontSize: 24 }}>🧠</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#1B6FC2", background: "rgba(27,111,194,0.08)", padding: "4px 12px", borderRadius: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Wissens-Check</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 500, color: "#022350", marginBottom: 28, lineHeight: 1.4 }}>{slide.question}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {slide.options?.map((opt, i) => {
                  const selected = quizAnswer === i;
                  const isCorrect = opt.correct;
                  const showColor = showQuizResult;
                  return (
                    <button key={i} onClick={() => { if (!showQuizResult) { setQuizAnswer(i); setShowQuizResult(true); } }} style={{
                      padding: "16px 22px", borderRadius: 16, cursor: showQuizResult ? "default" : "pointer", fontFamily: b, fontSize: 14, textAlign: "left",
                      display: "flex", alignItems: "center", gap: 14,
                      background: showColor && selected && isCorrect ? "rgba(15,164,160,0.08)" : showColor && selected && !isCorrect ? "rgba(231,76,60,0.06)" : showColor && isCorrect ? "rgba(15,164,160,0.05)" : selected ? "rgba(2,35,80,0.04)" : "white",
                      border: showColor && isCorrect ? "2px solid #0FA4A0" : showColor && selected && !isCorrect ? "2px solid #e74c3c" : selected ? `2px solid ${pathColor}` : "2px solid #F0ECE6",
                      color: "#1A1A2E",
                    }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0,
                        background: showColor && isCorrect ? "#0FA4A0" : showColor && selected && !isCorrect ? "#e74c3c" : `${pathColor}10`,
                        color: showColor && (isCorrect || (selected && !isCorrect)) ? "white" : pathColor,
                      }}>{showColor && isCorrect ? "✓" : showColor && selected && !isCorrect ? "✗" : String.fromCharCode(65 + i)}</div>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
              {showQuizResult && (
                <div style={{ marginTop: 20, padding: "16px 22px", borderRadius: 14, background: quizAnswer !== null && slide.options?.[quizAnswer]?.correct ? "rgba(15,164,160,0.06)" : "rgba(231,76,60,0.04)", border: `1px solid ${quizAnswer !== null && slide.options?.[quizAnswer]?.correct ? "rgba(15,164,160,0.2)" : "rgba(231,76,60,0.15)"}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: quizAnswer !== null && slide.options?.[quizAnswer]?.correct ? "#0FA4A0" : "#e74c3c" }}>
                    {quizAnswer !== null && slide.options?.[quizAnswer]?.correct ? "✓ Richtig! Seit der VVG-Revision 2022 gilt ein 14-tägiges Widerrufsrecht." : "✗ Leider falsch. Die richtige Antwort ist 14 Tage (seit der VVG-Revision 2022)."}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUMMARY SLIDE */}
          {slide.type === "summary" && (
            <div style={{ maxWidth: 650, margin: "0 auto", textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h, marginBottom: 8 }}>Modul abgeschlossen!</div>
              <div style={{ fontSize: 14, color: "#9A9AAA", marginBottom: 32 }}>{slide.title}</div>
              <div style={{ background: "white", borderRadius: 20, border: "1px solid #F0ECE6", padding: "28px 32px", textAlign: "left", marginBottom: 28 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#C8A24D", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Key Takeaways</div>
                {slide.takeaways?.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 0", borderBottom: i < (slide.takeaways?.length || 0) - 1 ? "1px solid #F0ECE6" : "none" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 7, background: "rgba(15,164,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#0FA4A0", fontWeight: 700, flexShrink: 0 }}>✓</div>
                    <div style={{ fontSize: 13.5, color: "#4A4A5A", lineHeight: 1.5 }}>{t}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
                <a href={`/lernpfade/${slug}`} style={{ padding: "10px 24px", background: "rgba(0,0,0,0.04)", color: "#4A4A5A", borderRadius: 12, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>← Zurück zum Lernpfad</a>
                <a href={`/lernpfade/${slug}`} style={{ padding: "10px 24px", background: `linear-gradient(135deg, ${pathColor}, #0E3057)`, color: "white", borderRadius: 12, fontSize: 13, fontWeight: 600, textDecoration: "none", boxShadow: "0 2px 8px rgba(2,35,80,0.2)" }}>Nächstes Modul →</a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM NAVIGATION */}
      <div style={{ background: "white", borderTop: "1px solid #F0ECE6", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <button onClick={goPrev} disabled={currentSlide === 0} style={{ padding: "10px 22px", background: currentSlide === 0 ? "rgba(0,0,0,0.03)" : "rgba(0,0,0,0.05)", color: currentSlide === 0 ? "#CCCCCC" : "#4A4A5A", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: currentSlide === 0 ? "default" : "pointer", fontFamily: b }}>← Zurück</button>

        {/* Slide dots */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => { setCurrentSlide(i); setQuizAnswer(null); setShowQuizResult(false); }} style={{
              width: i === currentSlide ? 24 : 8, height: 8, borderRadius: 4, border: "none", cursor: "pointer", transition: "all 0.3s ease",
              background: i === currentSlide ? `linear-gradient(90deg, ${pathColor}, #1B6FC2)` : i < currentSlide ? "#0FA4A0" : "#E0E0E0",
            }} />
          ))}
        </div>

        <button onClick={goNext} disabled={currentSlide === total - 1 && slide.type === "summary"} style={{
          padding: "10px 22px", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: b,
          background: currentSlide === total - 1 ? "linear-gradient(135deg, #0FA4A0, #14C4BF)" : `linear-gradient(135deg, ${pathColor}, #0E3057)`,
          color: "white", boxShadow: "0 2px 8px rgba(2,35,80,0.15)",
        }}>{currentSlide === total - 1 ? "Modul abschliessen ✓" : "Weiter →"}</button>
      </div>
    </div>
  );
}
