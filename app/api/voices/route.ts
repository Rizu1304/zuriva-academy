export async function GET(request: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "ElevenLabs API key not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const language = searchParams.get("language"); // e.g. "de", "en"

  try {
    // Fetch user's own voices
    const ownRes = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": apiKey },
    });

    // Also fetch shared voices from the library (German)
    const sharedRes = await fetch(
      "https://api.elevenlabs.io/v1/shared-voices?page_size=50&language=de&sort=trending",
      { headers: { "xi-api-key": apiKey } }
    );

    const ownVoices: VoiceItem[] = [];
    const sharedVoices: VoiceItem[] = [];

    if (ownRes.ok) {
      const ownData = await ownRes.json();
      for (const v of ownData.voices || []) {
        const lang = v.labels?.language || v.labels?.accent || "";
        // If language filter set, only include matching
        if (language && !langMatches(lang, language)) continue;
        ownVoices.push({
          voice_id: v.voice_id,
          name: v.name,
          category: v.category || "own",
          labels: v.labels || {},
          preview_url: v.preview_url || "",
          description: v.description || "",
          source: "own",
        });
      }
    }

    if (sharedRes.ok) {
      const sharedData = await sharedRes.json();
      for (const v of sharedData.voices || []) {
        sharedVoices.push({
          voice_id: v.voice_id,
          name: v.name,
          category: v.category || "shared",
          labels: {
            language: v.language || "de",
            gender: v.gender || "",
            use_case: v.use_case || "",
            accent: v.accent || "",
          },
          preview_url: v.preview_url || "",
          description: v.description || "",
          source: "library",
        });
      }
    }

    // Combine: own voices first, then shared German voices
    const allVoices = [...ownVoices, ...sharedVoices];

    return Response.json({ voices: allVoices });
  } catch {
    return Response.json({ error: "Failed to fetch voices" }, { status: 500 });
  }
}

interface VoiceItem {
  voice_id: string;
  name: string;
  category: string;
  labels: Record<string, string>;
  preview_url: string;
  description: string;
  source: string;
}

function langMatches(label: string, lang: string): boolean {
  const l = label.toLowerCase();
  if (lang === "de") return l.includes("german") || l.includes("deutsch") || l === "de";
  if (lang === "en") return l.includes("english") || l === "en";
  return true;
}
