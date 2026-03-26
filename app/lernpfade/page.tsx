"use client";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Award, Lock, CheckCircle, ChevronRight, Play, Target, Clock, Users } from "lucide-react";

interface Lektion {
  id: string;
  title: string;
  type: "video" | "slides" | "text" | "quiz";
  duration: string;
  completed: boolean;
}

interface Modul {
  id: string;
  title: string;
  description: string;
  credits: number;
  lektionen: Lektion[];
}

interface Lernpfad {
  id: number;
  title: string;
  description: string;
  color: string;
  status: "done" | "active" | "locked";
  credits: number;
  prerequisite?: string;
  module: Modul[];
  zertifikat?: string;
}

const lernpfade: Lernpfad[] = [
  {
    id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg für neue Mitarbeitende. Lerne die Grundlagen der Versicherungsbranche.", color: "#0FA4A0", status: "done", credits: 40, zertifikat: "Trainee Zertifikat",
    module: [
      { id: "m1", title: "Willkommen bei Zuriva", description: "Einführung in die Zuriva Academy", credits: 5, lektionen: [
        { id: "l1", title: "Begrüssung von Mark", type: "video", duration: "3 Min.", completed: true },
        { id: "l2", title: "So funktioniert die Academy", type: "slides", duration: "5 Min.", completed: true },
        { id: "l3", title: "Dein Lernplan", type: "text", duration: "3 Min.", completed: true },
      ]},
      { id: "m2", title: "Grundlagen Versicherung", description: "Die Schweizer Versicherungslandschaft verstehen", credits: 10, lektionen: [
        { id: "l4", title: "Das 3-Säulen-System", type: "video", duration: "12 Min.", completed: true },
        { id: "l5", title: "Versicherungsarten Überblick", type: "slides", duration: "8 Min.", completed: true },
        { id: "l6", title: "Quiz: Grundbegriffe", type: "quiz", duration: "5 Min.", completed: true },
      ]},
      { id: "m3", title: "Erste Schritte im Vertrieb", description: "Kundengespräche und Beratung Basics", credits: 10, lektionen: [
        { id: "l7", title: "Der erste Kundenkontakt", type: "video", duration: "10 Min.", completed: true },
        { id: "l8", title: "Bedarfsanalyse Grundlagen", type: "slides", duration: "8 Min.", completed: true },
        { id: "l9", title: "Rollenspiel Übung", type: "text", duration: "15 Min.", completed: true },
        { id: "l10", title: "Quiz: Beratung Basics", type: "quiz", duration: "5 Min.", completed: true },
      ]},
      { id: "m4", title: "Abschlussprüfung Trainee", description: "Teste dein Wissen", credits: 15, lektionen: [
        { id: "l11", title: "Prüfungsvorbereitung", type: "text", duration: "10 Min.", completed: true },
        { id: "l12", title: "Trainee Abschlussprüfung", type: "quiz", duration: "30 Min.", completed: true },
      ]},
    ],
  },
  {
    id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung für die VBV-Zertifizierung 2026. Alle nötigen Module.", color: "#022350", status: "active", credits: 120,
    module: [
      { id: "m1", title: "Sachversicherung", description: "Gebäude-, Hausrat- und Betriebsversicherung", credits: 20, lektionen: [
        { id: "l1", title: "Einführung Sachversicherung", type: "video", duration: "12 Min.", completed: true },
        { id: "l2", title: "Gebäudeversicherung Schweiz", type: "slides", duration: "10 Min.", completed: true },
        { id: "l3", title: "Hausratversicherung", type: "slides", duration: "8 Min.", completed: true },
        { id: "l4", title: "GUSTAVO-Kantone", type: "text", duration: "5 Min.", completed: true },
        { id: "l5", title: "Prämienberechnung", type: "slides", duration: "12 Min.", completed: false },
        { id: "l6", title: "Schadenabwicklung", type: "video", duration: "10 Min.", completed: false },
        { id: "l7", title: "Quiz: Sachversicherung", type: "quiz", duration: "10 Min.", completed: false },
      ]},
      { id: "m2", title: "Lebensversicherung", description: "Säule 3a/3b, gemischte LV, Rückkaufswerte", credits: 20, lektionen: [
        { id: "l8", title: "Das 3-Säulen-System vertieft", type: "video", duration: "15 Min.", completed: true },
        { id: "l9", title: "Säule 3a und 3b", type: "slides", duration: "10 Min.", completed: false },
        { id: "l10", title: "Steuerliche Vorteile", type: "text", duration: "8 Min.", completed: false },
        { id: "l11", title: "Quiz: Lebensversicherung", type: "quiz", duration: "10 Min.", completed: false },
      ]},
      { id: "m3", title: "Beratungskompetenz", description: "Professionelle Gesprächsführung und Kundenkommunikation", credits: 20, lektionen: [
        { id: "l12", title: "Beratungsgespräch strukturieren", type: "video", duration: "10 Min.", completed: false },
        { id: "l13", title: "Aktives Zuhören", type: "slides", duration: "8 Min.", completed: false },
        { id: "l14", title: "Einwandbehandlung", type: "slides", duration: "8 Min.", completed: false },
        { id: "l15", title: "Quiz: Beratung", type: "quiz", duration: "8 Min.", completed: false },
      ]},
      { id: "m4", title: "Compliance & FIDLEG", description: "Rechtliche Grundlagen und VBV-Vorschriften", credits: 20, lektionen: [
        { id: "l16", title: "VAG und FIDLEG Überblick", type: "video", duration: "12 Min.", completed: false },
        { id: "l17", title: "Dokumentationspflichten", type: "slides", duration: "10 Min.", completed: false },
        { id: "l18", title: "Quiz: Compliance", type: "quiz", duration: "10 Min.", completed: false },
      ]},
      { id: "m5", title: "Haftpflichtversicherung", description: "Privat- und Betriebshaftpflicht", credits: 15, lektionen: [
        { id: "l19", title: "Haftpflicht Grundlagen", type: "video", duration: "10 Min.", completed: false },
        { id: "l20", title: "Schadenbeispiele", type: "slides", duration: "8 Min.", completed: false },
        { id: "l21", title: "Quiz: Haftpflicht", type: "quiz", duration: "8 Min.", completed: false },
      ]},
      { id: "m6", title: "VBV Abschlussprüfung", description: "Die grosse Abschlussprüfung zur Zertifizierung", credits: 25, lektionen: [
        { id: "l22", title: "Prüfungsvorbereitung", type: "text", duration: "15 Min.", completed: false },
        { id: "l23", title: "VBV Abschlussprüfung", type: "quiz", duration: "45 Min.", completed: false },
      ]},
    ],
  },
  {
    id: 3, title: "Spezialisierung Nicht-Leben", description: "Vertiefung in Sach- und Haftpflichtversicherungen für Experten.", color: "#1B6FC2", status: "locked", credits: 80, prerequisite: "VBV Grundausbildung",
    module: [
      { id: "m1", title: "Technische Versicherung", description: "Maschinen-, Bauwesen- und Montageversicherung", credits: 20, lektionen: [] },
      { id: "m2", title: "Transportversicherung", description: "Warentransport und Logistik", credits: 20, lektionen: [] },
      { id: "m3", title: "Betriebsunterbrechung", description: "Ertragsausfall und Mehrkosten", credits: 20, lektionen: [] },
      { id: "m4", title: "Abschlussprüfung", description: "Spezialisierung Nicht-Leben", credits: 20, lektionen: [] },
    ],
  },
  {
    id: 4, title: "Compliance Updates 2026", description: "Jährliche Pflichtmodule und regulatorische Updates.", color: "#C0392B", status: "locked", credits: 30, prerequisite: "VBV Grundausbildung",
    module: [
      { id: "m1", title: "FIDLEG Update 2026", description: "Neue Regelungen und Änderungen", credits: 10, lektionen: [] },
      { id: "m2", title: "Datenschutz Update", description: "DSG-Änderungen für Vermittler", credits: 10, lektionen: [] },
      { id: "m3", title: "Compliance-Prüfung", description: "Jährliche Pflichtprüfung", credits: 10, lektionen: [] },
    ],
  },
];

