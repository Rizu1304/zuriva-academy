export async function GET() {
  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "HeyGen API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.heygen.com/v2/avatars", {
      headers: { "X-Api-Key": apiKey },
    });

    if (!res.ok) {
      const errorText = await res.text();
      return Response.json({ error: "Failed to fetch avatars", details: errorText }, { status: res.status });
    }

    const data = await res.json();
    const avatars = (data.data?.avatars || []).map((a: Record<string, unknown>) => ({
      avatar_id: a.avatar_id,
      avatar_name: a.avatar_name,
      preview_image_url: a.preview_image_url,
      preview_video_url: a.preview_video_url,
      gender: a.gender,
    }));

    return Response.json({ avatars });
  } catch {
    return Response.json({ error: "Failed to fetch avatars" }, { status: 500 });
  }
}
