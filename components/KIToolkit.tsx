"use client";

import { useState, useRef } from "react";
import { generateContent } from "@/app/aura/actions";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type ToolkitContext = "lernpfad" | "pruefung" | "kahoot";

type Tool = {
  id: string;
  label: string;
  icon: string;
  prompt: string;
  context: "lernpfad" | "pruefung" | "kahoot" | "animation";
};

const toolsByContext: Record<ToolkitContext, Tool[]> = {
  lernpfad: [
    { id: "lp-generate", label: "Lernpfad generieren", icon: "🗺️", prompt: "Erstelle einen strukturierten Lernpfad mit 5-8 Modulen zum Thema: ", context: "lernpfad" },
    { id: "lp-objectives", label: "Lernziele erstellen", icon: "🎯", prompt: "Erstelle detaillierte Lernziele (nach Bloom's Taxonomie) für das Thema: ", context: "lernpfad" },
    { id: "lp-summary", label: "Zusammenfassung", icon: "📝", prompt: "Erstelle eine kompakte Zusammenfassung des folgenden Dokuments für einen Lernpfad: ", context: "lernpfad" },
    { id: "lp-animation", label: "Lernanimation erstellen", icon: "✨", prompt: "Erstelle eine interaktive HTML-Animation die folgendes Thema visuell erklärt: ", context: "animation" },
    { id: "lp-quiz", label: "Verständnisfragen", icon: "❓", prompt: "Erstelle 5 Verständnisfragen mit Antworten zum Thema: ", context: "pruefung" },
  ],
  pruefung: [
    { id: "pr-generate", label: "Prüfung generieren", icon: "📋", prompt: "Erstelle eine vollständige Prüfung mit 10 Multiple-Choice-Fragen zum Thema: ", context: "pruefung" },
    { id: "pr-hard", label: "Schwere Fragen", icon: "🔥", prompt: "Erstelle 5 anspruchsvolle Prüfungsfragen (Expertenniveau) mit Antworten zum Thema: ", context: "pruefung" },
    { id: "pr-case", label: "Fallstudie erstellen", icon: "📖", prompt: "Erstelle eine praxisnahe Fallstudie mit 3 Fragen für eine Versicherungsprüfung zum Thema: ", context: "pruefung" },
    { id: "pr-animation", label: "Interaktives Quiz", icon: "✨", prompt: "Erstelle ein interaktives HTML-Quiz mit Animationen und Feedback zum Thema: ", context: "animation" },
    { id: "pr-from-doc", label: "Fragen aus Dokument", icon: "📄", prompt: "Erstelle Prüfungsfragen basierend auf dem hochgeladenen Dokument: ", context: "pruefung" },
  ],
  kahoot: [
    { id: "kh-generate", label: "Quiz generieren", icon: "🎮", prompt: "Erstelle 10 unterhaltsame Kahoot-Quiz-Fragen mit je 4 Antworten zum Thema: ", context: "kahoot" },
    { id: "kh-fun", label: "Fun Facts Quiz", icon: "🤩", prompt: "Erstelle 5 überraschende Fun-Fact Quizfragen über Schweizer Versicherungen zum Thema: ", context: "kahoot" },
    { id: "kh-speed", label: "Speed Round", icon: "⚡", prompt: "Erstelle 8 kurze, schnelle Quizfragen (max 1 Satz pro Frage) zum Thema: ", context: "kahoot" },
    { id: "kh-animation", label: "Animiertes Quiz", icon: "✨", prompt: "Erstelle ein animiertes HTML-Kahoot-Style Quiz mit Timer und Punkten zum Thema: ", context: "animation" },
    { id: "kh-from-doc", label: "Quiz aus Dokument", icon: "📄", prompt: "Erstelle Kahoot-Quizfragen basierend auf dem hochgeladenen Dokument: ", context: "kahoot" },
  ],
};

