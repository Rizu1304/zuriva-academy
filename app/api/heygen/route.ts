export async function POST(request: Request) {
  const { text, avatar_id, voice_id } = await request.json();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "HeyGen API key not configured" }, { status: 500 });
  }

  try {
    // First, get a valid avatar if none specified
    let selectedAvatar = avatar_id;
    if (!selectedAvatar) {
      const avatarRes = await fetch("https://api.heygen.com/v2/avatars", {
        headers: { "X-Api-Key": apiKey },
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

    // Build voice config - use HeyGen's built-in voice
    const voiceConfig = voice_id
      ? { type: "text", input_text: text, voice_id: voice_id, speed: 1.0 }
      : { type: "text", input_text: text, speed: 1.0 };

    // Create video generation task
    const createRes = await fetch("https://api.heygen.com/v2/video/generate", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey,
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
      { error: "HeyGen Verbindungsfehler", details: String(err) },
      { status: 500 }
    );
  }
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
