"use client";
import { useState } from "react";

const F = "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif";
const navy = "#022350";
const teal = "#0FA4A0";
const gold = "#C8A24D";
const bg = "#f5f5f7";
const cardShadow = "0 1px 2px rgba(0,0,0,0.03), 0 4px 20px rgba(0,0,0,0.04)";
const glass = { background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px) saturate(180%)", WebkitBackdropFilter: "blur(24px) saturate(180%)" };

const posts = [
  { id: 1, title: "UVG vs. KVG in der Haftpflicht -- was gilt wann?", category: "Nicht-Leben", author: "Thomas Mueller", initials: "TM", time: "vor 2 Std.", replies: 12, views: 148, solved: true, reactions: [{ emoji: "\u{1F44D}", count: 12 }, { emoji: "\u{1F525}", count: 4 }, { emoji: "\u{1F4A1}", count: 7 }] },
  { id: 2, title: "Rueckkaufswert gemischte Lebensversicherung -- Berechnung?", category: "Leben", author: "Beat Keller", initials: "BK", time: "vor 5 Std.", replies: 4, views: 67, solved: false, reactions: [{ emoji: "\u{1F914}", count: 3 }, { emoji: "\u{1F44D}", count: 5 }] },
  { id: 3, title: "FIDLEG -- muss jede Kundenberatung protokolliert werden?", category: "Compliance", author: "Anna Schneider", initials: "AS", time: "vor 1 Tag", replies: 7, views: 203, solved: true, reactions: [{ emoji: "\u{1F605}", count: 9 }, { emoji: "\u{1F44D}", count: 14 }, { emoji: "\u{1F4AF}", count: 6 }] },
  { id: 4, title: "Literatur-Empfehlungen fuer VBV-Pruefungsvorbereitung 2026", category: "Allgemein", author: "Laura Meier", initials: "LM", time: "vor 2 Tagen", replies: 2, views: 89, solved: false, reactions: [{ emoji: "\u{1F4DA}", count: 11 }, { emoji: "\u{1F64F}", count: 8 }] },
  { id: 5, title: "Unterschied Einzel- vs. Kollektivlebensversicherung", category: "Leben", author: "Petra Koch", initials: "PK", time: "vor 3 Tagen", replies: 5, views: 112, solved: true, reactions: [{ emoji: "\u{1F44D}", count: 8 }, { emoji: "\u{1F4A1}", count: 3 }] },
];

const catColors: Record<string, { bg: string; color: string }> = {
  "Nicht-Leben": { bg: "rgba(2,35,80,0.05)", color: "#022350" },
  "Leben": { bg: "rgba(15,164,160,0.06)", color: "#0FA4A0" },
  "Compliance": { bg: "rgba(231,76,60,0.06)", color: "#c0392b" },
  "Allgemein": { bg: "rgba(200,162,77,0.07)", color: "#a07828" },
};

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "\u25A3" },
  { name: "Kurse", href: "/courses", icon: "\u25B6" },
  { name: "Lernpfade", href: "/lernpfade", icon: "\u2261" },
  { name: "Pruefungen", href: "/pruefungen", icon: "\u2713" },
  { name: "Zertifikate", href: "/zertifikate", icon: "\u2606" },
  { name: "Forum", href: "/forum", active: true, icon: "\u25CB" },
  { name: "Analytics", href: "#", icon: "\u2229" },
];

const fadeKeyframes = `@keyframes zuriva-fade-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`;

