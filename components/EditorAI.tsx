"use client";

import { useState, useRef } from "react";
import { generateEditorContent } from "@/app/aura/actions";

const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

type EditorAIProps = {
  context: "kurs" | "pruefung" | "lernpfad" | "kahoot";
  onItemsGenerated: (items: Record<string, unknown>[]) => void;
  topic?: string;
  itemLabel?: string;
  placeholder?: string;
};

export default function EditorAI({ context, onItemsGenerated, topic, itemLabel = "Elemente", placeholder }: EditorAIProps) {
  const [prompt, setPrompt] = useState("");
  const [docText, setDocText] = useState("");
  const [docName, setDocName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ count: number; error: boolean } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const defaultPlaceholders: Record<string, string> = {
    kurs: "z.B. Erstelle 6 Module für einen Kurs über Sachversicherung Grundlagen",
    pruefung: "z.B. Erstelle 10 Fragen über Lebensversicherungen, mittlerer Schwierigkeitsgrad",
    lernpfad: "z.B. Erstelle einen Lernpfad mit 8 Schritten für die VBV-Zertifizierung",
    kahoot: "z.B. Erstelle 10 lustige Quiz-Fragen über Schweizer Versicherungsrecht",
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocName(file.name);
    const text = await file.text();
    setDocText(text);
  };

  const handleGenerate = async () => {
    if (!prompt.trim() && !docText) return;
    setLoading(true);
    setResult(null);

    const fullPrompt = topic
      ? `Kontext/Thema: ${topic}\n\nAufgabe: ${prompt || "Generiere Inhalte basierend auf dem hochgeladenen Dokument."}`
      : prompt || "Generiere Inhalte basierend auf dem hochgeladenen Dokument.";

    const res = await generateEditorContent({
      prompt: fullPrompt,
      context,
      documentText: docText || undefined,
    });

    if (res.error || res.items.length === 0) {
      setResult({ count: 0, error: true });
    } else {
      onItemsGenerated(res.items);
      setResult({ count: res.items.length, error: false });
      setPrompt("");
    }
    setLoading(false);
  };

  return (
    <div style={{
      padding: "20px 22px",
      borderRadius: 16,
      background: "linear-gradient(135deg, rgba(200,162,77,0.06), rgba(200,162,77,0.02))",
      border: "1px solid rgba(200,162,77,0.2)",
      marginBottom: 20,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 10,
          background: "linear-gradient(135deg, #C8A24D, #E0B95F)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}>🤖</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>KI-Assistent</div>
        <div style={{ fontSize: 11, color: "#9A9AAA" }}>— beschreibe was du brauchst</div>
      </div>

      {/* Prompt input */}
      <textarea
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        placeholder={placeholder || defaultPlaceholders[context]}
        rows={2}
        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleGenerate(); } }}
        style={{
          width: "100%", padding: "12px 14px", borderRadius: 12,
          border: "1px solid rgba(200,162,77,0.25)", background: "rgba(255,255,255,0.8)",
          fontSize: 13, outline: "none", resize: "none",
          boxSizing: "border-box", fontFamily: b,
        }}
      />

      {/* Bottom row: doc upload + generate button */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
        {/* Document upload */}
        <input ref={fileRef} type="file" accept=".txt,.md,.csv,.json,.pdf" onChange={handleFileUpload} style={{ display: "none" }} />
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            padding: "7px 12px", borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.06)",
            background: docName ? "rgba(200,162,77,0.08)" : "rgba(255,255,255,0.6)",
            fontSize: 12, cursor: "pointer", color: "#4A4A5A",
            fontFamily: b, display: "flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          📄 {docName ? docName : "Dokument hochladen"}
        </button>

        {docName && (
          <button
            onClick={() => { setDocName(""); setDocText(""); if (fileRef.current) fileRef.current.value = ""; }}
            style={{
              padding: "4px 8px", borderRadius: 8, border: "none",
              background: "transparent", fontSize: 14, cursor: "pointer", color: "#9A9AAA",
            }}
          >×</button>
        )}

        <div style={{ flex: 1 }} />

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={loading || (!prompt.trim() && !docText)}
          style={{
            padding: "8px 20px", borderRadius: 12, border: "none",
            background: loading || (!prompt.trim() && !docText)
              ? "rgba(0,0,0,0.06)"
              : "linear-gradient(135deg, #C8A24D, #E0B95F)",
            color: loading || (!prompt.trim() && !docText) ? "#9A9AAA" : "white",
            fontSize: 13, fontWeight: 600, cursor: loading ? "wait" : "pointer",
            fontFamily: b, display: "flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap",
          }}
        >
          {loading ? (
            <>
              <span style={{ display: "inline-block", animation: "editorAiSpin 1s linear infinite" }}>⚙️</span>
              Generiert...
            </>
          ) : (
            <>🤖 Generieren</>
          )}
        </button>
      </div>

      {/* Result feedback */}
      {result && (
        <div style={{
          marginTop: 10, padding: "8px 14px", borderRadius: 10,
          background: result.error ? "rgba(231,76,60,0.08)" : "rgba(15,164,160,0.08)",
          fontSize: 12, fontWeight: 500,
          color: result.error ? "#e74c3c" : "#0FA4A0",
        }}>
          {result.error
            ? "Fehler bei der Generierung. Bitte versuche es erneut mit einer detaillierteren Beschreibung."
            : `✓ ${result.count} ${itemLabel} wurden hinzugefügt!`}
        </div>
      )}

      <style>{`@keyframes editorAiSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
