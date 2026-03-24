"use client";
import { useState } from "react";

const posts = [
  { id: 1, title: "UVG vs. KVG in der Haftpflicht — was gilt wann?", category: "Nicht-Leben", author: "Thomas Müller", time: "vor 2 Std.", replies: 12, views: 148, solved: true, reactions: [{ emoji: "👍", count: 12 }, { emoji: "🔥", count: 4 }, { emoji: "💡", count: 7 }] },
  { id: 2, title: "Rückkaufswert gemischte Lebensversicherung — Berechnung?", category: "Leben", author: "Beat Keller", time: "vor 5 Std.", replies: 4, views: 67, solved: false, reactions: [{ emoji: "🤔", count: 3 }, { emoji: "👍", count: 5 }] },
  { id: 3, title: "FIDLEG — muss jede Kundenberatung protokolliert werden?", category: "Compliance", author: "Anna Schneider", time: "vor 1 Tag", replies: 7, views: 203, solved: true, reactions: [{ emoji: "😅", count: 9 }, { emoji: "👍", count: 14 }, { emoji: "💯", count: 6 }] },
  { id: 4, title: "Literatur-Empfehlungen für VBV-Prüfungsvorbereitung 2026", category: "Allgemein", author: "Laura Meier", time: "vor 2 Tagen", replies: 2, views: 89, solved: false, reactions: [{ emoji: "📚", count: 11 }, { emoji: "🙏", count: 8 }] },
  { id: 5, title: "Unterschied Einzel- vs. Kollektivlebensversicherung", category: "Leben", author: "Petra Koch", time: "vor 3 Tagen", replies: 5, views: 112, solved: true, reactions: [{ emoji: "👍", count: 8 }, { emoji: "💡", count: 3 }] },
];

const catColors: Record<string, { bg: string; color: string }> = {
  "Nicht-Leben": { bg: "rgba(2,35,80,0.07)", color: "#022350" },
  "Leben": { bg: "rgba(15,164,160,0.08)", color: "#0FA4A0" },
  "Compliance": { bg: "rgba(231,76,60,0.08)", color: "#c0392b" },
  "Allgemein": { bg: "rgba(200,162,77,0.1)", color: "#a07828" },
};

