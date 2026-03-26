"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Camera, Save, Mail, Phone, MapPin, Building, Award, BookOpen, Target, Clock, Flame, Trophy, Star, Shield, CheckCircle } from "lucide-react";

export default function Profil() {
  const [name, setName] = useState("Laura Meier");
  const [email, setEmail] = useState("laura@zuriva.ch");
  const [phone, setPhone] = useState("+41 79 234 56 78");
  const [location, setLocation] = useState("Zürich");
  const [company, setCompany] = useState("Zuriva AG");
  const [bio, setBio] = useState("Versicherungsvermittlerin mit 3 Jahren Erfahrung im Bereich Nicht-Leben und Leben. Aktuell in der VBV-Grundausbildung.");
  const [notifications, setNotifications] = useState({ email: true, whatsapp: true, streak: true, weekly: false });
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState<"profil" | "statistiken" | "einstellungen">("profil");

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const stats = {
    xp: 2840, level: 7, streak: 12, rank: 3,
    lektionen: 47, quizzes: 23, stunden: 34, badges: 8,
    credits: 342, zielCredits: 600,
    lernpfade: { total: 4, done: 1, active: 1 },
    module: { total: 16, done: 4 },
  };

  const recentBadges = [
    { name: "Quiz-Meister", color: "#C8A24D", icon: <Target size={16} /> },
    { name: "Feuer-Streak", color: "#C0392B", icon: <Flame size={16} /> },
    { name: "Top 3", color: "#C8A24D", icon: <Trophy size={16} /> },
    { name: "Perfektionist", color: "#C8A24D", icon: <Star size={16} /> },
  ];

  return (
    <DashboardLayout title="Mein Profil" subtitle="Persönliche Einstellungen und Statistiken">

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        {([["profil", "Profil"], ["statistiken", "Statistiken"], ["einstellungen", "Einstellungen"]] as const).map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={tab === id ? "z-btn z-btn-primary" : "z-btn z-btn-ghost"} style={{ fontSize: 13, padding: "8px 20px" }}>{label}</button>
        ))}
      </div>

      {/* PROFIL TAB */}
      {tab === "profil" && (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24 }}>
          {/* Left: Avatar + Quick Stats */}
          <div>
            <div className="z-card" style={{ padding: "32px 24px", textAlign: "center", marginBottom: 16 }}>
              <div style={{ position: "relative", width: 96, height: 96, margin: "0 auto 16px" }}>
                <div style={{ width: 96, height: 96, borderRadius: "50%", background: "linear-gradient(135deg, #C8A24D, #E0B95F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 700, color: "#022350" }}>LM</div>
                <button style={{ position: "absolute", bottom: 0, right: 0, width: 32, height: 32, borderRadius: "50%", background: "#022350", border: "3px solid white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Camera size={14} color="white" />
                </button>
              </div>
              <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350" }}>{name}</div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>Vermittlerin · Zuriva AG</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
                <span className="z-badge" style={{ background: "rgba(200,162,77,0.08)", color: "#C8A24D" }}>Level {stats.level}</span>
                <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0" }}>#{stats.rank}</span>
              </div>
            </div>

            {/* XP Progress */}
            <div className="z-card" style={{ padding: "20px 22px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}>
                <span>Level {stats.level}</span>
                <span>{stats.xp} / 3500 XP</span>
              </div>
              <div className="z-progress" style={{ height: 6, borderRadius: 3 }}>
                <div className="z-progress-bar" style={{ width: `${(stats.xp / 3500) * 100}%`, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", height: 6, borderRadius: 3 }} />
              </div>
            </div>

            {/* Recent Badges */}
            <div className="z-card" style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 }}>Letzte Badges</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {recentBadges.map((b, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: `${b.color}08` }}>
                    <div style={{ color: b.color }}>{b.icon}</div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#022350" }}>{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Edit Form */}
          <div className="z-card" style={{ padding: "32px 36px" }}>
            <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350", marginBottom: 4 }}>Persönliche Daten</div>
            <div className="z-gold-line" style={{ marginBottom: 24 }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Name</label>
                <input value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>E-Mail</label>
                <div style={{ position: "relative" }}>
                  <Mail size={14} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: "100%", padding: "12px 16px 12px 38px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Telefon</label>
                <div style={{ position: "relative" }}>
                  <Phone size={14} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input value={phone} onChange={e => setPhone(e.target.value)} style={{ width: "100%", padding: "12px 16px 12px 38px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Standort</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={14} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                  <input value={location} onChange={e => setLocation(e.target.value)} style={{ width: "100%", padding: "12px 16px 12px 38px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Firma</label>
              <div style={{ position: "relative" }}>
                <Building size={14} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input value={company} onChange={e => setCompany(e.target.value)} style={{ width: "100%", padding: "12px 16px 12px 38px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Über mich</label>
              <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }} />
            </div>

            <button onClick={handleSave} className="z-btn z-btn-primary" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {saved ? <><CheckCircle size={14} /> Gespeichert</> : <><Save size={14} /> Speichern</>}
            </button>
          </div>
        </div>
      )}

      {/* STATISTIKEN TAB */}
      {tab === "statistiken" && (
        <>
          <div className="z-grid-4" style={{ marginBottom: 20 }}>
            {[
              { label: "Credits", value: stats.credits, sub: `von ${stats.zielCredits}`, icon: <Award size={18} />, color: "#C8A24D" },
              { label: "Streak", value: `${stats.streak} Tage`, sub: "in Folge", icon: <Flame size={18} />, color: "#C0392B" },
              { label: "Lernzeit", value: `${stats.stunden}h`, sub: "gesamt", icon: <Clock size={18} />, color: "#022350" },
              { label: "Rang", value: `#${stats.rank}`, sub: "im Leaderboard", icon: <Trophy size={18} />, color: "#0FA4A0" },
            ].map((s, i) => (
              <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "22px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${s.color}10`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>{s.icon}</div>
                <div>
                  <div className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: "#022350" }}>{s.value}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{s.label} · {s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="z-grid-2" style={{ gap: 20 }}>
            {/* VBV Progress */}
            <div className="z-card" style={{ padding: "26px 28px" }}>
              <div className="font-heading" style={{ fontSize: 18, color: "#022350", marginBottom: 4 }}>VBV-Zertifizierung</div>
              <div className="z-gold-line" style={{ marginBottom: 16 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <div style={{ position: "relative", width: 100, height: 100 }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(2,35,80,0.06)" strokeWidth="6" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#C8A24D" strokeWidth="6" strokeLinecap="round" strokeDasharray="264" strokeDashoffset={264 - (264 * stats.credits / stats.zielCredits)} style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div className="font-heading" style={{ fontSize: 24, fontWeight: 700, color: "#022350" }}>{Math.round(stats.credits / stats.zielCredits * 100)}%</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#4A5568", marginBottom: 6 }}>{stats.credits} von {stats.zielCredits} Credits</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Frist: 30. Juni 2026</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>Verbleibend: {stats.zielCredits - stats.credits} Credits</div>
                </div>
              </div>
            </div>

            {/* Lernfortschritt */}
            <div className="z-card" style={{ padding: "26px 28px" }}>
              <div className="font-heading" style={{ fontSize: 18, color: "#022350", marginBottom: 4 }}>Lernfortschritt</div>
              <div className="z-gold-line" style={{ marginBottom: 16 }} />
              {[
                { label: "Lernpfade", done: stats.lernpfade.done, total: stats.lernpfade.total, color: "#0FA4A0" },
                { label: "Module", done: stats.module.done, total: stats.module.total, color: "#022350" },
                { label: "Lektionen", done: stats.lektionen, total: 72, color: "#C8A24D" },
                { label: "Quizzes", done: stats.quizzes, total: 30, color: "#1B6FC2" },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                    <span style={{ color: "#4A5568" }}>{item.label}</span>
                    <span style={{ fontWeight: 600, color: "#022350" }}>{item.done}/{item.total}</span>
                  </div>
                  <div className="z-progress">
                    <div className="z-progress-bar" style={{ width: `${(item.done / item.total) * 100}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* EINSTELLUNGEN TAB */}
      {tab === "einstellungen" && (
        <div style={{ maxWidth: 600 }}>
          <div className="z-card" style={{ padding: "28px 32px", marginBottom: 16 }}>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: "#022350", marginBottom: 4 }}>Benachrichtigungen</div>
            <div className="z-gold-line" style={{ marginBottom: 20 }} />
            {[
              { key: "email" as const, label: "E-Mail Benachrichtigungen", desc: "Prüfungen, Zertifikate, Neuigkeiten" },
              { key: "whatsapp" as const, label: "WhatsApp Benachrichtigungen", desc: "Erinnerungen direkt aufs Handy" },
              { key: "streak" as const, label: "Streak-Warnungen", desc: "Wenn dein Streak in Gefahr ist" },
              { key: "weekly" as const, label: "Wöchentlicher Report", desc: "Zusammenfassung deines Fortschritts" },
            ].map(item => (
              <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(2,35,80,0.04)" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF" }}>{item.desc}</div>
                </div>
                <button onClick={() => setNotifications(n => ({ ...n, [item.key]: !n[item.key] }))} style={{ width: 44, height: 24, borderRadius: 12, border: "none", background: notifications[item.key] ? "#0FA4A0" : "rgba(2,35,80,0.12)", cursor: "pointer", position: "relative", transition: "all 0.2s" }}>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: notifications[item.key] ? 22 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
                </button>
              </div>
            ))}
          </div>

          <div className="z-card" style={{ padding: "28px 32px" }}>
            <div className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: "#022350", marginBottom: 4 }}>Sicherheit</div>
            <div className="z-gold-line" style={{ marginBottom: 20 }} />
            <button className="z-btn z-btn-ghost" style={{ width: "100%", marginBottom: 10 }}>Passwort ändern</button>
            <button className="z-btn z-btn-ghost" style={{ width: "100%", color: "#C0392B", borderColor: "rgba(192,57,43,0.15)" }}>Konto löschen</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
