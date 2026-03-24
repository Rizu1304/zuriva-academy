"use client";

const certs = [
  { id: 1, title: "Trainee Grundausbildung", course: "Trainee Grundausbildung", date: "01.03.2026", score: 94, credits: 40, verified: true },
  { id: 2, title: "Beratungskompetenz", course: "Beratungskompetenz und Kundenkommunikation", date: "15.02.2026", score: 88, credits: 10, verified: true },
];

const heading = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const body = "var(--font-dm-sans, 'DM Sans', sans-serif)";

export default function Zertifikate() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: body, background: "#F0F2F5", overflow: "hidden" }}>
      <aside style={{ width: 248, minWidth: 248, background: "white", borderRight: "0.5px solid #dce0e6", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "24px 22px 20px", borderBottom: "0.5px solid #dce0e6", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: "0.12em", color: "#022350", fontFamily: heading }}>ZURIVA</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: "#C8A24D" }}>academy</span>
        </div>
        {[
          { name: "Dashboard", href: "/dashboard" },
          { name: "Kurse", href: "/courses" },
          { name: "Lernpfade", href: "/lernpfade" },
          { name: "Prüfungen", href: "/pruefungen" },
          { name: "Zertifikate", href: "/zertifikate", active: true },
          { name: "Forum", href: "/forum" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "#EEF5FF" : "transparent", borderLeft: item.active ? "2.5px solid #0FA4A0" : "2.5px solid transparent", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9A9AAA", padding: "18px 22px 6px" }}>Admin</div>
        {[
          { name: "Übersicht", href: "/admin" },
          { name: "Kurseditor", href: "/admin/kurse" },
          { name: "Prüfungseditor", href: "/admin/pruefungen" },
          { name: "Team", href: "/admin/team" },
        ].map((item) => (
          <a key={item.name} href={item.href} style={{ padding: "9px 22px", color: "#4A4A5A", background: "transparent", borderLeft: "2.5px solid transparent", fontSize: 13, textDecoration: "none", display: "block" }}>{item.name}</a>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: "14px 22px", borderTop: "0.5px solid #dce0e6", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #0a7a77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", borderBottom: "0.5px solid #dce0e6", height: 60, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: "#022350", fontFamily: heading }}>Meine Zertifikate</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>{certs.length} Zertifikate erhalten</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #0FA4A0, #0a7a77)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "white" }}>LM</div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 900 }}>
            {certs.map(cert => (
              <div key={cert.id} style={{ background: "white", borderRadius: 16, border: "0.5px solid #dce0e6", overflow: "hidden" }}>
                <div style={{ background: "#022350", padding: "28px 28px 24px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(200,162,77,0.15)" }} />
                  <div style={{ position: "absolute", bottom: -30, left: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(15,164,160,0.1)" }} />
                  <div style={{ position: "relative" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 8 }}>Zuriva Academy</div>
                    <div style={{ fontSize: 24, fontWeight: 600, color: "white", marginBottom: 4, lineHeight: 1.2, fontFamily: heading }}>{cert.title}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Laura Meier · {cert.date}</div>
                  </div>
                </div>
                <div style={{ padding: "20px 28px" }}>
                  <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#0FA4A0", fontFamily: heading }}>{cert.score}%</div>
                      <div style={{ fontSize: 11, color: "#9A9AAA" }}>Score</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#C8A24D", fontFamily: heading }}>{cert.credits}</div>
                      <div style={{ fontSize: 11, color: "#9A9AAA" }}>Credits</div>
                    </div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                      {cert.verified && (
                        <div style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                          ✓ Verifiziert
                        </div>
                      )}
                    </div>
                  </div>
                  <button style={{ width: "100%", padding: "10px", background: "#022350", color: "white", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: body }}>
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
        </div>
      </div>
    </div>
  );
}
