export async function GET() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "ElevenLabs API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": apiKey },
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch voices" }, { status: res.status });
    }

    const data = await res.json();

    const voices = data.voices.map((v: Record<string, unknown>) => ({
      voice_id: v.voice_id,
      name: v.name,
      category: v.category,
      labels: v.labels,
      preview_url: v.preview_url,
      description: v.description,
    }));

    return Response.json({ voices });
  } catch {
    return Response.json({ error: "Failed to fetch voices" }, { status: 500 });
  }
}
