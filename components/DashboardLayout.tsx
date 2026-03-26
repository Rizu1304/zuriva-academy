"use client";
import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Send,
  X,
  Menu,
  Volume2,
  Square,
  Loader2,
} from "lucide-react";

const navSections = [
  {
    label: "Lernen",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
      { name: "Module", href: "/courses", icon: CoursesIcon },
      { name: "Lernpfade", href: "/lernpfade", icon: PathIcon },
      { name: "Pruefungen", href: "/pruefungen", icon: ExamIcon },
      { name: "Zertifikate", href: "/zertifikate", icon: CertIcon },
    ],
  },
  {
    label: "Training",
    items: [
      { name: "Telefontraining", href: "/training/telefon", icon: PhoneTrainingIcon },
      { name: "Verkaufstraining", href: "/training/verkauf", icon: SalesIcon },
      { name: "Partner", href: "/training/partner", icon: PartnerIcon },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Forum", href: "/forum", icon: ForumIcon },
      { name: "Kahoot", href: "/kahoot", icon: KahootIcon },
      { name: "KI-Studio", href: "/ki-studio", icon: AIIcon },
    ],
  },
  {
    label: "Admin",
    items: [
      { name: "Team", href: "/admin", icon: TeamIcon },
      { name: "Analytics", href: "/analytics", icon: AnalyticsIcon },
    ],
  },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function DashboardLayout({ children, title, subtitle, actions }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hallo! Ich bin Aura, deine KI-Assistentin der Zuriva Academy. Wie kann ich dir helfen?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuraSpeaking, setIsAuraSpeaking] = useState(false);
  const [isAuraLoading, setIsAuraLoading] = useState(false);
  const auraAudioRef = useRef<HTMLAudioElement | null>(null);

  const stopAuraAudio = useCallback(() => {
    if (auraAudioRef.current) {
      auraAudioRef.current.pause();
      auraAudioRef.current = null;
    }
    setIsAuraSpeaking(false);
  }, []);

  const speakAura = useCallback(async (text: string) => {
    stopAuraAudio();
    setIsAuraLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      auraAudioRef.current = audio;
      audio.onended = () => { setIsAuraSpeaking(false); URL.revokeObjectURL(url); };
      setIsAuraSpeaking(true);
      setIsAuraLoading(false);
      await audio.play();
    } catch {
      setIsAuraLoading(false);
      setIsAuraSpeaking(false);
    }
  }, [stopAuraAudio]);

  const sendMsg = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user" as const, text: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.text }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: "Entschuldigung, es gab ein technisches Problem. Bitte versuche es nochmal." }]);
    } finally {
      setLoading(false);
    }
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#FAF8F5" }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.25)",
            backdropFilter: "blur(4px)",
            zIndex: 90,
            transition: "opacity 0.2s ease",
          }}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        style={{
          width: 200,
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          position: "relative",
          zIndex: 95,
          transition: "transform 0.2s ease",
          ...(typeof window !== "undefined" && window.innerWidth < 768
            ? {
                position: "fixed" as const,
                top: 0,
                left: 0,
                bottom: 0,
                transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(24px)",
                boxShadow: sidebarOpen ? "4px 0 24px rgba(0,0,0,0.08)" : "none",
              }
            : {}),
        }}
        className={`z-sidebar-liquid ${sidebarOpen ? "z-sidebar-liquid-open" : ""}`}
      >
        {/* Close button mobile */}
        <button
          onClick={closeSidebar}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
            display: "none",
            transition: "opacity 0.2s ease",
          }}
          className="z-sidebar-close-liquid"
        >
          <X size={18} color="#4A5568" strokeWidth={2} />
        </button>

        {/* Logo */}
        <div style={{ padding: "32px 20px 28px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "3px",
                color: "#022350",
                textTransform: "uppercase" as const,
              }}
            >
              ZURIVA
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11.5,
                fontWeight: 300,
                fontStyle: "italic",
                color: "#C8A24D",
                letterSpacing: "0.06em",
              }}
            >
              academy
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: "0 10px" }}>
          {navSections.map((section) => (
            <div key={section.label} style={{ marginBottom: 4 }}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase" as const,
                  color: "#C8A24D",
                  padding: "16px 10px 8px",
                  opacity: 0.7,
                }}
              >
                {section.label}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={closeSidebar}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 10px",
                      borderRadius: 8,
                      fontSize: 13,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                      color: isActive ? "#022350" : "#4A5568",
                      fontWeight: isActive ? 600 : 400,
                      background: isActive ? "rgba(2,35,80,0.08)" : "transparent",
                      borderLeft: isActive ? "3px solid #C8A24D" : "3px solid transparent",
                      marginBottom: 2,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "rgba(2,35,80,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }
                    }}
                  >
                    <item.icon active={isActive} />
                    <span>{item.name}</span>
                    {isActive && (
                      <div
                        style={{
                          marginLeft: "auto",
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#C8A24D",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* VBV Progress Box */}
        <div
          style={{
            margin: "0 10px 10px",
            padding: "16px 14px",
            borderRadius: 14,
            background: "rgba(255,255,255,0.50)",
            border: "1px solid rgba(255,255,255,0.45)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#C8A24D" }}>VBV 2026</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#022350" }}>57%</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: "rgba(2,35,80,0.08)", marginBottom: 8 }}>
            <div style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", width: "57%" }} />
          </div>
          <div style={{ fontSize: 11, color: "#7A7A8A" }}>342 von 600 Credits</div>
        </div>

        {/* User Profile */}
        <div
          style={{
            padding: "14px 14px 18px",
            borderTop: "1px solid rgba(2,35,80,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg, #C8A24D, #E0B95F)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: "#022350",
            }}
          >
            LM
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>Laura Meier</div>
            <div style={{ fontSize: 11, color: "#7A7A8A" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* Header */}
        <div
          style={{
            background: "transparent",
            height: 56,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
            {/* Hamburger - mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "none",
              }}
              className="z-hamburger-liquid"
            >
              <Menu size={20} color="#022350" strokeWidth={2} />
            </button>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: "#022350",
                  lineHeight: 1.2,
                }}
              >
                {title}
              </div>
              {subtitle && (
                <div style={{ fontSize: 12, color: "#7A7A8A", marginTop: 1 }}>{subtitle}</div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            {actions}
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(2,35,80,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <Search size={17} color="#4A5568" strokeWidth={1.8} />
            </button>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(2,35,80,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <Bell size={17} color="#4A5568" strokeWidth={1.8} />
              <div
                style={{
                  position: "absolute",
                  top: 9,
                  right: 10,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#C0392B",
                  border: "2px solid #FAF8F5",
                }}
              />
            </button>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(2,35,80,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <Settings size={17} color="#4A5568" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Content - Glass Card */}
        <div
          style={{
            flex: 1,
            overflow: "auto",
            padding: "0 24px 24px",
          }}
        >
          <div
            style={{
              background:
                "radial-gradient(ellipse 700px 600px at 5% 5%, rgba(200,162,77,0.25) 0%, transparent 65%), radial-gradient(ellipse 700px 600px at 95% 5%, rgba(2,35,80,0.18) 0%, transparent 65%), radial-gradient(ellipse 500px 500px at 5% 95%, rgba(237,232,224,0.5) 0%, transparent 70%), radial-gradient(ellipse 700px 600px at 95% 90%, rgba(200,162,77,0.20) 0%, transparent 65%), rgba(255,255,255,0.45)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              borderRadius: 24,
              minHeight: "100%",
              padding: 24,
            }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* ===== AURA CHAT ===== */}
      {chatOpen && (
        <div
          style={{
            position: "fixed",
            top: 16,
            right: 16,
            bottom: 80,
            width: 380,
            maxWidth: "calc(100vw - 32px)",
            background: "rgba(255,255,255,0.88)",
            backdropFilter: "blur(48px)",
            WebkitBackdropFilter: "blur(48px)",
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.5)",
            boxShadow: "0 8px 40px rgba(2,35,80,0.12), 0 2px 12px rgba(0,0,0,0.04)",
            display: "flex",
            flexDirection: "column" as const,
            overflow: "hidden",
            zIndex: 100,
            animation: "slideInRight 0.2s ease",
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
              borderBottom: "1px solid rgba(2,35,80,0.06)",
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "linear-gradient(135deg, #022350, #0A3A6B)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <MessageSquare size={18} color="#C8A24D" strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#022350",
                }}
              >
                Aura
              </div>
              <div style={{ fontSize: 11, color: "#7A7A8A", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0FA4A0" }} />
                KI-Assistentin
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(2,35,80,0.05)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <X size={18} color="#4A5568" strokeWidth={2} />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: 20,
              display: "flex",
              flexDirection: "column" as const,
              gap: 12,
            }}
          >
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", alignSelf: m.role === "bot" ? "flex-start" : "flex-end" }}>
                <div
                  style={{
                    fontSize: 13.5,
                    padding: "12px 16px",
                    borderRadius: 14,
                    lineHeight: 1.65,
                    background: m.role === "bot" ? "rgba(255,255,255,0.7)" : "linear-gradient(135deg, #022350, #0A3A6B)",
                    color: m.role === "bot" ? "#1A1A2E" : "white",
                    border: m.role === "bot" ? "1px solid rgba(2,35,80,0.06)" : "none",
                    whiteSpace: "pre-wrap" as const,
                  }}
                >
                  {m.text}
                </div>
                {m.role === "bot" && (
                  <button
                    onClick={() => {
                      if (isAuraSpeaking) {
                        stopAuraAudio();
                      } else {
                        speakAura(m.text);
                      }
                    }}
                    disabled={isAuraLoading}
                    style={{
                      marginTop: 4,
                      background: "none",
                      border: "none",
                      cursor: isAuraLoading ? "wait" : "pointer",
                      fontSize: 11,
                      color: isAuraSpeaking ? "#C0392B" : "#C8A24D",
                      fontWeight: 600,
                      padding: "2px 6px",
                      fontFamily: "inherit",
                      letterSpacing: "0.02em",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {isAuraLoading ? (
                      <><Loader2 size={11} strokeWidth={2} style={{ animation: "spin 1s linear infinite" }} /> Laden...</>
                    ) : isAuraSpeaking ? (
                      <><Square size={9} strokeWidth={2} fill="currentColor" /> Stoppen</>
                    ) : (
                      <><Volume2 size={11} strokeWidth={2} /> Vorlesen</>
                    )}
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div
                style={{
                  maxWidth: "85%",
                  fontSize: 13.5,
                  padding: "12px 16px",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(2,35,80,0.06)",
                  alignSelf: "flex-start",
                  color: "#9A9AAA",
                }}
              >
                Aura denkt nach...
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div
            style={{
              borderTop: "1px solid rgba(2,35,80,0.06)",
              padding: "14px 16px",
              display: "flex",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Frage Aura..."
              style={{
                flex: 1,
                border: "1px solid rgba(2,35,80,0.08)",
                borderRadius: 12,
                padding: "10px 16px",
                outline: "none",
                fontSize: 13.5,
                fontFamily: "inherit",
                background: "rgba(255,255,255,0.6)",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(200,162,77,0.4)"; }}
              onBlur={(e) => { (e.currentTarget as HTMLInputElement).style.borderColor = "rgba(2,35,80,0.08)"; }}
            />
            <button
              onClick={sendMsg}
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "linear-gradient(135deg, #022350, #0A3A6B)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              <Send size={16} color="white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}

      {/* Aura FAB */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #022350, #0A3A6B)",
          border: "2px solid rgba(200,162,77,0.4)",
          boxShadow: "0 4px 20px rgba(2,35,80,0.25)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.08)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 28px rgba(2,35,80,0.35)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(2,35,80,0.25)";
        }}
      >
        {chatOpen ? (
          <X size={22} color="#C8A24D" strokeWidth={1.8} />
        ) : (
          <MessageSquare size={22} color="#C8A24D" strokeWidth={1.8} />
        )}
      </button>

      {/* Responsive styles & animations */}
      <style jsx global>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 767px) {
          .z-sidebar-liquid {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 200px !important;
            transform: translateX(-100%) !important;
            background: rgba(255,255,255,0.95) !important;
            backdrop-filter: blur(24px) !important;
            -webkit-backdrop-filter: blur(24px) !important;
            box-shadow: none !important;
            z-index: 95 !important;
          }
          .z-sidebar-liquid.z-sidebar-liquid-open {
            transform: translateX(0) !important;
            box-shadow: 4px 0 24px rgba(0,0,0,0.08) !important;
          }
          .z-sidebar-close-liquid {
            display: flex !important;
          }
          .z-hamburger-liquid {
            display: flex !important;
          }
        }
        @media (min-width: 768px) {
          .z-sidebar-liquid {
            position: relative !important;
            transform: none !important;
          }
          .z-sidebar-close-liquid {
            display: none !important;
          }
          .z-hamburger-liquid {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ===== NAV ICONS ===== */
function DashboardIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="2" /><rect x="14" y="3" width="7" height="5" rx="2" /><rect x="14" y="12" width="7" height="9" rx="2" /><rect x="3" y="16" width="7" height="5" rx="2" /></svg>; }
function CoursesIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>; }
function PathIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4" /></svg>; }
function ExamIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>; }
function CertIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>; }
function ForumIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>; }
function KahootIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>; }
function AIIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" /></svg>; }
function TeamIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>; }
function AnalyticsIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>; }
function PhoneTrainingIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>; }
function SalesIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>; }
function PartnerIcon({ active }: { active: boolean }) { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#4A5568"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>; }
