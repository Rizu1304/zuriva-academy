"use server";

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT =
  "Du bist Aura, die KI-Assistentin der Zuriva Academy — ein internes LMS der Zuriva GmbH, einer Schweizer Versicherungsvermittlung in Dübendorf, Zürich. Du hilfst Mitarbeitenden bei Fragen zu Versicherungsthemen, Kursinhalten, VBV-Zertifizierung, Prüfungsvorbereitung und der Nutzung der Plattform. Antworte immer auf Deutsch, freundlich und kompetent. Halte Antworten kurz und präzise.";

export async function chat({
  messages,
}: {
  messages: { role: "user" | "assistant"; content: string }[];
}): Promise<{ content: string }> {
  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find((block) => block.type === "text");
    return { content: textBlock?.text ?? "Entschuldigung, ich konnte keine Antwort generieren." };
  } catch (error) {
    console.error("Aura API error:", error);
    return {
      content:
        "Entschuldigung, es gab einen Fehler bei der Verarbeitung deiner Anfrage. Bitte versuche es erneut.",
    };
  }
}