export default function Forum() {
  const [selected, setSelected] = useState(posts[0]);
  const [replyText, setReplyText] = useState("");

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350" }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Kurse", href: "/courses" },
          { name: "Lernpfade", href: "/lernpfade" },
          { name: "Pruefungen", href: "/pruefungen" },
          { name: "Zertifikate", href: "/zertifikate" },
          { name: "Forum", href: "/forum", active: true },
          { name: "Analytics", href: "#" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* POST LIST */}
        <div style={{ width: 380, minWidth: 380, borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column", background: "white", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "0.5px solid #dce0e6", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#022350" }}>Forum</div>
              <button style={{ padding: "6px 14px", background: "#0FA4A0", color: "white", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>+ Neu</button>
            </div>
            <input placeholder="Beiträge suchen..." style={{ width: "100%", padding: "8px 12px", border: "0.5px solid #dce0e6", borderRadius: 9, fontSize: 13, outline: "none", background: "#F0F2F5", boxSizing: "border-box" }} />
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {posts.map(post => (
              <div key={post.id} onClick={() => setSelected(post)} style={{ padding: "14px 20px", borderBottom: "0.5px solid #dce0e6", cursor: "pointer", background: selected.id === post.id ? "#EEF5FF" : "transparent", borderLeft: selected.id === post.id ? "3px solid #0FA4A0" : "3px solid transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: selected.id === post.id ? "#0FA4A0" : "#022350", lineHeight: 1.35, flex: 1 }}>{post.title}</div>
                  {post.solved && <span style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 20, whiteSpace: "nowrap", height: "fit-content" }}>✓</span>}
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: catColors[post.category]?.bg, color: catColors[post.category]?.color }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: "#9A9AAA" }}>{post.time}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {post.reactions.map((r, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 3, background: "#f0f2f5", borderRadius: 20, padding: "2px 7px", fontSize: 12 }}>{r.emoji} <span style={{ fontSize: 10.5, color: "#4A4A5A" }}>{r.count}</span></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POST DETAIL */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{selected.title}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#9A9AAA" }}>{selected.views} Aufrufe</span>
              <span style={{ fontSize: 11, color: "#9A9AAA" }}>·</span>
              <span style={{ fontSize: 11, color: "#9A9AAA" }}>{selected.replies} Antworten</span>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px" }}>
            {/* POST CARD */}
            <div style={{ background: "white", borderRadius: 14, border: "0.5px solid #dce0e6", padding: "24px 28px", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white", flexShrink: 0 }}>TM</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{selected.author}</div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>{selected.time}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#4A4A5A", lineHeight: 1.75, marginBottom: 20 }}>
                Dies ist eine Frage zu einem wichtigen Thema im Schweizer Versicherungsrecht. Die Abgrenzung zwischen verschiedenen Versicherungsgesetzen ist oft komplex und erfordert genaues Verständnis der jeweiligen Geltungsbereiche.
              </div>
              <div style={{ display: "flex", gap: 8, paddingTop: 16, borderTop: "0.5px solid #dce0e6", flexWrap: "wrap" }}>
                {selected.reactions.map((r, i) => (
                  <button key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, border: "0.5px solid #dce0e6", background: "transparent", cursor: "pointer", fontSize: 13, fontFamily: "sans-serif" }}>{r.emoji} <span style={{ fontSize: 11.5, fontWeight: 500, color: "#4A4A5A" }}>{r.count}</span></button>
                ))}
                <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, border: "0.5px dashed #dce0e6", background: "transparent", cursor: "pointer", fontSize: 12, color: "#9A9AAA", fontFamily: "sans-serif" }}>+ Reagieren</button>
              </div>
            </div>

            {/* BEST ANSWER */}
            <div style={{ background: "white", borderRadius: 12, border: "1.5px solid rgba(15,164,160,0.4)", padding: "18px 22px", marginBottom: 10, position: "relative" }}>
              <div style={{ position: "absolute", top: 14, right: 16, background: "#0FA4A0", color: "white", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>✓ Beste Antwort</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #0a7a77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>AS</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#022350" }}>Anna Schneider <span style={{ background: "rgba(200,162,77,0.12)", color: "#a07828", fontSize: 9, padding: "1px 6px", borderRadius: 10, fontWeight: 600, marginLeft: 4 }}>Instruktorin</span></div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>vor 1 Std.</div>
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: "#4A4A5A", lineHeight: 1.65, marginBottom: 12 }}>Gute Frage! Hier die wichtigsten Punkte zur Abgrenzung: Das Schweizer Versicherungsrecht unterscheidet klar zwischen verschiedenen Bereichen. Die entscheidenden Faktoren sind der Anwendungsbereich und die spezifischen Voraussetzungen jedes Gesetzes.</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 8px", borderRadius: 16, border: "0.5px solid rgba(15,164,160,0.3)", background: "rgba(15,164,160,0.1)", cursor: "pointer", fontSize: 12.5, fontFamily: "sans-serif" }}>👍 <span style={{ fontSize: 11, color: "#0FA4A0", fontWeight: 500 }}>18</span></button>
                <button style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 8px", borderRadius: 16, border: "0.5px solid #dce0e6", background: "transparent", cursor: "pointer", fontSize: 12.5, fontFamily: "sans-serif" }}>🙏 <span style={{ fontSize: 11, color: "#4A4A5A" }}>7</span></button>
              </div>
            </div>

            {/* REPLY BOX */}
            <div style={{ background: "white", borderRadius: 12, border: "0.5px solid #dce0e6", padding: "16px 20px", marginTop: 16 }}>
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Schreib eine Antwort..." style={{ width: "100%", border: "none", outline: "none", fontFamily: "sans-serif", fontSize: 13.5, color: "#1A1A2E", resize: "none", minHeight: 72, lineHeight: 1.6, boxSizing: "border-box" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "0.5px solid #dce0e6" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {["👍","❤️","😂","🔥","💡","🙏"].map(e => (
                    <span key={e} onClick={() => setReplyText(t => t + e)} style={{ fontSize: 18, cursor: "pointer", padding: "2px 4px", borderRadius: 6 }}>{e}</span>
                  ))}
                </div>
                <button style={{ padding: "8px 18px", background: "#022350", color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "sans-serif" }}>Antworten</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}