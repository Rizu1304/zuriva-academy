"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("E-Mail oder Passwort ist falsch.");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      {/* Left: Navy brand panel */}
      <div style={{ width: "45%", background: "linear-gradient(180deg, #022350 0%, #011a3a 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,162,77,0.06), transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(15,164,160,0.04), transparent 70%)" }} />

        <div style={{ position: "relative" }}>
          <div style={{ height: 2, width: 32, background: "linear-gradient(90deg, #C8A24D, #E0B95F)", borderRadius: 1, marginBottom: 24 }} />
          <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, letterSpacing: "0.1em", color: "white", marginBottom: 4 }}>ZURIVA</div>
          <div style={{ fontSize: 13, fontWeight: 500, color: "#C8A24D", letterSpacing: "0.06em", marginBottom: 48 }}>academy</div>

          <div className="font-heading" style={{ fontSize: 36, fontWeight: 400, color: "white", lineHeight: 1.3, marginBottom: 20 }}>
            Willkommen in deiner<br />Lernplattform.
          </div>
          <div style={{ fontSize: 14.5, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 380 }}>
            Die Premium-Plattform fuer Schweizer Versicherungsvermittler. VBV-Zertifizierung, Kurse, Pruefungen und KI-Assistenz — alles an einem Ort.
          </div>

          <div style={{ display: "flex", gap: 24, marginTop: 48 }}>
            <div>
              <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "#C8A24D" }}>600+</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>Credits verfuegbar</div>
            </div>
            <div>
              <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "#C8A24D" }}>18</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>Kurse</div>
            </div>
            <div>
              <div className="font-heading" style={{ fontSize: 28, fontWeight: 400, color: "#C8A24D" }}>KI</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>Assistentin Aura</div>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, left: 60, fontSize: 11.5, color: "rgba(255,255,255,0.2)" }}>
          Zuriva GmbH · Duebendorf, Zuerich · FINMA-registriert
        </div>
      </div>

      {/* Right: Login form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#FAF8F5", padding: 40 }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div className="font-heading" style={{ fontSize: 30, fontWeight: 400, color: "#022350", marginBottom: 6 }}>Anmelden</div>
          <div style={{ fontSize: 14, color: "#9A9AAA", marginBottom: 36 }}>Melde dich mit deinem Zuriva-Konto an.</div>

          {error && (
            <div style={{ background: "rgba(192,57,43,0.06)", border: "1px solid rgba(192,57,43,0.15)", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 13, color: "#C0392B" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#022350", marginBottom: 6, letterSpacing: "0.02em" }}>E-Mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="laura.meier@zuriva.ch"
                required
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #ECE8E1", background: "white", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#022350", marginBottom: 6, letterSpacing: "0.02em" }}>Passwort</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #ECE8E1", background: "white", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="z-btn z-btn-primary"
              style={{ width: "100%", padding: "13px", fontSize: 14.5, borderRadius: 12, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Wird angemeldet..." : "Anmelden"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 24, fontSize: 12.5, color: "#9A9AAA" }}>
            Demo: <span style={{ color: "#022350", fontWeight: 600 }}>laura@zuriva.ch</span> / <span style={{ color: "#022350", fontWeight: 600 }}>demo123</span>
          </div>
        </div>
      </div>
    </div>
  );
}
