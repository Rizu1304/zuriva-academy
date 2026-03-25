"use client";
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";

export default function Profil() {
  const [name, setName] = useState("Laura Meier");
  const [email, setEmail] = useState("laura@zuriva.ch");
  const [role] = useState("Vermittlerin");
  const [notifications, setNotifications] = useState({ email: true, push: true, weekly: false });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Mein Profil" subtitle="Kontoeinstellungen verwalten">
      <div style={{ maxWidth: 700 }}>

        {/* Profile Card */}
        <div className="z-card-static animate-fade-in-up" style={{ padding: "32px 36px", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 28 }}>
            <div style={{ width: 72, height: 72, borderRadius: 18, background: "linear-gradient(135deg, #C8A24D, #E0B95F)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#022350" }}>LM</div>
            <div>
              <div className="font-heading" style={{ fontSize: 26, fontWeight: 400, color: "#022350" }}>{name}</div>
              <div style={{ fontSize: 13, color: "#9A9AAA" }}>{role} · Zuriva Academy</div>
              <div style={{ fontSize: 12, color: "#C8A24D", fontWeight: 600, marginTop: 4 }}>342 Credits · VBV 57%</div>
            </div>
          </div>

          <div className="z-gold-line" style={{ marginBottom: 24 }} />

          <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 16 }}>Persoenliche Daten</div>

          <div className="z-grid-2" style={{ gap: 14, marginBottom: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Vorname & Nachname</label>
              <input value={name} onChange={e => setName(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>E-Mail</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
            </div>
          </div>

          <div className="z-grid-2" style={{ gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Rolle</label>
              <input value={role} disabled style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#FAF8F5", color: "#9A9AAA" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Mitglied seit</label>
              <input value="Januar 2026" disabled style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#FAF8F5", color: "#9A9AAA" }} />
            </div>
          </div>

          <button onClick={handleSave} className="z-btn z-btn-primary">
            {saved ? "Gespeichert!" : "Aenderungen speichern"}
          </button>
        </div>

        {/* Password */}
        <div className="z-card-static animate-fade-in-up stagger-2" style={{ padding: "28px 36px", marginBottom: 24 }}>
          <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Passwort aendern</div>
          <div className="z-gold-line" style={{ marginBottom: 18 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Aktuelles Passwort</label>
              <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div className="z-grid-2" style={{ gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Neues Passwort</label>
                <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, color: "#022350", marginBottom: 5 }}>Passwort bestaetigen</label>
                <input type="password" placeholder="••••••••" style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1px solid #ECE8E1", fontSize: 13.5, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
          <button className="z-btn z-btn-ghost">Passwort aendern</button>
        </div>

        {/* Notifications */}
        <div className="z-card-static animate-fade-in-up stagger-3" style={{ padding: "28px 36px", marginBottom: 24 }}>
          <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Benachrichtigungen</div>
          <div className="z-gold-line" style={{ marginBottom: 18 }} />

          {[
            { key: "email" as const, label: "E-Mail Benachrichtigungen", desc: "Kurs-Updates, Pruefungserinnerungen, Zertifikate" },
            { key: "push" as const, label: "Push-Benachrichtigungen", desc: "Echtzeit-Benachrichtigungen im Browser" },
            { key: "weekly" as const, label: "Woechentlicher Fortschrittsbericht", desc: "Zusammenfassung deiner Lernaktivitaeten per E-Mail" },
          ].map((n) => (
            <div key={n.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #F0ECE6" }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "#022350" }}>{n.label}</div>
                <div style={{ fontSize: 12, color: "#9A9AAA" }}>{n.desc}</div>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [n.key]: !notifications[n.key] })}
                style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", background: notifications[n.key] ? "#0FA4A0" : "#ECE8E1", position: "relative", transition: "background 0.2s ease" }}
              >
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: "white", position: "absolute", top: 3, left: notifications[n.key] ? 23 : 3, transition: "left 0.2s ease", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
              </button>
            </div>
          ))}
        </div>

        {/* VBV Progress */}
        <div className="z-card-navy animate-fade-in-up stagger-4" style={{ padding: "28px 36px" }}>
          <div className="z-gold-line" style={{ marginBottom: 14 }} />
          <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "white", marginBottom: 12 }}>VBV-Zertifizierung 2026</div>
          <div style={{ display: "flex", gap: 24, marginBottom: 14 }}>
            <div>
              <div className="font-heading" style={{ fontSize: 32, fontWeight: 400, color: "#C8A24D" }}>342</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Credits erreicht</div>
            </div>
            <div>
              <div className="font-heading" style={{ fontSize: 32, fontWeight: 400, color: "white" }}>258</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Credits verbleibend</div>
            </div>
            <div>
              <div className="font-heading" style={{ fontSize: 32, fontWeight: 400, color: "white" }}>97</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Tage bis Frist</div>
            </div>
          </div>
          <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.08)" }}>
            <div style={{ height: 4, borderRadius: 4, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", width: "57%" }} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
