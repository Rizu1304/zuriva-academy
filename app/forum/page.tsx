"use client";
import { useState } from "react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const glass = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 24px rgba(2,35,80,0.04)",
} as const;

const posts = [
  {
    id: 1,
    title: "UVG vs. KVG in der Haftpflicht — was gilt wann?",
    category: "Nicht-Leben",
    author: "Thomas Müller",
    initials: "TM",
    role: "Berater",
    avatarGradient: "linear-gradient(135deg, #022350, #1B6FC2)",
    time: "vor 2 Std.",
    replies: 12,
    views: 148,
    solved: true,
    pinned: true,
    preview: "Ich bin bei einem Kundenfall auf die Frage gestossen, ob UVG oder KVG greift. Der Kunde hat sowohl eine Unfallversicherung über den Arbeitgeber als auch eine private Krankenversicherung...",
    body: "Liebe Kolleginnen und Kollegen,\n\nich bin bei einem aktuellen Kundenfall auf eine interessante Abgrenzungsfrage gestossen: Wann greift das UVG und wann das KVG in der Haftpflicht?\n\nDer Kunde hat sowohl eine obligatorische Unfallversicherung über den Arbeitgeber (UVG) als auch eine private Krankenzusatzversicherung. Bei einem Unfall auf dem Arbeitsweg ist nun die Frage, welche Versicherung primär leisten muss.\n\nHat jemand Erfahrung mit ähnlichen Fällen? Gibt es eine klare gesetzliche Regelung oder hängt es vom Einzelfall ab?",
    reactions: [{ emoji: "👍", count: 12 }, { emoji: "🔥", count: 4 }, { emoji: "💡", count: 7 }],
  },
  {
    id: 2,
    title: "Rückkaufswert gemischte Lebensversicherung — Berechnung?",
    category: "Leben",
    author: "Beat Keller",
    initials: "BK",
    role: "Senior Berater",
    avatarGradient: "linear-gradient(135deg, #0FA4A0, #14C4BF)",
    time: "vor 5 Std.",
    replies: 4,
    views: 67,
    solved: false,
    pinned: false,
    preview: "Wie berechnet sich der Rückkaufswert bei einer gemischten Lebensversicherung nach 10 Jahren Laufzeit? Die Versicherungsbedingungen sind nicht ganz eindeutig...",
    body: "Hallo zusammen,\n\nein Kunde möchte seine gemischte Lebensversicherung nach 10 von 25 Jahren Laufzeit kündigen. Wie berechnet sich der Rückkaufswert genau?\n\nDie Versicherungsbedingungen sprechen von einem «garantierten Rückkaufswert», aber die Berechnung ist mir nicht ganz klar. Werden die Überschussanteile einbezogen?",
    reactions: [{ emoji: "🤔", count: 3 }, { emoji: "👍", count: 5 }],
  },
  {
    id: 3,
    title: "FIDLEG — muss jede Kundenberatung protokolliert werden?",
    category: "Compliance",
    author: "Anna Schneider",
    initials: "AS",
    role: "Instruktorin",
    avatarGradient: "linear-gradient(135deg, #C8A24D, #E0B95F)",
    time: "vor 1 Tag",
    replies: 7,
    views: 203,
    solved: true,
    pinned: false,
    preview: "Seit Inkrafttreten des FIDLEG ist die Protokollierungspflicht ein grosses Thema. Muss wirklich jedes Beratungsgespräch dokumentiert werden?",
    body: "Seit dem Inkrafttreten des FIDLEG stellt sich in unserem Team immer wieder die Frage: Muss tatsächlich jede Kundenberatung protokolliert werden?\n\nBesonders bei informellen Gesprächen auf Veranstaltungen oder bei Telefonaten ist die Abgrenzung schwierig. Was zählt als «Beratung» im Sinne des FIDLEG?\n\nIch freue mich auf eure Erfahrungen und Interpretationen.",
    reactions: [{ emoji: "😅", count: 9 }, { emoji: "👍", count: 14 }, { emoji: "💯", count: 6 }],
  },
  {
    id: 4,
    title: "Literatur-Empfehlungen für VBV-Prüfungsvorbereitung 2026",
    category: "Allgemein",
    author: "Laura Meier",
    initials: "LM",
    role: "Vermittlerin",
    avatarGradient: "linear-gradient(135deg, #022350, #0E3057)",
    time: "vor 2 Tagen",
    replies: 2,
    views: 89,
    solved: false,
    pinned: false,
    preview: "Welche Bücher und Ressourcen empfehlt ihr zur Vorbereitung auf die VBV-Prüfung 2026? Ich suche besonders nach aktuellen Materialien...",
    body: "Hallo liebe Community,\n\ndie VBV-Prüfung rückt näher und ich möchte mich bestmöglich vorbereiten. Welche Bücher, Online-Ressourcen oder Kurse könnt ihr empfehlen?\n\nBesonders interessieren mich aktuelle Materialien, die die neuesten regulatorischen Änderungen berücksichtigen.",
    reactions: [{ emoji: "📚", count: 11 }, { emoji: "🙏", count: 8 }],
  },
  {
    id: 5,
    title: "Unterschied Einzel- vs. Kollektivlebensversicherung",
    category: "Leben",
    author: "Petra Koch",
    initials: "PK",
    role: "Beraterin",
    avatarGradient: "linear-gradient(135deg, #1B6FC2, #2D8FE5)",
    time: "vor 3 Tagen",
    replies: 5,
    views: 112,
    solved: true,
    pinned: false,
    preview: "Kann jemand die Hauptunterschiede zwischen Einzel- und Kollektivlebensversicherung zusammenfassen? Besonders hinsichtlich der BVG-Relevanz...",
    body: "Liebe Kolleginnen und Kollegen,\n\nkann jemand die wesentlichen Unterschiede zwischen Einzel- und Kollektivlebensversicherung zusammenfassen?\n\nBesonders interessiert mich die Relevanz im Kontext der beruflichen Vorsorge (BVG) und wann welche Variante für den Kunden Sinn macht.",
    reactions: [{ emoji: "👍", count: 8 }, { emoji: "💡", count: 3 }],
  },
];

