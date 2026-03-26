"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Mic, User, FileText, Film, Play, Square, Loader2, ChevronRight, ChevronLeft, Sparkles, Volume2, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

interface Voice {
  voice_id: string;
  name: string;
  category: string;
  labels: Record<string, string>;
  preview_url: string;
  description: string;
  source?: string;
}

interface Avatar {
  avatar_id: string;
  avatar_name: string;
  preview_image_url: string;
  gender: string;
}

const videoStyles = [
  { id: "professional", label: "Professionell", icon: "", desc: "Sachlich und serioes" },
  { id: "friendly", label: "Freundlich", icon: "", desc: "Warm und zugaenglich" },
  { id: "energetic", label: "Energisch", icon: "", desc: "Motivierend und dynamisch" },
  { id: "educational", label: "Lehrreich", icon: "", desc: "Erklaerend und detailliert" },
];

const videoDurations = [
  { id: "short", label: "Kurz", desc: "30-60 Sek." },
  { id: "medium", label: "Mittel", desc: "1-2 Min." },
  { id: "long", label: "Lang", desc: "2-3 Min." },
];

const animationStyles = [
  { id: "none", label: "Keine", icon: "", desc: "Ohne Animation" },
  { id: "fade", label: "Fade In/Out", icon: "", desc: "Sanfter Übergang" },
  { id: "slide", label: "Slide", icon: "", desc: "Seitlicher Eingang" },
  { id: "zoom", label: "Zoom", icon: "", desc: "Heranzoomen" },
  { id: "bounce", label: "Bounce", icon: "", desc: "Springender Effekt" },
];

type Tab = "voices" | "avatar" | "script" | "generate";

