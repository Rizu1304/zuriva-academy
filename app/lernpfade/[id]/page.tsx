"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const pathsData: Record<string, {
  title: string; description: string; icon: string; color: string; credits: number;
  courses: { id: number; title: string; duration: string; modules: number; status: "done" | "active" | "locked"; credits: number; description: string }[];
}> = {
  "1": {
    title: "Trainee Grundausbildung",
    description: "Der perfekte Einstieg fuer neue Mitarbeitende bei Zuriva. Dieser Lernpfad vermittelt dir alle Grundlagen, die du fuer deinen Start brauchst.",
    icon: "🎓", color: "#0FA4A0", credits: 40,
    courses: [
      { id: 1, title: "Willkommen bei Zuriva", duration: "30min", modules: 3, status: "done", credits: 4, description: "Unternehmenskultur, Werte und Organisation" },
      { id: 2, title: "Systeme und Tools", duration: "45min", modules: 4, status: "done", credits: 6, description: "CRM, E-Mail und interne Plattformen" },
      { id: 3, title: "Versicherungsbasics", duration: "1h 30min", modules: 6, status: "done", credits: 10, description: "Was ist Versicherung? Grundbegriffe und Prinzipien" },
      { id: 4, title: "Kundenservice Grundlagen", duration: "1h 15min", modules: 5, status: "done", credits: 10, description: "Telefonieren, E-Mail-Etikette, Beschwerdemanagement" },
      { id: 5, title: "Datenschutz und Compliance Intro", duration: "1h 00min", modules: 4, status: "done", credits: 10, description: "DSGVO, Vertraulichkeit, Meldepflichten" },
    ],
  },
  "2": {
    title: "VBV Grundausbildung",
    description: "Pflichtausbildung fuer die VBV-Zertifizierung. Dieser Lernpfad deckt alle Themengebiete ab, die fuer die Registrierung als Versicherungsvermittler/in erforderlich sind.",
    icon: "📋", color: "#022350", credits: 120,
    courses: [
      { id: 1, title: "Grundlagen der Sachversicherung", duration: "2h 40min", modules: 6, status: "done", credits: 12, description: "Feuer-, Wasser-, Diebstahlversicherung und mehr" },
      { id: 2, title: "Haftpflichtversicherung Basis", duration: "2h 00min", modules: 5, status: "done", credits: 10, description: "Privat- und Berufshaftpflicht, Deckungskonzepte" },
      { id: 3, title: "Lebensversicherung Grundlagen", duration: "3h 00min", modules: 7, status: "done", credits: 14, description: "Risikolebens-, Kapitallebens- und fondsgebundene Policen" },
      { id: 4, title: "Vorsorge 1. und 2. Saeule", duration: "2h 30min", modules: 6, status: "done", credits: 12, description: "AHV, BVG, Pensionskasse und Freizuegigkeit" },
      { id: 5, title: "Krankenversicherung Basics", duration: "2h 00min", modules: 5, status: "done", credits: 10, description: "KVG, VVG-Zusatz, Taggeld und Spitalversicherung" },
      { id: 6, title: "Beratungsprozess und Dokumentation", duration: "2h 15min", modules: 6, status: "done", credits: 12, description: "Bedarfsanalyse, Beratungsprotokoll, Abschluss" },
      { id: 7, title: "Rechtsgrundlagen VAG/VVG", duration: "3h 00min", modules: 5, status: "active", credits: 14, description: "Versicherungsaufsichts- und Vertragsgesetz im Detail" },
      { id: 8, title: "Kundenbedarfsanalyse Vertiefung", duration: "2h 30min", modules: 6, status: "locked", credits: 12, description: "Fortgeschrittene Analysetechniken und Beratungstools" },
      { id: 9, title: "Compliance und Datenschutz", duration: "2h 00min", modules: 5, status: "locked", credits: 10, description: "FIDLEG, FINIG, DSG und Meldepflichten" },
      { id: 10, title: "Abschlusspruefung VBV", duration: "1h 30min", modules: 3, status: "locked", credits: 14, description: "Abschliessende Pruefung ueber alle Themenbereiche" },
    ],
  },
  "3": {
    title: "Spezialisierung Nicht-Leben",
    description: "Vertiefung in Sach- und Haftpflichtversicherungen fuer erfahrene Vermittler/innen.",
    icon: "🏢", color: "#6366f1", credits: 80,
    courses: [
      { id: 1, title: "Technische Versicherungen", duration: "3h 00min", modules: 7, status: "locked", credits: 14, description: "Maschinen-, Montage- und Elektronikversicherung" },
      { id: 2, title: "Transportversicherung", duration: "2h 30min", modules: 6, status: "locked", credits: 12, description: "Warentransport, Verkehrshaftung, CMR" },
      { id: 3, title: "Betriebshaftpflicht Vertiefung", duration: "3h 00min", modules: 7, status: "locked", credits: 14, description: "Produkthaftung, Umwelthaftung, D&O" },
      { id: 4, title: "Gebaeude und Elementar", duration: "2h 00min", modules: 5, status: "locked", credits: 10, description: "Gebaeude-, Erdbeben- und Ueberschwemmungsversicherung" },
      { id: 5, title: "Motorfahrzeugversicherung", duration: "2h 30min", modules: 6, status: "locked", credits: 10, description: "MFZ-Haftpflicht, Kasko, Insassenunfall" },
      { id: 6, title: "Rechtsschutzversicherung", duration: "2h 00min", modules: 5, status: "locked", credits: 8, description: "Privat-, Verkehrs- und Berufsrechtsschutz" },
      { id: 7, title: "Underwriting Grundlagen", duration: "2h 30min", modules: 6, status: "locked", credits: 12, description: "Risikopruefung, Tarifierung, Zeichnungsrichtlinien" },
      { id: 8, title: "Schadenmanagement", duration: "2h 00min", modules: 5, status: "locked", credits: 0, description: "Schadenregulierung, Regress, Expertise" },
    ],
  },
  "4": {
    title: "Compliance und Updates",
    description: "Jaehrliche Pflichtmodule und regulatorische Updates fuer alle Vermittler/innen.",
    icon: "⚖️", color: "#e74c3c", credits: 30,
    courses: [
      { id: 1, title: "FIDLEG Update 2026", duration: "1h 00min", modules: 3, status: "locked", credits: 8, description: "Neuerungen im Finanzdienstleistungsgesetz" },
      { id: 2, title: "Datenschutz Refresher", duration: "45min", modules: 3, status: "locked", credits: 6, description: "Aktuelle DSG-Anforderungen und Praxisfaelle" },
      { id: 3, title: "Geldwaescherei-Praevention", duration: "1h 15min", modules: 4, status: "locked", credits: 8, description: "GwG-Pflichten fuer Versicherungsvermittler" },
      { id: 4, title: "Marktupdate Versicherung 2026", duration: "1h 00min", modules: 3, status: "locked", credits: 8, description: "Markttrends, neue Produkte, regulatorische Aenderungen" },
    ],
  },
};

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Kurse", href: "/courses" },
  { name: "Lernpfade", href: "/lernpfade", active: true },
  { name: "Pruefungen", href: "/pruefungen" },
  { name: "Zertifikate", href: "/zertifikate" },
  { name: "Forum", href: "/forum" },
  { name: "Admin", href: "/admin" },
];