const catColors: Record<string, { bg: string; color: string; border: string }> = {
  "Nicht-Leben": { bg: "rgba(2,35,80,0.07)", color: "#022350", border: "rgba(2,35,80,0.15)" },
  "Leben": { bg: "rgba(15,164,160,0.08)", color: "#0FA4A0", border: "rgba(15,164,160,0.2)" },
  "Compliance": { bg: "rgba(192,57,43,0.06)", color: "#c0392b", border: "rgba(192,57,43,0.15)" },
  "Allgemein": { bg: "rgba(200,162,77,0.08)", color: "#a07828", border: "rgba(200,162,77,0.2)" },
};

const replies = [
  {
    author: "Anna Schneider",
    initials: "AS",
    role: "Instruktorin",
    gradient: "linear-gradient(135deg, #C8A24D, #E0B95F)",
    time: "vor 1 Std.",
    best: true,
    text: "Sehr gute Frage! Hier die wichtigsten Punkte:\n\n1. Bei Berufsunfällen und Berufskrankheiten ist das UVG immer primär zuständig\n2. Das KVG kommt subsidiär zum Tragen, wenn kein UVG-Fall vorliegt\n3. Bei Arbeitswegunfällen gilt grundsätzlich das UVG (Art. 7 UVG)\n\nDer entscheidende Faktor ist die Kausalität zwischen der beruflichen Tätigkeit und dem Schadensereignis. Im beschriebenen Fall greift klar das UVG.",
    reactions: [{ emoji: "👍", count: 18 }, { emoji: "🙏", count: 7 }],
  },
  {
    author: "Marco Brunner",
    initials: "MB",
    role: "Teamleiter",
    gradient: "linear-gradient(135deg, #022350, #1B6FC2)",
    time: "vor 45 Min.",
    best: false,
    text: "Ergänzend zu Annas Antwort: Vergiss nicht die Koordinationsregeln nach KVV Art. 110. In der Praxis ist die Abgrenzung nicht immer so klar, besonders bei Nichtberufsunfällen von Teilzeitbeschäftigten.",
    reactions: [{ emoji: "👍", count: 5 }, { emoji: "💡", count: 3 }],
  },
  {
    author: "Sara Weber",
    initials: "SW",
    role: "Beraterin",
    gradient: "linear-gradient(135deg, #0FA4A0, #14C4BF)",
    time: "vor 30 Min.",
    best: false,
    text: "Danke für die klare Erklärung! Ich hatte einen ähnlichen Fall letzte Woche. Was mir geholfen hat: Die SUVA hat auf ihrer Website einen sehr guten Entscheidungsbaum zur Abgrenzung.",
    reactions: [{ emoji: "👍", count: 3 }],
  },
];

