"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { chat } from "@/app/aura/actions";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

export default function AuraWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hallo! Ich bin Aura, deine KI-Assistentin der Zuriva Academy. Wie kann ich dir helfen?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState({ x: -1, y: -1 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const didDrag = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize position on mount
  useEffect(() => {
    setPos({ x: window.innerWidth - 100, y: window.innerHeight - 120 });
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (open) return;
    setDragging(true);
    didDrag.current = false;
    dragOffset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [open, pos]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    didDrag.current = true;
    const newX = Math.max(0, Math.min(window.innerWidth - 80, e.clientX - dragOffset.current.x));
    const newY = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - dragOffset.current.y));
    setPos({ x: newX, y: newY });
  }, [dragging]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const handleClick = () => {
    if (!didDrag.current) setOpen(!open);
  };

  const sendMsg = async () => {
    if (!input.trim() || loading) return;
    const userText = input.trim();
    setMessages((m) => [...m, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);
    try {
      const apiMessages = messages
        .concat([{ role: "user", text: userText }])
        .filter((_, i) => i > 0 || true)
        .map((m) => ({
          role: (m.role === "bot" ? "assistant" : "user") as "user" | "assistant",
          content: m.text,
        }));
      const response = await chat({ messages: apiMessages });
      setMessages((m) => [...m, { role: "bot", text: response.content }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Entschuldigung, es gab einen Fehler. Bitte versuche es erneut." }]);
    } finally {
      setLoading(false);
    }
  };

  if (pos.x === -1) return null;

  return (
    <>
      {/* FLOATING ROBOT */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={handleClick}
        style={{
          position: "fixed",
          left: pos.x,
          top: pos.y,
          width: 72,
          height: 72,
          zIndex: 99999,
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
          userSelect: "none",
          transition: dragging ? "none" : "filter 0.2s ease",
          filter: dragging ? "drop-shadow(0 8px 24px rgba(2,35,80,0.3))" : "drop-shadow(0 4px 16px rgba(2,35,80,0.2))",
        }}
      >
        {/* Robot SVG/CSS representation */}
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: "linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)",
          border: "2px solid rgba(255,255,255,0.8)",
          boxShadow: "0 4px 20px rgba(2,35,80,0.15), inset 0 -2px 6px rgba(0,0,0,0.05)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}>
          {/* Visor */}
          <div style={{
            width: 44, height: 20, borderRadius: 12,
            background: "linear-gradient(180deg, #1a1a2e 0%, #022350 100%)",
            position: "absolute", top: 16,
            boxShadow: "0 0 12px rgba(15,164,160,0.4), inset 0 1px 2px rgba(255,255,255,0.1)",
          }}>
            <div style={{ position: "absolute", top: 6, left: 8, width: 6, height: 6, borderRadius: "50%", background: "#0FA4A0", opacity: 0.8, animation: "auraPulse 2s infinite" }} />
            <div style={{ position: "absolute", top: 6, right: 8, width: 6, height: 6, borderRadius: "50%", background: "#0FA4A0", opacity: 0.8, animation: "auraPulse 2s infinite 0.3s" }} />
          </div>
          {/* Antennas */}
          <div style={{ position: "absolute", top: 2, left: 22, width: 2, height: 10, background: "#1a1a2e", borderRadius: 1, transform: "rotate(-15deg)" }} />
          <div style={{ position: "absolute", top: 2, right: 22, width: 2, height: 10, background: "#1a1a2e", borderRadius: 1, transform: "rotate(15deg)" }} />
          {/* Cape hint */}
          <div style={{ position: "absolute", bottom: 0, left: 8, right: 8, height: 24, background: "linear-gradient(180deg, transparent, #022350)", borderRadius: "0 0 50% 50%", opacity: 0.3 }} />
          {/* ZURIVA text */}
          <div style={{ position: "absolute", bottom: 10, fontSize: 7, fontWeight: 600, letterSpacing: "0.1em", color: "#022350", fontFamily: h }}>ZURIVA</div>
        </div>
        {/* Pulse ring */}
        {!open && (
          <div style={{
            position: "absolute", inset: -4, borderRadius: "50%",
            border: "2px solid #0FA4A0", opacity: 0.4,
            animation: "auraRing 2s infinite",
          }} />
        )}
      </div>

      {/* CHAT PANEL */}
      {open && (
        <div style={{
          position: "fixed",
          right: 24, bottom: 24,
          width: 380, height: 520,
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
          borderRadius: 24,
          boxShadow: "0 8px 60px rgba(2,35,80,0.15)",
          zIndex: 999999,
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.6)",
          animation: "auraSlideUp 0.3s ease",
        }}>
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg, #022350, #0E3057)",
            padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: "rgba(200,162,77,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "#C8A24D" }}>✦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 500, color: "white", fontFamily: h }}>Aura</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#14C4BF" }} /> Online
              </div>
            </div>
            <a href="/aura" style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: 12, textDecoration: "none" }} title="Vollbild">↗</a>
            <div onClick={() => setOpen(false)} style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 14 }}>×</div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                maxWidth: "85%", fontSize: 13, padding: "12px 16px", borderRadius: 16, lineHeight: 1.5, whiteSpace: "pre-wrap",
                background: m.role === "bot" ? "rgba(0,0,0,0.03)" : "linear-gradient(135deg, #022350, #0E3057)",
                color: m.role === "bot" ? "#1A1A2E" : "white",
                alignSelf: m.role === "bot" ? "flex-start" : "flex-end",
              }}>{m.text}</div>
            ))}
            {loading && (
              <div style={{ maxWidth: "85%", fontSize: 13, padding: "12px 16px", borderRadius: 16, background: "rgba(0,0,0,0.03)", color: "#9A9AAA", alignSelf: "flex-start", display: "flex", gap: 3 }}>
                <span style={{ animation: "dotPulse 1.4s infinite 0s" }}>●</span>
                <span style={{ animation: "dotPulse 1.4s infinite 0.2s" }}>●</span>
                <span style={{ animation: "dotPulse 1.4s infinite 0.4s" }}>●</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 8, background: "rgba(0,0,0,0.03)", borderRadius: 14, padding: "4px 4px 4px 16px", alignItems: "center" }}>
              <input
                value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                placeholder="Frage Aura..."
                style={{ flex: 1, border: "none", outline: "none", fontSize: 13, fontFamily: b, color: "#1A1A2E", background: "transparent" }}
              />
              <button onClick={sendMsg} disabled={loading} style={{
                width: 34, height: 34, borderRadius: 10,
                background: loading ? "#9A9AAA" : "linear-gradient(135deg, #0FA4A0, #14C4BF)",
                border: "none", cursor: loading ? "default" : "pointer", color: "white", fontSize: 14, flexShrink: 0,
              }}>→</button>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes auraPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes auraRing { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(1.3); opacity: 0; } }
        @keyframes auraSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dotPulse { 0%, 80%, 100% { opacity: 0.3; } 40% { opacity: 1; } }
      `}</style>
    </>
  );
}
