"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Bell, Send, Phone, Clock, Award, BookOpen, Flame, CheckCircle, MessageSquare, Settings, Trash2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  message: string;
}

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
  color: string;
}

const notifications: Notification[] = [
  { id: "1", type: "vbv", title: "VBV-Frist Erinnerung", message: "Deine VBV-Frist läuft in 97 Tagen ab. Du hast noch 258 Credits offen.", time: "Heute 08:00", read: false, icon: <Clock size={16} />, color: "#C0392B" },
  { id: "2", type: "course", title: "Kurs wartet auf dich", message: "Dein Kurs 'Grundlagen Sachversicherung' ist zu 68% abgeschlossen. Weiter geht's!", time: "Heute 07:30", read: false, icon: <BookOpen size={16} />, color: "#022350" },
  { id: "3", type: "streak", title: "Streak-Bonus!", message: "12 Tage in Folge gelernt! Du erhältst 200 Bonus-XP.", time: "Gestern 18:00", read: true, icon: <Flame size={16} />, color: "#C8A24D" },
  { id: "4", type: "badge", title: "Neues Badge freigeschaltet", message: "Du hast das Badge 'Top 3' erhalten!", time: "Gestern 09:14", read: true, icon: <Award size={16} />, color: "#C8A24D" },
  { id: "5", type: "exam", title: "Prüfung in 3 Tagen", message: "Sachversicherung Modul 3 - Bereite dich jetzt vor.", time: "Mo 23.03.", read: true, icon: <Bell size={16} />, color: "#C0392B" },
  { id: "6", type: "forum", title: "Antwort im Forum", message: "Thomas Mueller hat auf deinen Beitrag geantwortet.", time: "Fr 20.03.", read: true, icon: <MessageSquare size={16} />, color: "#1B6FC2" },
  { id: "7", type: "cert", title: "Zertifikat erhalten", message: "Trainee Grundausbildung - Zertifikat ist verfügbar.", time: "Mi 18.03.", read: true, icon: <CheckCircle size={16} />, color: "#0FA4A0" },
];

interface WhatsAppSettings {
  enabled: boolean;
  phone: string;
  vbvReminder: boolean;
  courseReminder: boolean;
  examReminder: boolean;
  streakWarning: boolean;
}

