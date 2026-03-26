"use client";
import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Send, Plus, Search, Check, CheckCheck, Pin, Users, Hash, X, Paperclip, ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  time: string;
  isOwn: boolean;
  replyTo?: string;
  pinned?: boolean;
}

interface Channel {
  id: string;
  name: string;
  category: string;
  description: string;
  lastMessage: string;
  lastTime: string;
  lastAuthor: string;
  unread: number;
  members: number;
  pinned: boolean;
  messages: Message[];
}

const channels: Channel[] = [
  {
    id: "1", name: "Sachversicherung", category: "Nicht-Leben", description: "Fragen und Diskussionen zur Sachversicherung", lastMessage: "Das UVG deckt Berufsunfälle ab...", lastTime: "09:14", lastAuthor: "Anna S.", unread: 3, members: 42, pinned: true,
    messages: [
      { id: "m1", author: "Thomas Mueller", avatar: "TM", content: "Kann jemand die Abgrenzung zwischen UVG und KVG bei der Haftpflicht erklären? Ich habe einen konkreten Kundenfall.", time: "08:30", isOwn: false },
      { id: "m2", author: "Anna Schneider", avatar: "AS", content: "Das UVG deckt Berufsunfälle und Berufskrankheiten ab. Das KVG regelt die Grundversicherung für Krankheit. Bei der Haftpflicht ist entscheidend, ob der Schadenfall beruflich oder privat verursacht wurde.", time: "08:45", isOwn: false, pinned: true },
      { id: "m3", author: "Beat Keller", avatar: "BK", content: "Danke Anna, sehr hilfreich! Gilt das auch bei Freizeitunfällen von Arbeitnehmern?", time: "08:52", isOwn: false },
      { id: "m4", author: "Anna Schneider", avatar: "AS", content: "Ja, Freizeitunfälle fallen unter das UVG, sofern der Arbeitnehmer mehr als 8 Stunden pro Woche beim gleichen Arbeitgeber beschäftigt ist. Ansonsten gilt das KVG.", time: "09:01", isOwn: false },
      { id: "m5", author: "Laura Meier", avatar: "LM", content: "Super erklärt! Ich hatte letzte Woche einen ähnlichen Fall. Wichtig ist auch die Unterscheidung bei der Schadensmeldung.", time: "09:14", isOwn: true },
    ],
  },
  {
    id: "2", name: "Lebensversicherung", category: "Leben", description: "Alles rund um Lebensversicherungen und Vorsorge", lastMessage: "Der Rückkaufswert hängt von der Prämienstruktur ab...", lastTime: "07:42", lastAuthor: "Laura M.", unread: 0, members: 38, pinned: true,
    messages: [
      { id: "m1", author: "Beat Keller", avatar: "BK", content: "Wie berechnet sich der Rückkaufswert einer gemischten Lebensversicherung nach 10 Jahren Laufzeit?", time: "Gestern 14:20", isOwn: false },
      { id: "m2", author: "Laura Meier", avatar: "LM", content: "Der Rückkaufswert hängt von der Prämienstruktur, der Vertragslaufzeit und dem Deckungskapital ab. Nach 10 Jahren liegt er typischerweise bei 70-85% der eingezahlten Prämien.", time: "Gestern 15:30", isOwn: true },
      { id: "m3", author: "Beat Keller", avatar: "BK", content: "Gibt es eine Faustformel die man dem Kunden kommunizieren kann?", time: "Gestern 16:00", isOwn: false },
      { id: "m4", author: "Laura Meier", avatar: "LM", content: "Am besten holst du den genauen Wert bei der Versicherung ein. Als Orientierung: im 1. Jahr ca. 0%, nach 5 Jahren ca. 30-50%, nach 10 Jahren 70-85%. Aber immer den Versicherer fragen!", time: "07:42", isOwn: true },
    ],
  },
  {
    id: "3", name: "Compliance & Recht", category: "Compliance", description: "FIDLEG, VAG, VBV und rechtliche Fragen", lastMessage: "Ja, jede Beratung muss protokolliert werden...", lastTime: "Gestern", lastAuthor: "Thomas M.", unread: 1, members: 56, pinned: false,
    messages: [
      { id: "m1", author: "Anna Schneider", avatar: "AS", content: "Muss wirklich jede einzelne Kundenberatung gemäss FIDLEG dokumentiert werden?", time: "Vorgestern 10:00", isOwn: false },
      { id: "m2", author: "Thomas Mueller", avatar: "TM", content: "Ja, grundsätzlich muss jede Beratung protokolliert werden. Ausnahmen gibt es nur bei reinen Ausführungsgeschäften (Execution Only).", time: "Vorgestern 14:30", isOwn: false, pinned: true },
      { id: "m3", author: "Laura Meier", avatar: "LM", content: "Welches Tool verwendet ihr für die Dokumentation? Wir nutzen aktuell noch Excel...", time: "Gestern 09:00", isOwn: true },
    ],
  },
  {
    id: "4", name: "Prüfungsvorbereitung", category: "Allgemein", description: "Tipps und Austausch zur VBV-Prüfung 2026", lastMessage: "Hat jemand gute Buchempfehlungen?", lastTime: "Mo", lastAuthor: "Laura M.", unread: 0, members: 31, pinned: false,
    messages: [
      { id: "m1", author: "Laura Meier", avatar: "LM", content: "Hat jemand gute Buchempfehlungen oder Online-Ressourcen für die VBV-Prüfungsvorbereitung 2026?", time: "Mo 10:00", isOwn: true },
      { id: "m2", author: "Petra Koch", avatar: "PK", content: "Ich empfehle das offizielle VBV-Handbuch und die Zuriva Academy Kurse. Die Kombination hat mir letztes Jahr gereicht.", time: "Mo 11:30", isOwn: false },
    ],
  },
  {
    id: "5", name: "Beratungstipps", category: "Allgemein", description: "Best Practices für Kundengespräche", lastMessage: "Aktives Zuhören ist der Schlüssel...", lastTime: "Fr", lastAuthor: "Anna S.", unread: 0, members: 45, pinned: false,
    messages: [
      { id: "m1", author: "Marco Brunner", avatar: "MB", content: "Wie geht ihr mit schwierigen Kunden um, die den Preis drücken wollen?", time: "Fr 09:00", isOwn: false },
      { id: "m2", author: "Anna Schneider", avatar: "AS", content: "Aktives Zuhören ist der Schlüssel. Den Kunden ausreden lassen, Verständnis zeigen, dann die Vorteile der Deckung aufzeigen. Nie über den Preis argumentieren, sondern über den Wert.", time: "Fr 10:15", isOwn: false },
      { id: "m3", author: "Thomas Mueller", avatar: "TM", content: "Genau! Und immer konkrete Schadenbeispiele bringen. Das macht den Nutzen greifbar.", time: "Fr 11:00", isOwn: false },
    ],
  },
];

