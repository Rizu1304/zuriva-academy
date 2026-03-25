"use client";
import DashboardLayout from "@/components/DashboardLayout";

const certs = [
  { id: 1, title: "Trainee Grundausbildung", course: "Trainee Grundausbildung", date: "01.03.2026", score: 94, credits: 40, verified: true },
  { id: 2, title: "Beratungskompetenz", course: "Beratungskompetenz und Kundenkommunikation", date: "15.02.2026", score: 88, credits: 10, verified: true },
];

export default function Zertifikate() {
  return (
    <DashboardLayout title="Meine Zertifikate" subtitle={`${certs.length} Zertifikate erhalten`}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 900 }}>
        {certs.map((cert, i) => (
          <div key={cert.id} className={`animate-scale-in stagger-${i + 1}`} style={{ borderRadius: 24, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
            {/* Header */}
            <div style={{ background: "linear-gradient(135deg, rgba(15,164,160,0.15), rgba(212,168,67,0.1))", padding: "32px 28px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(212,168,67,0.08)" }} />
              <div style={{ position: "absolute", bottom: -40, left: 20, width: 100, height: 100, borderRadius: "50%", background: "rgba(15,164,160,0.06)" }} />
              <div style={{ position: "relative" }}>
                <div className="gold-gradient-text" style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Zuriva Academy</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "white", marginBottom: 4, lineHeight: 1.2, letterSpacing: "-0.01em" }}>{cert.title}</div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>Laura Meier · {cert.date}</div>
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", gap: 24, marginBottom: 20 }}>
                {/* Score */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ position: "relative", width: 56, height: 56, margin: "0 auto 6px" }}>
                    <svg width="56" height="56" viewBox="0 0 56 56">
                      <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                      <circle cx="28" cy="28" r="22" fill="none" stroke="#0FA4A0" strokeWidth="4" strokeLinecap="round" strokeDasharray="138" strokeDashoffset={138 - (138 * cert.score) / 100} className="progress-ring-circle" />
                    </svg>
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#5EEAD4" }}>{cert.score}%</div>
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Score</div>
                </div>
                {/* Credits */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(212,168,67,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 6px" }}>
                    <span className="gold-gradient-text" style={{ fontSize: 22, fontWeight: 800 }}>{cert.credits}</span>
                  </div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>Credits</div>
                </div>
                {/* Verified */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                  {cert.verified && (
                    <div style={{ background: "rgba(15,164,160,0.1)", color: "#5EEAD4", fontSize: 11.5, fontWeight: 700, padding: "6px 14px", borderRadius: 14, display: "flex", alignItems: "center", gap: 6, border: "1px solid rgba(15,164,160,0.15)" }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                      Verifiziert
                    </div>
                  )}
                </div>
              </div>
              <button className="premium-btn" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                PDF herunterladen
              </button>
            </div>
          </div>
        ))}
      </div>

      {certs.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ width: 80, height: 80, borderRadius: 24, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Noch keine Zertifikate</div>
          <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.3)" }}>Schliesse Kurse ab um Zertifikate zu erhalten</div>
        </div>
      )}
    </DashboardLayout>
  );
}
