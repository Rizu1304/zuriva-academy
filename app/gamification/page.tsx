"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Trophy, Flame, Star, Target, Award, BookOpen, MessageSquare, Clock, Zap, Shield, Crown, Heart, TrendingUp, CheckCircle } from "lucide-react";

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  total?: number;
}

interface StreakDay {
  date: string;
  active: boolean;
}

const userStats = {
  xp: 2840,
  level: 7,
  nextLevelXp: 3500,
  streak: 12,
  longestStreak: 18,
  totalLessons: 47,
  totalQuizzes: 23,
  totalHours: 34,
  rank: 3,
  totalUsers: 156,
};

const badges: Badge[] = [
  { id: "1", name: "Erster Schritt", description: "Erste Lektion abgeschlossen", icon: <BookOpen size={22} />, color: "#0FA4A0", earned: true, earnedDate: "15.01.2026" },
  { id: "2", name: "Quiz-Meister", description: "10 Quizzes bestanden", icon: <Target size={22} />, color: "#C8A24D", earned: true, earnedDate: "28.02.2026" },
  { id: "3", name: "Feuer-Streak", description: "7 Tage in Folge gelernt", icon: <Flame size={22} />, color: "#C0392B", earned: true, earnedDate: "05.03.2026" },
  { id: "4", name: "Forum-Held", description: "5 Beiträge im Forum", icon: <MessageSquare size={22} />, color: "#1B6FC2", earned: true, earnedDate: "10.03.2026" },
  { id: "5", name: "Schnell-Lerner", description: "Quiz in unter 60% der Zeit bestanden", icon: <Zap size={22} />, color: "#C8A24D", earned: true, earnedDate: "12.03.2026" },
  { id: "6", name: "Perfektionist", description: "100% in einem Quiz", icon: <Crown size={22} />, color: "#C8A24D", earned: true, earnedDate: "18.03.2026" },
  { id: "7", name: "Sach-Experte", description: "Sachversicherung Kurs abgeschlossen", icon: <Shield size={22} />, color: "#022350", earned: false, progress: 68, total: 100 },
  { id: "8", name: "Leben-Experte", description: "Lebensversicherung Kurs abgeschlossen", icon: <Heart size={22} />, color: "#0FA4A0", earned: false, progress: 33, total: 100 },
  { id: "9", name: "Marathon-Lerner", description: "50 Lektionen abgeschlossen", icon: <TrendingUp size={22} />, color: "#022350", earned: false, progress: 47, total: 50 },
  { id: "10", name: "VBV-Champion", description: "VBV-Zertifizierung abgeschlossen", icon: <Award size={22} />, color: "#C8A24D", earned: false, progress: 342, total: 600 },
  { id: "11", name: "Zwei-Wochen-Streak", description: "14 Tage in Folge gelernt", icon: <Flame size={22} />, color: "#C0392B", earned: false, progress: 12, total: 14 },
  { id: "12", name: "Top 3", description: "Unter den Top 3 im Leaderboard", icon: <Trophy size={22} />, color: "#C8A24D", earned: true, earnedDate: "20.03.2026" },
];

const weekDays: StreakDay[] = [
  { date: "Mo", active: true }, { date: "Di", active: true }, { date: "Mi", active: true },
  { date: "Do", active: true }, { date: "Fr", active: true }, { date: "Sa", active: false },
  { date: "So", active: false },
];

const xpHistory = [
  { action: "Quiz Sachversicherung bestanden", xp: 120, time: "Heute 09:14" },
  { action: "Modul 5 Beratungskompetenz abgeschlossen", xp: 80, time: "Heute 08:42" },
  { action: "Täglicher Login-Bonus", xp: 25, time: "Heute 08:00" },
  { action: "Forum Kommentar geschrieben", xp: 15, time: "Gestern 16:30" },
  { action: "Lektion Lebensversicherung abgeschlossen", xp: 60, time: "Gestern 14:20" },
  { action: "Kahoot Quiz gespielt", xp: 95, time: "Fr 20.03." },
  { action: "Streak-Bonus (10 Tage)", xp: 200, time: "Mi 18.03." },
];

const leaderboard = [
  { name: "Anna Schneider", xp: 4200, level: 9, avatar: "AS", streak: 22 },
  { name: "Thomas Mueller", xp: 3100, level: 8, avatar: "TM", streak: 8 },
  { name: "Laura Meier", xp: 2840, level: 7, avatar: "LM", streak: 12, you: true },
  { name: "Petra Koch", xp: 2200, level: 6, avatar: "PK", streak: 5 },
  { name: "Marco Brunner", xp: 1950, level: 5, avatar: "MB", streak: 3 },
];