const catColors: Record<string, string> = { "Nicht-Leben": "#022350", "Leben": "#0FA4A0", "Compliance": "#C0392B", "Allgemein": "#C8A24D" };

export default function Forum() {
  const [channelList, setChannelList] = useState(channels);
  const [selectedId, setSelectedId] = useState(channels[0].id);
  const [input, setInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [showNewChannel, setShowNewChannel] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState("Allgemein");
  const [mobileShowChat, setMobileShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = channelList.find(c => c.id === selectedId) || channelList[0];
  const filteredChannels = channelList.filter(c => !searchText || c.name.toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected.messages.length, selectedId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), author: "Laura Meier", avatar: "LM", content: input, time: new Date().toLocaleTimeString("de-CH", { hour: "2-digit", minute: "2-digit" }), isOwn: true };
    setChannelList(prev => prev.map(c => c.id === selectedId ? { ...c, messages: [...c.messages, newMsg], lastMessage: input, lastTime: "Jetzt", lastAuthor: "Laura M.", unread: 0 } : c));
    setInput("");
  };

  const createChannel = () => {
    if (!newName.trim()) return;
    const ch: Channel = { id: Date.now().toString(), name: newName, category: newCat, description: "", lastMessage: "Kanal erstellt", lastTime: "Jetzt", lastAuthor: "Laura M.", unread: 0, members: 1, pinned: false, messages: [] };
    setChannelList(prev => [...prev, ch]);
    setSelectedId(ch.id);
    setShowNewChannel(false);
    setNewName("");
  };

  const selectChannel = (id: string) => {
    setSelectedId(id);
    setMobileShowChat(true);
    setChannelList(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  };

  return (
    <DashboardLayout title="Forum" subtitle={`${channelList.length} Kanäle`}>
      <div style={{ display: "flex", height: "calc(100vh - 180px)", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.30)" }}>

        {/* LEFT: Channel List */}
        <div style={{ width: 340, minWidth: 340, borderRight: "1px solid rgba(2,35,80,0.06)", display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.20)" }}>
          {/* Header */}
          <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div className="font-heading" style={{ fontSize: 18, fontWeight: 700, color: "#022350" }}>Kanäle</div>
            <button onClick={() => setShowNewChannel(true)} style={{ width: 32, height: 32, borderRadius: 10, border: "none", background: "rgba(2,35,80,0.06)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Plus size={16} color="#022350" />
            </button>
          </div>

          {/* Search */}
          <div style={{ padding: "10px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.50)", border: "1px solid rgba(2,35,80,0.06)" }}>
              <Search size={14} color="#9CA3AF" />
              <input value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Kanal suchen..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, fontFamily: "inherit", color: "#022350" }} />
            </div>
          </div>

          {/* Channel Items */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredChannels.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)).map(ch => (
              <div
                key={ch.id}
                onClick={() => selectChannel(ch.id)}
                style={{
                  padding: "14px 18px",
                  cursor: "pointer",
                  background: ch.id === selectedId ? "rgba(2,35,80,0.06)" : "transparent",
                  borderLeft: ch.id === selectedId ? "3px solid #C8A24D" : "3px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Hash size={14} color={catColors[ch.category] || "#9CA3AF"} />
                    <span style={{ fontSize: 14, fontWeight: ch.unread > 0 ? 700 : 500, color: "#022350" }}>{ch.name}</span>
                    {ch.pinned && <Pin size={10} color="#C8A24D" />}
                  </div>
                  <span style={{ fontSize: 10, color: ch.unread > 0 ? "#C8A24D" : "#9CA3AF" }}>{ch.lastTime}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, color: "#4A5568", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 220 }}>
                    <span style={{ color: "#9CA3AF" }}>{ch.lastAuthor}: </span>{ch.lastMessage}
                  </div>
                  {ch.unread > 0 && (
                    <span style={{ minWidth: 18, height: 18, borderRadius: 9, background: "#C8A24D", color: "white", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 5px" }}>{ch.unread}</span>
                  )}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                  <Users size={10} color="#9CA3AF" />
                  <span style={{ fontSize: 10, color: "#9CA3AF" }}>{ch.members}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Chat Area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(255,255,255,0.10)" }}>
          {/* Chat Header */}
          <div style={{ padding: "14px 22px", borderBottom: "1px solid rgba(2,35,80,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.30)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Hash size={18} color={catColors[selected.category] || "#022350"} />
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#022350" }}>{selected.name}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF" }}>{selected.members} Mitglieder · {selected.category}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(2,35,80,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Pin size={14} color="#9CA3AF" />
              </div>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(2,35,80,0.04)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Users size={14} color="#9CA3AF" />
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px", display: "flex", flexDirection: "column", gap: 4 }}>
            {selected.messages.map((msg, i) => {
              const showAvatar = i === 0 || selected.messages[i - 1].author !== msg.author;
              return (
                <div key={msg.id} style={{ display: "flex", justifyContent: msg.isOwn ? "flex-end" : "flex-start", marginTop: showAvatar ? 12 : 2 }}>
                  <div style={{ maxWidth: "70%", display: "flex", gap: 8, flexDirection: msg.isOwn ? "row-reverse" : "row", alignItems: "flex-end" }}>
                    {showAvatar && !msg.isOwn ? (
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(2,35,80,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#4A5568", flexShrink: 0 }}>{msg.avatar}</div>
                    ) : !msg.isOwn ? <div style={{ width: 32, flexShrink: 0 }} /> : null}
                    <div>
                      {showAvatar && !msg.isOwn && (
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#022350", marginBottom: 2, paddingLeft: 2 }}>{msg.author}</div>
                      )}
                      <div style={{
                        padding: "10px 14px",
                        borderRadius: msg.isOwn ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                        background: msg.isOwn ? "#022350" : "rgba(255,255,255,0.70)",
                        color: msg.isOwn ? "white" : "#1A1A2E",
                        fontSize: 13.5,
                        lineHeight: 1.55,
                        border: msg.isOwn ? "none" : "1px solid rgba(255,255,255,0.50)",
                        position: "relative",
                      }}>
                        {msg.pinned && (
                          <div style={{ position: "absolute", top: -8, right: msg.isOwn ? undefined : -8, left: msg.isOwn ? -8 : undefined }}>
                            <Pin size={12} color="#C8A24D" fill="#C8A24D" />
                          </div>
                        )}
                        {msg.content}
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 4, marginTop: 4 }}>
                          <span style={{ fontSize: 10, color: msg.isOwn ? "rgba(255,255,255,0.45)" : "#9CA3AF" }}>{msg.time}</span>
                          {msg.isOwn && <CheckCheck size={12} color="rgba(255,255,255,0.45)" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 18px", borderTop: "1px solid rgba(2,35,80,0.06)", display: "flex", gap: 10, alignItems: "center", background: "rgba(255,255,255,0.30)" }}>
            <button style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: "rgba(2,35,80,0.04)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Paperclip size={16} color="#9CA3AF" />
            </button>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder={`Nachricht in #${selected.name}...`}
              style={{ flex: 1, padding: "10px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.06)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
            <button onClick={sendMessage} disabled={!input.trim()} style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: input.trim() ? "#022350" : "rgba(2,35,80,0.06)", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
              <Send size={16} color={input.trim() ? "white" : "#9CA3AF"} />
            </button>
          </div>
        </div>
      </div>

      {/* New Channel Modal */}
      {showNewChannel && (
        <>
          <div onClick={() => setShowNewChannel(false)} style={{ position: "fixed", inset: 0, background: "rgba(2,35,80,0.20)", backdropFilter: "blur(4px)", zIndex: 9999 }} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 10000, width: 420, background: "rgba(255,255,255,0.88)", backdropFilter: "blur(48px)", borderRadius: 24, border: "1px solid rgba(255,255,255,0.65)", boxShadow: "0 16px 48px rgba(2,35,80,0.15)", padding: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div className="font-heading" style={{ fontSize: 22, fontWeight: 700, color: "#022350" }}>Neuer Kanal</div>
              <button onClick={() => setShowNewChannel(false)} style={{ width: 32, height: 32, borderRadius: 10, border: "none", background: "rgba(2,35,80,0.04)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={16} /></button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Kanalname</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="z.B. Motorfahrzeug" style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(2,35,80,0.08)", background: "rgba(255,255,255,0.50)", fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 6 }}>Kategorie</label>
              <div style={{ display: "flex", gap: 6 }}>
                {["Nicht-Leben", "Leben", "Compliance", "Allgemein"].map(c => (
                  <button key={c} onClick={() => setNewCat(c)} style={{ flex: 1, padding: "8px", borderRadius: 10, border: "1px solid", borderColor: newCat === c ? catColors[c] : "rgba(2,35,80,0.08)", background: newCat === c ? `${catColors[c]}12` : "transparent", color: newCat === c ? catColors[c] : "#4A5568", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{c}</button>
                ))}
              </div>
            </div>
            <button onClick={createChannel} className="z-btn z-btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Plus size={14} /> Kanal erstellen
            </button>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
