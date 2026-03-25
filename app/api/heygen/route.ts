export async function POST(request: Request) {
  const { text, avatar_id, elevenlabs_voice_id } = await request.json();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const heygenKey = process.env.HEYGEN_API_KEY;
  const elevenlabsKey = process.env.ELEVENLABS_API_KEY;

  if (!heygenKey) {
    return Response.json({ error: "HeyGen API key not configured" }, { status: 500 });
  }

  try {
    // Get a valid avatar
    let selectedAvatar = avatar_id;
    if (!selectedAvatar) {
      const avatarRes = await fetch("https://api.heygen.com/v2/avatars", {
        headers: { "X-Api-Key": heygenKey },
      });
      if (avatarRes.ok) {
        const avatarData = await avatarRes.json();
        const avatars = avatarData.data?.avatars || [];
        if (avatars.length > 0) selectedAvatar = avatars[0].avatar_id;
      }
    }

    if (!selectedAvatar) {
      return Response.json({ error: "Kein Avatar verfügbar." }, { status: 400 });
    }

    // APPROACH: Generate ElevenLabs audio, upload to HeyGen, use in video
    let voiceConfig: Record<string, unknown> | null = null;

    if (elevenlabs_voice_id && elevenlabsKey) {
      try {
        // Step 1: Generate audio with ElevenLabs
        const ttsRes = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${elevenlabs_voice_id}`,
          {
            method: "POST",
            headers: {
              "xi-api-key": elevenlabsKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              text,
              model_id: "eleven_multilingual_v2",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
                style: 0.3,
                use_speaker_boost: true,
              },
            }),
          }
        );

        if (!ttsRes.ok) {
          const errText = await ttsRes.text();
          return Response.json(
            { error: `ElevenLabs Fehler: ${errText}` },
            { status: 500 }
          );
        }

        const audioBuffer = await ttsRes.arrayBuffer();

        // Step 2: Upload audio to HeyGen
        const blob = new Blob([audioBuffer], { type: "audio/mpeg" });
        const formData = new FormData();
        formData.append("file", blob, "speech.mp3");

        // Try v1 upload endpoint
        const uploadRes = await fetch("https://api.heygen.com/v1/asset", {
          method: "POST",
          headers: { "X-Api-Key": heygenKey },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          const audioUrl = uploadData.data?.url || uploadData.data?.asset_url || uploadData.data?.file_url;
          if (audioUrl) {
            voiceConfig = { type: "audio", audio_url: audioUrl };
          }
        }

        // If v1 upload failed, try v2 upload
        if (!voiceConfig) {
          const formData2 = new FormData();
          formData2.append("file", new Blob([audioBuffer], { type: "audio/mpeg" }), "speech.mp3");

          const uploadRes2 = await fetch("https://api.heygen.com/v2/assets/upload", {
            method: "POST",
            headers: { "X-Api-Key": heygenKey },
            body: formData2,
          });

          if (uploadRes2.ok) {
            const uploadData2 = await uploadRes2.json();
            const audioUrl2 = uploadData2.data?.url || uploadData2.data?.asset_url || uploadData2.data?.file_url;
            if (audioUrl2) {
              voiceConfig = { type: "audio", audio_url: audioUrl2 };
            }
          }
        }

        // If upload still failed, try inline base64 approach
        if (!voiceConfig) {
          const base64Audio = Buffer.from(audioBuffer).toString("base64");
          const dataUrl = `data:audio/mpeg;base64,${base64Audio}`;
          voiceConfig = { type: "audio", audio_url: dataUrl };
        }
      } catch (e) {
        // ElevenLabs failed completely - return error, don't fall back to bad voice
        return Response.json(
          { error: `ElevenLabs Stimme fehlgeschlagen: ${String(e)}` },
          { status: 500 }
        );
      }
    }

    // If no ElevenLabs voice, use HeyGen voice as last resort
    if (!voiceConfig) {
      const voicesRes = await fetch("https://api.heygen.com/v2/voices", {
        headers: { "X-Api-Key": heygenKey },
      });
      if (voicesRes.ok) {
        const voicesData = await voicesRes.json();
        const voices = voicesData.data?.voices || [];
        const germanVoice = voices.find((v: Record<string, unknown>) =>
          ((v.language as string) || "").toLowerCase().includes("german")
        );
        const selected = germanVoice || voices[0];
        if (selected) {
          voiceConfig = { type: "text", input_text: text, voice_id: selected.voice_id as string, speed: 1.0 };
        }
      }
      if (!voiceConfig) {
        return Response.json({ error: "Keine Stimme verfügbar." }, { status: 400 });
      }
    }

    // Create video
    const createRes = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": heygenKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: { type: "avatar", avatar_id: selectedAvatar, avatar_style: "normal" },
            voice: voiceConfig,
            background: { type: "color", value: "#022350" },
          },
        ],
        dimension: { width: 1280, height: 720 },
      }),
    });

    const responseText = await createRes.text();
    let createData;
    try { createData = JSON.parse(responseText); } catch {
      return Response.json({ error: "HeyGen Antwort ungültig", details: responseText }, { status: 500 });
    }

    if (!createRes.ok) {
      const errorMsg = createData?.error?.message || createData?.message || createData?.error || responseText;
      return Response.json({ error: `HeyGen Fehler: ${errorMsg}` }, { status: createRes.status });
    }

    const videoId = createData.data?.video_id;
    if (!videoId) {
      return Response.json({ error: "Kein Video-ID erhalten", details: JSON.stringify(createData) }, { status: 500 });
    }

    return Response.json({ video_id: videoId, status: "processing" });
  } catch (err) {
    return Response.json({ error: "Verbindungsfehler: " + String(err) }, { status: 500 });
  }
}

// GET: Check video status
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("video_id");
  if (!videoId) return Response.json({ error: "video_id is required" }, { status: 400 });

  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) return Response.json({ error: "HeyGen API key not configured" }, { status: 500 });

  try {
    const statusRes = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
      headers: { "X-Api-Key": apiKey },
    });
    if (!statusRes.ok) {
      const errorText = await statusRes.text();
      return Response.json({ error: "Status error", details: errorText }, { status: statusRes.status });
    }
    const statusData = await statusRes.json();
    return Response.json({
      status: statusData.data?.status,
      video_url: statusData.data?.video_url,
      thumbnail_url: statusData.data?.thumbnail_url,
    });
  } catch (err) {
    return Response.json({ error: "Status error", details: String(err) }, { status: 500 });
  }
}
