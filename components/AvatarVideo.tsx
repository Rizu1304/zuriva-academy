"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface AvatarVideoProps {
  text: string;
  autoGenerate?: boolean;
}

type VideoStatus = "idle" | "generating" | "processing" | "completed" | "error";

export default function AvatarVideo({ text, autoGenerate = false }: AvatarVideoProps) {
  const [status, setStatus] = useState<VideoStatus>("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const cleanup = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const pollStatus = useCallback((videoId: string) => {
    cleanup();
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/heygen?video_id=${videoId}`);
        const data = await res.json();

        if (data.status === "completed" && data.video_url) {
          setVideoUrl(data.video_url);
          setStatus("completed");
          cleanup();
        } else if (data.status === "failed") {
          setError("Video-Generierung fehlgeschlagen");
          setStatus("error");
          cleanup();
        }
      } catch {
        setError("Verbindungsfehler");
        setStatus("error");
        cleanup();
      }
    }, 5000);
  }, [cleanup]);

  const generateVideo = useCallback(async () => {
    setStatus("generating");
    setError(null);
    setVideoUrl(null);

    try {
      const res = await fetch("/api/heygen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.details || data.error || "Fehler bei der Video-Erstellung");
        setStatus("error");
        return;
      }

      setStatus("processing");
      pollStatus(data.video_id);
    } catch {
      setError("Netzwerkfehler");
      setStatus("error");
    }
  }, [text, pollStatus]);

  useEffect(() => {
    if (autoGenerate && status === "idle") {
      generateVideo();
    }
  }, [autoGenerate, status, generateVideo]);

  return (
    <div style={{
      background: "#022350",
      borderRadius: 14,
      overflow: "hidden",
      position: "relative",
      aspectRatio: "16/9",
      maxWidth: 640,
      width: "100%",
    }}>
      {status === "idle" && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 16,
          padding: 32,
        }}>
          <div style={{ fontSize: 48 }}>🎬</div>
          <div style={{ color: "white", fontSize: 16, fontWeight: 600, textAlign: "center" }}>
            KI-Avatar Erklaerung
          </div>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textAlign: "center", maxWidth: 360, lineHeight: 1.5 }}>
            Lasse dir diese Lektion von einem KI-Avatar als Video erklaeren
          </div>
          <button
            onClick={generateVideo}
            style={{
              padding: "12px 28px",
              borderRadius: 10,
              border: "none",
              background: "#0FA4A0",
              color: "white",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            ▶ Video generieren
          </button>
        </div>
      )}

      {(status === "generating" || status === "processing") && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 16,
          padding: 32,
        }}>
          <div style={{
            width: 48,
            height: 48,
            border: "3px solid rgba(255,255,255,0.15)",
            borderTopColor: "#0FA4A0",
            borderRadius: "50%",
            animation: "avatarSpin 1s linear infinite",
          }} />
          <div style={{ color: "white", fontSize: 15, fontWeight: 600 }}>
            {status === "generating" ? "Video wird erstellt..." : "Avatar spricht deinen Text..."}
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
            Das kann 1-3 Minuten dauern
          </div>
          {/* Progress bar animation */}
          <div style={{ width: 200, height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{
              height: "100%",
              background: "#0FA4A0",
              borderRadius: 2,
              animation: "avatarProgress 2s ease-in-out infinite",
            }} />
          </div>
        </div>
      )}

      {status === "completed" && videoUrl && (
        <video
          src={videoUrl}
          controls
          autoPlay
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}

      {status === "error" && (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: 12,
          padding: 32,
        }}>
          <div style={{ fontSize: 36 }}>⚠️</div>
          <div style={{ color: "#e74c3c", fontSize: 14, fontWeight: 500, textAlign: "center" }}>
            {error}
          </div>
          <button
            onClick={generateVideo}
            style={{
              padding: "8px 20px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "white",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Erneut versuchen
          </button>
        </div>
      )}

      <style>{`
        @keyframes avatarSpin { to { transform: rotate(360deg); } }
        @keyframes avatarProgress { 0% { width: 0%; } 50% { width: 80%; } 100% { width: 0%; } }
      `}</style>
    </div>
  );
}
