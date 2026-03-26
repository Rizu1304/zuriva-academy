"use client";
import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { Play, Plus, Users, Clock, Trophy, Zap, BarChart3, Edit3, Trash2, Copy } from "lucide-react";

/* ===== TYPES ===== */

interface KahootGame {
  id: string;
  title: string;
  description: string;
  category: string;
  questionCount: number;
  playCount: number;
  avgScore: number;
  createdAt: string;
  coverColor: string;
  emoji: string;
}

/* ===== MOCK DATA ===== */

const mockGames: KahootGame[] = [
  {
    id: "sach-basics",
    title: "Sachversicherung Grundlagen",
    description: "Teste dein Wissen ueber die Grundbegriffe der Sachversicherung",
    category: "Sachversicherung",
    questionCount: 10,
    playCount: 47,
    avgScore: 72,
    createdAt: "2026-03-15",
    coverColor: "#0FA4A0",
    emoji: "🏠",
  },
  {
    id: "leben-vorsorge",
    title: "Vorsorgesystem Schweiz",
    description: "3-Saeulen-System, BVG und Lebensversicherungen",
    category: "Lebensversicherung",
    questionCount: 8,
    playCount: 32,
    avgScore: 65,
    createdAt: "2026-03-10",
    coverColor: "#C8A24D",
    emoji: "🛡️",
  },
  {
    id: "haftpflicht-quiz",
    title: "Haftpflichtversicherung",
    description: "Privathaftpflicht, Berufshaftpflicht und mehr",
    category: "Haftpflicht",
    questionCount: 12,
    playCount: 28,
    avgScore: 68,
    createdAt: "2026-03-08",
    coverColor: "#022350",
    emoji: "⚖️",
  },
  {
    id: "kvg-uvg",
    title: "KVG & UVG Wissen",
    description: "Kranken- und Unfallversicherung in der Schweiz",
    category: "Krankenversicherung",
    questionCount: 10,
    playCount: 19,
    avgScore: 71,
    createdAt: "2026-03-01",
    coverColor: "#6C5CE7",
    emoji: "🏥",
  },
  {
    id: "beratung-praxis",
    title: "Beratungsgespraech Praxis",
    description: "Kundenberatung, Bedarfsanalyse und Verkaufsgespraech",
    category: "Beratung",
    questionCount: 8,
    playCount: 14,
    avgScore: 78,
    createdAt: "2026-02-25",
    coverColor: "#E17055",
    emoji: "💬",
  },
];

const categories = ["Alle", "Sachversicherung", "Lebensversicherung", "Haftpflicht", "Krankenversicherung", "Beratung"];

/* ===== COMPONENT ===== */

export default function KahootPage() {
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = mockGames.filter((g) => {
    const matchCategory = selectedCategory === "Alle" || g.category === selectedCategory;
    const matchSearch = g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <DashboardLayout
      title="Kahoot"
      subtitle="Erstelle und spiele interaktive Quiz-Spiele"
      actions={
        <Link href="/kahoot/erstellen" className="z-btn z-btn-primary" style={{ textDecoration: "none", gap: 8 }}>
          <Plus size={16} />
          Neues Kahoot
        </Link>
      }
    >
      {/* Stats Row */}
      <div className="z-grid-4 animate-fade-in-up" style={{ marginBottom: 28 }}>
        {[
          { label: "Kahoots", value: mockGames.length.toString(), icon: <Zap size={18} />, color: "#C8A24D" },
          { label: "Gespielt", value: mockGames.reduce((s, g) => s + g.playCount, 0).toString(), icon: <Play size={18} />, color: "#0FA4A0" },
          { label: "Fragen total", value: mockGames.reduce((s, g) => s + g.questionCount, 0).toString(), icon: <BarChart3 size={18} />, color: "#022350" },
          { label: "Avg. Score", value: Math.round(mockGames.reduce((s, g) => s + g.avgScore, 0) / mockGames.length) + "%", icon: <Trophy size={18} />, color: "#6C5CE7" },
        ].map((stat) => (
          <div key={stat.label} className="z-card-static" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: stat.color + "12", display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#022350", lineHeight: 1.1 }}>{stat.value}</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="animate-fade-in-up stagger-2" style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <input
          className="z-input"
          placeholder="Kahoot suchen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, minWidth: 200 }}
        />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="z-btn"
              style={{
                background: selectedCategory === cat ? "#022350" : "rgba(255,255,255,0.5)",
                color: selectedCategory === cat ? "white" : "#4A5568",
                fontSize: 12,
                padding: "7px 14px",
                border: selectedCategory === cat ? "none" : "1px solid rgba(255,255,255,0.45)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="z-grid-3">
        {filtered.map((game, i) => (
          <div
            key={game.id}
            className={`z-card animate-fade-in-up stagger-${i + 3}`}
            style={{ overflow: "hidden", cursor: "pointer" }}
          >
            {/* Cover */}
            <div
              style={{
                height: 120,
                background: `linear-gradient(135deg, ${game.coverColor}, ${game.coverColor}CC)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span style={{ fontSize: 48 }}>{game.emoji}</span>
              <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "4px 10px", fontSize: 11, color: "white", fontWeight: 600 }}>
                {game.questionCount} Fragen
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: game.coverColor, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6 }}>
                {game.category}
              </div>
              <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 6, lineHeight: 1.3 }}>
                {game.title}
              </div>
              <div style={{ fontSize: 12.5, color: "#9CA3AF", marginBottom: 16, lineHeight: 1.5 }}>
                {game.description}
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: 16, marginBottom: 16, fontSize: 12, color: "#6B7280" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Users size={13} /> {game.playCount}x gespielt
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Trophy size={13} /> {game.avgScore}% Avg
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: "flex", gap: 8 }}>
                <Link
                  href={`/kahoot/${game.id}`}
                  className="z-btn z-btn-primary"
                  style={{ flex: 1, textDecoration: "none", fontSize: 12, padding: "8px 12px" }}
                >
                  <Play size={14} /> Spielen
                </Link>
                <Link
                  href={`/kahoot/${game.id}/bearbeiten`}
                  className="z-btn z-btn-secondary"
                  style={{ textDecoration: "none", fontSize: 12, padding: "8px 12px" }}
                >
                  <Edit3 size={14} />
                </Link>
                <button className="z-btn z-btn-ghost" style={{ fontSize: 12, padding: "8px 10px" }}>
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="z-card-static" style={{ padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#022350", marginBottom: 6 }}>Keine Kahoots gefunden</div>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>Passe deine Suche oder Filter an</div>
        </div>
      )}
    </DashboardLayout>
  );
}