export default function KIToolkit({ context, topic }: { context: ToolkitContext; topic?: string }) {
  const [open, setOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [input, setInput] = useState(topic || "");
  const [docText, setDocText] = useState("");
  const [docName, setDocName] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const tools = toolsByContext[context];
  const titles: Record<string, string> = { lernpfad: "Lernpfad", pruefung: "Prüfungen", kahoot: "Kahoot" };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocName(file.name);
    const text = await file.text();
    setDocText(text);
  };

  const runTool = async (tool: Tool) => {
    if (!input.trim() && !docText) return;
    setLoading(true);
    setResult("");
    setPreviewHtml("");

    const res = await generateContent({
      prompt: tool.prompt + (input || "Versicherungen allgemein"),
      context: tool.context,
      documentText: docText || undefined,
    });

    if (tool.context === "animation") {
      const htmlMatch = res.content.match(/```html\n?([\s\S]*?)```/) || res.content.match(/<(!DOCTYPE|html)[\s\S]*/i);
      if (htmlMatch) {
        setPreviewHtml(htmlMatch[1] || htmlMatch[0]);
      } else {
        setPreviewHtml(res.content);
      }
    }

    setResult(res.content);
    setLoading(false);
  };

  if (!open) {
    return (
      <div onClick={() => setOpen(true)} style={{
        position: "fixed", left: 20, bottom: 28,
        padding: "12px 20px", borderRadius: 16,
        background: "linear-gradient(135deg, #C8A24D, #E0B95F)",
        color: "white", fontSize: 13, fontWeight: 600,
        cursor: "pointer", fontFamily: b,
        boxShadow: "0 4px 20px rgba(200,162,77,0.3)",
        display: "flex", alignItems: "center", gap: 8,
        transition: "all 0.2s ease", zIndex: 9999,
      }}>
        <span style={{ fontSize: 18 }}>🛠️</span> KI-Werkzeugkasten
      </div>
    );
  }

  return (
    <div style={{
      position: "fixed", left: 20, bottom: 20, top: 20,
      width: 440, zIndex: 99998,
      background: "rgba(255,255,255,0.92)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
      borderRadius: 24, border: "1px solid rgba(255,255,255,0.6)",
      boxShadow: "0 8px 60px rgba(2,35,80,0.12)",
      display: "flex", flexDirection: "column", overflow: "hidden",
      animation: "toolkitSlideIn 0.3s ease",
      fontFamily: b,
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #C8A24D, #E0B95F)",
        padding: "18px 22px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
      }}>
        <span style={{ fontSize: 22 }}>🛠️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 500, color: "white", fontFamily: h }}>KI-Werkzeugkasten</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>{titles[context]}</div>
        </div>
        <div onClick={() => { setOpen(false); setActiveTool(null); setResult(""); setPreviewHtml(""); }} style={{
          width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", cursor: "pointer", fontSize: 14,
        }}>×</div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
        {/* Topic input */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 8 }}>THEMA</div>
          <input
            value={input} onChange={e => setInput(e.target.value)}
            placeholder="z.B. Sachversicherung, FIDLEG, BVG..."
            style={{ width: "100%", padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: b }}
          />
        </div>

        {/* Document upload */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 8 }}>DOKUMENT HOCHLADEN</div>
          <input ref={fileRef} type="file" accept=".txt,.md,.csv,.json,.pdf" onChange={handleFileUpload} style={{ display: "none" }} />
          <div onClick={() => fileRef.current?.click()} style={{
            padding: "16px", borderRadius: 14, border: "2px dashed rgba(200,162,77,0.3)",
            background: docName ? "rgba(200,162,77,0.06)" : "rgba(0,0,0,0.02)",
            cursor: "pointer", textAlign: "center", transition: "all 0.2s ease",
          }}>
            {docName ? (
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#1A1A2E" }}>📄 {docName}</div>
                <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 4 }}>{(docText.length / 1000).toFixed(1)}k Zeichen geladen</div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 24, marginBottom: 6 }}>📂</div>
                <div style={{ fontSize: 12, color: "#9A9AAA" }}>Klicken zum Hochladen (.txt, .md, .csv, .pdf)</div>
              </div>
            )}
          </div>
        </div>

        {/* Tools grid */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 10 }}>WERKZEUGE</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => { setActiveTool(tool); runTool(tool); }}
              disabled={loading}
              style={{
                padding: "14px 14px", borderRadius: 14,
                border: activeTool?.id === tool.id ? "1px solid #C8A24D" : "1px solid rgba(0,0,0,0.06)",
                background: activeTool?.id === tool.id ? "rgba(200,162,77,0.08)" : "rgba(255,255,255,0.6)",
                cursor: loading ? "wait" : "pointer",
                textAlign: "left", fontFamily: b,
                transition: "all 0.2s ease",
                opacity: loading ? 0.6 : 1,
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 6 }}>{tool.icon}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#1A1A2E" }}>{tool.label}</div>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 28, marginBottom: 8, animation: "spin 2s linear infinite" }}>⚙️</div>
            <div style={{ fontSize: 13, color: "#9A9AAA" }}>KI generiert Inhalte...</div>
          </div>
        )}

        {/* Animation Preview */}
        {previewHtml && !loading && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 8 }}>VORSCHAU</div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", background: "white" }}>
              <iframe
                srcDoc={previewHtml}
                style={{ width: "100%", height: 300, border: "none" }}
                sandbox="allow-scripts"
                title="Animation Preview"
              />
            </div>
            <button
              onClick={() => {
                const w = window.open("", "_blank");
                if (w) { w.document.write(previewHtml); w.document.close(); }
              }}
              style={{
                marginTop: 8, padding: "8px 16px", borderRadius: 10,
                background: "linear-gradient(135deg, #0FA4A0, #14C4BF)",
                color: "white", border: "none", fontSize: 12, fontWeight: 500,
                cursor: "pointer", fontFamily: b,
              }}
            >
              Vollbild öffnen ↗
            </button>
          </div>
        )}

        {/* Text Result */}
        {result && !loading && !previewHtml && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D" }}>ERGEBNIS</div>
              <button
                onClick={() => navigator.clipboard.writeText(result)}
                style={{ padding: "4px 10px", borderRadius: 8, background: "rgba(0,0,0,0.04)", border: "none", fontSize: 11, cursor: "pointer", color: "#4A4A5A", fontFamily: b }}
              >
                Kopieren
              </button>
            </div>
            <div style={{
              padding: "18px 20px", borderRadius: 14,
              background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.04)",
              fontSize: 13, color: "#1A1A2E", lineHeight: 1.7, whiteSpace: "pre-wrap",
              maxHeight: 400, overflowY: "auto",
            }}>
              {result}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes toolkitSlideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
