export async function POST(request: Request) {
  const { text, avatar_id } = await request.json();

  if (!text) {
    return Response.json({ error: "Text is required" }, { status: 400 });
  }

  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "HeyGen API key not configured" }, { status: 500 });
  }

  // Default avatar: professional female presenter
  const selectedAvatar = avatar_id || "Angela-inblackskirt-20220820";

  try {
    // Step 1: Create video generation task
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
            voice: {
              type: "text",
              input_text: text,
              voice_id: "de_female_1",
              speed: 1.0,
            },
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

    if (!createRes.ok) {
      const errorText = await createRes.text();
      return Response.json(
        { error: "HeyGen create error", details: errorText },
        { status: createRes.status }
      );
    }

    const createData = await createRes.json();
    const videoId = createData.data?.video_id;

    if (!videoId) {
      return Response.json({ error: "No video_id returned" }, { status: 500 });
    }

    return Response.json({ video_id: videoId, status: "processing" });
  } catch (err) {
    return Response.json(
      { error: "HeyGen API error", details: String(err) },
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
