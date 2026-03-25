export async function GET() {
  const apiKey = process.env.HEYGEN_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "HeyGen API key not configured" }, { status: 500 });
  }

  try {
    const res = await fetch("https://api.heygen.com/v2/voices", {
      headers: { "X-Api-Key": apiKey },
    });

    if (!res.ok) {
      return Response.json({ error: "Failed to fetch voices" }, { status: res.status });
    }

    const data = await res.json();
    const allVoices = data.data?.voices || [];

    // Filter for German voices only
    const germanVoices = allVoices
      .filter((v: Record<string, unknown>) => {
        const lang = ((v.language as string) || "").toLowerCase();
        return lang.includes("german") || lang.includes("deutsch") || lang === "de";
      })
      .map((v: Record<string, unknown>) => ({
        voice_id: v.voice_id,
        name: v.display_name || v.name || v.voice_id,
        category: v.source || "heygen",
        labels: {
          language: "Deutsch",
          gender: (v.gender as string) || "",
          style: (v.emotion as string) || (v.support_pause as boolean ? "natürlich" : ""),
        },
        preview_url: (v.preview_audio as string) || "",
        description: "",
        source: "heygen",
      }));

    return Response.json({ voices: germanVoices });
  } catch {
    return Response.json({ error: "Failed to fetch voices" }, { status: 500 });
  }
}
