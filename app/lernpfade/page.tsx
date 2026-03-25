"use client";
import DashboardLayout from "@/components/DashboardLayout";

const paths = [
  { id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg fuer neue Mitarbeitende", icon: GradCapIcon, color: "#0FA4A0", courses: 5, completed: 5, status: "done" as const, credits: 40 },
  { id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung fuer die VBV-Zertifizierung", icon: ClipboardIcon, color: "#818CF8", courses: 10, completed: 6, status: "active" as const, credits: 120, prerequisite: null },
  { id: 3, title: "Spezialisierung Nicht-Leben", description: "Vertiefung in Sach- und Haftpflichtversicherungen", icon: BuildingIcon, color: "#D4A843", courses: 8, completed: 0, status: "locked" as const, credits: 80, prerequisite: "VBV Grundausbildung" },
  { id: 4, title: "Compliance und Updates", description: "Jaehrliche Pflichtmodule und regulatorische Updates", icon: ShieldIcon, color: "#ef4444", courses: 4, completed: 0, status: "locked" as const, credits: 30, prerequisite: "VBV Grundausbildung" },
];

export default function Lernpfade() {
  return (
    <DashboardLayout title="Lernpfade" subtitle="Dein strukturierter Weg zur VBV-Zertifizierung">
      <div style={{ maxWidth: 800, display: "flex", flexDirection: "column", gap: 0 }}>
        {paths.map((path, i) => {
          const progress = Math.round((path.completed / path.courses) * 100);
          return (
            <div key={path.id}>
              {/* Connector */}
              {i > 0 && (
                <div style={{ display: "flex", justifyContent: "center", height: 40 }}>
                  <div style={{ width: 2, height: "100%", background: path.status === "locked" ? "rgba(255,255,255,0.06)" : "linear-gradient(180deg, #0FA4A0, rgba(15,164,160,0.2))" }} />
                </div>
              )}

              {/* Path Card */}
              <div
                className={`animate-fade-in-up stagger-${i + 1}`}
                style={{
                  borderRadius: 24,
                  border: path.status === "active" ? "1px solid rgba(15,164,160,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  background: path.status === "active" ? "rgba(15,164,160,0.06)" : "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  padding: "28px 32px",
                  opacity: path.status === "locked" ? 0.5 : 1,
                  position: "relative",
                  overflow: "hidden",
                  transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                {/* Status Badge */}
                <div style={{ position: "absolute", top: 20, right: 20 }}>
                  {path.status === "done" && (
                    <span style={{ background: "rgba(15,164,160,0.15)", color: "#5EEAD4", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20, display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      Abgeschlossen
                    </span>
                  )}
                  {path.status === "active" && (
                    <span className="animate-pulse-glow" style={{ background: "rgba(15,164,160,0.2)", color: "#5EEAD4", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20 }}>Aktiv</span>
                  )}
                  {path.status === "locked" && (
                    <span style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)", fontSize: 11, fontWeight: 800, padding: "5px 12px", borderRadius: 20, display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      Gesperrt
                    </span>
                  )}
                </div>

                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  {/* Icon */}
                  <div style={{ width: 56, height: 56, borderRadius: 18, background: `${path.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1px solid ${path.color}25` }}>
                    <path.icon color={path.color} />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: "white", marginBottom: 6, letterSpacing: "-0.01em" }}>{path.title}</div>
                    <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.45)", marginBottom: 18 }}>{path.description}</div>

                    {/* Stats */}
                    <div style={{ display: "flex", gap: 24, marginBottom: 18 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "rgba(255,255,255,0.4)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                        {path.courses} Kurse
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "rgba(255,255,255,0.4)" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        {path.credits} Credits
                      </div>
                      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)" }}>{path.completed}/{path.courses} abgeschlossen</div>
                    </div>

                    {/* Progress */}
                    <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,0.06)", marginBottom: 10 }}>
                      <div style={{ height: 6, borderRadius: 6, background: `linear-gradient(90deg, ${path.color}, ${path.color}88)`, width: progress + "%", boxShadow: progress > 0 ? `0 0 12px ${path.color}30` : "none", transition: "width 1s ease" }} />
                    </div>

                    {path.prerequisite && (
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4, display: "flex", alignItems: "center", gap: 5 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                        Voraussetzung: {path.prerequisite}
                      </div>
                    )}

                    {path.status !== "locked" && (
                      <button className="premium-btn" style={{ marginTop: 16, background: path.status === "done" ? "rgba(255,255,255,0.06)" : undefined, border: path.status === "done" ? "1px solid rgba(255,255,255,0.1)" : undefined, color: path.status === "done" ? "rgba(255,255,255,0.6)" : "white" }}>
                        {path.status === "done" ? "Anzeigen" : "Weiterlernen"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}

function GradCapIcon({ color }: { color: string }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" /></svg>;
}
function ClipboardIcon({ color }: { color: string }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>;
}
function BuildingIcon({ color }: { color: string }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>;
}
function ShieldIcon({ color }: { color: string }) {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
}
