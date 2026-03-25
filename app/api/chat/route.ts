import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `Du bist Aura, die KI-Assistentin der Zuriva Academy — einer Premium-Lernplattform fuer Schweizer Versicherungsvermittler.

Deine Aufgaben:
- Fragen zu Versicherungsthemen beantworten (Sach, Leben, Haftpflicht, Compliance, FIDLEG, VAG, VBV)
- Bei Kursinhalten und Pruefungsvorbereitung helfen
- Das Schweizer 3-Saeulen-System, BVG, UVG, KVG erklaeren
- Lernempfehlungen geben

Dein Stil:
- Professionell, nahbar, klar — wie Swiss Private Banking Beratung
- Kompetent, nicht belehrend
- Auf Deutsch (Schweiz) antworten
- Kurze, praezise Antworten bevorzugen
- Bei komplexen Themen strukturiert mit Aufzaehlungen arbeiten
- Immer im Kontext der Schweizer Versicherungsbranche bleiben

Kontext:
- Die Nutzerin heisst Laura Meier, ist Vermittlerin
- Sie arbeitet an der VBV-Zertifizierung 2026 (342/600 Credits)
- Aktive Kurse: Sachversicherung (68%), Lebensversicherungen (33%), Beratungskompetenz (85%)
- Naechste Pruefung: Sachversicherung Modul 3 am 28.03.2026`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const anthropicMessages = messages.map((m: { role: string; text: string }) => ({
      role: m.role === "bot" ? "assistant" as const : "user" as const,
      content: m.text,
    }));

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: SYSTEM_PROMPT,
      messages: anthropicMessages,
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    return Response.json({ text });
  } catch (error) {
    console.error("Aura chat error:", error);
    return Response.json(
      { text: "Entschuldigung, ich habe gerade technische Schwierigkeiten. Bitte versuche es gleich nochmal." },
      { status: 500 }
    );
  }
}
