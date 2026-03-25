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

const catColors: Record<string, string> = { "Nicht-Leben": "#022350", "Leben": "#0FA4A0", "Compliance": "#C0392B", "Allgemein": "#C8A24D" };

export default function Forum() {
  const [selected, setSelected] = useState(posts[0]);
  const [replyText, setReplyText] = useState("");

  return (
    <DashboardLayout title="Forum" subtitle="Diskutiere mit deinem Team">
      <div style={{ display: "grid", gridTemplateColumns: "370px 1fr", gap: 18, height: "calc(100vh - 180px)" }}>
        {/* Post List */}
        <div className="z-card-static" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 18px", borderBottom: "1px solid #F0ECE6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 500, color: "#022350" }}>Beitraege</div>
            <button className="z-btn z-btn-teal" style={{ padding: "6px 14px", fontSize: 12 }}>+ Neu</button>
          </div>
          <div className="z-scroll" style={{ flex: 1, overflowY: "auto" }}>
            {posts.map((post) => {
              const isSelected = selected.id === post.id;
              const color = catColors[post.category] || "#022350";
              return (
                <div key={post.id} onClick={() => setSelected(post)} style={{ padding: "14px 18px", borderBottom: "1px solid #F0ECE6", cursor: "pointer", background: isSelected ? "rgba(2,35,80,0.02)" : "transparent", borderLeft: isSelected ? "3px solid #C8A24D" : "3px solid transparent", transition: "all 0.15s ease" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: isSelected ? "#022350" : "#4A4A5A", lineHeight: 1.4, flex: 1 }}>{post.title}</div>
                    {post.solved && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0" }}>Geloest</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
                    <span className="z-badge" style={{ background: `${color}0D`, color }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: "#9A9AAA" }}>{post.time}</span>
                  </div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {post.reactions.map((r, ri) => (
                      <span key={ri} style={{ display: "flex", alignItems: "center", gap: 3, background: "#FAF8F5", borderRadius: 20, padding: "2px 7px", fontSize: 12, border: "1px solid #F0ECE6" }}>{r.emoji} <span style={{ fontSize: 10.5, color: "#4A4A5A" }}>{r.count}</span></span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post Detail */}
        <div className="z-scroll" style={{ display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>
          <div className="z-card-static" style={{ padding: "24px 26px" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", flexShrink: 0 }}>{selected.avatar}</div>
              <div>
                <div className="font-heading" style={{ fontSize: 20, fontWeight: 500, color: "#022350", marginBottom: 4 }}>{selected.title}</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "#4A4A5A" }}>{selected.author}</span>
                  <span style={{ fontSize: 12, color: "#9A9AAA" }}>{selected.time}</span>
                  <span style={{ fontSize: 11.5, color: "#9A9AAA" }}>{selected.views} Aufrufe · {selected.replies} Antworten</span>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14, color: "#4A4A5A", lineHeight: 1.8, marginBottom: 18 }}>Dies ist eine Frage zu einem wichtigen Thema im Schweizer Versicherungsrecht. Die Abgrenzung zwischen verschiedenen Versicherungsgesetzen ist oft komplex und erfordert genaues Verstaendnis der jeweiligen Geltungsbereiche.</div>
            <div style={{ display: "flex", gap: 6, paddingTop: 14, borderTop: "1px solid #F0ECE6" }}>
              {selected.reactions.map((r, ri) => (
                <button key={ri} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, border: "1px solid #E8E4DE", background: "white", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>{r.emoji} <span style={{ fontSize: 11.5, fontWeight: 500, color: "#4A4A5A" }}>{r.count}</span></button>
              ))}
              <button style={{ padding: "5px 10px", borderRadius: 20, border: "1px dashed #E8E4DE", background: "transparent", cursor: "pointer", fontSize: 12, color: "#9A9AAA", fontFamily: "inherit" }}>+ Reagieren</button>
            </div>
          </div>

          {selected.solved && (
            <div style={{ borderRadius: 14, border: "1px solid rgba(15,164,160,0.25)", background: "rgba(15,164,160,0.03)", padding: "18px 22px", position: "relative" }}>
              <div style={{ position: "absolute", top: 14, right: 16 }}><span className="z-badge" style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0" }}>Beste Antwort</span></div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>AS</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>Anna Schneider <span className="z-badge" style={{ background: "rgba(200,162,77,0.1)", color: "#C8A24D", marginLeft: 4 }}>Instruktorin</span></div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>vor 1 Std.</div>
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: "#4A4A5A", lineHeight: 1.7 }}>Gute Frage! Hier die wichtigsten Punkte zur Abgrenzung: Das Schweizer Versicherungsrecht unterscheidet klar zwischen verschiedenen Bereichen. Die entscheidenden Faktoren sind der Anwendungsbereich und die spezifischen Voraussetzungen jedes Gesetzes.</div>
            </div>
          )}

          <div className="z-card-static" style={{ padding: "16px 20px" }}>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Schreib eine Antwort..." style={{ width: "100%", border: "none", outline: "none", fontFamily: "inherit", fontSize: 13.5, color: "#1A1A2E", resize: "none", minHeight: 72, lineHeight: 1.6, boxSizing: "border-box", background: "transparent" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0ECE6" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {["👍", "❤️", "😂", "🔥", "💡", "🙏"].map((e) => (
                  <span key={e} onClick={() => setReplyText((t) => t + e)} style={{ fontSize: 18, cursor: "pointer", padding: "2px 4px" }}>{e}</span>
                ))}
              </div>
              <button className="z-btn z-btn-primary">Antworten</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
