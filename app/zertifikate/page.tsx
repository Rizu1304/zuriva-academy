"use client";
import {
  LayoutDashboard, BookOpen, Map, MessageSquare, Clock, Award, Settings, Gamepad2,
  Bell, CheckCircle, GraduationCap,
} from "lucide-react";

const h = "var(--font-cormorant, 'Cormorant Garamond', serif)";
const b = "var(--font-dm-sans, 'DM Sans', sans-serif)";

const marine = "#022350";
const marineMid = "#0E3057";
const bgColor = "#E4E8F0";
const glass = {
  background: "rgba(255,255,255,0.85)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.6)",
  boxShadow: "0 2px 20px rgba(2,35,80,0.06)",
} as const;

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard", active: false },
  { icon: BookOpen, label: "Kurse", href: "/courses", active: false },
  { icon: Map, label: "Lernpfade", href: "/lernpfade", active: false },
  { icon: MessageSquare, label: "Forum", href: "/forum", active: false },
  { icon: Clock, label: "Prüfungen", href: "/pruefungen", active: false },
  { icon: Award, label: "Zertifikate", href: "/zertifikate", active: true },
];

const adminItems = [
  { icon: Settings, label: "Admin", href: "/admin", active: false },
  { icon: Gamepad2, label: "Kahoot", href: "/kahoot", active: false },
];

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
    <div style={{ display: "flex", height: "100vh", fontFamily: b, background: bgColor, overflow: "hidden" }}>

      {/* ═══ ICON SIDEBAR ═══ */}
      <aside style={{ width: 64, minWidth: 64, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 20, paddingBottom: 16, gap: 4 }}>
        {/* Logo */}
        <div style={{ width: 42, height: 42, borderRadius: 14, background: marine, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 2px 12px rgba(2,35,80,0.25)" }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "white", fontFamily: h, letterSpacing: "0.1em" }}>Z</span>
        </div>

        {/* Nav icons */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: item.active ? "rgba(255,255,255,0.9)" : "transparent",
              boxShadow: item.active ? "0 2px 10px rgba(2,35,80,0.08)" : "none",
              textDecoration: "none", color: item.active ? marine : "#8090A0", transition: "all 0.2s",
            }}><item.icon size={20} strokeWidth={item.active ? 2.2 : 1.8} /></a>
          ))}
          <div style={{ height: 1, background: "rgba(2,35,80,0.08)", margin: "8px 8px" }} />
          {adminItems.map((item) => (
            <a key={item.label} href={item.href} title={item.label} style={{
              width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", textDecoration: "none", color: "#8090A0",
            }}><item.icon size={20} strokeWidth={1.8} /></a>
          ))}
        </div>

        {/* Notification + Avatar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: "#8090A0", cursor: "pointer" }}><Bell size={20} /></div>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: `linear-gradient(135deg, ${marine}, ${marineMid})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", boxShadow: "0 2px 8px rgba(2,35,80,0.2)" }}>LM</div>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 700, color: marine }}>Meine Zertifikate</div>
            <div style={{ fontSize: 12, color: "#8090A0" }}>{certs.length} Zertifikate erhalten</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 36px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 900 }}>
            {certs.map(cert => (
              <div key={cert.id} style={{ ...glass, overflow: "hidden", transition: "all 0.2s ease" }}>
                <div style={{ background: `linear-gradient(135deg, ${marine}, ${marineMid})`, padding: "28px 28px 24px", position: "relative", overflow: "hidden", borderRadius: "22px 22px 0 0" }}>
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
                      <div style={{ fontSize: 11, color: "#8090A0" }}>Score</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 28, fontWeight: 700, color: "#C8A24D", fontFamily: h }}>{cert.credits}</div>
                      <div style={{ fontSize: 11, color: "#8090A0" }}>Credits</div>
                    </div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                      {cert.verified && (
                        <div style={{ background: "rgba(15,164,160,0.1)", color: "#0FA4A0", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, display: "flex", alignItems: "center", gap: 4 }}>
                          <CheckCircle size={12} /> Verifiziert
                        </div>
                      )}
                    </div>
                  </div>
                  <button onClick={() => downloadCert(cert)} style={{ width: "100%", padding: "10px", background: `linear-gradient(135deg, ${marine}, ${marineMid})`, color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: b, transition: "all 0.2s ease" }}>
                    PDF herunterladen
                  </button>
                </div>
              </div>
            ))}
          </div>

          {certs.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#8090A0" }}>
              <div style={{ marginBottom: 16 }}><GraduationCap size={48} color="#8090A0" /></div>
              <div style={{ fontSize: 16, fontWeight: 500, color: "#4A4A5A", marginBottom: 8 }}>Noch keine Zertifikate</div>
              <div style={{ fontSize: 13 }}>Schliesse Kurse ab um Zertifikate zu erhalten</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