export default function LernpfadDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const path = pathsData[id];
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!path) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#022350" }}>Lernpfad nicht gefunden</div>
          <a href="/lernpfade" style={{ color: "#0FA4A0", fontSize: 14, marginTop: 8, display: "inline-block" }}>Zurueck zu allen Lernpfaden</a>
        </div>
      </div>
    );
  }

  const completedCourses = path.courses.filter(c => c.status === "done").length;
  const totalCourses = path.courses.length;
  const progressPercent = Math.round((completedCourses / totalCourses) * 100);
  const earnedCredits = path.courses.filter(c => c.status === "done").reduce((sum, c) => sum + c.credits, 0);

  return (
    <>
      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        @keyframes progressFill { from { width: 0; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .course-card { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .course-card:hover { transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
        .course-card:active { transform: translateY(-1px); }
        .btn-primary { transition: all 0.2s ease; }
        .btn-primary:hover { filter: brightness(1.1); transform: scale(1.02); }
        .nav-link { transition: all 0.15s ease; }
        .nav-link:hover { background: #f0f2f5 !important; }
        .back-btn { transition: all 0.2s ease; }
        .back-btn:hover { background: #f0f2f5 !important; transform: translateX(-2px); }
      `}</style>
      <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif", background: "#F0F2F5", overflow: "hidden" }}>
        <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350" }}>ZURIVA</span>
            <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
          </div>
          {navItems.map((item) => (
            <a key={item.name} href={item.href} className="nav-link" style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#0FA4A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
            <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
          </div>
        </aside>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", padding: "0 32px", height: 60, display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <button onClick={() => router.push("/lernpfade")} className="back-btn" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#4A4A5A", display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", borderRadius: 8, fontFamily: "sans-serif" }}>
              ← Alle Lernpfade
            </button>
            <div style={{ width: 1, height: 24, background: "#dce0e6" }} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#022350" }}>{path.icon} {path.title}</div>
              <div style={{ fontSize: 12, color: "#9A9AAA" }}>{completedCourses} von {totalCourses} Kursen abgeschlossen</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
            {/* Hero */}
            <div style={{
              background: `linear-gradient(135deg, ${path.color}, ${path.color}dd)`,
              borderRadius: 20, padding: "32px 36px", color: "white", marginBottom: 32, position: "relative", overflow: "hidden",
              animation: mounted ? "scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            }}>
              <div style={{ position: "absolute", top: -40, right: -20, fontSize: 120, opacity: 0.1 }}>{path.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 500, opacity: 0.85, marginBottom: 8 }}>Lernpfad</div>
              <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{path.title}</div>
              <div style={{ fontSize: 14, opacity: 0.85, maxWidth: 600, lineHeight: 1.6, marginBottom: 24 }}>{path.description}</div>

              <div style={{ display: "flex", gap: 32, marginBottom: 20 }}>
                <div><div style={{ fontSize: 24, fontWeight: 700 }}>{completedCourses}/{totalCourses}</div><div style={{ fontSize: 12, opacity: 0.7 }}>Kurse</div></div>
                <div><div style={{ fontSize: 24, fontWeight: 700 }}>{earnedCredits}/{path.credits}</div><div style={{ fontSize: 12, opacity: 0.7 }}>Credits</div></div>
                <div><div style={{ fontSize: 24, fontWeight: 700 }}>{progressPercent}%</div><div style={{ fontSize: 12, opacity: 0.7 }}>Fortschritt</div></div>
              </div>

              <div style={{ background: "rgba(255,255,255,0.2)", height: 6, borderRadius: 3 }}>
                <div style={{
                  height: 6, borderRadius: 3, background: "white",
                  width: mounted ? progressPercent + "%" : "0%",
                  transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }} />
              </div>
            </div>

            {/* Course List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 860 }}>
              {path.courses.map((course, i) => (
                <div key={course.id} style={{
                  animation: mounted ? `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.07}s both` : "none",
                }}>
                  {/* Connector line */}
                  {i > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 0, paddingLeft: 27 }}>
                      <div style={{ width: 2, height: 28, background: course.status === "locked" ? "#dce0e6" : path.color, opacity: course.status === "locked" ? 0.5 : 0.4 }} />
                    </div>
                  )}

                  <div
                    className="course-card"
                    onClick={() => { if (course.status !== "locked") router.push(`/lernpfade/${id}/kurs/${course.id}`); }}
                    style={{
                      display: "flex", gap: 16, alignItems: "center", background: "white", borderRadius: 14,
                      border: course.status === "active" ? `2px solid ${path.color}` : "0.5px solid #dce0e6",
                      padding: "18px 22px", cursor: course.status === "locked" ? "not-allowed" : "pointer",
                      opacity: course.status === "locked" ? 0.55 : 1,
                    }}
                  >
                    {/* Step number */}
                    <div style={{
                      width: 44, height: 44, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: course.status === "done" ? 18 : 15, fontWeight: 700,
                      background: course.status === "done" ? path.color : course.status === "active" ? "white" : "#f0f2f5",
                      color: course.status === "done" ? "white" : course.status === "active" ? path.color : "#9A9AAA",
                      border: course.status === "active" ? `2.5px solid ${path.color}` : "none",
                      animation: course.status === "active" ? "pulse 2s ease-in-out infinite" : "none",
                    }}>
                      {course.status === "done" ? "✓" : course.status === "locked" ? "🔒" : i + 1}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: "#022350" }}>{course.title}</div>
                        {course.status === "active" && (
                          <span style={{ fontSize: 10, fontWeight: 700, background: path.color, color: "white", padding: "2px 8px", borderRadius: 10 }}>AKTUELL</span>
                        )}
                      </div>
                      <div style={{ fontSize: 12.5, color: "#4A4A5A", marginBottom: 8 }}>{course.description}</div>
                      <div style={{ display: "flex", gap: 16 }}>
                        <span style={{ fontSize: 11.5, color: "#9A9AAA" }}>⏱ {course.duration}</span>
                        <span style={{ fontSize: 11.5, color: "#9A9AAA" }}>📚 {course.modules} Module</span>
                        <span style={{ fontSize: 11.5, color: "#9A9AAA" }}>⭐ {course.credits} Credits</span>
                      </div>
                    </div>

                    {/* Action */}
                    {course.status === "done" && (
                      <div style={{ fontSize: 12, color: "#0FA4A0", fontWeight: 500, flexShrink: 0 }}>Wiederholen →</div>
                    )}
                    {course.status === "active" && (
                      <button className="btn-primary" style={{ padding: "8px 20px", background: path.color, color: "white", border: "none", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "sans-serif", flexShrink: 0 }}>
                        Weiterlernen →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
