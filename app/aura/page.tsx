"use client";

import { useState, useRef, useEffect } from "react";
import { chat } from "@/app/aura/actions";

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

const nav = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade" },
  { name: "Prüfungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate" },
  { name: "Forum", href: "/forum" },
];

const suggestedPrompts = [
  "Was ist die VBV-Zertifizierung?",
  "Hilf mir bei der Prüfungsvorbereitung",
  "Erkläre Sachversicherung",
];

type Message = { role: "user" | "assistant"; content: string };

export default function AuraChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || loading) return;

    const userMsg: Message = { role: "user", content };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await chat({ messages: updatedMessages });
      const assistantMsg: Message = { role: "assistant", content: response.content };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Entschuldigung, es gab einen Fehler. Bitte versuche es erneut." },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
      {/* SIDEBAR */}
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
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>
            ZURIVA
          </span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8, letterSpacing: "0.04em" }}>
            academy
          </span>
        </div>

        <div style={{ padding: "0 12px", flex: 1 }}>
          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C8A24D",
              padding: "16px 12px 8px",
            }}
          >
            LERNEN
          </div>
          {nav.map((item) => (
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
                fontWeight: 400,
                fontSize: 13.5,
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              {item.name}
            </a>
          ))}

          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C8A24D",
              padding: "20px 12px 8px",
            }}
          >
            ADMIN
          </div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
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

      {/* MAIN CHAT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* CHAT HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg, #022350, #0E3057)",
            padding: "20px 36px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(200,162,77,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "#C8A24D",
            }}
          >
            ✦
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "white", fontFamily: h }}>Aura</div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.45)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#14C4BF" }} />
              Online
            </div>
          </div>
          <a
            href="/dashboard"
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              padding: "8px 16px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: 10,
              transition: "all 0.2s ease",
            }}
          >
            Zurück zum Dashboard
          </a>
        </div>

        {/* MESSAGES AREA */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "32px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {messages.length === 0 && !loading && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 24,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 24,
                  background: "linear-gradient(135deg, #022350, #0E3057)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 36,
                  color: "#C8A24D",
                  boxShadow: "0 8px 40px rgba(2,35,80,0.15)",
                }}
              >
                ✦
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h, marginBottom: 8 }}>
                  Hallo! Ich bin Aura.
                </div>
                <div style={{ fontSize: 14, color: "#9A9AAA", maxWidth: 400 }}>
                  Deine KI-Assistentin für Versicherungsthemen, Kursinhalte, VBV-Zertifizierung und mehr.
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginTop: 8 }}>
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    style={{
                      ...card,
                      padding: "12px 20px",
                      borderRadius: 14,
                      fontSize: 13,
                      color: "#022350",
                      cursor: "pointer",
                      border: "1px solid rgba(255,255,255,0.6)",
                      fontFamily: b,
                      transition: "all 0.2s ease",
                    }}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              style={{
                maxWidth: "70%",
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  padding: "14px 20px",
                  borderRadius: 18,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                  ...(m.role === "user"
                    ? {
                        background: "linear-gradient(135deg, #022350, #0E3057)",
                        color: "white",
                        borderBottomRightRadius: 6,
                      }
                    : {
                        ...card,
                        color: "#1A1A2E",
                        borderBottomLeftRadius: 6,
                      }),
                }}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ maxWidth: "70%", alignSelf: "flex-start" }}>
              <div
                style={{
                  ...card,
                  padding: "14px 20px",
                  borderRadius: 18,
                  borderBottomLeftRadius: 6,
                  color: "#9A9AAA",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span style={{ animation: "dotPulse 1.4s infinite", animationDelay: "0s" }}>.</span>
                <span style={{ animation: "dotPulse 1.4s infinite", animationDelay: "0.2s" }}>.</span>
                <span style={{ animation: "dotPulse 1.4s infinite", animationDelay: "0.4s" }}>.</span>
                <style>{`
                  @keyframes dotPulse {
                    0%, 80%, 100% { opacity: 0.3; transform: scale(1); }
                    40% { opacity: 1; transform: scale(1.3); }
                  }
                `}</style>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div style={{ padding: "16px 36px 24px", flexShrink: 0 }}>
          <div
            style={{
              ...card,
              display: "flex",
              gap: 10,
              padding: "6px 6px 6px 22px",
              borderRadius: 18,
              alignItems: "center",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
              placeholder="Frage Aura etwas..."
              disabled={loading}
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 14,
                fontFamily: b,
                color: "#1A1A2E",
                background: "transparent",
                padding: "10px 0",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background: loading || !input.trim() ? "rgba(15,164,160,0.3)" : "linear-gradient(135deg, #0FA4A0, #14C4BF)",
                border: "none",
                cursor: loading || !input.trim() ? "default" : "pointer",
                color: "white",
                fontSize: 16,
                flexShrink: 0,
                transition: "all 0.2s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