const categories = ["Alle", "Nicht-Leben", "Leben", "Compliance", "Allgemein"];

export default function Forum() {
  const [selected, setSelected] = useState(posts[0]);
  const [replyText, setReplyText] = useState("");
  const [activeCategory, setActiveCategory] = useState("Alle");

  const filteredPosts = activeCategory === "Alle" ? posts : posts.filter(p => p.category === activeCategory);

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)", overflow: "hidden" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8 }}>academy</span>
        </div>
        <div style={{ padding: "0 12px", flex: 1 }}>
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
            <a key={item.name} href={item.href} style={{
              padding: "10px 14px", margin: "2px 0",
              color: item.active ? "#022350" : "#4A4A5A",
              background: item.active ? "rgba(255,255,255,0.8)" : "transparent",
              borderRadius: 12,
              boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none",
              fontWeight: item.active ? 600 : 400, fontSize: 13.5, textDecoration: "none", display: "block",
            }}>{item.name}</a>
          ))}
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "20px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Lernpfadeditor", href: "/admin/lernpfade" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Kahoot-Editor", href: "/admin/kahoot" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{
              padding: "10px 14px", margin: "2px 0",
              color: "#4A4A5A", background: "transparent", borderRadius: 12,
              fontSize: 13.5, textDecoration: "none", display: "block",
            }}>{item.name}</a>
          ))}
        </div>
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white", position: "relative" }}>
            LM
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, borderRadius: "50%", background: "#0FA4A0", border: "2px solid white" }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1A1A2E" }}>Laura Meier</div>
            <div style={{ fontSize: 10, color: "#9A9AAA" }}>Vermittlerin</div>
          </div>
        </div>
      </aside>

      {/* POST LIST */}
      <div style={{ width: 400, minWidth: 400, borderRight: "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.45)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "24px 22px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 26, fontWeight: 400, color: "#022350", fontFamily: h }}>Forum</div>
              <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>324 Beiträge · 89 gelöst · 12 heute aktiv</div>
            </div>
            <button style={{ padding: "8px 16px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", border: "none", borderRadius: 12, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: b, boxShadow: "0 2px 8px rgba(2,35,80,0.2)" }}>+ Neuer Beitrag</button>
          </div>

          {/* Search */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <input placeholder="Beiträge durchsuchen..." style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1px solid rgba(0,0,0,0.06)", borderRadius: 14, fontSize: 13, outline: "none", background: "rgba(255,255,255,0.8)", boxSizing: "border-box", fontFamily: b }} />
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, color: "#9A9AAA" }}>🔍</span>
          </div>

          {/* Category pills */}
          <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: b, border: "none",
                background: activeCategory === cat ? "#022350" : "rgba(255,255,255,0.7)",
                color: activeCategory === cat ? "white" : "#4A4A5A",
                boxShadow: activeCategory === cat ? "0 2px 8px rgba(2,35,80,0.2)" : "none",
              }}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Post list */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {filteredPosts.map(post => (
            <div key={post.id} onClick={() => setSelected(post)} style={{
              padding: "16px 22px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              cursor: "pointer",
              background: selected.id === post.id ? "rgba(255,255,255,0.85)" : "transparent",
              borderLeft: selected.id === post.id ? "3px solid #022350" : "3px solid transparent",
              transition: "all 0.15s ease",
            }}>
              {/* Pinned indicator */}
              {post.pinned && (
                <div style={{ fontSize: 10, color: "#C8A24D", fontWeight: 600, marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>
                  <span>📌</span> Angepinnt
                </div>
              )}

              {/* Author row */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: post.avatarGradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white", flexShrink: 0, position: "relative" }}>
                  {post.initials}
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#0FA4A0", border: "1.5px solid white" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#022350" }}>{post.author}</span>
                    <span style={{ fontSize: 9, color: "#9A9AAA", fontWeight: 500, background: "rgba(0,0,0,0.03)", padding: "1px 6px", borderRadius: 6 }}>{post.role}</span>
                  </div>
                  <span style={{ fontSize: 10, color: "#9A9AAA" }}>{post.time}</span>
                </div>
                {post.solved && (
                  <div style={{ width: 22, height: 22, borderRadius: 8, background: "linear-gradient(135deg, #0FA4A0, #14C4BF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "white", fontWeight: 800, flexShrink: 0, boxShadow: "0 2px 6px rgba(15,164,160,0.3)" }}>✓</div>
                )}
              </div>

              {/* Title */}
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "#022350", lineHeight: 1.35, marginBottom: 6 }}>{post.title}</div>

              {/* Category + Preview */}
              <div style={{ marginBottom: 8 }}>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
                  background: catColors[post.category]?.bg, color: catColors[post.category]?.color,
                  border: `1px solid ${catColors[post.category]?.border}`,
                }}>{post.category}</span>
              </div>
              <div style={{ fontSize: 12, color: "#6A6A7A", lineHeight: 1.5, overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{post.preview}</div>

              {/* Bottom stats */}
              <div style={{ display: "flex", gap: 12, marginTop: 10, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 3 }}>💬 {post.replies}</span>
                <span style={{ fontSize: 11, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 3 }}>👁 {post.views}</span>
                <div style={{ flex: 1 }} />
                <div style={{ display: "flex", gap: 4 }}>
                  {post.reactions.slice(0, 3).map((r, i) => (
                    <span key={i} style={{ fontSize: 11, background: "rgba(255,255,255,0.6)", borderRadius: 12, padding: "1px 6px", display: "flex", alignItems: "center", gap: 2 }}>
                      {r.emoji} <span style={{ fontSize: 10, color: "#4A4A5A" }}>{r.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POST DETAIL */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Detail Header */}
        <div style={{ padding: "20px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 8,
              background: catColors[selected.category]?.bg, color: catColors[selected.category]?.color,
              border: `1px solid ${catColors[selected.category]?.border}`,
            }}>{selected.category}</span>
            {selected.solved && (
              <span style={{ fontSize: 10, fontWeight: 700, color: "#0FA4A0", background: "rgba(15,164,160,0.08)", padding: "3px 10px", borderRadius: 8, display: "flex", alignItems: "center", gap: 4 }}>✓ Gelöst</span>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 4 }}>👁 {selected.views} Aufrufe</span>
            <span style={{ fontSize: 11, color: "#9A9AAA" }}>·</span>
            <span style={{ fontSize: 11, color: "#9A9AAA", display: "flex", alignItems: "center", gap: 4 }}>💬 {selected.replies} Antworten</span>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 32px 32px" }}>

          {/* Original Post */}
          <div style={{ ...glass, padding: "28px 30px", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: selected.avatarGradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "white", flexShrink: 0, position: "relative", boxShadow: "0 4px 12px rgba(2,35,80,0.15)" }}>
                {selected.initials}
                <div style={{ position: "absolute", bottom: -1, right: -1, width: 12, height: 12, borderRadius: "50%", background: "#0FA4A0", border: "2px solid white" }} />
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#022350" }}>{selected.author}</span>
                  <span style={{ background: "rgba(200,162,77,0.12)", color: "#a07828", fontSize: 10, padding: "2px 8px", borderRadius: 8, fontWeight: 600 }}>{selected.role}</span>
                </div>
                <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 2 }}>{selected.time}</div>
              </div>
            </div>

            <div style={{ fontSize: 20, fontWeight: 500, color: "#022350", fontFamily: h, marginBottom: 16, lineHeight: 1.3 }}>{selected.title}</div>

            <div style={{ fontSize: 14, color: "#4A4A5A", lineHeight: 1.8, marginBottom: 24, whiteSpace: "pre-line" }}>
              {selected.body}
            </div>

            {/* Reactions */}
            <div style={{ display: "flex", gap: 8, paddingTop: 18, borderTop: "1px solid rgba(0,0,0,0.05)", flexWrap: "wrap", alignItems: "center" }}>
              {selected.reactions.map((r, i) => (
                <button key={i} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 12, border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 14, fontFamily: b }}>
                  {r.emoji} <span style={{ fontSize: 12, fontWeight: 600, color: "#4A4A5A" }}>{r.count}</span>
                </button>
              ))}
              <button style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 12px", borderRadius: 12, border: "1px dashed rgba(0,0,0,0.08)", background: "transparent", cursor: "pointer", fontSize: 12, color: "#9A9AAA", fontFamily: b }}>+ Reaktion</button>
            </div>
          </div>

          {/* Replies Section Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{replies.length} Antworten</div>
            <div style={{ flex: 1, height: 1, background: "rgba(0,0,0,0.06)" }} />
          </div>

          {/* Replies */}
          {replies.map((reply, i) => (
            <div key={i} style={{
              ...glass,
              padding: "20px 24px",
              marginBottom: 12,
              borderRadius: 18,
              border: reply.best ? "1px solid rgba(15,164,160,0.35)" : "1px solid rgba(255,255,255,0.6)",
              boxShadow: reply.best ? "0 2px 16px rgba(15,164,160,0.08)" : "0 2px 16px rgba(2,35,80,0.03)",
              position: "relative",
            }}>
              {reply.best && (
                <div style={{ position: "absolute", top: -1, right: 20, background: "linear-gradient(135deg, #0FA4A0, #14C4BF)", color: "white", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderRadius: "0 0 10px 10px", boxShadow: "0 2px 8px rgba(15,164,160,0.25)" }}>✓ Beste Antwort</div>
              )}

              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: reply.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0, position: "relative" }}>
                  {reply.initials}
                  <div style={{ position: "absolute", bottom: -1, right: -1, width: 9, height: 9, borderRadius: "50%", background: "#0FA4A0", border: "1.5px solid white" }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{reply.author}</span>
                    <span style={{ background: reply.best ? "rgba(15,164,160,0.08)" : "rgba(200,162,77,0.1)", color: reply.best ? "#0FA4A0" : "#a07828", fontSize: 9, padding: "2px 7px", borderRadius: 8, fontWeight: 600 }}>{reply.role}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "#9A9AAA" }}>{reply.time}</div>
                </div>
              </div>

              <div style={{ fontSize: 13.5, color: "#4A4A5A", lineHeight: 1.7, marginBottom: 14, whiteSpace: "pre-line" }}>{reply.text}</div>

              <div style={{ display: "flex", gap: 6 }}>
                {reply.reactions.map((r, j) => (
                  <button key={j} style={{
                    display: "flex", alignItems: "center", gap: 3, padding: "4px 10px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontFamily: b,
                    border: reply.best && j === 0 ? "1px solid rgba(15,164,160,0.3)" : "1px solid rgba(0,0,0,0.06)",
                    background: reply.best && j === 0 ? "rgba(15,164,160,0.06)" : "transparent",
                  }}>
                    {r.emoji} <span style={{ fontSize: 11, fontWeight: 600, color: reply.best && j === 0 ? "#0FA4A0" : "#4A4A5A" }}>{r.count}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Reply Input */}
          <div style={{ ...glass, padding: "20px 24px", marginTop: 8 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "white", flexShrink: 0 }}>LM</div>
              <div style={{ flex: 1 }}>
                <textarea
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Schreib eine Antwort..."
                  style={{ width: "100%", border: "none", outline: "none", fontFamily: b, fontSize: 13.5, color: "#1A1A2E", resize: "none", minHeight: 80, lineHeight: 1.6, boxSizing: "border-box", background: "transparent" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {["👍", "❤️", "😂", "🔥", "💡", "🙏"].map(e => (
                      <span key={e} onClick={() => setReplyText(t => t + e)} style={{ fontSize: 18, cursor: "pointer", padding: "3px 5px", borderRadius: 8, background: "rgba(0,0,0,0.02)" }}>{e}</span>
                    ))}
                  </div>
                  <button style={{
                    padding: "9px 22px",
                    background: replyText.trim() ? "linear-gradient(135deg, #022350, #0E3057)" : "rgba(0,0,0,0.06)",
                    color: replyText.trim() ? "white" : "#9A9AAA",
                    border: "none", borderRadius: 12, fontSize: 13, fontWeight: 600, cursor: replyText.trim() ? "pointer" : "default", fontFamily: b,
                    boxShadow: replyText.trim() ? "0 2px 8px rgba(2,35,80,0.2)" : "none",
                  }}>Antworten</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