export default function Benachrichtigungen() {
  const [tab, setTab] = useState<"inbox" | "whatsapp">("inbox");
  const [notifs, setNotifs] = useState(notifications);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [waSettings, setWaSettings] = useState<WhatsAppSettings>({
    enabled: false, phone: "", vbvReminder: true, courseReminder: true, examReminder: true, streakWarning: false,
  });
  const [testSending, setTestSending] = useState(false);

  useEffect(() => {
    fetch("/api/whatsapp").then(r => r.json()).then(d => setTemplates(d.templates || [])).catch(() => {});
  }, []);

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const deleteNotif = (id: string) => setNotifs(n => n.filter(x => x.id !== id));
  const unreadCount = notifs.filter(n => !n.read).length;

  const sendTestWhatsApp = async () => {
    if (!waSettings.phone) return;
    setTestSending(true);
    try {
      const res = await fetch("/api/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: waSettings.phone,
          message: `Hallo von der Zuriva Academy! Dies ist eine Testnachricht. Deine WhatsApp-Benachrichtigungen sind aktiv.`,
          type: "test",
        }),
      });
      const data = await res.json();
      if (data.whatsapp_url) {
        window.open(data.whatsapp_url, "_blank");
      }
    } catch { /* ignore */ }
    setTestSending(false);
  };

  return (
    <DashboardLayout title="Benachrichtigungen" subtitle={unreadCount > 0 ? `${unreadCount} ungelesen` : "Alle gelesen"}>

      <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
        <button onClick={() => setTab("inbox")} className={tab === "inbox" ? "z-btn z-btn-primary" : "z-btn z-btn-ghost"} style={{ fontSize: 13, padding: "8px 20px", display: "flex", alignItems: "center", gap: 6 }}>
          <Bell size={14} /> Posteingang {unreadCount > 0 && <span style={{ background: "#C0392B", color: "white", borderRadius: "50%", width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{unreadCount}</span>}
        </button>
        <button onClick={() => setTab("whatsapp")} className={tab === "whatsapp" ? "z-btn z-btn-primary" : "z-btn z-btn-ghost"} style={{ fontSize: 13, padding: "8px 20px", display: "flex", alignItems: "center", gap: 6 }}>
          <Phone size={14} /> WhatsApp
        </button>
      </div>

      {/* INBOX */}
      {tab === "inbox" && (
        <div style={{ maxWidth: 700 }}>
          {unreadCount > 0 && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
              <button onClick={markAllRead} className="z-btn z-btn-ghost" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                <CheckCircle size={13} /> Alle als gelesen markieren
              </button>
            </div>
          )}
          {notifs.map((n, i) => (
            <div key={n.id} className={`z-card animate-fade-in-up stagger-${Math.min(i + 1, 8)}`} style={{ padding: "18px 22px", marginBottom: 8, display: "flex", alignItems: "flex-start", gap: 14, borderLeft: !n.read ? `3px solid ${n.color}` : "3px solid transparent", background: !n.read ? "rgba(200,162,77,0.03)" : undefined }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${n.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: n.color, flexShrink: 0 }}>
                {n.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ fontSize: 14, fontWeight: n.read ? 400 : 600, color: "#022350" }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", whiteSpace: "nowrap" }}>{n.time}</div>
                </div>
                <div style={{ fontSize: 13, color: "#4A5568", marginTop: 2, lineHeight: 1.5 }}>{n.message}</div>
              </div>
              <button onClick={() => deleteNotif(n.id)} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Trash2 size={14} color="#9CA3AF" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* WHATSAPP */}
      {tab === "whatsapp" && (
        <div style={{ maxWidth: 600 }}>
          <div className="z-card" style={{ padding: "28px 32px", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(37,211,102,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={22} color="#25D366" />
              </div>
              <div>
                <div className="font-heading" style={{ fontSize: 20, fontWeight: 700, color: "#022350" }}>WhatsApp Benachrichtigungen</div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>Erhalte Erinnerungen direkt auf dein Handy</div>
              </div>
            </div>

            {/* Enable/Disable */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid rgba(2,35,80,0.04)" }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#022350" }}>WhatsApp aktivieren</div>
              <button onClick={() => setWaSettings(s => ({ ...s, enabled: !s.enabled }))} style={{ width: 48, height: 26, borderRadius: 13, border: "none", background: waSettings.enabled ? "#25D366" : "rgba(2,35,80,0.12)", cursor: "pointer", position: "relative", transition: "all 0.2s" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: waSettings.enabled ? 24 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
              </button>
            </div>

            {waSettings.enabled && (
              <>
                {/* Phone Input */}
                <div style={{ padding: "14px 0", borderBottom: "1px solid rgba(2,35,80,0.04)" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Telefonnummer</label>
                  <input value={waSettings.phone} onChange={e => setWaSettings(s => ({ ...s, phone: e.target.value }))} placeholder="+41 79 123 45 67" style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
                </div>

                {/* Notification Types */}
                <div style={{ padding: "14px 0" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 12 }}>Benachrichtigungen</label>
                  {[
                    { key: "vbvReminder" as const, label: "VBV-Frist Erinnerungen", desc: "Wöchentlich bis zur Frist" },
                    { key: "courseReminder" as const, label: "Kurs-Erinnerungen", desc: "Wenn ein Kurs auf dich wartet" },
                    { key: "examReminder" as const, label: "Prüfungs-Erinnerungen", desc: "3 Tage und 1 Tag vor der Prüfung" },
                    { key: "streakWarning" as const, label: "Streak-Warnungen", desc: "Wenn dein Streak in Gefahr ist" },
                  ].map(item => (
                    <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#022350" }}>{item.label}</div>
                        <div style={{ fontSize: 11, color: "#9CA3AF" }}>{item.desc}</div>
                      </div>
                      <button onClick={() => setWaSettings(s => ({ ...s, [item.key]: !s[item.key] }))} style={{ width: 42, height: 24, borderRadius: 12, border: "none", background: waSettings[item.key] ? "#0FA4A0" : "rgba(2,35,80,0.12)", cursor: "pointer", position: "relative", transition: "all 0.2s" }}>
                        <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: waSettings[item.key] ? 20 : 2, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.15)" }} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Test Button */}
                <button onClick={sendTestWhatsApp} disabled={!waSettings.phone || testSending} className="z-btn" style={{ width: "100%", padding: "12px", marginTop: 8, background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.20)", color: "#25D366", fontSize: 13, fontWeight: 600, borderRadius: 12, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Send size={14} /> {testSending ? "Wird gesendet..." : "Testnachricht senden"}
                </button>
              </>
            )}
          </div>

          {/* Templates Preview */}
          {templates.length > 0 && (
            <div className="z-card" style={{ padding: "24px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <Settings size={16} color="#9CA3AF" />
                <div className="font-heading" style={{ fontSize: 18, color: "#022350" }}>Nachrichtenvorlagen</div>
              </div>
              {templates.map((t, i) => (
                <div key={t.id} style={{ padding: "12px 0", borderBottom: i < templates.length - 1 ? "1px solid rgba(2,35,80,0.04)" : "none" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#022350", marginBottom: 2 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#4A5568", lineHeight: 1.5, fontStyle: "italic" }}>{t.message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