export default function KIStudio() {
  const [activeTab, setActiveTab] = useState<Tab>("voices");

  // Voice state
  const [voices, setVoices] = useState<Voice[]>([]);
  const [voicesLoading, setVoicesLoading] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [playingPreview, setPlayingPreview] = useState<string | null>(null);
  const [voiceLang, setVoiceLang] = useState<"all" | "de" | "en">("all");
  const [voiceSearch, setVoiceSearch] = useState("");
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Avatar state
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [avatarsLoading, setAvatarsLoading] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  // Script state
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("professional");
  const [duration, setDuration] = useState("medium");
  const [animation, setAnimation] = useState("none");
  const [script, setScript] = useState("");
  const [scriptLoading, setScriptLoading] = useState(false);

  // Generate state
  const [generating, setGenerating] = useState(false);
  const [videoStatus, setVideoStatus] = useState<"idle" | "generating" | "processing" | "completed" | "error">("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoError, setVideoError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // TTS preview state
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const ttsAudioRef = useRef<HTMLAudioElement | null>(null);

  // Load voices (with German library voices)
  useEffect(() => {
    setVoicesLoading(true);
    fetch("/api/voices")
      .then((r) => r.json())
      .then((data) => {
        setVoices(data.voices || []);
        setVoicesLoading(false);
      })
      .catch(() => setVoicesLoading(false));
  }, []);

  // Filtered voices (search only)
  const filteredVoices = voices.filter((v) => {
    if (voiceSearch && !v.name.toLowerCase().includes(voiceSearch.toLowerCase())) return false;
    return true;
  });

  // Load avatars
  useEffect(() => {
    setAvatarsLoading(true);
    fetch("/api/avatars")
      .then((r) => r.json())
      .then((data) => {
        setAvatars(data.avatars || []);
        setAvatarsLoading(false);
      })
      .catch(() => setAvatarsLoading(false));
  }, []);

  // Play voice preview
  const playPreview = useCallback((voice: Voice) => {
    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
      previewAudioRef.current = null;
    }
    if (playingPreview === voice.voice_id) {
      setPlayingPreview(null);
      return;
    }
    const audio = new Audio(voice.preview_url);
    previewAudioRef.current = audio;
    setPlayingPreview(voice.voice_id);
    audio.onended = () => setPlayingPreview(null);
    audio.onerror = () => setPlayingPreview(null);
    audio.play();
  }, [playingPreview]);

  // Generate script with AI
  const generateScript = async () => {
    if (!topic.trim()) return;
    setScriptLoading(true);
    try {
      const res = await fetch("/api/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style, duration, language: "de" }),
      });
      const data = await res.json();
      setScript(data.script || "");
    } catch {
      setScript("Fehler beim Generieren. Bitte versuchen Sie es nochmal.");
    }
    setScriptLoading(false);
  };

  // Preview script with TTS
  const previewTTS = async () => {
    if (!script.trim()) return;
    if (ttsPlaying && ttsAudioRef.current) {
      ttsAudioRef.current.pause();
      ttsAudioRef.current = null;
      setTtsPlaying(false);
      return;
    }
    setTtsLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: script.slice(0, 500),
          voice_id: selectedVoice?.voice_id,
        }),
      });
      if (!res.ok) throw new Error();
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      ttsAudioRef.current = audio;
      audio.onended = () => { setTtsPlaying(false); URL.revokeObjectURL(url); };
      setTtsPlaying(true);
      setTtsLoading(false);
      await audio.play();
    } catch {
      setTtsLoading(false);
      setTtsPlaying(false);
    }
  };

  // Generate video
  const generateVideo = async () => {
    if (!script.trim()) return;
    setGenerating(true);
    setVideoStatus("generating");
    setVideoError(null);
    setVideoUrl(null);

    try {
      const res = await fetch("/api/heygen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: script,
          avatar_id: selectedAvatar?.avatar_id,
          heygen_voice_id: selectedVoice?.voice_id,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setVideoError(data.error || "Unbekannter Fehler");
        setVideoStatus("error");
        setGenerating(false);
        return;
      }
      setVideoStatus("processing");
      // Poll for completion
      if (pollRef.current) clearInterval(pollRef.current);
      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch(`/api/heygen?video_id=${data.video_id}`);
          const statusData = await statusRes.json();
          if (statusData.status === "completed" && statusData.video_url) {
            setVideoUrl(statusData.video_url);
            setVideoStatus("completed");
            setGenerating(false);
            if (pollRef.current) clearInterval(pollRef.current);
          } else if (statusData.status === "failed") {
            setVideoError("Video-Generierung fehlgeschlagen");
            setVideoStatus("error");
            setGenerating(false);
            if (pollRef.current) clearInterval(pollRef.current);
          }
        } catch {
          setVideoError("Verbindungsfehler");
          setVideoStatus("error");
          setGenerating(false);
          if (pollRef.current) clearInterval(pollRef.current);
        }
      }, 5000);
    } catch {
      setVideoError("Netzwerkfehler");
      setVideoStatus("error");
      setGenerating(false);
    }
  };

  useEffect(() => {
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; num: number }[] = [
    { id: "voices", label: "Stimme", icon: <Mic size={14} />, num: 1 },
    { id: "avatar", label: "Avatar", icon: <User size={14} />, num: 2 },
    { id: "script", label: "Skript & Aufgabe", icon: <FileText size={14} />, num: 3 },
    { id: "generate", label: "Video erstellen", icon: <Film size={14} />, num: 4 },
  ];

  return (
    <DashboardLayout title="KI-Studio" subtitle="Erstelle Videos mit KI-Avatar und echter Stimme">

      {/* TAB NAVIGATION */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? "z-btn z-btn-primary" : "z-btn z-btn-ghost"}
            style={{ fontSize: 13, padding: "10px 20px", display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{
              width: 22, height: 22, borderRadius: "50%",
              background: activeTab === tab.id ? "rgba(255,255,255,0.2)" : "#F0ECE6",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700,
              color: activeTab === tab.id ? "white" : "#4A4A5A",
            }}>{tab.num}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>{tab.icon} {tab.label}</span>
          </button>
        ))}
      </div>

      {/* SELECTED SUMMARY BAR */}
      <div className="z-card-static" style={{ padding: "14px 22px", marginBottom: 24, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ fontSize: 12, color: "#9A9AAA" }}>
          Stimme: <span style={{ color: selectedVoice ? "#022350" : "#C0392B", fontWeight: 600 }}>{selectedVoice?.name || "Nicht gewaehlt"}</span>
        </div>
        <div style={{ fontSize: 12, color: "#9A9AAA" }}>
          Avatar: <span style={{ color: selectedAvatar ? "#022350" : "#C0392B", fontWeight: 600 }}>{selectedAvatar?.avatar_name || "Nicht gewaehlt"}</span>
        </div>
        <div style={{ fontSize: 12, color: "#9A9AAA" }}>
          Stil: <span style={{ color: "#022350", fontWeight: 600 }}>{videoStyles.find(s => s.id === style)?.label}</span>
        </div>
        <div style={{ fontSize: 12, color: "#9A9AAA" }}>
          Animation: <span style={{ color: "#022350", fontWeight: 600 }}>{animationStyles.find(a => a.id === animation)?.label}</span>
        </div>
      </div>

      {/* ===== TAB: VOICES ===== */}
      {activeTab === "voices" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 4 }}>
            <div>
              <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350" }}>Stimme auswählen</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input
                value={voiceSearch}
                onChange={(e) => setVoiceSearch(e.target.value)}
                placeholder="Stimme suchen..."
                style={{ padding: "7px 14px", borderRadius: 10, border: "1px solid #ECE8E1", background: "#FAF8F5", fontSize: 12.5, outline: "none", fontFamily: "inherit", width: 180 }}
              />
            </div>
          </div>
          <div className="z-gold-line" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 12, color: "#9A9AAA", marginBottom: 20 }}>
            {filteredVoices.length} deutsche Stimmen · Diese Stimme wird im Video verwendet
          </div>

          {voicesLoading ? (
            <div className="z-card-static" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#9A9AAA" }}>Stimmen werden geladen...</div>
            </div>
          ) : voices.length === 0 ? (
            <div className="z-card-static" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#9A9AAA" }}>Keine Stimmen gefunden. Pruefe den ElevenLabs API Key.</div>
            </div>
          ) : (
            <div className="z-grid-3">
              {filteredVoices.map((voice, idx) => {
                const voiceKey = `${voice.voice_id}-${voice.name}-${voice.source || ""}`;
                const selectedKey = selectedVoice ? `${selectedVoice.voice_id}-${selectedVoice.name}-${selectedVoice.source || ""}` : "";
                const isSelected = voiceKey === selectedKey;
                const isPlaying = playingPreview === voice.voice_id;
                const isGerman = (voice.labels?.language || voice.labels?.accent || "").toLowerCase().match(/german|deutsch|de/) || voice.source === "library";
                return (
                  <div
                    key={`${voice.voice_id}-${idx}`}
                    onClick={() => setSelectedVoice(voice)}
                    className="z-card"
                    style={{
                      padding: "20px 22px",
                      cursor: "pointer",
                      borderColor: isSelected ? "#C8A24D" : undefined,
                      background: isSelected ? "rgba(200,162,77,0.03)" : undefined,
                      position: "relative",
                    }}
                  >
                    {isSelected && (
                      <div style={{ position: "absolute", top: 12, right: 12, width: 22, height: 22, borderRadius: "50%", background: "#C8A24D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                    )}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: isSelected ? "linear-gradient(135deg, #C8A24D, #E0B95F)" : "#F0ECE6", display: "flex", alignItems: "center", justifyContent: "center", color: isSelected ? "white" : "#4A4A5A" }}>
                        <Mic size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>{voice.name}</div>
                        <div style={{ fontSize: 11, color: "#9A9AAA" }}>{voice.source === "library" ? "Voice Library" : voice.category || "Eigene Stimme"}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                      {isGerman && (
                        <span className="z-badge" style={{ background: "rgba(15,164,160,0.06)", color: "#0FA4A0", border: "1px solid rgba(15,164,160,0.15)" }}>
                          DE Deutsch
                        </span>
                      )}
                      {voice.labels?.gender && (
                        <span className="z-badge" style={{ background: "#FAF8F5", color: "#4A4A5A", border: "1px solid #E8E4DE" }}>
                          {voice.labels.gender}
                        </span>
                      )}
                      {voice.labels?.use_case && (
                        <span className="z-badge" style={{ background: "#FAF8F5", color: "#4A4A5A", border: "1px solid #E8E4DE" }}>
                          {voice.labels.use_case}
                        </span>
                      )}
                      {voice.labels?.accent && !isGerman && (
                        <span className="z-badge" style={{ background: "#FAF8F5", color: "#4A4A5A", border: "1px solid #E8E4DE" }}>
                          {voice.labels.accent}
                        </span>
                      )}
                    </div>
                    {voice.preview_url && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playPreview(voice); }}
                        className="z-btn z-btn-ghost"
                        style={{ width: "100%", fontSize: 12, padding: "7px 0" }}
                      >
                        {isPlaying ? <><Square size={12} /> Stoppen</> : <><Play size={12} /> Anhoeren</>}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setActiveTab("avatar")} className="z-btn z-btn-primary" disabled={!selectedVoice}>
              Weiter zu Avatar →
            </button>
          </div>
        </div>
      )}

      {/* ===== TAB: AVATAR ===== */}
      {activeTab === "avatar" && (
        <div>
          <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Avatar auswaehlen</div>
          <div className="z-gold-line" style={{ marginBottom: 20 }} />

          {avatarsLoading ? (
            <div className="z-card-static" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 14, color: "#9A9AAA" }}>Avatare werden geladen...</div>
            </div>
          ) : avatars.length === 0 ? (
            <div className="z-card-static" style={{ padding: 40, textAlign: "center" }}>
              <div style={{ fontSize: 36, marginBottom: 12, display: "flex", justifyContent: "center" }}><User size={36} /></div>
              <div style={{ fontSize: 14, color: "#9A9AAA", marginBottom: 16 }}>Keine Avatare gefunden. Pruefe den HeyGen API Key.</div>
              <div style={{ fontSize: 12, color: "#4A4A5A" }}>Du kannst trotzdem fortfahren - es wird der Standard-Avatar verwendet.</div>
            </div>
          ) : (
            <div className="z-grid-4">
              {avatars.map((avatar) => {
                const isSelected = selectedAvatar?.avatar_id === avatar.avatar_id;
                return (
                  <div
                    key={avatar.avatar_id}
                    onClick={() => setSelectedAvatar(avatar)}
                    className="z-card"
                    style={{
                      padding: 0,
                      cursor: "pointer",
                      borderColor: isSelected ? "#C8A24D" : undefined,
                      overflow: "hidden",
                    }}
                  >
                    {avatar.preview_image_url ? (
                      <div style={{ height: 160, background: "#F0ECE6", position: "relative" }}>
                        <img src={avatar.preview_image_url} alt={avatar.avatar_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        {isSelected && (
                          <div style={{ position: "absolute", top: 10, right: 10, width: 26, height: 26, borderRadius: "50%", background: "#C8A24D", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div style={{ height: 160, background: "#F0ECE6", display: "flex", alignItems: "center", justifyContent: "center" }}><User size={48} /></div>
                    )}
                    <div style={{ padding: "12px 16px" }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{avatar.avatar_name}</div>
                      {avatar.gender && <div style={{ fontSize: 11, color: "#9A9AAA" }}>{avatar.gender}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setActiveTab("voices")} className="z-btn z-btn-ghost">← Zurueck</button>
            <button onClick={() => setActiveTab("script")} className="z-btn z-btn-primary">Weiter zu Skript →</button>
          </div>
        </div>
      )}

      {/* ===== TAB: SCRIPT ===== */}
      {activeTab === "script" && (
        <div>
          <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Aufgabe & Skript</div>
          <div className="z-gold-line" style={{ marginBottom: 20 }} />

          <div className="z-grid-main-320">
            <div>
              {/* Topic input */}
              <div className="z-card-static" style={{ padding: "24px 28px", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 12 }}>Thema / Aufgabe fuer den Avatar</div>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="z.B. 'Erklaere die Grundlagen der Sachversicherung in der Schweiz' oder 'Begruessung fuer neue Lernende in der Zuriva Academy'"
                  style={{
                    width: "100%", minHeight: 100, padding: "14px 16px", borderRadius: 12,
                    border: "1px solid #ECE8E1", background: "#FAF8F5", resize: "vertical",
                    fontSize: 14, fontFamily: "inherit", lineHeight: 1.6, outline: "none",
                  }}
                />
              </div>

              {/* Style selection */}
              <div className="z-card-static" style={{ padding: "24px 28px", marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 12 }}>Stil</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {videoStyles.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setStyle(s.id)}
                      style={{
                        padding: "14px 12px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                        border: "1px solid", borderColor: style === s.id ? "#C8A24D" : "#ECE8E1",
                        background: style === s.id ? "rgba(200,162,77,0.04)" : "white",
                        transition: "all 0.2s",
                      }}
                    >
                      {s.icon && <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>}
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#022350" }}>{s.label}</div>
                      <div style={{ fontSize: 10, color: "#9A9AAA", marginTop: 2 }}>{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration + Animation */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div className="z-card-static" style={{ padding: "24px 28px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 12 }}>Laenge</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {videoDurations.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDuration(d.id)}
                        className={duration === d.id ? "z-btn z-btn-primary" : "z-btn z-btn-ghost"}
                        style={{ flex: 1, fontSize: 12, padding: "10px 8px", flexDirection: "column", gap: 2 }}
                      >
                        <div>{d.label}</div>
                        <div style={{ fontSize: 10, opacity: 0.7 }}>{d.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="z-card-static" style={{ padding: "24px 28px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 12 }}>Animation</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                    {animationStyles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => setAnimation(a.id)}
                        style={{
                          padding: "10px", borderRadius: 10, cursor: "pointer", textAlign: "center",
                          border: "1px solid", borderColor: animation === a.id ? "#C8A24D" : "#ECE8E1",
                          background: animation === a.id ? "rgba(200,162,77,0.04)" : "white",
                          fontSize: 12,
                        }}
                      >
                        {a.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generate script button */}
              <button
                onClick={generateScript}
                disabled={!topic.trim() || scriptLoading}
                className="z-btn z-btn-primary"
                style={{ width: "100%", padding: "14px", fontSize: 14, marginBottom: 16 }}
              >
                {scriptLoading ? "KI generiert Skript..." : <><Sparkles size={16} /> Skript mit KI generieren</>}
              </button>

              {/* Script editor */}
              {script && (
                <div className="z-card-static animate-fade-in-up" style={{ padding: "24px 28px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#022350" }}>Generiertes Skript</div>
                    <button
                      onClick={previewTTS}
                      disabled={ttsLoading}
                      className="z-btn z-btn-ghost"
                      style={{ fontSize: 12, padding: "6px 14px" }}
                    >
                      {ttsLoading ? "Laden..." : ttsPlaying ? <><Square size={12} /> Stoppen</> : <><Play size={12} /> Anhoeren</>}
                    </button>
                  </div>
                  <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    style={{
                      width: "100%", minHeight: 200, padding: "14px 16px", borderRadius: 12,
                      border: "1px solid #ECE8E1", background: "#FAF8F5", resize: "vertical",
                      fontSize: 14, fontFamily: "inherit", lineHeight: 1.7, outline: "none",
                    }}
                  />
                  <div style={{ fontSize: 11, color: "#9A9AAA", marginTop: 8 }}>
                    {script.length} Zeichen · ~{Math.ceil(script.split(" ").length / 150)} Min. Sprechzeit
                  </div>
                </div>
              )}
            </div>

            {/* Right sidebar preview */}
            <div>
              <div className="z-card-static" style={{ padding: "22px", position: "sticky", top: 32 }}>
                <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Vorschau</div>
                <div className="z-gold-line" style={{ marginBottom: 16 }} />

                {/* Selected voice */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Stimme</div>
                  {selectedVoice ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #C8A24D, #E0B95F)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><Mic size={14} /></div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{selectedVoice.name}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 12, color: "#9A9AAA" }}>Noch nicht gewaehlt</div>
                  )}
                </div>

                {/* Selected avatar */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Avatar</div>
                  {selectedAvatar ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {selectedAvatar.preview_image_url ? (
                        <img src={selectedAvatar.preview_image_url} alt="" style={{ width: 32, height: 32, borderRadius: 8, objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0ECE6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🧑</div>
                      )}
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#022350" }}>{selectedAvatar.avatar_name}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: 12, color: "#9A9AAA" }}>Standard-Avatar</div>
                  )}
                </div>

                {/* Config */}
                <div style={{ borderTop: "1px solid #F0ECE6", paddingTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Stil</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{videoStyles.find(s => s.id === style)?.icon} {videoStyles.find(s => s.id === style)?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Laenge</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{videoDurations.find(d => d.id === duration)?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Animation</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{animationStyles.find(a => a.id === animation)?.icon} {animationStyles.find(a => a.id === animation)?.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
            <button onClick={() => setActiveTab("avatar")} className="z-btn z-btn-ghost">← Zurueck</button>
            <button onClick={() => setActiveTab("generate")} className="z-btn z-btn-primary" disabled={!script.trim()}>
              Weiter zu Video erstellen →
            </button>
          </div>
        </div>
      )}

      {/* ===== TAB: GENERATE ===== */}
      {activeTab === "generate" && (
        <div>
          <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Video erstellen</div>
          <div className="z-gold-line" style={{ marginBottom: 20 }} />

          <div className="z-grid-main">
            <div>
              {/* Video player area */}
              <div className="z-card-navy" style={{ aspectRatio: "16/9", maxWidth: 800, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                {/* ZURIVA academy logo overlay */}
                <div style={{ position: "absolute", top: 16, left: 18, zIndex: 10, display: "flex", alignItems: "baseline", gap: 5, pointerEvents: "none" }}>
                  <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "0.1em", color: "white", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>ZURIVA</span>
                  <span style={{ fontSize: 10, fontWeight: 500, color: "#C8A24D", letterSpacing: "0.05em", textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>academy</span>
                </div>
                {videoStatus === "idle" && (
                  <div style={{ textAlign: "center", padding: 32 }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>🎬</div>
                    <div className="font-heading" style={{ fontSize: 24, fontWeight: 400, color: "white", marginBottom: 8 }}>Bereit zum Erstellen</div>
                    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 24, maxWidth: 400 }}>
                      Dein KI-Avatar wird das Skript mit der gewaehlten Stimme und Animation als Video aufnehmen.
                    </div>
                    <button
                      onClick={generateVideo}
                      disabled={!script.trim() || generating}
                      style={{
                        padding: "14px 36px", borderRadius: 12, border: "none",
                        background: "linear-gradient(135deg, #C8A24D, #E0B95F)",
                        color: "#022350", fontSize: 15, fontWeight: 700, cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      🎬 Video jetzt generieren
                    </button>
                  </div>
                )}

                {(videoStatus === "generating" || videoStatus === "processing") && (
                  <div style={{ textAlign: "center", padding: 32 }}>
                    <div style={{
                      width: 56, height: 56, border: "3px solid rgba(255,255,255,0.1)",
                      borderTopColor: "#C8A24D", borderRadius: "50%",
                      animation: "spin 1s linear infinite", margin: "0 auto 20px",
                    }} />
                    <div className="font-heading" style={{ fontSize: 20, fontWeight: 400, color: "white", marginBottom: 6 }}>
                      {videoStatus === "generating" ? "Video wird erstellt..." : "Avatar nimmt auf..."}
                    </div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Das kann 1-3 Minuten dauern</div>
                  </div>
                )}

                {videoStatus === "completed" && videoUrl && (
                  <video src={videoUrl} controls autoPlay style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 16 }} />
                )}

                {videoStatus === "error" && (
                  <div style={{ textAlign: "center", padding: 32 }}>
                    <div style={{ fontSize: 42, marginBottom: 12 }}>⚠️</div>
                    <div style={{ fontSize: 14, color: "#C0392B", fontWeight: 500, marginBottom: 16 }}>{videoError}</div>
                    <button onClick={generateVideo} className="z-btn" style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}>
                      Erneut versuchen
                    </button>
                  </div>
                )}
              </div>

              {/* Script preview */}
              <div className="z-card-static" style={{ padding: "22px 26px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#022350", marginBottom: 10 }}>Skript-Vorschau</div>
                <div style={{ fontSize: 13, color: "#4A4A5A", lineHeight: 1.7, maxHeight: 150, overflowY: "auto", whiteSpace: "pre-wrap" }}>
                  {script || "Kein Skript vorhanden"}
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="z-card-static" style={{ padding: "22px" }}>
                <div className="font-heading" style={{ fontSize: 18, fontWeight: 400, color: "#022350", marginBottom: 4 }}>Konfiguration</div>
                <div className="z-gold-line" style={{ marginBottom: 16 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Stimme</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{selectedVoice?.name || "Standard"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Avatar</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{selectedAvatar?.avatar_name || "Standard"}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Stil</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{videoStyles.find(s => s.id === style)?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Laenge</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{videoDurations.find(d => d.id === duration)?.label}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                    <span style={{ color: "#9A9AAA" }}>Animation</span>
                    <span style={{ color: "#022350", fontWeight: 600 }}>{animationStyles.find(a => a.id === animation)?.label}</span>
                  </div>
                </div>
              </div>

              <div className="z-card-static" style={{ padding: "22px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#C8A24D", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Tipps</div>
                <div style={{ fontSize: 12, color: "#4A4A5A", lineHeight: 1.6 }}>
                  <p style={{ marginBottom: 8 }}>• Kurze Saetze funktionieren besser fuer den Avatar</p>
                  <p style={{ marginBottom: 8 }}>• Vermeide Sonderzeichen und Abkuerzungen</p>
                  <p style={{ marginBottom: 8 }}>• Die Generierung dauert 1-3 Minuten</p>
                  <p>• Das Video kann nach Erstellung heruntergeladen werden</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <button onClick={() => setActiveTab("script")} className="z-btn z-btn-ghost">← Zurueck zum Skript</button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </DashboardLayout>
  );
}
