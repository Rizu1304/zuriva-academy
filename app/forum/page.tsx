"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

const posts = [
  { id: 1, title: "UVG vs. KVG in der Haftpflicht — was gilt wann?", category: "Nicht-Leben", author: "Thomas Mueller", avatar: "TM", time: "vor 2 Std.", replies: 12, views: 148, solved: true, reactions: [{ emoji: "👍", count: 12 }, { emoji: "🔥", count: 4 }, { emoji: "💡", count: 7 }] },
  { id: 2, title: "Rueckkaufswert gemischte Lebensversicherung — Berechnung?", category: "Leben", author: "Beat Keller", avatar: "BK", time: "vor 5 Std.", replies: 4, views: 67, solved: false, reactions: [{ emoji: "🤔", count: 3 }, { emoji: "👍", count: 5 }] },
  { id: 3, title: "FIDLEG — muss jede Kundenberatung protokolliert werden?", category: "Compliance", author: "Anna Schneider", avatar: "AS", time: "vor 1 Tag", replies: 7, views: 203, solved: true, reactions: [{ emoji: "😅", count: 9 }, { emoji: "👍", count: 14 }, { emoji: "💯", count: 6 }] },
  { id: 4, title: "Literatur-Empfehlungen fuer VBV-Pruefungsvorbereitung 2026", category: "Allgemein", author: "Laura Meier", avatar: "LM", time: "vor 2 Tagen", replies: 2, views: 89, solved: false, reactions: [{ emoji: "📚", count: 11 }, { emoji: "🙏", count: 8 }] },
  { id: 5, title: "Unterschied Einzel- vs. Kollektivlebensversicherung", category: "Leben", author: "Petra Koch", avatar: "PK", time: "vor 3 Tagen", replies: 5, views: 112, solved: true, reactions: [{ emoji: "👍", count: 8 }, { emoji: "💡", count: 3 }] },
];

const catColors: Record<string, string> = {
  "Nicht-Leben": "#0FA4A0",
  "Leben": "#818CF8",
  "Compliance": "#ef4444",
  "Allgemein": "#D4A843",
};

export default function Forum() {
  const [selected, setSelected] = useState(posts[0]);
  const [replyText, setReplyText] = useState("");

  return (
    <DashboardLayout title="Forum" subtitle="Diskutiere mit deinem Team">
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 20, height: "calc(100vh - 180px)" }}>
        {/* Post List */}
        <div className="glass-card-static animate-fade-in-up" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white" }}>Beitraege</div>
            <button className="premium-btn" style={{ padding: "7px 14px", fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Neu
            </button>
          </div>
          <div className="premium-scroll" style={{ flex: 1, overflowY: "auto" }}>
            {posts.map((post) => {
              const isSelected = selected.id === post.id;
              const color = catColors[post.category] || "#0FA4A0";
              return (
                <div
                  key={post.id}
                  onClick={() => setSelected(post)}
                  style={{ padding: "16px 20px", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer", background: isSelected ? "rgba(15,164,160,0.08)" : "transparent", borderLeft: isSelected ? "3px solid #0FA4A0" : "3px solid transparent", transition: "all 0.2s ease" }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: isSelected ? "#5EEAD4" : "rgba(255,255,255,0.8)", lineHeight: 1.4, flex: 1 }}>{post.title}</div>
                    {post.solved && <span style={{ background: "rgba(15,164,160,0.15)", color: "#5EEAD4", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 20, whiteSpace: "nowrap", height: "fit-content" }}>Geloest</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8, background: `${color}15`, color }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{post.time}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {post.reactions.map((r, ri) => (
                      <span key={ri} style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: "2px 8px", fontSize: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
                        {r.emoji} <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.5)" }}>{r.count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post Detail */}
        <div className="animate-slide-in-right" style={{ display: "flex", flexDirection: "column", gap: 16, overflow: "auto" }}>
          {/* Header */}
          <div className="glass-card-static" style={{ padding: "24px 28px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}>
                {selected.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "white", marginBottom: 4, lineHeight: 1.3 }}>{selected.title}</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>{selected.author}</span>
                  <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.25)" }}>{selected.time}</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{selected.views} Aufrufe</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{selected.replies} Antworten</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 20 }}>
              Dies ist eine Frage zu einem wichtigen Thema im Schweizer Versicherungsrecht. Die Abgrenzung zwischen verschiedenen Versicherungsgesetzen ist oft komplex und erfordert genaues Verstaendnis der jeweiligen Geltungsbereiche.
            </div>
            <div style={{ display: "flex", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap" }}>
              {selected.reactions.map((r, ri) => (
                <button key={ri} style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", cursor: "pointer", fontSize: 13, fontFamily: "inherit", color: "rgba(255,255,255,0.6)", transition: "all 0.2s" }}>
                  {r.emoji} <span style={{ fontSize: 12, fontWeight: 600 }}>{r.count}</span>
                </button>
              ))}
              <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 12, border: "1px dashed rgba(255,255,255,0.1)", background: "transparent", cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.3)", fontFamily: "inherit" }}>+ Reagieren</button>
            </div>
          </div>

          {/* Best Answer */}
          {selected.solved && (
            <div style={{ borderRadius: 20, border: "1px solid rgba(15,164,160,0.25)", background: "rgba(15,164,160,0.05)", backdropFilter: "blur(20px)", padding: "20px 24px", position: "relative" }}>
              <div style={{ position: "absolute", top: 16, right: 18, background: "rgba(15,164,160,0.15)", color: "#5EEAD4", fontSize: 10.5, fontWeight: 800, padding: "4px 10px", borderRadius: 20 }}>Beste Antwort</div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #0FA4A0, #0d8c89)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>AS</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "white" }}>Anna Schneider <span style={{ background: "rgba(212,168,67,0.12)", color: "#D4A843", fontSize: 9.5, padding: "2px 8px", borderRadius: 10, fontWeight: 700, marginLeft: 4 }}>Instruktorin</span></div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>vor 1 Std.</div>
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Gute Frage! Hier die wichtigsten Punkte zur Abgrenzung: Das Schweizer Versicherungsrecht unterscheidet klar zwischen verschiedenen Bereichen. Die entscheidenden Faktoren sind der Anwendungsbereich und die spezifischen Voraussetzungen jedes Gesetzes.
              </div>
            </div>
          )}

          {/* Reply */}
          <div className="glass-card-static" style={{ padding: "18px 22px" }}>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Schreib eine Antwort..."
              style={{ width: "100%", border: "none", outline: "none", fontFamily: "inherit", fontSize: 13.5, color: "rgba(255,255,255,0.7)", resize: "none", minHeight: 72, lineHeight: 1.7, boxSizing: "border-box", background: "transparent" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {["👍", "❤️", "😂", "🔥", "💡", "🙏"].map((e) => (
                  <span key={e} onClick={() => setReplyText((t) => t + e)} style={{ fontSize: 18, cursor: "pointer", padding: "4px 6px", borderRadius: 8, transition: "background 0.2s" }}>
                    {e}
                  </span>
                ))}
              </div>
              <button className="premium-btn">Antworten</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
