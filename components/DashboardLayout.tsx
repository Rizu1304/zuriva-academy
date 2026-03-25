"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navSections = [
  {
    label: "Lernen",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
      { name: "Kurse", href: "/courses", icon: CoursesIcon },
      { name: "Lernpfade", href: "/lernpfade", icon: PathIcon },
      { name: "Pruefungen", href: "/pruefungen", icon: ExamIcon },
      { name: "Zertifikate", href: "/zertifikate", icon: CertIcon },
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
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hallo! Ich bin Aura, deine KI-Assistentin der Zuriva Academy. Wie kann ich dir helfen?" },
  ]);
  const [input, setInput] = useState("");

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(
      () => setMessages((m) => [...m, { role: "bot", text: "Danke fuer deine Frage! Ich analysiere das fuer dich und helfe dir gerne weiter." }]),
      800
    );
  };

  return (
    <div className="premium-bg grain-overlay" style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "var(--font-sans), system-ui, sans-serif" }}>
      {/* Ambient Mesh Orbs */}
      <div className="mesh-orb mesh-orb-teal" style={{ width: 500, height: 500, top: -100, right: -100, position: "fixed" }} />
      <div className="mesh-orb mesh-orb-gold" style={{ width: 400, height: 400, bottom: -80, left: 200, position: "fixed" }} />
      <div className="mesh-orb mesh-orb-purple" style={{ width: 350, height: 350, top: "40%", right: "20%", position: "fixed" }} />

      {/* PREMIUM SIDEBAR */}
      <aside className="glass-sidebar premium-scroll" style={{ width: 272, minWidth: 272, display: "flex", flexDirection: "column", overflowY: "auto", position: "relative", zIndex: 10 }}>
        {/* Logo */}
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #0FA4A0, #0d8c89)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(15,164,160,0.3)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div>
            <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.14em", color: "white" }}>ZURIVA</span>
            <span className="gold-gradient-text" style={{ fontSize: 11, fontWeight: 600, marginLeft: 6 }}>academy</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div style={{ flex: 1, padding: "8px 12px" }}>
          {navSections.map((section) => (
            <div key={section.label} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", padding: "12px 12px 6px" }}>
                {section.label}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`nav-item ${isActive ? "nav-item-active" : ""}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 12px",
                      borderRadius: 12,
                      color: isActive ? "#5EEAD4" : "rgba(255,255,255,0.55)",
                      fontWeight: isActive ? 600 : 400,
                      fontSize: 13.5,
                      textDecoration: "none",
                      marginBottom: 2,
                    }}
                  >
                    <item.icon active={isActive} />
                    {item.name}
                    {isActive && (
                      <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#0FA4A0", boxShadow: "0 0 8px rgba(15,164,160,0.6)" }} />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Upgrade Card */}
        <div style={{ margin: "0 12px 12px", padding: "16px", borderRadius: 16, background: "linear-gradient(135deg, rgba(15,164,160,0.12), rgba(212,168,67,0.08))", border: "1px solid rgba(15,164,160,0.15)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#5EEAD4", marginBottom: 4 }}>VBV Fortschritt</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>342 / 600 Credits</div>
          <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)" }}>
            <div style={{ height: 4, borderRadius: 4, background: "linear-gradient(90deg, #0FA4A0, #5EEAD4)", width: "57%", transition: "width 1s ease" }} />
          </div>
        </div>

        {/* User Profile */}
        <div style={{ padding: "16px 16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg, #0FA4A0, #0d8c89)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", boxShadow: "0 4px 12px rgba(15,164,160,0.25)" }}>
            LM
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "white" }}>Laura Meier</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Vermittlerin</div>
          </div>
          <button style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
        {/* TOPBAR */}
        <div style={{ height: 72, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(10,14,39,0.5)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "white", letterSpacing: "-0.01em" }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{subtitle}</div>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {actions}
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.3)" }}>Suchen...</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", padding: "2px 6px", borderRadius: 6, background: "rgba(255,255,255,0.05)", fontFamily: "monospace" }}>⌘K</span>
            </div>
            {/* Notifications */}
            <button style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", color: "rgba(255,255,255,0.5)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <div style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", border: "2px solid #0A0E27" }} />
            </button>
            {/* Avatar */}
            <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(135deg, #0FA4A0, #0d8c89)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", cursor: "pointer", boxShadow: "0 4px 12px rgba(15,164,160,0.25)" }}>
              LM
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="premium-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px" }}>
          {children}
        </div>
      </div>

      {/* AURA CHAT PANEL */}
      {chatOpen && (
        <div className="animate-slide-in-right" style={{ position: "fixed", top: 0, right: 0, width: 420, height: "100vh", background: "rgba(10,14,39,0.95)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderLeft: "1px solid rgba(255,255,255,0.08)", zIndex: 999999, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "linear-gradient(135deg, #0FA4A0, #0d8c89)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(15,164,160,0.3)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "white" }}>Aura</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px rgba(74,222,128,0.4)" }} />
                KI-Assistentin
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 18 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="premium-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", fontSize: 13.5, padding: "12px 16px", borderRadius: 16, lineHeight: 1.6, background: m.role === "bot" ? "rgba(255,255,255,0.06)" : "linear-gradient(135deg, #0FA4A0, #0d8c89)", color: m.role === "bot" ? "rgba(255,255,255,0.8)" : "white", alignSelf: m.role === "bot" ? "flex-start" : "flex-end", border: m.role === "bot" ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 20px", display: "flex", gap: 10, flexShrink: 0 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Frage Aura..."
              style={{ flex: 1, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "10px 16px", outline: "none", fontSize: 13.5, color: "white", fontFamily: "inherit" }}
            />
            <button onClick={sendMsg} className="premium-btn" style={{ padding: "10px 16px", borderRadius: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4z" /><path d="m22 2-11 11" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* AURA FAB */}
      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="aura-glow"
        style={{ position: "fixed", bottom: 28, right: 28, width: 60, height: 60, borderRadius: 18, background: "linear-gradient(135deg, #0FA4A0, #0d8c89)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 99999, border: "none", transition: "transform 0.3s ease" }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}

/* ========== SVG ICON COMPONENTS ========== */

function DashboardIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="9" rx="2" /><rect x="14" y="3" width="7" height="5" rx="2" /><rect x="14" y="12" width="7" height="9" rx="2" /><rect x="3" y="16" width="7" height="5" rx="2" />
    </svg>
  );
}

function CoursesIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function PathIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12h4l3-9 4 18 3-9h4" />
    </svg>
  );
}

function ExamIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}

function CertIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ForumIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function KahootIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function AIIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" />
    </svg>
  );
}

function TeamIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function AnalyticsIcon({ active }: { active: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#5EEAD4" : "currentColor"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}
