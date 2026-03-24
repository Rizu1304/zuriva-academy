"use client";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const certs = [
  { id: 1, title: "Trainee Grundausbildung", course: "Trainee Grundausbildung", date: "01.03.2026", score: 94, credits: 40, verified: true },
  { id: 2, title: "Beratungskompetenz", course: "Beratungskompetenz und Kundenkommunikation", date: "15.02.2026", score: 88, credits: 10, verified: true },
];

function downloadCert(cert: typeof certs[0]) {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"/>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
  @page { size: A4 landscape; margin: 0; }
  body { margin: 0; font-family: 'DM Sans', sans-serif; }
  .cert { width: 297mm; height: 210mm; position: relative; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden; }
  .border { position: absolute; inset: 12mm; border: 2px solid #C8A24D; border-radius: 4px; }
  .corner { position: absolute; width: 40px; height: 40px; border-color: #022350; border-style: solid; }
  .tl { top: 8mm; left: 8mm; border-width: 3px 0 0 3px; }
  .tr { top: 8mm; right: 8mm; border-width: 3px 3px 0 0; }
  .bl { bottom: 8mm; left: 8mm; border-width: 0 0 3px 3px; }
  .br { bottom: 8mm; right: 8mm; border-width: 0 3px 3px 0; }
  .logo { font-family: 'Cormorant Garamond', serif; font-size: 28px; letter-spacing: 0.18em; color: #022350; font-weight: 400; }
  .academy { font-size: 12px; color: #C8A24D; margin-left: 8px; font-weight: 500; }
  .label { font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #C8A24D; font-weight: 600; margin-top: 24px; }
  .title { font-family: 'Cormorant Garamond', serif; font-size: 42px; color: #022350; font-weight: 400; margin: 12px 0 8px; }
  .name { font-family: 'Cormorant Garamond', serif; font-size: 26px; color: #022350; margin: 20px 0 4px; }
  .sub { font-size: 13px; color: #4A4A5A; }
  .stats { display: flex; gap: 40px; margin-top: 28px; }
  .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 28px; color: #0FA4A0; font-weight: 600; }
  .stat-label { font-size: 10px; color: #9A9AAA; margin-top: 2px; }
  .stat-gold .stat-val { color: #C8A24D; }
  .footer { position: absolute; bottom: 20mm; display: flex; gap: 60px; align-items: center; }
  .line { width: 160px; border-top: 1px solid #022350; padding-top: 6px; font-size: 11px; color: #4A4A5A; text-align: center; }
  .verified { margin-top: 20px; font-size: 11px; color: #0FA4A0; font-weight: 600; }
  .date { font-size: 12px; color: #9A9AAA; margin-top: 4px; }
</style></head><body>
<div class="cert">
  <div class="border"></div>
  <div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>
  <div><span class="logo">ZURIVA</span><span class="academy">academy</span></div>
  <div class="label">Zertifikat</div>
  <div class="title">${cert.title}</div>
  <div class="sub">Kurs: ${cert.course}</div>
  <div class="name">Laura Meier</div>
  <div class="sub">hat diesen Kurs erfolgreich abgeschlossen.</div>
  <div class="stats">
    <div><div class="stat-val">${cert.score}%</div><div class="stat-label">Score</div></div>
    <div class="stat-gold"><div class="stat-val">${cert.credits}</div><div class="stat-label">Credits</div></div>
  </div>
  <div class="verified">✓ Verifiziert</div>
  <div class="date">${cert.date} · Dübendorf, Zürich</div>
  <div class="footer">
    <div class="line">Zuriva GmbH</div>
    <div class="line">Unterschrift</div>
  </div>
</div>
<script>window.onload=()=>{window.print();}<\/script>
</body></html>`;
  const w = window.open("", "_blank");
  if (w) { w.document.write(html); w.document.close(); }
}

export default function Zertifikate() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: "linear-gradient(135deg, #FAF8F5 0%, #F0ECE6 50%, #FAF8F5 100%)", overflow: "hidden" }}>
      {/* Sidebar */}
      <aside style={{ width: 260, minWidth: 260, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", borderRight: "1px solid rgba(255,255,255,0.5)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "28px 24px 24px", display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 400, letterSpacing: "0.18em", color: "#022350", fontFamily: h }}>ZURIVA</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", marginLeft: 8 }}>academy</span>
        </div>
        <div style={{ padding: "0 12px" }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>LERNEN</div>
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Kurse", href: "/courses" },
            { name: "Lernpfade", href: "/lernpfade" },
            { name: "Prüfungen", href: "/pruefungen" },
            { name: "Zertifikate", href: "/zertifikate", active: true },
            { name: "Forum", href: "/forum" },
            { name: "Kahoot", href: "/kahoot" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: item.active ? "#022350" : "#4A4A5A", background: item.active ? "rgba(255,255,255,0.8)" : "transparent", borderRadius: 12, boxShadow: item.active ? "0 1px 8px rgba(2,35,80,0.06)" : "none", fontWeight: item.active ? 500 : 400, fontSize: 13, textDecoration: "none", display: "block", transition: "all 0.2s ease" }}>{item.name}</a>
          ))}
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8A24D", padding: "16px 12px 8px" }}>ADMIN</div>
          {[
            { name: "Übersicht", href: "/admin" },
            { name: "Kurseditor", href: "/admin/kurse" },
            { name: "Prüfungseditor", href: "/admin/pruefungen" },
            { name: "Team", href: "/admin/team" },
          ].map((item) => (
            <a key={item.name} href={item.href} style={{ padding: "10px 14px", margin: "2px 0", color: "#4A4A5A", background: "transparent", borderRadius: 12, fontSize: 13, textDecoration: "none", display: "block", transition: "all 0.2s ease" }}>{item.name}</a>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ padding: "16px 20px", margin: "0 12px 12px", background: "rgba(255,255,255,0.6)", borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 12, background: "linear-gradient(135deg, #022350, #0E3057)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "white" }}>LM</div>
          <div><div style={{ fontSize: 12.5, fontWeight: 500, color: "#022350" }}>Laura Meier</div><div style={{ fontSize: 11, color: "#9A9AAA" }}>Vermittlerin</div></div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 400, color: "#022350", fontFamily: h }}>Meine Zertifikate</div>
            <div style={{ fontSize: 12, color: "#9A9AAA" }}>{certs.length} Zertifikate erhalten</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 900 }}>
            {certs.map(cert => (
              <div key={cert.id} style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 2px 24px rgba(2,35,80,0.04)", overflow: "hidden", transition: "all 0.2s ease" }}>
                <div style={{ background: "linear-gradient(135deg, #022350, #0E3057)", padding: "28px 28px 24px", position: "relative", overflow: "hidden", borderRadius: "20px 20px 0 0" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(200,162,77,0.15)" }} />
                  <div style={{ position: "absolute", bottom: -30, left: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(15,164,160,0.1)" }} />
                  <div style={{ position: "relative" }}>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C8A24D", marginBottom: 8 }}>Zuriva Academy</div>
                    <div style={{ fontSize: 24, fontWeight: 600, color: "white", marginBottom: 4, lineHeight: 1.2, fontFamily: h }}>{cert.title}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>Laura Meier · {cert.date}</div>
                  </div>
                </div>
                <div style={{ padding: "20px 28px" }}>
                  <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#0FA4A0", fontFamily: h }}>{cert.score}%</div>
                      <div style={{ fontSize: 11, color: "#9A9AAA" }}>Score</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#C8A24D", fontFamily: h }}>{cert.credits}</div>
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
                  <button onClick={() => downloadCert(cert)} style={{ width: "100%", padding: "10px", background: "linear-gradient(135deg, #022350, #0E3057)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>
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