const typeIcon = (type: string) => {
  switch (type) {
    case "video": return <Play size={13} color="#C8A24D" />;
    case "slides": return <BookOpen size={13} color="#022350" />;
    case "quiz": return <Target size={13} color="#0FA4A0" />;
    default: return <BookOpen size={13} color="#4A5568" />;
  }
};

const typeLabel = (type: string) => {
  switch (type) {
    case "video": return "Video";
    case "slides": return "Slides";
    case "quiz": return "Quiz";
    default: return "Text";
  }
};

export default function Lernpfade() {
  return (
    <DashboardLayout title="Lernpfade" subtitle="Dein strukturierter Weg zur VBV-Zertifizierung">

      {/* Progress Overview */}
      <div className="z-grid-4" style={{ marginBottom: 28 }}>
        {[
          { label: "Lernpfade", value: "2/4", sub: "abgeschlossen", color: "#0FA4A0" },
          { label: "Module", value: "4/16", sub: "abgeschlossen", color: "#022350" },
          { label: "Credits", value: "342", sub: "von 600", color: "#C8A24D" },
          { label: "Nächste Prüfung", value: "3T", sub: "Sachversicherung", color: "#C0392B" },
        ].map((s, i) => (
          <div key={i} className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "20px 22px" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 8 }}>{s.label}</div>
            <div className="font-heading" style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Lernpfade */}
      <div style={{ maxWidth: 900 }}>
        {lernpfade.map((pfad, pi) => {
          const totalLektionen = pfad.module.reduce((sum, m) => sum + m.lektionen.length, 0);
          const completedLektionen = pfad.module.reduce((sum, m) => sum + m.lektionen.filter(l => l.completed).length, 0);
          const progress = totalLektionen > 0 ? Math.round((completedLektionen / totalLektionen) * 100) : 0;
          const earnedCredits = pfad.module.reduce((sum, m) => {
            const mCompleted = m.lektionen.length > 0 && m.lektionen.every(l => l.completed);
            return sum + (mCompleted ? m.credits : 0);
          }, 0);

          return (
            <div key={pfad.id}>
              {/* Connector */}
              {pi > 0 && (
                <div style={{ display: "flex", justifyContent: "center", height: 32 }}>
                  <div style={{ width: 2, height: "100%", background: pfad.status === "locked" ? "rgba(2,35,80,0.06)" : `linear-gradient(180deg, ${lernpfade[pi-1].color}, ${pfad.color})` }} />
                </div>
              )}

              {/* Lernpfad Card */}
              <div className={`z-card animate-fade-in-up stagger-${Math.min(pi + 1, 8)}`} style={{ padding: 0, marginBottom: 0, opacity: pfad.status === "locked" ? 0.5 : 1, overflow: "hidden" }}>

                {/* Header */}
                <div style={{ padding: "24px 28px", borderBottom: "1px solid rgba(2,35,80,0.04)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, background: pfad.status === "done" ? "rgba(15,164,160,0.10)" : pfad.status === "locked" ? "rgba(2,35,80,0.04)" : `${pfad.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {pfad.status === "done" ? <CheckCircle size={22} color="#0FA4A0" /> : pfad.status === "locked" ? <Lock size={22} color="#9CA3AF" /> : <BookOpen size={22} color={pfad.color} />}
                    </div>
                    <div>
                      <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350", marginBottom: 2 }}>{pfad.title}</div>
                      <div style={{ fontSize: 13, color: "#4A5568", lineHeight: 1.5 }}>{pfad.description}</div>
                      {pfad.prerequisite && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>Voraussetzung: {pfad.prerequisite}</div>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    {pfad.status === "done" && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0" }}>Abgeschlossen</span>}
                    {pfad.status === "active" && <span className="z-badge" style={{ background: `${pfad.color}10`, color: pfad.color }}>Aktiv</span>}
                    {pfad.status === "locked" && <span className="z-badge" style={{ background: "rgba(2,35,80,0.04)", color: "#9CA3AF" }}>Gesperrt</span>}
                    <span className="z-badge" style={{ background: "rgba(200,162,77,0.08)", color: "#C8A24D" }}>{pfad.credits} Credits</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {pfad.status !== "locked" && (
                  <div style={{ padding: "0 28px", marginTop: 16, marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#9CA3AF", marginBottom: 6 }}>
                      <span>{completedLektionen} von {totalLektionen} Lektionen</span>
                      <span style={{ fontWeight: 600, color: pfad.color }}>{progress}%</span>
                    </div>
                    <div className="z-progress">
                      <div className="z-progress-bar" style={{ width: `${progress}%`, background: pfad.color }} />
                    </div>
                  </div>
                )}

                {/* Module List */}
                <div style={{ padding: "16px 28px 24px" }}>
                  {pfad.module.map((modul, mi) => {
                    const mCompleted = modul.lektionen.length > 0 && modul.lektionen.every(l => l.completed);
                    const mStarted = modul.lektionen.some(l => l.completed);
                    const mProgress = modul.lektionen.length > 0 ? Math.round((modul.lektionen.filter(l => l.completed).length / modul.lektionen.length) * 100) : 0;
                    const isCurrentModule = pfad.status === "active" && mStarted && !mCompleted;

                    return (
                      <div key={modul.id} style={{ padding: "14px 16px", borderRadius: 12, marginBottom: 6, background: isCurrentModule ? "rgba(2,35,80,0.03)" : "transparent", borderLeft: isCurrentModule ? `3px solid ${pfad.color}` : "3px solid transparent", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: mCompleted ? "#0FA4A0" : mStarted ? pfad.color : "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {mCompleted ? <CheckCircle size={13} color="white" /> : <span style={{ fontSize: 11, fontWeight: 700, color: mStarted ? "white" : "#9CA3AF" }}>{mi + 1}</span>}
                            </div>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: isCurrentModule ? 600 : 500, color: "#022350" }}>{modul.title}</div>
                              <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", gap: 8, marginTop: 2 }}>
                                <span>{modul.lektionen.length} Lektionen</span>
                                <span>{modul.credits} Credits</span>
                                {mStarted && !mCompleted && <span style={{ color: pfad.color, fontWeight: 600 }}>{mProgress}%</span>}
                              </div>
                            </div>
                          </div>
                          {pfad.status !== "locked" && modul.lektionen.length > 0 && (
                            <Link href={`/lernpfade/${pfad.id}/modul/${modul.id}`} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: pfad.color, textDecoration: "none" }}>
                              {mCompleted ? "Wiederholen" : mStarted ? "Weiter" : "Starten"} <ChevronRight size={14} />
                            </Link>
                          )}
                        </div>

                        {/* Show Lektionen for current module */}
                        {isCurrentModule && (
                          <div style={{ marginTop: 10, paddingLeft: 34, display: "flex", flexDirection: "column", gap: 4 }}>
                            {modul.lektionen.map(lek => (
                              <div key={lek.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: 12 }}>
                                {lek.completed ? <CheckCircle size={14} color="#0FA4A0" /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid rgba(2,35,80,0.15)" }} />}
                                <span style={{ color: lek.completed ? "#9CA3AF" : "#022350", textDecoration: lek.completed ? "line-through" : "none" }}>{lek.title}</span>
                                <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, color: "#9CA3AF" }}>
                                  {typeIcon(lek.type)}
                                  <span style={{ fontSize: 10 }}>{typeLabel(lek.type)} · {lek.duration}</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Zertifikat */}
                {pfad.zertifikat && pfad.status === "done" && (
                  <div style={{ padding: "16px 28px", borderTop: "1px solid rgba(2,35,80,0.04)", display: "flex", alignItems: "center", gap: 10 }}>
                    <Award size={18} color="#C8A24D" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#C8A24D" }}>{pfad.zertifikat} erhalten</span>
                    <Link href="/zertifikate" style={{ marginLeft: "auto", fontSize: 12, color: "#022350", textDecoration: "none", fontWeight: 500 }}>Ansehen</Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
