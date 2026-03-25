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
    // Get a valid avatar if none specified
    let selectedAvatar = avatar_id;
    if (!selectedAvatar) {
      const avatarRes = await fetch("https://api.heygen.com/v2/avatars", {
        headers: { "X-Api-Key": heygenKey },
      });
      if (avatarRes.ok) {
        const avatarData = await avatarRes.json();
        const avatars = avatarData.data?.avatars || [];
        if (avatars.length > 0) {
          selectedAvatar = avatars[0].avatar_id;
        }
      }
    }

    if (!selectedAvatar) {
      return Response.json(
        { error: "Kein Avatar verfügbar. Bitte wähle einen Avatar aus." },
        { status: 400 }
      );
    }

    // Strategy: If ElevenLabs voice is selected, generate audio first,
    // then use audio URL with HeyGen. Otherwise use HeyGen's built-in voice.
    let voiceConfig: Record<string, unknown>;

    if (elevenlabs_voice_id && elevenlabsKey) {
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
        return Response.json(
          { error: "ElevenLabs Stimme konnte nicht generiert werden. Fehler: " + (await ttsRes.text()) },
          { status: 500 }
        );
      }

      // Step 2: Upload audio to HeyGen
      const audioBuffer = await ttsRes.arrayBuffer();
      const formData = new FormData();
      formData.append("file", new Blob([audioBuffer], { type: "audio/mpeg" }), "voice.mp3");

      const uploadRes = await fetch("https://api.heygen.com/v2/assets/upload", {
        method: "POST",
        headers: { "X-Api-Key": heygenKey },
        body: formData,
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        const audioUrl = uploadData.data?.url || uploadData.data?.asset_url;
        if (audioUrl) {
          voiceConfig = {
            type: "audio",
            audio_url: audioUrl,
          };
        } else {
          // Fallback: use HeyGen voice
          voiceConfig = await getHeyGenVoiceConfig(heygenKey, text);
        }
      } else {
        // Fallback: use HeyGen voice
        voiceConfig = await getHeyGenVoiceConfig(heygenKey, text);
      }
    } else {
      // No ElevenLabs voice selected - use HeyGen's built-in voice
      voiceConfig = await getHeyGenVoiceConfig(heygenKey, text);
    }

    // Create video generation task
    const createRes = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": heygenKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: "avatar",
              avatar_id: selectedAvatar,
              avatar_style: "normal",
            },
            voice: voiceConfig,
            background: {
              type: "color",
              value: "#022350",
            },
          },
        ],
        dimension: {
          width: 1280,
          height: 720,
        },
      }),
    });

    const responseText = await createRes.text();
    let createData;
    try {
      createData = JSON.parse(responseText);
    } catch {
      return Response.json(
        { error: "HeyGen Antwort ungültig", details: responseText },
        { status: 500 }
      );
    }

    if (!createRes.ok) {
      const errorMsg = createData?.error?.message || createData?.message || createData?.error || responseText;
      return Response.json(
        { error: `HeyGen Fehler: ${errorMsg}`, details: responseText },
        { status: createRes.status }
      );
    }

    const videoId = createData.data?.video_id;

    if (!videoId) {
      return Response.json(
        { error: "Kein Video-ID erhalten", details: JSON.stringify(createData) },
        { status: 500 }
      );
    }

    return Response.json({ video_id: videoId, status: "processing" });
  } catch (err) {
    return Response.json(
      { error: "Verbindungsfehler: " + String(err) },
      { status: 500 }
    );
  }
}

// Helper: Get a valid HeyGen voice config
async function getHeyGenVoiceConfig(apiKey: string, text: string): Promise<Record<string, unknown>> {
  const voicesRes = await fetch("https://api.heygen.com/v2/voices", {
    headers: { "X-Api-Key": apiKey },
  });
  if (voicesRes.ok) {
    const voicesData = await voicesRes.json();
    const voices = voicesData.data?.voices || [];
    const germanVoice = voices.find((v: Record<string, unknown>) =>
      (v.language as string || "").toLowerCase().includes("german") ||
      (v.language as string || "").toLowerCase().includes("deutsch") ||
      (v.language as string || "").toLowerCase() === "de"
    );
    const selectedVoice = germanVoice || voices[0];
    if (selectedVoice) {
      return {
        type: "text",
        input_text: text,
        voice_id: selectedVoice.voice_id as string,
        speed: 1.0,
      };
    }
  }
  return { type: "text", input_text: text, voice_id: "default", speed: 1.0 };
}

// GET: Check video status and get URL
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get("video_id");

  if (!videoId) {
    return Response.json({ error: "video_id is required" }, { status: 400 });
  }

  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "HeyGen API key not configured" }, { status: 500 });
  }

  try {
    const statusRes = await fetch(
      `https://api.heygen.com/v1/video_status.get?video_id=${videoId}`,
      {
        headers: { "X-Api-Key": apiKey },
      }
    );

    if (!statusRes.ok) {
      const errorText = await statusRes.text();
      return Response.json(
        { error: "HeyGen status error", details: errorText },
        { status: statusRes.status }
      );
    }

    const statusData = await statusRes.json();
    return Response.json({
      status: statusData.data?.status,
      video_url: statusData.data?.video_url,
      thumbnail_url: statusData.data?.thumbnail_url,
    });
  } catch (err) {
    return Response.json(
      { error: "HeyGen status error", details: String(err) },
      { status: 500 }
    );
  }
}