export default function Forum() {
  const [selected, setSelected] = useState(posts[0]);
  const [replyText, setReplyText] = useState("");
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <style>{fadeKeyframes}</style>
      <div style={{ display: "flex", height: "100vh", fontFamily: F, background: bg, overflow: "hidden" }}>

        {/* SIDEBAR */}
        <aside style={{
          width: 260, minWidth: 260, display: "flex", flexDirection: "column",
          ...glass,
          borderRight: "1px solid rgba(0,0,0,0.04)",
        }}>
          {/* Logo */}
          <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 7 }}>
            <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "0.14em", color: navy }}>ZURIVA</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: gold, letterSpacing: "0.02em" }}>academy</span>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: 2, padding: "0 12px" }}>
            {navItems.map((item) => (
              <a key={item.name} href={item.href} style={{
                padding: "10px 14px",
                color: item.active ? navy : "#6e6e80",
                background: item.active ? "rgba(15,164,160,0.08)" : "transparent",
                borderRadius: 12,
                fontWeight: item.active ? 600 : 400,
                fontSize: 13.5,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "background 0.2s ease",
                letterSpacing: "-0.01em",
              }}>
                {item.active && (
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", background: teal,
                    flexShrink: 0,
                  }} />
                )}
                {!item.active && <span style={{ width: 6, height: 6, flexShrink: 0 }} />}
                {item.name}
              </a>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* User */}
          <div style={{ padding: "16px 16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 14,
              background: "linear-gradient(135deg, #0FA4A0, #0a8a87)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11.5, fontWeight: 600, color: "white",
            }}>LM</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: navy, letterSpacing: "-0.01em" }}>Laura Meier</div>
              <div style={{ fontSize: 11, color: "#8e8ea0" }}>Vermittlerin</div>
            </div>
          </div>
        </aside>

        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* POST LIST PANEL */}
          <div style={{
            width: 400, minWidth: 400,
            display: "flex", flexDirection: "column",
            background: "#fff",
            overflow: "hidden",
          }}>
            {/* Header */}
            <div style={{ padding: "20px 24px 16px", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: navy, letterSpacing: "-0.02em" }}>Forum</div>
                <button style={{
                  padding: "8px 18px",
                  background: "linear-gradient(135deg, #0FA4A0, #0a8a87)",
                  color: "white", border: "none", borderRadius: 12,
                  fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F,
                  boxShadow: "0 2px 8px rgba(15,164,160,0.25)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}>+ Neu</button>
              </div>
              <input
                placeholder="Beitraege suchen..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%", padding: "10px 16px",
                  border: "none", borderRadius: 14,
                  fontSize: 13.5, outline: "none",
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 12px rgba(0,0,0,0.03)",
                  boxSizing: "border-box", fontFamily: F,
                  color: navy,
                }}
              />
            </div>

            {/* Posts */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {filteredPosts.map(post => {
                const isSelected = selected.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelected(post)}
                    style={{
                      padding: "16px 24px",
                      cursor: "pointer",
                      background: isSelected ? "rgba(15,164,160,0.03)" : "transparent",
                      borderLeft: isSelected ? `3px solid ${teal}` : "3px solid transparent",
                      borderBottom: "1px solid #f3f4f6",
                      transition: "background 0.15s ease",
                      animation: "zuriva-fade-in 0.5s ease",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 8 }}>
                      <div style={{
                        fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em",
                        color: isSelected ? teal : navy,
                        lineHeight: 1.4, flex: 1,
                      }}>{post.title}</div>
                      {post.solved && (
                        <span style={{
                          background: "rgba(15,164,160,0.08)", color: teal,
                          fontSize: 10, fontWeight: 700, padding: "3px 8px",
                          borderRadius: 20, whiteSpace: "nowrap", height: "fit-content",
                          letterSpacing: "0.02em",
                        }}>{"\u2713"}</span>
                      )}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                      <span style={{
                        fontSize: 10.5, fontWeight: 600, padding: "3px 8px",
                        borderRadius: 8,
                        background: catColors[post.category]?.bg,
                        color: catColors[post.category]?.color,
                        letterSpacing: "0.01em",
                      }}>{post.category}</span>
                      <span style={{ fontSize: 11, color: "#8e8ea0" }}>{post.time}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {post.reactions.map((r, i) => (
                        <span key={i} style={{
                          display: "flex", alignItems: "center", gap: 4,
                          background: "rgba(0,0,0,0.03)", borderRadius: 20,
                          padding: "3px 9px", fontSize: 12.5,
                        }}>
                          {r.emoji} <span style={{ fontSize: 10.5, color: "#6e6e80", fontWeight: 500 }}>{r.count}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* POST DETAIL PANEL */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: bg }}>
            {/* Detail Header */}
            <div style={{
              ...glass,
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              height: 64, padding: "0 36px",
              display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0,
            }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: navy, letterSpacing: "-0.01em", flex: 1, marginRight: 16 }}>{selected.title}</div>
              <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
                <span style={{ fontSize: 12, color: "#8e8ea0", fontWeight: 500 }}>{selected.views} Aufrufe</span>
                <span style={{ fontSize: 12, color: "#d1d1d6" }}>{"\u00B7"}</span>
                <span style={{ fontSize: 12, color: "#8e8ea0", fontWeight: 500 }}>{selected.replies} Antworten</span>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px" }}>
              {/* Post Card */}
              <div style={{
                background: "#fff", borderRadius: 20,
                boxShadow: cardShadow,
                padding: "28px 32px", marginBottom: 20,
                animation: "zuriva-fade-in 0.5s ease",
              }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 14,
                    background: `linear-gradient(135deg, ${navy}, #0a3a6e)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 600, color: "white", flexShrink: 0,
                  }}>{selected.initials}</div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600, color: navy, letterSpacing: "-0.01em" }}>{selected.author}</div>
                    <div style={{ fontSize: 12, color: "#8e8ea0", marginTop: 1 }}>{selected.time}</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 14.5, color: "#3c3c43", lineHeight: 1.75, marginBottom: 22,
                  letterSpacing: "-0.01em",
                }}>
                  Dies ist eine Frage zu einem wichtigen Thema im Schweizer Versicherungsrecht. Die Abgrenzung zwischen verschiedenen Versicherungsgesetzen ist oft komplex und erfordert genaues Verstaendnis der jeweiligen Geltungsbereiche.
                </div>
                <div style={{ display: "flex", gap: 8, paddingTop: 18, borderTop: "1px solid #f3f4f6", flexWrap: "wrap" }}>
                  {selected.reactions.map((r, i) => (
                    <button key={i} style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "6px 12px", borderRadius: 20,
                      border: "none",
                      background: "rgba(0,0,0,0.03)",
                      cursor: "pointer", fontSize: 14, fontFamily: F,
                      transition: "background 0.15s ease",
                    }}>
                      {r.emoji} <span style={{ fontSize: 12, fontWeight: 600, color: "#6e6e80" }}>{r.count}</span>
                    </button>
                  ))}
                  <button style={{
                    display: "flex", alignItems: "center", gap: 4,
                    padding: "6px 12px", borderRadius: 20,
                    border: "1px dashed rgba(0,0,0,0.08)",
                    background: "transparent", cursor: "pointer",
                    fontSize: 12, color: "#8e8ea0", fontFamily: F,
                  }}>+ Reagieren</button>
                </div>
              </div>

              {/* Best Answer Card */}
              <div style={{
                background: "#fff", borderRadius: 20,
                boxShadow: `0 0 0 1.5px rgba(15,164,160,0.2), ${cardShadow}`,
                padding: "24px 28px", marginBottom: 16, position: "relative",
                animation: "zuriva-fade-in 0.5s ease",
              }}>
                <div style={{
                  position: "absolute", top: 18, right: 20,
                  background: "linear-gradient(135deg, #0FA4A0, #0a8a87)",
                  color: "white", fontSize: 11, fontWeight: 700,
                  padding: "4px 12px", borderRadius: 20,
                  display: "flex", alignItems: "center", gap: 4,
                  boxShadow: "0 2px 8px rgba(15,164,160,0.2)",
                }}>{"\u2713"} Beste Antwort</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 14,
                    background: "linear-gradient(135deg, #0FA4A0, #0a7a77)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 600, color: "white",
                  }}>AS</div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: navy }}>
                      Anna Schneider{" "}
                      <span style={{
                        background: "rgba(200,162,77,0.1)", color: "#a07828",
                        fontSize: 10, padding: "2px 8px", borderRadius: 10,
                        fontWeight: 600, marginLeft: 6,
                      }}>Instruktorin</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: "#8e8ea0", marginTop: 1 }}>vor 1 Std.</div>
                  </div>
                </div>
                <div style={{
                  fontSize: 14, color: "#3c3c43", lineHeight: 1.7, marginBottom: 16,
                  letterSpacing: "-0.01em",
                }}>
                  Gute Frage! Hier die wichtigsten Punkte zur Abgrenzung: Das Schweizer Versicherungsrecht unterscheidet klar zwischen verschiedenen Bereichen. Die entscheidenden Faktoren sind der Anwendungsbereich und die spezifischen Voraussetzungen jedes Gesetzes.
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "6px 12px", borderRadius: 20,
                    border: "none",
                    background: "rgba(15,164,160,0.08)",
                    cursor: "pointer", fontSize: 13.5, fontFamily: F,
                  }}>{"\u{1F44D}"} <span style={{ fontSize: 12, color: teal, fontWeight: 600 }}>18</span></button>
                  <button style={{
                    display: "flex", alignItems: "center", gap: 5,
                    padding: "6px 12px", borderRadius: 20,
                    border: "none",
                    background: "rgba(0,0,0,0.03)",
                    cursor: "pointer", fontSize: 13.5, fontFamily: F,
                  }}>{"\u{1F64F}"} <span style={{ fontSize: 12, color: "#6e6e80", fontWeight: 500 }}>7</span></button>
                </div>
              </div>

              {/* Reply Box */}
              <div style={{
                background: "#fff", borderRadius: 16,
                boxShadow: cardShadow,
                padding: "22px 26px", marginTop: 20,
                animation: "zuriva-fade-in 0.5s ease",
              }}>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Schreib eine Antwort..."
                  style={{
                    width: "100%", border: "none", outline: "none",
                    fontFamily: F, fontSize: 14, color: navy,
                    resize: "none", minHeight: 80, lineHeight: 1.65,
                    boxSizing: "border-box", background: "transparent",
                    letterSpacing: "-0.01em",
                  }}
                />
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginTop: 12, paddingTop: 14, borderTop: "1px solid #f3f4f6",
                }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["\u{1F44D}", "\u2764\uFE0F", "\u{1F602}", "\u{1F525}", "\u{1F4A1}", "\u{1F64F}"].map(e => (
                      <span
                        key={e}
                        onClick={() => setReplyText(t => t + e)}
                        style={{
                          fontSize: 20, cursor: "pointer",
                          padding: "4px 6px", borderRadius: 8,
                          transition: "background 0.15s ease",
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                        }}
                      >{e}</span>
                    ))}
                  </div>
                  <button style={{
                    padding: "10px 22px",
                    background: navy, color: "white",
                    border: "none", borderRadius: 12,
                    fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: F,
                    letterSpacing: "-0.01em",
                    transition: "transform 0.15s ease",
                  }}>Antworten</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