export default function Gamification() {
  const [tab, setTab] = useState<"overview" | "badges" | "leaderboard">("overview");
  const earnedCount = badges.filter(b => b.earned).length;
  const xpPercent = Math.round((userStats.xp / userStats.nextLevelXp) * 100);

  return (
    <DashboardLayout title="Gamification" subtitle="Dein Fortschritt und Erfolge">

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {([["overview", "Übersicht"], ["badges", "Badges"], ["leaderboard", "Rangliste"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={tab === id ? "z-btn z-btn-primary" : "z-btn z-btn-ghost"} style={{ fontSize: 13, padding: "8px 20px" }}>{label}</button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab === "overview" && (
        <>
          {/* XP + Level Card */}
          <div className="z-card" style={{ padding: "32px 36px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, #C8A24D ${xpPercent}%, rgba(2,35,80,0.06) ${xpPercent}%)` }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg, #C8A24D, #E0B95F)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Star size={24} color="#022350" />
                  </div>
                  <div>
                    <div className="font-heading" style={{ fontSize: 28, fontWeight: 700, color: "#022350" }}>Level {userStats.level}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF" }}>{userStats.xp} / {userStats.nextLevelXp} XP</div>
                  </div>
                </div>
                <div className="z-progress" style={{ marginBottom: 8, height: 8, borderRadius: 4 }}>
                  <div className="z-progress-bar" style={{ width: `${xpPercent}%`, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", height: 8, borderRadius: 4 }} />
                </div>
                <div style={{ fontSize: 12, color: "#4A5568" }}>Noch {userStats.nextLevelXp - userStats.xp} XP bis Level {userStats.level + 1}</div>
              </div>
              <div style={{ display: "flex", gap: 24, textAlign: "center" }}>
                <div>
                  <div className="font-heading" style={{ fontSize: 32, fontWeight: 700, color: "#C0392B" }}>{userStats.streak}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}><Flame size={12} /> Tage Streak</div>
                </div>
                <div>
                  <div className="font-heading" style={{ fontSize: 32, fontWeight: 700, color: "#022350" }}>#{userStats.rank}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}><Trophy size={12} /> Rang</div>
                </div>
              </div>
            </div>
          </div>

          {/* Streak Calendar + Stats */}
          <div className="z-grid-main">
            <div>
              {/* Streak */}
              <div className="z-card" style={{ padding: "24px 28px", marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div className="font-heading" style={{ fontSize: 18, color: "#022350" }}>Wochenstreak</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Längster Streak: {userStats.longestStreak} Tage</div>
                </div>
                <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
                  {weekDays.map((d, i) => (
                    <div key={i} style={{ textAlign: "center", flex: 1 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: d.active ? "linear-gradient(135deg, #C8A24D, #E0B95F)" : "rgba(2,35,80,0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px", border: d.active ? "none" : "1px solid rgba(2,35,80,0.08)" }}>
                        {d.active ? <Flame size={18} color="#022350" /> : <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(2,35,80,0.12)" }} />}
                      </div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: d.active ? "#022350" : "#9CA3AF" }}>{d.date}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* XP History */}
              <div className="z-card" style={{ padding: "24px 28px" }}>
                <div className="font-heading" style={{ fontSize: 18, color: "#022350", marginBottom: 4 }}>XP-Verlauf</div>
                <div className="z-gold-line" style={{ marginBottom: 16 }} />
                {xpHistory.map((item, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < xpHistory.length - 1 ? "1px solid rgba(2,35,80,0.04)" : "none" }}>
                    <div>
                      <div style={{ fontSize: 13, color: "#022350" }}>{item.action}</div>
                      <div style={{ fontSize: 11, color: "#9CA3AF" }}>{item.time}</div>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#C8A24D" }}>+{item.xp} XP</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Lektionen", value: userStats.totalLessons, icon: <BookOpen size={16} />, color: "#022350" },
                { label: "Quizzes", value: userStats.totalQuizzes, icon: <Target size={16} />, color: "#0FA4A0" },
                { label: "Lernstunden", value: `${userStats.totalHours}h`, icon: <Clock size={16} />, color: "#C8A24D" },
                { label: "Badges", value: `${earnedCount}/${badges.length}`, icon: <Award size={16} />, color: "#C0392B" },
              ].map((stat, i) => (
                <div key={i} className="z-card" style={{ padding: "20px 22px", display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: `${stat.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</div>
                  <div>
                    <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350" }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* BADGES TAB */}
      {tab === "badges" && (
        <>
          <div style={{ fontSize: 13, color: "#4A5568", marginBottom: 20 }}>{earnedCount} von {badges.length} Badges freigeschaltet</div>
          <div className="z-grid-3">
            {badges.map((badge, i) => (
              <div key={badge.id} className={`z-card animate-scale-in stagger-${Math.min(i + 1, 8)}`} style={{ padding: "24px", textAlign: "center", opacity: badge.earned ? 1 : 0.6 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: badge.earned ? `${badge.color}15` : "rgba(2,35,80,0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", color: badge.earned ? badge.color : "#9CA3AF", border: badge.earned ? `2px solid ${badge.color}30` : "2px solid rgba(2,35,80,0.06)" }}>
                  {badge.icon}
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#022350", marginBottom: 4 }}>{badge.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 10 }}>{badge.description}</div>
                {badge.earned ? (
                  <div className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0", display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <CheckCircle size={12} /> {badge.earnedDate}
                  </div>
                ) : badge.progress !== undefined && badge.total !== undefined ? (
                  <div>
                    <div className="z-progress" style={{ marginBottom: 4 }}>
                      <div className="z-progress-bar" style={{ width: `${(badge.progress / badge.total) * 100}%`, background: badge.color }} />
                    </div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>{badge.progress} / {badge.total}</div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}

      {/* LEADERBOARD TAB */}
      {tab === "leaderboard" && (
        <div style={{ maxWidth: 700 }}>
          {leaderboard.map((user, i) => (
            <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "18px 24px", marginBottom: 10, display: "flex", alignItems: "center", gap: 16, background: user.you ? "rgba(200,162,77,0.06)" : undefined, border: user.you ? "1px solid rgba(200,162,77,0.2)" : undefined }}>
              <div className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: i === 0 ? "#C8A24D" : i === 1 ? "#9CA3AF" : i === 2 ? "#B87333" : "#9CA3AF", width: 32, textAlign: "center" }}>{i + 1}</div>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: user.you ? "linear-gradient(135deg, #C8A24D, #E0B95F)" : "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: user.you ? "#022350" : "#4A5568" }}>{user.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{user.name} {user.you && <span style={{ fontSize: 11, color: "#C8A24D" }}>(Du)</span>}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>Level {user.level} · {user.streak} Tage Streak</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: user.you ? "#C8A24D" : "#022350" }}>{user.xp.toLocaleString()}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>XP</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
