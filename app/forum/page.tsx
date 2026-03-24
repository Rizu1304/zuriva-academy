"use client";
import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

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
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8 }}>academy</span>
        </div>
        <div style={{ padding: "0 12px" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade" },
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate" },
            { name: "Forum", href: "/forum", active: true },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: 12, boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block", transition: "all 0.2s ease" }}>{item.name}</a>
          ))}
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: "#4A4A5A", background: "transparent", borderRadius: 12, fontSize: 13, textDecoration: "none", display: "block", transition: "all 0.2s ease" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* POST LIST */}
        <div style={{ width: 380, minWidth: 380, borderRight: "1px solid rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", overflow: "hidden" }}>
          <div style={{ padding: "20px 20px 16px", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>Forum</div>
              <button style={{ padding: "6px 14px", background: "linear-gradient(135deg, #0FA4A0, #0d8e8a)", color: "white", border: "none", borderRadius: 12, fontSize: 12, fontWeight: 500, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>+ Neu</button>
            </div>
            <input placeholder="Beiträge suchen..." style={{ width: "100%", padding: "8px 14px", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 12, fontSize: 13, outline: "none", background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxSizing: "border-box", fontFamily: b, transition: "all 0.2s ease" }} />
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {posts.map(post => (
              <div key={post.id} onClick={() => setSelected(post)} style={{ padding: "14px 20px", borderBottom: "1px solid rgba(0,0,0,0.04)", cursor: "pointer", background: selected.id === post.id ? "rgba(255,255,255,0.8)" : "transparent", transition: "all 0.2s ease" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350", lineHeight: 1.35, flex: 1 }}>{post.title}</div>
                  {post.solved && <span style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 20, whiteSpace: "nowrap", height: "fit-content" }}>✓</span>}
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 20, background: catColors[post.category]?.bg, color: catColors[post.category]?.color }}>{post.category}</span>
                  <span style={{ fontSize: 11, color: "#9A9AAA" }}>{post.time}</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {post.reactions.map((r, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 3, background: "rgba(255,255,255,0.6)", borderRadius: 20, padding: "2px 7px", fontSize: 12 }}>{r.emoji} <span style={{ fontSize: 10.5, color: "#4A4A5A" }}>{r.count}</span></span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POST DETAIL */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{selected.title}</div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 11, color: "#9A9AAA" }}>{selected.views} Aufrufe</span>
              <span style={{ fontSize: 11, color: "#9A9AAA" }}>·</span>
              <span style={{ fontSize: 11, color: "#9A9AAA" }}>{selected.replies} Antworten</span>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
            <div style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", padding: "24px 28px", marginBottom: 16, transition: "all 0.2s ease" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white", flexShrink: 0 }}>TM</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{selected.author}</div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>{selected.time}</div>
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#4A4A5A", lineHeight: 1.75, marginBottom: 20 }}>
                Dies ist eine Frage zu einem wichtigen Thema im Schweizer Versicherungsrecht. Die Abgrenzung zwischen verschiedenen Versicherungsgesetzen ist oft komplex und erfordert genaues Verständnis der jeweiligen Geltungsbereiche.
              </div>
              <div style={{ display: "flex", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.04)", flexWrap: "wrap" }}>
                {selected.reactions.map((r, i) => (
                  <button key={i} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, border: "1px solid rgba(0,0,0,0.06)", background: "transparent", cursor: "pointer", fontSize: 13, fontFamily: b, transition: "all 0.2s ease" }}>{r.emoji} <span style={{ fontSize: 11.5, fontWeight: 500, color: "#4A4A5A" }}>{r.count}</span></button>
                ))}
                <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, border: "1px dashed rgba(0,0,0,0.06)", background: "transparent", cursor: "pointer", fontSize: 12, color: "#9A9AAA", fontFamily: b, transition: "all 0.2s ease" }}>+ Reagieren</button>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(15,164,160,0.4)", boxShadow: "0 2px 24px rgba(15,164,160,0.06)", padding: "18px 22px", marginBottom: 10, position: "relative", transition: "all 0.2s ease" }}>
              <div style={{ position: "absolute", top: 14, right: 16, background: "linear-gradient(135deg, #0FA4A0, #0d8e8a)", color: "white", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>✓ Beste Antwort</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>AS</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "#022350" }}>Anna Schneider <span style={{ background: "rgba(200,162,77,0.12)", color: "#a07828", fontSize: 9, padding: "1px 6px", borderRadius: 10, fontWeight: 600, marginLeft: 4 }}>Instruktorin</span></div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>vor 1 Std.</div>
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: "#4A4A5A", lineHeight: 1.65, marginBottom: 12 }}>Gute Frage! Hier die wichtigsten Punkte zur Abgrenzung: Das Schweizer Versicherungsrecht unterscheidet klar zwischen verschiedenen Bereichen. Die entscheidenden Faktoren sind der Anwendungsbereich und die spezifischen Voraussetzungen jedes Gesetzes.</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 8px", borderRadius: 20, border: "1px solid rgba(15,164,160,0.3)", background: "rgba(15,164,160,0.1)", cursor: "pointer", fontSize: 12.5, fontFamily: b, transition: "all 0.2s ease" }}>👍 <span style={{ fontSize: 11, color: "#0FA4A0", fontWeight: 500 }}>18</span></button>
                <button style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 8px", borderRadius: 20, border: "1px solid rgba(0,0,0,0.06)", background: "transparent", cursor: "pointer", fontSize: 12.5, fontFamily: b, transition: "all 0.2s ease" }}>🙏 <span style={{ fontSize: 11, color: "#4A4A5A" }}>7</span></button>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", padding: "16px 20px", marginTop: 16, transition: "all 0.2s ease" }}>
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Schreib eine Antwort..." style={{ width: "100%", border: "none", outline: "none", fontFamily: b, fontSize: 13.5, color: "#1A1A2E", resize: "none", minHeight: 72, lineHeight: 1.6, boxSizing: "border-box", background: "transparent" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {["👍","❤️","😂","🔥","💡","🙏"].map(e => (
                    <span key={e} onClick={() => setReplyText(t => t + e)} style={{ fontSize: 18, cursor: "pointer", padding: "2px 4px", borderRadius: 6 }}>{e}</span>
                  ))}
                </div>
                <button style={{ padding: "8px 18px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>Antworten</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
