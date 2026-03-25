"use client";
import DashboardLayout from "@/components/DashboardLayout";

const certs = [
  { id: 1, title: "Trainee Grundausbildung", course: "Trainee Grundausbildung", date: "01.03.2026", score: 94, credits: 40, verified: true },
  { id: 2, title: "Beratungskompetenz", course: "Beratungskompetenz und Kundenkommunikation", date: "15.02.2026", score: 88, credits: 10, verified: true },
];

export default function Zertifikate() {
  return (
    <DashboardLayout title="Meine Zertifikate" subtitle={`${certs.length} Zertifikate erhalten`}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 900 }}>
        {certs.map((cert, i) => (
          <div key={cert.id} className={`animate-scale-in stagger-${i + 1}`} style={{ borderRadius: 16, overflow: "hidden", border: "1px solid #E8E4DE", background: "white" }}>
            {/* Certificate Header */}
            <div className="z-card-navy" style={{ padding: "30px 28px 26px", borderRadius: 0 }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(200,162,77,0.1)" }} />
              <div style={{ position: "absolute", bottom: -30, left: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(15,164,160,0.06)" }} />
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 10 }}>Zuriva Academy</div>
                <div className="font-heading" style={{ fontSize: 24, fontWeight: 500, color: "white", lineHeight: 1.2, marginBottom: 4 }}>{cert.title}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 10 }}>Laura Meier · {cert.date}</div>
              </div>
            </div>

            {/* Certificate Body */}
            <div style={{ padding: "22px 28px 24px" }}>
              <div style={{ display: "flex", gap: 24, marginBottom: 18 }}>
                <div style={{ textAlign: "center" }}>
                  <div className="font-heading" style={{ fontSize: 30, fontWeight: 500, color: "#0FA4A0" }}>{cert.score}%</div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>Score</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div className="font-heading" style={{ fontSize: 30, fontWeight: 500, color: "#C8A24D" }}>{cert.credits}</div>
                  <div style={{ fontSize: 11, color: "#9A9AAA" }}>Credits</div>
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  {cert.verified && <span className="z-badge" style={{ background: "rgba(15,164,160,0.08)", color: "#0FA4A0", padding: "5px 12px" }}>Verifiziert</span>}
                </div>
              </div>
              <button className="z-btn z-btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                PDF herunterladen
              </button>
            </div>
          </div>
        ))}
      </div>

      {certs.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#9A9AAA" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#4A4A5A", marginBottom: 8 }}>Noch keine Zertifikate</div>
          <div style={{ fontSize: 13 }}>Schliesse Kurse ab um Zertifikate zu erhalten</div>
        </div>
      )}
    </DashboardLayout>
  );
}
