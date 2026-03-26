"use client";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";
import { BookOpen, Award, Lock, CheckCircle, ChevronRight, Play, Target, Clock } from "lucide-react";
import { lernpfade } from "@/lib/lernpfade-data";

const typeIcon = (type: string) => {
  switch (type) {
    case "video": return <Play size={13} color="#C8A24D" />;
    case "slides": return <BookOpen size={13} color="#022350" />;
    case "quiz": return <Target size={13} color="#0FA4A0" />;
    default: return <BookOpen size={13} color="#4A5568" />;
  }
};

const typeLabel = (type: string) => {
  switch (type) { case "video": return "Video"; case "slides": return "Slides"; case "quiz": return "Quiz"; default: return "Text"; }
};

export default function Lernpfade() {
  return (
    <DashboardLayout title="Lernpfade" subtitle="Dein strukturierter Weg zur VBV-Zertifizierung">

      {/* Progress Overview */}
      <div className="z-grid-4" style={{ marginBottom: 28 }}>
        {[
          { label: "Lernpfade", value: `${lernpfade.filter(p => p.status === "done").length}/${lernpfade.length}`, sub: "abgeschlossen", color: "#0FA4A0" },
          { label: "Total Stunden", value: `${lernpfade.reduce((s, p) => s + p.hours, 0)}h`, sub: "Lernstoff", color: "#022350" },
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
                    <span className="z-badge" style={{ background: "rgba(200,162,77,0.08)", color: "#C8A24D" }}>{pfad.hours}h</span>
                    <span className="z-badge" style={{ background: "rgba(2,35,80,0.04)", color: "#4A5568" }}>{pfad.credits} Cr</span>
                  </div>
                </div>

                {/* Exam Info */}
                {pfad.examInfo && (
                  <div style={{ padding: "8px 28px", background: "rgba(200,162,77,0.04)", fontSize: 12, color: "#9A7B35", display: "flex", alignItems: "center", gap: 6 }}>
                    <Target size={12} /> VBV-Prüfung: {pfad.examInfo}
                  </div>
                )}

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
                    const isOpen = pfad.status === "active" || pfad.status === "done";

                    return (
                      <div key={modul.id} style={{ padding: "14px 16px", borderRadius: 12, marginBottom: 6, background: mStarted && !mCompleted ? "rgba(2,35,80,0.03)" : "transparent", borderLeft: mStarted && !mCompleted ? `3px solid ${pfad.color}` : "3px solid transparent", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: mCompleted ? "#0FA4A0" : mStarted ? pfad.color : "rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              {mCompleted ? <CheckCircle size={13} color="white" /> : <span style={{ fontSize: 11, fontWeight: 700, color: mStarted ? "white" : "#9CA3AF" }}>{mi + 1}</span>}
                            </div>
                            <div>
                              <div style={{ fontSize: 14, fontWeight: mStarted ? 600 : 500, color: "#022350" }}>{modul.title}</div>
                              <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", gap: 8, marginTop: 2 }}>
                                <span>{modul.lektionen.length} Lektionen</span>
                                <span>{modul.credits} Credits</span>
                                {mStarted && !mCompleted && <span style={{ color: pfad.color, fontWeight: 600 }}>{mProgress}%</span>}
                              </div>
                            </div>
                          </div>
                          {isOpen && modul.lektionen.length > 0 && (
                            <Link href={`/lernpfade/${pfad.id}/modul/${modul.id}/lektion/${modul.lektionen[0].id}`} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: pfad.color, textDecoration: "none" }}>
                              {mCompleted ? "Wiederholen" : mStarted ? "Weiter" : "Starten"} <ChevronRight size={14} />
                            </Link>
                          )}
                        </div>

                        {/* Show Lektionen */}
                        {isOpen && (
                          <div style={{ marginTop: 10, paddingLeft: 34, display: "flex", flexDirection: "column", gap: 4 }}>
                            {modul.lektionen.map(lek => (
                              <Link key={lek.id} href={`/lernpfade/${pfad.id}/modul/${modul.id}/lektion/${lek.id}`} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", fontSize: 12, textDecoration: "none", color: "inherit", borderRadius: 8, transition: "all 0.15s" }}>
                                {lek.completed ? <CheckCircle size={14} color="#0FA4A0" /> : <div style={{ width: 14, height: 14, borderRadius: "50%", border: "1.5px solid rgba(2,35,80,0.15)" }} />}
                                <span style={{ color: lek.completed ? "#9CA3AF" : "#022350", flex: 1 }}>{lek.title}</span>
                                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#9CA3AF" }}>
                                  {typeIcon(lek.type)}
                                  <span style={{ fontSize: 10 }}>{typeLabel(lek.type)} · {lek.duration}</span>
                                </span>
                              </Link>
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
