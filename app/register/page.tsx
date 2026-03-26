"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwörter stimmen nicht überein");
      return;
    }
    if (password.length < 8) {
      setError("Passwort muss mindestens 8 Zeichen lang sein");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Registrierung fehlgeschlagen");
        setLoading(false);
        return;
      }
      router.push("/login?registered=true");
    } catch {
      setError("Ein Fehler ist aufgetreten");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#EAE5DD", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 700, color: "#022350", letterSpacing: 3, textTransform: "uppercase" }}>ZURIVA</span>
            <span style={{ fontSize: 16, fontWeight: 300, fontStyle: "italic", color: "#C8A24D" }}>academy</span>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: "radial-gradient(ellipse 500px 400px at 5% 5%, rgba(200,162,77,0.15) 0%, transparent 65%), radial-gradient(ellipse 500px 400px at 95% 95%, rgba(2,35,80,0.10) 0%, transparent 65%), rgba(255,255,255,0.45)",
          backdropFilter: "blur(40px)",
          borderRadius: 24,
          padding: "40px 36px",
        }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(200,162,77,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <UserPlus size={22} color="#C8A24D" />
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: "#022350" }}>Konto erstellen</div>
            <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 4 }}>Starte deine Lernreise bei Zuriva</div>
          </div>

          {error && (
            <div style={{ background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.15)", borderRadius: 12, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#C0392B" }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Name</label>
              <div style={{ position: "relative" }}>
                <User size={16} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Max Muster" required style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>E-Mail</label>
              <div style={{ position: "relative" }}>
                <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@zuriva.ch" required style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Passwort</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mindestens 8 Zeichen" required style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Passwort bestätigen</label>
              <div style={{ position: "relative" }}>
                <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Passwort wiederholen" required style={{ width: "100%", padding: "12px 16px 12px 40px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", borderRadius: 12, border: "none", background: "#022350", color: "white", fontSize: 14, fontWeight: 600, cursor: loading ? "wait" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
              {loading ? <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} /> : <UserPlus size={16} />}
              {loading ? "Wird erstellt..." : "Konto erstellen"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#4A5568" }}>
            Bereits ein Konto? <Link href="/login" style={{ color: "#C8A24D", fontWeight: 600, textDecoration: "none" }}>Anmelden</Link>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
