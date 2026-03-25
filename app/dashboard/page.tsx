"use client";
import { useState, useRef, useCallback } from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", active: true },
  { name: "Kurse", href: "/courses", active: false },
  { name: "Lernpfade", href: "#", active: false },
  { name: "Prüfungen", href: "#", active: false },
  { name: "Zertifikate", href: "#", active: false },
  { name: "Forum", href: "#", active: false },
  { name: "Kahoot", href: "#", active: false },
  { name: "KI-Studio", href: "#", active: false },
  { name: "Team", href: "#", active: false },
  { name: "Analytics", href: "#", active: false },
];

const stats = [
  { n: "4", l: "Aktive Kurse", t: "↑ +1 diese Woche", red: false },
  { n: "342", l: "Credits total", t: "↑ +24 diese Woche", red: false },
  { n: "34h", l: "Lernzeit total", t: "↑ +3.2h diese Woche", red: false },
  { n: "94%", l: "Quiz-Score", t: "↓ -2% letzte Prüfung", red: true },
];

const courses = [
  { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", tag: "Nicht-Leben", title: "Grundlagen Sachversicherung", p: 68, credits: 8 },
  { img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80", tag: "Leben", title: "Lebensversicherungen", p: 33, credits: 12 },
  { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80", tag: "Faehigkeiten", title: "Beratungskompetenz", p: 85, credits: 10 },
];

const activities = [
  { text: "Quiz Sachversicherung bestanden", time: "Heute 09:14", color: "#0FA4A0" },
  { text: "Modul 5 Beratungskompetenz abgeschlossen", time: "Heute 08:42", color: "#C8A24D" },
  { text: "Forum Kommentar in Lebensversicherungen", time: "Gestern 16:30", color: "#6366f1" },
  { text: "Kurs FIDLEG & VAG eingeschrieben", time: "Fr 20.03.", color: "#022350" },
  { text: "Zertifikat Trainee Grundausbildung erhalten", time: "Mi 18.03.", color: "#0FA4A0" },
];

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hallo! Ich bin Aura, deine KI-Assistentin der Zuriva Academy. Wie kann ich dir helfen?" }
  ]);
  const [input, setInput] = useState("");

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

  const sendMsg = () => {
    if (!input.trim()) return;
    const userText = input;
    setMessages(m => [...m, { role: "user", text: userText }]);
    setInput("");
    setTimeout(() => {
      const botReply = "Danke fuer deine Frage! Ich helfe dir gerne weiter. Klicke auf das Lautsprecher-Symbol, um meine Antwort zu hoeren.";
      setMessages(m => [...m, { role: "bot", text: botReply }]);
    }, 800);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "DM Sans, sans-serif", background: "#F0F2F5", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column", overflowY: "auto" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350" }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>

        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A9AAA", padding: "18px 22px 6px" }}>Lernen</div>
        {navItems.slice(0, 5).map((item) => (
          <a key={item.name} href={item.href} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px 8px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none" }}>{item.name}</a>
        ))}

        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A9AAA", padding: "18px 22px 6px" }}>Tools</div>
        {navItems.slice(5, 8).map((item) => (
          <a key={item.name} href={item.href} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px 8px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2.5px solid transparent", fontSize: 13, textDecoration: "none" }}>{item.name}</a>
        ))}

        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A9AAA", padding: "18px 22px 6px" }}>Admin</div>
        {navItems.slice(8).map((item) => (
          <a key={item.name} href={item.href} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 14px 8px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2.5px solid transparent", fontSize: 13, textDecoration: "none" }}>{item.name}</a>
        ))}

        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #0a7a77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div>
            <div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* TOPBAR */}
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 500, color: "#022350" }}>Guten Morgen, Laura</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>Montag, 24. März 2026 · VBV-Frist in 99 Tagen</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, border: "0.5px solid #dce0e6", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>🔔</div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #0a7a77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white" }}>LM</div>
          </div>
        </div>

        {/* CONTENT */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px 40px" }}>

          {/* STATS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 14 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "18px 20px" }}>
                <div style={{ fontSize: 34, fontWeight: 600, color: "#022350", lineHeight: 1, marginBottom: 4 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: "#4A4A5A" }}>{s.l}</div>
                <div style={{ fontSize: 11, fontWeight: 500, marginTop: 8, color: s.red ? "#e74c3c" : "#0FA4A0" }}>{s.t}</div>
              </div>
            ))}
          </div>

          {/* VBV BANNER */}
          <div style={{ background: "#022350", borderRadius: 16, padding: "24px 28px", marginBottom: 14, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "rgba(15,164,160,0.12)" }} />
            <div style={{ position: "relative" }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 6 }}>VBV-Zertifizierung 2026</div>
              <div style={{ fontSize: 22, fontWeight: 600, color: "white", marginBottom: 14 }}>Dein Lernfortschritt</div>
              <div style={{ background: "rgba(255,255,255,0.12)", height: 3, borderRadius: 2, marginBottom: 8 }}>
                <div style={{ height: 3, borderRadius: 2, background: "#0FA4A0", width: "57%" }} />
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Ziel: <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>600 Credits</span></div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Frist: <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>30. Juni 2026</span></div>
              </div>
            </div>
            <div style={{ textAlign: "right", position: "relative" }}>
              <div style={{ fontSize: 52, fontWeight: 600, color: "#C8A24D", lineHeight: 1 }}>342</div>
              <div style={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }}>/ 600 Credits</div>
            </div>
          </div>

          {/* 2 COLUMN LAYOUT */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 14 }}>

            {/* COURSES */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#022350" }}>Aktuelle Kurse</div>
                <a href="/courses" style={{ fontSize: 12, color: "#0FA4A0", fontWeight: 500, textDecoration: "none" }}>Alle ansehen →</a>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 12 }}>
                {courses.map((c, i) => (
                  <div key={i} style={{ borderRadius: 14, overflow: "hidden", position: "relative", minHeight: 180, cursor: "pointer" }}>
                    <img src={c.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, filter: "brightness(0.45)" }} />
                    <div style={{ position: "absolute", inset: 0, padding: "12px 12px 14px", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "linear-gradient(to top,rgba(2,25,60,0.92) 0%,transparent 50%)" }}>
                      <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(255,255,255,0.15)", color: "white", fontSize: 9, fontWeight: 600, padding: "2px 7px", borderRadius: 20 }}>{c.tag}</div>
                      <div style={{ position: "absolute", top: 8, right: 10, fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{c.credits}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "white", marginBottom: 6, lineHeight: 1.3 }}>{c.title}</div>
                      <div style={{ background: "rgba(255,255,255,0.2)", height: 2.5, borderRadius: 2, marginBottom: 3 }}>
                        <div style={{ height: 2.5, borderRadius: 2, background: "#0FA4A0", width: `${c.p}%` }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
                        <span>Fortschritt</span><span style={{ color: "white" }}>{c.p}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ACTIVITIES */}
            <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "18px 20px" }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 14 }}>Letzte Aktivitaeten</div>
              {activities.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: i < activities.length - 1 ? "0.5px solid #dce0e6" : "none", alignItems: "flex-start" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, color: "#1A1A2E", lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* AURA CHAT */}
      {chatOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: 400, height: "100vh", background: "white", borderLeft: "0.5px solid #dce0e6", boxShadow: "-8px 0 40px rgba(2,35,80,0.15)", zIndex: 999999, display: "flex", flexDirection: "column" }}>
          <div style={{ background: "#022350", padding: "18px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "white" }}>Aura</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} /> Online
              </div>
            </div>
            <div onClick={() => setChatOpen(false)} style={{ color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: 22, lineHeight: 1 }}>x</div>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ maxWidth: "85%", alignSelf: m.role === "bot" ? "flex-start" : "flex-end" }}>
                <div style={{ fontSize: 13.5, padding: "10px 13px", borderRadius: 12, background: m.role === "bot" ? "#f0f2f5" : "#022350", color: m.role === "bot" ? "#1A1A2E" : "white" }}>{m.text}</div>
                {m.role === "bot" && (
                  <button
                    onClick={() => speakAura(m.text)}
                    disabled={isAuraLoading}
                    style={{ marginTop: 4, background: "none", border: "none", cursor: isAuraLoading ? "wait" : "pointer", fontSize: 11, color: isAuraSpeaking ? "#e74c3c" : "#0FA4A0", fontWeight: 500, padding: "2px 6px", fontFamily: "inherit" }}
                  >
                    {isAuraLoading ? "⏳ Laden..." : isAuraSpeaking ? "🔊 Spricht..." : "🔊 Vorlesen"}
                  </button>
                )}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "0.5px solid #dce0e6", padding: "12px 16px", display: "flex", gap: 8, flexShrink: 0 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()} placeholder="Frage Aura..." style={{ flex: 1, border: "none", outline: "none", fontSize: 14, fontFamily: "sans-serif" }} />
            <button onClick={sendMsg} style={{ width: 34, height: 34, borderRadius: 8, background: "#0FA4A0", border: "none", cursor: "pointer", color: "white", fontSize: 16 }}>→</button>
          </div>
        </div>
      )}

      {/* AURA BUTTON */}
      <div onClick={() => setChatOpen(!chatOpen)} style={{ position: "fixed", bottom: 28, right: 28, width: 60, height: 60, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, cursor: "pointer", boxShadow: "0 4px 18px rgba(2,35,80,0.3)", zIndex: 99999 }}>🤖</div>

    </div>
  );
}