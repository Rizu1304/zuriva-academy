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

      {/* ===== PREMIUM NAVY SIDEBAR ===== */}
      <aside className="z-scroll" style={{ width: 272, minWidth: 272, background: "linear-gradient(180deg, #022350 0%, #011a3a 100%)", display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Logo */}
        <div style={{ padding: "32px 24px 28px" }}>
          <div className="z-gold-line" style={{ marginBottom: 16 }} />
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className="font-heading" style={{ fontSize: 24, fontWeight: 500, letterSpacing: "0.1em", color: "white" }}>ZURIVA</span>
            <span style={{ fontSize: 11.5, fontWeight: 500, color: "#C8A24D", letterSpacing: "0.06em" }}>academy</span>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ flex: 1, padding: "0 14px" }}>
          {navSections.map((section) => (
            <div key={section.label} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px", opacity: 0.7 }}>
                {section.label}
              </div>
              {section.items.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link key={item.name} href={item.href} className={`z-nav-dark ${isActive ? "z-nav-dark-active" : ""}`}>
                    <item.icon active={isActive} />
                    <span>{item.name}</span>
                    {isActive && <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#C8A24D" }} />}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* VBV Progress Card */}
        <div style={{ margin: "0 14px 14px", padding: "18px 18px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D" }}>VBV 2026</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>57%</span>
          </div>
          <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.08)", marginBottom: 8 }}>
            <div style={{ height: 3, borderRadius: 2, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", width: "57%" }} />
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>342 von 600 Credits</div>
        </div>

        {/* User Profile */}
        <div style={{ padding: "16px 18px 22px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #C8A24D, #E0B95F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#022350" }}>LM</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "white" }}>Laura Meier</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Vermittlerin</div>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: "pointer" }}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Topbar */}
        <div style={{ height: 72, padding: "0 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, background: "white", borderBottom: "1px solid #ECE8E1" }}>
          <div>
            <div className="font-heading" style={{ fontSize: 24, fontWeight: 500, color: "#022350", lineHeight: 1.2, letterSpacing: "-0.01em" }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12.5, color: "#9A9AAA", marginTop: 3 }}>{subtitle}</div>}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {actions}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 12, background: "#FAF8F5", border: "1px solid #ECE8E1", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9A9AAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <span style={{ fontSize: 13, color: "#9A9AAA" }}>Suchen...</span>
              <span style={{ fontSize: 10, color: "#C8A24D", padding: "2px 6px", borderRadius: 4, background: "rgba(200,162,77,0.08)", fontWeight: 600, marginLeft: 4 }}>⌘K</span>
            </div>
            <button style={{ width: 40, height: 40, borderRadius: 12, background: "white", border: "1px solid #ECE8E1", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#4A4A5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <div style={{ position: "absolute", top: 9, right: 10, width: 7, height: 7, borderRadius: "50%", background: "#C0392B", border: "2px solid white" }} />
            </button>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #C8A24D, #E0B95F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#022350", cursor: "pointer" }}>LM</div>
          </div>
        </div>

        {/* Content */}
        <div className="z-scroll" style={{ flex: 1, overflowY: "auto", padding: "32px 36px 56px" }}>
          {children}
        </div>
      </div>

      {/* ===== AURA CHAT ===== */}
      {chatOpen && (
        <div className="animate-slide-in-right" style={{ position: "fixed", top: 0, right: 0, width: 400, height: "100vh", background: "white", borderLeft: "1px solid #ECE8E1", boxShadow: "-12px 0 48px rgba(2,35,80,0.08)", zIndex: 999999, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#022350", padding: "20px 22px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(200,162,77,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div className="font-heading" style={{ fontSize: 17, fontWeight: 500, color: "white" }}>Aura</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0FA4A0" }} /> KI-Assistentin
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ color: "rgba(255,255,255,0.4)", cursor: "pointer", background: "none", border: "none" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
          <div className="z-scroll" style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", fontSize: 13.5, padding: "12px 16px", borderRadius: 14, lineHeight: 1.65, background: m.role === "bot" ? "#FAF8F5" : "#022350", color: m.role === "bot" ? "#1A1A2E" : "white", alignSelf: m.role === "bot" ? "flex-start" : "flex-end", border: m.role === "bot" ? "1px solid #ECE8E1" : "none" }}>{m.text}</div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid #ECE8E1", padding: "14px 18px", display: "flex", gap: 10, flexShrink: 0 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMsg()} placeholder="Frage Aura..." style={{ flex: 1, border: "1px solid #ECE8E1", borderRadius: 12, padding: "10px 16px", outline: "none", fontSize: 13.5, fontFamily: "inherit", background: "#FAF8F5" }} />
            <button onClick={sendMsg} className="z-btn z-btn-primary" style={{ padding: "10px 16px", borderRadius: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z" /><path d="m22 2-11 11" /></svg>
            </button>
          </div>
        </div>
      )}

      {/* Aura FAB */}
      <button onClick={() => setChatOpen(!chatOpen)} style={{ position: "fixed", bottom: 28, right: 28, width: 58, height: 58, borderRadius: 16, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 99999, border: "1px solid rgba(200,162,77,0.2)", boxShadow: "0 8px 32px rgba(2,35,80,0.25)" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A24D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" /></svg>
      </button>
    </div>
  );
}

/* ===== NAV ICONS ===== */
function DashboardIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="9" rx="2" /><rect x="14" y="3" width="7" height="5" rx="2" /><rect x="14" y="12" width="7" height="9" rx="2" /><rect x="3" y="16" width="7" height="5" rx="2" /></svg>;
}
function CoursesIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
}
function PathIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4" /></svg>;
}
function ExamIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>;
}
function CertIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>;
}
function ForumIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>;
}
function KahootIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>;
}
function AIIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="m2 14 6-6 6 6 6-6" /></svg>;
}
function TeamIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
}
function AnalyticsIcon({ active }: { active: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={active ? "white" : "rgba(255,255,255,0.35)"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
}
