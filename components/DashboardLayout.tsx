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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#FAF8F5" }}>

      {/* ===== SIDEBAR ===== */}
      <aside className="z-scroll" style={{ width: 264, minWidth: 264, background: "white", borderRight: "1px solid #E8E4DE", display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Logo */}
        <div style={{ padding: "28px 20px 24px", display: "flex", alignItems: "baseline", gap: 4 }}>
          <span className="font-heading" style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.08em", color: "#022350" }}>ZURIVA</span>
          <span style={{ fontSize: 11.5, fontWeight: 500, color: "#C8A24D", letterSpacing: "0.04em" }}>academy</span>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: "0 12px" }}>
          {navSections.map((section) => (
            <div key={section.label} style={{ marginBottom: 4 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "14px 14px 6px" }}>
                {section.label}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`z-nav ${isActive ? "z-nav-active" : ""}`}
                  >
                    <item.icon active={isActive} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* VBV Progress */}
        <div style={{ margin: "0 16px 12px", padding: "14px 16px", borderRadius: 12, background: "#FAF8F5", border: "1px solid #E8E4DE" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D" }}>VBV 2026</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#022350" }}>342 / 600</span>
          </div>
          <div className="z-progress">
            <div className="z-progress-bar" style={{ width: "57%", background: "linear-gradient(90deg, #0FA4A0, #14C4BF)" }} />
          </div>
        </div>

        {/* User */}
        <div style={{ padding: "14px 16px 18px", borderTop: "1px solid #E8E4DE", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white" }}>LM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>Laura Meier</div>
            <div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A9AAA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
            <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div style={{ height: 68, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "white", borderBottom: "1px solid #E8E4DE" }}>
          <div>
            <div className="font-heading" style={{ fontSize: 22, fontWeight: 500, color: "#022350", lineHeight: 1.2 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: "#9A9AAA", marginTop: 2 }}>{subtitle}</div>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {actions}
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, background: "#FAF8F5", border: "1px solid #E8E4DE", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9AAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <span style={{ fontSize: 12.5, color: "#9A9AAA" }}>Suchen...</span>
            </div>
            {/* Notification */}
            <button style={{ width: 38, height: 38, borderRadius: 10, background: "white", border: "1px solid #E8E4DE", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A4A5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <div style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: "50%", background: "#C0392B", border: "2px solid white" }} />
            </button>
            {/* Avatar */}
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white", cursor: "pointer" }}>LM</div>
          </div>
        </div>

        {/* Content */}
        <div className="z-scroll" style={{ flex: 1, overflowY: "auto", padding: "28px 32px 48px" }}>
          {children}
        </div>
      </div>

      {/* ===== AURA CHAT ===== */}
      {chatOpen && (
        <div className="animate-slide-in-right" style={{ position: "fixed", top: 0, right: 0, width: 400, height: "100vh", background: "white", borderLeft: "1px solid #E8E4DE", boxShadow: "-8px 0 40px rgba(2,35,80,0.08)", zIndex: 999999, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#022350", padding: "18px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Aura</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0FA4A0" }} /> KI-Assistentin
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 18, lineHeight: 1, background: "none", border: "none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
          <div className="z-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", fontSize: 13.5, padding: "10px 14px", borderRadius: 14, lineHeight: 1.6, background: m.role === "bot" ? "#FAF8F5" : "#022350", color: m.role === "bot" ? "#1A1A2E" : "white", alignSelf: m.role === "bot" ? "flex-start" : "flex-end", border: m.role === "bot" ? "1px solid #E8E4DE" : "none" }}>{m.text}</div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #E8E4DE", padding: "12px 16px", display: "flex", gap: 8, flexShrink: 0 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} placeholder="Frage Aura..." style={{ flex: 1, border: "1px solid #E8E4DE", borderRadius: 10, padding: "9px 14px", outline: "none", fontSize: 13.5, fontFamily: "inherit", background: "#FAF8F5" }} />
            <button onClick={sendMsg} className="z-btn z-btn-teal" style={{ padding: "9px 14px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z" /><path d="m22 2-11 11" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Aura FAB */}
      <button onClick={() => setChatOpen(!chatOpen)} style={{ position: "fixed", bottom: 28, right: 28, width: 56, height: 56, borderRadius: 14, background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 99999, border: "none", boxShadow: "0 4px 20px rgba(2,35,80,0.2)", transition: "all 0.25s ease" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" /></svg>
      </button>
    </div>
  );
}

/* ===== NAV ICONS (Lucide-style, 1.8px stroke) ===== */

function DashboardIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="2" /><rect x="14" y="3" width="7" height="5" rx="2" /><rect x="14" y="12" width="7" height="9" rx="2" /><rect x="3" y="16" width="7" height="5" rx="2" /></svg>;
}
function CoursesIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
}
function PathIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4" /></svg>;
}
function ExamIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>;
}
function CertIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>;
}
function ForumIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
function KahootIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
}
function AIIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" /></svg>;
}
function TeamIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function AnalyticsIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "#022350" : "#9A9AAA"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
}
