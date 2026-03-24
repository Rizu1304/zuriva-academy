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

export async function generateContent({
  prompt,
  context,
  documentText,
}: {
  prompt: string;
  context: "lernpfad" | "pruefung" | "kahoot" | "animation";
  documentText?: string;
}): Promise<{ content: string; error: boolean }> {
  const systemPrompts: Record<string, string> = {
    lernpfad:
      "Du bist ein Experte für Lernpfad-Design im Schweizer Versicherungswesen. Erstelle strukturierte Lernpfade mit Modulen, Lernzielen und Zeitschätzungen. Antworte auf Deutsch. Formatiere mit Markdown.",
    pruefung:
      "Du bist ein Experte für Prüfungserstellung im Schweizer Versicherungswesen. Erstelle Prüfungsfragen mit Multiple-Choice-Antworten, markiere die korrekte Antwort mit ✅. Antworte auf Deutsch. Formatiere mit Markdown.",
    kahoot:
      "Du bist ein Experte für spielerisches Lernen (Gamification) im Versicherungswesen. Erstelle unterhaltsame Quiz-Fragen mit 4 Antwortmöglichkeiten. Markiere die korrekte Antwort mit ✅. Antworte auf Deutsch. Formatiere mit Markdown.",
    animation:
      "Du bist ein Experte für interaktive Lernanimationen. Erstelle HTML/CSS/JS Code für animierte, interaktive Lernelemente. Der Code muss eigenständig in einem iframe funktionieren (inline styles, kein externes Framework). Nutze moderne CSS-Animationen. Antworte NUR mit dem HTML-Code, keine Erklärungen. Thema: Schweizer Versicherungswesen.",
  };

  const docHint = documentText
    ? `\n\nVerarbeite folgendes Dokument und nutze den Inhalt:\n---\n${documentText.slice(0, 12000)}\n---\n`
    : "";

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: systemPrompts[context],
      messages: [{ role: "user", content: prompt + docHint }],
    });
    const textBlock = response.content.find((block) => block.type === "text");
    return { content: textBlock?.text ?? "Keine Antwort erhalten.", error: false };
  } catch (error) {
    console.error("Generate error:", error);
    return { content: "Fehler bei der KI-Generierung. Bitte versuche es erneut.", error: true };
  }
}
