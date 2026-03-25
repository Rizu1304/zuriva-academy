"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

interface Reply { id: number; author: string; avatar: string; content: string; time: string; isBest: boolean; role?: string; }
interface Post { id: number; title: string; category: string; author: string; avatar: string; time: string; content: string; replies: Reply[]; views: number; solved: boolean; reactions: { emoji: string; count: number }[]; }

const catColors: Record<string, string> = { "Nicht-Leben": "#022350", "Leben": "#0FA4A0", "Compliance": "#C0392B", "Allgemein": "#C8A24D" };
const categoryList = ["Nicht-Leben", "Leben", "Compliance", "Allgemein"];

const initialPosts: Post[] = [
  { id: 1, title: "UVG vs. KVG in der Haftpflicht — was gilt wann?", category: "Nicht-Leben", author: "Thomas Mueller", avatar: "TM", time: "vor 2 Std.", content: "Kann jemand die Abgrenzung zwischen UVG und KVG bei der Haftpflicht erklaeren? Ich habe einen konkreten Kundenfall, bei dem ich unsicher bin, welches Gesetz greift.", views: 148, solved: true, reactions: [{ emoji: "👍", count: 12 }, { emoji: "🔥", count: 4 }], replies: [
    { id: 1, author: "Anna Schneider", avatar: "AS", content: "Das UVG deckt Berufsunfaelle und Berufskrankheiten ab. Das KVG regelt die Grundversicherung fuer Krankheit. Bei der Haftpflicht ist entscheidend, ob der Schadenfall beruflich oder privat verursacht wurde.", time: "vor 1 Std.", isBest: true, role: "Instruktorin" },
    { id: 2, author: "Beat Keller", avatar: "BK", content: "Danke Anna, sehr hilfreich! Gilt das auch bei Freizeitunfaellen von Arbeitnehmern?", time: "vor 45 Min.", isBest: false },
  ]},
  { id: 2, title: "Rueckkaufswert gemischte Lebensversicherung — Berechnung?", category: "Leben", author: "Beat Keller", avatar: "BK", time: "vor 5 Std.", content: "Wie berechnet sich der Rueckkaufswert einer gemischten Lebensversicherung nach 10 Jahren Laufzeit? Gibt es eine Faustformel?", views: 67, solved: false, reactions: [{ emoji: "🤔", count: 3 }, { emoji: "👍", count: 5 }], replies: [
    { id: 3, author: "Laura Meier", avatar: "LM", content: "Der Rueckkaufswert haengt von der Praemienstruktur, der Vertragslaufzeit und dem Deckungskapital ab. Nach 10 Jahren liegt er typischerweise bei 70-85% der eingezahlten Praemien.", time: "vor 3 Std.", isBest: false },
  ]},
  { id: 3, title: "FIDLEG — muss jede Kundenberatung protokolliert werden?", category: "Compliance", author: "Anna Schneider", avatar: "AS", time: "vor 1 Tag", content: "Frage an die Compliance-Experten: Muss wirklich jede einzelne Kundenberatung gemaess FIDLEG dokumentiert werden, oder gibt es Ausnahmen?", views: 203, solved: true, reactions: [{ emoji: "👍", count: 14 }, { emoji: "💯", count: 6 }], replies: [
    { id: 4, author: "Thomas Mueller", avatar: "TM", content: "Ja, grundsaetzlich muss jede Beratung protokolliert werden. Ausnahmen gibt es nur bei reinen Ausfuehrungsgeschaeften (Execution Only), wo der Kunde ausdruecklich auf die Beratung verzichtet.", time: "vor 20 Std.", isBest: true },
  ]},
  { id: 4, title: "Literatur-Empfehlungen fuer VBV-Pruefungsvorbereitung", category: "Allgemein", author: "Laura Meier", avatar: "LM", time: "vor 2 Tagen", content: "Hat jemand gute Buchempfehlungen oder Online-Ressourcen fuer die VBV-Pruefungsvorbereitung 2026?", views: 89, solved: false, reactions: [{ emoji: "📚", count: 11 }, { emoji: "🙏", count: 8 }], replies: [] },
];

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selected, setSelected] = useState<Post>(posts[0]);
  const [replyText, setReplyText] = useState("");
  const [showNewPost, setShowNewPost] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Allgemein");

  const submitReply = () => {
    if (!replyText.trim()) return;
    const newReply: Reply = { id: Date.now(), author: "Laura Meier", avatar: "LM", content: replyText, time: "gerade eben", isBest: false };
    const updatedPosts = posts.map(p => p.id === selected.id ? { ...p, replies: [...p.replies, newReply] } : p);
    setPosts(updatedPosts);
    const updatedSelected = updatedPosts.find(p => p.id === selected.id)!;
    setSelected(updatedSelected);
    setReplyText("");
  };

  const submitNewPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;
    const newPost: Post = { id: Date.now(), title: newTitle, category: newCategory, author: "Laura Meier", avatar: "LM", time: "gerade eben", content: newContent, views: 1, solved: false, reactions: [], replies: [] };
    setPosts([newPost, ...posts]);
    setSelected(newPost);
    setShowNewPost(false);
    setNewTitle("");
    setNewContent("");
  };

  const toggleSolved = () => {
    const updatedPosts = posts.map(p => p.id === selected.id ? { ...p, solved: !p.solved } : p);
    setPosts(updatedPosts);
    setSelected(updatedPosts.find(p => p.id === selected.id)!);
  };

  return (
    <DashboardLayout title="Forum" subtitle="Diskutiere mit deinem Team">
      <div style={{ display: "grid", gridTemplateColumns: "370px 1fr", gap: 18, height: "calc(100vh - 180px)" }}>

        {/* Post List */}
        <div className="z-card-static" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 18px", borderBottom: "1px solid #F0ECE6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 500, color: "#022350" }}>Beitraege</div>
            <button onClick={() => setShowNewPost(true)} className="z-btn z-btn-teal" style={{ padding: "6px 14px", fontSize: 12 }}>+ Neu</button>
          </div>
          <div className="z-scroll" style={{ flex: 1, overflowY: "auto" }}>
            {posts.map((post) => {
              const isSelected = selected.id === post.id;
              const color = catColors[post.category] || "#022350";
              return (
                <div key={post.id} onClick={() => setSelected(post)} style={{ padding: "14px 18px", borderBottom: "1px solid #F0ECE6", cursor: "pointer", background: isSelected ? "rgba(2,35,80,0.02)" : "transparent", borderLeft: isSelected ? "3px solid #C8A24D" : "3px solid transparent", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, color: isSelected ? "#022350" : "#4A4A5A", lineHeight: 1.4, flex: 1 }}>{post.title}</div>
                    {post.solved && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0" }}>Geloest</span>}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span className="z-badge" style={{ background: `${color}0D`, color }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: "#9A9AAA" }}>{post.time}</span>
                    <span style={{ fontSize: 11, color: "#9A9AAA" }}>{post.replies.length} Antworten</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Post Detail */}
        <div className="z-scroll" style={{ display: "flex", flexDirection: "column", gap: 14, overflowY: "auto" }}>

          {/* New Post Modal */}
          {showNewPost && (
            <div className="z-card-static animate-scale-in" style={{ padding: "26px 28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "#022350" }}>Neuer Beitrag</div>
                <button onClick={() => setShowNewPost(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9A9AAA" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
              <div style={{ marginBottom: 12 }}>
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Titel deines Beitrags..." style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {categoryList.map(cat => (
                  <button key={cat} onClick={() => setNewCategory(cat)} style={{ padding: "5px 14px", borderRadius: 20, border: "1px solid", borderColor: newCategory === cat ? catColors[cat] : "#ECE8E1", background: newCategory === cat ? `${catColors[cat]}0D` : "white", color: newCategory === cat ? catColors[cat] : "#9A9AAA", fontSize: 11.5, fontWeight: newCategory === cat ? 600 : 400, cursor: "pointer", fontFamily: "inherit" }}>{cat}</button>
                ))}
              </div>
              <textarea value={newContent} onChange={e => setNewContent(e.target.value)} placeholder="Beschreibe deine Frage oder dein Thema..." rows={4} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 }} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <button onClick={submitNewPost} className="z-btn z-btn-primary" style={{ opacity: !newTitle.trim() || !newContent.trim() ? 0.4 : 1 }}>Beitrag erstellen</button>
              </div>
            </div>
          )}

          {/* Selected Post */}
          <div className="z-card-static" style={{ padding: "24px 26px" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#022350", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", flexShrink: 0 }}>{selected.avatar}</div>
              <div style={{ flex: 1 }}>
                <div className="font-heading" style={{ fontSize: 20, fontWeight: 500, color: "#022350", marginBottom: 4 }}>{selected.title}</div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: "#4A4A5A" }}>{selected.author}</span>
                  <span style={{ fontSize: 12, color: "#9A9AAA" }}>{selected.time}</span>
                  <span style={{ fontSize: 12, color: "#9A9AAA" }}>{selected.views} Aufrufe</span>
                  <button onClick={toggleSolved} className="z-badge" style={{ cursor: "pointer", border: "none", background: selected.solved ? "rgba(15,164,160,0.08)" : "rgba(200,162,77,0.08)", color: selected.solved ? "#0FA4A0" : "#C8A24D" }}>
                    {selected.solved ? "Geloest" : "Als geloest markieren"}
                  </button>
                </div>
              </div>
            </div>
            <div style={{ fontSize: 14.5, color: "#4A4A5A", lineHeight: 1.8, marginBottom: 18 }}>{selected.content}</div>
            {selected.reactions.length > 0 && (
              <div style={{ display: "flex", gap: 6, paddingTop: 14, borderTop: "1px solid #F0ECE6" }}>
                {selected.reactions.map((r, ri) => (
                  <span key={ri} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 20, border: "1px solid #E8E4DE", background: "white", fontSize: 13 }}>{r.emoji} <span style={{ fontSize: 11.5, fontWeight: 500, color: "#4A4A5A" }}>{r.count}</span></span>
                ))}
              </div>
            )}
          </div>

          {/* Replies */}
          {selected.replies.length > 0 && (
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#9A9AAA", marginTop: 4 }}>{selected.replies.length} {selected.replies.length === 1 ? "Antwort" : "Antworten"}</div>
          )}

          {selected.replies.map((reply) => (
            <div key={reply.id} style={{ borderRadius: 14, border: reply.isBest ? "1px solid rgba(15,164,160,0.25)" : "1px solid #E8E4DE", background: reply.isBest ? "rgba(15,164,160,0.02)" : "white", padding: "18px 22px", position: "relative" }}>
              {reply.isBest && <div style={{ position: "absolute", top: 14, right: 16 }}><span className="z-badge" style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0" }}>Beste Antwort</span></div>}
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: reply.isBest ? "#0FA4A0" : "#F0ECE6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: reply.isBest ? "white" : "#4A4A5A" }}>{reply.avatar}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>
                    {reply.author}
                    {reply.role && <span className="z-badge" style={{ background: "rgba(200,162,77,0.1)", color: "#C8A24D", marginLeft: 6 }}>{reply.role}</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>{reply.time}</div>
                </div>
              </div>
              <div style={{ fontSize: 13.5, color: "#4A4A5A", lineHeight: 1.7 }}>{reply.content}</div>
            </div>
          ))}

          {/* Reply Box */}
          <div className="z-card-static" style={{ padding: "16px 20px" }}>
            <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Schreib eine Antwort..." style={{ width: "100%", border: "none", outline: "none", fontFamily: "inherit", fontSize: 13.5, color: "#1A1A2E", resize: "none", minHeight: 72, lineHeight: 1.6, boxSizing: "border-box", background: "transparent" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1px solid #F0ECE6" }}>
              <div style={{ display: "flex", gap: 4 }}>
                {["👍", "❤️", "😂", "🔥", "💡", "🙏"].map((e) => (
                  <span key={e} onClick={() => setReplyText((t) => t + e)} style={{ fontSize: 18, cursor: "pointer", padding: "2px 4px" }}>{e}</span>
                ))}
              </div>
              <button onClick={submitReply} className="z-btn z-btn-primary" style={{ opacity: !replyText.trim() ? 0.4 : 1 }}>Antworten</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
