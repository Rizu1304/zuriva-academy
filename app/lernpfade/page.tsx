"use client";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

const paths = [
  { id: 1, title: "Trainee Grundausbildung", description: "Der perfekte Einstieg fuer neue Mitarbeitende", color: "#0FA4A0", courses: 5, completed: 5, status: "done" as const, credits: 40 },
  { id: 2, title: "VBV Grundausbildung", description: "Pflichtausbildung fuer die VBV-Zertifizierung", color: "#022350", courses: 10, completed: 6, status: "active" as const, credits: 120 },
  { id: 3, title: "Spezialisierung Nicht-Leben", description: "Vertiefung in Sach- und Haftpflichtversicherungen", color: "#1B6FC2", courses: 8, completed: 0, status: "locked" as const, credits: 80, prerequisite: "VBV Grundausbildung" },
  { id: 4, title: "Compliance und Updates", description: "Jaehrliche Pflichtmodule und regulatorische Updates", color: "#C0392B", courses: 4, completed: 0, status: "locked" as const, credits: 30, prerequisite: "VBV Grundausbildung" },
];

export default function Lernpfade() {
  return (
    <DashboardLayout title="Lernpfade" subtitle="Dein strukturierter Weg zur VBV-Zertifizierung">
      <div style={{ maxWidth: 800, display: "flex", flexDirection: "column" }}>
        {paths.map((path, i) => {
          const progress = Math.round((path.completed / path.courses) * 100);
          return (
            <div key={path.id}>
              {i > 0 && (
                <div style={{ display: "flex", justifyContent: "center", height: 32 }}>
                  <div style={{ width: 2, height: "100%", background: path.status === "locked" ? "#E8E4DE" : "linear-gradient(180deg, #0FA4A0, #E8E4DE)" }} />
                </div>
              )}
              <div className={`z-card animate-fade-in-up stagger-${i + 1}`} style={{ padding: "26px 28px", opacity: path.status === "locked" ? 0.55 : 1, borderLeft: path.status === "active" ? "3px solid #0FA4A0" : undefined, position: "relative" }}>
                <div style={{ position: "absolute", top: 18, right: 20 }}>
                  {path.status === "done" && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0" }}>Abgeschlossen</span>}
                  {path.status === "active" && <span className="z-badge" style={{ background: "rgba(2,35,80,0.06)", color: "#022350" }}>Aktiv</span>}
                  {path.status === "locked" && <span className="z-badge" style={{ background: "#F0ECE6", color: "#9A9AAA" }}>Gesperrt</span>}
                </div>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: `${path.color}0D`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: path.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="font-heading" style={{ fontSize: 20, fontWeight: 500, color: "#022350", marginBottom: 4 }}>{path.title}</div>
                    <div style={{ fontSize: 13, color: "#9A9AAA", marginBottom: 16 }}>{path.description}</div>
                    <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
                      <span style={{ fontSize: 12, color: "#4A4A5A" }}>{path.courses} Kurse</span>
                      <span style={{ fontSize: 12, color: "#C8A24D", fontWeight: 600 }}>{path.credits} Credits</span>
                      <span style={{ fontSize: 12, color: "#4A4A5A" }}>{path.completed}/{path.courses} abgeschlossen</span>
                    </div>
                    <div className="z-progress" style={{ marginBottom: 8 }}>
                      <div className="z-progress-bar" style={{ width: progress + "%", background: path.color }} />
                    </div>
                    {path.prerequisite && <div style={{ fontSize: 11.5, color: "#9A9AAA", marginTop: 6 }}>Voraussetzung: {path.prerequisite}</div>}
                    {path.status !== "locked" && (
                      <Link href={`/lernpfade/${path.id}`} className={`z-btn ${path.status === "done" ? "z-btn-ghost" : "z-btn-primary"}`} style={{ marginTop: 14, textDecoration: "none" }}>
                        {path.status === "done" ? "Anzeigen" : "Weiterlernen"}
                      </Link>
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
